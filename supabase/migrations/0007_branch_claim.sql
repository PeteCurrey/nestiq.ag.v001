-- =============================================================================
-- 0007 — Unclaimed branches, provenance, and the claim funnel
--
-- The launch strategy runs two tracks at once:
--
--   Track A (the product)  agent authorises a CRM feed -> verified listings
--   Track B (the seed)     compiled from public sources -> UNCLAIMED listings
--
-- Track B exists so the site is not empty at launch, and is structured so it
-- feeds Track A rather than competing with it. A seeded listing is never
-- presented as the agency's own verified listing: it sits on an unclaimed
-- branch profile, openly labelled, and any buyer enquiry is forwarded to the
-- branch free of charge with an invitation to claim.
--
-- Constraints this schema enforces, rather than leaving to application code:
--   * provenance is recorded on every listing and cannot be null
--   * seeded listings carry an expiry; unclaimed stock does not linger
--   * an agency that opts out is permanently excluded, with no claim required
-- =============================================================================

-- --- Provenance --------------------------------------------------------------
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'listing_provenance') THEN
    CREATE TYPE listing_provenance AS ENUM (
      'agent_direct',   -- keyed in by the agent in the NestIQ portal
      'agent_feed',     -- authorised CRM feed (Reapit/Alto/Jupix/Street/Vebra/BLM)
      'compiled'        -- assembled from public sources; unverified
    );
  END IF;
END$$;

ALTER TABLE public.properties
  ADD COLUMN IF NOT EXISTS provenance listing_provenance NOT NULL DEFAULT 'agent_direct',
  ADD COLUMN IF NOT EXISTS source_url TEXT,
  ADD COLUMN IF NOT EXISTS compiled_at TIMESTAMPTZ,
  -- Seeded stock self-destructs. Stale compiled data is worse than none, and
  -- permanence is what makes a directory look like a republisher.
  ADD COLUMN IF NOT EXISTS expires_at TIMESTAMPTZ;

COMMENT ON COLUMN public.properties.provenance IS
  'How this listing reached NestIQ. ''compiled'' listings are unverified, must '
  'be labelled as such in the UI, and must never reuse the source agency''s '
  'photography or description verbatim.';

-- A compiled listing must say where it came from and when, and must expire.
ALTER TABLE public.properties
  DROP CONSTRAINT IF EXISTS properties_compiled_requires_provenance;
ALTER TABLE public.properties
  ADD CONSTRAINT properties_compiled_requires_provenance CHECK (
    provenance <> 'compiled'
    OR (source_url IS NOT NULL AND compiled_at IS NOT NULL AND expires_at IS NOT NULL)
  );

