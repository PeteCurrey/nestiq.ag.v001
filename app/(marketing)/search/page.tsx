import { SearchFilters } from "@/components/search/SearchFilters";
import { PropertyCard } from "@/components/property/PropertyCard";
import { SearchMap } from "@/components/search/SearchMap";

const mockProperties = [
  {
    id: "1",
    slug: "ash-manor",
    title: "The Ash Manor",
    price: 1450000,
    address: "Chelsea, London • SW3",
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2200,
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
    status: "for-sale" as const,
    lat: 51.4875,
    lng: -0.1687,
    agencyName: "Savills Chelsea"
  },
  {
    id: "2",
    slug: "vanguard-penthouse",
    title: "Vanguard Penthouse",
    price: 3250,
    address: "Manchester City Centre • M1",
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1100,
    imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800&auto=format&fit=crop",
    status: "to-rent" as const,
    lat: 53.4808,
    lng: -2.2426,
    agencyName: "Knight Frank"
  },
  {
    id: "3",
    slug: "old-rectory",
    title: "The Old Rectory",
    price: 875000,
    address: "Guildford, Surrey • GU1",
    bedrooms: 5,
    bathrooms: 3,
    sqft: 2800,
    imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop",
    status: "for-sale" as const,
    lat: 51.2362,
    lng: -0.5704,
    agencyName: "Hamptons"
  }
];

export default function SearchPage() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <SearchFilters />
      
      <div className="flex-1 flex overflow-hidden">
        {/* Results List */}
        <div className="w-full lg:w-[60%] overflow-y-auto px-4 py-8 bg-pearl">
           <div className="max-w-[800px] mx-auto">
              <div className="flex items-center justify-between mb-8">
                 <h1 className="text-display-sm font-display font-bold text-obsidian">
                    Properties for Sale in the UK
                 </h1>
                 <span className="text-body-sm font-bold text-muted uppercase tracking-wider">
                    {mockProperties.length} Results
                 </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {mockProperties.map((prop) => (
                    <PropertyCard 
                      key={prop.id} 
                      property={prop} 
                    />
                 ))}
              </div>
           </div>
        </div>

        {/* Map Panel */}
        <div className="hidden lg:block lg:w-[40%] h-full relative border-l border-border">
           <SearchMap properties={mockProperties} />
        </div>
      </div>
    </div>
  );
}
