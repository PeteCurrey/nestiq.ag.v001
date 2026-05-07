import { EditorialHero } from "@/components/home/EditorialHero";
import { PropertyCard } from "@/components/property/PropertyCard";
import { MarketTicker } from "@/components/shared/MarketTicker";
import { AgentShowcase } from "@/components/agent/AgentShowcase";
import { PropertyTypeGrid } from "@/components/home/PropertyTypeGrid";
import { Button } from "@/components/ui/Button";
import { ArrowRight, TrendingUp, Globe, Shield } from "lucide-react";

import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const { data: featuredProperties } = await supabase
    .from('properties')
    .select('*, property_images(url, sort_order), agencies(name, logo_url)')
    .eq('featured', true)
    .eq('status', 'active')
    .limit(3);

  const safeProperties = (featuredProperties || []) as any[];
  return (
    <div className="flex flex-col bg-pearl">
      <EditorialHero />
      
      <div className="pt-32 pb-12">
        <MarketTicker />
      </div>
      
      {/* The Nestiq Difference */}
      <section className="py-32 px-6 md:px-12 max-w-[1800px] mx-auto border-b border-border/30">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div>
            <span className="text-[10px] font-bold text-emerald uppercase tracking-[0.4em] mb-8 block">The Nestiq Standard</span>
            <h2 className="text-display-lg leading-[1.1] mb-12">
              A smarter, fairer way <br /> to find your <span className="italic font-normal text-emerald">next move.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <Shield className="w-6 h-6 text-emerald mb-6" strokeWidth={1} />
              <h3 className="text-body-lg font-bold mb-3 uppercase tracking-wider">Trusted Data</h3>
              <p className="text-body-sm text-muted leading-relaxed">Direct integration with agent CRM systems ensures 100% accurate information and real-time listing updates.</p>
            </div>
            <div>
              <Globe className="w-6 h-6 text-emerald mb-6" strokeWidth={1} />
              <h3 className="text-body-lg font-bold mb-3 uppercase tracking-wider">Direct Access</h3>
              <p className="text-body-sm text-muted leading-relaxed">Connecting buyers and renters directly with local independent agents for a better property experience.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-32 max-w-[1800px] mx-auto px-6 md:px-12 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20">
          <div className="max-w-2xl">
            <span className="text-[10px] font-bold text-emerald uppercase tracking-[0.4em] mb-8 block">The Collection</span>
            <h2 className="text-display-md leading-[1.1]">
              Featured <br />
              Homes.
            </h2>
          </div>
          <Button variant="secondary" className="group border-forest text-forest hover:bg-forest hover:text-white">
            View All Listings <ArrowRight className="ml-2 w-3 h-3 group-hover:translate-x-1 transition-transform duration-500" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {safeProperties.map((prop) => (
            <PropertyCard key={prop.id} property={prop} />
          ))}
        </div>
      </section>

      <PropertyTypeGrid />

      <AgentShowcase />

      {/* Partner Agencies */}
      <section className="py-32 bg-obsidian text-silk overflow-hidden">
         <div className="max-w-[1800px] mx-auto px-6 md:px-12">
            <p className="text-center text-[10px] font-medium uppercase tracking-[0.4em] text-silk/40 mb-16">Trusted by Leading Independent Agencies</p>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-32 opacity-60">
               <span className="text-display-sm font-display font-bold uppercase tracking-widest text-[18px]">Dales & Peaks</span>
               <span className="text-display-sm font-display lowercase italic opacity-80">Redbrik</span>
               <span className="text-display-sm font-display font-medium tracking-tighter">Saxton Mee</span>
               <span className="text-display-sm font-display italic">Blenheim</span>
            </div>
         </div>
      </section>

      {/* Agent CTA */}
      <section className="py-32 bg-silk border-t border-border/30">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-display-sm font-display mb-8">Are you an estate agent?</h2>
          <p className="text-body-xl text-muted mb-12 leading-relaxed">
            Partner with Nestiq from £199/month and take control of your data, leads, and brand.
          </p>
          <Button 
            variant="primary" 
            size="lg" 
            href="/pricing"
            className="bg-forest text-white px-12 h-16"
          >
            Partner With Us <ArrowRight className="ml-3 w-4 h-4" />
          </Button>
        </div>
      </section>
    </div>
  );
}

