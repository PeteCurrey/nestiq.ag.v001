# Database migrations

This directory is the **only** source of truth for the NestIQ schema.

Apply in numeric order. Every file is idempotent, so re-running the chain on an
existing database is safe.

| File | Purpose |
|------|---------|
| `0001_baseline.sql` | Core tables, triggers, counter RPCs |
| `0002_indexes.sql` | Query indexes (the old schema had none) |
| `0003_rls.sql` | Row Level Security policies |
| `0004_founding_partners.sql` | Founding partner campaign tables |
| `0005_material_information.sql` | NTS Parts A/B/C, completeness score, chain + status history |

## What this replaced

Four conflicting files previously defined overlapping and contradictory
versions of the same tables:

- `supabase/final_schema.sql` (360 lines, 13 tables)
- `supabase/schema.sql` (154 lines, 6 tables, included a since-dropped `activity_logs`)
- `lib/supabase/schema.sql` (332 lines, 12 tables)
- `supabase/founding_partner_schema.sql` (51 lines, 2 tables)

They are preserved in git history at commit `a1d502a` if you need to refer back.

## Bugs fixed during consolidation

1. **RLS denied everything on 10 of 13 tables.** RLS was enabled across the
   board but policies existed only for `profiles`, `properties` and
   `enquiries`. Postgres treats "RLS on, no policy" as deny-all, so
   `agencies`, `property_images`, `saved_properties`, `saved_searches`,
   `market_data`, `location_pages`, `agent_reviews`, `contacts`,
   `valuation_requests` and `sync_logs` were unreadable by browser clients.
   This is why the homepage returned properties with no images and no agency
   name, and why saving a property did nothing.

2. **`founding_recipients.booking_id` was `TEXT` referencing `bookings.id`
   (`UUID`).** That foreign key could never be created; the original file
   failed partway through on a clean database.

3. **No indexes existed anywhere.** Every search and dashboard query was a
   sequential scan.

4. **`properties.external_id` had a plain `UNIQUE`**, which still permits
   unlimited NULLs. Now a partial unique index, so the intent is explicit.

## Applying

Against a hosted Supabase project, paste each file into the SQL editor in
order, or with the CLI:

```bash
supabase db push
```

> These migrations have not yet been executed against a live database. Run them
> against a Supabase **branch** first and confirm before touching production.
