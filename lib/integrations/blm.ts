import { NormalisedProperty } from "./types";

/**
 * BLM feed parser.
 *
 * BLM is the de-facto flat-file format for UK property feeds. Most agency CRMs
 * can emit it, which is why it is the first integration worth building: one
 * parser unlocks a long tail of agencies whose software will never have a
 * bespoke NestIQ connector.
 *
 * Structure:
 *
 *   #HEADER#
 *   Version : 3
 *   EOF : '^'
 *   EOR : '~'
 *
 *   #DEFINITION#
 *   AGENT_REF^ADDRESS_1^TOWN^PRICE^...~
 *
 *   #DATA#
 *   REF001^12 High Street^Chesterfield^250000^...~
 *
 *   #END#
 *
 * The header declares the end-of-field and end-of-record characters, so they
 * must be read rather than assumed — some CRMs emit '|' or '#'.
 */

export interface BlmParseResult {
  properties: NormalisedProperty[];
  version: string | null;
  /** Rows that could not be parsed, with the reason. Never silently dropped. */
  rejected: Array<{ row: number; reason: string; agentRef?: string }>;
}

// --- BLM code tables --------------------------------------------------------

const TRANS_TYPE: Record<string, "sale" | "rent"> = {
  "1": "sale",
  "2": "rent",
};

/** STATUS_ID. 0 is available; anything else is some flavour of agreed/gone. */
const STATUS: Record<string, NormalisedProperty["status"]> = {
  "0": "active",
  "1": "under_offer", // Sold STC / Let Agreed
  "2": "sold",        // Sold / Let
  "3": "under_offer", // Under Offer
};

const TENURE: Record<string, string> = {
  "1": "Freehold",
  "2": "Leasehold",
  "3": "Feudal",
  "4": "Commonhold",
  "5": "Share of Freehold",
};

const PRICE_QUALIFIER: Record<string, string> = {
  "0": "",
  "1": "POA",
  "2": "Guide Price",
  "3": "Fixed Price",
  "4": "Offers in Excess of",
  "5": "Offers in the Region of",
  "6": "Sale by Tender",
  "7": "From",
  "9": "Shared Ownership",
  "10": "Offers Over",
  "11": "Part Buy Part Rent",
  "12": "Shared Equity",
};

const RENT_FREQUENCY: Record<string, "per_week" | "per_month"> = {
  "0": "per_week",
  "1": "per_month",
};

/** PROP_SUB_ID — the common subset. Unmapped ids fall back to "Property". */
const PROPERTY_TYPE: Record<string, string> = {
  "0": "Not Specified",
  "1": "Terraced",
  "2": "End of Terrace",
  "3": "Semi-Detached",
  "4": "Detached",
  "5": "Mews",
  "6": "Cluster House",
  "7": "Ground Floor Flat",
  "8": "Flat",
  "9": "Studio",
  "10": "Ground Floor Maisonette",
  "11": "Maisonette",
  "12": "Bungalow",
  "13": "Terraced Bungalow",
  "14": "Semi-Detached Bungalow",
  "15": "Detached Bungalow",
  "16": "Mobile Home",
  "17": "Hotel",
  "18": "Guest House",
  "20": "Land",
  "21": "Link Detached House",
  "22": "Town House",
  "23": "Cottage",
  "24": "Chalet",
  "27": "Villa",
  "28": "Apartment",
  "29": "Penthouse",
  "30": "Finca",
  "43": "Barn Conversion",
  "44": "Serviced Apartments",
  "56": "House",
  "59": "Duplex",
};

// --- Parsing ----------------------------------------------------------------

function stripQuotes(v: string): string {
  const t = v.trim();
  if (t.length >= 2 && ((t[0] === "'" && t.endsWith("'")) || (t[0] === '"' && t.endsWith('"')))) {
    return t.slice(1, -1);
  }
  return t;
}

function section(content: string, name: string): string | null {
  // Sections run from #NAME# to the next #...# marker.
  const re = new RegExp(`#${name}#([\\s\\S]*?)(?=#[A-Z]+#|$)`, "i");
  const m = content.match(re);
  return m ? m[1] : null;
}

function parseHeader(content: string) {
  const raw = section(content, "HEADER") ?? "";
  const get = (key: string) => {
    const m = raw.match(new RegExp(`^\\s*${key}\\s*:\\s*(.+)$`, "im"));
    return m ? stripQuotes(m[1]) : null;
  };
  return {
    version: get("Version"),
    eof: get("EOF") || "^",
    eor: get("EOR") || "~",
  };
}

function toInt(v: string | undefined): number {
  if (!v) return 0;
  const n = parseInt(v.replace(/[^0-9-]/g, ""), 10);
  return Number.isFinite(n) ? n : 0;
}

function toFloatOrUndefined(v: string | undefined): number | undefined {
  if (!v || !v.trim()) return undefined;
  const n = parseFloat(v.replace(/[^0-9.-]/g, ""));
  return Number.isFinite(n) ? n : undefined;
}

/** BLM dates arrive as YYYY-MM-DD HH:MM:SS or DD/MM/YYYY depending on the CRM. */
function toIso(v: string | undefined): string {
  if (!v || !v.trim()) return new Date().toISOString();
  const t = v.trim();

  const uk = t.match(/^(\d{2})\/(\d{2})\/(\d{4})/);
  if (uk) return new Date(`${uk[3]}-${uk[2]}-${uk[1]}T00:00:00Z`).toISOString();

  const parsed = new Date(t.replace(" ", "T"));
  return Number.isNaN(parsed.getTime()) ? new Date().toISOString() : parsed.toISOString();
}

