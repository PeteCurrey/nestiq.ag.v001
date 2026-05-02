"use client";

import React, { useState } from "react";
import { 
  CheckCircle2, 
  RefreshCw, 
  Database,
  Settings as SettingsIcon,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";

const integrations = [
  { id: "alto", name: "Alto CRM", description: "UK's leading agency software. Automated 2-way sync.", usage: 34, status: "connected" },
  { id: "street", name: "Street.co.uk", description: "Modern, next-gen CRM for independent agents.", usage: 12, status: "available" },
  { id: "jupix", name: "Jupix", description: "Reliable, industry-standard agency management.", usage: 18, status: "available" },
  { id: "vebra", name: "Vebra Alto", description: "Cloud-based software for residential agencies.", usage: 8, status: "available" },
  { id: "reapit", name: "Reapit Foundations", description: "Enterprise-grade property technology ecosystem.", usage: 14, status: "available" },
];

export default function IntegrationsPage() {
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 3000);
  };

  return (
    <div className="p-8 lg:p-12 space-y-12">
      {/* Header */}
      <div>
        <h1 className="text-display-sm font-display font-bold text-obsidian uppercase tracking-tight">Integrations</h1>
        <p className="text-muted text-sm mt-1">Connect your CRM and automate your property data flow</p>
      </div>

      {/* Connected Section */}
      <section className="space-y-6">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted">Connected Integrations</h3>
        <div className="bg-white border border-border/40 p-8">
           <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="flex items-center gap-8">
                 <div className="w-20 h-20 bg-silk flex items-center justify-center p-4 border border-border/20">
                    <span className="font-display font-bold text-obsidian">ALTO</span>
                 </div>
                 <div>
                    <h4 className="text-lg font-display font-bold text-obsidian">Alto CRM</h4>
                    <p className="text-sm text-muted mt-1">Branch: Dales &amp; Peaks Chesterfield</p>
                    <div className="flex items-center gap-3 mt-4">
                       <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 uppercase tracking-wider flex items-center gap-1.5">
                          <CheckCircle2 className="w-3 h-3" />
                          Active
                       </span>
                       <span className="text-[10px] font-bold text-muted uppercase tracking-widest flex items-center gap-1.5">
                          <Clock className="w-3 h-3" />
                          Last synced 47m ago
                       </span>
                    </div>
                 </div>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                 <Button 
                   onClick={handleSync}
                   disabled={isSyncing}
                   variant="secondary" 
                   className="h-12 px-6 border border-border/40 text-[10px] font-bold uppercase tracking-widest"
                 >
                   <RefreshCw className={cn("w-3.5 h-3.5 mr-2", isSyncing && "animate-spin")} />
                   {isSyncing ? "Syncing..." : "Sync Now"}
                 </Button>
                 <Button variant="secondary" className="h-12 px-6 border border-border/40 text-[10px] font-bold uppercase tracking-widest">
                   <SettingsIcon className="w-3.5 h-3.5 mr-2" />
                   Configure
                 </Button>
                 <Button variant="outline" className="h-12 px-6 border-red-200 text-red-500 hover:bg-red-50 text-[10px] font-bold uppercase tracking-widest">
                   Disconnect
                 </Button>
              </div>
           </div>
           
           <div className="mt-12 pt-8 border-t border-border/20 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                 <p className="text-[9px] font-bold text-muted uppercase tracking-[0.2em] mb-2">Synced Properties</p>
                 <p className="text-2xl font-display font-bold text-obsidian">52</p>
              </div>
              <div>
                 <p className="text-[9px] font-bold text-muted uppercase tracking-[0.2em] mb-2">Success Rate</p>
                 <p className="text-2xl font-display font-bold text-obsidian">100%</p>
              </div>
              <div>
                 <p className="text-[9px] font-bold text-muted uppercase tracking-[0.2em] mb-2">Sync Errors</p>
                 <p className="text-2xl font-display font-bold text-emerald-600">0</p>
              </div>
           </div>
        </div>
      </section>

      {/* Available Section */}
      <section className="space-y-6">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted">Available Integrations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {integrations.filter(i => i.status === "available").map(crm => (
            <div key={crm.id} className="bg-white border border-border/40 p-8 flex flex-col group">
               <div className="w-12 h-12 bg-silk flex items-center justify-center mb-6 border border-border/20">
                  <span className="font-display font-bold text-[10px] text-muted">{crm.name.substring(0, 1)}</span>
               </div>
               <h4 className="text-sm font-bold text-obsidian uppercase tracking-widest mb-2">{crm.name}</h4>
               <p className="text-[11px] text-muted leading-relaxed flex-1 mb-8">
                 {crm.description} Used by {crm.usage}% of UK agents.
               </p>
               <Button className="w-full bg-obsidian text-silk hover:bg-gold hover:text-silk border-none transition-all duration-500 text-[10px] font-bold uppercase tracking-widest py-6">
                 Connect {crm.name}
               </Button>
            </div>
          ))}
          
          {/* Universal BLM Import */}
          <div className="bg-silk/30 border border-dashed border-border/40 p-8 flex flex-col items-center justify-center text-center group hover:border-gold transition-colors">
             <Database className="w-8 h-8 text-muted/40 mb-6 group-hover:text-gold transition-colors" />
             <h4 className="text-sm font-bold text-obsidian uppercase tracking-widest mb-2">BLM / XML Import</h4>
             <p className="text-[11px] text-muted leading-relaxed mb-8 max-w-[200px]">
               Manual property feed import. Works with all major UK software.
             </p>
             <button className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 hover:underline">
               Upload BLM File
             </button>
          </div>
        </div>
      </section>

      {/* Help Card */}
      <div className="bg-obsidian text-silk p-12 flex flex-col md:flex-row items-center justify-between gap-12">
         <div className="max-w-xl">
           <h3 className="text-display-sm font-display font-bold leading-tight mb-4 italic">Can&apos;t see your CRM?</h3>
           <p className="text-silk/60 text-sm leading-relaxed">
             We&apos;re constantly adding new integrations. If your software isn&apos;t listed, we can usually build a custom normaliser for you within 48 hours, free of charge.
           </p>
         </div>
         <Button className="bg-silk text-obsidian hover:bg-gold hover:text-silk border-none h-14 px-12 uppercase tracking-widest text-[10px] font-bold">
           Contact Engineering
         </Button>
      </div>
    </div>
  );
}
