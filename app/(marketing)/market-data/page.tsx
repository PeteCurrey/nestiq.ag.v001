"use client";

import { 
  TrendingUp, 
  Map as MapIcon, 
  Activity, 
  ChevronRight, 
  Download,
  Info,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Home,
  Building2,
  Calendar
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
  Area,
  BarChart,
  Bar,
  Legend
} from "recharts";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils/cn";

// --- Mock Data Series ---

const priceIndexData = [
  { month: "Jun 25", price: 278500 },
  { month: "Jul 25", price: 279200 },
  { month: "Aug 25", price: 280100 },
  { month: "Sep 25", price: 279800 },
  { month: "Oct 25", price: 281400 },
  { month: "Nov 25", price: 282500 },
  { month: "Dec 25", price: 281900 },
  { month: "Jan 26", price: 282800 },
  { month: "Feb 26", price: 283500 },
  { month: "Mar 26", price: 284200 },
  { month: "Apr 26", price: 284800 },
  { month: "May 26", price: 285472 },
];

const supplyDemandData = [
  { month: "Dec 25", instructions: 42000, sales: 31000 },
  { month: "Jan 26", instructions: 58000, sales: 38000 },
  { month: "Feb 26", instructions: 61000, sales: 42000 },
  { month: "Mar 26", instructions: 64000, sales: 45000 },
  { month: "Apr 26", instructions: 68000, sales: 48000 },
  { month: "May 26", instructions: 72000, sales: 51000 },
];

const mortgageRateData = [
  { month: "Jun 25", rate: 5.30 },
  { month: "Aug 25", rate: 5.25 },
  { month: "Oct 25", rate: 5.10 },
  { month: "Dec 25", rate: 5.05 },
  { month: "Feb 26", rate: 4.92 },
  { month: "Apr 26", rate: 4.85 },
  { month: "May 26", rate: 4.82 },
];

const rentalData = [
  { region: "London", rent: 2150 },
  { region: "South East", rent: 1450 },
  { region: "East of England", rent: 1250 },
  { region: "South West", rent: 1180 },
  { region: "West Midlands", rent: 1050 },
  { region: "North West", rent: 980 },
  { region: "East Midlands", rent: 950 },
  { region: "Yorkshire", rent: 920 },
  { region: "Scotland", rent: 890 },
  { region: "Wales", rent: 850 },
  { region: "North East", rent: 780 },
];

const regionalStats = [
  { region: "London", price: 534211, monthly: -1.2, yoy: 2.1, days: 61, yield: 4.1 },
  { region: "South East", price: 385120, monthly: 0.8, yoy: 3.2, days: 48, yield: 4.6 },
  { region: "South West", price: 318500, monthly: 1.1, yoy: 4.8, days: 45, yield: 4.9 },
  { region: "East of England", price: 342000, monthly: 0.6, yoy: 3.1, days: 50, yield: 4.5 },
  { region: "East Midlands", price: 248300, monthly: 1.8, yoy: 5.2, days: 42, yield: 5.8 },
  { region: "West Midlands", price: 242100, monthly: 1.2, yoy: 4.6, days: 44, yield: 5.6 },
  { region: "Yorkshire", price: 212500, monthly: 2.1, yoy: 6.1, days: 38, yield: 6.2 },
  { region: "North West", price: 215400, monthly: 3.4, yoy: 7.2, days: 35, yield: 6.8 },
  { region: "North East", price: 162000, monthly: 2.8, yoy: 5.9, days: 33, yield: 7.1 },
  { region: "Wales", price: 198000, monthly: 1.5, yoy: 4.3, days: 40, yield: 5.7 },
  { region: "Scotland", price: 192300, monthly: 1.5, yoy: 3.8, days: 39, yield: 5.5 },
];

