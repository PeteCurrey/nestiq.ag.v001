/**
 * Applies supabase/migrations/*.sql in order, once each.
 *
 *   npm run db:migrate          apply anything outstanding
 *   npm run db:migrate -- --dry show what would run, touch nothing
 *
 * Needs DATABASE_URL in .env.local — Supabase dashboard → Project Settings →
 * Database → Connection string → URI. That is the database password, not the
 * service role key; the REST API cannot execute DDL.
 *
 * Each file runs inside a transaction, so a failure leaves no half-applied
 * migration. Applied filenames are recorded in schema_migrations with a
 * checksum, and a file that changes after being applied is reported rather
 * than silently re-run.
 */
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { createHash } from "node:crypto";
import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const MIGRATIONS_DIR = join(process.cwd(), "supabase/migrations");
const dryRun = process.argv.includes("--dry");

function checksum(text: string): string {
  return createHash("sha256").update(text).digest("hex").slice(0, 16);
}

function migrationFiles(): Array<{ name: string; sql: string; sum: string }> {
  return readdirSync(MIGRATIONS_DIR)
    .filter((f) => f.endsWith(".sql"))
    .sort()
    .map((name) => {
      const sql = readFileSync(join(MIGRATIONS_DIR, name), "utf8");
      return { name, sql, sum: checksum(sql) };
    });
}

async function main() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    console.error(
      "\nDATABASE_URL is not set.\n\n" +
        "  Supabase dashboard → Project Settings → Database → Connection string → URI\n" +
        "  Add it to .env.local, then run this again.\n"
    );
    process.exit(1);
  }

  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false },
  });

  await client.connect();

  await client.query(`
    CREATE TABLE IF NOT EXISTS public.schema_migrations (
      name        TEXT PRIMARY KEY,
      checksum    TEXT NOT NULL,
      applied_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  const { rows } = await client.query<{ name: string; checksum: string }>(
    "SELECT name, checksum FROM public.schema_migrations"
  );
  const applied = new Map(rows.map((r) => [r.name, r.checksum]));

  const files = migrationFiles();
  const pending = files.filter((f) => !applied.has(f.name));

  // Surface edits to already-applied files rather than quietly ignoring them.
  const drifted = files.filter(
    (f) => applied.has(f.name) && applied.get(f.name) !== f.sum
  );

  if (drifted.length > 0) {
    console.warn("\n  Already applied, but the file has changed since:");
    for (const d of drifted) console.warn(`    ${d.name}`);
    console.warn("  Write a new migration instead of editing an applied one.\n");
  }

  console.log(`\n  ${files.length} migrations, ${applied.size} applied, ${pending.length} pending`);

  if (pending.length === 0) {
    console.log("  Nothing to do.\n");
    await client.end();
    return;
  }

  for (const f of pending) console.log(`    pending: ${f.name}`);

  if (dryRun) {
    console.log("\n  --dry: nothing was applied.\n");
    await client.end();
    return;
  }

  console.log("");

  for (const f of pending) {
    process.stdout.write(`  applying ${f.name} ... `);
    try {
      await client.query("BEGIN");
      await client.query(f.sql);
      await client.query(
        "INSERT INTO public.schema_migrations (name, checksum) VALUES ($1, $2)",
        [f.name, f.sum]
      );
      await client.query("COMMIT");
      console.log("ok");
    } catch (err) {
      await client.query("ROLLBACK");
      console.log("FAILED");
      console.error(`\n  ${f.name} was rolled back. Nothing from it was applied.\n`);
      console.error(err instanceof Error ? err.message : err);
      await client.end();
      process.exit(1);
    }
  }

  console.log("\n  All migrations applied.\n");
  await client.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
