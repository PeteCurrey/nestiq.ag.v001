export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

/**
 * Generated to match supabase/migrations/0001-0005.
 *
 * Regenerate with the Supabase CLI once a project exists:
 *   supabase gen types typescript --project-id <id> > types/database.ts
 *
 * The previous version of this file described a fourth, divergent schema that
 * matched none of the SQL in the repo and defined only 5 of the 16 tables,
 * which made every query against the others resolve to `never`.
 */
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          onboarding_completed: boolean
          id: string
          full_name: string | null
          avatar_url: string | null
          phone: string | null
          role: 'consumer' | 'agent' | 'admin'
          created_at: string
          updated_at: string
        }
        Insert: {
          onboarding_completed?: boolean
          id: string
          full_name?: string | null
          avatar_url?: string | null
          phone?: string | null
          role?: 'consumer' | 'agent' | 'admin'
          created_at?: string
          updated_at?: string
        }
        Update: {
          onboarding_completed?: boolean
          id?: string
          full_name?: string | null
          avatar_url?: string | null
          phone?: string | null
          role?: 'consumer' | 'agent' | 'admin'
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      agencies: {
        Row: {
          listing_count: number
          review_count: number
          avg_rating: number | null
          lng: number | null
          lat: number | null
          county: string | null
          id: string
          user_id: string | null
          name: string
          slug: string
          logo_url: string | null
          cover_url: string | null
          description: string | null
          phone: string | null
          email: string | null
          website: string | null
          address_line1: string | null
          town: string | null
          postcode: string | null
          is_verified: boolean | null
          stripe_customer_id: string | null
          subscription_status: string | null
          plan_tier: string | null
          integration_type: string | null
          specialisms: string[] | null
          created_at: string
        }
        Insert: {
          listing_count?: number
          review_count?: number
          avg_rating?: number | null
          lng?: number | null
          lat?: number | null
          county?: string | null
          id?: string
          user_id?: string | null
          name: string
          slug: string
          logo_url?: string | null
          cover_url?: string | null
          description?: string | null
          phone?: string | null
          email?: string | null
          website?: string | null
          address_line1?: string | null
          town?: string | null
          postcode?: string | null
          is_verified?: boolean | null
          stripe_customer_id?: string | null
          subscription_status?: string | null
          plan_tier?: string | null
          integration_type?: string | null
          specialisms?: string[] | null
          created_at?: string
        }
        Update: {
          listing_count?: number
          review_count?: number
          avg_rating?: number | null
          lng?: number | null
          lat?: number | null
          county?: string | null
          id?: string
          user_id?: string | null
          name?: string
          slug?: string
          logo_url?: string | null
          cover_url?: string | null
          description?: string | null
          phone?: string | null
          email?: string | null
          website?: string | null
          address_line1?: string | null
          town?: string | null
          postcode?: string | null
          is_verified?: boolean | null
          stripe_customer_id?: string | null
          subscription_status?: string | null
          plan_tier?: string | null
          integration_type?: string | null
          specialisms?: string[] | null
          created_at?: string
        }
        Relationships: []
      }
      properties: {
        Row: {
          id: string
          agency_id: string | null
          title: string
          slug: string
          description: string | null
          price: number
          price_qualifier: string | null
          listing_type: 'sale' | 'rent'
          property_type: string
          status: string
          bedrooms: number | null
          bathrooms: number | null
          reception_rooms: number | null
          sqft: number | null
          lat: number | null
          lng: number | null
          address_line1: string
          town: string
          county: string | null
          postcode: string
          features: string[] | null
          images: string[] | null
          epc_rating: string | null
          tenure: string | null
          council_tax_band: string | null
          featured: boolean | null
          view_count: number | null
          save_count: number | null
          enquiry_count: number | null
          days_on_market: number | null
          external_id: string | null
          data_source: string
          ai_summary: string | null
          virtual_tour_url: string | null
          video_url: string | null
          exact_location: boolean | null
          deposit: number | null
          min_tenancy: number | null
          pets_allowed: boolean | null
          smokers_allowed: boolean | null
          dss_accepted: boolean | null
          available_from: string | null
          seo_title: string | null
          seo_description: string | null
          published_at: string
          created_at: string
          updated_at: string
          lease_years_remaining: number | null
          ground_rent_annual: number | null
          service_charge_annual: number | null
          shared_ownership_share: number | null
          construction_type: string | null
          build_year: number | null
          heating_type: string | null
          water_supply: string | null
          electricity_supply: string | null
          sewerage_type: string | null
          broadband_type: string | null
          broadband_max_mbps: number | null
          mobile_coverage: Json | null
          parking_type: string[] | null
          accessibility: string[] | null
          flood_risk: 'none' | 'very_low' | 'low' | 'medium' | 'high' | null
          flood_history: boolean | null
          building_safety_issues: string | null
          restrictive_covenants: string | null
          rights_of_way: string | null
          listed_grade: 'none' | 'I' | 'II' | 'II*' | null
          conservation_area: boolean | null
          mining_area: boolean | null
          japanese_knotweed: boolean | null
          planning_applications: string | null
          coastal_erosion_risk: boolean | null
          sales_pack_status: 'none' | 'in_progress' | 'ready'
          sales_pack_url: string | null
          sales_pack_updated_at: string | null
          chain_status: 'no_chain' | 'chain_below' | 'chain_above' | 'chain_both' | 'chain_complete' | null
          chain_notes: string | null
          part_a_score: number | null
          part_b_score: number | null
          part_c_score: number | null
          completeness_score: number | null
        }
        Insert: {
          id?: string
          agency_id?: string | null
          title: string
          slug: string
          description?: string | null
          price: number
          price_qualifier?: string | null
          listing_type: 'sale' | 'rent'
          property_type: string
          status?: string
          bedrooms?: number | null
          bathrooms?: number | null
          reception_rooms?: number | null
          sqft?: number | null
          lat?: number | null
          lng?: number | null
          address_line1: string
          town: string
          county?: string | null
          postcode: string
          features?: string[] | null
          images?: string[] | null
          epc_rating?: string | null
          tenure?: string | null
          council_tax_band?: string | null
          featured?: boolean | null
          view_count?: number | null
          save_count?: number | null
          enquiry_count?: number | null
          days_on_market?: number | null
          external_id?: string | null
          data_source?: string
          ai_summary?: string | null
          virtual_tour_url?: string | null
          video_url?: string | null
          exact_location?: boolean | null
          deposit?: number | null
          min_tenancy?: number | null
          pets_allowed?: boolean | null
          smokers_allowed?: boolean | null
          dss_accepted?: boolean | null
          available_from?: string | null
          seo_title?: string | null
          seo_description?: string | null
          published_at?: string
          created_at?: string
          updated_at?: string
          lease_years_remaining?: number | null
          ground_rent_annual?: number | null
          service_charge_annual?: number | null
          shared_ownership_share?: number | null
          construction_type?: string | null
          build_year?: number | null
          heating_type?: string | null
          water_supply?: string | null
          electricity_supply?: string | null
          sewerage_type?: string | null
          broadband_type?: string | null
          broadband_max_mbps?: number | null
          mobile_coverage?: Json | null
          parking_type?: string[] | null
          accessibility?: string[] | null
          flood_risk?: 'none' | 'very_low' | 'low' | 'medium' | 'high' | null
          flood_history?: boolean | null
          building_safety_issues?: string | null
          restrictive_covenants?: string | null
          rights_of_way?: string | null
          listed_grade?: 'none' | 'I' | 'II' | 'II*' | null
          conservation_area?: boolean | null
          mining_area?: boolean | null
          japanese_knotweed?: boolean | null
          planning_applications?: string | null
          coastal_erosion_risk?: boolean | null
          sales_pack_status?: 'none' | 'in_progress' | 'ready'
          sales_pack_url?: string | null
          sales_pack_updated_at?: string | null
          chain_status?: 'no_chain' | 'chain_below' | 'chain_above' | 'chain_both' | 'chain_complete' | null
          chain_notes?: string | null
        }
        Update: {
          id?: string
          agency_id?: string | null
          title?: string
          slug?: string
          description?: string | null
          price?: number
          price_qualifier?: string | null
          listing_type?: 'sale' | 'rent'
          property_type?: string
          status?: string
          bedrooms?: number | null
          bathrooms?: number | null
          reception_rooms?: number | null
          sqft?: number | null
          lat?: number | null
          lng?: number | null
          address_line1?: string
          town?: string
          county?: string | null
          postcode?: string
          features?: string[] | null
          images?: string[] | null
          epc_rating?: string | null
          tenure?: string | null
          council_tax_band?: string | null
          featured?: boolean | null
          view_count?: number | null
          save_count?: number | null
          enquiry_count?: number | null
          days_on_market?: number | null
          external_id?: string | null
          data_source?: string
          ai_summary?: string | null
          virtual_tour_url?: string | null
          video_url?: string | null
          exact_location?: boolean | null
          deposit?: number | null
          min_tenancy?: number | null
          pets_allowed?: boolean | null
          smokers_allowed?: boolean | null
          dss_accepted?: boolean | null
          available_from?: string | null
          seo_title?: string | null
          seo_description?: string | null
          published_at?: string
          created_at?: string
          updated_at?: string
          lease_years_remaining?: number | null
          ground_rent_annual?: number | null
          service_charge_annual?: number | null
          shared_ownership_share?: number | null
          construction_type?: string | null
          build_year?: number | null
          heating_type?: string | null
          water_supply?: string | null
          electricity_supply?: string | null
          sewerage_type?: string | null
          broadband_type?: string | null
          broadband_max_mbps?: number | null
          mobile_coverage?: Json | null
          parking_type?: string[] | null
          accessibility?: string[] | null
          flood_risk?: 'none' | 'very_low' | 'low' | 'medium' | 'high' | null
          flood_history?: boolean | null
          building_safety_issues?: string | null
          restrictive_covenants?: string | null
          rights_of_way?: string | null
          listed_grade?: 'none' | 'I' | 'II' | 'II*' | null
          conservation_area?: boolean | null
          mining_area?: boolean | null
          japanese_knotweed?: boolean | null
          planning_applications?: string | null
          coastal_erosion_risk?: boolean | null
          sales_pack_status?: 'none' | 'in_progress' | 'ready'
          sales_pack_url?: string | null
          sales_pack_updated_at?: string | null
          chain_status?: 'no_chain' | 'chain_below' | 'chain_above' | 'chain_both' | 'chain_complete' | null
          chain_notes?: string | null
        }
        Relationships: []
      }
      property_images: {
        Row: {
          id: string
          property_id: string
          url: string
          alt_text: string | null
          sort_order: number | null
          created_at: string
        }
        Insert: {
          id?: string
          property_id: string
          url: string
          alt_text?: string | null
          sort_order?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          property_id?: string
          url?: string
          alt_text?: string | null
          sort_order?: number | null
          created_at?: string
        }
        Relationships: []
      }
      enquiries: {
        Row: {
          id: string
          property_id: string | null
          agency_id: string | null
          user_id: string | null
          full_name: string
          email: string
          phone: string | null
          message: string
          status: string | null
          ai_score: number | null
          ai_intent_summary: string | null
          created_at: string
        }
        Insert: {
          id?: string
          property_id?: string | null
          agency_id?: string | null
          user_id?: string | null
          full_name: string
          email: string
          phone?: string | null
          message: string
          status?: string | null
          ai_score?: number | null
          ai_intent_summary?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          property_id?: string | null
          agency_id?: string | null
          user_id?: string | null
          full_name?: string
          email?: string
          phone?: string | null
          message?: string
          status?: string | null
          ai_score?: number | null
          ai_intent_summary?: string | null
          created_at?: string
        }
        Relationships: []
      }
      saved_properties: {
        Row: {
          id: string
          user_id: string
          property_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          property_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          property_id?: string
          created_at?: string
        }
        Relationships: []
      }
      saved_searches: {
        Row: {
          id: string
          user_id: string
          name: string
          filters: Json
          alert_enabled: boolean
          alert_frequency: 'instant' | 'daily' | 'weekly'
          last_alerted_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          filters: Json
          alert_enabled?: boolean
          alert_frequency?: 'instant' | 'daily' | 'weekly'
          last_alerted_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          filters?: Json
          alert_enabled?: boolean
          alert_frequency?: 'instant' | 'daily' | 'weekly'
          last_alerted_at?: string | null
          created_at?: string
        }
        Relationships: []
      }
      contacts: {
        Row: {
          lead_score: number | null
          preferred_areas: string[] | null
          budget_max: number | null
          budget_min: number | null
          last_activity_at: string | null
          id: string
          agency_id: string
          full_name: string
          email: string | null
          phone: string | null
          status: string | null
          source: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          lead_score?: number | null
          preferred_areas?: string[] | null
          budget_max?: number | null
          budget_min?: number | null
          last_activity_at?: string | null
          id?: string
          agency_id: string
          full_name: string
          email?: string | null
          phone?: string | null
          status?: string | null
          source?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          lead_score?: number | null
          preferred_areas?: string[] | null
          budget_max?: number | null
          budget_min?: number | null
          last_activity_at?: string | null
          id?: string
          agency_id?: string
          full_name?: string
          email?: string | null
          phone?: string | null
          status?: string | null
          source?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      market_data: {
        Row: {
          id: string
          area: string
          property_type: string | null
          avg_price: number | null
          avg_rent: number | null
          velocity: number | null
          period: string
          created_at: string
        }
        Insert: {
          id?: string
          area: string
          property_type?: string | null
          avg_price?: number | null
          avg_rent?: number | null
          velocity?: number | null
          period: string
          created_at?: string
        }
        Update: {
          id?: string
          area?: string
          property_type?: string | null
          avg_price?: number | null
          avg_rent?: number | null
          velocity?: number | null
          period?: string
          created_at?: string
        }
        Relationships: []
      }
      location_pages: {
        Row: {
          content: string | null
          lng: number | null
          lat: number | null
          region: string | null
          county: string | null
          location_name: string | null
          id: string
          slug: string
          h1: string
          intro_paragraph: string | null
          meta_title: string | null
          meta_description: string | null
          structured_data: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          content?: string | null
          lng?: number | null
          lat?: number | null
          region?: string | null
          county?: string | null
          location_name?: string | null
          id?: string
          slug: string
          h1: string
          intro_paragraph?: string | null
          meta_title?: string | null
          meta_description?: string | null
          structured_data?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          content?: string | null
          lng?: number | null
          lat?: number | null
          region?: string | null
          county?: string | null
          location_name?: string | null
          id?: string
          slug?: string
          h1?: string
          intro_paragraph?: string | null
          meta_title?: string | null
          meta_description?: string | null
          structured_data?: Json | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      agent_reviews: {
        Row: {
          id: string
          agency_id: string
          user_id: string | null
          rating: number
          comment: string | null
          is_published: boolean
          created_at: string
        }
        Insert: {
          id?: string
          agency_id: string
          user_id?: string | null
          rating: number
          comment?: string | null
          is_published?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          agency_id?: string
          user_id?: string | null
          rating?: number
          comment?: string | null
          is_published?: boolean
          created_at?: string
        }
        Relationships: []
      }
      valuation_requests: {
        Row: {
          id: string
          full_name: string
          email: string
          phone: string
          address: string
          postcode: string
          property_type: string | null
          bedrooms: number | null
          reason: string | null
          status: string | null
          assigned_agency_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          full_name: string
          email: string
          phone: string
          address: string
          postcode: string
          property_type?: string | null
          bedrooms?: number | null
          reason?: string | null
          status?: string | null
          assigned_agency_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          full_name?: string
          email?: string
          phone?: string
          address?: string
          postcode?: string
          property_type?: string | null
          bedrooms?: number | null
          reason?: string | null
          status?: string | null
          assigned_agency_id?: string | null
          created_at?: string
        }
        Relationships: []
      }
      sync_logs: {
        Row: {
          id: string
          agency_id: string
          source: string
          status: string
          details: string | null
          created_at: string
        }
        Insert: {
          id?: string
          agency_id: string
          source: string
          status: string
          details?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          agency_id?: string
          source?: string
          status?: string
          details?: string | null
          created_at?: string
        }
        Relationships: []
      }
      property_status_events: {
        Row: {
          id: string
          property_id: string
          event: 'listed' | 'price_reduced' | 'price_increased' | 'under_offer' | 'sold_stc' | 'fell_through' | 'withdrawn' | 'relisted' | 'completed'
          price_at_event: number | null
          note: string | null
          occurred_at: string
        }
        Insert: {
          id?: string
          property_id: string
          event: 'listed' | 'price_reduced' | 'price_increased' | 'under_offer' | 'sold_stc' | 'fell_through' | 'withdrawn' | 'relisted' | 'completed'
          price_at_event?: number | null
          note?: string | null
          occurred_at?: string
        }
        Update: {
          id?: string
          property_id?: string
          event?: 'listed' | 'price_reduced' | 'price_increased' | 'under_offer' | 'sold_stc' | 'fell_through' | 'withdrawn' | 'relisted' | 'completed'
          price_at_event?: number | null
          note?: string | null
          occurred_at?: string
        }
        Relationships: []
      }
      bookings: {
        Row: {
          id: string
          recipient_token: string | null
          start_time: string
          visit_type: 'zoom' | 'in_person' | null
          status: string | null
          created_at: string
        }
        Insert: {
          id?: string
          recipient_token?: string | null
          start_time: string
          visit_type?: 'zoom' | 'in_person' | null
          status?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          recipient_token?: string | null
          start_time?: string
          visit_type?: 'zoom' | 'in_person' | null
          status?: string | null
          created_at?: string
        }
        Relationships: []
      }
      founding_recipients: {
        Row: {
          token: string
          slug: string
          agency_name: string
          principal_name: string
          principal_email: string
          principal_phone: string | null
          postcode_district: string
          region_label: string
          estimated_current_spend_monthly: number | null
          brochure_sent_at: string | null
          held_until: string | null
          state: Database['public']['Enums']['founding_state'] | null
          view_log: Json | null
          booking_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          token: string
          slug: string
          agency_name: string
          principal_name: string
          principal_email: string
          principal_phone?: string | null
          postcode_district: string
          region_label: string
          estimated_current_spend_monthly?: number | null
          brochure_sent_at?: string | null
          held_until?: string | null
          state?: Database['public']['Enums']['founding_state'] | null
          view_log?: Json | null
          booking_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          token?: string
          slug?: string
          agency_name?: string
          principal_name?: string
          principal_email?: string
          principal_phone?: string | null
          postcode_district?: string
          region_label?: string
          estimated_current_spend_monthly?: number | null
          brochure_sent_at?: string | null
          held_until?: string | null
          state?: Database['public']['Enums']['founding_state'] | null
          view_log?: Json | null
          booking_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      increment_view_count: {
        Args: { property_id: string }
        Returns: undefined
      }
      increment_enquiry_count: {
        Args: { property_id: string }
        Returns: undefined
      }
      current_user_agency_ids: {
        Args: Record<string, never>
        Returns: string[]
      }
    }
    Enums: {
      founding_state:
        | 'unclaimed'
        | 'viewed'
        | 'booked'
        | 'confirmed'
        | 'declined'
        | 'expired'
    }
  }
}
