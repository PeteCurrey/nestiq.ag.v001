import { NormalisedProperty } from "./types";

// Reapit Foundations API
export async function fetchReapitProperties(apiKey: string): Promise<any[]> {
  return [];
}

export function normaliseReapitProperty(p: any, agencyId: string, agencyName: string): NormalisedProperty {
  return {} as NormalisedProperty; // Placeholder
}
