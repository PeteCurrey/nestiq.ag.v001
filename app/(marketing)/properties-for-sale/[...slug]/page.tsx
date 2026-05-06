import { SearchFilters } from "@/components/search/SearchFilters";
import { PropertyCard } from "@/components/property/PropertyCard";
import { SearchMap } from "@/components/search/SearchMap";
import { Badge } from "@/components/ui/Badge";
import { MapPin, Info, TrendingUp, Home } from "lucide-react";
import Link from "next/link";

// This is the core Programmatic SEO handler for ~130k combinations
// Supported paths: 
// /properties-for-sale/[county]
// /properties-for-sale/[county]/[town]
// /houses-for-sale-in-[town]
// /flats-to-rent-in-[town]

interface LocationPageProps {
  params: {
    slug: string[];
  };
}

export async function generateMetadata({ params }: LocationPageProps) {
  const slug = params.slug.join(' ');
  // Logic to parse slug into human readable: "Houses for sale in Leeds"
  const title = `Properties for Sale in ${slug.charAt(0).toUpperCase() + slug.slice(1)} | Nestiq`;
  const description = `Browse the latest property listings in ${slug}. Find houses, flats, and bungalows for sale from top local agents.`;
  
  return {
    title,
    description,
    alternates: {
       canonical: `https://nestiq.avorria.com/properties-for-sale/${params.slug.join('/')}`
    }
  };
}

export default function LocationPage({ params }: LocationPageProps) {
  const locationName = params.slug[params.slug.length - 1].replace(/-/g, ' ');
  const capitalizedLocation = locationName.charAt(0).toUpperCase() + locationName.slice(1);

  return (
    <div className="flex flex-col min-h-screen">
      <SearchFilters />
      
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* Results Side */}
        <div className="w-full lg:w-[60%] overflow-y-auto px-4 py-12 bg-pearl">
           <div className="max-w-[800px] mx-auto">
              
              {/* Breadcrumbs */}
              <nav className="flex gap-2 text-[10px] font-bold uppercase tracking-widest text-muted mb-8">
                 <Link href="/">Home</Link> <span>/</span> 
                 <Link href="/search">Search</Link> <span>/</span> 
                 <span className="text-forest">{capitalizedLocation}</span>
              </nav>

              {/* SEO Content Header */}
              <div className="mb-12">
                 <h1 className="text-display-md font-display font-extrabold text-obsidian mb-4">
                    Properties for Sale in <span className="text-forest">{capitalizedLocation}</span>
                 </h1>
                 <p className="text-body-lg text-muted leading-relaxed">
                    Explore 1,240+ homes currently on the market in {capitalizedLocation}. 
                    From luxury city centre apartments to spacious family homes in the suburbs, 
                    Nestiq brings you the most comprehensive property data in Yorkshire.
                 </p>
              </div>

              {/* Market Quick Stats */}
              <div className="grid grid-cols-3 gap-6 mb-12">
                 <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
                    <p className="text-[10px] font-bold text-muted uppercase tracking-widest mb-1">Avg. House Price</p>
                    <p className="text-body-lg font-display font-bold text-obsidian">£245,000</p>
                    <div className="flex items-center gap-1 text-emerald text-[10px] font-bold mt-1">
                       <TrendingUp className="w-3 h-3" /> +4.2%
                    </div>
                 </div>
                 <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
                    <p className="text-[10px] font-bold text-muted uppercase tracking-widest mb-1">Total Listings</p>
                    <p className="text-body-lg font-display font-bold text-obsidian">1,240</p>
                    <p className="text-[10px] text-muted font-bold mt-1 uppercase">Active today</p>
                 </div>
                 <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
                    <p className="text-[10px] font-bold text-muted uppercase tracking-widest mb-1">Demand Score</p>
                    <p className="text-body-lg font-display font-bold text-forest">High</p>
                    <p className="text-[10px] text-muted font-bold mt-1 uppercase">Top 10% in UK</p>
                 </div>
              </div>

              {/* Results Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                 {/* This would be dynamically fetched via Algolia/Supabase based on location */}
                 <PropertyCard property={mockProp1 as any} />
                 <PropertyCard property={mockProp2 as any} />
              </div>

              {/* Internal Linking / SEO Footer */}
              <div className="bg-warm p-10 rounded-3xl border border-border">
                 <h3 className="text-body-lg font-display font-bold text-obsidian mb-6">Nearby Locations</h3>
                 <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {['Headingley', 'Chapel Allerton', 'Roundhay', 'Horsforth', 'Otley', 'Wetherby'].map(loc => (
                       <Link 
                         key={loc} 
                         href={`/properties-for-sale/${loc.toLowerCase()}`}
                         className="text-body-sm text-muted hover:text-forest font-medium transition-colors"
                       >
                          Properties in {loc}
                       </Link>
                    ))}
                 </div>
              </div>
           </div>
        </div>

        {/* Map Side */}
        <div className="hidden lg:block lg:w-[40%] h-[calc(100vh-130px)] sticky top-[130px]">
           <SearchMap properties={[]} />
        </div>

      </div>
    </div>
  );
}

const mockProp1 = { id: "1", slug: "test-1", title: "Modern Apartment", price: 250000, address: "Leeds LS1", bedrooms: 2, bathrooms: 1, sqft: 850, imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800", status: "for-sale" };
const mockProp2 = { id: "2", slug: "test-2", title: "Family House", price: 450000, address: "Leeds LS6", bedrooms: 3, bathrooms: 2, sqft: 1400, imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800", status: "for-sale" };
