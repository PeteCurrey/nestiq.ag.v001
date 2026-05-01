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
    slug: "parkhall-lane-spinkhill-sheffield",
    title: "Park Hall Stately Residence",
    price: 3250000,
    address: "Parkhall Lane, Spinkhill, Sheffield, S21",
    bedrooms: 9,
    bathrooms: 7,
    sqft: 16006,
    imageUrl: "https://alto-live.s3.amazonaws.com/YinTGGgENeIQ2WUY9Pxr8DkOPKw/Wn53RYR2c1d9iSAZJEAEK_jJs4U/Photo/[3]/C0aPq4B4PEClE8FmDhVChg.jpg",
    status: "for-sale" as const,
    featured: true,
    agencyName: "Dales & Peaks"
  },
  {
    id: "1204",
    slug: "chesterfield-road-matlock-moor-matlock",
    title: "Cuckoostone Grange Portfolio",
    price: 2750000,
    address: "Chesterfield Road, Matlock Moor, Matlock",
    bedrooms: 13,
    bathrooms: 11,
    sqft: 8500,
    imageUrl: "https://alto-live.s3.amazonaws.com/YinTGGgENeIQ2WUY9Pxr8DkOPKw/Wn53RYR2c1d9iSAZJEAEK_jJs4U/Photo/[3]/v_K_1bV8mkm4A6lM067Y0A.jpg",
    status: "for-sale" as const,
    featured: true,
    agencyName: "Dales & Peaks"
  },
  {
    id: "924",
    slug: "walton-back-lane-walton-chesterfield",
    title: "Contemporary Detached Masterpiece",
    price: 1495000,
    address: "Walton Back Lane, Walton, Chesterfield",
    bedrooms: 5,
    bathrooms: 4,
    sqft: 3000,
    imageUrl: "https://alto-live.s3.amazonaws.com/YinTGGgENeIQ2WUY9Pxr8DkOPKw/Wn53RYR2c1d9iSAZJEAEK_jJs4U/Photo/[3]/9p_3-1PT4kmTVmyz6P73-w.jpg",
    status: "for-sale" as const,
    featured: true,
    agencyName: "Dales & Peaks"
  },
  {
    id: "1214",
    slug: "northedge-lane-tupton-chesterfield",
    title: "Architectural Rural Residence",
    price: 1495000,
    address: "Northedge Lane, Tupton, Chesterfield",
    bedrooms: 4,
    bathrooms: 3,
    sqft: 4200,
    imageUrl: "https://alto-live.s3.amazonaws.com/YinTGGgENeIQ2WUY9Pxr8DkOPKw/Wn53RYR2c1d9iSAZJEAEK_jJs4U/Photo/[3]/DRZGR1I64kqALacXcrdkPA.jpg",
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
      
      {/* The Nestiq Difference */}
      <section className="py-32 px-6 md:px-12 max-w-[1800px] mx-auto border-b border-border/30">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div>
            <span className="text-[10px] font-bold text-gold uppercase tracking-[0.4em] mb-8 block">The Nestiq Standard</span>
            <h2 className="text-display-lg leading-[1.1] mb-12">
              A smarter, fairer way <br /> to find your <span className="italic font-normal text-gold">next move.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <Shield className="w-6 h-6 text-gold mb-6" strokeWidth={1} />
              <h3 className="text-body-lg font-bold mb-3 uppercase tracking-wider">Trusted Data</h3>
              <p className="text-body-sm text-muted leading-relaxed">Direct integration with agent CRM systems ensures 100% accurate information and real-time listing updates.</p>
            </div>
            <div>
              <Globe className="w-6 h-6 text-gold mb-6" strokeWidth={1} />
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
            <span className="text-[10px] font-bold text-gold uppercase tracking-[0.4em] mb-8 block">The Collection</span>
            <h2 className="text-display-md leading-[1.1]">
              Featured <br />
              Homes.
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
    </div>
  );
}

