export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          avatar_url: string | null
          phone: string | null
          role: 'consumer' | 'agent' | 'admin'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          avatar_url?: string | null
          phone?: string | null
          role?: 'consumer' | 'agent' | 'admin'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          avatar_url?: string | null
          phone?: string | null
          role?: 'consumer' | 'agent' | 'admin'
          created_at?: string
          updated_at?: string
        }
      }
      agencies: {
        Row: {
          id: string
          user_id: string
          name: string
          slug: string
          logo_url: string | null
          cover_url: string | null
          description: string | null
          phone: string | null
          email: string | null
          website: string | null
          address_line1: string | null
          address_line2: string | null
          city: string | null
          county: string | null
          postcode: string
          lat: number | null
          lng: number | null
          plan_tier: 'starter' | 'growth' | 'pro'
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          subscription_status: string | null
          trial_ends_at: string | null
          verified: boolean
          avg_rating: number
          review_count: number
          listing_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          slug: string
          logo_url?: string | null
          cover_url?: string | null
          description?: string | null
          phone?: string | null
          email?: string | null
          website?: string | null
          address_line1?: string | null
          address_line2?: string | null
          city?: string | null
          county?: string | null
          postcode: string
          lat?: number | null
          lng?: number | null
          plan_tier?: 'starter' | 'growth' | 'pro'
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          subscription_status?: string | null
          trial_ends_at?: string | null
          verified?: boolean
          avg_rating?: number
          review_count?: number
          listing_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          slug?: string
          logo_url?: string | null
          cover_url?: string | null
          description?: string | null
          phone?: string | null
          email?: string | null
          website?: string | null
          address_line1?: string | null
          address_line2?: string | null
          city?: string | null
          county?: string | null
          postcode?: string
          lat?: number | null
          lng?: number | null
          plan_tier?: 'starter' | 'growth' | 'pro'
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          subscription_status?: string | null
          trial_ends_at?: string | null
          verified?: boolean
          avg_rating?: number
          review_count?: number
          listing_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      properties: {
        Row: {
          id: string
          agency_id: string
          agent_id: string
          title: string
          slug: string
          description: string | null
          ai_summary: string | null
          status: 'active' | 'sold_stc' | 'let_agreed' | 'sold' | 'let' | 'withdrawn' | 'draft'
          tenure: 'freehold' | 'leasehold' | 'share_of_freehold' | 'commonhold' | null
          listing_type: 'sale' | 'rent' | 'commercial_sale' | 'commercial_rent'
          property_type: 'detached' | 'semi_detached' | 'terraced' | 'flat' | 'bungalow' | 'cottage' | 'maisonette' | 'studio' | 'land' | 'commercial' | 'new_build'
          price: number
          price_qualifier: 'offers_over' | 'offers_in_excess' | 'fixed_price' | 'guide_price' | 'from' | null
          rent_frequency: 'per_month' | 'per_week' | null
          bedrooms: number
          bathrooms: number
          reception_rooms: number
          sqft: number | null
          sqm: number | null
          address_line1: string
          address_line2: string | null
          town: string
          county: string | null
          postcode: string
          lat: number
          lng: number
          exact_location: boolean
          council_tax_band: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | null
          epc_rating: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | null
          epc_expires_at: string | null
          year_built: number | null
          floors: number | null
          heating_type: string | null
          parking: string[] | null
          garden: 'none' | 'front' | 'rear' | 'front_and_rear' | null
          available_from: string | null
          deposit: number | null
          min_tenancy: number | null
          pets_allowed: boolean | null
          smokers_allowed: boolean | null
          dss_accepted: boolean | null
          furnishing: 'furnished' | 'unfurnished' | 'part_furnished' | null
          features: string[] | null
          virtual_tour_url: string | null
          video_url: string | null
          view_count: number
          save_count: number
          enquiry_count: number
          days_on_market: number
          featured: boolean
          featured_until: string | null
          seo_title: string | null
          seo_description: string | null
          published_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          agency_id: string
          agent_id: string
          title: string
          slug: string
          description?: string | null
          ai_summary?: string | null
          status?: 'active' | 'sold_stc' | 'let_agreed' | 'sold' | 'let' | 'withdrawn' | 'draft'
          tenure?: 'freehold' | 'leasehold' | 'share_of_freehold' | 'commonhold' | null
          listing_type: 'sale' | 'rent' | 'commercial_sale' | 'commercial_rent'
          property_type: 'detached' | 'semi_detached' | 'terraced' | 'flat' | 'bungalow' | 'cottage' | 'maisonette' | 'studio' | 'land' | 'commercial' | 'new_build'
          price: number
          price_qualifier?: 'offers_over' | 'offers_in_excess' | 'fixed_price' | 'guide_price' | 'from' | null
          rent_frequency?: 'per_month' | 'per_week' | null
          bedrooms?: number
          bathrooms?: number
          reception_rooms?: number
          sqft?: number | null
          sqm?: number | null
          address_line1: string
          address_line2?: string | null
          town: string
          county?: string | null
          postcode: string
          lat: number
          lng: number
          exact_location?: boolean
          council_tax_band?: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | null
          epc_rating?: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | null
          epc_expires_at?: string | null
          year_built?: number | null
          floors?: number | null
          heating_type?: string | null
          parking?: string[] | null
          garden?: 'none' | 'front' | 'rear' | 'front_and_rear' | null
          available_from?: string | null
          deposit?: number | null
          min_tenancy?: number | null
          pets_allowed?: boolean | null
          smokers_allowed?: boolean | null
          dss_accepted?: boolean | null
          furnishing?: 'furnished' | 'unfurnished' | 'part_furnished' | null
          features?: string[] | null
          virtual_tour_url?: string | null
          video_url?: string | null
          view_count?: number
          save_count?: number
          enquiry_count?: number
          days_on_market?: number
          featured?: boolean
          featured_until?: string | null
          seo_title?: string | null
          seo_description?: string | null
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          agency_id?: string
          agent_id?: string
          title?: string
          slug?: string
          description?: string | null
          ai_summary?: string | null
          status?: 'active' | 'sold_stc' | 'let_agreed' | 'sold' | 'let' | 'withdrawn' | 'draft'
          tenure?: 'freehold' | 'leasehold' | 'share_of_freehold' | 'commonhold' | null
          listing_type?: 'sale' | 'rent' | 'commercial_sale' | 'commercial_rent'
          property_type?: 'detached' | 'semi_detached' | 'terraced' | 'flat' | 'bungalow' | 'cottage' | 'maisonette' | 'studio' | 'land' | 'commercial' | 'new_build'
          price?: number
          price_qualifier?: 'offers_over' | 'offers_in_excess' | 'fixed_price' | 'guide_price' | 'from' | null
          rent_frequency?: 'per_month' | 'per_week' | null
          bedrooms?: number
          bathrooms?: number
          reception_rooms?: number
          sqft?: number | null
          sqm?: number | null
          address_line1?: string
          address_line2?: string | null
          town?: string
          county?: string | null
          postcode?: string
          lat?: number
          lng?: number
          exact_location?: boolean
          council_tax_band?: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | null
          epc_rating?: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | null
          epc_expires_at?: string | null
          year_built?: number | null
          floors?: number | null
          heating_type?: string | null
          parking?: string[] | null
          garden?: 'none' | 'front' | 'rear' | 'front_and_rear' | null
          available_from?: string | null
          deposit?: number | null
          min_tenancy?: number | null
          pets_allowed?: boolean | null
          smokers_allowed?: boolean | null
          dss_accepted?: boolean | null
          furnishing?: 'furnished' | 'unfurnished' | 'part_furnished' | null
          features?: string[] | null
          virtual_tour_url?: string | null
          video_url?: string | null
          view_count?: number
          save_count?: number
          enquiry_count?: number
          days_on_market?: number
          featured?: boolean
          featured_until?: string | null
          seo_title?: string | null
          seo_description?: string | null
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      property_images: {
        Row: {
          id: string
          property_id: string
          url: string
          cloudinary_id: string | null
          alt_text: string | null
          width: number | null
          height: number | null
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          property_id: string
          url: string
          cloudinary_id?: string | null
          alt_text?: string | null
          width?: number | null
          height?: number | null
          sort_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          property_id?: string
          url?: string
          cloudinary_id?: string | null
          alt_text?: string | null
          width?: number | null
          height?: number | null
          sort_order?: number
          created_at?: string
        }
      }
      enquiries: {
        Row: {
          id: string
          property_id: string
          agency_id: string
          user_id: string | null
          name: string
          email: string
          phone: string | null
          message: string
          preferred_contact: 'any' | 'morning' | 'afternoon' | 'evening' | null
          status: 'new' | 'read' | 'replied' | 'viewing_booked' | 'closed'
          source: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          property_id: string
          agency_id: string
          user_id?: string | null
          name: string
          email: string
          phone?: string | null
          message: string
          preferred_contact?: 'any' | 'morning' | 'afternoon' | 'evening' | null
          status?: 'new' | 'read' | 'replied' | 'viewing_booked' | 'closed'
          source?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          property_id?: string
          agency_id?: string
          user_id?: string | null
          name?: string
          email?: string
          phone?: string | null
          message?: string
          preferred_contact?: 'any' | 'morning' | 'afternoon' | 'evening' | null
          status?: 'new' | 'read' | 'replied' | 'viewing_booked' | 'closed'
          source?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
