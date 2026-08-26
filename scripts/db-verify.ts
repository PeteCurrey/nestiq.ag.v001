/**
 * Checks the live database matches what the migrations intend.
 *
 *   npm run db:verify
 *
 * Written because the biggest defect found in this codebase was RLS enabled
 * with no policy — a silent deny-all that looks fine until every query returns
 * nothing. That class of problem does not show up in a migration that "ran
 * successfully", so it gets checked explicitly here.
 */
import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const EXPECTED_TABLES = [
  "agencies", "agent_reviews", "branch_claims", "branches", "bookings",
  "contacts", "enquiries", "forwarded_leads", "founding_recipients",
  "location_pages", "market_data", "profiles", "properties",
  "property_images", "property_status_events", "saved_properties",
  "saved_searches", "sync_logs", "valuation_requests",
];

let failures = 0;
let warnings = 0;

function pass(msg: string) { console.log(`  ok    ${msg}`); }
function fail(msg: string) { console.log(`  FAIL  ${msg}`); failures++; }
function warn(msg: string) { console.log(`  warn  ${msg}`); warnings++; }

async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error("\nDATABASE_URL is not set. See .env.example.\n");
    process.exit(1);
  }

  const client = new Client({ connectionString, ssl: { rejectUnauthorized: false } });
  await client.connect();

  // --- tables ---------------------------------------------------------------
  console.log("\nTables");
  const { rows: tables } = await client.query<{ tablename: string }>(
    "SELECT tablename FROM pg_tables WHERE schemaname = 'public'"
  );
  const present = new Set(tables.map((t) => t.tablename));
  const missing = EXPECTED_TABLES.filter((t) => !present.has(t));

  if (missing.length === 0) pass(`all ${EXPECTED_TABLES.length} expected tables present`);
  else fail(`missing: ${missing.join(", ")}`);

  // --- RLS: enabled but no policy is a silent deny-all ----------------------
  console.log("\nRow Level Security");
  const { rows: rls } = await client.query<{
    tablename: string; rls_enabled: boolean; policy_count: string;
  }>(`
    SELECT c.relname AS tablename,
           c.relrowsecurity AS rls_enabled,
           (SELECT COUNT(*) FROM pg_policies p
             WHERE p.schemaname = 'public' AND p.tablename = c.relname) AS policy_count
      FROM pg_class c
      JOIN pg_namespace n ON n.oid = c.relnamespace
     WHERE n.nspname = 'public' AND c.relkind = 'r'
     ORDER BY c.relname
  `);

  // Deliberately service-role-only; no policy is correct for these.
  const INTENTIONALLY_LOCKED = new Set([
    "founding_recipients", "bookings", "branch_claims", "schema_migrations",
  ]);

  const denyAll = rls.filter(
    (r) => r.rls_enabled && Number(r.policy_count) === 0 && !INTENTIONALLY_LOCKED.has(r.tablename)
  );
  const noRls = rls.filter((r) => !r.rls_enabled && r.tablename !== "schema_migrations");

  if (denyAll.length === 0) pass("no table has RLS enabled without policies");
  else fail(`RLS on but zero policies (denies everything): ${denyAll.map((r) => r.tablename).join(", ")}`);

  if (noRls.length === 0) pass("RLS enabled on every public table");
  else warn(`RLS not enabled: ${noRls.map((r) => r.tablename).join(", ")}`);

  const totalPolicies = rls.reduce((n, r) => n + Number(r.policy_count), 0);
  pass(`${totalPolicies} policies defined`);

  // --- indexes --------------------------------------------------------------
  console.log("\nIndexes");
  const { rows: idx } = await client.query<{ count: string }>(
    "SELECT COUNT(*) AS count FROM pg_indexes WHERE schemaname = 'public'"
  );
  const indexCount = Number(idx[0].count);
  if (indexCount >= 25) pass(`${indexCount} indexes present`);
  else warn(`${indexCount} indexes — expected 25+; did 0002 run?`);

  // --- generated columns ----------------------------------------------------
  console.log("\nCompleteness scoring");
  const { rows: gen } = await client.query<{ column_name: string }>(`
    SELECT column_name FROM information_schema.columns
     WHERE table_schema = 'public' AND table_name = 'properties'
       AND is_generated = 'ALWAYS'
  `);
  const genCols = gen.map((g) => g.column_name);
  for (const c of ["part_a_score", "part_b_score", "part_c_score", "completeness_score"]) {
    if (genCols.includes(c)) pass(`properties.${c} is a generated column`);
    else fail(`properties.${c} missing or not generated`);
  }

  // --- provenance guard rail ------------------------------------------------
  console.log("\nCompiled-listing constraint");
  const { rows: con } = await client.query<{ conname: string }>(`
    SELECT conname FROM pg_constraint
     WHERE conrelid = 'public.properties'::regclass
       AND conname = 'properties_compiled_requires_provenance'
  `);
  if (con.length === 1) pass("compiled listings require source_url, compiled_at and expires_at");
  else fail("properties_compiled_requires_provenance is missing — seeded data could be created unattributed");

  // Prove the constraint actually bites, then roll back.
  try {
    await client.query("BEGIN");
    await client.query(`
      INSERT INTO public.properties
        (title, slug, price, listing_type, property_type, address_line1, town, postcode, provenance)
      VALUES ('constraint probe', 'constraint-probe-${Date.now()}', 1, 'sale', 'House',
              '1 Test St', 'Chesterfield', 'S40 1AA', 'compiled')
    `);
    await client.query("ROLLBACK");
    fail("a compiled listing with no source_url was accepted — the constraint is not enforcing");
  } catch {
    await client.query("ROLLBACK");
    pass("verified: compiled listing without provenance is rejected");
  }

  // --- triggers -------------------------------------------------------------
  console.log("\nTriggers");
  const { rows: trg } = await client.query<{ tgname: string }>(`
    SELECT tgname FROM pg_trigger
     WHERE NOT tgisinternal
       AND tgrelid IN ('public.properties'::regclass, 'public.branches'::regclass,
                       'public.agent_reviews'::regclass, 'public.profiles'::regclass)
  `);
  const names = trg.map((t) => t.tgname);
  for (const t of [
    "branches_enforce_opt_out",
    "properties_block_opted_out",
    "properties_refresh_branch_count",
    "agent_reviews_refresh_stats",
  ]) {
    if (names.includes(t)) pass(`trigger ${t}`);
    else fail(`trigger ${t} missing`);
  }

  // --- row counts -----------------------------------------------------------
  console.log("\nData");
  for (const t of ["agencies", "branches", "properties", "location_pages", "market_data"]) {
    if (!present.has(t)) continue;
    const { rows } = await client.query<{ count: string }>(`SELECT COUNT(*) AS count FROM public.${t}`);
    console.log(`        ${t.padEnd(18)} ${rows[0].count}`);
  }

  console.log(
    `\n${failures === 0 ? "PASS" : "FAIL"} — ${failures} failure(s), ${warnings} warning(s)\n`
  );

  await client.end();
  process.exit(failures === 0 ? 0 : 1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
