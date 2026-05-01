import { PropertyCard } from "@/components/property/PropertyCard";
import { Heart, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";

const mockSaved = [
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
    agencyName: "Savills Chelsea"
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
    agencyName: "Hamptons"
  }
];

export default function SavedPropertiesPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
         <div>
            <h1 className="text-display-sm font-display font-black text-obsidian mb-2">Saved Properties</h1>
            <p className="text-body-md text-muted">You have {mockSaved.length} properties saved to your shortlist.</p>
         </div>
      </div>

      {mockSaved.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {mockSaved.map((prop) => (
            <PropertyCard key={prop.id} property={prop} isSaved={true} />
          ))}
        </div>
      ) : (
        <div className="bg-white p-20 rounded-3xl border border-border text-center">
           <div className="w-20 h-20 bg-warm rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-10 h-10 text-subtle" />
           </div>
           <h3 className="text-body-lg font-bold text-obsidian mb-2">No saved properties yet</h3>
           <p className="text-body-md text-muted mb-8">Start your search and save your favorites to see them here.</p>
           <Button variant="primary" href="/search">
              <Search className="w-4 h-4 mr-2" /> Start Searching
           </Button>
        </div>
      )}
    </div>
  );
}
