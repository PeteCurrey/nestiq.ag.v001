import { algoliasearch } from 'algoliasearch'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

async function setup() {
  console.log('Setting up Algolia index (v5)...')
  
  const client = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
    process.env.ALGOLIA_ADMIN_KEY!
  )

  await client.setSettings({
    indexName: 'nestiq_properties',
    indexSettings: {
      searchableAttributes: [
        'title', 'address_line1', 'town', 'postcode',
        'description', 'features'
      ],
      attributesForFaceting: [
        'filterOnly(listing_type)',
        'filterOnly(property_type)',
        'filterOnly(status)',
        'filterOnly(bedrooms)',
        'filterOnly(bathrooms)',
        'filterOnly(price)',
        'filterOnly(town)',
        'filterOnly(county)',
        'filterOnly(garden)',
        'filterOnly(parking)',
        'filterOnly(pets_allowed)'
      ],
      customRanking: [
        'desc(featured)',
        'desc(enquiry_count)',
        'desc(published_at)'
      ]
    }
  })
  
  console.log('Algolia v5 settings applied.')
}

setup()
