import { SearchFilters } from "@/components/search/SearchFilters";
import { PropertyCard } from "@/components/property/PropertyCard";
import { SearchMap } from "@/components/search/SearchMap";
import { allProperties } from "@/lib/data/properties";

export default function SearchPage() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <SearchFilters />
      
      <div className="flex-1 flex overflow-hidden">
        {/* Results List */}
        <div className="w-full lg:w-[60%] overflow-y-auto px-4 py-8 bg-silk">
           <div className="max-w-[800px] mx-auto">
              <div className="flex items-center justify-between mb-8">
                 <h1 className="text-display-sm font-display font-bold text-obsidian uppercase tracking-tight">
                    Premium Properties for Sale
                 </h1>
                 <span className="text-[10px] font-bold text-muted uppercase tracking-[0.2em]">
                    {allProperties.length} Institutional Assets
                 </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 {allProperties.map((prop) => (
                    <PropertyCard 
                      key={prop.id} 
                      property={prop as any} 
                    />
                 ))}
              </div>
           </div>
        </div>

        {/* Map Panel */}
        <div className="hidden lg:block lg:w-[40%] h-full relative border-l border-border/40">
           <SearchMap properties={allProperties} />
        </div>
      </div>
    </div>
  );
}

