import { EditorialHero } from "@/components/home/EditorialHero";
import { PropertyCard } from "@/components/property/PropertyCard";
import { MarketTicker } from "@/components/shared/MarketTicker";
import { AgentShowcase } from "@/components/agent/AgentShowcase";
import { PropertyTypeGrid } from "@/components/home/PropertyTypeGrid";
import { Button } from "@/components/ui/Button";
import { ArrowRight, TrendingUp, Globe, Shield } from "lucide-react";

const featuredProperties = [
  {
    id: "1209",
    slug: "park-hall-7-bedroom-stately-residence",
    title: "Park Hall",
    price: 3250000,
    address: "Parkhall Lane, Spinkhill, Derbyshire",
    bedrooms: 9,
    bathrooms: 7,
    sqft: 16006,
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
    status: "for-sale" as const,
    featured: true,
    agencyName: "Dales & Peaks"
  },
  {
    id: "1204",
    slug: "contemporary-barn-conversion-portfolio",
    title: "Cuckoostone Grange Portfolio",
    price: 2750000,
    address: "Matlock Moor, Matlock, DE4",
    bedrooms: 13,
    bathrooms: 10,
    sqft: 8500,
    imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800&auto=format&fit=crop",
    status: "for-sale" as const,
    featured: true,
    agencyName: "Dales & Peaks"
  },
  {
    id: "924",
    slug: "yew-tree-farm-5-bedroom-detached",
    title: "Yew Tree Farm",
    price: 1495000,
    address: "Walton Back Lane, Chesterfield",
    bedrooms: 5,
    bathrooms: 4,
    sqft: 3000,
    imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop",
    status: "for-sale" as const,
    featured: true,
    agencyName: "Dales & Peaks"
  },
  {
    id: "1214",
    slug: "box-farm-equestrian-property",
    title: "Box Farm",
    price: 1495000,
    address: "Northedge Lane, Tupton, Derbyshire",
    bedrooms: 4,
    bathrooms: 3,
    sqft: 4200,
    imageUrl: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=800&auto=format&fit=crop",
    status: "for-sale" as const,
    featured: true,
    agencyName: "Dales & Peaks"
  }
];

export default function Home() {
  return (
    <div className="flex flex-col bg-pearl">
      <EditorialHero />
      
      <div className="pt-32 pb-12">
        <MarketTicker />
      </div>
      
      {/* Institutional Mission */}
      <section className="py-32 px-6 md:px-12 max-w-[1800px] mx-auto border-b border-border/30">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div>
            <span className="text-[10px] font-bold text-gold uppercase tracking-[0.4em] mb-8 block">The Nestiq Standard</span>
            <h2 className="text-display-lg leading-[1.1] mb-12">
              Bespoke Asset Discovery for <span className="italic font-normal">Modern Portfolio Managers.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <Shield className="w-6 h-6 text-gold mb-6" strokeWidth={1} />
              <h3 className="text-body-lg font-bold mb-3 uppercase tracking-wider">Verified Chain</h3>
              <p className="text-body-sm text-muted leading-relaxed">Direct integration with institutional management systems ensures 100% data fidelity and chain of custody.</p>
            </div>
            <div>
              <Globe className="w-6 h-6 text-gold mb-6" strokeWidth={1} />
              <h3 className="text-body-lg font-bold mb-3 uppercase tracking-wider">Global Reach</h3>
              <p className="text-body-sm text-muted leading-relaxed">Connecting high-net-worth liquidity with exclusive UK residential and commercial assets.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-32 max-w-[1800px] mx-auto px-6 md:px-12 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20">
          <div className="max-w-2xl">
            <span className="text-[10px] font-bold text-gold uppercase tracking-[0.4em] mb-8 block">The Collection</span>
            <h2 className="text-display-md leading-[1.1]">
              Curated Estates. <br />
              Peerless Standards.
            </h2>
          </div>
          <Button variant="secondary" className="group">
            View All Listings <ArrowRight className="ml-2 w-3 h-3 group-hover:translate-x-1 transition-transform duration-500" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {featuredProperties.map((prop) => (
            <PropertyCard key={prop.id} property={prop as any} />
          ))}
        </div>
      </section>

      <PropertyTypeGrid />

      <AgentShowcase />

      {/* Institutional Press */}
      <section className="py-32 bg-obsidian text-silk overflow-hidden">
         <div className="max-w-[1800px] mx-auto px-6 md:px-12">
            <p className="text-center text-[10px] font-medium uppercase tracking-[0.4em] text-silk/40 mb-16">Global Authority & Recognition</p>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-32 opacity-60">
               <span className="text-display-sm font-display lowercase italic opacity-80">The Financial Times</span>
               <span className="text-display-sm font-display font-medium tracking-tighter">Bloomberg</span>
               <span className="text-display-sm font-display font-bold uppercase tracking-widest text-[14px]">Forbes</span>
               <span className="text-display-sm font-display italic">Reuters</span>
            </div>
         </div>
      </section>
    </div>
  );
}

