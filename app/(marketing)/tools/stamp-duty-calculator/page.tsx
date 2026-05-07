"use client";

import { useState } from "react";
import { ArrowLeft, Activity } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function StampDutyCalculatorPage() {
  const [price, setPrice] = useState(350000);
  const [buyerType, setBuyerType] = useState<"first" | "next" | "second">("next");
  const [hasCalculated, setHasCalculated] = useState(false);
  
  // Calculate UK Stamp Duty (England & Northern Ireland rates as of early 2024 approximation)
  const calculateSDLT = (propertyPrice: number, type: string) => {
    let tax = 0;
    const surcharge = type === "second" ? 0.03 : 0; // 3% surcharge for second homes
    
    if (type === "first" && propertyPrice <= 625000) {
      if (propertyPrice <= 425000) return 0;
      tax = (propertyPrice - 425000) * 0.05;
      return tax;
    }

    // Standard rates
    if (propertyPrice > 250000) {
      tax += Math.min(propertyPrice - 250000, 675000) * (0.05 + surcharge);
    } else if (surcharge > 0) {
      tax += propertyPrice * surcharge;
    }
    
    if (propertyPrice > 925000) {
      tax += Math.min(propertyPrice - 925000, 575000) * (0.10 + surcharge);
    }
    if (propertyPrice > 1500000) {
      tax += (propertyPrice - 1500000) * (0.12 + surcharge);
    }
    
    // Base 3% surcharge on the first 250k if second home
    if (type === "second" && propertyPrice > 40000) {
       tax += Math.min(propertyPrice, 250000) * surcharge;
    }

    return Math.floor(tax);
  };

  const stampDuty = calculateSDLT(price, buyerType);
  const effectiveRate = price > 0 ? ((stampDuty / price) * 100).toFixed(1) : "0.0";

  return (
    <div className="bg-silk min-h-screen text-obsidian">
      <div className="max-w-4xl mx-auto px-6 py-24">
        <Link href="/tools" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted hover:text-emerald mb-12 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Tools
        </Link>

        <div className="mb-16">
          <div className="w-16 h-16 bg-emerald/10 text-emerald flex items-center justify-center mb-6">
            <Activity className="w-8 h-8" />
          </div>
          <h1 className="text-display-sm font-display mb-4">Stamp Duty Calculator</h1>
          <p className="text-body-lg text-muted max-w-2xl">
            Calculate your exact Stamp Duty Land Tax (SDLT) liability for properties in England and Northern Ireland.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <form onSubmit={(e) => { e.preventDefault(); setHasCalculated(true); }} className="bg-white p-8 border border-border/40 shadow-sm space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted">Property Purchase Price</label>
              <div className="relative">
                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-muted">£</span>
                <input required type="number" min="0" value={price || ''} onChange={(e) => setPrice(Number(e.target.value))} className="w-full bg-pearl border-none pl-10 pr-6 py-4 outline-none focus:ring-1 focus:ring-emerald/40 text-body-sm" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted">Buyer Circumstance</label>
              <select value={buyerType} onChange={(e) => setBuyerType(e.target.value as any)} className="w-full bg-pearl border-none px-6 py-4 outline-none focus:ring-1 focus:ring-emerald/40 text-body-sm">
                 <option value="first">First-time Buyer</option>
                 <option value="next">Next Home (Replacing main residence)</option>
                 <option value="second">Additional Property / Buy-to-let</option>
              </select>
            </div>

            <Button type="submit" className="bg-emerald text-obsidian hover:bg-forest hover:text-white w-full h-16 text-[10px] font-bold uppercase tracking-[0.3em] transition-colors mt-4">
              Calculate SDLT
            </Button>
            <p className="text-[10px] text-muted text-center max-w-lg mx-auto leading-relaxed">
              * Rates are indicative based on standard England & NI thresholds. Different rates apply in Scotland (LBTT) and Wales (LTT).
            </p>
          </form>

          {hasCalculated && (
            <div className="bg-obsidian text-white p-10 flex flex-col justify-center animate-in fade-in slide-in-from-right-4 duration-500">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald mb-8">Tax Liability</h2>
              
              <div className="space-y-8">
                <div>
                  <p className="text-silk/60 text-sm mb-2 font-sans uppercase tracking-widest">Total Stamp Duty Due</p>
                  <p className="text-display-md font-display text-white leading-none">£{stampDuty.toLocaleString()}</p>
                </div>
                
                <div className="pt-8 border-t border-silk/20">
                  <p className="text-silk/60 text-sm mb-2 font-sans uppercase tracking-widest">Effective Tax Rate</p>
                  <p className="text-display-sm font-display text-emerald leading-none">{effectiveRate}%</p>
                  <p className="text-xs text-silk/40 mt-4 leading-relaxed">
                    This amount is typically payable to your solicitor prior to completion.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