-- --- Branches ----------------------------------------------------------------
-- An agency may run several branches. Seeding is per branch, and so is claiming.
CREATE TABLE IF NOT EXISTS public.branches (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agency_id        UUID REFERENCES public.agencies(id) ON DELETE CASCADE,
  name             TEXT NOT NULL,
  slug             TEXT NOT NULL UNIQUE,
  -- Identifier on the source we compiled from. Lets a re-crawl update in place.
  source_branch_id TEXT,
  source_name      TEXT,

  phone            TEXT,
  email            TEXT,
  website          TEXT,
  address_line1    TEXT,
  town             TEXT,
  postcode         TEXT,
  lat              DOUBLE PRECISION,
  lng              DOUBLE PRECISION,

  claim_state      TEXT NOT NULL DEFAULT 'unclaimed'
                   CHECK (claim_state IN ('unclaimed','invited','claiming','claimed','opted_out')),
  claimed_at       TIMESTAMPTZ,
  claimed_by       UUID REFERENCES public.profiles(id) ON DELETE SET NULL,

  -- Honoured immediately and permanently. No claim required, no dark patterns.
  opted_out_at     TIMESTAMPTZ,
  opt_out_reason   TEXT,

  listing_count    INTEGER NOT NULL DEFAULT 0,
  leads_forwarded  INTEGER NOT NULL DEFAULT 0,

  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS branches_source_key
  ON public.branches (source_branch_id) WHERE source_branch_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS branches_claim_state_idx ON public.branches (claim_state);
CREATE INDEX IF NOT EXISTS branches_town_idx ON public.branches (lower(town));

DROP TRIGGER IF EXISTS set_updated_at_branches ON public.branches;
CREATE TRIGGER set_updated_at_branches
  BEFORE UPDATE ON public.branches
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.properties
  ADD COLUMN IF NOT EXISTS branch_id UUID REFERENCES public.branches(id) ON DELETE SET NULL;
CREATE INDEX IF NOT EXISTS properties_branch_idx ON public.properties (branch_id);

-- --- Claim invitations --------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.branch_claims (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  branch_id     UUID NOT NULL REFERENCES public.branches(id) ON DELETE CASCADE,
  token         TEXT NOT NULL UNIQUE,
  sent_to_email TEXT NOT NULL,
  sent_at       TIMESTAMPTZ,
  opened_at     TIMESTAMPTZ,
  completed_at  TIMESTAMPTZ,
  expires_at    TIMESTAMPTZ NOT NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS branch_claims_branch_idx ON public.branch_claims (branch_id);

-- --- Lead forwarding ----------------------------------------------------------
-- Enquiries on unclaimed branches are forwarded free and immediately. They are
-- never withheld to force a claim: that is both a poor look and plausibly
-- actionable interference. This table is the audit trail proving it happened.
CREATE TABLE IF NOT EXISTS public.forwarded_leads (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enquiry_id    UUID NOT NULL REFERENCES public.enquiries(id) ON DELETE CASCADE,
  branch_id     UUID NOT NULL REFERENCES public.branches(id) ON DELETE CASCADE,
  forwarded_to  TEXT NOT NULL,
  forwarded_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  delivery_status TEXT NOT NULL DEFAULT 'pending'
                  CHECK (delivery_status IN ('pending','sent','bounced','failed')),
  provider_id   TEXT
);

CREATE INDEX IF NOT EXISTS forwarded_leads_branch_idx
  ON public.forwarded_leads (branch_id, forwarded_at DESC);

-- --- Opt-out is absolute ------------------------------------------------------
-- Withdraw every compiled listing the moment a branch opts out, and prevent
-- a later crawl from reinstating it.
CREATE OR REPLACE FUNCTION public.enforce_branch_opt_out()
RETURNS TRIGGER
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NEW.claim_state = 'opted_out' AND COALESCE(OLD.claim_state, '') <> 'opted_out' THEN
    NEW.opted_out_at := COALESCE(NEW.opted_out_at, NOW());

    DELETE FROM public.properties
     WHERE branch_id = NEW.id AND provenance = 'compiled';
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS branches_enforce_opt_out ON public.branches;
CREATE TRIGGER branches_enforce_opt_out
  BEFORE UPDATE ON public.branches
  FOR EACH ROW EXECUTE FUNCTION public.enforce_branch_opt_out();

-- Refuse to attach a compiled listing to a branch that has opted out, even if
-- an importer tries.
CREATE OR REPLACE FUNCTION public.block_compiled_for_opted_out()
RETURNS TRIGGER
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NEW.provenance = 'compiled' AND NEW.branch_id IS NOT NULL THEN
    IF EXISTS (SELECT 1 FROM public.branches
                WHERE id = NEW.branch_id AND claim_state = 'opted_out') THEN
      RAISE EXCEPTION 'Branch % has opted out of compiled listings', NEW.branch_id;
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS properties_block_opted_out ON public.properties;
CREATE TRIGGER properties_block_opted_out
  BEFORE INSERT OR UPDATE ON public.properties
  FOR EACH ROW EXECUTE FUNCTION public.block_compiled_for_opted_out();

-- --- Keep branch listing_count in step ----------------------------------------
CREATE OR REPLACE FUNCTION public.refresh_branch_listing_count()
RETURNS TRIGGER
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  target UUID := COALESCE(NEW.branch_id, OLD.branch_id);
BEGIN
  IF target IS NULL THEN RETURN NULL; END IF;
  UPDATE public.branches
     SET listing_count = (SELECT COUNT(*)::int FROM public.properties
                           WHERE branch_id = target AND status = 'active')
   WHERE id = target;
  RETURN NULL;
END;
$$;

DROP TRIGGER IF EXISTS properties_refresh_branch_count ON public.properties;
CREATE TRIGGER properties_refresh_branch_count
  AFTER INSERT OR UPDATE OF status, branch_id OR DELETE ON public.properties
  FOR EACH ROW EXECUTE FUNCTION public.refresh_branch_listing_count();

-- --- RLS ----------------------------------------------------------------------
ALTER TABLE public.branches        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.branch_claims   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forwarded_leads ENABLE ROW LEVEL SECURITY;

-- Branch profiles are public — that is the point of the directory — except for
-- ones that have opted out.
DROP POLICY IF EXISTS "branches: public read" ON public.branches;
CREATE POLICY "branches: public read" ON public.branches
  FOR SELECT USING (claim_state <> 'opted_out');

DROP POLICY IF EXISTS "branches: owner writes" ON public.branches;
CREATE POLICY "branches: owner writes" ON public.branches
  FOR ALL TO authenticated
  USING (agency_id IN (SELECT public.current_user_agency_ids()))
  WITH CHECK (agency_id IN (SELECT public.current_user_agency_ids()));

-- Claim tokens and forwarding logs are service-role only.
DROP POLICY IF EXISTS "forwarded_leads: branch owner reads" ON public.forwarded_leads;
CREATE POLICY "forwarded_leads: branch owner reads" ON public.forwarded_leads
  FOR SELECT TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.branches b
             WHERE b.id = forwarded_leads.branch_id
               AND b.agency_id IN (SELECT public.current_user_agency_ids()))
  );

-- --- Expiry sweep -------------------------------------------------------------
-- Call from the cron route. Compiled listings past expiry are removed outright.
CREATE OR REPLACE FUNCTION public.expire_compiled_listings()
RETURNS integer
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  removed integer;
BEGIN
  WITH gone AS (
    DELETE FROM public.properties
     WHERE provenance = 'compiled' AND expires_at < NOW()
     RETURNING 1
  )
  SELECT COUNT(*)::int INTO removed FROM gone;
  RETURN removed;
END;
$$;
