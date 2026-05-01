import { NormalisedProperty } from "./types";

// Vebra Alto REST API
export async function fetchVebraProperties(apiKey: string): Promise<any[]> {
  return [];
}

export function normaliseVebraProperty(p: any, agencyId: string, agencyName: string): NormalisedProperty {
  return {} as NormalisedProperty; // Placeholder
}
