"use client";

import { useState } from "react";
import { ArrowLeft, Percent } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function MortgageAffordabilityPage() {
  const [salary1, setSalary1] = useState(40000);
  const [salary2, setSalary2] = useState(0);
  const [deposit, setDeposit] = useState(20000);
  const [monthlyCommitments, setMonthlyCommitments] = useState(0);
  const [hasCalculated, setHasCalculated] = useState(false);
  
  // Standard 4.5x multiplier calculation
  const totalIncome = salary1 + salary2;
  const annualCommitments = monthlyCommitments * 12;
  const adjustedIncome = Math.max(0, totalIncome - annualCommitments);
  
  const maxBorrowing = adjustedIncome * 4.5;
  const maxPropertyPrice = maxBorrowing + deposit;

  return (
    <div className="bg-silk min-h-screen text-obsidian">
      <div className="max-w-4xl mx-auto px-6 py-24">
        <Link href="/tools" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted hover:text-emerald mb-12 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Tools
        </Link>

        <div className="mb-16">
          <div className="w-16 h-16 bg-emerald/10 text-emerald flex items-center justify-center mb-6">
            <Percent className="w-8 h-8" />
          </div>
          <h1 className="text-display-sm font-display mb-4">Mortgage Affordability</h1>
          <p className="text-body-lg text-muted max-w-2xl">
            Estimate how much you could borrow from a mortgage lender based on the standard 4.5x income multiplier.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <form onSubmit={(e) => { e.preventDefault(); setHasCalculated(true); }} className="bg-white p-8 border border-border/40 shadow-sm space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted">Applicant 1 Annual Salary</label>
              <div className="relative">
                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-muted">£</span>
                <input required type="number" min="0" value={salary1 || ''} onChange={(e) => setSalary1(Number(e.target.value))} className="w-full bg-pearl border-none pl-10 pr-6 py-4 outline-none focus:ring-1 focus:ring-emerald/40 text-body-sm" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted">Applicant 2 Annual Salary (Optional)</label>
              <div className="relative">
                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-muted">£</span>
                <input type="number" min="0" value={salary2 || ''} onChange={(e) => setSalary2(Number(e.target.value))} className="w-full bg-pearl border-none pl-10 pr-6 py-4 outline-none focus:ring-1 focus:ring-emerald/40 text-body-sm" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted">Available Deposit</label>
              <div className="relative">
                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-muted">£</span>
                <input required type="number" min="0" value={deposit || ''} onChange={(e) => setDeposit(Number(e.target.value))} className="w-full bg-pearl border-none pl-10 pr-6 py-4 outline-none focus:ring-1 focus:ring-emerald/40 text-body-sm" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted">Monthly Financial Commitments</label>
              <p className="text-xs text-muted/60 mb-2">Loans, car finance, child maintenance, etc.</p>
              <div className="relative">
                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-muted">£</span>
                <input type="number" min="0" value={monthlyCommitments || ''} onChange={(e) => setMonthlyCommitments(Number(e.target.value))} className="w-full bg-pearl border-none pl-10 pr-6 py-4 outline-none focus:ring-1 focus:ring-emerald/40 text-body-sm" />
              </div>
            </div>

            <Button type="submit" className="bg-emerald text-obsidian hover:bg-forest hover:text-white w-full h-16 text-[10px] font-bold uppercase tracking-[0.3em] transition-colors mt-4">
              Calculate Maximum
            </Button>
          </form>

          {hasCalculated && (
            <div className="bg-obsidian text-white p-10 flex flex-col justify-center animate-in fade-in slide-in-from-right-4 duration-500">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald mb-8">Estimated Results</h2>
              
              <div className="space-y-8">
                <div>
                  <p className="text-silk/60 text-sm mb-2 font-sans uppercase tracking-widest">Maximum Borrowing</p>
                  <p className="text-display-md font-display text-white leading-none">£{maxBorrowing.toLocaleString(undefined, {maximumFractionDigits: 0})}</p>
                </div>
                
                <div className="pt-8 border-t border-silk/20">
                  <p className="text-silk/60 text-sm mb-2 font-sans uppercase tracking-widest">Max Property Value</p>
                  <p className="text-display-sm font-display text-emerald leading-none">£{maxPropertyPrice.toLocaleString(undefined, {maximumFractionDigits: 0})}</p>
                  <p className="text-xs text-silk/40 mt-4 leading-relaxed">
                    Based on your deposit plus a 4.5x income multiplier. Note: Your actual rate and loan amount will depend on a full affordability check by a lender.
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
