"use client";

import { Search, MapPin, Star, Building2, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Link from "next/link";
import Image from "next/image";

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
    <div className="bg-pearl min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 text-center mb-16">
        <h1 className="text-display-lg font-display font-extrabold text-obsidian mb-6">Find a <span className="text-forest">Verified Agent</span></h1>
        <p className="text-body-xl text-muted max-w-2xl mx-auto">
          We only partner with the best. Browse our network of 800+ vetted 
          agencies committed to a fair and fast property market.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 mb-16">
         <div className="bg-white p-2 rounded-2xl shadow-xl border border-border flex flex-col md:flex-row gap-2">
            <div className="flex-1 relative">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-subtle w-5 h-5" />
               <input 
                 type="text" 
                 placeholder="Agency name..." 
                 className="w-full h-14 pl-12 pr-4 bg-warm border-none rounded-xl text-obsidian font-bold focus:ring-2 focus:ring-forest"
               />
            </div>
            <div className="flex-1 relative">
               <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-subtle w-5 h-5" />
               <input 
                 type="text" 
                 placeholder="Location (e.g. Leeds)" 
                 className="w-full h-14 pl-12 pr-4 bg-warm border-none rounded-xl text-obsidian font-bold focus:ring-2 focus:ring-forest"
               />
            </div>
            <Button variant="primary" size="lg" className="h-14 rounded-xl px-10">Search Agents</Button>
         </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 space-y-6">
        {mockAgents.map((agent) => (
          <Link 
            key={agent.id} 
            href={`/agents/${agent.slug}`}
            className="group bg-white p-8 rounded-2xl border border-border shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row items-center gap-8"
          >
            <div className="w-24 h-24 rounded-2xl bg-warm flex items-center justify-center p-4 border border-border flex-shrink-0 group-hover:scale-105 transition-transform">
               {/* Replace with Image component if using real logos */}
               <Building2 className="w-12 h-12 text-forest" />
            </div>
            
            <div className="flex-1 text-center md:text-left">
               <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2">
                  <h3 className="text-display-xs font-display font-bold text-obsidian group-hover:text-forest transition-colors">{agent.name}</h3>
                  <div className="flex items-center justify-center gap-1 text-amber-500">
                     <Star className="w-4 h-4 fill-current" />
                     <span className="text-body-sm font-black">{agent.rating}</span>
                     <span className="text-[10px] font-bold text-muted uppercase tracking-widest">({agent.reviews} Reviews)</span>
                  </div>
               </div>
               <p className="text-body-sm text-forest font-bold uppercase tracking-widest mb-3">{agent.location}</p>
               <p className="text-body-md text-muted line-clamp-2 max-w-2xl">{agent.description}</p>
            </div>

            <div className="flex flex-col items-center md:items-end gap-3 flex-shrink-0">
               <div className="text-center md:text-right">
                  <p className="text-display-xs font-display font-extrabold text-obsidian">{agent.active_listings}</p>
                  <p className="text-[10px] font-bold text-muted uppercase tracking-widest">Active Listings</p>
               </div>
               <Button variant="ghost" size="sm" className="group-hover:translate-x-1 transition-transform">
                  View Profile <ChevronRight className="ml-2 w-4 h-4" />
               </Button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
