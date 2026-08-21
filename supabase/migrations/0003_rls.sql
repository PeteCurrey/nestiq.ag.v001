-- =============================================================================
-- 0003 — Row Level Security
--
-- The previous schema enabled RLS on 13 tables but only wrote policies for
-- three (profiles, properties, enquiries). In Postgres, RLS enabled with no
-- policy denies everything, so agencies, property_images, saved_properties,
-- saved_searches, market_data, location_pages, agent_reviews, contacts,
-- valuation_requests and sync_logs were unreadable by anon and authenticated
-- clients alike.
--
-- That is why the homepage returned properties with no images and no agency
-- name, and why saving a property silently did nothing.
--
-- Note: the service-role key bypasses RLS entirely, so server-side imports,
-- cron jobs and the Algolia sync are unaffected by anything below.
-- =============================================================================

ALTER TABLE public.profiles            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agencies            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.properties          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_images     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_properties    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_searches      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.market_data         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.location_pages      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agent_reviews       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.valuation_requests  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sync_logs           ENABLE ROW LEVEL SECURITY;

-- Helper: the agency ids the current user administers. STABLE so the planner
-- can cache it per statement rather than re-running it per row.
CREATE OR REPLACE FUNCTION public.current_user_agency_ids()
RETURNS SETOF UUID
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT id FROM public.agencies WHERE user_id = auth.uid();
$$;

-- PROFILES -------------------------------------------------------------------
DROP POLICY IF EXISTS "profiles: read own"   ON public.profiles;
CREATE POLICY "profiles: read own"   ON public.profiles
  FOR SELECT TO authenticated USING (auth.uid() = id);

DROP POLICY IF EXISTS "profiles: update own" ON public.profiles;
CREATE POLICY "profiles: update own" ON public.profiles
  FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- AGENCIES -------------------------------------------------------------------
-- Public directory: anyone may read. Only the owner may modify.
DROP POLICY IF EXISTS "agencies: public read" ON public.agencies;
CREATE POLICY "agencies: public read" ON public.agencies
  FOR SELECT USING (TRUE);

DROP POLICY IF EXISTS "agencies: owner writes" ON public.agencies;
CREATE POLICY "agencies: owner writes" ON public.agencies
  FOR ALL TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- PROPERTIES -----------------------------------------------------------------
-- Only active listings are public. Drafts and withdrawn stock stay with the
-- owning agency.
DROP POLICY IF EXISTS "Anyone can view properties"     ON public.properties;
DROP POLICY IF EXISTS "Agents can manage own properties" ON public.properties;

DROP POLICY IF EXISTS "properties: public read active" ON public.properties;
CREATE POLICY "properties: public read active" ON public.properties
  FOR SELECT USING (status = 'active');

DROP POLICY IF EXISTS "properties: agency full access" ON public.properties;
CREATE POLICY "properties: agency full access" ON public.properties
  FOR ALL TO authenticated
  USING (agency_id IN (SELECT public.current_user_agency_ids()))
  WITH CHECK (agency_id IN (SELECT public.current_user_agency_ids()));

-- PROPERTY IMAGES ------------------------------------------------------------
DROP POLICY IF EXISTS "property_images: public read" ON public.property_images;
CREATE POLICY "property_images: public read" ON public.property_images
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.properties p
      WHERE p.id = property_images.property_id AND p.status = 'active'
    )
  );

DROP POLICY IF EXISTS "property_images: agency writes" ON public.property_images;
CREATE POLICY "property_images: agency writes" ON public.property_images
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.properties p
      WHERE p.id = property_images.property_id
        AND p.agency_id IN (SELECT public.current_user_agency_ids())
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.properties p
      WHERE p.id = property_images.property_id
        AND p.agency_id IN (SELECT public.current_user_agency_ids())
    )
  );

-- ENQUIRIES ------------------------------------------------------------------
-- Anyone (including logged-out visitors) may submit. Reads are restricted to
-- the receiving agency and, where linked, the buyer who sent it.
DROP POLICY IF EXISTS "Agents can view agency leads" ON public.enquiries;

