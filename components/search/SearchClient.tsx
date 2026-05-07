"use client";

import { algoliasearch } from "algoliasearch";
import { InstantSearch, Hits, useInstantSearch } from "react-instantsearch";
import { PropertyCard } from "@/components/property/PropertyCard";
import { SearchFilters } from "./SearchFilters";
import dynamic from "next/dynamic";

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_KEY!
);

const SearchMap = dynamic(
  () => import("@/components/search/SearchMap").then((m) => m.SearchMap),
  { ssr: false }
);

function Hit({ hit }: { hit: any }) {
  return <PropertyCard property={hit} />;
}

function SearchResults({ query }: { query?: string }) {
  const { results, status } = useInstantSearch();
  const nbHits = results?.nbHits || 0;

  return (
    <div className="flex-1 flex overflow-hidden">
      {/* Results List */}
      <div className="w-full lg:w-[60%] overflow-y-auto px-4 py-8 bg-silk">
        <div className="max-w-[800px] mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-display-sm font-display font-bold text-obsidian uppercase tracking-tight">
              {query ? `Results for "${query}"` : "Properties for Sale"}
            </h1>
            <span className="text-[10px] font-bold text-muted uppercase tracking-[0.2em]">
              {nbHits} Properties Available
            </span>
          </div>

          <Hits 
            hitComponent={Hit} 
            classNames={{
              list: "grid grid-cols-1 md:grid-cols-2 gap-8",
              item: "h-full"
            }}
          />
          
          {status === 'idle' && nbHits === 0 && (
            <div className="py-20 text-center">
              <p className="text-body-lg text-muted">No properties found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>

      {/* Map Panel */}
      <div className="hidden lg:block lg:w-[40%] h-full relative border-l border-border/40">
        <SearchMap properties={results?.hits as any || []} />
      </div>
    </div>
  );
}

export function SearchClient({ initialQuery }: { initialQuery?: string }) {
  return (
    <InstantSearch 
      searchClient={searchClient} 
      indexName="nestiq_properties"
      future={{ preserveSharedStateOnUnmount: true }}
    >
      <div className="flex flex-col h-screen overflow-hidden">
        <SearchFilters />
        <SearchResults query={initialQuery} />
      </div>
    </InstantSearch>
  );
}
