"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { PropertyCard } from "@/components/property/PropertyCard";
import { AdvancedSearchHeader } from "./AdvancedSearchHeader";
import { SearchIntelligencePanel } from "./SearchIntelligencePanel";
import { SearchX, Bell, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export default function SearchResults() {
  const searchParams = useSearchParams();
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"list" | "grid" | "map">("grid");

  // FIX 2 — SAFE PARAM READING WITH DEFAULTS
  const q = searchParams.get('q') ?? ''; // 'q' is used by home page hero
  const location = searchParams.get('location') ?? q;
  const type = searchParams.get('type') ?? 'sale';
  const minPrice = searchParams.get('minPrice') ?? '';
  const maxPrice = searchParams.get('maxPrice') ?? '';
  const bedrooms = searchParams.get('bedrooms') ?? '';
  const propertyType = searchParams.get('propertyType') ?? '';

  useEffect(() => {
    async function fetchProperties() {
      setLoading(true);
      const supabase = createClient();

      const minPriceNum = minPrice ? parseInt(minPrice, 10) : null;
      const maxPriceNum = maxPrice ? parseInt(maxPrice, 10) : null;
      const bedroomsNum = bedrooms ? parseInt(bedrooms, 10) : null;

      // FIX 3 — SAFE SUPABASE QUERY BUILDER
      let query = supabase
        .from('properties')
        .select(`
          id, title, slug, price, listing_type, status,
          bedrooms, bathrooms, address_line1, town, postcode,
          property_images(url, sort_order),
          agencies(name, logo_url)
        `)
        .eq('status', 'active');

      if (type === 'rent') {
        query = query.eq('listing_type', 'rent');
      } else if (type === 'sale') {
        query = query.eq('listing_type', 'sale');
      }

      if (location) {
        query = query.or(
          `town.ilike.%${location}%,postcode.ilike.%${location}%,address_line1.ilike.%${location}%`
        );
      }

      if (minPriceNum) query = query.gte('price', minPriceNum);
      if (maxPriceNum) query = query.lte('price', maxPriceNum);
      if (bedroomsNum) query = query.gte('bedrooms', bedroomsNum);
      if (propertyType && propertyType !== 'All') query = query.eq('property_type', propertyType);

      const { data, error } = await query
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) {
        console.error('Search query failed:', error);
        setProperties([]);
      } else {
        setProperties(data || []);
      }
      setLoading(false);
    }

    fetchProperties();
  }, [location, type, minPrice, maxPrice, bedrooms, propertyType]);

  return (
    <div className="flex flex-col min-h-screen bg-silk">
      <AdvancedSearchHeader viewMode={viewMode} setViewMode={setViewMode} />
      
      <div className="flex-1 flex overflow-hidden">
        <SearchIntelligencePanel />

        <div className="flex-1 overflow-y-auto px-4 md:px-8 py-8">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-border/20">
              <h1 className="text-display-sm font-display font-bold text-obsidian uppercase tracking-tight">
                {location ? `Results for "${location}"` : "All Properties"}
              </h1>
              <span className="text-[10px] font-bold text-muted uppercase tracking-[0.2em]">
                {loading ? "Searching..." : `${properties.length} Matches`}
              </span>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-32 text-muted">
                <Loader2 className="w-10 h-10 animate-spin mb-4" />
                <p className="text-[10px] font-bold uppercase tracking-widest">Finding the perfect match...</p>
              </div>
            ) : properties.length === 0 ? (
              <div className="max-w-2xl mx-auto py-24 text-center">
                 <div className="w-20 h-20 bg-white border border-border/40 rounded-full flex items-center justify-center mx-auto mb-8">
                   <SearchX className="w-8 h-8 text-emerald" />
                 </div>
                 <h3 className="text-display-xs text-obsidian font-display mb-4">No exact matches found</h3>
                 <p className="text-body-lg text-muted mb-12">
                   We don't have any properties that exactly match your current filters. The market moves fast — set up a smart alert to be notified the moment a match is listed.
                 </p>
                 
                 <div className="bg-white border border-border/40 p-8 shadow-sm">
                    <div className="flex items-center justify-center gap-3 mb-6">
                      <Bell className="w-5 h-5 text-emerald" />
                      <span className="text-[12px] font-bold uppercase tracking-widest text-obsidian">Create Smart Alert</span>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <input 
                        type="email" 
                        placeholder="Enter your email address" 
                        className="flex-1 bg-warm/50 border border-border/40 px-6 py-4 outline-none focus:border-emerald/40 text-body-sm transition-colors"
                      />
                      <button className="bg-obsidian text-silk px-8 py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-forest transition-colors whitespace-nowrap">
                        Notify Me
                      </button>
                    </div>
                 </div>
              </div>
            ) : (
              <div className={cn(
                "gap-8",
                viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3" : "flex flex-col"
              )}>
                {properties.map((prop) => (
                  <PropertyCard key={prop.id} property={prop} variant={viewMode === "grid" ? "vertical" : "horizontal"} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
