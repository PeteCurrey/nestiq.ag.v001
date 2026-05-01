"use client";

import { 
  TrendingUp, 
  Map as MapIcon, 
  Activity, 
  ChevronRight, 
  Download,
  Info
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
import { Badge } from "@/components/ui/Badge";

const data = [
  { year: "2020", price: 235000 },
  { year: "2021", price: 258000 },
  { year: "2022", price: 282000 },
  { year: "2023", price: 275000 },
  { year: "2024", price: 285472 },
];

const regions = [
  { name: "London", price: "£534,211", trend: "-1.2%", status: "down" },
  { name: "South East", price: "£385,120", trend: "+0.8%", status: "up" },
  { name: "North West", price: "£215,400", trend: "+3.4%", status: "up" },
  { name: "West Midlands", price: "£242,100", trend: "+1.2%", status: "up" },
  { name: "Yorkshire", price: "£212,500", trend: "+2.1%", status: "up" },
  { name: "Scotland", price: "£192,300", trend: "+1.5%", status: "up" },
];

export default function MarketDataPage() {
  return (
    <div className="bg-pearl min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-16">
           <h1 className="text-display-lg font-display font-extrabold text-obsidian mb-6">UK Property <span className="text-forest">Market Intelligence</span></h1>
           <p className="text-body-xl text-muted max-w-2xl leading-relaxed">
              Real-time transaction data, regional price trends, and investor insights 
              powered by Nestiq's proprietary data engine.
           </p>
        </div>

        {/* Core Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
           {/* Chart */}
           <div className="lg:col-span-8 bg-white p-10 rounded-3xl border border-border shadow-sm">
              <div className="flex justify-between items-center mb-10">
                 <div>
                    <h3 className="text-body-lg font-display font-bold text-obsidian uppercase tracking-widest mb-1">UK House Price Index</h3>
                    <p className="text-body-sm text-muted">Average property value over the last 5 years</p>
                 </div>
                 <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" /> Export Data
                 </Button>
              </div>
              <div className="h-[400px] w-full">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                       <defs>
                          <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#1A6B4A" stopOpacity={0.1}/>
                             <stop offset="95%" stopColor="#1A6B4A" stopOpacity={0}/>
                          </linearGradient>
                       </defs>
                       <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                       <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 700, fill: '#9CA3AF' }} />
                       <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 700, fill: '#9CA3AF' }} tickFormatter={(v) => `£${v/1000}k`} />
                       <Tooltip 
                         formatter={(v: any) => [`£${v.toLocaleString()}`, "Avg Price"]}
                         contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                       />
                       <Area type="monotone" dataKey="price" stroke="#1A6B4A" strokeWidth={4} fillOpacity={1} fill="url(#colorPrice)" />
                    </AreaChart>
                 </ResponsiveContainer>
              </div>
           </div>

           {/* Regional Ticker */}
           <div className="lg:col-span-4 bg-obsidian p-10 rounded-3xl text-white">
              <h3 className="text-body-lg font-display font-bold mb-8 uppercase tracking-widest text-emerald">Regional Performance</h3>
              <div className="space-y-6">
                 {regions.map((region) => (
                    <div key={region.name} className="flex justify-between items-center py-4 border-b border-white/10 last:border-0">
                       <div>
                          <p className="text-body-sm font-bold text-white mb-1">{region.name}</p>
                          <p className="text-display-xs font-display font-bold text-white">{region.price}</p>
                       </div>
                       <div className={cn(
                         "flex items-center gap-1 text-xs font-black px-3 py-1 rounded-full",
                         region.status === 'up' ? "bg-emerald/10 text-emerald" : "bg-red-400/10 text-red-400"
                       )}>
                          {region.trend}
                       </div>
                    </div>
                 ))}
              </div>
              <Button variant="ghost" fullWidth className="mt-8 text-white hover:bg-white/5 border border-white/10">
                 View All Regions <ChevronRight className="ml-2 w-4 h-4" />
              </Button>
           </div>
        </div>

        {/* Market Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {[
             { title: "Supply & Demand", text: "New instructions are up 12% MoM, indicating a cooling market with more choice for buyers.", icon: <Activity /> },
             { title: "Rental Yields", text: "North West regions continue to offer the highest yields, averaging 6.8% for 2-bed flats.", icon: <TrendingUp /> },
             { title: "Market Sentiment", text: "72% of buyers surveyed believe now is a good time to buy following the interest rate pause.", icon: <Info /> },
           ].map((item, i) => (
             <div key={i} className="bg-white p-8 rounded-2xl border border-border shadow-sm">
                <div className="w-12 h-12 bg-forest/5 rounded-xl flex items-center justify-center text-forest mb-6">
                   {item.icon}
                </div>
                <h4 className="text-body-lg font-display font-bold text-obsidian mb-4">{item.title}</h4>
                <p className="text-body-md text-muted leading-relaxed">{item.text}</p>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
