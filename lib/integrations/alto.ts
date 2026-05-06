import { NormalisedProperty } from "./types";

export interface AltoProperty {
  id: string;
  reference: string;
  status: 'active' | 'under_offer' | 'sold' | 'let' | 'withdrawn';
  listingType: 'sale' | 'rent';
  price: number;
  rentFrequency?: 'per_month' | 'per_week';
  address: {
    line1: string;
    line2?: string;
    town: string;
    county?: string;
    postcode: string;
  };
  coordinates?: { lat: number; lng: number };
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  receptions: number;
  sqft?: number;
  description: string;
  features: string[];
  epcRating?: string;
  councilTaxBand?: string;
  photos: Array<{ url: string; caption?: string }>;
  floorplanUrl?: string;
  virtualTourUrl?: string;
  branchId: string;
  agentName?: string;
  createdAt: string;
  updatedAt: string;
}

export async function fetchAltoProperties(apiKey: string): Promise<AltoProperty[]> {
  console.log(`Fetching properties from Alto with key: ${apiKey.substring(0, 4)}...`);
  
  const all: AltoProperty[] = [];
  let page = 1;
  let hasMore = true;

  // Since we don't have a real API key yet, we mock the fetch conditionally,
  // but we leave the real code active if a key is provided.
  if (apiKey === "mock" || !apiKey) {
    // Return empty array or mock data if we are just testing without key
    return [];
  }

  try {
    while (hasMore) {
      const res = await fetch(
        `https://api.alto-software.com/v1/properties?status=active&limit=100&page=${page}`,
        { headers: { Authorization: `Bearer ${apiKey}` } }
      );
      if (!res.ok) {
        throw new Error(`Alto API error: ${res.status} ${res.statusText}`);
      }
      const data = await res.json();
      if (data.properties && Array.isArray(data.properties)) {
        all.push(...data.properties);
      }
      hasMore = data.hasMore ?? false;
      page++;
    }
  } catch (error) {
    console.error("Error fetching from Alto:", error);
    throw error;
  }

  return all;
}

function mapStatus(altoStatus: string): string {
  switch (altoStatus) {
    case 'active': return 'for-sale';
    case 'under_offer': return 'under-offer';
    case 'sold': return 'sold';
    case 'let': return 'let';
    case 'withdrawn': return 'withdrawn';
    default: return 'for-sale';
  }
}

function mapPropertyType(altoType: string): string {
  // Mapping standard Alto property types to Nestiq enums if needed
  const t = altoType.toLowerCase();
  if (t.includes('flat') || t.includes('apartment')) return 'flat';
  if (t.includes('bungalow')) return 'bungalow';
  if (t.includes('terraced')) return 'terraced';
  if (t.includes('semi')) return 'semi-detached';
  if (t.includes('detached')) return 'detached';
  return altoType; // fallback
}

function generateSlug(address: string, externalId: string): string {
  const safeAddress = address.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  return `${safeAddress}-${externalId.substring(0, 6)}`;
}

export function normaliseAltoProperty(p: AltoProperty, agencyId: string, agencyName: string): any {
  const mappedStatus = mapStatus(p.status);
  // Re-map rent statuses
  const finalStatus = (p.listingType === 'rent' && mappedStatus === 'for-sale') ? 'to-rent' : mappedStatus;

  const addressString = `${p.address.line1}, ${p.address.town}`;
  
  return {
    external_id: p.id,
    agency_id: agencyId,
    title: `${p.bedrooms} Bed ${p.propertyType} in ${p.address.town}`,
    slug: generateSlug(addressString, p.id),
    description: p.description,
    price: p.price,
    price_qualifier: null,
    listing_type: p.listingType,
    property_type: mapPropertyType(p.propertyType),
    status: finalStatus,
    bedrooms: p.bedrooms,
    bathrooms: p.bathrooms,
    reception_rooms: p.receptions,
    sqft: p.sqft || null,
    lat: p.coordinates?.lat || null,
    lng: p.coordinates?.lng || null,
    address_line1: p.address.line1,
    town: p.address.town,
    county: p.address.county || null,
    postcode: p.address.postcode,
    features: p.features || [],
    epc_rating: p.epcRating || null,
    council_tax_band: p.councilTaxBand || null,
    virtual_tour_url: p.virtualTourUrl || null,
    published_at: p.createdAt,
    // Note: Photos will be handled separately as property_images rows
    _photos: p.photos 
  };
}
