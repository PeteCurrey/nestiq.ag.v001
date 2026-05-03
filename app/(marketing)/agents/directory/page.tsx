"use client";

import { Search, MapPin, Star, Building2, ChevronRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

const mockAgents = [
  { 
    id: "1", 
    name: "Savills Chelsea", 
    slug: "savills-chelsea", 
    logo: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=200", 
    rating: 4.9, 
    reviews: 124, 
    active_listings: 42,
    location: "London, SW3",
    description: "Specialists in prime residential property across Chelsea, Kensington and Knightsbridge."
  },
  { 
    id: "2", 
    name: "Knight Frank Manchester", 
    slug: "knight-frank-manchester", 
    logo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=200", 
    rating: 4.8, 
    reviews: 86, 
    active_listings: 38,
    location: "Manchester, M1",
    description: "A leading estate agency offering premium sales and letting services in Manchester City Centre."
  },
  { 
    id: "3", 
    name: "Hamptons Guildford", 
    slug: "hamptons-guildford", 
    logo: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=200", 
    rating: 4.7, 
    reviews: 210, 
    active_listings: 56,
    location: "Guildford, GU1",
    description: "Expert local knowledge and a global network for buying and selling in Surrey."
  }
];

export default function AgentDirectoryPage() {
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
               <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gold w-4 h-4" />
               <input 
                 type="text" 
                 placeholder="Agency name..." 
                 className="w-full h-16 pl-14 pr-6 bg-silk/50 border-none text-obsidian font-bold focus:ring-1 focus:ring-gold"
               />
            </div>
            <div className="flex-1 relative">
               <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-gold w-4 h-4" />
               <input 
                 type="text" 
                 placeholder="Location..." 
                 className="w-full h-16 pl-14 pr-6 bg-silk/50 border-none text-obsidian font-bold focus:ring-1 focus:ring-gold"
               />
            </div>
            <Button variant="primary" className="h-16 px-12">Search</Button>
         </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 space-y-6">
        {mockAgents.map((agent) => (
          <Link 
            key={agent.id} 
            href={`/agents/${agent.slug}`}
            className="group bg-white p-10 border border-border/40 hover:border-gold/30 transition-all duration-500 flex flex-col md:flex-row items-center gap-10"
          >
            <div className="w-20 h-20 bg-silk flex items-center justify-center p-4 border border-border/20 flex-shrink-0 group-hover:scale-105 transition-transform">
               <Building2 className="w-8 h-8 text-gold" strokeWidth={1} />
            </div>
            
            <div className="flex-1 text-center md:text-left">
               <div className="flex flex-col md:flex-row md:items-center gap-4 mb-3">
                  <h3 className="text-display-xs font-display text-obsidian">{agent.name}</h3>
                  <div className="flex items-center justify-center gap-1 text-gold">
                     <Star className="w-4 h-4 fill-current" />
                     <span className="text-body-sm font-bold">{agent.rating}</span>
                  </div>
               </div>
               <p className="text-[10px] font-bold text-muted uppercase tracking-widest mb-4">{agent.location}</p>
               <p className="text-body-md text-muted line-clamp-2 max-w-2xl">{agent.description}</p>
            </div>

            <div className="flex flex-col items-center md:items-end gap-6 flex-shrink-0">
               <div className="text-center md:text-right">
                  <p className="text-display-xs font-display text-obsidian">{agent.active_listings}</p>
                  <p className="text-[9px] font-bold text-muted uppercase tracking-widest">Active Listings</p>
               </div>
               <Button variant="secondary" size="sm" className="h-10 text-[9px]">
                  View Profile
               </Button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
