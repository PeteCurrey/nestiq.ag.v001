"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Users, 
  Eye, 
  MessageSquare, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  Home,
  CheckCircle2,
  Clock
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";

const data = [
  { name: "Mon", views: 4000, leads: 24 },
  { name: "Tue", views: 3000, leads: 13 },
  { name: "Wed", views: 2000, leads: 98 },
  { name: "Thu", views: 2780, leads: 39 },
  { name: "Fri", views: 1890, leads: 48 },
  { name: "Sat", views: 2390, leads: 38 },
  { name: "Sun", views: 3490, leads: 43 },
];

const kpis = [
  { label: "Active Listings", value: "24", icon: <Home />, trend: "+2 this month", trendUp: true },
  { label: "Total Views", value: "12.4k", icon: <Eye />, trend: "+14.2%", trendUp: true },
  { label: "New Enquiries", value: "86", icon: <MessageSquare />, trend: "-4.1%", trendUp: false },
  { label: "Lead Conversion", value: "18.2%", icon: <TrendingUp />, trend: "+2.4%", trendUp: true },
];

const recentLeads = [
  { id: "1", name: "Alice Johnson", property: "The Ash Manor", time: "2 mins ago", status: "New" },
  { id: "2", name: "David Smith", property: "Vanguard Penthouse", time: "1 hour ago", status: "Viewing Requested" },
  { id: "3", name: "Sarah Williams", property: "Modern Townhouse", time: "3 hours ago", status: "Follow-up" },
  { id: "4", name: "James Brown", property: "Eco Development", time: "5 hours ago", status: "New" },
];

export default function AgentOverview() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-end">
         <div>
            <h1 className="text-display-sm font-display font-black text-obsidian mb-2">Agency Overview</h1>
            <p className="text-body-md text-muted">Welcome back, Pete. Here's how Savills Chelsea is performing today.</p>
         </div>
         <Button variant="primary">
            Download Report
         </Button>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {kpis.map((kpi, i) => (
            <motion.div 
              key={kpi.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-2xl border border-border shadow-sm"
            >
               <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 rounded-lg bg-forest/5 flex items-center justify-center text-forest">
                     {kpi.icon}
                  </div>
                  <div className={cn(
                    "flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest",
                    kpi.trendUp ? "text-emerald" : "text-red-500"
                  )}>
                    {kpi.trendUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {kpi.trend}
                  </div>
               </div>
               <p className="text-display-sm font-display font-extrabold text-obsidian">{kpi.value}</p>
               <p className="text-label font-bold text-muted uppercase tracking-widest mt-1">{kpi.label}</p>
            </motion.div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         {/* Analytics Chart */}
         <div className="lg:col-span-8 bg-white p-8 rounded-2xl border border-border shadow-sm">
            <div className="flex justify-between items-center mb-8">
               <h3 className="text-body-lg font-bold text-obsidian uppercase tracking-widest">Listing Performance</h3>
               <div className="flex bg-warm rounded-md p-1">
                  <button className="px-3 py-1 text-xs font-bold bg-white rounded shadow-sm">7 Days</button>
                  <button className="px-3 py-1 text-xs font-bold text-muted">30 Days</button>
               </div>
            </div>
            <div className="h-[350px] w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                     <defs>
                        <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#1A6B4A" stopOpacity={0.1}/>
                           <stop offset="95%" stopColor="#1A6B4A" stopOpacity={0}/>
                        </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                     <XAxis 
                       dataKey="name" 
                       axisLine={false} 
                       tickLine={false} 
                       tick={{ fontSize: 10, fontWeight: 700, fill: '#9CA3AF' }} 
                       dy={10}
                     />
                     <YAxis 
                       axisLine={false} 
                       tickLine={false} 
                       tick={{ fontSize: 10, fontWeight: 700, fill: '#9CA3AF' }} 
                     />
                     <Tooltip 
                       contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                     />
                     <Area 
                       type="monotone" 
                       dataKey="views" 
                       stroke="#1A6B4A" 
                       strokeWidth={3}
                       fillOpacity={1} 
                       fill="url(#colorViews)" 
                     />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </div>

         {/* Recent Leads */}
         <div className="lg:col-span-4 bg-white p-8 rounded-2xl border border-border shadow-sm overflow-hidden flex flex-col">
            <div className="flex justify-between items-center mb-8">
               <h3 className="text-body-lg font-bold text-obsidian uppercase tracking-widest">Recent Leads</h3>
               <Link href="/agent/leads" className="text-xs font-bold text-forest hover:text-emerald transition-colors">View All</Link>
            </div>
            <div className="space-y-6 flex-1">
               {recentLeads.map((lead) => (
                  <div key={lead.id} className="flex items-start gap-4 group">
                     <div className="w-10 h-10 rounded-full bg-warm flex items-center justify-center text-forest font-bold text-xs flex-shrink-0">
                        {lead.name.split(' ').map(n => n[0]).join('')}
                     </div>
                     <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-0.5">
                           <p className="text-body-sm font-bold text-obsidian truncate group-hover:text-forest transition-colors">{lead.name}</p>
                           <span className="text-[10px] font-bold text-muted uppercase flex items-center gap-1">
                              <Clock className="w-2.5 h-2.5" />
                              {lead.time}
                           </span>
                        </div>
                        <p className="text-[11px] text-muted truncate mb-2">Interested in: <span className="text-obsidian font-medium">{lead.property}</span></p>
                        <div className="flex items-center gap-2">
                           <span className={cn(
                             "px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider",
                             lead.status === "New" ? "bg-emerald/10 text-emerald" : "bg-warm text-muted"
                           )}>
                             {lead.status}
                           </span>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
            <Button variant="outline" size="sm" className="mt-8">
               Manage Pipeline
            </Button>
         </div>
      </div>

      {/* Listing Status Bar */}
      <div className="bg-obsidian p-8 rounded-2xl text-white">
         <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
               <div className="text-center px-6 border-r border-white/10">
                  <p className="text-display-sm font-display font-black text-emerald">18</p>
                  <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Active</p>
               </div>
               <div className="text-center px-6 border-r border-white/10">
                  <p className="text-display-sm font-display font-black text-white">4</p>
                  <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Under Offer</p>
               </div>
               <div className="text-center px-6">
                  <p className="text-display-sm font-display font-black text-white/40">2</p>
                  <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Archived</p>
               </div>
            </div>
            <div className="flex flex-col md:items-end">
               <p className="text-body-md font-medium text-white/60 mb-2">You have <span className="text-white font-bold">7 listing slots</span> remaining on your Growth plan.</p>
               <Link href="/agent/billing" className="text-emerald text-xs font-bold uppercase tracking-widest hover:underline transition-all">Upgrade Plan →</Link>
            </div>
         </div>
      </div>
    </div>
  );
}


