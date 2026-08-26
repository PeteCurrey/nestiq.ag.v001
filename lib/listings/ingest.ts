import { createAdminClient } from "@/lib/supabase/admin";
import { NormalisedProperty } from "@/lib/integrations/types";

/**
 * The single ingestion path for listings, whatever their origin.
 *
 * Both tracks land here so there is one place to audit:
 *
 *   agent_direct  keyed in by the agent in the NestIQ portal
 *   agent_feed    authorised CRM feed — the agent's own data, by arrangement
 *   compiled      assembled from public sources; unverified, and treated with
 *                 materially more restraint (see COMPILED RULES below)
 *
 * COMPILED RULES — enforced here, not left to callers:
 *
 *   1. Photography is never copied. Images belong to the photographer or the
 *      agency and are the strongest claim anyone could bring. Compiled listings
 *      carry no images at all; the UI shows a map or an area illustration.
 *   2. Descriptions are never reproduced. The agent's prose is theirs. We store
 *      only the underlying facts and generate our own copy separately.
 *   3. Provenance and an expiry are mandatory. The database enforces this too,
 *      but failing early with a clear message beats a constraint violation.
 *   4. A branch that has opted out is never written to.
 */

export const COMPILED_TTL_DAYS = 60;

export type Provenance = "agent_direct" | "agent_feed" | "compiled";

export interface IngestOptions {
  provenance: Provenance;
  branchId: string;
  /** Set for authorised listings. Compiled listings have no agency until claimed. */
  agencyId?: string;
  /** Required for compiled listings — the public page the facts came from. */
  sourceUrlFor?: (listing: NormalisedProperty) => string;
  ttlDays?: number;
}

export interface IngestResult {
  inserted: number;
  updated: number;
  skipped: number;
  errors: Array<{ reference: string; reason: string }>;
}

function slugify(listing: NormalisedProperty): string {
  const base = `${listing.address.line1}-${listing.address.postcode}`
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 60)
    .replace(/^-|-$/g, "");
  return `${base}-${listing.reference.toLowerCase().replace(/[^a-z0-9]/g, "")}`;
}

const STATUS_MAP: Record<NormalisedProperty["status"], string> = {
  active: "active",
  under_offer: "under_offer",
  sold: "sold",
  let: "let",
  withdrawn: "withdrawn",
};

export async function ingestListings(
  listings: NormalisedProperty[],
  options: IngestOptions
): Promise<IngestResult> {
  const supabase = createAdminClient();
  const result: IngestResult = { inserted: 0, updated: 0, skipped: 0, errors: [] };

  const isCompiled = options.provenance === "compiled";

  if (isCompiled && !options.sourceUrlFor) {
    throw new Error("Compiled listings require sourceUrlFor — provenance must be attributable.");
  }

  // Refuse outright if the branch has opted out. The database blocks this too,
  // but a caller should never get as far as attempting it.
  const { data: branch, error: branchError } = await supabase
    .from("branches")
    .select("id, claim_state, agency_id")
    .eq("id", options.branchId)
    .single();

  if (branchError || !branch) {
    throw new Error(`Unknown branch ${options.branchId}: ${branchError?.message ?? "not found"}`);
  }

  if (branch.claim_state === "opted_out") {
    throw new Error(`Branch ${options.branchId} has opted out; refusing to ingest.`);
  }

  const now = new Date();
  const expiresAt = isCompiled
    ? new Date(now.getTime() + (options.ttlDays ?? COMPILED_TTL_DAYS) * 86_400_000).toISOString()
    : null;

  for (const listing of listings) {
    try {
      const externalId = `${options.provenance}:${options.branchId}:${listing.reference}`;

      const row = {
        agency_id: options.agencyId ?? branch.agency_id ?? null,
        branch_id: options.branchId,
        external_id: externalId,
        provenance: options.provenance,
        data_source: options.provenance,

        title: listing.title,
        slug: slugify(listing),

        // Rule 2: never reproduce the agent's description on a compiled listing.
        description: isCompiled ? null : listing.description,

        price: listing.price,
        listing_type: listing.listingType,
        property_type: listing.propertyType,
        status: STATUS_MAP[listing.status] ?? "active",

        bedrooms: listing.bedrooms,
        bathrooms: listing.bathrooms,
        reception_rooms: listing.receptions,
        sqft: listing.sqft ?? null,

        lat: listing.coordinates?.lat ?? null,
        lng: listing.coordinates?.lng ?? null,
        address_line1: listing.address.line1,
        town: listing.address.town,
        county: listing.address.county ?? null,
        postcode: listing.address.postcode,

        // Rule 2 again: features are the agent's marketing copy.
        features: isCompiled ? [] : listing.features,
        epc_rating: listing.epcRating ?? null,
        council_tax_band: listing.councilTaxBand ?? null,

        source_url: isCompiled ? options.sourceUrlFor!(listing) : null,
        compiled_at: isCompiled ? now.toISOString() : null,
        expires_at: expiresAt,

        updated_at: now.toISOString(),
      };

      const { data: existing } = await supabase
        .from("properties")
        .select("id")
        .eq("external_id", externalId)
        .maybeSingle();

      if (existing) {
        const { error } = await supabase.from("properties").update(row).eq("id", existing.id);
        if (error) throw new Error(error.message);
        result.updated += 1;
        continue;
      }

      const { data: inserted, error } = await supabase
        .from("properties")
        .insert(row)
        .select("id")
        .single();

      if (error) throw new Error(error.message);
      result.inserted += 1;

      // Rule 1: images only ever come from authorised sources.
      if (!isCompiled && listing.photos.length > 0 && inserted) {
        const images = listing.photos.map((photo, index) => ({
          property_id: inserted.id,
          url: photo.url,
          alt_text: photo.caption ?? null,
          sort_order: index,
        }));
        const { error: imageError } = await supabase.from("property_images").insert(images);
        if (imageError) {
          result.errors.push({
            reference: listing.reference,
            reason: `Listing saved but images failed: ${imageError.message}`,
          });
        }
      }
    } catch (err) {
      result.errors.push({
        reference: listing.reference,
        reason: err instanceof Error ? err.message : "Unknown ingest error",
      });
    }
  }

  await supabase.from("sync_logs").insert({
    agency_id: branch.agency_id,
    source: options.provenance,
    status: result.errors.length === 0 ? "success" : "partial",
    details: `branch=${options.branchId} inserted=${result.inserted} updated=${result.updated} errors=${result.errors.length}`,
  });

  return result;
}
