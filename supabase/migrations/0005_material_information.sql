-- =============================================================================
-- 0005 — Material information (NTS Parts A, B and C) + completeness scoring
--
-- National Trading Standards requires Part A on the first page of a listing,
-- and Parts B and C no more than one click away. The government's June 2026
-- home buying and selling roadmap goes further, committing to require a sales
-- pack before a property may be listed at all.
--
-- Modelling this now is what lets NestIQ ship the Completeness Score: a visible
-- per-listing measure of how much has actually been disclosed, which buyers can
-- filter on and agents can compete on.
--
-- Convention throughout: NULL means "not disclosed". An explicit value —
-- including 'none' or FALSE — means the agent has answered. The two are very
-- different and the score depends on telling them apart.
-- =============================================================================

-- --- PART A -----------------------------------------------------------------
-- price, tenure, council_tax_band and epc_rating already exist on properties.
ALTER TABLE public.properties
  ADD COLUMN IF NOT EXISTS lease_years_remaining  INTEGER,
  ADD COLUMN IF NOT EXISTS ground_rent_annual     NUMERIC,
  ADD COLUMN IF NOT EXISTS service_charge_annual  NUMERIC,
  ADD COLUMN IF NOT EXISTS shared_ownership_share SMALLINT
    CHECK (shared_ownership_share IS NULL
           OR (shared_ownership_share > 0 AND shared_ownership_share <= 100));

-- --- PART B — required for every property ------------------------------------
ALTER TABLE public.properties
  ADD COLUMN IF NOT EXISTS construction_type   TEXT,
  ADD COLUMN IF NOT EXISTS build_year          INTEGER,
  ADD COLUMN IF NOT EXISTS heating_type        TEXT,
  ADD COLUMN IF NOT EXISTS water_supply        TEXT,
  ADD COLUMN IF NOT EXISTS electricity_supply  TEXT,
  ADD COLUMN IF NOT EXISTS sewerage_type       TEXT,
  ADD COLUMN IF NOT EXISTS broadband_type      TEXT,
  ADD COLUMN IF NOT EXISTS broadband_max_mbps  INTEGER,
  ADD COLUMN IF NOT EXISTS mobile_coverage     JSONB,   -- {"ee":"good","o2":"limited",...}
  ADD COLUMN IF NOT EXISTS parking_type        TEXT[],
  ADD COLUMN IF NOT EXISTS accessibility       TEXT[];

-- --- PART C — conditional; disclose when the property is affected ------------
ALTER TABLE public.properties
  ADD COLUMN IF NOT EXISTS flood_risk             TEXT
    CHECK (flood_risk IS NULL OR flood_risk IN ('none','very_low','low','medium','high')),
  ADD COLUMN IF NOT EXISTS flood_history          BOOLEAN,
  ADD COLUMN IF NOT EXISTS building_safety_issues TEXT,
  ADD COLUMN IF NOT EXISTS restrictive_covenants  TEXT,
  ADD COLUMN IF NOT EXISTS rights_of_way          TEXT,
  ADD COLUMN IF NOT EXISTS listed_grade           TEXT
    CHECK (listed_grade IS NULL OR listed_grade IN ('none','I','II','II*')),
  ADD COLUMN IF NOT EXISTS conservation_area      BOOLEAN,
  ADD COLUMN IF NOT EXISTS mining_area            BOOLEAN,
  ADD COLUMN IF NOT EXISTS japanese_knotweed      BOOLEAN,
  ADD COLUMN IF NOT EXISTS planning_applications  TEXT,
  ADD COLUMN IF NOT EXISTS coastal_erosion_risk   BOOLEAN;

-- --- Sales pack readiness (BASPI / upcoming legislation) ---------------------
ALTER TABLE public.properties
  ADD COLUMN IF NOT EXISTS sales_pack_status TEXT NOT NULL DEFAULT 'none'
    CHECK (sales_pack_status IN ('none','in_progress','ready')),
  ADD COLUMN IF NOT EXISTS sales_pack_url        TEXT,
  ADD COLUMN IF NOT EXISTS sales_pack_updated_at TIMESTAMPTZ;

-- --- Chain and honest status -------------------------------------------------
-- The single loudest buyer and seller complaint is that nobody will tell them
-- where a transaction actually stands. No incumbent portal exposes this.
ALTER TABLE public.properties
  ADD COLUMN IF NOT EXISTS chain_status TEXT
    CHECK (chain_status IS NULL OR chain_status IN
      ('no_chain','chain_below','chain_above','chain_both','chain_complete')),
  ADD COLUMN IF NOT EXISTS chain_notes TEXT;

CREATE TABLE IF NOT EXISTS public.property_status_events (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id  UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  event        TEXT NOT NULL CHECK (event IN
                 ('listed','price_reduced','price_increased','under_offer',
                  'sold_stc','fell_through','withdrawn','relisted','completed')),
  price_at_event NUMERIC,
  note         TEXT,
  occurred_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS property_status_events_property_idx
  ON public.property_status_events (property_id, occurred_at DESC);

ALTER TABLE public.property_status_events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "status_events: public read" ON public.property_status_events;
CREATE POLICY "status_events: public read" ON public.property_status_events
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.properties p
            WHERE p.id = property_status_events.property_id AND p.status = 'active')
  );

DROP POLICY IF EXISTS "status_events: agency writes" ON public.property_status_events;
CREATE POLICY "status_events: agency writes" ON public.property_status_events
  FOR ALL TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.properties p
            WHERE p.id = property_status_events.property_id
              AND p.agency_id IN (SELECT public.current_user_agency_ids()))
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM public.properties p
            WHERE p.id = property_status_events.property_id
              AND p.agency_id IN (SELECT public.current_user_agency_ids()))
  );

