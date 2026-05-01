"use client";

import { motion } from "framer-motion";
import { 
  Plus, Search, Filter, MoreVertical, 
  Eye, MessageSquare, ChevronRight,
  TrendingUp, Building2, MapPin
} from "lucide-react";
import { Button } from "@/components/ui/Button";

const agentProperties = [
  {
    id: "1209",
    title: "Park Hall",
    price: "£3,250,000",
    address: "Parkhall Lane, Derbyshire",
    status: "Active",
    views: "12.4K",
    leads: "14",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: "1204",
    title: "Cuckoostone Grange Portfolio",
    price: "£2,750,000",
    address: "Matlock Moor, Matlock",
    status: "Active",
    views: "8.2K",
    leads: "9",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: "924",
    title: "Yew Tree Farm",
    price: "£1,495,000",
    address: "Walton Back Lane, Chesterfield",
    status: "Under Offer",
    views: "14.1K",
    leads: "22",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: "1214",
    title: "Box Farm",
    price: "£1,495,000",
    address: "Northedge Lane, Tupton",
    status: "Active",
    views: "4.8K",
    leads: "5",
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=400&auto=format&fit=crop"
  }
];

export default function AgentProperties() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <span className="text-[10px] font-bold text-gold uppercase tracking-[0.4em] mb-4 block">Asset Management</span>
          <h1 className="text-display-md font-display leading-tight">My Listings</h1>
        </div>
        <Button variant="primary">
          <Plus className="w-4 h-4 mr-2" />
          List New Property
        </Button>
      </div>

      {/* Filters Bar */}
      <div className="bg-white border border-border/40 p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
         <div className="relative flex-1 max-w-md w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted/40" />
            <input 
              type="text" 
              placeholder="Filter by title, address or ID..."
              className="w-full bg-silk border-none pl-12 pr-6 py-3 text-[10px] font-bold uppercase tracking-widest outline-none"
            />
         </div>
         <div className="flex gap-4">
            <button className="flex items-center gap-3 px-6 py-3 border border-border/40 text-[10px] font-bold uppercase tracking-widest hover:bg-silk transition-all">
               <Filter className="w-4 h-4" />
               Filter
            </button>
            <button className="flex items-center gap-3 px-6 py-3 border border-border/40 text-[10px] font-bold uppercase tracking-widest hover:bg-silk transition-all">
               Latest First
            </button>
         </div>
      </div>

      {/* Properties Table/List */}
      <div className="bg-white border border-border/40 overflow-hidden">
         <table className="w-full text-left border-collapse">
            <thead>
               <tr className="bg-silk/50 border-b border-border/40">
                  <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-muted">Property</th>
                  <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-muted">Status</th>
                  <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-muted">Performance</th>
                  <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-muted text-right">Action</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
               {agentProperties.map((prop) => (
                  <tr key={prop.id} className="group hover:bg-silk/30 transition-all duration-500">
                     <td className="px-8 py-8">
                        <div className="flex items-center gap-6">
                           <div className="w-24 h-16 overflow-hidden border border-border/40">
                              <img src={prop.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt={prop.title} />
                           </div>
                           <div>
                              <span className="block text-body-md font-bold text-obsidian mb-1">{prop.title}</span>
                              <div className="flex items-center gap-2 text-[10px] text-muted uppercase tracking-widest">
                                 <MapPin className="w-3 h-3 text-gold" />
                                 {prop.address}
                              </div>
                           </div>
                        </div>
                     </td>
                     <td className="px-8 py-8">
                        <div className="flex items-center gap-3">
                           <div className={cn(
                              "w-1.5 h-1.5 rounded-full",
                              prop.status === "Active" ? "bg-emerald" : "bg-gold"
                           )} />
                           <span className="text-[10px] font-bold uppercase tracking-widest text-obsidian">{prop.status}</span>
                        </div>
                     </td>
                     <td className="px-8 py-8">
                        <div className="flex items-center gap-8">
                           <div className="flex items-center gap-2">
                              <Eye className="w-3.5 h-3.5 text-muted" />
                              <span className="text-[10px] font-bold uppercase tracking-widest text-obsidian">{prop.views}</span>
                           </div>
                           <div className="flex items-center gap-2">
                              <MessageSquare className="w-3.5 h-3.5 text-muted" />
                              <span className="text-[10px] font-bold uppercase tracking-widest text-obsidian">{prop.leads}</span>
                           </div>
                           <TrendingUp className="w-3.5 h-3.5 text-emerald" />
                        </div>
                     </td>
                     <td className="px-8 py-8 text-right">
                        <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                           <button className="p-3 border border-border/40 hover:bg-obsidian hover:text-silk transition-all">
                              <MoreVertical className="w-4 h-4" />
                           </button>
                           <button className="px-6 py-3 bg-obsidian text-silk text-[10px] font-bold uppercase tracking-widest hover:bg-forest transition-all">
                              Manage
                           </button>
                        </div>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
