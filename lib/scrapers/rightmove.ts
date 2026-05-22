// lib/scrapers/rightmove.ts

import * as cheerio from 'cheerio'

const HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  Accept: 'application/json, text/html, */*',
  'Accept-Language': 'en-GB,en;q=0.9',
  'Accept-Encoding': 'gzip, deflate, br',
  Connection: 'keep-alive',
  Referer: 'https://www.rightmove.co.uk/',
}

// Polite delay between requests
function delay(ms = 2500): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms + Math.random() * 2000))
}

export interface ScrapedProperty {
  rightmoveId: string
  address: string
  town: string
  postcode: string
  price: number
  listingType: 'sale' | 'rent'
  propertyType: string
  bedrooms: number
  bathrooms: number
  description: string
  features: string[]
  images: string[]
  latitude: number | null
  longitude: number | null
  floorAreaSqft: number | null
  tenure: string | null
  addedOn: string | null
  agentBranchName: string
}

/**
 * Fetch all listing IDs for a branch using Rightmove's search API.
 *
 * Rightmove serves property search results through a JSON API endpoint:
 *   GET /api/_search (requires specific headers Rightmove checks)
 *
 * Fallback: fetch the HTML page and extract IDs from property card links.
 */
export async function fetchBranchListingIds(
  branchId: string,
  channel: 'BUY' | 'RENT' = 'BUY'
): Promise<string[]> {
  const ids = new Set<string>()

  const PAGE_SIZE = 24
  let index = 0
  let totalExpected = -1

  const buildSearchUrl = (pageIndex: number) => {
    const base = channel === 'BUY'
      ? 'https://www.rightmove.co.uk/property-for-sale/find.html'
      : 'https://www.rightmove.co.uk/property-to-rent/find.html'

    const params = new URLSearchParams({
      locationIdentifier: `BRANCH^${branchId}`,
      index: String(pageIndex),
      numberOfPropertiesPerPage: String(PAGE_SIZE),
      sortType: '6',
      viewType: 'LIST',
      channel: channel,
      ...(channel === 'BUY'
        ? { includeSSTC: 'true', _includeSSTC: 'on' }
        : { propertyStatus: 'all' }),
    })
    return `${base}?${params}`
  }

  while (true) {
    const url = buildSearchUrl(index)
    console.log(`[rightmove] Fetching ${url}`)

    let html: string
    try {
      const res = await fetch(url, { headers: HEADERS })
      console.log(`[rightmove] HTTP ${res.status} for index=${index}`)
      if (!res.ok) break
      html = await res.text()
    } catch (err) {
      console.error('[rightmove] Fetch error:', err)
      break
    }

    // -----------------------------------------------------------------------
    // Strategy 1: extract IDs from script tag containing serialised JSON state
    // Rightmove embeds property IDs in a script tag like:
    //   window.__PRELOADED_STATE__ = { ... }
    //   or __NEXT_DATA__ (older pages used this)
    // -----------------------------------------------------------------------
    let foundOnPage = 0

    // Try __NEXT_DATA__ first (if present and populated)
    const nextDataMatch = html.match(
      /<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/
    )
    if (nextDataMatch) {
      try {
        const nextData = JSON.parse(nextDataMatch[1])
        // Walk known paths where Rightmove embeds results
        const sr =
          nextData?.props?.pageProps?.searchResult ??
          nextData?.props?.pageProps?.results ??
          nextData?.props?.initialProps?.searchResult ??
          null

        if (sr) {
          const props: any[] = sr.properties ?? sr.results ?? []
          for (const p of props) {
            const id =
              p?.id ?? p?.propertyId ?? p?.rmID ?? p?.identifier ?? null
            if (id) ids.add(String(id))
          }
          foundOnPage = props.length
          if (totalExpected < 0) {
            totalExpected = Number(
              sr.resultCount ??
                sr.totalResultCount ??
                sr.pagination?.total ??
                0
            )
          }
          console.log(
            `[rightmove] __NEXT_DATA__: found ${foundOnPage} on page, total=${totalExpected}`
          )
        }
      } catch (e) {
        console.warn('[rightmove] Failed to parse __NEXT_DATA__:', e)
      }
    }

    // -----------------------------------------------------------------------
    // Strategy 2: extract IDs directly from property card <a href> links
    // All property cards link to /properties/<id>#/ or /properties/<id>
    // -----------------------------------------------------------------------
    if (foundOnPage === 0) {
      const $ = cheerio.load(html)
      $('a[href*="/properties/"]').each((_, el) => {
        const href = $(el).attr('href') ?? ''
        const m = href.match(/\/properties\/(\d+)/)
        if (m) {
          ids.add(m[1])
          foundOnPage++
        }
      })

      // Also try bare regex over entire HTML (catches data-* attributes etc.)
      const allMatches = [...html.matchAll(/\/properties\/(\d+)/g)]
      for (const m of allMatches) {
        ids.add(m[1])
      }

      console.log(
        `[rightmove] HTML link extraction: ${ids.size} unique IDs so far`
      )
    }

    // -----------------------------------------------------------------------
    // Strategy 3: look for property IDs in JSON data embedded in the page
    // Rightmove Next.js apps sometimes embed data in __PRELOADED_STATE__ or
    // inline fetch cache blocks like: self.__next_f.push([...])
    // -----------------------------------------------------------------------
    if (foundOnPage === 0) {
      // Look for "id":<number> patterns adjacent to "price" or "address"
      const jsonIdMatches = [
        ...html.matchAll(/"propertyId"\s*:\s*(\d+)/g),
        ...html.matchAll(/"id"\s*:\s*(\d{6,9})/g),
        ...html.matchAll(/"identifier"\s*:\s*"(\d+)"/g),
      ]
      for (const m of jsonIdMatches) {
        ids.add(m[1])
        foundOnPage++
      }
      console.log(
        `[rightmove] JSON pattern extraction: ${ids.size} unique IDs so far`
      )
    }

    // If we got nothing at all on this page, we're done
    if (ids.size === 0 && index === 0) {
      console.warn(
        '[rightmove] No IDs found on first page — dumping first 1000 chars of HTML for debug'
      )
      console.log(html.slice(0, 1000))
      break
    }

    if (foundOnPage === 0) break // no new results on this page

    // Paginate: if we know the total, use it; otherwise paginate until empty
    if (totalExpected > 0 && ids.size >= totalExpected) break
    if (foundOnPage < PAGE_SIZE) break // last page

    index += PAGE_SIZE
    await delay()
  }

  console.log(`[rightmove] fetchBranchListingIds done: ${ids.size} IDs total`)
  return Array.from(ids)
}

