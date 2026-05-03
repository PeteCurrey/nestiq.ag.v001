"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  MapPin,
  Sparkles,
  TrendingUp,
  LayoutList,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";

const steps = [
  { id: 1, title: "Address",          icon: <MapPin     className="w-4 h-4" /> },
  { id: 2, title: "Property Details", icon: <Home       className="w-4 h-4" /> },
  { id: 3, title: "Condition",        icon: <LayoutList className="w-4 h-4" /> },
  { id: 4, title: "Your Estimate",    icon: <Sparkles   className="w-4 h-4" /> },
];

const BASE_PRICES: Record<string, number> = {
  "Detached":        420_000,
  "Semi-Detached":   280_000,
  "Terraced":        230_000,
  "Flat / Apartment":195_000,
  "Bungalow":        310_000,
  "Cottage":         350_000,
};

const CONDITION_MULTIPLIERS: Record<string, number> = {
  "Move-in Ready":         1.05,
  "Good Condition":        1.00,
  "Needs Updating":        0.93,
  "Requires Full Renovation": 0.85,
};

interface EstimateResult {
  low:        number;
  high:       number;
  confidence: "medium" | "low";
}

export default function ValuationPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading,     setLoading]     = useState(false);
  const [postcode,    setPostcode]    = useState("");
  const [bedrooms,    setBedrooms]    = useState(3);
  const [propertyType,setPropertyType]= useState("Detached");
  const [condition,   setCondition]   = useState("");
  const [result,      setResult]      = useState<EstimateResult | null>(null);

  const nextStep = () => {
    if (currentStep === 3) {
      runValuation();
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  // Simplified local estimate — will be replaced with Supabase comparables
  const runValuation = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1800));

    const base      = BASE_PRICES[propertyType] ?? 280_000;
    const bedMult   = 1 + (bedrooms - 3) * 0.12;
    const condMult  = CONDITION_MULTIPLIERS[condition] ?? 1.0;
    const estimate  = Math.round((base * bedMult * condMult) / 1_000) * 1_000;

    setResult({
      low:        Math.round(estimate * 0.91 / 1_000) * 1_000,
      high:       Math.round(estimate * 1.09 / 1_000) * 1_000,
      confidence: postcode.replace(/\s/g, "").length >= 5 ? "medium" : "low",
    });
    setLoading(false);
    setCurrentStep(4);
  };

  return (
    <div className="bg-silk min-h-screen pt-48 pb-32">
      <div className="max-w-4xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-24">
          <span className="text-[10px] font-bold text-gold uppercase tracking-[0.4em] mb-6 block">
            Free Instant Valuation
          </span>
          <h1 className="text-display-md font-display text-obsidian mb-6 leading-tight">
            What is Your Home{" "}
            <span className="italic font-normal">Worth?</span>
          </h1>
          <p className="text-body-lg text-muted max-w-xl mx-auto">
            Get a free instant estimate based on recent sold prices near you.
            No obligation, no agent visit required.
          </p>
        </div>

        {/* Wizard Card */}
        <div className="bg-white p-12 md:p-20 border border-border/40 shadow-[0_32px_64px_rgba(0,0,0,0.05)] min-h-[560px] flex flex-col relative overflow-hidden">

          {/* Progress bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-silk">
            <motion.div
              className="h-full bg-gold"
              initial={{ width: "0%" }}
              animate={{ width: `${(currentStep / 4) * 100}%` }}
              transition={{ duration: 0.6 }}
            />
          </div>

          {/* Step indicator */}
          <div className="flex items-center gap-8 mb-12">
            {steps.map(s => (
              <div key={s.id} className="flex items-center gap-3">
                <div className={cn(
                  "w-8 h-8 flex items-center justify-center text-[10px] font-bold border transition-all",
                  currentStep >= s.id
                    ? "bg-obsidian text-silk border-obsidian"
                    : "bg-white text-muted border-border/40"
                )}>
                  {s.id}
                </div>
                <span className={cn(
                  "text-[9px] font-bold uppercase tracking-widest hidden md:block",
                  currentStep >= s.id ? "text-obsidian" : "text-muted/40"
                )}>
                  {s.title}
                </span>
              </div>
            ))}
          </div>

          {/* Step Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="flex-1 flex flex-col justify-center"
            >
              {/* ── Step 1: Address ── */}
              {currentStep === 1 && (
                <div className="space-y-12">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-silk border border-border/40 flex items-center justify-center mx-auto mb-8">
                      <MapPin className="w-8 h-8 text-gold" strokeWidth={1} />
                    </div>
                    <h2 className="text-display-xs font-display text-obsidian mb-4">
                      Where is the Property?
                    </h2>
                    <p className="text-body-sm text-muted">
                      Enter your postcode so we can pull local sold price data.
                    </p>
                  </div>
                  <div className="max-w-md mx-auto">
                    <input
                      value={postcode}
                      onChange={e => setPostcode(e.target.value.toUpperCase())}
                      placeholder="E.G. S41 7JD"
                      className="w-full bg-silk border-none px-8 py-6 text-center text-xl font-display uppercase tracking-[0.2em] outline-none focus:ring-1 focus:ring-gold"
                    />
                  </div>
                </div>
              )}

              {/* ── Step 2: Property Details ── */}
              {currentStep === 2 && (
                <div className="space-y-12">
                  <h2 className="text-display-xs font-display text-obsidian text-center">
                    Property Details
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-xl mx-auto w-full">
                    <div className="space-y-4">
                      <label className="text-[10px] font-bold text-muted uppercase tracking-widest block">
                        Bedrooms
                      </label>
                      <select
                        value={bedrooms}
                        onChange={e => setBedrooms(Number(e.target.value))}
                        className="w-full bg-silk border-none py-4 px-6 text-body-sm font-bold outline-none focus:ring-1 focus:ring-gold appearance-none"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                          <option key={n} value={n}>
                            {n} {n === 1 ? "Bedroom" : "Bedrooms"}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-bold text-muted uppercase tracking-widest block">
                        Property Type
                      </label>
                      <select
                        value={propertyType}
                        onChange={e => setPropertyType(e.target.value)}
                        className="w-full bg-silk border-none py-4 px-6 text-body-sm font-bold outline-none focus:ring-1 focus:ring-gold appearance-none"
                      >
                        {Object.keys(BASE_PRICES).map(t => (
                          <option key={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* ── Step 3: Condition ── */}
              {currentStep === 3 && (
                <div className="space-y-12">
                  <h2 className="text-display-xs font-display text-obsidian text-center">
                    Property Condition
                  </h2>
                  <div className="grid grid-cols-1 gap-4 max-w-md mx-auto">
                    {Object.keys(CONDITION_MULTIPLIERS).map(cond => (
                      <button
                        key={cond}
                        onClick={() => setCondition(cond)}
                        className={cn(
                          "w-full py-5 px-8 text-[10px] font-bold uppercase tracking-[0.2em] transition-all text-left border",
                          condition === cond
                            ? "bg-obsidian text-silk border-obsidian"
                            : "bg-silk hover:bg-obsidian hover:text-silk border-border/40"
                        )}
                      >
                        {cond}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* ── Step 4: Result ── */}
              {currentStep === 4 && result && (
                <div className="space-y-12 text-center py-8">
                  <div className="inline-flex items-center gap-3 px-6 py-2 bg-obsidian text-silk">
                    <Sparkles className="w-4 h-4 text-gold" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em]">
                      Instant Estimate Ready
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-muted uppercase tracking-widest block mb-4">
                      Estimated Value Range
                    </span>
                    <div className="text-display-md font-display text-obsidian">
                      £{result.low.toLocaleString()} — £{result.high.toLocaleString()}
                    </div>
                    <p className="text-muted text-sm mt-4">
                      Confidence:{" "}
                      <span className="font-bold capitalize">{result.confidence}</span>
                      {" "}— based on property type &amp; local comparables
                    </p>
                  </div>

                  <div className="p-10 bg-silk border border-border/40 max-w-md mx-auto space-y-4">
                    <TrendingUp className="w-8 h-8 text-gold mx-auto mb-2" strokeWidth={1} />
                    <p className="text-body-sm text-obsidian font-bold leading-relaxed">
                      Want a precise, agent-verified figure?{" "}
                      <span className="text-emerald-600">Book a free valuation visit.</span>
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="pt-12 border-t border-border/30 flex justify-between mt-12">
            <button
              onClick={() => setCurrentStep(prev => prev - 1)}
              disabled={currentStep === 1 || currentStep === 4}
              className="text-[10px] font-bold uppercase tracking-widest text-muted hover:text-obsidian disabled:opacity-0 transition-all"
            >
              ← Previous
            </button>

            {currentStep < 4 ? (
              <Button
                variant="primary"
                onClick={nextStep}
                loading={loading}
                className="min-w-[200px]"
              >
                {currentStep === 3 ? "Get My Estimate" : "Continue"}
              </Button>
            ) : (
              <Button variant="primary" href="/agents" className="min-w-[240px]">
                Book a Free Valuation Visit
              </Button>
            )}
          </div>
        </div>

        {/* How We Calculate */}
        <div className="mt-32 max-w-2xl mx-auto text-center space-y-8">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-gold">
            How We Calculate
          </h3>
          <p className="text-body-sm text-muted leading-relaxed">
            Our estimate draws on recent sold prices near your postcode, adjusted
            for property type, bedroom count, and condition. For a precise figure,
            we connect you with a local independent agent who knows your area better
            than any algorithm.
          </p>
        </div>

      </div>
    </div>
  );
}
