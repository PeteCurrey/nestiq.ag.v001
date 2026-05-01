"use client";

import { useState } from "react";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export function SearchFilters() {
  const [activeType, setActiveType] = useState<"buy" | "rent">("buy");

  const filterGroups = [
    { label: "Price Range", options: ["Any", "£100k - £250k", "£250k - £500k", "£500k+"] },
    { label: "Property Type", options: ["Any", "Houses", "Flats", "Bungalows", "Commercial"] },
    { label: "Bedrooms", options: ["Any", "1+", "2+", "3+", "4+"] },
  ];

  return (
    <div className="bg-white border-b border-border sticky top-[72px] z-30 shadow-sm">
      <div className="max-w-[1440px] mx-auto px-4 h-16 flex items-center justify-between">
        
        <div className="flex items-center gap-6 overflow-x-auto no-scrollbar py-2">
           {/* Listing Type Toggle */}
           <div className="flex bg-warm rounded-md p-1 flex-shrink-0">
             {(["buy", "rent"] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setActiveType(type)}
                  className={cn(
                    "px-4 py-1.5 rounded text-body-sm font-bold uppercase tracking-wider transition-all",
                    activeType === type ? "bg-white text-forest shadow-sm" : "text-muted"
                  )}
                >
                  {type}
                </button>
             ))}
           </div>

           <div className="h-6 w-px bg-border hidden md:block" />

           {filterGroups.map((group) => (
             <div key={group.label} className="relative group flex-shrink-0">
                <button className="flex items-center gap-2 text-body-sm font-bold text-obsidian uppercase tracking-widest hover:text-forest transition-colors">
                   {group.label}
                   <ChevronDown className="w-4 h-4 text-subtle" />
                </button>
             </div>
           ))}
        </div>

        <button className="flex items-center gap-2 px-4 py-2 bg-warm rounded-md text-body-sm font-bold text-obsidian uppercase tracking-widest hover:bg-border transition-colors">
           <SlidersHorizontal className="w-4 h-4" />
           <span className="hidden md:inline">Advanced Filters</span>
        </button>

      </div>
    </div>
  );
}