export default function MarketDataPage() {
  return (
    <div className="bg-silk min-h-screen pt-48 pb-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        
        {/* Hero / KPI Strip */}
        <div className="mb-20">
           <span className="text-[10px] font-bold text-emerald uppercase tracking-[0.4em] mb-6 block">Market Analytics</span>
           <h1 className="text-display-lg font-display text-obsidian mb-8 leading-tight">
              UK Property <span className="italic font-normal">Market Intelligence</span>
           </h1>
           <p className="text-body-xl text-muted max-w-2xl leading-relaxed mb-16">
              Real-time transaction data, regional price trends, and institutional insights powered by Nestiq's proprietary data engine.
           </p>

           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-obsidian p-10 text-silk shadow-xl">
                 <p className="text-[10px] font-bold text-silk/40 uppercase tracking-[0.3em] mb-4">UK Average Asking Price</p>
                 <p className="text-display-xs font-display text-silk mb-2">£285,472</p>
                 <div className="flex items-center gap-1 text-emerald text-[10px] font-bold">
                    <ArrowUpRight className="w-3 h-3" /> ↑ 0.4% this month
                 </div>
              </div>
              <div className="bg-white p-10 border border-border/40 shadow-sm">
                 <p className="text-[10px] font-bold text-muted uppercase tracking-[0.3em] mb-4">Properties on Market</p>
                 <p className="text-display-xs font-display text-obsidian mb-2">318,000</p>
                 <div className="flex items-center gap-1 text-emerald text-[10px] font-bold">
                    <ArrowUpRight className="w-3 h-3" /> ↑ 12% vs last year
                 </div>
              </div>
              <div className="bg-white p-10 border border-border/40 shadow-sm">
                 <p className="text-[10px] font-bold text-muted uppercase tracking-[0.3em] mb-4">Average Days to Sell</p>
                 <p className="text-display-xs font-display text-obsidian mb-2">52 days</p>
                 <div className="flex items-center gap-1 text-emerald text-[10px] font-bold">
                    <ArrowDownRight className="w-3 h-3" /> ↓ 3 days vs last month
                 </div>
              </div>
              <div className="bg-white p-10 border border-border/40 shadow-sm">
                 <p className="text-[10px] font-bold text-muted uppercase tracking-[0.3em] mb-4">Average Rental Yield</p>
                 <p className="text-display-xs font-display text-obsidian mb-2">5.4%</p>
                 <div className="flex items-center gap-1 text-muted text-[10px] font-bold uppercase tracking-widest">
                    <Minus className="w-3 h-3" /> Stable
                 </div>
              </div>
           </div>
        </div>

        {/* Section 2 — UK House Price Index Chart */}
        <section className="bg-white p-12 border border-border/40 shadow-sm mb-20">
           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
              <div>
                 <h2 className="text-display-sm font-display text-obsidian mb-2">UK Average Asking Price</h2>
                 <p className="text-[10px] font-bold text-muted uppercase tracking-widest">12 Month Trend | Jun 2025 — May 2026</p>
              </div>
              <div className="flex gap-4">
                 <Button variant="secondary" size="sm" className="bg-silk text-[9px]">Export Dataset</Button>
              </div>
           </div>
           <div className="h-[450px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={priceIndexData}>
                    <defs>
                       <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#1A6B4A" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#1A6B4A" stopOpacity={0}/>
                       </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F1F1" />
                    <XAxis 
                      dataKey="month" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 10, fontWeight: 700, fill: '#9CA3AF', letterSpacing: '0.1em' }} 
                    />
                    <YAxis 
                      domain={['dataMin - 10000', 'dataMax + 10000']} 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 10, fontWeight: 700, fill: '#9CA3AF', letterSpacing: '0.1em' }} 
                      tickFormatter={(v) => `£${v/1000}k`}
                    />
                    <Tooltip 
                      formatter={(v: any) => [`£${v.toLocaleString()}`, "Avg Price"]}
                      contentStyle={{ borderRadius: '0px', border: '1px solid #E5E7EB', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}
                    />
                    <Area type="monotone" dataKey="price" stroke="#1A6B4A" strokeWidth={3} fillOpacity={1} fill="url(#colorPrice)" />
                 </AreaChart>
              </ResponsiveContainer>
           </div>
           <p className="mt-8 text-[9px] font-bold text-muted uppercase tracking-widest text-center">
             Source: Nestiq Market Intelligence | Updated May 2026
           </p>
        </section>

        {/* Section 3 — Regional Price Table */}
        <section className="mb-20 overflow-x-auto">
           <div className="bg-white border border-border/40 shadow-sm min-w-[800px]">
              <div className="p-12 border-b border-border/20">
                 <h2 className="text-display-sm font-display text-obsidian mb-2">Regional Market Velocity</h2>
                 <p className="text-[10px] font-bold text-muted uppercase tracking-widest">Comparative regional analysis — May 2026</p>
              </div>
              <table className="w-full text-left border-collapse">
                 <thead>
                    <tr className="bg-silk/50 border-b border-border/30">
                       <th className="px-12 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-muted">Region</th>
                       <th className="px-12 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-muted">Avg Price</th>
                       <th className="px-12 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-muted">Monthly</th>
                       <th className="px-12 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-muted">YoY</th>
                       <th className="px-12 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-muted">Days on Market</th>
                       <th className="px-12 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-muted">Avg Yield</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-border/30">
                    {regionalStats.map((row) => (
                       <tr key={row.region} className="hover:bg-silk/30 transition-colors">
                          <td className="px-12 py-6 text-sm font-bold text-obsidian">{row.region}</td>
                          <td className="px-12 py-6 text-sm font-display">£{row.price.toLocaleString()}</td>
                          <td className={cn(
                            "px-12 py-6 text-[10px] font-bold uppercase tracking-widest",
                            row.monthly > 0 ? "text-emerald" : row.monthly < 0 ? "text-red-500" : "text-muted"
                          )}>
                             {row.monthly > 0 ? '+' : ''}{row.monthly}%
                          </td>
                          <td className="px-12 py-6 text-[10px] font-bold uppercase tracking-widest text-obsidian">
                             {row.yoy > 0 ? '+' : ''}{row.yoy}%
                          </td>
                          <td className="px-12 py-6 text-sm text-muted">{row.days} days</td>
                          <td className="px-12 py-6 text-sm font-bold text-emerald">{row.yield}%</td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </section>

        {/* Section 4 — Two side-by-side charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
           <section className="bg-white p-12 border border-border/40 shadow-sm">
              <h3 className="text-body-lg font-bold text-obsidian uppercase tracking-widest mb-2">Supply vs Demand</h3>
              <p className="text-[10px] font-bold text-muted uppercase tracking-widest mb-10">New Instructions vs Sales Agreed</p>
              <div className="h-[350px]">
                 <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={supplyDemandData}>
                       <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F1F1" />
                       <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#9CA3AF' }} />
                       <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#9CA3AF' }} />
                       <Tooltip cursor={{ fill: '#F9FAFB' }} contentStyle={{ borderRadius: '0px', border: '1px solid #E5E7EB' }} />
                       <Legend wrapperStyle={{ paddingTop: '20px', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }} />
                       <Bar dataKey="instructions" name="New Instructions" fill="#1A6B4A" />
                       <Bar dataKey="sales" name="Sales Agreed" fill="#2ECC87" />
                    </BarChart>
                 </ResponsiveContainer>
              </div>
           </section>

           <section className="bg-white p-12 border border-border/40 shadow-sm">
              <h3 className="text-body-lg font-bold text-obsidian uppercase tracking-widest mb-2">Mortgage Rate Outlook</h3>
              <p className="text-[10px] font-bold text-muted uppercase tracking-widest mb-10">Average 2-year Fixed Rate Trend</p>
              <div className="h-[350px]">
                 <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mortgageRateData}>
                       <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F1F1" />
                       <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#9CA3AF' }} />
                       <YAxis 
                         domain={[4.5, 5.5]} 
                         axisLine={false} 
                         tickLine={false} 
                         tick={{ fontSize: 10, fontWeight: 700, fill: '#9CA3AF' }} 
                         tickFormatter={(v) => `${v}%`}
                       />
                       <Tooltip contentStyle={{ borderRadius: '0px', border: '1px solid #E5E7EB' }} />
                       <Line type="monotone" dataKey="rate" name="Interest Rate" stroke="#2ECC87" strokeWidth={3} dot={{ fill: '#2ECC87', r: 4 }} activeDot={{ r: 6 }} />
                    </LineChart>
                 </ResponsiveContainer>
              </div>
           </section>
        </div>

        {/* Section 5 — Rental Market */}
        <section className="mb-20">
           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
              <div>
                 <h2 className="text-display-sm font-display text-obsidian mb-2">Rental Market Overview</h2>
                 <p className="text-[10px] font-bold text-muted uppercase tracking-widest">Regional Rental Averages — May 2026</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                 <div className="bg-white px-8 py-4 border border-border/40">
                    <p className="text-[9px] font-bold text-muted uppercase tracking-widest mb-1">Avg UK Rent</p>
                    <p className="text-body-lg font-bold text-obsidian">£1,289/mo</p>
                 </div>
                 <div className="bg-white px-8 py-4 border border-border/40">
                    <p className="text-[9px] font-bold text-muted uppercase tracking-widest mb-1">Highest Yield</p>
                    <p className="text-body-lg font-bold text-emerald">7.1% (NE)</p>
                 </div>
                 <div className="bg-white px-8 py-4 border border-border/40">
                    <p className="text-[9px] font-bold text-muted uppercase tracking-widest mb-1">Avg Void</p>
                    <p className="text-body-lg font-bold text-obsidian">18 days</p>
                 </div>
              </div>
           </div>
           
           <div className="bg-white p-12 border border-border/40 shadow-sm">
              <div className="h-[400px] w-full">
                 <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={rentalData} layout="vertical" margin={{ left: 40 }}>
                       <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F1F1" />
                       <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#9CA3AF' }} tickFormatter={(v) => `£${v}`} />
                       <YAxis dataKey="region" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#0A0A0A' }} width={120} />
                       <Tooltip cursor={{ fill: '#F9FAFB' }} contentStyle={{ borderRadius: '0px', border: '1px solid #E5E7EB' }} />
                       <Bar dataKey="rent" name="Avg Monthly Rent" fill="#1A6B4A" radius={[0, 4, 4, 0]} />
                    </BarChart>
                 </ResponsiveContainer>
              </div>
           </div>
        </section>

        {/* Section 6 — Agent Intelligence CTA */}
        <section className="bg-obsidian p-16 md:p-24 text-silk mb-20 text-center">
           <h2 className="text-display-md font-display mb-8 italic">Get market data for your area.</h2>
           <p className="text-silk/60 max-w-2xl mx-auto text-body-lg mb-12 leading-relaxed">
             Nestiq partner agents get access to hyper-local market reports for their specific postcodes. See how your listings compare to local averages and optimize your pricing strategy.
           </p>
           <Button href="/pricing" className="bg-emerald text-white hover:bg-emerald/90 h-16 px-12 text-[11px] font-bold uppercase tracking-widest">
             Access Agent Analytics
           </Button>
        </section>

        {/* Section 7 — Monthly Market Commentary */}
        <section className="bg-white p-16 md:p-24 border border-border/40 shadow-sm">
           <div className="max-w-4xl">
              <span className="inline-flex items-center gap-3 text-emerald font-bold text-[10px] uppercase tracking-[0.4em] mb-10">
                 <Calendar className="w-4 h-4" /> May 2026 Market Commentary
              </span>
              <h2 className="text-display-sm font-display text-obsidian mb-12">The UK housing market continued its gradual recovery in May, with average asking prices rising 0.4% month-on-month to £285,472.</h2>
              <div className="prose prose-lg prose-forest text-muted space-y-8">
                 <p>
                   The North West posted the strongest regional growth at 3.4%, driven by sustained demand in Manchester and Salford. This outperformance contrasts with a more tempered 1.2% decline in London, as buyers in the capital increasingly shift focus towards high-spec developments in secondary commuter zones.
                 </p>
                 <p>
                   Mortgage stability remains the primary catalyst for market confidence. With the average 2-year fixed rate settling at 4.82%, the highest volume of sales agreed since late 2024 has been recorded. This improved liquidity is also reflected in the 'Days to Sell' metric, which has dropped to an average of 52 days nationwide.
                 </p>
                 <p>
                   In the rental sector, supply constraints continue to apply upward pressure on prices, with average rents for 2-bed properties rising 8.2% year-on-year. The North East remains a focal point for yield-seeking investors, offering an average gross yield of 7.1%, significantly outpacing the national average of 5.4%.
                 </p>
              </div>
              <div className="mt-16 pt-12 border-t border-border/20 flex items-center justify-between">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-forest flex items-center justify-center text-white font-display font-bold">NI</div>
                    <div>
                       <p className="text-sm font-bold text-obsidian">Nestiq Intelligence Team</p>
                       <p className="text-[10px] text-muted uppercase tracking-widest">Data Analyst Division</p>
                    </div>
                 </div>
                 <p className="text-[9px] font-bold text-muted uppercase tracking-widest">Ref: MKT-INT-2026-05</p>
              </div>
           </div>
        </section>
      </div>
    </div>
  );
}
