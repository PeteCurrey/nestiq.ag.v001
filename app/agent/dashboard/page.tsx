"use client";

import { motion } from "framer-motion";
import { 
  Users, Building2, Eye, TrendingUp, 
  ArrowUpRight, ArrowDownRight, Clock,
  Calendar, ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/Button";

const stats = [
  { name: "Active Listings", value: "4", change: "+0", type: "neutral", icon: Building2 },
  { name: "Total Impressions", value: "142.5K", change: "+12.3%", type: "increase", icon: Eye },
  { name: "Lead Conversions", value: "28", change: "+4.2%", type: "increase", icon: Users },
  { name: "Market Sentiment", value: "Bullish", change: "-0.5%", type: "decrease", icon: TrendingUp },
];

const recentLeads = [
  { id: 1, name: "Alexander Thorne", property: "Park Hall", date: "2 mins ago", value: "£3.25M", status: "High Intent" },
  { id: 2, name: "Beatrix Vane", property: "Box Farm", date: "45 mins ago", value: "£1.49M", status: "New Enquiry" },
  { id: 3, name: "Julian Sterling", property: "Yew Tree Farm", date: "3 hours ago", value: "£1.49M", status: "Viewing Requested" },
];

export default function AgentDashboard() {
  return (
    <div className="space-y-12">
      {/* Welcome Header */}
      <div className="flex justify-between items-end">
        <div>
          <span className="text-[10px] font-bold text-gold uppercase tracking-[0.4em] mb-4 block">Institutional Command</span>
          <h1 className="text-display-md font-display leading-tight">
            Welcome back, <br />
            <span className="italic font-normal">Dales & Peaks.</span>
          </h1>
        </div>
        <div className="flex gap-4">
           <Button variant="secondary" className="border-border/50">Market Report</Button>
           <Button variant="primary">New Listing</Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white border border-border/40 p-8 group hover:border-gold/30 transition-all duration-500">
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-silk border border-border/40 text-gold group-hover:bg-gold group-hover:text-silk transition-all duration-500">
                <stat.icon className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <div className={cn(
                "flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest",
                stat.type === "increase" ? "text-emerald" : stat.type === "decrease" ? "text-red-400" : "text-muted"
              )}>
                {stat.change}
                {stat.type === "increase" ? <ArrowUpRight className="w-3 h-3" /> : stat.type === "decrease" ? <ArrowDownRight className="w-3 h-3" /> : null}
              </div>
            </div>
            <span className="block text-[10px] font-bold text-muted uppercase tracking-[0.2em] mb-2">{stat.name}</span>
            <span className="text-display-sm font-display text-obsidian">{stat.value}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Recent Leads (Left 2/3) */}
        <div className="lg:col-span-2 bg-white border border-border/40 overflow-hidden">
          <div className="p-8 border-b border-border/40 flex justify-between items-center">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em]">Priority Intelligence (Leads)</h3>
            <button className="text-[10px] font-bold text-gold uppercase tracking-widest hover:text-forest transition-colors">View All Leads</button>
          </div>
          <div className="divide-y divide-border/30">
            {recentLeads.map((lead) => (
              <div key={lead.id} className="p-8 flex items-center justify-between group hover:bg-silk/40 transition-all duration-500">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-silk border border-border/40 flex items-center justify-center font-display text-lg text-gold group-hover:bg-gold group-hover:text-silk transition-all duration-500">
                    {lead.name.charAt(0)}
                  </div>
                  <div>
                    <span className="block text-body-md font-bold text-obsidian">{lead.name}</span>
                    <span className="text-[10px] text-muted uppercase tracking-widest">{lead.property} • {lead.value}</span>
                  </div>
                </div>
                <div className="flex items-center gap-12">
                   <div className="hidden md:block text-right">
                      <span className="block text-[10px] font-bold text-gold uppercase tracking-widest mb-1">{lead.status}</span>
                      <span className="flex items-center gap-2 text-[9px] text-muted uppercase tracking-widest">
                        <Clock className="w-3 h-3" /> {lead.date}
                      </span>
                   </div>
                   <button className="p-2 border border-border/40 hover:bg-obsidian hover:text-silk transition-all">
                      <ChevronRight className="w-4 h-4" />
                   </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Intelligence / Tasks (Right 1/3) */}
        <div className="space-y-8">
           <div className="bg-obsidian p-10 text-silk space-y-8">
              <div className="flex items-center gap-3">
                 <Calendar className="w-5 h-5 text-gold" strokeWidth={1.5} />
                 <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Upcoming Viewings</span>
              </div>
              <div className="space-y-6">
                 <div className="p-6 bg-white/5 border border-white/10 hover:border-gold/30 transition-all cursor-pointer">
                    <span className="block text-[9px] text-gold uppercase tracking-widest mb-2">Today, 14:30</span>
                    <span className="block text-body-sm font-bold mb-1 uppercase tracking-wider">Park Hall</span>
                    <span className="text-[9px] text-silk/40 uppercase tracking-widest">Viewing with Lord Harwood</span>
                 </div>
                 <div className="p-6 bg-white/5 border border-white/10 hover:border-gold/30 transition-all cursor-pointer">
                    <span className="block text-[9px] text-gold uppercase tracking-widest mb-2">Tomorrow, 10:00</span>
                    <span className="block text-body-sm font-bold mb-1 uppercase tracking-wider">Box Farm</span>
                    <span className="text-[9px] text-silk/40 uppercase tracking-widest">Initial Appraisal</span>
                 </div>
              </div>
           </div>

           <div className="bg-white border border-border/40 p-10 space-y-6">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-4">System Integrity</h3>
              <div className="flex items-center justify-between text-body-sm">
                 <span className="text-muted uppercase tracking-widest text-[9px]">Data Sync</span>
                 <span className="text-emerald font-bold uppercase tracking-widest text-[9px]">Optimal</span>
              </div>
              <div className="w-full h-1 bg-silk">
                 <div className="w-[100%] h-full bg-emerald" />
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
