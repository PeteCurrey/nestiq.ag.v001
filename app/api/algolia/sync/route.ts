import { NextResponse } from 'next/server'
import { algoliasearch } from 'algoliasearch'

const client = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
  process.env.ALGOLIA_ADMIN_KEY!
)

export async function POST(req: Request) {
  // 1. Verify Supabase Webhook Secret (optional but recommended)
  // For now, we'll assume it's secured via service-role-like logic or a secret header
  
  try {
    const payload = await req.json()
    const { table, type, record, old_record } = payload

    if (table !== 'properties') {
      return NextResponse.json({ error: 'Invalid table' }, { status: 400 })
    }

    const index = 'nestiq_properties'

    switch (type) {
      case 'INSERT':
      case 'UPDATE':
        // Map record to Algolia object
        const algoliaObject = {
          objectID: record.id,
          title: record.title,
          slug: record.slug,
          description: record.description,
          price: record.price,
          address_line1: record.address_line1,
          town: record.town,
          county: record.county,
          postcode: record.postcode,
          listing_type: record.listing_type,
          property_type: record.property_type,
          status: record.status,
          bedrooms: record.bedrooms,
          bathrooms: record.bathrooms,
          sqft: record.sqft,
          features: record.features,
          garden: record.garden,
          parking: record.parking,
          tenure: record.tenure,
          council_tax_band: record.council_tax_band,
          epc_rating: record.epc_rating,
          agency_id: record.agency_id,
          published_at: record.published_at,
          enquiry_count: record.enquiry_count || 0,
          featured: record.featured || false,
          _geoloc: {
            lat: record.lat,
            lng: record.lng
          }
        }
        
        await client.saveObject({
           indexName: index,
           body: algoliaObject
        })
        break

      case 'DELETE':
        await client.deleteObject({
           indexName: index,
           objectID: old_record.id
        })
        break
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Algolia Sync Error:', error)
    return NextResponse.json({ error: 'Failed to sync with Algolia' }, { status: 500 })
  }
}
