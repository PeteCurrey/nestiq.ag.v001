import { createClient } from "@/lib/supabase/server";
import { SearchFilters } from "@/components/search/SearchFilters";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";

export default async function LocationsIndexPage() {
  const supabase = await createClient();
  const { data: locations } = await supabase
    .from('location_pages')
    .select('slug, h1, town, county')
    .order('town');

  // Group by county
  const grouped = (locations || []).reduce((acc: any, loc) => {
    const county = loc.county || 'Other';
    if (!acc[county]) acc[county] = [];
    acc[county].push(loc);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-silk">
      <SearchFilters />
      
      <main className="max-w-[1400px] mx-auto px-6 md:px-12 py-32">
        <div className="mb-24">
          <span className="text-[10px] font-bold text-gold uppercase tracking-[0.4em] mb-6 block">Regional Coverage</span>
          <h1 className="text-display-md font-display leading-tight mb-8">
            Property by <br />
            <span className="italic font-normal">Location.</span>
          </h1>
          <p className="text-body-xl text-muted max-w-2xl leading-relaxed">
            Browse our comprehensive property directories. We are rapidly expanding our partner network across the UK to bring you direct agent data in every town.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {Object.entries(grouped).map(([county, locs]: [any, any]) => (
            <div key={county} className="space-y-8">
              <h2 className="text-display-xs font-display border-b border-border/40 pb-4 flex items-center justify-between">
                {county}
                <span className="text-[10px] font-bold text-muted uppercase tracking-widest">{locs.length} Areas</span>
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {locs.map((loc: any) => (
                  <Link 
                    key={loc.slug} 
                    href={`/properties-for-sale/${loc.slug}`}
                    className="group flex items-center justify-between p-4 bg-white border border-border/40 hover:border-gold/30 hover:shadow-lg transition-all duration-500"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-silk flex items-center justify-center group-hover:bg-gold group-hover:text-white transition-colors">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <span className="text-body-sm font-bold text-obsidian group-hover:text-gold transition-colors">{loc.town || loc.h1}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted group-hover:text-gold group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Rapid Expansion CTA */}
        <div className="mt-32 p-16 bg-obsidian text-silk text-center relative overflow-hidden">
           <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 blur-[100px] rounded-full -mr-48 -mt-48" />
           <div className="relative z-10">
             <h3 className="text-display-sm font-display mb-8">Agent in an unlisted area?</h3>
             <p className="text-body-lg text-silk/60 mb-12 max-w-2xl mx-auto">
               We are launching in new towns every week. Partner with Nestiq to secure your territory and start receiving premium leads.
             </p>
             <Link href="/agents">
               <Button variant="primary" className="bg-gold text-obsidian px-12 h-16">Partner With Us</Button>
             </Link>
           </div>
        </div>
      </main>
    </div>
  );
}
