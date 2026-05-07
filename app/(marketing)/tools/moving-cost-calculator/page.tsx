"use client";

import { useState } from "react";
import { ArrowLeft, Calculator } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function MovingCostCalculatorPage() {
  const [propertyPrice, setPropertyPrice] = useState(300000);
  const [hasCalculated, setHasCalculated] = useState(false);
  
  // Rough UK averages for moving costs
  const conveyancing = 1500;
  const survey = propertyPrice > 500000 ? 800 : 500;
  const removals = 1200;
  const valuationFee = 250;
  
  const totalCost = conveyancing + survey + removals + valuationFee;

  return (
    <div className="bg-silk min-h-screen text-obsidian">
      <div className="max-w-4xl mx-auto px-6 py-24">
        <Link href="/tools" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted hover:text-emerald mb-12 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Tools
        </Link>

        <div className="mb-16">
          <div className="w-16 h-16 bg-emerald/10 text-emerald flex items-center justify-center mb-6">
            <Calculator className="w-8 h-8" />
          </div>
          <h1 className="text-display-sm font-display mb-4">Moving Cost Calculator</h1>
          <p className="text-body-lg text-muted max-w-2xl">
            Estimate the total cost of moving house, including solicitor fees, surveys, and removal companies. (Note: Does not include Stamp Duty or estate agent selling fees).
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <form onSubmit={(e) => { e.preventDefault(); setHasCalculated(true); }} className="bg-white p-8 border border-border/40 shadow-sm space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted">Estimated Property Value</label>
              <div className="relative">
                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-muted">£</span>
                <input required type="number" min="0" value={propertyPrice || ''} onChange={(e) => setPropertyPrice(Number(e.target.value))} className="w-full bg-pearl border-none pl-10 pr-6 py-4 outline-none focus:ring-1 focus:ring-emerald/40 text-body-sm" />
              </div>
            </div>

            <Button type="submit" className="bg-emerald text-obsidian hover:bg-forest hover:text-white w-full h-16 text-[10px] font-bold uppercase tracking-[0.3em] transition-colors mt-4">
              Calculate Moving Costs
            </Button>
          </form>

          {hasCalculated && (
            <div className="bg-obsidian text-white p-10 flex flex-col justify-center animate-in fade-in slide-in-from-right-4 duration-500">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald mb-8">Estimated Breakdown</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-silk/60">Conveyancing (Legal)</span>
                  <span className="font-bold">£{conveyancing}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-silk/60">RICS Survey</span>
                  <span className="font-bold">£{survey}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-silk/60">Removals</span>
                  <span className="font-bold">£{removals}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-silk/60">Mortgage Valuation Fee</span>
                  <span className="font-bold">£{valuationFee}</span>
                </div>
              </div>

              <div className="pt-6 border-t border-emerald/30">
                <p className="text-silk/60 text-sm mb-2 font-sans uppercase tracking-widest">Total Estimated Cost</p>
                <p className="text-display-md font-display text-emerald leading-none">£{totalCost.toLocaleString()}</p>
                <p className="text-xs text-silk/40 mt-4 leading-relaxed">
                  These are UK averages and can vary significantly depending on the size of the property, distance moved, and complexity of the legal work.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
