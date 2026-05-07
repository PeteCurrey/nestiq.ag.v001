"use client";

import { useState } from "react";
import { Calculator, ArrowRight, TrendingDown, CheckCircle2, Info } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";

export default function PortalCostCalculatorPage() {
  const [branches, setBranches] = useState(1);
  const [rightmoveSpend, setRightmoveSpend] = useState(1200);
  const [zooplaSpend, setZooplaSpend] = useState(800);
  const [otmSpend, setOtmSpend] = useState(400);
  const [otherSpend, setOtherSpend] = useState(200);
  const [softwareSpend, setSoftwareSpend] = useState(500); // CRM, Website, etc.

  // NestIQ Pricing Logic (Demo)
  // Assuming £299 flat per branch for NestIQ + £100 software
  const nestiqMonthly = (branches * 299) + softwareSpend;

  const currentMonthly = (rightmoveSpend + zooplaSpend + otmSpend + otherSpend) * branches + softwareSpend;
  const currentAnnual = currentMonthly * 12;
  const nestiqAnnual = nestiqMonthly * 12;
  
  const annualSavings = currentAnnual - nestiqAnnual;
  const fiveYearSavings = annualSavings * 5;

  return (
    <div className="bg-silk min-h-screen">
      {/* Hero */}
      <section className="pt-32 pb-16 px-6 md:px-12 bg-obsidian text-white text-center">
         <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald/10 mb-8 border border-emerald/20">
               <Calculator className="w-8 h-8 text-emerald" />
            </div>
            <h1 className="text-[clamp(2rem,4vw,3.5rem)] font-display leading-[1.1] mb-6">
              Compare Your <br/> <span className="italic font-normal text-emerald">Portal Costs.</span>
            </h1>
            <p className="text-body-lg text-silk/70 max-w-xl mx-auto">
              Use our strategic financial tool to understand the true annual cost of your current portal and software stack, and see how much you could save by switching to the NestIQ ecosystem.
            </p>
         </div>
      </section>

      {/* Calculator Interface */}
      <section className="py-20 px-6 md:px-12 max-w-[1400px] mx-auto">
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            
            {/* Input Form */}
            <div className="lg:col-span-5 space-y-12">
               <div className="bg-white p-8 border border-border/40 shadow-sm">
                  <h3 className="text-body-xl font-display text-obsidian mb-8 border-b border-border/30 pb-4">Agency Details</h3>
                  
                  <div className="space-y-8">
                     <div className="space-y-4">
                        <div className="flex justify-between items-center">
                           <label className="text-[10px] font-bold uppercase tracking-widest text-muted">Number of Branches</label>
                           <span className="text-body-lg font-bold text-obsidian">{branches}</span>
                        </div>
                        <input 
                           type="range" min="1" max="20" step="1" 
                           value={branches} onChange={(e) => setBranches(parseInt(e.target.value))}
                           className="w-full accent-emerald"
                        />
                     </div>
                  </div>
               </div>

               <div className="bg-white p-8 border border-border/40 shadow-sm">
                  <h3 className="text-body-xl font-display text-obsidian mb-8 border-b border-border/30 pb-4 flex items-center gap-2">
                    Current Monthly Spend <span className="text-[10px] font-normal tracking-normal text-muted">(Per Branch)</span>
                  </h3>
                  
                  <div className="space-y-6">
                     <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-muted">Rightmove Spend</label>
                        <div className="relative">
                           <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted font-bold">£</span>
                           <input type="number" value={rightmoveSpend} onChange={(e) => setRightmoveSpend(parseInt(e.target.value) || 0)} className="w-full bg-pearl border-none pl-10 pr-4 py-4 text-body-sm font-bold text-obsidian outline-none focus:ring-1 focus:ring-emerald/40" />
                        </div>
                     </div>

                     <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-muted">Zoopla Spend</label>
                        <div className="relative">
                           <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted font-bold">£</span>
                           <input type="number" value={zooplaSpend} onChange={(e) => setZooplaSpend(parseInt(e.target.value) || 0)} className="w-full bg-pearl border-none pl-10 pr-4 py-4 text-body-sm font-bold text-obsidian outline-none focus:ring-1 focus:ring-emerald/40" />
                        </div>
                     </div>

                     <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-muted">OnTheMarket Spend</label>
                        <div className="relative">
                           <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted font-bold">£</span>
                           <input type="number" value={otmSpend} onChange={(e) => setOtmSpend(parseInt(e.target.value) || 0)} className="w-full bg-pearl border-none pl-10 pr-4 py-4 text-body-sm font-bold text-obsidian outline-none focus:ring-1 focus:ring-emerald/40" />
                        </div>
                     </div>

                     <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-muted flex items-center justify-between">
                          Other Software Spend
                          <div className="group relative cursor-pointer">
                            <Info className="w-3 h-3 text-muted" />
                            <div className="absolute right-0 bottom-full mb-2 w-48 bg-obsidian text-silk text-[10px] p-2 rounded hidden group-hover:block z-10 normal-case tracking-normal font-normal">
                              CRM, Website hosting, Lead nurture, Valuation tools, etc.
                            </div>
                          </div>
                        </label>
                        <div className="relative">
                           <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted font-bold">£</span>
                           <input type="number" value={softwareSpend} onChange={(e) => setSoftwareSpend(parseInt(e.target.value) || 0)} className="w-full bg-pearl border-none pl-10 pr-4 py-4 text-body-sm font-bold text-obsidian outline-none focus:ring-1 focus:ring-emerald/40" />
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {/* Results Panel */}
            <div className="lg:col-span-7 lg:sticky lg:top-32">
               <div className="bg-obsidian text-white border border-white/10 overflow-hidden shadow-2xl">
                  {/* Total Comparison */}
                  <div className="p-8 md:p-12 border-b border-white/10">
                     <span className="text-[10px] font-bold text-emerald uppercase tracking-[0.5em] block mb-8">Financial Projection</span>
                     
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                        <div>
                           <p className="text-[10px] font-bold text-muted uppercase tracking-widest mb-2">Current Annual Spend</p>
                           <p className="text-display-sm font-display text-white/50 line-through decoration-white/20">£{currentAnnual.toLocaleString()}</p>
                        </div>
                        <div>
                           <p className="text-[10px] font-bold text-emerald uppercase tracking-widest mb-2">NestIQ Annual Spend</p>
                           <p className="text-display-sm font-display text-white">£{nestiqAnnual.toLocaleString()}</p>
                        </div>
                     </div>

                     <div className="bg-emerald/10 border border-emerald/20 p-8 rounded-xl flex items-center justify-between">
                        <div>
                          <p className="text-[10px] font-bold text-emerald uppercase tracking-widest mb-1">Projected Annual Savings</p>
                          <p className="text-display-sm font-display text-emerald">£{annualSavings.toLocaleString()}</p>
                        </div>
                        <TrendingDown className="w-12 h-12 text-emerald opacity-50" />
                     </div>
                  </div>

                  {/* 5 Year Outlook */}
                  <div className="p-8 md:p-12 bg-white/5">
                     <h4 className="text-body-lg font-display mb-6">5-Year Strategic Outlook</h4>
                     <p className="text-sm text-silk/60 leading-relaxed mb-8">
                       Assuming standard portal fee increases of 8% YoY, maintaining your current stack will compound your financial exposure. Switching to NestIQ's flat-rate model provides long-term stability.
                     </p>
                     
                     <div className="flex items-end gap-4 h-48 mb-8 border-b border-white/10 pb-4">
                        {/* Fake chart data based on calculation */}
                        <div className="flex-1 flex flex-col justify-end items-center gap-2 group">
                          <span className="text-[9px] text-white/40 opacity-0 group-hover:opacity-100 transition-opacity">Year 1</span>
                          <div className="w-full bg-white/10 rounded-t-sm" style={{ height: '40%' }} />
                        </div>
                        <div className="flex-1 flex flex-col justify-end items-center gap-2 group">
                          <span className="text-[9px] text-white/40 opacity-0 group-hover:opacity-100 transition-opacity">Year 2</span>
                          <div className="w-full bg-white/20 rounded-t-sm" style={{ height: '50%' }} />
                        </div>
                        <div className="flex-1 flex flex-col justify-end items-center gap-2 group">
                          <span className="text-[9px] text-white/40 opacity-0 group-hover:opacity-100 transition-opacity">Year 3</span>
                          <div className="w-full bg-white/30 rounded-t-sm" style={{ height: '65%' }} />
                        </div>
                        <div className="flex-1 flex flex-col justify-end items-center gap-2 group">
                          <span className="text-[9px] text-white/40 opacity-0 group-hover:opacity-100 transition-opacity">Year 4</span>
                          <div className="w-full bg-white/40 rounded-t-sm" style={{ height: '80%' }} />
                        </div>
                        <div className="flex-1 flex flex-col justify-end items-center gap-2 group">
                          <span className="text-[9px] text-white/40 opacity-0 group-hover:opacity-100 transition-opacity">Year 5</span>
                          <div className="w-full bg-emerald rounded-t-sm relative shadow-[0_0_20px_rgba(46,204,135,0.4)]" style={{ height: '100%' }}>
                             <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-obsidian text-emerald text-[9px] font-bold px-2 py-1 rounded shadow-xl whitespace-nowrap">
                               £{fiveYearSavings.toLocaleString()} Saved
                             </div>
                          </div>
                        </div>
                     </div>

                     <Link href="/agents">
                       <Button fullWidth className="bg-emerald text-obsidian hover:bg-white h-16 text-[11px] font-bold uppercase tracking-[0.3em] transition-all">
                         Lock In Your Rate Today
                       </Button>
                     </Link>
                  </div>

               </div>
               
               <p className="text-[10px] text-muted text-center mt-6">
                 *Disclaimer: This calculator is indicative only and does not constitute a formal financial quote.
               </p>
            </div>

         </div>
      </section>
    </div>
  );
}