-- =============================================================================
-- Completeness scoring
--
-- Stored generated columns, so the score is always consistent with the row and
-- can be indexed and filtered without a trigger to keep in sync.
--
-- Part A is weighted double: it is legally required on the first page of the
-- listing, and an agent who has not supplied it is not merely incomplete.
-- =============================================================================

ALTER TABLE public.properties
  ADD COLUMN IF NOT EXISTS part_a_score SMALLINT
    GENERATED ALWAYS AS (
      (CASE WHEN tenure           IS NOT NULL THEN 1 ELSE 0 END) +
      (CASE WHEN council_tax_band IS NOT NULL THEN 1 ELSE 0 END) +
      (CASE WHEN epc_rating       IS NOT NULL THEN 1 ELSE 0 END)
    ) STORED;

ALTER TABLE public.properties
  ADD COLUMN IF NOT EXISTS part_b_score SMALLINT
    GENERATED ALWAYS AS (
      (CASE WHEN construction_type  IS NOT NULL THEN 1 ELSE 0 END) +
      (CASE WHEN heating_type       IS NOT NULL THEN 1 ELSE 0 END) +
      (CASE WHEN water_supply       IS NOT NULL THEN 1 ELSE 0 END) +
      (CASE WHEN electricity_supply IS NOT NULL THEN 1 ELSE 0 END) +
      (CASE WHEN sewerage_type      IS NOT NULL THEN 1 ELSE 0 END) +
      (CASE WHEN broadband_type     IS NOT NULL THEN 1 ELSE 0 END) +
      (CASE WHEN mobile_coverage    IS NOT NULL THEN 1 ELSE 0 END) +
      (CASE WHEN parking_type       IS NOT NULL THEN 1 ELSE 0 END) +
      (CASE WHEN sqft               IS NOT NULL THEN 1 ELSE 0 END)
    ) STORED;

ALTER TABLE public.properties
  ADD COLUMN IF NOT EXISTS part_c_score SMALLINT
    GENERATED ALWAYS AS (
      (CASE WHEN flood_risk            IS NOT NULL THEN 1 ELSE 0 END) +
      (CASE WHEN building_safety_issues IS NOT NULL THEN 1 ELSE 0 END) +
      (CASE WHEN restrictive_covenants IS NOT NULL THEN 1 ELSE 0 END) +
      (CASE WHEN rights_of_way         IS NOT NULL THEN 1 ELSE 0 END) +
      (CASE WHEN listed_grade          IS NOT NULL THEN 1 ELSE 0 END) +
      (CASE WHEN conservation_area     IS NOT NULL THEN 1 ELSE 0 END) +
      (CASE WHEN mining_area           IS NOT NULL THEN 1 ELSE 0 END) +
      (CASE WHEN japanese_knotweed     IS NOT NULL THEN 1 ELSE 0 END)
    ) STORED;

-- 0–100. Part A ×2 (max 6), Part B ×1 (max 9), Part C ×1 (max 8) => 23 points.
ALTER TABLE public.properties
  ADD COLUMN IF NOT EXISTS completeness_score SMALLINT
    GENERATED ALWAYS AS (
      ROUND(
        (
          (CASE WHEN tenure           IS NOT NULL THEN 2 ELSE 0 END) +
          (CASE WHEN council_tax_band IS NOT NULL THEN 2 ELSE 0 END) +
          (CASE WHEN epc_rating       IS NOT NULL THEN 2 ELSE 0 END) +
          (CASE WHEN construction_type  IS NOT NULL THEN 1 ELSE 0 END) +
          (CASE WHEN heating_type       IS NOT NULL THEN 1 ELSE 0 END) +
          (CASE WHEN water_supply       IS NOT NULL THEN 1 ELSE 0 END) +
          (CASE WHEN electricity_supply IS NOT NULL THEN 1 ELSE 0 END) +
          (CASE WHEN sewerage_type      IS NOT NULL THEN 1 ELSE 0 END) +
          (CASE WHEN broadband_type     IS NOT NULL THEN 1 ELSE 0 END) +
          (CASE WHEN mobile_coverage    IS NOT NULL THEN 1 ELSE 0 END) +
          (CASE WHEN parking_type       IS NOT NULL THEN 1 ELSE 0 END) +
          (CASE WHEN sqft               IS NOT NULL THEN 1 ELSE 0 END) +
          (CASE WHEN flood_risk            IS NOT NULL THEN 1 ELSE 0 END) +
          (CASE WHEN building_safety_issues IS NOT NULL THEN 1 ELSE 0 END) +
          (CASE WHEN restrictive_covenants IS NOT NULL THEN 1 ELSE 0 END) +
          (CASE WHEN rights_of_way         IS NOT NULL THEN 1 ELSE 0 END) +
          (CASE WHEN listed_grade          IS NOT NULL THEN 1 ELSE 0 END) +
          (CASE WHEN conservation_area     IS NOT NULL THEN 1 ELSE 0 END) +
          (CASE WHEN mining_area           IS NOT NULL THEN 1 ELSE 0 END) +
          (CASE WHEN japanese_knotweed     IS NOT NULL THEN 1 ELSE 0 END)
        )::numeric * 100 / 23
      )
    ) STORED;

-- Buyers filtering to "fully disclosed only" is the headline consumer feature;
-- agents sort their own stock by worst-first to fix it.
CREATE INDEX IF NOT EXISTS properties_completeness_idx
  ON public.properties (completeness_score DESC)
  WHERE status = 'active';

COMMENT ON COLUMN public.properties.completeness_score IS
  '0-100 material information completeness. Part A weighted x2. NULL on any '
  'source column means not disclosed; an explicit value (including none/false) counts.';
