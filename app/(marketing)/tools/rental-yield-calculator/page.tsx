"use client";

import { useState } from "react";
import { ArrowLeft, Target } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function RentalYieldCalculatorPage() {
  const [purchasePrice, setPurchasePrice] = useState(250000);
  const [monthlyRent, setMonthlyRent] = useState(1200);
  const [annualCosts, setAnnualCosts] = useState(1500); // Service charge, insurance, void periods
  const [hasCalculated, setHasCalculated] = useState(false);
  
  const annualRent = monthlyRent * 12;
  const grossYield = purchasePrice > 0 ? ((annualRent / purchasePrice) * 100).toFixed(2) : "0.00";
  const netYield = purchasePrice > 0 ? (((annualRent - annualCosts) / purchasePrice) * 100).toFixed(2) : "0.00";

  return (
    <div className="bg-silk min-h-screen text-obsidian">
      <div className="max-w-4xl mx-auto px-6 py-24">
        <Link href="/tools" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted hover:text-emerald mb-12 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Tools
        </Link>

        <div className="mb-16">
          <div className="w-16 h-16 bg-emerald/10 text-emerald flex items-center justify-center mb-6">
            <Target className="w-8 h-8" />
          </div>
          <h1 className="text-display-sm font-display mb-4">Rental Yield Calculator</h1>
          <p className="text-body-lg text-muted max-w-2xl">
            Instantly calculate the gross and net rental yields for your property investment to determine its profitability.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <form onSubmit={(e) => { e.preventDefault(); setHasCalculated(true); }} className="bg-white p-8 border border-border/40 shadow-sm space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted">Property Purchase Price</label>
              <div className="relative">
                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-muted">£</span>
                <input required type="number" min="0" value={purchasePrice || ''} onChange={(e) => setPurchasePrice(Number(e.target.value))} className="w-full bg-pearl border-none pl-10 pr-6 py-4 outline-none focus:ring-1 focus:ring-emerald/40 text-body-sm" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted">Expected Monthly Rent</label>
              <div className="relative">
                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-muted">£</span>
                <input required type="number" min="0" value={monthlyRent || ''} onChange={(e) => setMonthlyRent(Number(e.target.value))} className="w-full bg-pearl border-none pl-10 pr-6 py-4 outline-none focus:ring-1 focus:ring-emerald/40 text-body-sm" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted">Estimated Annual Costs</label>
              <p className="text-xs text-muted/60 mb-2">Service charges, ground rent, insurance, letting agent fees.</p>
              <div className="relative">
                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-muted">£</span>
                <input type="number" min="0" value={annualCosts || ''} onChange={(e) => setAnnualCosts(Number(e.target.value))} className="w-full bg-pearl border-none pl-10 pr-6 py-4 outline-none focus:ring-1 focus:ring-emerald/40 text-body-sm" />
              </div>
            </div>

            <Button type="submit" className="bg-emerald text-obsidian hover:bg-forest hover:text-white w-full h-16 text-[10px] font-bold uppercase tracking-[0.3em] transition-colors mt-4">
              Calculate Yield
            </Button>
          </form>

          {hasCalculated && (
            <div className="bg-obsidian text-white p-10 flex flex-col justify-center animate-in fade-in slide-in-from-right-4 duration-500">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald mb-8">Yield Results</h2>
              
              <div className="space-y-8">
                <div>
                  <p className="text-silk/60 text-sm mb-2 font-sans uppercase tracking-widest">Gross Yield</p>
                  <p className="text-display-md font-display text-white leading-none">{grossYield}%</p>
                  <p className="text-xs text-silk/40 mt-2">Return before expenses. Good for quick comparisons.</p>
                </div>
                
                <div className="pt-8 border-t border-silk/20">
                  <p className="text-silk/60 text-sm mb-2 font-sans uppercase tracking-widest">Net Yield</p>
                  <p className="text-display-sm font-display text-emerald leading-none">{netYield}%</p>
                  <p className="text-xs text-silk/40 mt-2">True return after factoring in your inputted annual running costs.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
