"use client";

import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Users, 
  Eye, 
  MessageSquare,
  Sparkles,
  ChevronDown,
  Info
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { Button } from "@/components/ui/Button";

const channelData = [
  { name: "Direct Search", value: 45 },
  { name: "Google Organic", value: 30 },
  { name: "Social Media", value: 15 },
  { name: "Email Alerts", value: 10 },
];

const COLORS = ['#1A6B4A', '#2ECC87', '#0A0A0A', '#9CA3AF'];

const benchmarkData = [
  { name: "Avg. Days to Sale", you: 24, market: 42 },
  { name: "Leads per Listing", you: 18, market: 12 },
  { name: "View to Lead %", you: 4.2, market: 3.1 },
];

export default function AgentAnalyticsPage() {
  return (
    <div className="space-y-12">
      <div className="flex justify-between items-end">
         <div>
            <h1 className="text-display-sm font-display font-black text-obsidian mb-2">Performance Analytics</h1>
            <p className="text-body-md text-muted">Deep dive into your agency's market performance and listing engagement.</p>
         </div>
         <div className="flex bg-white rounded-xl border border-border p-1">
            <button className="px-4 py-2 text-xs font-bold bg-warm rounded-lg text-forest shadow-sm">Last 30 Days</button>
            <button className="px-4 py-2 text-xs font-bold text-muted">Last Quarter</button>
            <button className="px-4 py-2 text-xs font-bold text-muted">Year to Date</button>
         </div>
      </div>

      {/* AI Insights Panel */}
      <div className="bg-emerald/5 border border-emerald/10 p-10 rounded-3xl relative overflow-hidden">
         <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-center">
            <div className="flex-1">
               <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald text-obsidian rounded-full mb-6">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Nestiq Intelligence</span>
               </div>
               <h2 className="text-display-sm font-display font-bold text-obsidian mb-4">AI Market Insights</h2>
               <p className="text-body-lg text-obsidian/70 leading-relaxed mb-8">
                  Your agency is outperforming the Chelsea market by <span className="text-forest font-bold">18.4% in speed-to-sale</span>. 
                  However, engagement on 4-bedroom properties has dropped slightly. 
                  We recommend refreshing photos for "The Ash Manor" to recapture interest.
               </p>
               <div className="flex gap-4">
                  <Button variant="primary" size="md">Apply Recommendations</Button>
                  <Button variant="ghost" size="md" className="text-forest">View Detailed Audit</Button>
               </div>
            </div>
            <div className="w-full lg:w-[400px] bg-white rounded-2xl p-8 shadow-xl border border-emerald/10">
               <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-emerald/10 rounded-xl flex items-center justify-center text-emerald">
                     <Target className="w-6 h-6" />
                  </div>
                  <div>
                     <p className="text-label font-bold text-muted uppercase tracking-widest">Market Score</p>
                     <p className="text-display-xs font-display font-black text-obsidian">9.4 / 10</p>
                  </div>
               </div>
               <div className="space-y-4">
                  <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-muted">
                     <span>Price Accuracy</span>
                     <span className="text-emerald">98%</span>
                  </div>
                  <div className="h-1.5 bg-warm rounded-full overflow-hidden">
                     <div className="h-full bg-emerald w-[98%]" />
                  </div>
                  <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-muted">
                     <span>Lead Quality</span>
                     <span className="text-emerald">86%</span>
                  </div>
                  <div className="h-1.5 bg-warm rounded-full overflow-hidden">
                     <div className="h-full bg-emerald w-[86%]" />
                  </div>
               </div>
            </div>
         </div>
         {/* Background Decor */}
         <div className="absolute top-0 right-0 w-80 h-80 bg-emerald/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         {/* Channel Distribution */}
         <div className="bg-white p-8 rounded-2xl border border-border shadow-sm">
            <h3 className="text-body-lg font-bold text-obsidian uppercase tracking-widest mb-8">Traffic Sources</h3>
            <div className="h-[300px] flex items-center justify-center">
               <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                     <Pie
                       data={channelData}
                       innerRadius={60}
                       outerRadius={100}
                       paddingAngle={5}
                       dataKey="value"
                     >
                        {channelData.map((entry, index) => (
                           <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                     </Pie>
                     <Tooltip />
                  </PieChart>
               </ResponsiveContainer>
               <div className="flex flex-col gap-4">
                  {channelData.map((c, i) => (
                    <div key={c.name} className="flex items-center gap-2">
                       <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                       <span className="text-xs font-bold text-muted uppercase tracking-widest">{c.name}</span>
                    </div>
                  ))}
               </div>
            </div>
         </div>

         {/* Market Benchmarking */}
         <div className="bg-white p-8 rounded-2xl border border-border shadow-sm">
            <h3 className="text-body-lg font-bold text-obsidian uppercase tracking-widest mb-8">Market Benchmarking</h3>
            <div className="space-y-10">
               {benchmarkData.map((b) => (
                  <div key={b.name}>
                     <div className="flex justify-between items-center mb-3">
                        <p className="text-body-sm font-bold text-obsidian">{b.name}</p>
                        <div className="flex gap-4">
                           <span className="text-xs font-bold text-forest uppercase tracking-widest">You: {b.you}</span>
                           <span className="text-xs font-bold text-muted uppercase tracking-widest">Market: {b.market}</span>
                        </div>
                     </div>
                     <div className="h-2 bg-warm rounded-full overflow-hidden flex">
                        <div className="h-full bg-forest" style={{ width: `${(b.you / (b.you + b.market)) * 100}%` }} />
                        <div className="h-full bg-subtle/20" style={{ width: `${(b.market / (b.you + b.market)) * 100}%` }} />
                     </div>
                  </div>
               ))}
            </div>
            <div className="mt-12 p-6 bg-warm/30 rounded-xl border border-border flex items-start gap-4">
               <Info className="w-5 h-5 text-subtle" />
               <p className="text-xs text-muted leading-relaxed">
                  Market benchmarks are calculated using anonymized data from 120+ agencies operating within a 5-mile radius of Chelsea, SW3.
               </p>
            </div>
         </div>
      </div>
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
