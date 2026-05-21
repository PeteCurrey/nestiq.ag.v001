// lib/scrapers/import.ts

import { createClient } from '@supabase/supabase-js'
import {
  fetchBranchListingIds,
  scrapeProperty,
  mapRightmovePropertyType,
} from './rightmove'

import { randomUUID } from 'crypto'

// Supabase client (service role)
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Helper: upload image to Supabase storage
async function migrateImage(
  rightmoveUrl: string,
  propertyId: string,
  index: number
): Promise<string | null> {
  try {
    const res = await fetch(rightmoveUrl)
    if (!res.ok) return null
    const buffer = await res.arrayBuffer()
    const path = `properties/${propertyId}/${index}.jpg`
    const { error } = await supabase.storage
      .from('property-images')
      .upload(path, Buffer.from(buffer), {
        contentType: 'image/jpeg',
        upsert: true,
      })
    if (error) return null
    const { data } = supabase.storage.from('property-images').getPublicUrl(path)
    return data.publicUrl
  } catch {
    return null
  }
}

function generateSlug(address: string, postcode: string, id: string): string {
  return `${address}-${postcode}`
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '-')
    .slice(0, 60) + `-${id.slice(0, 8)}`
}

export interface ImportProgress {
  total: number
  processed: number
  imported: number
  skipped: number
  errors: number
  currentSlug: string
}

export async function importFromRightmove(
  agencyId: string,
  rightmoveBranchId: string,
  onProgress?: (p: ImportProgress) => void
): Promise<ImportProgress> {
  const progress: ImportProgress = {
    total: 0,
    processed: 0,
    imported: 0,
    skipped: 0,
    errors: 0,
    currentSlug: '',
  }

  const [saleIds, rentIds] = await Promise.all([
    fetchBranchListingIds(rightmoveBranchId, 'BUY'),
    fetchBranchListingIds(rightmoveBranchId, 'RENT'),
  ])
  const allIds = Array.from(new Set([...saleIds, ...rentIds]))
  progress.total = allIds.length
  onProgress?.(progress)

  for (const rmId of allIds) {
    progress.currentSlug = rmId
    onProgress?.(progress)

    // Skip if already present
    const { data: existing } = await supabase
      .from('properties')
      .select('id')
      .eq('external_id', `rm_${rmId}`)
      .single()
    if (existing) {
      progress.skipped++
      progress.processed++
      onProgress?.(progress)
      continue
    }

    const scraped = await scrapeProperty(rmId)
    if (!scraped) {
      progress.errors++
      progress.processed++
      onProgress?.(progress)
      await new Promise(r => setTimeout(r, 2000))
      continue
    }

    const slug = generateSlug(scraped.address, scraped.postcode, rmId)
    const { data: property, error: propError } = await supabase
      .from('properties')
      .upsert(
        {
          agency_id: agencyId,
          external_id: `rm_${rmId}`,
          title: `${scraped.bedrooms} Bed ${scraped.propertyType}`,
          slug,
          description: scraped.description,
          price: scraped.price,
          listing_type: scraped.listingType,
          property_type: mapRightmovePropertyType(scraped.propertyType),
          status: 'active',
          bedrooms: scraped.bedrooms,
          bathrooms: scraped.bathrooms,
          address_line1: scraped.address,
          town: scraped.town,
          postcode: scraped.postcode,
          latitude: scraped.latitude,
          longitude: scraped.longitude,
          floor_area_sqft: scraped.floorAreaSqft,
          tenure: scraped.tenure,
          council_tax_band: null,
          epc_rating: null,
          synced_at: new Date().toISOString(),
          data_source: 'rightmove_demo',
        },
        { onConflict: 'external_id', ignoreDuplicates: false }
      )
      .select('id')
      .single()

    if (propError || !property) {
      progress.errors++
      progress.processed++
      onProgress?.(progress)
      continue
    }

    // Images
    const imageResults = await Promise.all(
      scraped.images.slice(0, 10).map((url, i) => migrateImage(url, property.id, i))
    const validImages = imageResults
      .map((url, i) =>
        url
          ? {
              property_id: property.id,
              url,
              is_primary: i === 0,
              sort_order: i,
              alt_text: `${scraped.address} - Photo ${i + 1}`,
            }
          : null
      )
      .filter(Boolean)
    if (validImages.length > 0) {
      await supabase.from('property_images').insert(validImages as any)
    }

    // Features
    if (scraped.features.length > 0) {
      await supabase.from('property_features').insert(
        scraped.features.map(f => ({ property_id: property.id, feature: f }))
      )
    }

    progress.imported++
    progress.processed++
    onProgress?.(progress)
    await new Promise(r => setTimeout(r, Math.floor(Math.random() * 3000) + 2000))
  }

  return progress
}
