"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Calculator, ArrowRight, PoundSterling, Percent, Calendar } from "lucide-react";

interface MortgageCalculatorProps {
  initialPrice: number;
}

export function MortgageCalculator({ initialPrice }: MortgageCalculatorProps) {
  const [price, setPrice] = useState(initialPrice);
  const [deposit, setDeposit] = useState(initialPrice * 0.1);
  const [depositPercent, setDepositPercent] = useState(10);
  const [term, setTerm] = useState(25);
  const [rate, setRate] = useState(4.5);
  const [monthly, setMonthly] = useState(0);

  useEffect(() => {
    const principal = price - deposit;
    const monthlyRate = rate / 100 / 12;
    const numberOfPayments = term * 12;

    if (monthlyRate === 0) {
      setMonthly(principal / numberOfPayments);
    } else {
      const m = (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
      setMonthly(m);
    }
  }, [price, deposit, term, rate]);

  const updateDepositFromValue = (val: number) => {
    setDeposit(val);
    setDepositPercent(Math.round((val / price) * 100));
  };

  const updateDepositFromPercent = (percent: number) => {
    setDepositPercent(percent);
    setDeposit(Math.round(price * (percent / 100)));
  };

  return (
    <div className="bg-white p-8 rounded-2xl border border-border shadow-sm">
      <div className="flex items-center gap-3 mb-8">
        <Calculator className="w-5 h-5 text-forest" />
        <h3 className="text-body-lg font-display font-bold text-obsidian">Mortgage Calculator</h3>
      </div>

      <div className="space-y-6 mb-10">
        <div>
          <label className="text-label font-bold text-muted uppercase tracking-wider block mb-3">Property Price</label>
          <div className="relative">
            <PoundSterling className="absolute left-4 top-1/2 -translate-y-1/2 text-subtle w-4 h-4" />
            <input 
              type="number" 
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full bg-warm border-none rounded-lg py-4 pl-10 pr-4 text-body-md font-bold focus:ring-2 focus:ring-forest"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-label font-bold text-muted uppercase tracking-wider block mb-3">Deposit (£)</label>
            <input 
              type="number" 
              value={deposit}
              onChange={(e) => updateDepositFromValue(Number(e.target.value))}
              className="w-full bg-warm border-none rounded-lg py-4 px-4 text-body-md font-bold focus:ring-2 focus:ring-forest"
            />
          </div>
          <div>
            <label className="text-label font-bold text-muted uppercase tracking-wider block mb-3">Deposit (%)</label>
            <div className="relative">
              <input 
                type="number" 
                value={depositPercent}
                onChange={(e) => updateDepositFromPercent(Number(e.target.value))}
                className="w-full bg-warm border-none rounded-lg py-4 px-4 text-body-md font-bold focus:ring-2 focus:ring-forest"
              />
              <Percent className="absolute right-4 top-1/2 -translate-y-1/2 text-subtle w-4 h-4" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-label font-bold text-muted uppercase tracking-wider block mb-3">Term (Years)</label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-subtle w-4 h-4" />
              <input 
                type="number" 
                value={term}
                onChange={(e) => setTerm(Number(e.target.value))}
                className="w-full bg-warm border-none rounded-lg py-4 pl-10 pr-4 text-body-md font-bold focus:ring-2 focus:ring-forest"
              />
            </div>
          </div>
          <div>
            <label className="text-label font-bold text-muted uppercase tracking-wider block mb-3">Interest Rate (%)</label>
            <input 
              type="number" 
              step="0.1"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full bg-warm border-none rounded-lg py-4 px-4 text-body-md font-bold focus:ring-2 focus:ring-forest"
            />
          </div>
        </div>
      </div>

      <div className="bg-forest rounded-xl p-8 text-white mb-8">
        <p className="text-label font-bold text-emerald uppercase tracking-widest mb-2">Estimated Monthly Repayment</p>
        <div className="text-display-lg font-display font-black mb-2">
          £{Math.round(monthly).toLocaleString()}
        </div>
        <p className="text-body-sm text-white/60">
          Total repayment: £{Math.round(monthly * term * 12).toLocaleString()}
        </p>
      </div>

      <Button variant="outline" fullWidth className="group">
        Get a mortgage quote
        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Button>
    </div>
  );
}
