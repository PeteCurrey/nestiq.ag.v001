"use client";

import React from "react";
import { useParams } from "next/navigation";
import { allProperties } from "@/lib/data/properties";
import { PropertyCard } from "@/components/property/PropertyCard";
import { SearchFilters } from "@/components/search/SearchFilters";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { ArrowRight, MapPin, Info } from "lucide-react";

export default function LocationPage() {
  const params = useParams();
  const slug = params.slug as string[];
  
  // Format slug for title (e.g., ["for-sale", "chesterfield"] -> "Properties for Sale in Chesterfield")
  const isForSale = slug.includes("for-sale");
  const isToRent = slug.includes("to-rent");
  const location = slug[slug.length - 1].charAt(0).toUpperCase() + slug[slug.length - 1].slice(1);
  
  const title = `${isToRent ? "Property to Rent" : "Properties for Sale"} in ${location}`;
  
  // Filter properties (simple match for demo)
  const filteredProperties = allProperties.filter(p => 
    p.address.toLowerCase().includes(location.toLowerCase())
  );

  return (
    <div className="bg-silk min-h-screen">
      <SearchFilters />
      
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-12">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: isToRent ? "To Rent" : "For Sale", href: isToRent ? "/to-rent" : "/for-sale" },
          { label: location, href: `#` }
        ]} />

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Main Results */}
          <div className="lg:col-span-2 space-y-12">
            <div className="space-y-4">
              <h1 className="text-display-md font-display font-bold text-obsidian tracking-tight">
                {title}
              </h1>
              <p className="text-body-md text-muted leading-relaxed max-w-2xl">
                Discover a wide range of properties in {location}. From modern city apartments to spacious family homes, find your next move with Nestiq. {location} offers excellent transport links, highly-rated schools, and a vibrant local community.
              </p>
            </div>

            <div className="flex items-center justify-between border-b border-border/20 pb-6">
              <span className="text-[10px] font-bold text-muted uppercase tracking-widest">
                {filteredProperties.length} results found
              </span>
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-bold text-muted uppercase tracking-widest">Sort by:</span>
                <select className="text-[10px] font-bold uppercase tracking-widest bg-transparent border-none focus:outline-none">
                   <option>Newest Listed</option>
                   <option>Price (Low to High)</option>
                   <option>Price (High to Low)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredProperties.length > 0 ? (
                filteredProperties.map(prop => (
                  <PropertyCard key={prop.slug} property={prop as any} />
                ))
              ) : (
                <div className="col-span-2 py-24 text-center bg-white border border-dashed border-border/40">
                  <MapPin className="w-8 h-8 text-muted/20 mx-auto mb-4" />
                  <p className="text-sm font-bold text-muted uppercase tracking-widest">No properties found in this area yet</p>
                  <Button variant="link" className="mt-4 text-gold">Expand your search</Button>
                </div>
              )}
            </div>
          </div>

          {/* SEO Sidebar */}
          <aside className="space-y-12">
             <div className="bg-obsidian text-silk p-8 space-y-6">
                <h3 className="text-sm font-bold uppercase tracking-widest italic">Local Insights</h3>
                <div className="space-y-4">
                   <div className="flex items-start gap-3">
                      <Info className="w-4 h-4 text-gold mt-0.5" />
                      <p className="text-[11px] text-silk/60 leading-relaxed">
                        {location} has seen a 4.2% increase in property interest over the last 90 days.
                      </p>
                   </div>
                   <div className="flex items-start gap-3">
                      <Info className="w-4 h-4 text-gold mt-0.5" />
                      <p className="text-[11px] text-silk/60 leading-relaxed">
                        Average 3-bed house price: £285,000.
                      </p>
                   </div>
                </div>
                <Button className="w-full bg-gold text-silk border-none hover:bg-white hover:text-obsidian text-[10px] font-bold uppercase tracking-widest py-6">
                   Get Local Report
                </Button>
             </div>

             <div className="space-y-6">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted">Nearby Areas</h3>
                <div className="grid grid-cols-2 gap-4">
                   {["Matlock", "Dronfield", "Alfreton", "Mansfield", "Sheffield", "Derby"].map(area => (
                     <a key={area} href={`/for-sale/${area.toLowerCase()}`} className="text-[11px] font-bold text-obsidian hover:text-gold transition-colors">
                        {area}
                     </a>
                   ))}
                </div>
             </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
