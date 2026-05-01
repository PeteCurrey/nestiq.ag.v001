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
    <div className="bg-silk min-h-screen pt-48 pb-32">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">
        <div className="mb-24">
           <span className="text-[10px] font-bold text-gold uppercase tracking-[0.4em] mb-6 block">Market Analytics</span>
           <h1 className="text-display-lg font-display text-obsidian mb-8 leading-tight">
              UK Property <span className="italic font-normal">Market Intelligence</span>
           </h1>
           <p className="text-body-xl text-muted max-w-2xl leading-relaxed">
              Real-time transaction data, regional price trends, and institutional 
              investor insights powered by Nestiq's proprietary data engine.
           </p>
        </div>

        {/* Core Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
           {/* Chart */}
           <div className="lg:col-span-8 bg-white p-12 border border-border/40 shadow-sm">
              <div className="flex justify-between items-center mb-12">
                 <div>
                    <h3 className="text-body-lg font-bold text-obsidian uppercase tracking-widest mb-2">UK House Price Index</h3>
                    <p className="text-[10px] font-bold text-muted uppercase tracking-widest">Average property value / 5-Year Horizon</p>
                 </div>
                 <Button variant="secondary" size="sm" className="bg-silk text-obsidian border border-border/40 hover:bg-gold hover:text-silk transition-all duration-500">
                    <Download className="w-4 h-4 mr-2" /> Export Dataset
                 </Button>
              </div>
              <div className="h-[450px] w-full">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                       <defs>
                          <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#C5A059" stopOpacity={0.1}/>
                             <stop offset="95%" stopColor="#C5A059" stopOpacity={0}/>
                          </linearGradient>
                       </defs>
                       <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F1F1" />
                       <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#9CA3AF', letterSpacing: '0.1em' }} />
                       <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#9CA3AF', letterSpacing: '0.1em' }} tickFormatter={(v) => `£${v/1000}k`} />
                       <Tooltip 
                         formatter={(v: any) => [`£${v.toLocaleString()}`, "Avg Price"]}
                         contentStyle={{ borderRadius: '0px', border: '1px solid #E5E7EB', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}
                       />
                       <Area type="monotone" dataKey="price" stroke="#C5A059" strokeWidth={3} fillOpacity={1} fill="url(#colorPrice)" />
                    </AreaChart>
                 </ResponsiveContainer>
              </div>
           </div>

           {/* Regional Ticker */}
           <div className="lg:col-span-4 bg-obsidian p-12 text-silk">
              <h3 className="text-[10px] font-bold mb-12 uppercase tracking-[0.4em] text-gold">Regional Velocity</h3>
              <div className="space-y-8">
                 {regions.map((region) => (
                    <div key={region.name} className="flex justify-between items-center py-6 border-b border-silk/10 last:border-0 group cursor-default">
                       <div>
                          <p className="text-[10px] font-bold text-silk/40 uppercase tracking-widest mb-2 group-hover:text-gold transition-colors">{region.name}</p>
                          <p className="text-display-xs font-display font-medium text-silk">{region.price}</p>
                       </div>
                       <div className={cn(
                         "text-[10px] font-bold uppercase tracking-widest px-4 py-2",
                         region.status === 'up' ? "bg-emerald/10 text-emerald" : "bg-red-400/10 text-red-400"
                       )}>
                          {region.trend}
                       </div>
                    </div>
                 ))}
              </div>
              <Button variant="ghost" fullWidth className="mt-12 text-silk hover:bg-white/5 border border-white/10 rounded-none text-[10px] font-bold uppercase tracking-widest">
                 Full Regional Analysis <ChevronRight className="ml-2 w-4 h-4" />
              </Button>
           </div>
        </div>

        {/* Market Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
           {[
             { title: "Supply & Demand", text: "New instructions are up 12% MoM, indicating a cooling market with more choice for buyers.", icon: <Activity className="w-5 h-5" /> },
             { title: "Rental Yields", text: "North West regions continue to offer the highest yields, averaging 6.8% for 2-bed flats.", icon: <TrendingUp className="w-5 h-5" /> },
             { title: "Market Sentiment", text: "72% of buyers surveyed believe now is a good time to buy following the interest rate pause.", icon: <Info className="w-5 h-5" /> },
           ].map((item, i) => (
             <div key={i} className="bg-white p-12 border border-border/40 shadow-sm hover:border-gold/30 transition-all duration-500">
                <div className="w-12 h-12 bg-silk border border-border/40 flex items-center justify-center text-gold mb-8">
                   {item.icon}
                </div>
                <h4 className="text-body-lg font-bold text-obsidian uppercase tracking-wider mb-4">{item.title}</h4>
                <p className="text-body-sm text-muted leading-relaxed">{item.text}</p>
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

