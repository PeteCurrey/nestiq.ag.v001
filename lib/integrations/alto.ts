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
  // In a real scenario, this would call the Alto API
  // For the demo, we will simulate the response with Dales & Peaks listings
  console.log(`Fetching properties from Alto with key: ${apiKey.substring(0, 4)}...`);
  
  // Simulation of pagination
  const all: AltoProperty[] = [];
  let page = 1;
  let hasMore = true;

  // Real implementation (commented out for now as we don't have a live token)
  /*
  while (hasMore) {
    const res = await fetch(
      `https://api.alto-software.com/v1/properties?status=active&limit=100&page=${page}`,
      { headers: { Authorization: `Bearer ${apiKey}` } }
    )
    const data = await res.json()
    all.push(...data.properties)
    hasMore = data.hasMore ?? false
    page++
  }
  */

  return all;
}

export function normaliseAltoProperty(p: AltoProperty, agencyId: string, agencyName: string): NormalisedProperty {
  return {
    id: p.id,
    reference: p.reference,
    status: p.status,
    listingType: p.listingType,
    price: p.price,
    rentFrequency: p.rentFrequency,
    title: `${p.bedrooms} Bedroom ${p.propertyType} in ${p.address.town}`,
    address: p.address,
    coordinates: p.coordinates,
    propertyType: p.propertyType,
    bedrooms: p.bedrooms,
    bathrooms: p.bathrooms,
    receptions: p.receptions,
    sqft: p.sqft,
    description: p.description,
    features: p.features,
    epcRating: p.epcRating,
    councilTaxBand: p.councilTaxBand,
    photos: p.photos,
    floorplanUrl: p.floorplanUrl,
    virtualTourUrl: p.virtualTourUrl,
    agencyId,
    agencyName,
    branchId: p.branchId,
    createdAt: p.createdAt,
    updatedAt: p.updatedAt,
  };
}
