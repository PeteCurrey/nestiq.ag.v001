// lib/scrapers/rightmove.ts

import * as cheerio from 'cheerio'

const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Accept-Language': 'en-GB,en;q=0.9',
  'Accept-Encoding': 'gzip, deflate, br',
  'Connection': 'keep-alive',
  'Referer': 'https://www.rightmove.co.uk/',
}

// Polite delay between requests — randomised 2–5 seconds
function delay(min = 2000, max = 5000): Promise<void> {
  return new Promise(resolve =>
    setTimeout(resolve, Math.floor(Math.random() * (max - min)) + min)
  )
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
  images: string[] // original Rightmove image URLs
  latitude: number | null
  longitude: number | null
  floorAreaSqft: number | null
  tenure: string | null
  addedOn: string | null
  agentBranchName: string
}

/** Fetch all listing IDs for a branch */
export async function fetchBranchListingIds(
  branchId: string,
  channel: 'BUY' | 'RENT' = 'BUY'
): Promise<string[]> {
  const ids: string[] = []
  let index = 0
  let hasMore = true

  while (hasMore) {
    const baseUrl = channel === 'BUY'
      ? `https://www.rightmove.co.uk/property-for-sale/find.html`
      : `https://www.rightmove.co.uk/property-to-rent/find.html`

    const params = new URLSearchParams({
      locationIdentifier: `BRANCH^${branchId}`,
      index:              String(index),
      numberOfPropertiesPerPage: '24',
      sortType:           '6',
      viewType:           'LIST',
      ...(channel === 'BUY'
        ? { includeSSTC: 'true' }
 : { propertyStatus: 'all', includeLetAgreed: 'true' }
      )
    })

    const url = `${baseUrl}?${params.toString()}`
    console.log(`Fetching: ${url}`)

    try {
      const res = await fetch(url, { headers: HEADERS })
      if (!res.ok) {
        console.error(`HTTP ${res.status} for ${url}`)
        break
      }

      const html = await res.text()

      // Extract __NEXT_DATA__ from the page
      const match = html.match(
        /<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/
      )
      if (!match) {
        console.error('No __NEXT_DATA__ found in page')
        // Fallback: extract property IDs from HTML links
        const linkMatches = html.matchAll(/\/properties\/(\d+)/g)
        for (const m of linkMatches) {
          if (!ids.includes(m[1])) ids.push(m[1])
        }
        hasMore = false
        break
      }

      const nextData = JSON.parse(match[1])

      // Navigate to properties array — path varies by page version
      const pageProps = nextData?.props?.pageProps ?? {}
      const searchResult = pageProps?.searchResult ?? 
                           pageProps?.results ?? 
                           pageProps?.propertiesForSale ??
                           pageProps?.propertiesForRent ?? {}

      const properties = searchResult?.properties ?? 
                       searchResult?.propertyDetails ??
                       []

      console.log(`Page index ${index}: found ${properties.length} properties`)

      if (properties.length === 0) {
        hasMore = false
        break
      }

      for (const prop of properties) {
        const id = prop?.id ?? prop?.propertyId ?? prop?.rmID
        if (id) ids.push(String(id))
      }

      // Check if there are more pages
      const resultCount = searchResult?.resultCount ?? 
                          searchResult?.totalResultCount ?? 0
      const total = typeof resultCount === 'string'
        ? parseInt(resultCount.replace(/,/g, ''), 10)
        : resultCount

      console.log(`Total results: ${total}, fetched so far: ${ids.length}`)

      if (ids.length >= total || properties.length < 24) {
        hasMore = false
      } else {
        index += 24
        // Polite delay between pages
        await delay(2000, 4000)
      }

    } catch (e) {
      console.error('Fetch error:', e)
      hasMore = false
    }
  }

  console.log(`Branch ${branchId} ${channel}: found ${ids.length} IDs`)
  return [...new Set(ids)]
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
        const match = content.match(/window\.PAGE_MODEL\s*=\s*(\{[\s\S]*?\});?\s*\n/)
        if (match) {
          try {
            pageModel = JSON.parse(match[1])
          } catch {
            // fallback aggressively
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

    // Images – take largest available and limit to 15
    const images: string[] = (prop.images ?? [])
      .map((img: any) => {
        const url = img?.srcUrl ?? img?.url ?? img?.['1024x682'] ?? ''
        return url.replace(/_(\d+x\d+)\./, '_max_800x600.')
      })
      .filter(Boolean)
      .slice(0, 15)

    // Features list
    const features: string[] = (prop.keyFeatures ?? [])
      .map((f: any) => typeof f === 'string' ? f : f?.content ?? '')
      .filter(Boolean)

    const address = prop?.address?.displayAddress ?? ''
    const postcode = prop?.address?.outcode
      ? `${prop.address.outcode} ${prop.address.incode ?? ''}`.trim()
      : extractPostcode(address)
    const town = prop?.address?.town ?? extractTown(address)

    const priceData = prop?.prices?.primaryPrice ?? prop?.price?.amount ?? 0
    const price = typeof priceData === 'string'
      ? parseInt(priceData.replace(/[^0-9]/g, ''), 10)
      : priceData

    const rawType = prop?.propertySubType ?? prop?.propertyType ?? ''
    const channel = prop?.channel ?? pageModel?.channel ?? 'BUY'
    const listingType = channel === 'RENT' ? 'rent' : 'sale'

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
      agentBranchName: prop?.customer?.branchDisplayName ?? prop?.branch?.name ?? '',
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
  if (type.includes('terraced') || type.includes('end of terrace')) return 'terraced'
  if (type.includes('flat') || type.includes('apartment')) return 'flat'
  if (type.includes('bungalow')) return 'bungalow'
  if (type.includes('land')) return 'land'
  if (type.includes('commercial')) return 'commercial'
  if (type.includes('new build')) return 'detached'
  return 'detached'
}
