"use client";

import React from "react";
import { 
  Plus, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Home, 
  MessageSquare, 
  Eye,
  ArrowRight,
  AlertCircle,
  RefreshCw
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";
import { Button } from "@/components/ui/Button";

const viewData = [
  { date: "Apr 24", views: 420 },
  { date: "Apr 25", views: 580 },
  { date: "Apr 26", views: 510 },
  { date: "Apr 27", views: 720 },
  { date: "Apr 28", views: 890 },
  { date: "Apr 29", views: 940 },
  { date: "Apr 30", views: 820 },
];

const enquiryData = [
  { date: "Apr 24", count: 12 },
  { date: "Apr 25", count: 18 },
  { date: "Apr 26", count: 15 },
  { date: "Apr 27", count: 22 },
  { date: "Apr 28", count: 28 },
  { date: "Apr 29", count: 32 },
  { date: "Apr 30", count: 26 },
];

const recentLeads = [
  { id: 1, property: "Walton Back Lane", enquirer: "Sarah Jenkins", date: "2 mins ago", status: "New", score: 9 },
  { id: 2, property: "Parkhall Lane", enquirer: "Mark Thompson", date: "1 hour ago", status: "Replied", score: 8 },
  { id: 3, property: "Chesterfield Road", enquirer: "James Wilson", date: "3 hours ago", status: "Viewing", score: 7 },
  { id: 4, property: "Northedge Lane", enquirer: "Emma Davis", date: "5 hours ago", status: "New", score: 10 },
];

export default function AgentDashboard() {
  return (
    <div className="p-8 lg:p-12 space-y-12">
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-display-sm font-display font-bold text-obsidian uppercase tracking-tight">Good morning, Pete</h1>
          <p className="text-muted text-sm mt-1">Friday, 1st May 2026</p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-none h-14 px-8 uppercase tracking-widest text-[10px] font-bold">
          <Plus className="w-4 h-4 mr-2" />
          Add Listing
        </Button>
      </div>

      {/* Compliance Alert */}
      <div className="bg-amber-50 border border-amber-200 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600" />
          <p className="text-sm text-amber-900 font-medium">3 listings have missing compliance information. <span className="underline cursor-pointer">Review now</span></p>
        </div>
        <button className="text-amber-400 hover:text-amber-600">
           <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Active Listings" value="52" subtext="41 for sale / 11 to rent" trend="+3" trendUp={true} icon={Home} />
        <StatCard title="Enquiries This Month" value="248" subtext="12 unread" trend="+14%" trendUp={true} icon={MessageSquare} />
        <StatCard title="Avg Days on Market" value="18" subtext="vs 24 day market average" trend="-4" trendUp={true} icon={TrendingUp} />
        <StatCard title="Listing Views" value="12.4k" subtext="+1,240 this week" trend="+8%" trendUp={true} icon={Eye} />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white border border-border/40 p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-sm font-bold uppercase tracking-widest text-obsidian">Listing Views</h3>
            <select className="text-[10px] font-bold uppercase tracking-widest bg-transparent border-none focus:outline-none">
              <Last>Last 30 Days</Last>
            </select>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={viewData}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2ECC87" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#2ECC87" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0F0" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#A0A0A0'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#A0A0A0'}} />
                <Tooltip />
                <Area type="monotone" dataKey="views" stroke="#2ECC87" strokeWidth={2} fillOpacity={1} fill="url(#colorViews)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white border border-border/40 p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-sm font-bold uppercase tracking-widest text-obsidian">Enquiries</h3>
            <select className="text-[10px] font-bold uppercase tracking-widest bg-transparent border-none focus:outline-none">
              <Last>Last 30 Days</Last>
            </select>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={enquiryData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0F0" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#A0A0A0'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#A0A0A0'}} />
                <Tooltip />
                <Bar dataKey="count" fill="#1A6B4A" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Leads Table */}
      <div className="bg-white border border-border/40 overflow-hidden">
        <div className="p-8 border-b border-border/40 flex items-center justify-between">
           <h3 className="text-sm font-bold uppercase tracking-widest text-obsidian">Recent Leads</h3>
           <Link href="/agent/leads" className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 hover:text-emerald-700 flex items-center gap-2 transition-colors">
             View All Leads <ArrowRight className="w-3 h-3" />
           </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-silk/50 border-b border-border/40">
                <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-muted">Property</th>
                <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-muted">Enquirer</th>
                <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-muted">Date</th>
                <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-muted">Status</th>
                <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-muted text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {recentLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-silk/30 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-silk border border-border/40" />
                      <span className="text-sm font-bold text-obsidian">{lead.property}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-sm text-obsidian font-medium">{lead.enquirer}</td>
                  <td className="px-8 py-6 text-sm text-muted">{lead.date}</td>
                  <td className="px-8 py-6">
                    <span className={cn(
                      "px-3 py-1 text-[10px] font-bold uppercase tracking-wider",
                      lead.status === "New" ? "bg-red-100 text-red-600" :
                      lead.status === "Replied" ? "bg-blue-100 text-blue-600" :
                      "bg-emerald-100 text-emerald-600"
                    )}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 hover:underline">
                      Reply
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, subtext, trend, trendUp, icon: Icon }: any) {
  return (
    <div className="bg-white border border-border/40 p-8 space-y-4">
      <div className="flex items-center justify-between">
        <div className="w-10 h-10 bg-silk border border-border/40 flex items-center justify-center">
          <Icon className="w-4 h-4 text-obsidian" />
        </div>
        <div className={cn(
          "flex items-center gap-1 text-[10px] font-bold",
          trendUp ? "text-emerald-600" : "text-red-500"
        )}>
          {trendUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {trend}
        </div>
      </div>
      <div>
        <h3 className="text-[10px] font-bold text-muted uppercase tracking-[0.2em] mb-1">{title}</h3>
        <p className="text-4xl font-display font-bold text-obsidian">{value}</p>
        <p className="text-[10px] font-medium text-muted/60 mt-2 uppercase tracking-wider">{subtext}</p>
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}

function Last({ children }: any) {
  return <option>{children}</option>;
}
