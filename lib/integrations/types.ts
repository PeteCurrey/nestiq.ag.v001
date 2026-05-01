export interface NormalisedProperty {
  id: string;
  reference: string;
  status: "active" | "under_offer" | "sold" | "let" | "withdrawn";
  listingType: "sale" | "rent";
  price: number;
  rentFrequency?: "per_month" | "per_week";
  title: string;
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
  agencyId: string;
  agencyName: string;
  branchId: string;
  createdAt: string;
  updatedAt: string;
}
