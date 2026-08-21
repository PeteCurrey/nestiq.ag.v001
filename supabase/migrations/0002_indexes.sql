-- =============================================================================
-- 0002 — Indexes
--
-- The previous schema files defined none at all. Every search, location page
-- and agent dashboard query was a sequential scan. These cover the access
-- patterns the app actually has today.
-- =============================================================================

-- Search: the common filter is status + listing_type, then price / beds.
CREATE INDEX IF NOT EXISTS properties_active_sale_idx
  ON public.properties (listing_type, price)
  WHERE status = 'active';

CREATE INDEX IF NOT EXISTS properties_town_idx
  ON public.properties (lower(town))
  WHERE status = 'active';

CREATE INDEX IF NOT EXISTS properties_postcode_idx
  ON public.properties (upper(postcode));

CREATE INDEX IF NOT EXISTS properties_bedrooms_idx
  ON public.properties (bedrooms)
  WHERE status = 'active';

-- Agent dashboard: "my listings, newest first".
CREATE INDEX IF NOT EXISTS properties_agency_published_idx
  ON public.properties (agency_id, published_at DESC);

-- Homepage featured rail.
CREATE INDEX IF NOT EXISTS properties_featured_idx
  ON public.properties (published_at DESC)
  WHERE featured = TRUE AND status = 'active';

-- Map bounding-box queries.
CREATE INDEX IF NOT EXISTS properties_geo_idx
  ON public.properties (lat, lng)
  WHERE status = 'active' AND lat IS NOT NULL AND lng IS NOT NULL;

-- Feed sync dedupe: hot path when importing.
CREATE INDEX IF NOT EXISTS properties_data_source_idx
  ON public.properties (data_source);

-- Gallery fetch, always ordered.
CREATE INDEX IF NOT EXISTS property_images_property_idx
  ON public.property_images (property_id, sort_order);

-- Agent leads inbox.
CREATE INDEX IF NOT EXISTS enquiries_agency_created_idx
  ON public.enquiries (agency_id, created_at DESC);

CREATE INDEX IF NOT EXISTS enquiries_property_idx
  ON public.enquiries (property_id);

-- Buyer account surfaces.
CREATE INDEX IF NOT EXISTS saved_properties_user_idx
  ON public.saved_properties (user_id, created_at DESC);

CREATE INDEX IF NOT EXISTS saved_searches_user_idx
  ON public.saved_searches (user_id);

-- Alert dispatcher scans for due searches.
CREATE INDEX IF NOT EXISTS saved_searches_due_idx
  ON public.saved_searches (alert_frequency, last_alerted_at)
  WHERE alert_enabled = TRUE;

-- Agent CRM.
CREATE INDEX IF NOT EXISTS contacts_agency_idx
  ON public.contacts (agency_id, updated_at DESC);

-- Market ticker / area pages.
CREATE INDEX IF NOT EXISTS market_data_area_period_idx
  ON public.market_data (area, period DESC);

-- Agency profile pages.
CREATE INDEX IF NOT EXISTS agent_reviews_agency_idx
  ON public.agent_reviews (agency_id, created_at DESC)
  WHERE is_published = TRUE;

-- Admin valuation queue.
CREATE INDEX IF NOT EXISTS valuation_requests_status_idx
  ON public.valuation_requests (status, created_at DESC);

-- Integration debugging.
CREATE INDEX IF NOT EXISTS sync_logs_agency_created_idx
  ON public.sync_logs (agency_id, created_at DESC);
