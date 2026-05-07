"use client";

import { motion } from "framer-motion";
import { 
  BarChart3, Users, Home, TrendingUp, Sparkles, FileText, 
  Settings, Bell, Search, Filter, ChevronDown, CheckCircle2,
  Clock, MapPin, Building2, Zap, ArrowRight, Activity
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function AgentDashboardPreviewPage() {
  return (
    <div className="min-h-screen bg-obsidian text-silk font-sans selection:bg-emerald/30">
      
      {/* Top Navigation */}
      <header className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-obsidian sticky top-0 z-40">
         <div className="flex items-center gap-8">
            <span className="text-[14px] font-display font-bold tracking-widest uppercase">NestIQ <span className="text-emerald">Beta</span></span>
            <nav className="hidden md:flex items-center gap-6">
               <button className="text-[10px] font-bold uppercase tracking-widest text-emerald border-b-2 border-emerald pb-5 pt-5">Dashboard</button>
               <button className="text-[10px] font-bold uppercase tracking-widest text-muted hover:text-white pb-5 pt-5 transition-colors">Listings</button>
               <button className="text-[10px] font-bold uppercase tracking-widest text-muted hover:text-white pb-5 pt-5 transition-colors">Leads</button>
               <button className="text-[10px] font-bold uppercase tracking-widest text-muted hover:text-white pb-5 pt-5 transition-colors">Market Intel</button>
               <button className="text-[10px] font-bold uppercase tracking-widest text-muted hover:text-white pb-5 pt-5 transition-colors">Vendor Reports</button>
            </nav>
         </div>
         <div className="flex items-center gap-6">
            <button className="relative">
               <Bell className="w-5 h-5 text-muted hover:text-white transition-colors" />
               <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald rounded-full" />
            </button>
            <div className="flex items-center gap-3 border-l border-white/10 pl-6">
               <div className="w-8 h-8 bg-emerald/10 flex items-center justify-center rounded-full border border-emerald/20">
                  <Building2 className="w-4 h-4 text-emerald" />
               </div>
               <div className="hidden md:block text-left">
                  <span className="block text-[9px] font-bold uppercase tracking-widest text-muted">Peak Properties</span>
                  <span className="block text-body-sm font-medium">S40 Branch</span>
               </div>
               <ChevronDown className="w-4 h-4 text-muted" />
            </div>
         </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-6 py-8">
         
         <div className="flex items-center justify-between mb-8">
            <div>
               <h1 className="text-display-xs font-display mb-2">Good morning, Peak Properties.</h1>
               <p className="text-body-sm text-muted">Here is your daily performance overview for the Chesterfield (S40) territory.</p>
            </div>
            <div className="hidden sm:flex gap-4">
               <Button variant="outline" className="border-white/10 text-white hover:bg-white/5 text-[10px] font-bold uppercase tracking-widest">
                 <FileText className="w-4 h-4 mr-2" /> Download Report
               </Button>
               <Button className="bg-emerald text-obsidian hover:bg-white text-[10px] font-bold uppercase tracking-widest">
                 <Home className="w-4 h-4 mr-2" /> Add Listing
               </Button>
            </div>
         </div>

         {/* KPIs */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { label: "Active Listings", value: "42", trend: "+3", icon: Home },
              { label: "Total Views (7d)", value: "12.4k", trend: "+14%", icon: Activity },
              { label: "New Enquiries", value: "28", trend: "+8", icon: Users },
              { label: "Valuation Requests", value: "7", trend: "+2", icon: BarChart3 }
            ].map((kpi, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-6 flex flex-col justify-between h-32 relative overflow-hidden group">
                 <div className="absolute -right-4 -top-4 w-16 h-16 bg-white/5 rounded-full group-hover:scale-150 transition-transform duration-500" />
                 <div className="flex items-center justify-between relative z-10">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted">{kpi.label}</span>
                    <kpi.icon className="w-4 h-4 text-emerald" />
                 </div>
                 <div className="flex items-end justify-between relative z-10">
                    <span className="text-display-sm font-display leading-none">{kpi.value}</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-emerald">{kpi.trend}</span>
                 </div>
              </div>
            ))}
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            
            {/* Lead Inbox */}
            <div className="lg:col-span-2 bg-white/5 border border-white/10 flex flex-col">
               <div className="p-6 border-b border-white/10 flex items-center justify-between">
                  <h3 className="text-[11px] font-bold uppercase tracking-widest flex items-center gap-2">
                     <Zap className="w-4 h-4 text-emerald" /> High-Intent Lead Inbox
                  </h3>
                  <button className="text-[9px] font-bold uppercase tracking-widest text-muted hover:text-white">View All</button>
               </div>
               <div className="flex-1 overflow-auto">
                  <table className="w-full text-left border-collapse">
                     <thead>
                        <tr className="bg-white/5">
                           <th className="px-6 py-4 text-[9px] font-bold uppercase tracking-widest text-muted">Applicant</th>
                           <th className="px-6 py-4 text-[9px] font-bold uppercase tracking-widest text-muted">Enquiry</th>
                           <th className="px-6 py-4 text-[9px] font-bold uppercase tracking-widest text-muted">AI Score</th>
                           <th className="px-6 py-4 text-[9px] font-bold uppercase tracking-widest text-muted text-right">Status</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-white/10">
                        {[
                          { name: "Sarah Jenkins", email: "sarah.j@email.com", prop: "4 Bed Detached, Chatsworth Rd", score: "High (Chain Free)", status: "New" },
                          { name: "Mark Harrison", email: "mark.h@email.com", prop: "Valuation Request: S40 1AB", score: "Very High", status: "Follow Up" },
                          { name: "Eleanor Rigby", email: "eleanor@email.com", prop: "2 Bed Flat, West Bars", score: "Medium", status: "Contacted" },
                          { name: "David Copperfield", email: "david.c@email.com", prop: "3 Bed Semi, Brampton", score: "High", status: "New" }
                        ].map((lead, i) => (
                           <tr key={i} className="hover:bg-white/5 transition-colors cursor-pointer">
                              <td className="px-6 py-4">
                                 <span className="block text-body-sm font-medium text-white">{lead.name}</span>
                                 <span className="block text-body-xs text-muted">{lead.email}</span>
                              </td>
                              <td className="px-6 py-4">
                                 <span className="block text-body-sm text-silk/80">{lead.prop}</span>
                                 <span className="block text-[9px] uppercase tracking-widest text-muted mt-1">2 hours ago</span>
                              </td>
                              <td className="px-6 py-4">
                                 <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-emerald/10 text-emerald text-[9px] font-bold uppercase tracking-widest rounded">
                                    {lead.score}
                                 </span>
                              </td>
                              <td className="px-6 py-4 text-right">
                                 {lead.status === "New" ? (
                                    <span className="w-2 h-2 bg-amber-500 rounded-full inline-block animate-pulse" />
                                 ) : (
                                    <CheckCircle2 className="w-4 h-4 text-muted inline-block" />
                                 )}
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>

            {/* AI Tools & Market Intel */}
            <div className="space-y-6">
               
               {/* Market Intel */}
               <div className="bg-white/5 border border-white/10 p-6">
                  <h3 className="text-[11px] font-bold uppercase tracking-widest flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
                     <TrendingUp className="w-4 h-4 text-emerald" /> Territory Velocity (S40)
                  </h3>
                  <div className="space-y-6">
                     <div>
                        <div className="flex justify-between items-end mb-2">
                           <span className="text-[10px] font-bold uppercase tracking-widest text-muted">Avg. Time to Sell</span>
                           <span className="text-body-lg font-display">24 Days</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                           <div className="h-full bg-emerald w-[75%]" />
                        </div>
                        <span className="text-[9px] font-bold uppercase tracking-widest text-emerald mt-2 block">12% Faster than regional avg</span>
                     </div>
                     <div>
                        <div className="flex justify-between items-end mb-2">
                           <span className="text-[10px] font-bold uppercase tracking-widest text-muted">Avg. Asking Price</span>
                           <span className="text-body-lg font-display">£345,000</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                           <div className="h-full bg-amber-500 w-[60%]" />
                        </div>
                        <span className="text-[9px] font-bold uppercase tracking-widest text-muted mt-2 block">Stable month-over-month</span>
                     </div>
                  </div>
               </div>

               {/* AI Description Generator */}
               <div className="bg-gradient-to-br from-emerald/10 to-transparent border border-emerald/20 p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald/10 blur-[40px] rounded-full" />
                  <h3 className="text-[11px] font-bold uppercase tracking-widest flex items-center gap-2 mb-4 relative z-10 text-emerald">
                     <Sparkles className="w-4 h-4" /> AI Listing Assistant
                  </h3>
                  <p className="text-body-sm text-silk/70 mb-6 relative z-10">
                     Generate premium, SEO-optimized property descriptions in seconds based on key features and EPC data.
                  </p>
                  <Button className="w-full bg-emerald text-obsidian text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-all relative z-10">
                     Generate Description
                  </Button>
               </div>

            </div>

         </div>

         {/* Promo Banner */}
         <div className="bg-emerald text-obsidian p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-emerald/20 shadow-[0_0_40px_rgba(46,204,135,0.15)]">
            <div>
               <h3 className="text-body-xl font-display font-bold mb-2">You are viewing the Demo Dashboard.</h3>
               <p className="text-body-sm text-obsidian/80">Apply for the Founding Agent Programme to unlock live data and lock in your flat-rate pricing.</p>
            </div>
            <Button variant="outline" className="shrink-0 border-obsidian text-obsidian hover:bg-obsidian hover:text-emerald text-[11px] font-bold uppercase tracking-widest px-8">
               Apply for Live Access <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
         </div>

      </main>
    </div>
  );
}
