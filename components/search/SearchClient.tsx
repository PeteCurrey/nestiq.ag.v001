"use client";

import { useState } from "react";
import { algoliasearch } from "algoliasearch";
import { InstantSearch, Hits, useInstantSearch } from "react-instantsearch";
import { PropertyCard } from "@/components/property/PropertyCard";
import { AdvancedSearchHeader } from "./AdvancedSearchHeader";
import { SearchIntelligencePanel } from "./SearchIntelligencePanel";
import { Bell, SearchX } from "lucide-react";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils/cn";

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_KEY!
);

const SearchMap = dynamic(
  () => import("@/components/search/SearchMap").then((m) => m.SearchMap),
  { ssr: false }
);

function HitGrid({ hit }: { hit: any }) {
  return <PropertyCard property={hit} variant="vertical" />;
}

function HitList({ hit }: { hit: any }) {
  return <PropertyCard property={hit} variant="horizontal" />;
}

function EmptyState() {
  return (
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
  );
}

function SearchResults({ query, viewMode }: { query?: string, viewMode: "list" | "grid" | "map" }) {
  const { results, status } = useInstantSearch();
  const nbHits = results?.nbHits || 0;

  if (viewMode === "map") {
    return (
      <div className="flex-1 w-full h-[calc(100vh-160px)] relative">
        <SearchMap properties={results?.hits as any || []} />
      </div>
    );
  }

  return (
    <div className="flex-1 flex overflow-hidden bg-pearl/30">
      
      {/* Left Intelligence Panel */}
      <SearchIntelligencePanel />

      {/* Main Results Area */}
      <div className="flex-1 overflow-y-auto px-4 md:px-8 py-8">
        <div className="max-w-[1200px] mx-auto">
          
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-border/20">
            <h1 className="text-display-sm font-display font-bold text-obsidian uppercase tracking-tight">
              {query ? `Results for "${query}"` : "Properties Found"}
            </h1>
            <span className="text-[10px] font-bold text-muted uppercase tracking-[0.2em]">
              {nbHits} Matches
            </span>
          </div>

          {status === 'idle' && nbHits === 0 ? (
             <EmptyState />
          ) : (
            <Hits 
              hitComponent={viewMode === "grid" ? HitGrid : HitList} 
              classNames={{
                list: cn(
                  "gap-8",
                  viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3" : "flex flex-col"
                ),
                item: "h-full"
              }}
            />
          )}
          
        </div>
      </div>
    </div>
  );
}

export function SearchClient({ initialQuery }: { initialQuery?: string }) {
  const [viewMode, setViewMode] = useState<"list" | "grid" | "map">("list");

  return (
    <InstantSearch 
      searchClient={searchClient} 
      indexName="nestiq_properties"
      initialUiState={{
        nestiq_properties: {
          query: initialQuery
        }
      }}
      future={{ preserveSharedStateOnUnmount: true }}
    >
      <div className="flex flex-col min-h-screen">
        <AdvancedSearchHeader viewMode={viewMode} setViewMode={setViewMode} />
        <SearchResults query={initialQuery} viewMode={viewMode} />
      </div>
    </InstantSearch>
  );
}
