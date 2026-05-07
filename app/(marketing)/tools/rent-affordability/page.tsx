"use client";

import { useState } from "react";
import { ArrowLeft, Home } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function RentAffordabilityPage() {
  const [salary, setSalary] = useState(35000);
  const [hasCalculated, setHasCalculated] = useState(false);
  
  // Standard rent affordability: 30-35% of gross income, or salary / 30 for max monthly
  // Industry standard referencing check usually requires annual salary to be 30x the monthly rent
  const maxMonthlyRent = Math.floor(salary / 30);
  const comfortableRent = Math.floor((salary * 0.3) / 12);

  return (
    <div className="bg-silk min-h-screen text-obsidian">
      <div className="max-w-4xl mx-auto px-6 py-24">
        <Link href="/tools" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted hover:text-emerald mb-12 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Tools
        </Link>

        <div className="mb-16">
          <div className="w-16 h-16 bg-emerald/10 text-emerald flex items-center justify-center mb-6">
            <Home className="w-8 h-8" />
          </div>
          <h1 className="text-display-sm font-display mb-4">Rent Affordability</h1>
          <p className="text-body-lg text-muted max-w-2xl">
            Understand your monthly rental limits. Most UK letting agents require your annual salary to be at least 30x the monthly rent to pass referencing.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <form onSubmit={(e) => { e.preventDefault(); setHasCalculated(true); }} className="bg-white p-8 border border-border/40 shadow-sm space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted">Your Annual Gross Salary</label>
              <div className="relative">
                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-muted">£</span>
                <input required type="number" min="0" value={salary || ''} onChange={(e) => setSalary(Number(e.target.value))} className="w-full bg-pearl border-none pl-10 pr-6 py-4 outline-none focus:ring-1 focus:ring-emerald/40 text-body-sm" />
              </div>
            </div>

            <Button type="submit" className="bg-emerald text-obsidian hover:bg-forest hover:text-white w-full h-16 text-[10px] font-bold uppercase tracking-[0.3em] transition-colors mt-4">
              Calculate Limit
            </Button>
          </form>

          {hasCalculated && (
            <div className="bg-obsidian text-white p-10 flex flex-col justify-center animate-in fade-in slide-in-from-right-4 duration-500">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald mb-8">Your Rental Budget</h2>
              
              <div className="space-y-8">
                <div>
                  <p className="text-silk/60 text-sm mb-2 font-sans uppercase tracking-widest">Maximum Passable Rent</p>
                  <p className="text-display-md font-display text-white leading-none">£{maxMonthlyRent.toLocaleString()}<span className="text-xl text-silk/40">/mo</span></p>
                  <p className="text-xs text-silk/40 mt-2">The highest rent you can likely pass standard agent referencing for.</p>
                </div>
                
                <div className="pt-8 border-t border-silk/20">
                  <p className="text-silk/60 text-sm mb-2 font-sans uppercase tracking-widest">Comfortable Rent (30% Rule)</p>
                  <p className="text-display-sm font-display text-emerald leading-none">£{comfortableRent.toLocaleString()}<span className="text-xl text-emerald/50">/mo</span></p>
                  <p className="text-xs text-silk/40 mt-2">Recommended limit to ensure you have enough disposable income for bills and living costs.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
