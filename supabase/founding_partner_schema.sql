-- Founding Partner Campaign Schema

CREATE TYPE founding_state AS ENUM ('unclaimed', 'viewed', 'booked', 'confirmed', 'declined', 'expired');

CREATE TABLE founding_recipients (
  token text PRIMARY KEY,
  slug text UNIQUE NOT NULL,
  agency_name text NOT NULL,
  principal_name text NOT NULL,
  principal_email text NOT NULL,
  principal_phone text,
  postcode_district text NOT NULL,
  region_label text NOT NULL,
  estimated_current_spend_monthly integer,
  brochure_sent_at timestamp with time zone,
  held_until timestamp with time zone,
  state founding_state DEFAULT 'unclaimed',
  view_log jsonb DEFAULT '[]'::jsonb,
  booking_id text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

CREATE TABLE bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient_token text REFERENCES founding_recipients(token),
  start_time timestamp with time zone NOT NULL,
  visit_type text CHECK (visit_type IN ('zoom', 'in_person')),
  status text DEFAULT 'scheduled',
  created_at timestamp with time zone DEFAULT now()
);

-- Foreign key for booking_id on founding_recipients
ALTER TABLE founding_recipients 
  ADD CONSTRAINT fk_booking 
  FOREIGN KEY (booking_id) 
  REFERENCES bookings(id);

-- Add updated_at trigger for founding_recipients
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_timestamp_founding_recipients
BEFORE UPDATE ON founding_recipients
FOR EACH ROW
EXECUTE FUNCTION trigger_set_timestamp();
