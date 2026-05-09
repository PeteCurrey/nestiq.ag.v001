"use client";

import { useState } from "react";
import { Search, MapPin, Sparkles, SlidersHorizontal, ChevronDown, List, Grid, Map as MapIcon, Bell } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button";
import { useRouter, useSearchParams } from "next/navigation";

interface AdvancedSearchHeaderProps {
  viewMode: "list" | "grid" | "map";
  setViewMode: (mode: "list" | "grid" | "map") => void;
}

export function AdvancedSearchHeader({ viewMode, setViewMode }: AdvancedSearchHeaderProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [nlQuery, setNlQuery] = useState(searchParams.get('location') || "");
  const [type, setType] = useState(searchParams.get('type') || "sale");
  const [showFilters, setShowFilters] = useState(false);

  const handleNlSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (nlQuery) params.set('location', nlQuery);
    else params.delete('location');
    router.push(`/search?${params.toString()}`);
  };

  const handleTypeChange = (newType: string) => {
    setType(newType);
    const params = new URLSearchParams(searchParams.toString());
    params.set('type', newType);
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="bg-white border-b border-border/40 sticky top-[72px] z-30 shadow-sm">
      <div className="max-w-[1800px] mx-auto">
        
        {/* Top: Natural Language Command Bar */}
        <div className="p-4 md:p-6 border-b border-border/20">
          <form onSubmit={handleNlSearch} className="relative max-w-4xl mx-auto flex items-center shadow-lg rounded-none border border-border/30 overflow-hidden group">
            <div className="bg-emerald px-4 py-4 md:py-5 flex items-center justify-center">
               <Sparkles className="w-5 h-5 text-obsidian" />
            </div>
            <input 
              type="text"
              value={nlQuery}
              onChange={(e) => setNlQuery(e.target.value)}
              placeholder="e.g. '3 bed detached under £350k near Chesterfield with garden'"
              className="flex-1 px-6 py-4 md:py-5 bg-white text-body-md md:text-body-lg text-obsidian placeholder:text-muted/40 font-medium outline-none focus:bg-warm/10 transition-colors"
            />
            <button type="submit" className="px-6 md:px-8 py-4 md:py-5 bg-obsidian text-silk font-bold uppercase tracking-widest text-[10px] hover:bg-forest transition-colors">
              Search
            </button>
          </form>
        </div>

        {/* Bottom: Filter Strip & View Toggles */}
        <div className="px-6 py-4 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
           
           <div className="flex flex-wrap items-center gap-3 md:gap-6 w-full lg:w-auto">
             {/* Quick Filters */}
             <select 
               value={type}
               onChange={(e) => handleTypeChange(e.target.value)}
               className="bg-warm/50 border border-border/30 px-4 py-2.5 text-[10px] font-bold text-obsidian uppercase tracking-widest outline-none appearance-none pr-8 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwb2x5bGluZSBwb2ludHM9IjYgOSAxMiAxNSAxOCA5Ij48L3BvbHlsaW5lPjwvc3ZnPg==')] bg-[length:14px] bg-[position:right_10px_center] bg-no-repeat cursor-pointer hover:border-emerald/40 transition-colors"
             >
               <option value="sale">For Sale</option>
               <option value="rent">To Rent</option>
               <option value="commercial">Commercial</option>
               <option value="new">New Homes</option>
             </select>

             <select className="bg-warm/50 border border-border/30 px-4 py-2.5 text-[10px] font-bold text-obsidian uppercase tracking-widest outline-none appearance-none pr-8 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwb2x5bGluZSBwb2ludHM9IjYgOSAxMiAxNSAxOCA5Ij48L3BvbHlsaW5lPjwvc3ZnPg==')] bg-[length:14px] bg-[position:right_10px_center] bg-no-repeat cursor-pointer hover:border-emerald/40 transition-colors hidden md:block">
               <option value="">Any Price</option>
               <option value="up-to-250k">Up to £250,000</option>
               <option value="up-to-500k">Up to £500,000</option>
               <option value="up-to-1m">Up to £1,000,000</option>
             </select>

             <select className="bg-warm/50 border border-border/30 px-4 py-2.5 text-[10px] font-bold text-obsidian uppercase tracking-widest outline-none appearance-none pr-8 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwb2x5bGluZSBwb2ludHM9IjYgOSAxMiAxNSAxOCA5Ij48L3BvbHlsaW5lPjwvc3ZnPg==')] bg-[length:14px] bg-[position:right_10px_center] bg-no-repeat cursor-pointer hover:border-emerald/40 transition-colors hidden md:block">
               <option value="">Any Beds</option>
               <option value="1+">1+ Beds</option>
               <option value="2+">2+ Beds</option>
               <option value="3+">3+ Beds</option>
               <option value="4+">4+ Beds</option>
             </select>

             <button 
               onClick={() => setShowFilters(!showFilters)}
               className={cn(
                 "flex items-center gap-2 px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest border transition-colors ml-auto md:ml-0",
                 showFilters ? "bg-obsidian text-silk border-obsidian" : "bg-white text-obsidian border-border/40 hover:bg-warm/50"
               )}
             >
               <SlidersHorizontal className="w-3.5 h-3.5" />
               Filters
             </button>
             
             <button className="hidden xl:flex items-center gap-2 px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest border border-emerald/20 bg-emerald/5 text-emerald hover:bg-emerald hover:text-white transition-colors">
               <Bell className="w-3.5 h-3.5" />
               Create Alert
             </button>
           </div>

           {/* View Toggles */}
           <div className="flex bg-warm/50 border border-border/30 p-1 w-full lg:w-auto overflow-x-auto">
             <button 
               onClick={() => setViewMode("list")}
               className={cn(
                 "flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-2 text-[10px] font-bold uppercase tracking-widest transition-all",
                 viewMode === "list" ? "bg-white text-obsidian shadow-sm border border-border/20" : "text-muted hover:text-obsidian"
               )}
             >
               <List className="w-3.5 h-3.5" /> List
             </button>
             <button 
               onClick={() => setViewMode("grid")}
               className={cn(
                 "flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-2 text-[10px] font-bold uppercase tracking-widest transition-all",
                 viewMode === "grid" ? "bg-white text-obsidian shadow-sm border border-border/20" : "text-muted hover:text-obsidian"
               )}
             >
               <Grid className="w-3.5 h-3.5" /> Grid
             </button>
             <button 
               onClick={() => setViewMode("map")}
               className={cn(
                 "flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-2 text-[10px] font-bold uppercase tracking-widest transition-all",
                 viewMode === "map" ? "bg-white text-obsidian shadow-sm border border-border/20" : "text-muted hover:text-obsidian"
               )}
             >
               <MapIcon className="w-3.5 h-3.5" /> Map
             </button>
           </div>
        </div>
        
        {/* Expanded Filters Drawer (Placeholder for UI demonstration) */}
        {showFilters && (
          <div className="bg-white border-t border-border/20 p-6 md:p-8 animate-in slide-in-from-top-2 duration-300">
             <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                <div className="space-y-4">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-obsidian">Property Style</h4>
                  <div className="space-y-2">
                    {["Detached", "Semi-Detached", "Terraced", "Flat / Apartment", "Bungalow", "Land"].map(t => (
                      <label key={t} className="flex items-center gap-3 cursor-pointer group">
                        <div className="w-4 h-4 border border-border/60 group-hover:border-emerald transition-colors" />
                        <span className="text-body-sm text-muted group-hover:text-obsidian transition-colors">{t}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-obsidian">Key Features</h4>
                  <div className="space-y-2">
                    {["Garden", "Garage", "Driveway / Parking", "EV Charging", "Chain Free", "New Build"].map(t => (
                      <label key={t} className="flex items-center gap-3 cursor-pointer group">
                        <div className="w-4 h-4 border border-border/60 group-hover:border-emerald transition-colors" />
                        <span className="text-body-sm text-muted group-hover:text-obsidian transition-colors">{t}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-obsidian">Energy & Efficiency</h4>
                  <div className="space-y-2">
                    {["EPC A Rating", "EPC B Rating", "EPC C Rating or above"].map(t => (
                      <label key={t} className="flex items-center gap-3 cursor-pointer group">
                        <div className="w-4 h-4 border border-border/60 group-hover:border-emerald transition-colors" />
                        <span className="text-body-sm text-muted group-hover:text-obsidian transition-colors">{t}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-obsidian">Tenure & Status</h4>
                  <div className="space-y-2">
                    {["Freehold", "Leasehold", "Share of Freehold", "Recently Reduced", "Added past 7 days"].map(t => (
                      <label key={t} className="flex items-center gap-3 cursor-pointer group">
                        <div className="w-4 h-4 border border-border/60 group-hover:border-emerald transition-colors" />
                        <span className="text-body-sm text-muted group-hover:text-obsidian transition-colors">{t}</span>
                      </label>
                    ))}
                  </div>
                </div>
             </div>
             <div className="max-w-6xl mx-auto flex justify-end gap-4 mt-8 pt-8 border-t border-border/20">
                <Button variant="outline" onClick={() => setShowFilters(false)} className="border-border/40 text-muted hover:text-obsidian">
                  Clear All
                </Button>
                <Button variant="primary" onClick={() => setShowFilters(false)} className="bg-obsidian text-silk px-8">
                  Apply Filters
                </Button>
             </div>
          </div>
        )}

      </div>
    </div>
  );
}
