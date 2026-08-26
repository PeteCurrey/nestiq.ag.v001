import { NormalisedProperty } from "./types";
import { parseBLM, BlmParseResult } from "./blm";

/**
 * Migration path for an agent moving stock onto NestIQ.
 *
 * An agent's own export from their portal account is BLM, so this is a thin
 * wrapper over the BLM parser. It is agent-supplied data for their own
 * listings — not a crawl, and not related to lib/scrapers.
 */
export async function importAgentExport(
  exportFile: string,
  agencyId: string,
  agencyName: string,
  branchId?: string
): Promise<BlmParseResult> {
  return parseBLM(exportFile, agencyId, agencyName, branchId);
}

/** @deprecated Use importAgentExport, which surfaces rejected rows. */
export async function importFromRightmove(
  exportFile: string,
  agencyId: string,
  agencyName: string
): Promise<NormalisedProperty[]> {
  return parseBLM(exportFile, agencyId, agencyName).properties;
}
