/**
 * Seeds the database with Chesterfield launch data.
 *
 *   npm run db:seed
 *
 * Goes direct over DATABASE_URL rather than through supabase-js, so it works
 * before the API keys are configured, and so RLS is not in the way.
 *
 * Idempotent — re-running updates rather than duplicating.
 *
 * Everything here is provenance 'agent_direct': demonstration stock belonging
 * to a fictional agency. Nothing in this file is compiled from a third party.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

type SeedProperty = {
  title: string; slug: string; description: string; price: number;
  listing_type: "sale" | "rent"; property_type: string;
  bedrooms: number; bathrooms: number;
  address_line1: string; town: string; postcode: string;
  lat: number; lng: number;
  features: string[]; status: string;
  epc_rating?: string; council_tax_band?: string; images?: string[];
  deposit?: number; min_tenancy?: number; available_from?: string;
};

type SeedLocation = { slug: string; h1: string; type: string; location: string };

const dataDir = join(process.cwd(), "scripts/data");
const properties: SeedProperty[] = JSON.parse(
  readFileSync(join(dataDir, "chesterfield-properties.json"), "utf8")
);
const locations: SeedLocation[] = JSON.parse(
  readFileSync(join(dataDir, "locations.json"), "utf8")
);

/**
 * Material information, varied deliberately so the completeness score has
 * something to show: some listings fully disclosed, some partial, one bare.
 * A demo where every listing scores 100 demonstrates nothing.
 */
function materialInfo(index: number) {
  const tier = index % 3;

  if (tier === 0) {
    // Fully disclosed — what a good agent looks like.
    return {
      tenure: "Freehold",
      construction_type: "Standard brick and block",
      heating_type: "Gas central heating",
      water_supply: "Mains",
      electricity_supply: "Mains",
      sewerage_type: "Mains",
      broadband_type: "Full fibre (FTTP)",
      broadband_max_mbps: 900,
      mobile_coverage: JSON.stringify({ ee: "good", o2: "good", three: "limited", vodafone: "good" }),
      parking_type: ["Driveway", "Garage"],
      flood_risk: "very_low",
      building_safety_issues: "None known",
      restrictive_covenants: "None known",
      rights_of_way: "None known",
      listed_grade: "none",
      conservation_area: false,
      mining_area: true, // Derbyshire — historic coal mining is genuinely material here
      japanese_knotweed: false,
      sales_pack_status: "ready",
    };
  }

  if (tier === 1) {
    // Part A and most of Part B, nothing conditional.
    return {
      tenure: "Freehold",
      construction_type: "Standard brick and block",
      heating_type: "Gas central heating",
      water_supply: "Mains",
      electricity_supply: "Mains",
      sewerage_type: "Mains",
      broadband_type: "Superfast (FTTC)",
      broadband_max_mbps: 67,
      mobile_coverage: null,
      parking_type: ["On street"],
      flood_risk: null,
      building_safety_issues: null,
      restrictive_covenants: null,
      rights_of_way: null,
      listed_grade: null,
      conservation_area: null,
      mining_area: null,
      japanese_knotweed: null,
      sales_pack_status: "in_progress",
    };
  }

  // Bare listing — the status quo on most portals.
  return {
    tenure: null,
    construction_type: null,
    heating_type: null,
    water_supply: null,
    electricity_supply: null,
    sewerage_type: null,
    broadband_type: null,
    broadband_max_mbps: null,
    mobile_coverage: null,
    parking_type: null,
    flood_risk: null,
    building_safety_issues: null,
    restrictive_covenants: null,
    rights_of_way: null,
    listed_grade: null,
    conservation_area: null,
    mining_area: null,
    japanese_knotweed: null,
    sales_pack_status: "none",
  };
}

