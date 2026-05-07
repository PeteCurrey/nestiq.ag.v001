import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { SearchFilters } from "@/components/search/SearchFilters";
import { PropertyCard } from "@/components/property/PropertyCard";
import { Badge } from "@/components/ui/Badge";
import { MapPin, Info, TrendingUp, Home, Building2 } from "lucide-react";
import Link from "next/link";

interface LocationPageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const currentSlug = slug.join('/');
  const supabase = await createClient();
  
  const { data: page } = await supabase
    .from('location_pages')
    .select('*')
    .eq('slug', currentSlug)
    .single();

  if (!page) return { title: 'Properties for Sale | Nestiq' };

  return {
    title: page.meta_title || `${page.h1} | Nestiq`,
    description: page.meta_description,
  };
}

export default async function LocationPage({ params }: LocationPageProps) {
  const { slug } = await params;
  const currentSlug = slug.join('/');
  const supabase = await createClient();

  const { data: page } = await supabase
    .from('location_pages')
    .select('*')
    .eq('slug', currentSlug)
    .single();

  if (!page) {
    notFound();
  }

  // Fetch properties for this location (simplified logic for now)
  const town = page.town || page.h1.split(' ').pop();
  const { data: properties } = await supabase
    .from('properties')
    .select('*, property_images(*), agencies(*)')
    .ilike('town', `%${town}%`)
    .limit(10);

  return (
    <div className="flex flex-col min-h-screen bg-silk">
      <SearchFilters />
      
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* Results Side */}
        <div className="w-full lg:w-[60%] overflow-y-auto px-4 py-16 bg-pearl">
           <div className="max-w-[850px] mx-auto">
              
              {/* Breadcrumbs */}
              <nav className="flex gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-muted mb-12">
                 <Link href="/" className="hover:text-gold transition-colors">Home</Link> 
                 <span className="opacity-30">/</span> 
                 <Link href="/search" className="hover:text-gold transition-colors">Search</Link> 
                 <span className="opacity-30">/</span> 
                 <span className="text-forest">{page.h1}</span>
              </nav>

              {/* SEO Content Header */}
              <div className="mb-20">
                 <h1 className="text-display-md font-display font-extrabold text-obsidian mb-8 leading-[1.1]">
                    {page.h1}
                 </h1>
                 <div className="prose prose-lg prose-forest max-w-none text-muted leading-relaxed">
                    <p className="whitespace-pre-line">{page.content || `Discover the finest properties in ${town}. From characterful conversions to modern architectural statements, our curated collection showcases the best of local living.`}</p>
                 </div>
              </div>

              {/* Market Intelligence */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                 <div className="bg-white p-10 border border-border/40 shadow-sm group hover:border-gold/30 transition-all">
                    <p className="text-[10px] font-bold text-muted uppercase tracking-[0.3em] mb-4">Market Velocity</p>
                    <p className="text-display-xs font-display text-obsidian">High</p>
                    <div className="flex items-center gap-1 text-emerald text-[10px] font-bold mt-4">
                       <TrendingUp className="w-3 h-3" /> Demand up 12%
                    </div>
                 </div>
                 <div className="bg-white p-10 border border-border/40 shadow-sm">
                    <p className="text-[10px] font-bold text-muted uppercase tracking-[0.3em] mb-4">Total Listings</p>
                    <p className="text-display-xs font-display text-obsidian">{properties?.length || 0}</p>
                    <p className="text-[10px] text-muted font-bold mt-4 uppercase tracking-widest">Active today</p>
                 </div>
                 <div className="bg-obsidian p-10 text-silk shadow-xl">
                    <p className="text-[10px] font-bold text-silk/40 uppercase tracking-[0.3em] mb-4">Nestiq Score</p>
                    <p className="text-display-xs font-display text-gold">9.4/10</p>
                    <p className="text-[10px] text-silk/40 font-bold mt-4 uppercase tracking-widest">Investment Grade</p>
                 </div>
              </div>

              {/* Results Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
                 {properties && properties.length > 0 ? (
                   properties.map(prop => (
                     <PropertyCard key={prop.id} property={prop as any} />
                   ))
                 ) : (
                   <div className="col-span-full py-20 text-center bg-warm border border-dashed border-border/60">
                      <p className="text-[10px] font-bold text-muted uppercase tracking-[0.4em]">No listings match this specific catch-all route yet</p>
                   </div>
                 )}
              </div>

              {/* Internal Linking */}
              <div className="bg-white p-12 border border-border/40">
                 <h3 className="text-body-lg font-display font-bold text-obsidian mb-10 uppercase tracking-wider">Explore Nearby</h3>
                 <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-12">
                    {['Chesterfield', 'Matlock', 'Sheffield', 'Dronfield', 'Derbyshire', 'Peak District'].map(loc => (
                       <Link 
                         key={loc} 
                         href={`/properties-for-sale/${loc.toLowerCase().replace(/ /g, '-')}`}
                         className="text-[11px] font-bold text-muted hover:text-gold uppercase tracking-[0.2em] transition-colors"
                       >
                          {loc}
                       </Link>
                    ))}
                 </div>
              </div>
           </div>
        </div>

        {/* Map View */}
        <div className="hidden lg:block lg:w-[40%] h-[calc(100vh-130px)] sticky top-[130px] border-l border-border/20">
           <div className="w-full h-full bg-silk flex items-center justify-center">
              <p className="text-[10px] font-bold text-muted uppercase tracking-widest">Map view localized to {town}</p>
           </div>
        </div>

      </div>
    </div>
  );
}
