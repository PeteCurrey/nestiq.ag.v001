"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";

export function SavingCalculator() {
  const [fee, setFee] = useState<number>(2500);
  const [saving, setSaving] = useState<number>(0);

  const nestiqCost = 2388; // Annual Starter Plan (£199 * 12)

  useEffect(() => {
    const annualFee = fee * 12;
    setSaving(Math.max(0, annualFee - nestiqCost));
  }, [fee]);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-display-md font-display font-extrabold text-obsidian mb-12">
          How Much Is Rightmove Really Costing You?
        </h2>
        
        <div className="max-w-xl mx-auto space-y-8">
          <div className="text-left">
            <label className="text-label font-bold uppercase tracking-widest text-muted block mb-3">
              Enter your current Rightmove monthly fee
            </label>
            <div className="relative">
              <span className="absolute left-6 top-1/2 -translate-y-1/2 text-display-sm font-display font-extrabold text-obsidian/30">£</span>
              <input
                type="number"
                value={fee}
                onChange={(e) => setFee(Number(e.target.value))}
                className="w-full bg-warm border-2 border-border rounded-xl py-6 pl-14 pr-6 text-display-sm font-display font-extrabold text-obsidian focus:outline-none focus:border-forest transition-colors"
              />
            </div>
          </div>

          <div className="bg-forest rounded-2xl p-10 text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-body-lg font-bold text-emerald uppercase tracking-widest mb-2">Annual Savings with Nestiq</p>
              <div className="text-display-xl font-display font-extrabold mb-4">
                £{saving.toLocaleString()}
              </div>
              <p className="text-body-md text-white/70 italic">
                "That's enough to hire a part-time negotiator."
              </p>
            </div>
            
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          </div>

          <Button variant="primary" size="xl" className="w-full">
            Start Your Free Trial
          </Button>
          
          <p className="text-label text-muted font-bold uppercase tracking-widest">
            14-day free trial • No credit card required
          </p>
        </div>
      </div>
    </section>
  );
}
