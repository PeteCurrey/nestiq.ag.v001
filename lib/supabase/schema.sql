-- =============================================
-- NESTIQ DATABASE SCHEMA
-- =============================================

-- =============================================
-- PROFILES (extends Supabase auth.users)
-- =============================================
CREATE TABLE public.profiles (
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
CREATE TABLE public.agencies (
  id                       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id                  UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  name                     TEXT NOT NULL,
  slug                     TEXT NOT NULL UNIQUE,
  logo_url                 TEXT,
  cover_url                TEXT,
  description              TEXT,
  phone                    TEXT,
  email                    TEXT,
  website                  TEXT,
  address_line1            TEXT,
  address_line2            TEXT,
  city                     TEXT,
  county                   TEXT,
  postcode                 TEXT NOT NULL,
  lat                      DOUBLE PRECISION,
  lng                      DOUBLE PRECISION,
  plan_tier                TEXT NOT NULL DEFAULT 'starter' CHECK (plan_tier IN ('starter','growth','pro')),
  stripe_customer_id       TEXT,
  stripe_subscription_id   TEXT,
  subscription_status      TEXT DEFAULT 'trialing',
  trial_ends_at            TIMESTAMPTZ,
  verified                 BOOLEAN DEFAULT FALSE,
  avg_rating               NUMERIC(3,2) DEFAULT 0,
  review_count             INTEGER DEFAULT 0,
  listing_count            INTEGER DEFAULT 0,
  created_at               TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at               TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================
-- PROPERTIES
-- =============================================
CREATE TABLE public.properties (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agency_id         UUID NOT NULL REFERENCES public.agencies(id) ON DELETE CASCADE,
  agent_id          UUID NOT NULL REFERENCES public.profiles(id),
  title             TEXT NOT NULL,
  slug              TEXT NOT NULL UNIQUE,
  description       TEXT,
  ai_summary        TEXT,
  status            TEXT NOT NULL DEFAULT 'active'
                    CHECK (status IN ('active','sold_stc','let_agreed','sold','let','withdrawn','draft')),
  tenure            TEXT CHECK (tenure IN ('freehold','leasehold','share_of_freehold','commonhold')),
  listing_type      TEXT NOT NULL CHECK (listing_type IN ('sale','rent','commercial_sale','commercial_rent')),
  property_type     TEXT NOT NULL CHECK (property_type IN ('detached','semi_detached','terraced','flat','bungalow','cottage','maisonette','studio','land','commercial','new_build')),
  price             INTEGER NOT NULL,
  price_qualifier   TEXT CHECK (price_qualifier IN ('offers_over','offers_in_excess','fixed_price','guide_price','from')),
  rent_frequency    TEXT CHECK (rent_frequency IN ('per_month','per_week')),
  bedrooms          SMALLINT DEFAULT 0,
  bathrooms         SMALLINT DEFAULT 0,
  reception_rooms   SMALLINT DEFAULT 0,
  sqft              INTEGER,
  sqm               INTEGER,
  address_line1     TEXT NOT NULL,
  address_line2     TEXT,
  town              TEXT NOT NULL,
  county            TEXT,
  postcode          TEXT NOT NULL,
  lat               DOUBLE PRECISION NOT NULL,
  lng               DOUBLE PRECISION NOT NULL,
  exact_location    BOOLEAN DEFAULT TRUE,
  council_tax_band  TEXT CHECK (council_tax_band IN ('A','B','C','D','E','F','G','H')),
  epc_rating        TEXT CHECK (epc_rating IN ('A','B','C','D','E','F','G')),
  epc_expires_at    DATE,
  year_built        SMALLINT,
  floors            SMALLINT,
  heating_type      TEXT,
  parking           TEXT[],
  garden            TEXT CHECK (garden IN ('none','front','rear','front_and_rear')),
  available_from    DATE,
  deposit           INTEGER,
  min_tenancy       SMALLINT,
  pets_allowed      BOOLEAN,
  smokers_allowed   BOOLEAN,
  dss_accepted      BOOLEAN,
  furnishing        TEXT CHECK (furnishing IN ('furnished','unfurnished','part_furnished')),
  features          TEXT[],
  virtual_tour_url  TEXT,
  video_url         TEXT,
  view_count        INTEGER DEFAULT 0,
  save_count        INTEGER DEFAULT 0,
  enquiry_count     INTEGER DEFAULT 0,
  days_on_market    INTEGER DEFAULT 0,
  featured          BOOLEAN DEFAULT FALSE,
  featured_until    TIMESTAMPTZ,
  seo_title         TEXT,
  seo_description   TEXT,
  published_at      TIMESTAMPTZ,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================
-- PROPERTY_IMAGES
-- =============================================
CREATE TABLE public.property_images (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id   UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  url           TEXT NOT NULL,
  cloudinary_id TEXT,
  alt_text      TEXT,
  width         INTEGER,
  height        INTEGER,
  sort_order    SMALLINT DEFAULT 0,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================
-- ENQUIRIES
-- =============================================
CREATE TABLE public.enquiries (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id      UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  agency_id        UUID NOT NULL REFERENCES public.agencies(id) ON DELETE CASCADE,
  user_id          UUID REFERENCES public.profiles(id),
  name             TEXT NOT NULL,
  email            TEXT NOT NULL,
  phone            TEXT,
  message          TEXT NOT NULL,
  preferred_contact TEXT CHECK (preferred_contact IN ('any','morning','afternoon','evening')),
  status           TEXT NOT NULL DEFAULT 'new'
                   CHECK (status IN ('new','read','replied','viewing_booked','closed')),
  source           TEXT DEFAULT 'listing_page',
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================
-- SAVED_PROPERTIES
-- =============================================
CREATE TABLE public.saved_properties (
  user_id      UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  property_id  UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (user_id, property_id)
);

-- =============================================
-- SAVED_SEARCHES
-- =============================================
CREATE TABLE public.saved_searches (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  name            TEXT,
  search_params   JSONB NOT NULL,
  alert_enabled   BOOLEAN DEFAULT TRUE,
  last_alerted_at TIMESTAMPTZ,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================
-- CONTACTS (agent CRM)
-- =============================================
CREATE TABLE public.contacts (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agency_id        UUID NOT NULL REFERENCES public.agencies(id) ON DELETE CASCADE,
  name             TEXT NOT NULL,
  email            TEXT,
  phone            TEXT,
  source           TEXT,
  budget_min       INTEGER,
  budget_max       INTEGER,
  bedrooms_min     SMALLINT,
  bedrooms_max     SMALLINT,
  preferred_areas  TEXT[],
  listing_type     TEXT CHECK (listing_type IN ('sale','rent','both')),
  lead_score       SMALLINT DEFAULT 5 CHECK (lead_score BETWEEN 1 AND 10),
  status           TEXT DEFAULT 'new'
                   CHECK (status IN ('new','contacted','viewing','offer','completed','lost')),
  notes            TEXT,
  tags             TEXT[],
  last_activity_at TIMESTAMPTZ,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================
-- MARKET_DATA
-- =============================================
CREATE TABLE public.market_data (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  location_slug         TEXT NOT NULL,
  location_name         TEXT NOT NULL,
  location_type         TEXT CHECK (location_type IN ('region','county','city','town','postcode')),
  month                 DATE NOT NULL,
  listing_type          TEXT NOT NULL CHECK (listing_type IN ('sale','rent')),
  avg_asking_price      INTEGER,
  median_asking_price   INTEGER,
  price_change_mom      NUMERIC(5,2),
  price_change_yoy      NUMERIC(5,2),
  stock_count           INTEGER,
  stock_change_mom      NUMERIC(5,2),
  avg_days_on_market    NUMERIC(5,1),
  demand_index          NUMERIC(5,2),
  created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (location_slug, month, listing_type)
);

-- =============================================
-- LOCATION_PAGES (SEO CMS)
-- =============================================
CREATE TABLE public.location_pages (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug             TEXT NOT NULL UNIQUE,
  h1               TEXT NOT NULL,
  intro_paragraph  TEXT,
  seo_title        TEXT,
  seo_description  TEXT,
  location_name    TEXT NOT NULL,
  region           TEXT,
  county           TEXT,
  property_type    TEXT,
  listing_type     TEXT,
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================
-- AGENT_REVIEWS
-- =============================================
CREATE TABLE public.agent_reviews (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agency_id     UUID NOT NULL REFERENCES public.agencies(id) ON DELETE CASCADE,
  reviewer_id   UUID REFERENCES public.profiles(id),
  reviewer_name TEXT NOT NULL,
  rating        SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  title         TEXT,
  body          TEXT NOT NULL,
  verified      BOOLEAN DEFAULT FALSE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================
-- VALUATION_REQUESTS
-- =============================================
CREATE TABLE public.valuation_requests (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agency_id        UUID REFERENCES public.agencies(id),
  name             TEXT NOT NULL,
  email            TEXT NOT NULL,
  phone            TEXT,
  address          TEXT NOT NULL,
  postcode         TEXT NOT NULL,
  property_type    TEXT,
  bedrooms         SMALLINT,
  reason           TEXT CHECK (reason IN ('selling','letting','remortgage','insurance','curious')),
  instant_value    INTEGER,
  status           TEXT DEFAULT 'pending',
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================
-- ROW LEVEL SECURITY
-- =============================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Profiles are publicly readable" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

ALTER TABLE public.agencies ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Agencies are publicly readable" ON public.agencies FOR SELECT USING (true);
CREATE POLICY "Agents can update own agency" ON public.agencies FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Agents can insert own agency" ON public.agencies FOR INSERT WITH CHECK (auth.uid() = user_id);

ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published properties publicly readable" ON public.properties
  FOR SELECT USING (status != 'draft' OR agent_id = auth.uid());
CREATE POLICY "Agents manage own listings" ON public.properties
  FOR ALL USING (agent_id = auth.uid());

ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Agents read own enquiries" ON public.enquiries
  FOR SELECT USING (agency_id IN (SELECT id FROM public.agencies WHERE user_id = auth.uid()));
CREATE POLICY "Anyone can create enquiry" ON public.enquiries FOR INSERT WITH CHECK (true);

ALTER TABLE public.saved_properties ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own saved" ON public.saved_properties FOR ALL USING (auth.uid() = user_id);

ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Agents manage own contacts" ON public.contacts
  FOR ALL USING (agency_id IN (SELECT id FROM public.agencies WHERE user_id = auth.uid()));

-- =============================================
-- AUTH TRIGGER
-- =============================================
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name', 'consumer');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- =============================================
-- STORAGE BUCKETS
-- =============================================
-- Note: Create buckets manually in Supabase dashboard:
-- 1. property-images
-- 2. agency-logos
-- 3. documents

CREATE POLICY "Anyone can read property images"
  ON storage.objects FOR SELECT USING (bucket_id = 'property-images');
CREATE POLICY "Authenticated users can upload"
  ON storage.objects FOR INSERT WITH CHECK (
    bucket_id = 'property-images' AND auth.role() = 'authenticated'
  );
