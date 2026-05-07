-- =============================================
-- PROFILES (extends Supabase auth.users)
-- =============================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id           UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name    TEXT,
  avatar_url   TEXT,
  phone        TEXT,
  role         TEXT NOT NULL DEFAULT 'consumer' CHECK (role IN ('consumer','agent','admin')),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================
-- AGENCIES
-- =============================================
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

-- =============================================
-- PROPERTIES
-- =============================================
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
  images              TEXT[] DEFAULT '{}', -- Legacy, using property_images table now
  epc_rating          TEXT,
  tenure              TEXT,
  council_tax_band    TEXT,
  featured            BOOLEAN DEFAULT FALSE,
  view_count          INTEGER DEFAULT 0,
  save_count          INTEGER DEFAULT 0,
  enquiry_count       INTEGER DEFAULT 0,
  days_on_market      INTEGER DEFAULT 0,
  external_id         TEXT,
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

-- =============================================
-- PROPERTY IMAGES
-- =============================================
CREATE TABLE IF NOT EXISTS public.property_images (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id  UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  url          TEXT NOT NULL,
  alt_text     TEXT,
  sort_order   INTEGER DEFAULT 0,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================
-- ENQUIRIES (Leads)
-- =============================================
CREATE TABLE IF NOT EXISTS public.enquiries (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id         UUID REFERENCES public.properties(id) ON DELETE SET NULL,
  agency_id           UUID REFERENCES public.agencies(id) ON DELETE CASCADE,
  full_name           TEXT NOT NULL,
  email               TEXT NOT NULL,
  phone               TEXT,
  message             TEXT NOT NULL,
  status              TEXT DEFAULT 'new',
  ai_score            INTEGER,
  ai_intent_summary   TEXT,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================
-- SAVED PROPERTIES
-- =============================================
CREATE TABLE IF NOT EXISTS public.saved_properties (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  property_id  UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, property_id)
);

-- =============================================
-- SAVED SEARCHES
-- =============================================
CREATE TABLE IF NOT EXISTS public.saved_searches (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  name         TEXT NOT NULL,
  filters      JSONB NOT NULL,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================
-- CONTACTS (CRM)
-- =============================================
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

-- =============================================
-- MARKET DATA
-- =============================================
CREATE TABLE IF NOT EXISTS public.market_data (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  area         TEXT NOT NULL, -- Postcode area or town
  property_type TEXT,
  avg_price    NUMERIC,
  avg_rent     NUMERIC,
  velocity     NUMERIC, -- Days on market
  period       DATE NOT NULL, -- Month/Year
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================
-- LOCATION PAGES (SEO)
-- =============================================
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

-- =============================================
-- AGENT REVIEWS
-- =============================================
CREATE TABLE IF NOT EXISTS public.agent_reviews (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agency_id    UUID NOT NULL REFERENCES public.agencies(id) ON DELETE CASCADE,
  user_id      UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  rating       INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment      TEXT,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================
-- VALUATION REQUESTS
-- =============================================
CREATE TABLE IF NOT EXISTS public.valuation_requests (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name        TEXT NOT NULL,
  email            TEXT NOT NULL,
  phone            TEXT NOT NULL,
  address          TEXT NOT NULL,
  postcode         TEXT NOT NULL,
  property_type    TEXT,
  bedrooms         INTEGER,
  reason           TEXT,
  status           TEXT DEFAULT 'pending',
  assigned_agency_id UUID REFERENCES public.agencies(id) ON DELETE SET NULL,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================
-- SYNC LOGS
-- =============================================
CREATE TABLE IF NOT EXISTS public.sync_logs (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agency_id    UUID NOT NULL REFERENCES public.agencies(id) ON DELETE CASCADE,
  source       TEXT NOT NULL, -- 'alto', 'street', 'manual'
  status       TEXT NOT NULL,
  details      TEXT,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================
-- COLUMN UPDATES (Safely add if missing)
-- =============================================

-- Agencies
ALTER TABLE public.agencies ADD COLUMN IF NOT EXISTS integration_type TEXT DEFAULT 'manual';
ALTER TABLE public.agencies ADD COLUMN IF NOT EXISTS specialisms TEXT[] DEFAULT '{}';
ALTER TABLE public.agencies ADD COLUMN IF NOT EXISTS plan_tier TEXT DEFAULT 'starter';

-- Properties
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS external_id TEXT;
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS ai_summary TEXT;
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS view_count INTEGER DEFAULT 0;
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS save_count INTEGER DEFAULT 0;
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS days_on_market INTEGER DEFAULT 0;
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS virtual_tour_url TEXT;
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS video_url TEXT;
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS exact_location BOOLEAN DEFAULT TRUE;
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS deposit INTEGER;
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS min_tenancy SMALLINT;
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS pets_allowed BOOLEAN;
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS smokers_allowed BOOLEAN;
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS dss_accepted BOOLEAN;
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS available_from DATE;
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS seo_title TEXT;
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS seo_description TEXT;

-- =============================================
-- RLS POLICIES
-- =============================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_searches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.market_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.location_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agent_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.valuation_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sync_logs ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can only read/update their own profile
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Properties: Anyone can read, only agents can manage their own
DROP POLICY IF EXISTS "Anyone can view properties" ON public.properties;
CREATE POLICY "Anyone can view properties" ON public.properties FOR SELECT USING (TRUE);
DROP POLICY IF EXISTS "Agents can manage own properties" ON public.properties;
CREATE POLICY "Agents can manage own properties" ON public.properties
  FOR ALL USING (agency_id IN (SELECT id FROM public.agencies WHERE user_id = auth.uid()));

-- Enquiries: Agents can view their agency's enquiries
DROP POLICY IF EXISTS "Agents can view agency leads" ON public.enquiries;
CREATE POLICY "Agents can view agency leads" ON public.enquiries
  FOR ALL USING (agency_id IN (SELECT id FROM public.agencies WHERE user_id = auth.uid()));

-- =============================================
-- AUTH TRIGGER
-- =============================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url, role)
  VALUES (
    new.id, 
    new.raw_user_meta_data->>'full_name', 
    new.raw_user_meta_data->>'avatar_url', 
    COALESCE(new.raw_user_meta_data->>'role', 'consumer')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- =============================================
-- RPCs
-- =============================================

CREATE OR REPLACE FUNCTION increment_view_count(property_id UUID)
RETURNS void AS $$
  UPDATE properties SET view_count = view_count + 1
  WHERE id = property_id;
$$ LANGUAGE sql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION increment_enquiry_count(property_id UUID)
RETURNS void AS $$
  UPDATE properties SET enquiry_count = enquiry_count + 1
  WHERE id = property_id;
$$ LANGUAGE sql SECURITY DEFINER;

-- =============================================
-- SEED DATA
-- =============================================

INSERT INTO public.agencies (
  name, slug, description, phone, email, website,
  address_line1, town, postcode,
  plan_tier, is_verified, integration_type, specialisms
) VALUES (
  'Dales & Peaks',
  'dales-and-peaks',
  'Award-winning family estate agent covering Derbyshire, the Peak District and surrounding areas. Established 2006. Offices in Chesterfield and Matlock.',
  '01246 567540',
  'info@dalesandpeaks.co.uk',
  'https://dalesandpeaks.co.uk',
  'Unit 2, Old Brick Works Lane',
  'Chesterfield',
  'S41 7JD',
  'pro',
  true,
  'manual',
  ARRAY['residential_sales','lettings','new_homes']
) ON CONFLICT (slug) DO UPDATE SET
  description = EXCLUDED.description,
  phone = EXCLUDED.phone,
  email = EXCLUDED.email,
  website = EXCLUDED.website,
  is_verified = EXCLUDED.is_verified,
  plan_tier = EXCLUDED.plan_tier;
