import { Search, MapPin, Star, Building2, ChevronRight, ArrowLeft, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function AgentDirectoryPage() {
  const supabase = await createClient();
  
  const { data: agencies, error } = await supabase
    .from('agencies')
    .select('id, name, slug, city, county, description, avg_rating, review_count, logo_url, verified, listing_count')
    .eq('verified', true)
    .order('listing_count', { ascending: false });

  if (error) {
    console.error('Error fetching agencies:', error);
  }

  return (
    <div className="bg-silk min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <Link href="/agents" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted hover:text-obsidian transition-all">
          <ArrowLeft className="w-3 h-3" /> Back to Agent Benefits
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-6 text-center mb-16">
        <h1 className="text-display-lg font-display text-obsidian mb-6">Partner <span className="italic font-normal">Directory</span></h1>
        <p className="text-body-xl text-muted max-w-2xl mx-auto">
          Find and connect with verified independent agents in your area.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-6 mb-16">
         <div className="bg-white p-2 rounded-none shadow-2xl border border-border/40 flex flex-col md:flex-row gap-2">
            <div className="flex-1 relative">
               <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-emerald w-4 h-4" />
               <input 
                 type="text" 
                 placeholder="Agency name..." 
                 className="w-full h-16 pl-14 pr-6 bg-silk/50 border-none text-obsidian font-bold focus:ring-1 focus:ring-emerald outline-none"
               />
            </div>
            <div className="flex-1 relative">
               <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-emerald w-4 h-4" />
               <input 
                 type="text" 
                 placeholder="Location..." 
                 className="w-full h-16 pl-14 pr-6 bg-silk/50 border-none text-obsidian font-bold focus:ring-1 focus:ring-emerald outline-none"
               />
            </div>
            <Button variant="primary" className="h-16 px-12 bg-emerald hover:bg-forest">Search</Button>
         </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 space-y-6">
        {agencies && agencies.length > 0 ? (
          agencies.map((agent) => (
            <Link 
              key={agent.id} 
              href={`/agents/${agent.slug}`}
              className="group bg-white p-10 border border-border/40 hover:border-emerald/30 transition-all duration-500 flex flex-col md:flex-row items-center gap-10"
            >
              <div className="w-20 h-20 bg-silk flex items-center justify-center p-4 border border-border/20 flex-shrink-0 group-hover:scale-105 transition-transform overflow-hidden">
                 {agent.logo_url ? (
                   <img src={agent.logo_url} alt={agent.name} className="w-full h-full object-contain" />
                 ) : (
                   <Building2 className="w-8 h-8 text-emerald" strokeWidth={1} />
                 )}
              </div>
              
              <div className="flex-1 text-center md:text-left">
                 <div className="flex flex-col md:flex-row md:items-center gap-4 mb-3">
                    <h3 className="text-display-xs font-display text-obsidian flex items-center gap-2 justify-center md:justify-start">
                      {agent.name}
                      {agent.verified && <ShieldCheck className="w-4 h-4 text-emerald" />}
                    </h3>
                    {agent.avg_rating > 0 && (
                      <div className="flex items-center justify-center gap-1 text-emerald">
                         <Star className="w-4 h-4 fill-current" />
                         <span className="text-body-sm font-bold">{agent.avg_rating}</span>
                      </div>
                    )}
                 </div>
                 <p className="text-[10px] font-bold text-muted uppercase tracking-widest mb-4">
                   {agent.city}{agent.county ? `, ${agent.county}` : ''}
                 </p>
                 <p className="text-body-md text-muted line-clamp-2 max-w-2xl">{agent.description}</p>
              </div>

              <div className="flex flex-col items-center md:items-end gap-6 flex-shrink-0">
                 <div className="text-center md:text-right">
                    <p className="text-display-xs font-display text-obsidian">{agent.listing_count || 0}</p>
                    <p className="text-[9px] font-bold text-muted uppercase tracking-widest">Active Listings</p>
                 </div>
                 <Button variant="secondary" size="sm" className="h-10 text-[9px] border-forest text-forest hover:bg-forest hover:text-white">
                    View Profile
                 </Button>
              </div>
            </Link>
          ))
        ) : (
          <div className="py-20 text-center bg-white border border-dashed border-border/60">
             <p className="text-[10px] font-bold text-muted uppercase tracking-[0.4em]">No verified agencies found matching your search</p>
          </div>
        )}

        {/* More coming soon / Join CTA */}
        <div className="bg-obsidian p-12 md:p-16 text-silk text-center space-y-8">
           <h2 className="text-display-sm font-display italic">More agencies joining soon.</h2>
           <p className="text-silk/60 max-w-xl mx-auto text-body-md leading-relaxed">
             Are you an independent estate agent? Join 800+ agencies already on Nestiq and take control of your data and leads.
           </p>
           <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Button href="/pricing" className="bg-emerald text-white hover:bg-emerald/90 px-10 h-14">
                Join Our Partner Network
              </Button>
              <Button href="/contact" variant="secondary" className="border-silk/20 text-silk hover:bg-silk hover:text-obsidian px-10 h-14">
                Enquire Now
              </Button>
           </div>
        </div>
      </div>
    </div>
  );
}