async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error("\nDATABASE_URL is not set. See .env.example.\n");
    process.exit(1);
  }

  const client = new Client({ connectionString, ssl: { rejectUnauthorized: false } });
  await client.connect();

  console.log("");

  // --- agency ---------------------------------------------------------------
  const { rows: [agency] } = await client.query<{ id: string }>(`
    INSERT INTO public.agencies
      (name, slug, description, phone, email, website,
       address_line1, town, county, postcode, is_verified, plan_tier, integration_type, specialisms)
    VALUES
      ('Northgate Residential', 'northgate-residential',
       'Independent estate agent covering Chesterfield, north east Derbyshire and the Peak District fringe.',
       '01246 000000', 'hello@northgate-residential.example', 'https://northgate-residential.example',
       '1 Knifesmithgate', 'Chesterfield', 'Derbyshire', 'S40 1RL',
       TRUE, 'pro', 'manual', ARRAY['residential_sales','lettings'])
    ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name
    RETURNING id
  `);
  console.log(`  agency    Northgate Residential (demonstration account)`);

  // --- branch ---------------------------------------------------------------
  const { rows: [branch] } = await client.query<{ id: string }>(`
    INSERT INTO public.branches
      (agency_id, name, slug, phone, email, address_line1, town, postcode, lat, lng, claim_state)
    VALUES ($1, 'Northgate Residential — Chesterfield', 'northgate-residential-chesterfield',
            '01246 000000', 'chesterfield@northgate-residential.example',
            '1 Knifesmithgate', 'Chesterfield', 'S40 1RL', 53.2350, -1.4270, 'claimed')
    ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name
    RETURNING id
  `, [agency.id]);
  console.log(`  branch    Chesterfield (claimed)`);

  // --- properties -----------------------------------------------------------
  let inserted = 0;
  let images = 0;

  for (const [i, p] of properties.entries()) {
    const mi = materialInfo(i);

    const { rows: [row] } = await client.query<{ id: string }>(`
      INSERT INTO public.properties (
        agency_id, branch_id, external_id, provenance, data_source,
        title, slug, description, price, listing_type, property_type, status,
        bedrooms, bathrooms, address_line1, town, county, postcode, lat, lng,
        features, epc_rating, council_tax_band,
        deposit, min_tenancy, available_from,
        tenure, construction_type, heating_type, water_supply, electricity_supply,
        sewerage_type, broadband_type, broadband_max_mbps, mobile_coverage,
        parking_type, flood_risk, building_safety_issues, restrictive_covenants,
        rights_of_way, listed_grade, conservation_area, mining_area,
        japanese_knotweed, sales_pack_status, chain_status
      ) VALUES (
        $1, $2, $3, 'agent_direct', 'agent_direct',
        $4, $5, $6, $7, $8, $9, $10,
        $11, $12, $13, $14, 'Derbyshire', $15, $16, $17,
        $18, $19, $20,
        $21, $22, $23,
        $24, $25, $26, $27, $28,
        $29, $30, $31, $32,
        $33, $34, $35, $36,
        $37, $38, $39, $40,
        $41, $42, $43
      )
      ON CONFLICT (slug) DO UPDATE SET
        price = EXCLUDED.price,
        status = EXCLUDED.status,
        updated_at = NOW()
      RETURNING id
    `, [
      agency.id, branch.id, `seed:${p.slug}`,
      p.title, p.slug, p.description, p.price, p.listing_type, p.property_type, p.status,
      p.bedrooms, p.bathrooms, p.address_line1, p.town, p.postcode, p.lat, p.lng,
      p.features, p.epc_rating ?? null, p.council_tax_band ?? null,
      p.deposit ?? null, p.min_tenancy ?? null, p.available_from ?? null,
      mi.tenure, mi.construction_type, mi.heating_type, mi.water_supply, mi.electricity_supply,
      mi.sewerage_type, mi.broadband_type, mi.broadband_max_mbps, mi.mobile_coverage,
      mi.parking_type, mi.flood_risk, mi.building_safety_issues, mi.restrictive_covenants,
      mi.rights_of_way, mi.listed_grade, mi.conservation_area, mi.mining_area,
      mi.japanese_knotweed, mi.sales_pack_status,
      i % 4 === 0 ? "no_chain" : i % 4 === 1 ? "chain_below" : null,
    ]);

    inserted++;

    // Stock photography, clearly licensed for this use — not agency imagery.
    if (p.images?.length) {
      await client.query("DELETE FROM public.property_images WHERE property_id = $1", [row.id]);
      for (const [n, url] of p.images.entries()) {
        await client.query(
          `INSERT INTO public.property_images (property_id, url, alt_text, sort_order)
           VALUES ($1, $2, $3, $4)`,
          [row.id, url, `${p.title}, ${p.town}`, n]
        );
        images++;
      }
    }

    await client.query(
      `INSERT INTO public.property_status_events (property_id, event, price_at_event, occurred_at)
       VALUES ($1, 'listed', $2, NOW() - ($3 || ' days')::interval)`,
      [row.id, p.price, String(7 + i * 3)]
    );
  }
  console.log(`  listings  ${inserted} properties, ${images} images, ${inserted} status events`);

  // --- location pages -------------------------------------------------------
  let locCount = 0;
  for (const l of locations) {
    await client.query(`
      INSERT INTO public.location_pages
        (slug, h1, location_name, county, region, intro_paragraph, meta_title, meta_description)
      VALUES ($1, $2, $3, 'Derbyshire', 'East Midlands', $4, $5, $6)
      ON CONFLICT (slug) DO UPDATE SET h1 = EXCLUDED.h1, location_name = EXCLUDED.location_name
    `, [
      l.slug, l.h1, l.location,
      `Browse ${l.h1.toLowerCase()} with full material information disclosed upfront.`,
      `${l.h1} | NestIQ`,
      `${l.h1}. Compare listings with verified material information, chain status and no portal markup.`,
    ]);
    locCount++;
  }
  console.log(`  locations ${locCount} pages`);

  // --- market data ----------------------------------------------------------
  const market = [
    ["Chesterfield", 218400, 795, 41],
    ["Derbyshire", 264900, 850, 45],
    ["Sheffield", 246800, 925, 38],
    ["Peak District", 412500, 1150, 62],
    ["Dronfield", 298700, 895, 36],
  ] as const;

  for (const [area, price, rent, velocity] of market) {
    await client.query(`
      INSERT INTO public.market_data (area, property_type, avg_price, avg_rent, velocity, period)
      VALUES ($1, 'all', $2, $3, $4, date_trunc('month', CURRENT_DATE)::date)
    `, [area, price, rent, velocity]);
  }
  console.log(`  market    ${market.length} area records`);

  // --- featured rail ----------------------------------------------------
  // The homepage queries featured=true; without this the seed data is in the
  // database but invisible on the one page most visitors land on first.
  await client.query(`
    UPDATE public.properties SET featured = FALSE WHERE data_source = 'agent_direct'
  `);
  const { rows: featured } = await client.query<{ title: string }>(`
    UPDATE public.properties SET featured = TRUE
     WHERE id IN (
       SELECT id FROM public.properties
        WHERE status = 'active' AND data_source = 'agent_direct'
        ORDER BY completeness_score DESC, price DESC LIMIT 3
     )
     RETURNING title
  `);
  console.log(`  featured  ${featured.map((f) => f.title).join(", ")}`);

  // --- report ---------------------------------------------------------------
  const { rows: scores } = await client.query<{
    completeness_score: number; count: string;
  }>(`
    SELECT completeness_score, COUNT(*)::text AS count
      FROM public.properties GROUP BY completeness_score ORDER BY completeness_score DESC
  `);

  console.log("\n  Completeness score distribution:");
  for (const s of scores) {
    const bar = "█".repeat(Math.max(1, Math.round(s.completeness_score / 5)));
    console.log(`    ${String(s.completeness_score).padStart(3)}%  ${bar} ${s.count} listing(s)`);
  }

  console.log("\n  Seed complete.\n");
  await client.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
