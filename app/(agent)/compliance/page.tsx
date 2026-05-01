"use client";

import React from "react";
import { 
  ShieldCheck, 
  AlertCircle, 
  Clock, 
  CheckCircle2, 
  ChevronRight,
  FileText,
  AlertTriangle,
  Info
} from "lucide-react";
import { cn } from "@/lib/utils";

const complianceStats = [
  { label: "Critical Issues", value: 3, color: "text-red-500", bg: "bg-red-50" },
  { label: "Warnings", value: 7, color: "text-amber-500", bg: "bg-amber-50" },
  { label: "Compliant", value: 42, color: "text-emerald-500", bg: "bg-emerald-50" },
];

const checklist = [
  { category: "Part A — Material Information", items: [
    { name: "Asking Price/Rent confirmed", status: "completed" },
    { name: "Property Type confirmed", status: "completed" },
    { name: "Construction Materials noted", status: "pending" },
    { name: "EPC Rating valid and uploaded", status: "completed" },
  ]},
  { category: "Part B — Safety & Restrictions", items: [
    { name: "Building Safety (Cladding/Fire)", status: "pending" },
    { name: "Restrictive Covenants check", status: "warning" },
    { name: "Flood Risk assessment", status: "completed" },
  ]},
  { category: "Lettings Compliance", items: [
    { name: "Gas Safe Certificate expiry", status: "warning" },
    { name: "EICR valid (5-year check)", status: "completed" },
    { name: "HMO Licence (if applicable)", status: "completed" },
  ]},
];

export default function AgentCompliance() {
  return (
    <div className="p-8 lg:p-12 space-y-12">
      {/* Header */}
      <div>
        <h1 className="text-display-sm font-display font-bold text-obsidian uppercase tracking-tight">Compliance Hub</h1>
        <p className="text-muted text-sm mt-1">UK Material Information & Safety Monitoring (NTSELAT Guidelines)</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {complianceStats.map(stat => (
          <div key={stat.label} className={cn("p-8 border border-border/20", stat.bg)}>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted mb-2">{stat.label}</p>
            <p className={cn("text-4xl font-display font-bold", stat.color)}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Progress Tracker */}
        <div className="lg:col-span-2 space-y-8">
           <div className="bg-white border border-border/40 p-8">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-sm font-bold uppercase tracking-widest text-obsidian">Global Compliance Score</h3>
                <span className="text-sm font-bold text-emerald-600">89%</span>
              </div>
              <div className="w-full h-2 bg-silk rounded-none overflow-hidden">
                <div className="h-full bg-emerald-500 w-[89%]" />
              </div>
           </div>

           {/* Material Information Checklists */}
           <div className="space-y-6">
             {checklist.map(group => (
               <div key={group.category} className="bg-white border border-border/40 overflow-hidden">
                 <div className="px-8 py-4 bg-silk/50 border-b border-border/40">
                   <h4 className="text-[10px] font-bold uppercase tracking-widest text-obsidian">{group.category}</h4>
                 </div>
                 <div className="divide-y divide-border/20">
                   {group.items.map(item => (
                     <div key={item.name} className="px-8 py-4 flex items-center justify-between group hover:bg-silk/20 transition-colors">
                       <div className="flex items-center gap-4">
                         {item.status === "completed" ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> :
                          item.status === "warning" ? <AlertTriangle className="w-4 h-4 text-amber-500" /> :
                          <AlertCircle className="w-4 h-4 text-red-500" />}
                         <span className="text-sm text-obsidian font-medium">{item.name}</span>
                       </div>
                       <button className="text-[9px] font-bold uppercase tracking-widest text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity">
                         Confirm now
                       </button>
                     </div>
                   ))}
                 </div>
               </div>
             ))}
           </div>
        </div>

        {/* Sidebar: Expiry Tracker */}
        <div className="space-y-8">
          <div className="bg-white border border-border/40 p-8">
            <h3 className="text-sm font-bold uppercase tracking-widest text-obsidian mb-8 flex items-center gap-3">
              <Clock className="w-4 h-4 text-gold" />
              Expiry Tracker
            </h3>
            <div className="space-y-6">
              {[
                { name: "Gas Safe - 12 Walton Back Lane", expiry: "12 days left", status: "critical" },
                { name: "EPC - 48 Parkhall Lane", expiry: "28 days left", status: "warning" },
                { name: "EICR - 92 Chesterfield Rd", expiry: "94 days left", status: "safe" },
              ].map(item => (
                <div key={item.name} className="flex flex-col gap-1 border-l-2 pl-4 border-border/20">
                  <p className="text-[11px] font-bold text-obsidian truncate">{item.name}</p>
                  <p className={cn(
                    "text-[9px] font-bold uppercase tracking-wider",
                    item.status === "critical" ? "text-red-500" :
                    item.status === "warning" ? "text-amber-500" :
                    "text-emerald-600"
                  )}>{item.expiry}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-obsidian text-silk p-8 space-y-6">
             <div className="flex items-center gap-3 text-gold">
               <ShieldCheck className="w-5 h-5" />
               <h4 className="text-xs font-bold uppercase tracking-widest">Nestiq Verified Agent</h4>
             </div>
             <p className="text-[11px] text-silk/60 leading-relaxed">
               Your agency is currently compliant with NTSELAT Part A material information requirements. Continue updating Part B and C to maintain your verification status.
             </p>
             <button className="w-full py-3 bg-white/10 hover:bg-white/20 text-[10px] font-bold uppercase tracking-widest transition-all">
               Download Report
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