DROP POLICY IF EXISTS "enquiries: anyone may submit" ON public.enquiries;
CREATE POLICY "enquiries: anyone may submit" ON public.enquiries
  FOR INSERT WITH CHECK (TRUE);

DROP POLICY IF EXISTS "enquiries: agency reads" ON public.enquiries;
CREATE POLICY "enquiries: agency reads" ON public.enquiries
  FOR SELECT TO authenticated
  USING (agency_id IN (SELECT public.current_user_agency_ids()));

DROP POLICY IF EXISTS "enquiries: agency updates" ON public.enquiries;
CREATE POLICY "enquiries: agency updates" ON public.enquiries
  FOR UPDATE TO authenticated
  USING (agency_id IN (SELECT public.current_user_agency_ids()))
  WITH CHECK (agency_id IN (SELECT public.current_user_agency_ids()));

DROP POLICY IF EXISTS "enquiries: sender reads own" ON public.enquiries;
CREATE POLICY "enquiries: sender reads own" ON public.enquiries
  FOR SELECT TO authenticated USING (user_id = auth.uid());

-- SAVED PROPERTIES / SEARCHES ------------------------------------------------
DROP POLICY IF EXISTS "saved_properties: own rows" ON public.saved_properties;
CREATE POLICY "saved_properties: own rows" ON public.saved_properties
  FOR ALL TO authenticated
  USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "saved_searches: own rows" ON public.saved_searches;
CREATE POLICY "saved_searches: own rows" ON public.saved_searches
  FOR ALL TO authenticated
  USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

-- CONTACTS (agent CRM — never public) ----------------------------------------
DROP POLICY IF EXISTS "contacts: agency only" ON public.contacts;
CREATE POLICY "contacts: agency only" ON public.contacts
  FOR ALL TO authenticated
  USING (agency_id IN (SELECT public.current_user_agency_ids()))
  WITH CHECK (agency_id IN (SELECT public.current_user_agency_ids()));

-- MARKET DATA / LOCATION PAGES (public reference data) ------------------------
DROP POLICY IF EXISTS "market_data: public read" ON public.market_data;
CREATE POLICY "market_data: public read" ON public.market_data
  FOR SELECT USING (TRUE);

DROP POLICY IF EXISTS "location_pages: public read" ON public.location_pages;
CREATE POLICY "location_pages: public read" ON public.location_pages
  FOR SELECT USING (TRUE);

-- AGENT REVIEWS --------------------------------------------------------------
DROP POLICY IF EXISTS "agent_reviews: public read published" ON public.agent_reviews;
CREATE POLICY "agent_reviews: public read published" ON public.agent_reviews
  FOR SELECT USING (is_published = TRUE);

DROP POLICY IF EXISTS "agent_reviews: author writes" ON public.agent_reviews;
CREATE POLICY "agent_reviews: author writes" ON public.agent_reviews
  FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "agent_reviews: author reads own" ON public.agent_reviews;
CREATE POLICY "agent_reviews: author reads own" ON public.agent_reviews
  FOR SELECT TO authenticated USING (user_id = auth.uid());

-- VALUATION REQUESTS ---------------------------------------------------------
-- Submitted by the public (often logged out); read only by the assigned agency.
DROP POLICY IF EXISTS "valuation_requests: anyone may submit" ON public.valuation_requests;
CREATE POLICY "valuation_requests: anyone may submit" ON public.valuation_requests
  FOR INSERT WITH CHECK (TRUE);

DROP POLICY IF EXISTS "valuation_requests: assigned agency reads" ON public.valuation_requests;
CREATE POLICY "valuation_requests: assigned agency reads" ON public.valuation_requests
  FOR ALL TO authenticated
  USING (assigned_agency_id IN (SELECT public.current_user_agency_ids()))
  WITH CHECK (assigned_agency_id IN (SELECT public.current_user_agency_ids()));

-- SYNC LOGS ------------------------------------------------------------------
DROP POLICY IF EXISTS "sync_logs: agency reads own" ON public.sync_logs;
CREATE POLICY "sync_logs: agency reads own" ON public.sync_logs
  FOR SELECT TO authenticated
  USING (agency_id IN (SELECT public.current_user_agency_ids()));
