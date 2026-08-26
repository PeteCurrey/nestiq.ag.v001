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
          readiness_score: number | null
          readiness_updated_at: string | null
          id_verified: boolean
          moving_timescale: string | null
          min_bedrooms: number | null
          preferred_areas: string[] | null
          deposit_available: number | null
          budget_max: number | null
          budget_min: number | null
          mortgage_status: Database['public']['Enums']['mortgage_status'] | null
          buyer_position: Database['public']['Enums']['buyer_position'] | null
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
          readiness_updated_at?: string | null
          id_verified?: boolean
          moving_timescale?: string | null
          min_bedrooms?: number | null
          preferred_areas?: string[] | null
          deposit_available?: number | null
          budget_max?: number | null
          budget_min?: number | null
          mortgage_status?: Database['public']['Enums']['mortgage_status'] | null
          buyer_position?: Database['public']['Enums']['buyer_position'] | null
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
          readiness_updated_at?: string | null
          id_verified?: boolean
          moving_timescale?: string | null
          min_bedrooms?: number | null
          preferred_areas?: string[] | null
          deposit_available?: number | null
          budget_max?: number | null
          budget_min?: number | null
          mortgage_status?: Database['public']['Enums']['mortgage_status'] | null
          buyer_position?: Database['public']['Enums']['buyer_position'] | null
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
        Relationships: [
          {
            foreignKeyName: "agencies_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      properties: {
        Row: {
          branch_id: string | null
          expires_at: string | null
          compiled_at: string | null
          source_url: string | null
          provenance: Database['public']['Enums']['listing_provenance']
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
          branch_id?: string | null
          expires_at?: string | null
          compiled_at?: string | null
          source_url?: string | null
          provenance?: Database['public']['Enums']['listing_provenance']
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
          branch_id?: string | null
          expires_at?: string | null
          compiled_at?: string | null
          source_url?: string | null
          provenance?: Database['public']['Enums']['listing_provenance']
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
        Relationships: [
          {
            foreignKeyName: "properties_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agencies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "properties_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branches"
            referencedColumns: ["id"]
          }
        ]
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
        Relationships: [
          {
            foreignKeyName: "property_images_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          }
        ]
      }
      enquiries: {
        Row: {
          buyer_position_at_enquiry: Database['public']['Enums']['buyer_position'] | null
          readiness_at_enquiry: number | null
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
          buyer_position_at_enquiry?: Database['public']['Enums']['buyer_position'] | null
          readiness_at_enquiry?: number | null
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
          buyer_position_at_enquiry?: Database['public']['Enums']['buyer_position'] | null
          readiness_at_enquiry?: number | null
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
        Relationships: [
          {
            foreignKeyName: "enquiries_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enquiries_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agencies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enquiries_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      saved_properties: {
        Row: {
          price_at_save: number | null
          notes: string | null
          collection_id: string | null
          id: string
          user_id: string
          property_id: string
          created_at: string
        }
        Insert: {
          price_at_save?: number | null
          notes?: string | null
          collection_id?: string | null
          id?: string
          user_id: string
          property_id: string
          created_at?: string
        }
        Update: {
          price_at_save?: number | null
          notes?: string | null
          collection_id?: string | null
          id?: string
          user_id?: string
          property_id?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "saved_properties_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "saved_properties_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
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
        Relationships: [
          {
            foreignKeyName: "saved_searches_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
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
        Relationships: [
          {
            foreignKeyName: "contacts_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agencies"
            referencedColumns: ["id"]
          }
        ]
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
        Relationships: [
          {
            foreignKeyName: "agent_reviews_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agencies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_reviews_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
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
        Relationships: [
          {
            foreignKeyName: "sync_logs_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agencies"
            referencedColumns: ["id"]
          }
        ]
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
        Relationships: [
          {
            foreignKeyName: "property_status_events_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          }
        ]
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
      branches: {
        Row: {
          id: string
          agency_id: string | null
          name: string
          slug: string
          source_branch_id: string | null
          source_name: string | null
          phone: string | null
          email: string | null
          website: string | null
          address_line1: string | null
          town: string | null
          postcode: string | null
          lat: number | null
          lng: number | null
          claim_state: 'unclaimed' | 'invited' | 'claiming' | 'claimed' | 'opted_out'
          claimed_at: string | null
          claimed_by: string | null
          opted_out_at: string | null
          opt_out_reason: string | null
          listing_count: number
          leads_forwarded: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          agency_id?: string | null
          name: string
          slug: string
          source_branch_id?: string | null
          source_name?: string | null
          phone?: string | null
          email?: string | null
          website?: string | null
          address_line1?: string | null
          town?: string | null
          postcode?: string | null
          lat?: number | null
          lng?: number | null
          claim_state?: 'unclaimed' | 'invited' | 'claiming' | 'claimed' | 'opted_out'
          claimed_at?: string | null
          claimed_by?: string | null
          opted_out_at?: string | null
          opt_out_reason?: string | null
          listing_count?: number
          leads_forwarded?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          agency_id?: string | null
          name?: string
          slug?: string
          source_branch_id?: string | null
          source_name?: string | null
          phone?: string | null
          email?: string | null
          website?: string | null
          address_line1?: string | null
          town?: string | null
          postcode?: string | null
          lat?: number | null
          lng?: number | null
          claim_state?: 'unclaimed' | 'invited' | 'claiming' | 'claimed' | 'opted_out'
          claimed_at?: string | null
          claimed_by?: string | null
          opted_out_at?: string | null
          opt_out_reason?: string | null
          listing_count?: number
          leads_forwarded?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "branches_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agencies"
            referencedColumns: ["id"]
          }
        ]
      }
      branch_claims: {
        Row: {
          id: string
          branch_id: string
          token: string
          sent_to_email: string
          sent_at: string | null
          opened_at: string | null
          completed_at: string | null
          expires_at: string
          created_at: string
        }
        Insert: {
          id?: string
          branch_id: string
          token: string
          sent_to_email: string
          sent_at?: string | null
          opened_at?: string | null
          completed_at?: string | null
          expires_at: string
          created_at?: string
        }
        Update: {
          id?: string
          branch_id?: string
          token?: string
          sent_to_email?: string
          sent_at?: string | null
          opened_at?: string | null
          completed_at?: string | null
          expires_at?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "branch_claims_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branches"
            referencedColumns: ["id"]
          }
        ]
      }
      forwarded_leads: {
        Row: {
          id: string
          enquiry_id: string
          branch_id: string
          forwarded_to: string
          forwarded_at: string
          delivery_status: 'pending' | 'sent' | 'bounced' | 'failed'
          provider_id: string | null
        }
        Insert: {
          id?: string
          enquiry_id: string
          branch_id: string
          forwarded_to: string
          forwarded_at?: string
          delivery_status?: 'pending' | 'sent' | 'bounced' | 'failed'
          provider_id?: string | null
        }
        Update: {
          id?: string
          enquiry_id?: string
          branch_id?: string
          forwarded_to?: string
          forwarded_at?: string
          delivery_status?: 'pending' | 'sent' | 'bounced' | 'failed'
          provider_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "forwarded_leads_enquiry_id_fkey"
            columns: ["enquiry_id"]
            isOneToOne: false
            referencedRelation: "enquiries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forwarded_leads_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branches"
            referencedColumns: ["id"]
          }
        ]
      }
      collections: {
        Row: {
          id: string
          user_id: string
          name: string
          description: string | null
          is_default: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          description?: string | null
          is_default?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          description?: string | null
          is_default?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "collections_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      property_views: {
        Row: {
          id: string
          user_id: string
          property_id: string
          viewed_at: string
        }
        Insert: {
          id?: string
          user_id: string
          property_id: string
          viewed_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          property_id?: string
          viewed_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "property_views_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "property_views_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          }
        ]
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
      expire_compiled_listings: {
        Args: Record<string, never>
        Returns: number
      }
    }
    Enums: {
      buyer_position:
        | 'first_time_buyer' | 'chain_free' | 'selling_first' | 'in_chain'
        | 'cash_buyer' | 'investor' | 'renting'
      mortgage_status:
        | 'not_started' | 'researching' | 'agreement_in_principle'
        | 'offer_issued' | 'cash_no_mortgage'
      listing_provenance: 'agent_direct' | 'agent_feed' | 'compiled'
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
