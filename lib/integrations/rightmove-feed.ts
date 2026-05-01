import { NormalisedProperty } from "./types";
import { parseBLM } from "./openreach-blm";

/**
 * Migration path for agents leaving Rightmove.
 * Rightmove typically provides data in RMV3 or BLM formats.
 */
export async function importFromRightmove(exportFile: string, agencyId: string, agencyName: string): Promise<NormalisedProperty[]> {
  return parseBLM(exportFile, agencyId, agencyName);
}
