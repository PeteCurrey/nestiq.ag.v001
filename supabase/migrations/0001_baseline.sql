-- =============================================================================
-- 0001 — Baseline schema
--
-- Consolidated from the four conflicting schema files that previously existed
-- (supabase/final_schema.sql, supabase/schema.sql, lib/supabase/schema.sql,
-- supabase/founding_partner_schema.sql). This chain is now the only source of
-- truth. Idempotent — safe to re-run.
--
-- RLS lives in 0003. Do not add policies here.
-- =============================================================================

-- PROFILES (extends auth.users) ----------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
  id           UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name    TEXT,
  avatar_url   TEXT,
  phone        TEXT,
  role         TEXT NOT NULL DEFAULT 'consumer' CHECK (role IN ('consumer','agent','admin')),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- AGENCIES -------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.agencies (
  id                       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id                  UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  name                     TEXT NOT NULL,
  slug                     TEXT NOT NULL UNIQUE,
  logo_url                 TEXT,
  cover_url                TEXT,
  description              TEXT,
  phone                    TEXT,
  email                    TEXT,
  website                  TEXT,
  address_line1            TEXT,
  town                     TEXT,
  postcode                 TEXT,
  is_verified              BOOLEAN DEFAULT FALSE,
  stripe_customer_id       TEXT,
  subscription_status      TEXT DEFAULT 'trialing',
  plan_tier                TEXT DEFAULT 'starter',
  integration_type         TEXT DEFAULT 'manual',
  specialisms              TEXT[] DEFAULT '{}',
  created_at               TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- PROPERTIES -----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.properties (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agency_id           UUID REFERENCES public.agencies(id) ON DELETE CASCADE,
  title               TEXT NOT NULL,
  slug                TEXT NOT NULL UNIQUE,
  description         TEXT,
  price               NUMERIC NOT NULL,
  price_qualifier     TEXT,
  listing_type        TEXT NOT NULL CHECK (listing_type IN ('sale','rent')),
  property_type       TEXT NOT NULL,
  status              TEXT NOT NULL DEFAULT 'active',
  bedrooms            INTEGER DEFAULT 0,
  bathrooms           INTEGER DEFAULT 0,
  reception_rooms     INTEGER DEFAULT 0,
  sqft                INTEGER,
  lat                 DOUBLE PRECISION,
  lng                 DOUBLE PRECISION,
  address_line1       TEXT NOT NULL,
  town                TEXT NOT NULL,
  county              TEXT,
  postcode            TEXT NOT NULL,
  features            TEXT[] DEFAULT '{}',
  images              TEXT[] DEFAULT '{}',  -- legacy; property_images is authoritative
  epc_rating          TEXT,
  tenure              TEXT,
  council_tax_band    TEXT,
  featured            BOOLEAN DEFAULT FALSE,
  view_count          INTEGER DEFAULT 0,
  save_count          INTEGER DEFAULT 0,
  enquiry_count       INTEGER DEFAULT 0,
  days_on_market      INTEGER DEFAULT 0,
  external_id         TEXT,
  data_source         TEXT NOT NULL DEFAULT 'manual',
  ai_summary          TEXT,
  virtual_tour_url    TEXT,
  video_url           TEXT,
  exact_location      BOOLEAN DEFAULT TRUE,
  deposit             INTEGER,
  min_tenancy         SMALLINT,
  pets_allowed        BOOLEAN,
  smokers_allowed     BOOLEAN,
  dss_accepted        BOOLEAN,
  available_from      DATE,
  seo_title           TEXT,
  seo_description     TEXT,
  published_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- PROPERTY IMAGES ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.property_images (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id  UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  url          TEXT NOT NULL,
  alt_text     TEXT,
  sort_order   INTEGER DEFAULT 0,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ENQUIRIES (leads) ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.enquiries (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id         UUID REFERENCES public.properties(id) ON DELETE SET NULL,
  agency_id           UUID REFERENCES public.agencies(id) ON DELETE CASCADE,
  user_id             UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  full_name           TEXT NOT NULL,
  email               TEXT NOT NULL,
  phone               TEXT,
  message             TEXT NOT NULL,
  status              TEXT DEFAULT 'new',
  ai_score            INTEGER,
  ai_intent_summary   TEXT,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- SAVED PROPERTIES -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.saved_properties (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  property_id  UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, property_id)
);

-- SAVED SEARCHES -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.saved_searches (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  name           TEXT NOT NULL,
  filters        JSONB NOT NULL,
  alert_enabled  BOOLEAN NOT NULL DEFAULT TRUE,
  alert_frequency TEXT NOT NULL DEFAULT 'instant'
                  CHECK (alert_frequency IN ('instant','daily','weekly')),
  last_alerted_at TIMESTAMPTZ,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- CONTACTS (agent CRM) -------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.contacts (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agency_id    UUID NOT NULL REFERENCES public.agencies(id) ON DELETE CASCADE,
  full_name    TEXT NOT NULL,
  email        TEXT,
  phone        TEXT,
  status       TEXT DEFAULT 'lead',
  source       TEXT,
  notes        TEXT,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- MARKET DATA ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.market_data (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  area          TEXT NOT NULL,   -- postcode area or town
  property_type TEXT,
  avg_price     NUMERIC,
  avg_rent      NUMERIC,
  velocity      NUMERIC,         -- avg days on market
  period        DATE NOT NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- LOCATION PAGES (programmatic SEO) ------------------------------------------
CREATE TABLE IF NOT EXISTS public.location_pages (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug             TEXT NOT NULL UNIQUE,
  h1               TEXT NOT NULL,
  intro_paragraph  TEXT,
  meta_title       TEXT,
  meta_description TEXT,
  structured_data  JSONB,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- AGENT REVIEWS --------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.agent_reviews (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agency_id    UUID NOT NULL REFERENCES public.agencies(id) ON DELETE CASCADE,
  user_id      UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  rating       INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment      TEXT,
  is_published BOOLEAN NOT NULL DEFAULT FALSE,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- VALUATION REQUESTS ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.valuation_requests (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name          TEXT NOT NULL,
  email              TEXT NOT NULL,
  phone              TEXT NOT NULL,
  address            TEXT NOT NULL,
  postcode           TEXT NOT NULL,
  property_type      TEXT,
  bedrooms           INTEGER,
  reason             TEXT,
  status             TEXT DEFAULT 'pending',
  assigned_agency_id UUID REFERENCES public.agencies(id) ON DELETE SET NULL,
  created_at         TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- SYNC LOGS ------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.sync_logs (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agency_id    UUID NOT NULL REFERENCES public.agencies(id) ON DELETE CASCADE,
  source       TEXT NOT NULL,   -- 'alto' | 'street' | 'blm' | 'manual'
  status       TEXT NOT NULL,
  details      TEXT,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Unique external id, but only where one is set. A plain UNIQUE column would
-- still allow unlimited NULLs; this keeps intent explicit.
CREATE UNIQUE INDEX IF NOT EXISTS properties_external_id_key
  ON public.properties (external_id) WHERE external_id IS NOT NULL;

-- =============================================================================
-- Triggers and functions
-- =============================================================================

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_updated_at_properties ON public.properties;
CREATE TRIGGER set_updated_at_properties
  BEFORE UPDATE ON public.properties
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS set_updated_at_profiles ON public.profiles;
CREATE TRIGGER set_updated_at_profiles
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS set_updated_at_contacts ON public.contacts;
CREATE TRIGGER set_updated_at_contacts
  BEFORE UPDATE ON public.contacts
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Create a profile row whenever a user signs up.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url, role)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url',
    COALESCE(NEW.raw_user_meta_data->>'role', 'consumer')
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =============================================================================
-- Counter RPCs
-- =============================================================================

CREATE OR REPLACE FUNCTION public.increment_view_count(property_id UUID)
RETURNS void AS $$
  UPDATE public.properties SET view_count = view_count + 1 WHERE id = property_id;
$$ LANGUAGE sql SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE FUNCTION public.increment_enquiry_count(property_id UUID)
RETURNS void AS $$
  UPDATE public.properties SET enquiry_count = enquiry_count + 1 WHERE id = property_id;
$$ LANGUAGE sql SECURITY DEFINER SET search_path = public;