function collectIndexed(
  row: Record<string, string>,
  prefix: string
): Array<{ index: number; value: string }> {
  const out: Array<{ index: number; value: string }> = [];
  for (const [key, value] of Object.entries(row)) {
    if (!value || !value.trim()) continue;
    const m = key.match(new RegExp(`^${prefix}_(\\d+)$`, "i"));
    if (m) out.push({ index: parseInt(m[1], 10), value: value.trim() });
  }
  return out.sort((a, b) => a.index - b.index);
}

export function parseBLM(
  content: string,
  agencyId: string,
  agencyName: string,
  branchId = ""
): BlmParseResult {
  const rejected: BlmParseResult["rejected"] = [];
  const properties: NormalisedProperty[] = [];

  const { version, eof, eor } = parseHeader(content);

  const definitionRaw = section(content, "DEFINITION");
  const dataRaw = section(content, "DATA");

  if (!definitionRaw || !dataRaw) {
    return {
      properties,
      version,
      rejected: [{ row: 0, reason: "Feed is missing a #DEFINITION# or #DATA# section" }],
    };
  }

  const fields = definitionRaw
    .split(eor)[0]
    .split(eof)
    .map((f) => f.trim().toUpperCase())
    .filter(Boolean);

  if (fields.length === 0) {
    return { properties, version, rejected: [{ row: 0, reason: "#DEFINITION# declared no fields" }] };
  }

  const records = dataRaw
    .split(eor)
    .map((r) => r.replace(/^[\r\n]+/, ""))
    .filter((r) => r.trim().length > 0);

  records.forEach((record, i) => {
    const rowNumber = i + 1;
    const values = record.split(eof);
    const row: Record<string, string> = {};
    fields.forEach((f, idx) => {
      row[f] = (values[idx] ?? "").trim();
    });

    const agentRef = row.AGENT_REF;

    try {
      // PUBLISHED_FLAG 0 means "remove this listing", not "listing with no flag".
      if (row.PUBLISHED_FLAG === "0") {
        rejected.push({ row: rowNumber, reason: "PUBLISHED_FLAG is 0 (withdrawn)", agentRef });
        return;
      }

      if (!agentRef) {
        rejected.push({ row: rowNumber, reason: "Missing AGENT_REF" });
        return;
      }

      const listingType = TRANS_TYPE[row.TRANS_TYPE_ID] ?? "sale";
      const price = toFloatOrUndefined(row.PRICE);

      if (price === undefined) {
        rejected.push({ row: rowNumber, reason: "Missing or unparseable PRICE", agentRef });
        return;
      }

      const postcode = [row.POSTCODE1, row.POSTCODE2].filter(Boolean).join(" ").trim();
      if (!postcode) {
        rejected.push({ row: rowNumber, reason: "Missing postcode", agentRef });
        return;
      }

      const features = Array.from({ length: 10 }, (_, n) => row[`FEATURE${n + 1}`])
        .filter((f): f is string => Boolean(f && f.trim()))
        .map((f) => f.trim());

      const photos = collectIndexed(row, "MEDIA_IMAGE").map(({ index, value }) => ({
        url: value,
        caption: row[`MEDIA_IMAGE_TEXT_${String(index).padStart(2, "0")}`] || undefined,
      }));

      const floorplan = collectIndexed(row, "MEDIA_FLOOR_PLAN")[0]?.value;

      const qualifier = PRICE_QUALIFIER[row.PRICE_QUALIFIER] ?? "";
      const displayAddress =
        row.DISPLAY_ADDRESS ||
        [row.ADDRESS_1, row.ADDRESS_2, row.TOWN].filter(Boolean).join(", ");

      const lat = toFloatOrUndefined(row.LATITUDE);
      const lng = toFloatOrUndefined(row.LONGITUDE);

      properties.push({
        id: `${agencyId}:${agentRef}`,
        reference: agentRef,
        status: STATUS[row.STATUS_ID] ?? "active",
        listingType,
        price,
        rentFrequency:
          listingType === "rent"
            ? RENT_FREQUENCY[row.LET_RENT_FREQUENCY] ?? "per_month"
            : undefined,
        title: [qualifier, displayAddress].filter(Boolean).join(" ").trim() || displayAddress,
        address: {
          line1: row.ADDRESS_1 || displayAddress,
          line2: row.ADDRESS_2 || undefined,
          town: row.TOWN || row.ADDRESS_3 || "",
          county: row.ADDRESS_4 || undefined,
          postcode,
        },
        coordinates: lat !== undefined && lng !== undefined ? { lat, lng } : undefined,
        propertyType: PROPERTY_TYPE[row.PROP_SUB_ID] ?? "Property",
        bedrooms: toInt(row.BEDROOMS),
        bathrooms: toInt(row.BATHROOMS),
        receptions: toInt(row.RECEPTIONS),
        sqft: toFloatOrUndefined(row.AREA_SQFT),
        description: row.DESCRIPTION || row.SUMMARY || "",
        features,
        epcRating: row.EPC_CURRENT_RATING || undefined,
        councilTaxBand: row.COUNCIL_TAX_BAND || undefined,
        photos,
        floorplanUrl: floorplan,
        virtualTourUrl: row.MEDIA_VIRTUAL_TOUR_00 || undefined,
        agencyId,
        agencyName,
        branchId: branchId || row.BRANCH_ID || "",
        createdAt: toIso(row.CREATE_DATE),
        updatedAt: toIso(row.UPDATE_DATE),
      });
    } catch (err) {
      rejected.push({
        row: rowNumber,
        reason: err instanceof Error ? err.message : "Unknown parse error",
        agentRef,
      });
    }
  });

  return { properties, version, rejected };
}

/** Tenure lookup, exposed for importers mapping BLM into the properties table. */
export function blmTenure(tenureTypeId: string | undefined): string | undefined {
  return tenureTypeId ? TENURE[tenureTypeId] : undefined;
}
