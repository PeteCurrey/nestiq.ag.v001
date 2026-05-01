import { Hero } from "@/components/home/Hero";
import { AISearchShowcase } from "@/components/home/AISearchShowcase";
import { PropertyCard } from "@/components/property/PropertyCard";
import { MarketTicker } from "@/components/shared/MarketTicker";
import { AgentShowcase } from "@/components/agent/AgentShowcase";
import { PropertyTypeGrid } from "@/components/home/PropertyTypeGrid";
import { SavingCalculator } from "@/components/shared/SavingCalculator";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

const featuredProperties = [
  {
    id: "1",
    title: "The Ash Manor",
    price: 1450000,
    address: "Chelsea, London • SW3",
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2200,
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
    status: "for-sale" as const,
    featured: true,
    agencyName: "Savills Chelsea"
  },
  {
    id: "2",
    title: "Vanguard Penthouse",
    price: 3250,
    address: "Manchester City Centre • M1",
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1100,
    imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800&auto=format&fit=crop",
    status: "to-rent" as const,
    agencyName: "Knight Frank"
  },
  {
    id: "3",
    title: "The Old Rectory",
    price: 875000,
    address: "Guildford, Surrey • GU1",
    bedrooms: 5,
    bathrooms: 3,
    sqft: 2800,
    imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop",
    status: "for-sale" as const,
    agencyName: "Hamptons"
  },
  {
    id: "4",
    title: "Riverside Apartment",
    price: 450000,
    address: "Bristol • BS1",
    bedrooms: 2,
    bathrooms: 1,
    sqft: 850,
    imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800&auto=format&fit=crop",
    status: "sold" as const,
    agencyName: "Savills"
  },
  {
    id: "5",
    title: "Modern Townhouse",
    price: 650000,
    address: "Oxford • OX1",
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1400,
    imageUrl: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=800&auto=format&fit=crop",
    status: "for-sale" as const,
    featured: true,
    agencyName: "Knight Frank"
  },
  {
    id: "6",
    title: "Eco Development",
    price: 525000,
    address: "Cambridge • CB1",
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1300,
    imageUrl: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=800&auto=format&fit=crop",
    status: "new-build" as const,
    agencyName: "Bidwells"
  }
];

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <MarketTicker />
      
      {/* Featured Properties */}
      <section className="py-32 max-w-7xl mx-auto px-4 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 text-forest font-bold text-label uppercase tracking-widest mb-4">
              <div className="w-8 h-px bg-forest" />
              Latest Listings
            </div>
            <h2 className="text-display-md font-display font-extrabold text-obsidian mb-4">
              Premium properties, updated every hour.
            </h2>
            <p className="text-body-lg text-muted">
              Explore the latest additions from over 800+ verified partner agencies across the UK.
            </p>
          </div>
          <Button variant="outline" className="group">
            View All Properties <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProperties.map((prop) => (
            <PropertyCard key={prop.id} property={prop as any} />
          ))}
        </div>
      </section>

      <AISearchShowcase />
      
      <PropertyTypeGrid />

      <AgentShowcase />

      <SavingCalculator />

      {/* Press Strip */}
      <section className="py-20 bg-pearl border-t border-border">
         <div className="max-w-7xl mx-auto px-4">
            <p className="text-center text-label font-bold uppercase tracking-[0.2em] text-subtle mb-10">As Featured In</p>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale group hover:opacity-60 transition-opacity">
               <span className="text-display-sm font-display font-black tracking-tighter">Property Industry Eye</span>
               <span className="text-display-sm font-display font-black tracking-tighter">Estate Agent Today</span>
               <span className="text-display-sm font-display font-black tracking-tighter">The Negotiator</span>
               <span className="text-display-sm font-display font-black tracking-tighter">Propertynews</span>
            </div>
         </div>
      </section>
    </div>
  );
}