/** Scrape a single property page */
export async function scrapeProperty(
  propertyId: string
): Promise<ScrapedProperty | null> {
  const url = `https://www.rightmove.co.uk/properties/${propertyId}`

  try {
    const res = await fetch(url, { headers: HEADERS })
    if (!res.ok) {
      console.error(`Property ${propertyId}: HTTP ${res.status}`)
      return null
    }

    const html = await res.text()
    const $ = cheerio.load(html)

    // Extract window.PAGE_MODEL JSON
    let pageModel: any = null
    $('script').each((_, el) => {
      const content = $(el).html() ?? ''
      if (content.includes('window.PAGE_MODEL')) {
        const match = content.match(
          /window\.PAGE_MODEL\s*=\s*(\{[\s\S]*?\});\s*\n/
        )
        if (match) {
          try {
            pageModel = JSON.parse(match[1])
          } catch {
            const start = content.indexOf('{')
            const end = content.lastIndexOf('}')
            if (start > -1 && end > start) {
              try {
                pageModel = JSON.parse(content.slice(start, end + 1))
              } catch {}
            }
          }
        }
      }
    })

    if (!pageModel) {
      console.error(`Property ${propertyId}: Could not extract PAGE_MODEL`)
      return null
    }

    const prop = pageModel?.propertyData ?? pageModel?.property ?? {}

    const images: string[] = (prop.images ?? [])
      .map((img: any) => {
        const u = img?.srcUrl ?? img?.url ?? img?.['1024x682'] ?? ''
        return u.replace(/(_\d+x\d+)\./, '_max_800x600.')
      })
      .filter(Boolean)
      .slice(0, 15)

    const features: string[] = (prop.keyFeatures ?? [])
      .map((f: any) => (typeof f === 'string' ? f : f?.content ?? ''))
      .filter(Boolean)

    const address = prop?.address?.displayAddress ?? ''
    const postcode = prop?.address?.outcode
      ? `${prop.address.outcode} ${prop.address.incode ?? ''}`.trim()
      : extractPostcode(address)
    const town = prop?.address?.town ?? extractTown(address)

    const priceData = prop?.prices?.primaryPrice ?? prop?.price?.amount ?? 0
    const price =
      typeof priceData === 'string'
        ? parseInt(priceData.replace(/[^0-9]/g, ''), 10)
        : priceData

    const rawType = prop?.propertySubType ?? prop?.propertyType ?? ''
    const ch = prop?.channel ?? pageModel?.channel ?? 'BUY'
    const listingType = ch === 'RENT' ? 'rent' : 'sale'

    return {
      rightmoveId: propertyId,
      address,
      town,
      postcode,
      price: price || 0,
      listingType,
      propertyType: rawType,
      bedrooms: prop?.bedrooms ?? 0,
      bathrooms: prop?.bathrooms ?? 0,
      description: prop?.text?.description ?? prop?.description ?? '',
      features,
      images,
      latitude: prop?.location?.latitude ?? null,
      longitude: prop?.location?.longitude ?? null,
      floorAreaSqft: prop?.floorArea?.value ?? null,
      tenure: prop?.tenure?.tenureType ?? null,
      addedOn: prop?.listingUpdate?.listingUpdateDate ?? null,
      agentBranchName:
        prop?.customer?.branchDisplayName ?? prop?.branch?.name ?? '',
    }
  } catch (e) {
    console.error(`Scrape failed for ${propertyId}:`, e)
    return null
  }
}

function extractPostcode(address: string): string {
  const match = address.match(/[A-Z]{1,2}[0-9][0-9A-Z]?\s?[0-9][A-Z]{2}/i)
  return match ? match[0].toUpperCase() : ''
}

function extractTown(address: string): string {
  const parts = address.split(',').map(p => p.trim())
  return parts.length >= 2 ? parts[parts.length - 2] : parts[0] ?? ''
}

export function mapRightmovePropertyType(raw: string): string {
  const type = raw.toLowerCase()
  if (type.includes('detached') && !type.includes('semi')) return 'detached'
  if (type.includes('semi')) return 'semi-detached'
  if (type.includes('terraced') || type.includes('end of terrace'))
    return 'terraced'
  if (type.includes('flat') || type.includes('apartment')) return 'flat'
  if (type.includes('bungalow')) return 'bungalow'
  if (type.includes('land')) return 'land'
  if (type.includes('commercial')) return 'commercial'
  if (type.includes('new build')) return 'detached'
  return 'detached'
}
