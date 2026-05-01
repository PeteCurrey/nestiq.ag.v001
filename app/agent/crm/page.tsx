"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  MoreVertical, 
  Sparkles, 
  Phone, 
  Mail, 
  Calendar,
  Filter,
  Search,
  ChevronRight,
  TrendingUp,
  UserPlus
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils/cn";

const columns = [
  { id: "new", title: "New Leads", color: "bg-blue-500" },
  { id: "qualified", title: "Qualified", color: "bg-purple-500" },
  { id: "viewing", title: "Viewing", color: "bg-amber-500" },
  { id: "offer", title: "Offer", color: "bg-emerald" },
  { id: "under-offer", title: "Under Offer", color: "bg-forest" },
];

const initialLeads = [
  { id: "1", name: "Alice Johnson", property: "The Ash Manor", status: "new", score: 9, price: "£1.45M", time: "2h ago" },
  { id: "2", name: "David Smith", property: "Vanguard Penthouse", status: "qualified", score: 6, price: "£3,250 pcm", time: "1d ago" },
  { id: "3", name: "Sarah Williams", property: "Modern Townhouse", status: "viewing", score: 8, price: "£650k", time: "3h ago" },
  { id: "4", name: "James Brown", property: "Eco Development", status: "offer", score: 9, price: "£525k", time: "5h ago" },
  { id: "5", name: "Robert Wilson", property: "The Old Rectory", status: "new", score: 4, price: "£875k", time: "6h ago" },
];

export default function CRMPage() {
  const [leads, setLeads] = useState(initialLeads);

  return (
    <div className="h-[calc(100vh-160px)] flex flex-col space-y-8">
      {/* CRM Header */}
      <div className="flex justify-between items-end">
         <div>
            <h1 className="text-display-sm font-display font-black text-obsidian mb-2">CRM Pipeline</h1>
            <p className="text-body-md text-muted">Track and manage your buyer and renter journeys.</p>
         </div>
         <div className="flex gap-4">
            <Button variant="outline" size="sm">
               <Filter className="w-4 h-4 mr-2" /> Filters
            </Button>
            <Button variant="primary" size="sm">
               <UserPlus className="w-4 h-4 mr-2" /> Add Lead
            </Button>
         </div>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 flex gap-6 overflow-x-auto pb-4 no-scrollbar">
        {columns.map((column) => (
          <div key={column.id} className="flex-shrink-0 w-80 flex flex-col gap-4">
            <div className="flex items-center justify-between px-2">
               <div className="flex items-center gap-3">
                  <div className={cn("w-2 h-2 rounded-full", column.color)} />
                  <h3 className="text-label font-bold uppercase tracking-widest text-obsidian">{column.title}</h3>
                  <span className="text-[10px] font-black text-muted bg-warm px-1.5 py-0.5 rounded">
                     {leads.filter(l => l.status === column.id).length}
                  </span>
               </div>
               <button className="text-muted hover:text-obsidian"><MoreVertical className="w-4 h-4" /></button>
            </div>

            <div className="flex-1 bg-warm/30 rounded-2xl p-4 border border-border/50 space-y-4 overflow-y-auto">
               {leads
                 .filter((l) => l.status === column.id)
                 .map((lead) => (
                   <motion.div
                     key={lead.id}
                     layoutId={lead.id}
                     className="bg-white p-5 rounded-xl border border-border shadow-sm hover:shadow-md transition-all cursor-grab active:cursor-grabbing group"
                   >
                     <div className="flex justify-between items-start mb-3">
                        <p className="text-body-sm font-bold text-obsidian group-hover:text-forest transition-colors">{lead.name}</p>
                        <div className="flex items-center gap-1">
                           <Sparkles className={cn("w-3 h-3", lead.score >= 8 ? "text-emerald" : "text-subtle")} />
                           <span className={cn(
                             "text-[10px] font-black uppercase tracking-widest",
                             lead.score >= 8 ? "text-emerald" : "text-muted"
                           )}>
                             {lead.score}/10
                           </span>
                        </div>
                     </div>
                     <p className="text-[11px] text-muted font-medium mb-4 truncate">{lead.property} • {lead.price}</p>
                     
                     <div className="flex items-center justify-between">
                        <div className="flex -space-x-2">
                           <div className="w-6 h-6 rounded-full bg-forest border-2 border-white flex items-center justify-center text-[8px] font-bold text-white">PC</div>
                           <div className="w-6 h-6 rounded-full bg-emerald border-2 border-white" />
                        </div>
                        <span className="text-[10px] font-bold text-muted uppercase tracking-widest">{lead.time}</span>
                     </div>

                     {/* Progress Indicator */}
                     {lead.score >= 8 && (
                        <div className="mt-4 pt-4 border-t border-dashed border-border flex items-center gap-2">
                           <TrendingUp className="w-3 h-3 text-emerald" />
                           <span className="text-[9px] font-black text-emerald uppercase tracking-widest">High Intent Buyer</span>
                        </div>
                     )}
                   </motion.div>
                 ))}
               
               <button className="w-full py-3 border-2 border-dashed border-border rounded-xl text-xs font-bold uppercase tracking-widest text-muted hover:border-forest hover:text-forest transition-all">
                  + Add Lead
               </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
