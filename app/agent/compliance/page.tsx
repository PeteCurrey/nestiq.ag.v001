"use client";

import { CheckCircle2, AlertCircle, Clock, ShieldCheck, FileText, Info, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils/cn";

const complianceItems = [
  { id: "1", title: "Part A: Mandatory Information", status: "complete", description: "Council tax band, price, and tenure are required for every listing." },
  { id: "2", title: "Part B: Physical Characteristics", status: "warning", description: "Property type, construction, and parking details missing for 4 listings." },
  { id: "3", title: "Part C: Material Facts", status: "pending", description: "Utilities, broadband speed, and flood risk data for upcoming listings." },
];

const listings = [
  { id: "1", title: "The Ash Manor", progress: 100, status: "Ready" },
  { id: "2", title: "Vanguard Penthouse", progress: 85, status: "Incomplete" },
  { id: "3", title: "The Old Rectory", progress: 60, status: "Incomplete" },
];

export default function ComplianceHub() {
  return (
    <div className="max-w-5xl mx-auto space-y-12">
      <div className="flex justify-between items-end">
         <div>
            <h1 className="text-display-sm font-display font-black text-obsidian mb-2">Compliance Hub</h1>
            <p className="text-body-md text-muted">Ensure your listings meet all UK National Trading Standards requirements.</p>
         </div>
         <Button variant="outline" size="sm" className="bg-white">
            <ShieldCheck className="w-4 h-4 mr-2" /> Compliance Audit
         </Button>
      </div>

      {/* Global Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {complianceItems.map((item) => (
          <div key={item.id} className="bg-white p-8 rounded-2xl border border-border shadow-sm flex flex-col justify-between">
            <div>
               <div className="flex justify-between items-start mb-6">
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center shadow-sm",
                    item.status === 'complete' ? "bg-emerald/10 text-emerald" : 
                    item.status === 'warning' ? "bg-amber-500/10 text-amber-500" : "bg-warm text-subtle"
                  )}>
                     {item.status === 'complete' ? <CheckCircle2 className="w-6 h-6" /> : 
                      item.status === 'warning' ? <AlertCircle className="w-6 h-6" /> : <Clock className="w-6 h-6" />}
                  </div>
                  <Badge variant="outline" className={cn(
                    "text-[10px] font-black uppercase tracking-widest",
                    item.status === 'complete' ? "text-emerald border-emerald/20" : 
                    item.status === 'warning' ? "text-amber-500 border-amber-500/20" : "text-muted border-border"
                  )}>
                    {item.status}
                  </Badge>
               </div>
               <h3 className="text-body-lg font-bold text-obsidian mb-2">{item.title}</h3>
               <p className="text-body-sm text-muted leading-relaxed mb-8">{item.description}</p>
            </div>
            <Button variant="ghost" size="sm" className="justify-between px-0 font-bold text-forest uppercase tracking-widest text-label">
               View Details <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>

      {/* Property Checklist */}
      <div className="bg-white rounded-3xl border border-border shadow-sm overflow-hidden">
         <div className="p-8 border-b border-border bg-warm/20">
            <h3 className="text-body-lg font-display font-bold text-obsidian uppercase tracking-widest">Property Compliance Status</h3>
         </div>
         <div className="divide-y divide-border">
            {listings.map((listing) => (
              <div key={listing.id} className="p-8 flex items-center justify-between group hover:bg-pearl transition-all">
                 <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-warm rounded-lg flex items-center justify-center">
                       <FileText className="w-6 h-6 text-subtle" />
                    </div>
                    <div>
                       <p className="text-body-md font-bold text-obsidian group-hover:text-forest transition-colors">{listing.title}</p>
                       <div className="flex items-center gap-4 mt-1">
                          <div className="w-32 h-1.5 bg-warm rounded-full overflow-hidden">
                             <div 
                               className={cn("h-full transition-all duration-1000", listing.progress === 100 ? "bg-emerald" : "bg-amber-500")} 
                               style={{ width: `${listing.progress}%` }} 
                             />
                          </div>
                          <span className="text-[10px] font-bold text-muted uppercase tracking-widest">{listing.progress}% Complete</span>
                       </div>
                    </div>
                 </div>
                 <div className="flex items-center gap-4">
                    <Badge variant={listing.status === 'Ready' ? 'emerald' : 'secondary'}>{listing.status}</Badge>
                    <Button variant="outline" size="sm">Edit Info</Button>
                 </div>
              </div>
            ))}
         </div>
      </div>

      {/* Compliance Warning */}
      <div className="bg-obsidian p-10 rounded-3xl text-white flex items-center gap-10">
         <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
            <Info className="w-10 h-10 text-emerald" />
         </div>
         <div>
            <h3 className="text-display-xs font-display font-bold mb-2">Mandatory Disclosures</h3>
            <p className="text-body-md text-white/60 leading-relaxed max-w-2xl">
               Starting May 2026, all listings must include broadband speed and mobile coverage data (Part C). 
               Use our integrated lookup tool to auto-fill these fields and stay compliant.
            </p>
         </div>
         <Button variant="secondary" className="bg-emerald text-obsidian">Update All Listings</Button>
      </div>
    </div>
  );
}
