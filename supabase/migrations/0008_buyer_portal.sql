-- =============================================================================
-- 0008 — Buyer portal
--
-- Turns a one-off Google visit into a returning user. Saved searches with
-- alerts is the highest-retention feature on any property portal, and the
-- table has existed since 0001 with nothing reading or writing it.
--
-- Also adds the buyer readiness profile, which is what makes a NestIQ lead
-- worth more to an agent than a Rightmove lead: the enquiry arrives with
-- evidence the buyer can actually proceed.
-- =============================================================================

-- --- Collections (named shortlists) -----------------------------------------
-- Couples and families search together and every portal makes that painful.
CREATE TABLE IF NOT EXISTS public.collections (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,
  description TEXT,
  is_default  BOOLEAN NOT NULL DEFAULT FALSE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS collections_user_idx ON public.collections (user_id, created_at DESC);

-- Exactly one default collection per user.
CREATE UNIQUE INDEX IF NOT EXISTS collections_one_default_per_user
  ON public.collections (user_id) WHERE is_default;

DROP TRIGGER IF EXISTS set_updated_at_collections ON public.collections;
CREATE TRIGGER set_updated_at_collections
  BEFORE UPDATE ON public.collections
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- --- Saved properties: notes and collection membership ----------------------
ALTER TABLE public.saved_properties
  ADD COLUMN IF NOT EXISTS collection_id UUID REFERENCES public.collections(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS notes         TEXT,
  -- Snapshot at save time, so a price change can be surfaced without a
  -- separate price-history join on every card.
  ADD COLUMN IF NOT EXISTS price_at_save NUMERIC;

CREATE INDEX IF NOT EXISTS saved_properties_collection_idx
  ON public.saved_properties (collection_id);

-- --- Recently viewed --------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.property_views (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  viewed_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, property_id)
);

CREATE INDEX IF NOT EXISTS property_views_user_idx
  ON public.property_views (user_id, viewed_at DESC);

-- --- Buyer readiness --------------------------------------------------------
-- No incumbent portal exposes proceedability. Agents want it badly, because a
-- mortgage-ready chain-free buyer is worth several times a speculative enquiry.
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'buyer_position') THEN
    CREATE TYPE buyer_position AS ENUM (
      'first_time_buyer', 'chain_free', 'selling_first', 'in_chain',
      'cash_buyer', 'investor', 'renting'
    );
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'mortgage_status') THEN
    CREATE TYPE mortgage_status AS ENUM (
      'not_started', 'researching', 'agreement_in_principle', 'offer_issued', 'cash_no_mortgage'
    );
  END IF;
END$$;

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS buyer_position    buyer_position,
  ADD COLUMN IF NOT EXISTS mortgage_status   mortgage_status,
  ADD COLUMN IF NOT EXISTS budget_min        NUMERIC,
  ADD COLUMN IF NOT EXISTS budget_max        NUMERIC,
  ADD COLUMN IF NOT EXISTS deposit_available NUMERIC,
  ADD COLUMN IF NOT EXISTS preferred_areas   TEXT[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS min_bedrooms      SMALLINT,
  ADD COLUMN IF NOT EXISTS moving_timescale  TEXT,
  ADD COLUMN IF NOT EXISTS id_verified       BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS readiness_updated_at TIMESTAMPTZ;

-- 0-100. Deliberately weights evidence of ability to proceed over stated
-- intent: an agreement in principle counts for far more than a filled-in
-- budget field, because it is the thing a seller's agent can rely on.
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS readiness_score SMALLINT
    GENERATED ALWAYS AS (
      LEAST(100, (
        (CASE mortgage_status
           WHEN 'cash_no_mortgage'       THEN 40
           WHEN 'offer_issued'           THEN 35
           WHEN 'agreement_in_principle' THEN 30
           WHEN 'researching'            THEN 10
           ELSE 0 END) +
        (CASE buyer_position
           WHEN 'cash_buyer'       THEN 25
           WHEN 'chain_free'       THEN 20
           WHEN 'first_time_buyer' THEN 18
           WHEN 'renting'          THEN 15
           WHEN 'investor'         THEN 15
           WHEN 'selling_first'    THEN 5
           WHEN 'in_chain'         THEN 5
           ELSE 0 END) +
        (CASE WHEN id_verified THEN 15 ELSE 0 END) +
        (CASE WHEN deposit_available IS NOT NULL THEN 10 ELSE 0 END) +
        (CASE WHEN budget_max IS NOT NULL THEN 5 ELSE 0 END) +
        (CASE WHEN phone IS NOT NULL THEN 5 ELSE 0 END)
      ))
    ) STORED;

COMMENT ON COLUMN public.profiles.readiness_score IS
  '0-100 buyer proceedability. Weighted toward evidence (AIP, cash, verified ID) '
  'over stated intent, because that is what an agent can act on.';

-- Enquiries carry the score at the time of sending, so an agent sees what was
-- true when the lead arrived rather than whatever the buyer edited later.
ALTER TABLE public.enquiries
  ADD COLUMN IF NOT EXISTS readiness_at_enquiry SMALLINT,
  ADD COLUMN IF NOT EXISTS buyer_position_at_enquiry buyer_position;

-- --- RLS --------------------------------------------------------------------
ALTER TABLE public.collections     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_views  ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "collections: own rows" ON public.collections;
CREATE POLICY "collections: own rows" ON public.collections
  FOR ALL TO authenticated
  USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "property_views: own rows" ON public.property_views;
CREATE POLICY "property_views: own rows" ON public.property_views
  FOR ALL TO authenticated
  USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

-- --- Every user gets a default shortlist -------------------------------------
CREATE OR REPLACE FUNCTION public.create_default_collection()
RETURNS TRIGGER
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.collections (user_id, name, is_default)
  VALUES (NEW.id, 'My shortlist', TRUE)
  ON CONFLICT DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS profiles_create_default_collection ON public.profiles;
CREATE TRIGGER profiles_create_default_collection
  AFTER INSERT ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.create_default_collection();
