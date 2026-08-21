-- =============================================================================
-- 0004 — Founding partner campaign
--
-- Ported from supabase/founding_partner_schema.sql, with two fixes:
--   1. founding_recipients.booking_id was TEXT but referenced bookings.id
--      (UUID). That foreign key could never be created — the original file
--      would fail partway through on a clean database.
--   2. Tables are RLS-protected. They hold named contacts and estimated spend
--      for real agencies; the campaign routes use the service-role key, so
--      no public policy is needed.
-- =============================================================================

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'founding_state') THEN
    CREATE TYPE founding_state AS ENUM
      ('unclaimed','viewed','booked','confirmed','declined','expired');
  END IF;
END$$;

CREATE TABLE IF NOT EXISTS public.bookings (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient_token  TEXT,
  start_time       TIMESTAMPTZ NOT NULL,
  visit_type       TEXT CHECK (visit_type IN ('zoom','in_person')),
  status           TEXT DEFAULT 'scheduled',
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.founding_recipients (
  token                            TEXT PRIMARY KEY,
  slug                             TEXT UNIQUE NOT NULL,
  agency_name                      TEXT NOT NULL,
  principal_name                   TEXT NOT NULL,
  principal_email                  TEXT NOT NULL,
  principal_phone                  TEXT,
  postcode_district                TEXT NOT NULL,
  region_label                     TEXT NOT NULL,
  estimated_current_spend_monthly  INTEGER,
  brochure_sent_at                 TIMESTAMPTZ,
  held_until                       TIMESTAMPTZ,
  state                            founding_state DEFAULT 'unclaimed',
  view_log                         JSONB DEFAULT '[]'::jsonb,
  booking_id                       UUID REFERENCES public.bookings(id) ON DELETE SET NULL,
  created_at                       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at                       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Deferred so the two tables can be created in either order.
ALTER TABLE public.bookings
  DROP CONSTRAINT IF EXISTS bookings_recipient_token_fkey;
ALTER TABLE public.bookings
  ADD CONSTRAINT bookings_recipient_token_fkey
  FOREIGN KEY (recipient_token)
  REFERENCES public.founding_recipients(token) ON DELETE CASCADE;

CREATE INDEX IF NOT EXISTS founding_recipients_state_idx
  ON public.founding_recipients (state);
CREATE INDEX IF NOT EXISTS bookings_recipient_idx
  ON public.bookings (recipient_token);

DROP TRIGGER IF EXISTS set_updated_at_founding_recipients ON public.founding_recipients;
CREATE TRIGGER set_updated_at_founding_recipients
  BEFORE UPDATE ON public.founding_recipients
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Locked down: reached only through service-role campaign routes.
ALTER TABLE public.founding_recipients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings            ENABLE ROW LEVEL SECURITY;
