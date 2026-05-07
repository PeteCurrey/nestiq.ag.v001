"use client";

import { TrendingUp, Clock, AlertTriangle, Activity, MapPin } from "lucide-react";

export function SearchIntelligencePanel() {
  return (
    <div className="w-80 flex-shrink-0 border-r border-border/40 bg-white hidden xl:block h-[calc(100vh-200px)] overflow-y-auto sticky top-[200px]">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
           <div className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
           <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-obsidian">Market Intelligence</span>
        </div>

        <div className="space-y-8">
           
           {/* Insight Card 1 */}
           <div className="space-y-3">
             <div className="flex items-center gap-2 text-muted">
               <TrendingUp className="w-4 h-4 text-emerald" />
               <span className="text-[10px] font-bold uppercase tracking-widest">Average Asking Price</span>
             </div>
             <div className="text-display-xs font-display text-obsidian">£345,000</div>
             <p className="text-[10px] font-bold text-emerald uppercase tracking-widest">+2.4% vs last month</p>
           </div>

           <div className="h-px w-full bg-border/40" />

           {/* Insight Card 2 */}
           <div className="space-y-3">
             <div className="flex items-center gap-2 text-muted">
               <Clock className="w-4 h-4 text-emerald" />
               <span className="text-[10px] font-bold uppercase tracking-widest">Time on Market</span>
             </div>
             <div className="text-display-xs font-display text-obsidian">24 Days</div>
             <p className="text-[10px] font-bold text-subtle uppercase tracking-widest">Typical for this area</p>
           </div>

           <div className="h-px w-full bg-border/40" />

           {/* Insight Card 3 */}
           <div className="space-y-3">
             <div className="flex items-center gap-2 text-muted">
               <Activity className="w-4 h-4 text-emerald" />
               <span className="text-[10px] font-bold uppercase tracking-widest">Demand Signal</span>
             </div>
             <div className="flex items-center gap-1 mb-2">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="flex-1 h-1.5 bg-emerald rounded-full" />
                ))}
                <div className="flex-1 h-1.5 bg-border rounded-full" />
             </div>
             <p className="text-[10px] font-bold text-obsidian uppercase tracking-widest">High Competition</p>
             <p className="text-body-sm text-muted/80 leading-relaxed mt-2">Properties matching your criteria are receiving 4.2 viewings per week.</p>
           </div>

           <div className="bg-warm/50 p-4 border border-border/40 space-y-3 mt-4">
             <div className="flex items-start gap-3">
               <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
               <div className="space-y-1">
                 <p className="text-[10px] font-bold uppercase tracking-widest text-obsidian">Market Alert</p>
                 <p className="text-body-sm text-muted/80 leading-relaxed">3 bed detached homes in S40 are currently selling 12% faster than the regional average.</p>
               </div>
             </div>
           </div>

           {/* CTA */}
           <div className="pt-4">
             <button className="w-full bg-obsidian text-silk py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-forest transition-colors">
               Get Full Area Report
             </button>
           </div>

        </div>
      </div>
    </div>
  );
}
