-- =============================================================================
-- 0006 — Columns the application already relies on
--
-- Once types/database.ts was regenerated to match the real schema, typechecking
-- surfaced a set of columns that page and route code reads but that no schema
-- file ever defined. These would have been runtime failures, not type noise.
--
-- Naming is normalised to the existing convention (is_verified, website, town);
-- the code that used verified / website_url / city has been updated to match
-- rather than adding duplicate columns under a second name.
-- =============================================================================

-- AGENCIES — agent directory and profile pages ------------------------------
ALTER TABLE public.agencies
  ADD COLUMN IF NOT EXISTS county            TEXT,
  ADD COLUMN IF NOT EXISTS lat               DOUBLE PRECISION,
  ADD COLUMN IF NOT EXISTS lng               DOUBLE PRECISION,
  -- Denormalised review aggregates. Maintained by trigger below so the
  -- directory does not need an aggregate subquery per agency.
  ADD COLUMN IF NOT EXISTS avg_rating        NUMERIC(3,2),
  ADD COLUMN IF NOT EXISTS review_count      INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS listing_count     INTEGER NOT NULL DEFAULT 0;

-- PROFILES — onboarding gate in the auth callback ---------------------------
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN NOT NULL DEFAULT FALSE;

-- CONTACTS — lead scoring cron ----------------------------------------------
ALTER TABLE public.contacts
  ADD COLUMN IF NOT EXISTS last_activity_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS budget_min       NUMERIC,
  ADD COLUMN IF NOT EXISTS budget_max       NUMERIC,
  ADD COLUMN IF NOT EXISTS preferred_areas  TEXT[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS lead_score       INTEGER;

-- LOCATION PAGES — programmatic SEO templates -------------------------------
ALTER TABLE public.location_pages
  ADD COLUMN IF NOT EXISTS location_name TEXT,
  ADD COLUMN IF NOT EXISTS county        TEXT,
  ADD COLUMN IF NOT EXISTS region        TEXT,
  ADD COLUMN IF NOT EXISTS lat           DOUBLE PRECISION,
  ADD COLUMN IF NOT EXISTS lng           DOUBLE PRECISION,
  ADD COLUMN IF NOT EXISTS content       TEXT;

-- Backfill location_name from the existing h1 so no row is left blank.
UPDATE public.location_pages
   SET location_name = h1
 WHERE location_name IS NULL;

-- =============================================================================
-- Keep agency review aggregates in step
-- =============================================================================

CREATE OR REPLACE FUNCTION public.refresh_agency_review_stats()
RETURNS TRIGGER
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  target UUID := COALESCE(NEW.agency_id, OLD.agency_id);
BEGIN
  UPDATE public.agencies a
     SET avg_rating = sub.avg_rating,
         review_count = sub.review_count
    FROM (
      SELECT ROUND(AVG(rating)::numeric, 2) AS avg_rating,
             COUNT(*)::int                  AS review_count
        FROM public.agent_reviews
       WHERE agency_id = target AND is_published = TRUE
    ) sub
   WHERE a.id = target;
  RETURN NULL;
END;
$$;

DROP TRIGGER IF EXISTS agent_reviews_refresh_stats ON public.agent_reviews;
CREATE TRIGGER agent_reviews_refresh_stats
  AFTER INSERT OR UPDATE OR DELETE ON public.agent_reviews
  FOR EACH ROW EXECUTE FUNCTION public.refresh_agency_review_stats();

-- =============================================================================
-- Keep agency listing_count in step
-- =============================================================================

CREATE OR REPLACE FUNCTION public.refresh_agency_listing_count()
RETURNS TRIGGER
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  target UUID := COALESCE(NEW.agency_id, OLD.agency_id);
BEGIN
  IF target IS NULL THEN
    RETURN NULL;
  END IF;

  UPDATE public.agencies a
     SET listing_count = (
           SELECT COUNT(*)::int FROM public.properties
            WHERE agency_id = target AND status = 'active'
         )
   WHERE a.id = target;
  RETURN NULL;
END;
$$;

DROP TRIGGER IF EXISTS properties_refresh_agency_count ON public.properties;
CREATE TRIGGER properties_refresh_agency_count
  AFTER INSERT OR UPDATE OF status, agency_id OR DELETE ON public.properties
  FOR EACH ROW EXECUTE FUNCTION public.refresh_agency_listing_count();

CREATE INDEX IF NOT EXISTS agencies_directory_idx
  ON public.agencies (town, avg_rating DESC NULLS LAST);
