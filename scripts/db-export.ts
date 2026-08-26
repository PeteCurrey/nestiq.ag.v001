/**
 * Dumps every public table to JSON, so data can be carried from one Supabase
 * project to another.
 *
 *   OLD_DATABASE_URL="postgres://..." npm run db:export
 *
 * Writes to .backups/<timestamp>/<table>.json — gitignored, since these files
 * contain real contact details (founding_recipients holds agency principals'
 * names, emails and phone numbers).
 *
 * Reads whatever tables exist rather than a fixed list, so it works against the
 * old schema even though it differs from the current migrations.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function main() {
  const connectionString = process.env.OLD_DATABASE_URL || process.env.DATABASE_URL;

  if (!connectionString) {
    console.error(
      "\nSet OLD_DATABASE_URL to the project you are exporting FROM.\n\n" +
        '  OLD_DATABASE_URL="postgres://..." npm run db:export\n\n' +
        "  Supabase dashboard → Project Settings → Database → Connection string → URI\n" +
        "  A paused project must be restored first; the button is on the project home page.\n"
    );
    process.exit(1);
  }

  const client = new Client({ connectionString, ssl: { rejectUnauthorized: false } });
  await client.connect();

  const stamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
  const outDir = join(process.cwd(), ".backups", stamp);
  mkdirSync(outDir, { recursive: true });

  const { rows: tables } = await client.query<{ tablename: string }>(
    "SELECT tablename FROM pg_tables WHERE schemaname = 'public' ORDER BY tablename"
  );

  console.log(`\n  ${tables.length} tables found. Writing to .backups/${stamp}/\n`);

  const summary: Record<string, number> = {};
  let grandTotal = 0;

  for (const { tablename } of tables) {
    try {
      const { rows } = await client.query(`SELECT * FROM public."${tablename}"`);
      writeFileSync(join(outDir, `${tablename}.json`), JSON.stringify(rows, null, 2));
      summary[tablename] = rows.length;
      grandTotal += rows.length;
      console.log(`    ${tablename.padEnd(26)} ${String(rows.length).padStart(6)} rows`);
    } catch (err) {
      console.log(`    ${tablename.padEnd(26)} FAILED: ${err instanceof Error ? err.message : err}`);
    }
  }

  writeFileSync(
    join(outDir, "_manifest.json"),
    JSON.stringify(
      { exported_at: new Date().toISOString(), tables: summary, total_rows: grandTotal },
      null,
      2
    )
  );

  console.log(`\n  ${grandTotal} rows across ${tables.length} tables.`);
  console.log(`  Saved to .backups/${stamp}/\n`);

  if (grandTotal === 0) {
    console.log("  Nothing in the old database — safe to start the new project clean.\n");
  }

  await client.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
