"use client";

import { useMenu, useRefinementList, useSearchBox } from "react-instantsearch";
import { ChevronDown, SlidersHorizontal, Search } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { useState } from "react";

export function SearchFilters() {
  const { query, refine: refineQuery } = useSearchBox();
  const { items: listingTypes, refine: refineListingType } = useMenu({ attribute: 'listing_type' });
  const [activeType, setActiveType] = useState<string>(listingTypes.find(i => i.isRefined)?.value || "sale");

  const handleTypeChange = (type: string) => {
    setActiveType(type);
    refineListingType(type);
  };

  return (
    <div className="bg-white border-b border-border sticky top-[72px] z-30 shadow-sm">
      <div className="max-w-[1440px] mx-auto px-4 h-16 flex items-center justify-between gap-6">
        
        <div className="flex items-center gap-6 flex-1 overflow-hidden">
           {/* Search Box */}
           <div className="relative flex-1 max-w-md hidden md:block">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
             <input 
               type="text"
               value={query}
               onChange={(e) => refineQuery(e.target.value)}
               placeholder="Search area, postcode or agent..."
               className="w-full pl-10 pr-4 py-2 bg-warm rounded-md text-body-sm font-bold uppercase tracking-widest outline-none focus:ring-1 focus:ring-gold/30 transition-all"
             />
           </div>

           <div className="h-6 w-px bg-border hidden md:block" />

           {/* Listing Type Toggle */}
           <div className="flex bg-warm rounded-md p-1 flex-shrink-0">
             {["sale", "rent"].map((type) => (
                <button
                  key={type}
                  onClick={() => handleTypeChange(type)}
                  className={cn(
                    "px-4 py-1.5 rounded text-[10px] font-bold uppercase tracking-wider transition-all",
                    activeType === type ? "bg-white text-forest shadow-sm" : "text-muted"
                  )}
                >
                  {type === 'sale' ? 'Buy' : 'Rent'}
                </button>
             ))}
           </div>

           <div className="h-6 w-px bg-border hidden md:block" />

           {/* Dropdowns (Placeholder for now, can be connected to useRefinementList) */}
           <div className="hidden lg:flex items-center gap-8">
             {["Price", "Property Type", "Bedrooms"].map((label) => (
                <button key={label} className="flex items-center gap-2 text-[10px] font-bold text-obsidian uppercase tracking-widest hover:text-gold transition-colors">
                  {label}
                  <ChevronDown className="w-3 h-3 text-subtle" />
                </button>
             ))}
           </div>
        </div>

        <button className="flex items-center gap-2 px-4 py-2 bg-warm rounded-md text-[10px] font-bold text-obsidian uppercase tracking-widest hover:bg-border transition-colors">
           <SlidersHorizontal className="w-4 h-4" />
           <span className="hidden lg:inline">Filters</span>
        </button>

      </div>
    </div>
  );
}
