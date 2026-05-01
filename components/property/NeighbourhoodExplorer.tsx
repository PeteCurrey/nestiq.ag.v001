"use client";

import { MapPin, School, Train, ShoppingCart, ShieldCheck, Trees } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const scores = [
  { label: "Transport", score: 8.5, icon: <Train className="w-4 h-4" /> },
  { label: "Schools", score: 9.2, icon: <School className="w-4 h-4" /> },
  { label: "Shopping", score: 7.8, icon: <ShoppingCart className="w-4 h-4" /> },
  { label: "Safety", score: 8.1, icon: <ShieldCheck className="w-4 h-4" /> },
  { label: "Green Space", score: 6.5, icon: <Trees className="w-4 h-4" /> },
];

export function NeighbourhoodExplorer() {
  return (
    <div className="bg-white p-8 rounded-2xl border border-border shadow-sm">
      <div className="flex items-center justify-between mb-8">
         <div>
            <h3 className="text-body-lg font-display font-bold text-obsidian">Neighbourhood Scores</h3>
            <p className="text-body-sm text-muted">Data-driven insights for this area</p>
         </div>
         <Badge variant="emerald" className="bg-emerald/10 text-emerald border-emerald/20">Overall: 8.2/10</Badge>
      </div>

      <div className="space-y-6">
         {scores.map((s) => (
            <div key={s.label}>
               <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2 text-body-sm font-bold text-obsidian uppercase tracking-widest">
                     <span className="text-forest">{s.icon}</span>
                     {s.label}
                  </div>
                  <span className="text-body-sm font-mono font-bold text-obsidian">{s.score}/10</span>
               </div>
               <div className="h-2 bg-warm rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${s.score * 10}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-forest"
                  />
               </div>
            </div>
         ))}
      </div>

      <div className="mt-8 pt-8 border-t border-border flex items-start gap-4">
         <div className="w-10 h-10 bg-warm rounded-full flex items-center justify-center flex-shrink-0 text-forest">
            <MapPin className="w-5 h-5" />
         </div>
         <div>
            <p className="text-xs font-bold text-obsidian uppercase tracking-widest mb-1">Local Transport</p>
            <p className="text-xs text-muted leading-relaxed">
               Closest station: <span className="text-obsidian font-bold">Leeds City Station (0.4 miles)</span>. 
               Excellent connectivity with 12 buses per hour to the city centre.
            </p>
         </div>
      </div>
    </div>
  );
}

function Badge({ children, variant = "default", className }: { children: React.ReactNode, variant?: string, className?: string }) {
  return (
    <span className={cn(
      "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border",
      variant === "emerald" ? "bg-emerald text-obsidian border-transparent" : "bg-warm text-muted border-border",
      className
    )}>
      {children}
    </span>
  );
}

import { motion } from "framer-motion";
