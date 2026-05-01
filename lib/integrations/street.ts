import { NormalisedProperty } from "./types";

// Street API base: https://api.street.co.uk/v2/
// Auth: Bearer token
// Properties: GET /branches/{branchId}/properties?include=images,features

export async function fetchStreetProperties(
  apiKey: string, 
  branchId: string
): Promise<any[]> {
  // In a real scenario, this would call the Street API
  /*
  const res = await fetch(
    `https://api.street.co.uk/v2/branches/${branchId}/properties?include=images,features`,
    { headers: { Authorization: `Bearer ${apiKey}` } }
  )
  const data = await res.json()
  return data.properties
  */
  return [];
}

export function normaliseStreetProperty(p: any, agencyId: string, agencyName: string): NormalisedProperty {
  // Map Street's field names to Nestiq's standard property shape
  return {
    id: p.id?.toString() || "",
    reference: p.reference || "",
    status: p.status === 'available' ? 'active' : 'under_offer', // Simplified mapping
    listingType: p.type === 'lettings' ? 'rent' : 'sale',
    price: p.price?.amount || 0,
    rentFrequency: p.price?.frequency === 'pcm' ? 'per_month' : 'per_week',
    title: p.display_address || "",
    address: {
      line1: p.address?.address_1 || "",
      line2: p.address?.address_2,
      town: p.address?.town || "",
      county: p.address?.county,
      postcode: p.address?.postcode || "",
    },
    coordinates: p.address?.coordinates ? {
      lat: parseFloat(p.address.coordinates.latitude),
      lng: parseFloat(p.address.coordinates.longitude)
    } : undefined,
    propertyType: p.property_type || "",
    bedrooms: p.bedrooms || 0,
    bathrooms: p.bathrooms || 0,
    receptions: p.receptions || 0,
    sqft: p.internal_area?.amount,
    description: p.description || "",
    features: p.features?.map((f: any) => f.name) || [],
    epcRating: p.epc?.current_rating,
    councilTaxBand: p.council_tax_band,
    photos: p.images?.map((img: any) => ({ url: img.url, caption: img.caption })) || [],
    floorplanUrl: p.floorplans?.[0]?.url,
    virtualTourUrl: p.virtual_tours?.[0]?.url,
    agencyId,
    agencyName,
    branchId: p.branch_id?.toString() || "",
    createdAt: p.created_at || new Date().toISOString(),
    updatedAt: p.updated_at || new Date().toISOString(),
  };
}
