import { algoliasearch } from 'algoliasearch';
import { createClient } from "@supabase/supabase-js";

// Initialize Algolia client with the Admin Key
const algoliaClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
  process.env.ALGOLIA_ADMIN_KEY!
);

const INDEX_NAME = 'nestiq_properties_dev';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function syncPropertiesToAlgolia() {
  console.log("Starting Algolia sync...");
  
  // Fetch properties and related images/agencies
  const { data: properties, error } = await supabaseAdmin
    .from('properties')
    .select(`
      *,
      agencies ( name, slug, logo_url, phone ),
      property_images ( url, sort_order )
    `)
    .in('status', ['for-sale', 'to-rent']);

  if (error) {
    console.error("Supabase error fetching properties for Algolia:", error);
    throw error;
  }

  if (!properties || properties.length === 0) {
    console.log("No active properties to sync to Algolia.");
    return 0;
  }

  const records = properties.map(p => {
    // Determine main image
    let imageUrl = null;
    if (p.property_images && p.property_images.length > 0) {
      // Sort to get the first image
      const sortedImages = Array.isArray(p.property_images) 
        ? p.property_images.sort((a: any, b: any) => (a.sort_order || 0) - (b.sort_order || 0))
        : p.property_images;
      imageUrl = Array.isArray(sortedImages) ? sortedImages[0]?.url : null;
    }

    return {
      objectID: p.id,
      title: p.title,
      slug: p.slug,
      price: p.price,
      price_qualifier: p.price_qualifier,
      listing_type: p.listing_type,
      property_type: p.property_type,
      status: p.status,
      bedrooms: p.bedrooms,
      bathrooms: p.bathrooms,
      reception_rooms: p.reception_rooms,
      sqft: p.sqft,
      town: p.town,
      county: p.county,
      postcode: p.postcode,
      features: p.features,
      epc_rating: p.epc_rating,
      council_tax_band: p.council_tax_band,
      featured: p.featured,
      published_at: p.published_at,
      image_url: imageUrl,
      agency: {
        name: Array.isArray(p.agencies) ? p.agencies[0]?.name : p.agencies?.name,
        slug: Array.isArray(p.agencies) ? p.agencies[0]?.slug : p.agencies?.slug,
        logo_url: Array.isArray(p.agencies) ? p.agencies[0]?.logo_url : p.agencies?.logo_url,
        phone: Array.isArray(p.agencies) ? p.agencies[0]?.phone : p.agencies?.phone
      },
      _geoloc: p.lat && p.lng ? {
        lat: p.lat,
        lng: p.lng
      } : undefined
    };
  });

  try {
    const response = await algoliaClient.saveObjects({ 
      indexName: INDEX_NAME, 
      objects: records 
    });
    console.log(`Successfully synced ${records.length} properties to Algolia.`);
    return records.length;
  } catch (err) {
    console.error("Algolia sync error:", err);
    throw err;
  }
}
