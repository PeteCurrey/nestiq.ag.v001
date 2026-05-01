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
  town                     TEXT,
  postcode                 TEXT,
  is_verified              BOOLEAN DEFAULT FALSE,
  stripe_customer_id       TEXT,
  subscription_status      TEXT DEFAULT 'trialing',
  created_at               TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================
-- PROPERTIES
-- =============================================
CREATE TABLE public.properties (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agency_id           UUID NOT NULL REFERENCES public.agencies(id) ON DELETE CASCADE,
  title               TEXT NOT NULL,
  slug                TEXT NOT NULL UNIQUE,
  description         TEXT,
  price               NUMERIC NOT NULL,
  price_qualifier     TEXT,
  listing_type        TEXT NOT NULL CHECK (listing_type IN ('sale','rent')),
  property_type       TEXT NOT NULL,
  status              TEXT NOT NULL DEFAULT 'for-sale',
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
  images              TEXT[] DEFAULT '{}',
  epc_rating          TEXT,
  tenure              TEXT,
  council_tax_band    TEXT,
  featured            BOOLEAN DEFAULT FALSE,
  enquiry_count       INTEGER DEFAULT 0,
  published_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================
-- ENQUIRIES (Leads)
-- =============================================
CREATE TABLE public.enquiries (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id         UUID REFERENCES public.properties(id) ON DELETE SET NULL,
  agency_id           UUID REFERENCES public.agencies(id) ON DELETE CASCADE,
  full_name           TEXT NOT NULL,
  email               TEXT NOT NULL,
  phone               TEXT,
  message             TEXT NOT NULL,
  contact_time        TEXT,
  status              TEXT DEFAULT 'new',
  ai_score            INTEGER,
  ai_intent_summary   TEXT,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================
-- SAVED PROPERTIES
-- =============================================
CREATE TABLE public.saved_properties (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  property_id  UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, property_id)
);

-- =============================================
-- ACTIVITY LOGS (CRM Timeline)
-- =============================================
CREATE TABLE public.activity_logs (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agency_id    UUID NOT NULL REFERENCES public.agencies(id) ON DELETE CASCADE,
  lead_id      UUID REFERENCES public.enquiries(id) ON DELETE SET NULL,
  user_id      UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  action       TEXT NOT NULL,
  details      JSONB,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================
-- RLS POLICIES
-- =============================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can only read/update their own profile
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Properties: Anyone can read, only agents can manage their own
CREATE POLICY "Anyone can view properties" ON public.properties FOR SELECT USING (TRUE);
CREATE POLICY "Agents can manage own properties" ON public.properties
  USING (agency_id IN (SELECT id FROM public.agencies WHERE user_id = auth.uid()));

-- Enquiries: Agents can view their agency's enquiries
CREATE POLICY "Agents can view agency leads" ON public.enquiries
  FOR SELECT USING (agency_id IN (SELECT id FROM public.agencies WHERE user_id = auth.uid()));

-- =============================================
-- AUTH TRIGGER
-- =============================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url, role)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url', COALESCE(new.raw_user_meta_data->>'role', 'consumer'));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
