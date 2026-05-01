import { NormalisedProperty } from "./types";

// Jupix XML feed ingestion (GET /feed?api_key={key}&format=json)
export async function fetchJupixProperties(apiKey: string): Promise<any[]> {
  return [];
}

export function normaliseJupixProperty(p: any, agencyId: string, agencyName: string): NormalisedProperty {
  return {} as NormalisedProperty; // Placeholder
}
