import { createClient } from '@supabase/supabase-js'
import { algoliasearch } from 'algoliasearch'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const algoliaClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
  process.env.ALGOLIA_ADMIN_KEY!
)

async function sync() {
  console.log('Syncing Supabase properties to Algolia (v5)...')
  
  const { data: properties, error } = await supabase
    .from('properties')
    .select('*, property_images(url, sort_order)')
    .eq('status', 'active')
    
  if (error) {
    console.error('Error fetching properties:', error.message)
    return
  }
  
  if (!properties || properties.length === 0) {
    console.log('No active properties found to sync.')
    return
  }

  const records = properties.map(p => ({
    objectID: p.id,
    ...p,
    _geoloc: { lat: p.lat, lng: p.lng },
    heroImage: (p.property_images as any[])
      ?.sort((a,b) => a.sort_order - b.sort_order)[0]?.url || null,
    priceFormatted: new Intl.NumberFormat('en-GB', {
      style: 'currency', currency: 'GBP',
      maximumFractionDigits: 0
    }).format(p.price)
  }))

  await algoliaClient.saveObjects({
    indexName: 'nestiq_properties',
    objects: records
  })
  
  console.log(`Successfully indexed ${records.length} properties in Algolia v5.`)
}

sync()
