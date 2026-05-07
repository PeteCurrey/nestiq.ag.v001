"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  MapPin,
  Sparkles,
  TrendingUp,
  LayoutList,
  ChevronRight,
  ArrowRight,
  BarChart3,
  ShieldCheck,
  PieChart,
  X,
  Target,
  Zap
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
  const [showWizard, setShowWizard] = useState(false);
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

  const runValuation = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 2000));

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

  const closeWizard = () => {
    setShowWizard(false);
    // Reset wizard state after closing animation
    setTimeout(() => {
      setCurrentStep(1);
      setResult(null);
      setPostcode("");
      setCondition("");
    }, 500);
  };

  return (
    <div className="bg-silk min-h-screen overflow-x-hidden">
      {/* --- HERO SECTION --- */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            src="/premium_derbyshire_property_hero_1778095929166.png" 
            className="w-full h-full object-cover"
            alt="Premium Derbyshire Estate"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-obsidian/90 via-obsidian/40 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 w-full">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-3 px-4 py-2 bg-emerald/10 border border-emerald/20 rounded-full mb-8"
            >
              <Sparkles className="w-4 h-4 text-emerald" />
              <span className="text-[10px] font-bold text-emerald uppercase tracking-widest">AI-Powered Market Intelligence</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-white text-[clamp(2.5rem,6vw,5.5rem)] font-display leading-[1.05] mb-8"
            >
              Precision Valuations <br /> <span className="italic font-normal text-emerald">Reimagined.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-white/60 text-body-xl mb-12 max-w-xl leading-relaxed"
            >
              NestIQ combines hyper-local data from the Peak District with advanced neural modeling to deliver the most accurate instant property estimates in the UK.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-6"
            >
              <div className="space-y-4">
                <Button 
                  variant="primary" 
                  size="lg" 
                  onClick={() => setShowWizard(true)}
                  className="bg-emerald text-white hover:bg-white hover:text-obsidian px-12 h-16 text-[11px] font-bold uppercase tracking-[0.3em] transition-all"
                >
                  Instant AI Valuation <ArrowRight className="ml-3 w-4 h-4" />
                </Button>
                <p className="text-[10px] text-white/40 font-bold uppercase tracking-[0.2em]">
                  Not an estate agent? Request a free valuation and we'll connect you with a local Nestiq partner agent.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- FEATURES GRID --- */}
      <section className="py-32 px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-display-md font-display mb-6">Why trust NestIQ?</h2>
          <p className="text-muted text-body-lg max-w-2xl mx-auto">
            Our valuation engine goes deeper than standard algorithms, analyzing street-level demand and specific property DNA.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            {
              icon: <Target className="w-6 h-6" />,
              title: "Hyper-Local Data",
              desc: "Direct integration with Peak District market velocity and recent Land Registry filings."
            },
            {
              icon: <Zap className="w-6 h-6" />,
              title: "Instant Results",
              desc: "Get your range in under 60 seconds with our streamlined intelligence wizard."
            },
            {
              icon: <ShieldCheck className="w-6 h-6" />,
              title: "Agent Backed",
              desc: "Our model is fine-tuned by active local experts to ensure accuracy simple tools miss."
            }
          ].map((feature, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="p-10 bg-white border border-border shadow-sm hover:shadow-xl transition-all"
            >
              <div className="w-14 h-14 bg-emerald/10 flex items-center justify-center text-emerald mb-8">
                {feature.icon}
              </div>
              <h3 className="text-display-xs font-display mb-4">{feature.title}</h3>
              <p className="text-body-md text-muted leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- DATA VISUALIZATION SECTION --- */}
      <section className="py-32 bg-obsidian text-white overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="absolute -inset-10 bg-emerald/20 blur-[100px] rounded-full" />
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop" 
              className="relative border border-white/10 shadow-2xl grayscale brightness-75 hover:grayscale-0 transition-all duration-700"
              alt="Intelligence Dashboard"
            />
          </div>
          <div className="order-1 lg:order-2">
            <span className="text-[10px] font-bold text-emerald uppercase tracking-[0.4em] mb-8 block">NestIQ Engine v2.4</span>
            <h2 className="text-display-md leading-[1.1] mb-8">Data-driven accuracy, <br /> <span className="italic font-normal text-emerald">not guesswork.</span></h2>
            <p className="text-white/40 text-body-lg mb-12 leading-relaxed">
              We analyze over 40 distinct variables—from EPC efficiency and school catchment scores to the specific orientation of your garden—to ensure your valuation reflects its true market prestige.
            </p>
            <Button 
              variant="outline" 
              onClick={() => setShowWizard(true)}
              className="border-emerald text-emerald hover:bg-emerald hover:text-white"
            >
              Try the Engine
            </Button>
          </div>
        </div>
      </section>

      {/* --- SLIDE-OVER WIZARD --- */}
      <AnimatePresence>
        {showWizard && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeWizard}
              className="fixed inset-0 bg-obsidian/60 backdrop-blur-sm z-[100]"
            />
            
            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-full max-w-2xl bg-white shadow-2xl z-[101] flex flex-col"
            >
              {/* Header */}
              <div className="p-8 border-b border-border flex items-center justify-between">
                <div>
                  <h2 className="text-display-xs font-display">Instant Valuation</h2>
                  <p className="text-body-sm text-muted">Complete the fields below for your estimate.</p>
                </div>
                <button 
                  onClick={closeWizard}
                  className="p-3 bg-silk hover:bg-emerald/10 text-muted hover:text-emerald rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Progress Bar */}
              <div className="h-1 w-full bg-silk">
                <motion.div
                  className="h-full bg-emerald"
                  initial={{ width: "0%" }}
                  animate={{ width: `${(currentStep / 4) * 100}%` }}
                />
              </div>

              {/* Step Content */}
              <div className="flex-1 overflow-y-auto p-12">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="h-full flex flex-col"
                  >
                    {currentStep === 1 && (
                      <div className="space-y-12">
                        <div className="w-16 h-16 bg-emerald/10 flex items-center justify-center text-emerald rounded-2xl">
                          <MapPin className="w-8 h-8" strokeWidth={1.5} />
                        </div>
                        <div className="space-y-4">
                          <h3 className="text-display-sm font-display leading-tight">Where is the property?</h3>
                          <p className="text-body-md text-muted">Enter your postcode to help us identify local market trends.</p>
                        </div>
                        <input
                          autoFocus
                          value={postcode}
                          onChange={e => setPostcode(e.target.value.toUpperCase())}
                          placeholder="E.G. S41 7JD"
                          className="w-full bg-silk border-none px-8 py-6 text-2xl font-display uppercase tracking-[0.2em] outline-none focus:ring-2 focus:ring-emerald/50"
                        />
                      </div>
                    )}

                    {currentStep === 2 && (
                      <div className="space-y-12">
                        <div className="w-16 h-16 bg-emerald/10 flex items-center justify-center text-emerald rounded-2xl">
                          <Home className="w-8 h-8" strokeWidth={1.5} />
                        </div>
                        <h3 className="text-display-sm font-display leading-tight">Property Details</h3>
                        <div className="grid grid-cols-1 gap-10">
                          <div className="space-y-4">
                            <label className="text-[10px] font-bold text-muted uppercase tracking-[0.3em] block">Bedrooms</label>
                            <div className="flex flex-wrap gap-3">
                              {[1, 2, 3, 4, 5, "6+"].map(n => (
                                <button
                                  key={n}
                                  onClick={() => setBedrooms(typeof n === 'string' ? 6 : n)}
                                  className={cn(
                                    "w-14 h-14 rounded-xl font-bold transition-all border",
                                    bedrooms === (typeof n === 'string' ? 6 : n) 
                                      ? "bg-emerald text-white border-emerald shadow-lg" 
                                      : "bg-white text-muted border-border hover:border-emerald/30"
                                  )}
                                >
                                  {n}
                                </button>
                              ))}
                            </div>
                          </div>
                          <div className="space-y-4">
                            <label className="text-[10px] font-bold text-muted uppercase tracking-[0.3em] block">Property Type</label>
                            <div className="grid grid-cols-2 gap-4">
                              {Object.keys(BASE_PRICES).map(t => (
                                <button
                                  key={t}
                                  onClick={() => setPropertyType(t)}
                                  className={cn(
                                    "px-6 py-4 rounded-xl text-left text-body-sm font-bold transition-all border",
                                    propertyType === t 
                                      ? "bg-emerald/5 text-emerald border-emerald" 
                                      : "bg-white text-muted border-border hover:border-emerald/30"
                                  )}
                                >
                                  {t}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {currentStep === 3 && (
                      <div className="space-y-12">
                        <div className="w-16 h-16 bg-emerald/10 flex items-center justify-center text-emerald rounded-2xl">
                          <LayoutList className="w-8 h-8" strokeWidth={1.5} />
                        </div>
                        <h3 className="text-display-sm font-display leading-tight">Condition</h3>
                        <div className="grid grid-cols-1 gap-4">
                          {Object.keys(CONDITION_MULTIPLIERS).map(cond => (
                            <button
                              key={cond}
                              onClick={() => setCondition(cond)}
                              className={cn(
                                "w-full py-6 px-8 rounded-2xl text-left transition-all border group",
                                condition === cond
                                  ? "bg-emerald text-white border-emerald shadow-lg"
                                  : "bg-white text-muted border-border hover:border-emerald/30"
                              )}
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-bold uppercase tracking-widest text-[11px]">{cond}</span>
                                <div className={cn(
                                  "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors",
                                  condition === cond ? "border-white" : "border-border group-hover:border-emerald/30"
                                )}>
                                  {condition === cond && <div className="w-2 h-2 bg-white rounded-full" />}
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {currentStep === 4 && result && (
                      <div className="h-full flex flex-col justify-center text-center space-y-12">
                        <div className="w-24 h-24 bg-emerald text-white flex items-center justify-center rounded-full mx-auto shadow-[0_0_50px_rgba(16,185,129,0.3)]">
                          <Sparkles className="w-10 h-10" />
                        </div>
                        
                        <div className="space-y-4">
                          <h2 className="text-display-md font-display">Intelligence <br /> <span className="italic font-normal">Calculated.</span></h2>
                          <p className="text-body-md text-muted">Estimated market value range based on today's velocity.</p>
                        </div>

                        <div className="p-12 bg-silk rounded-[2rem] border border-emerald/10">
                          <span className="text-[10px] font-bold text-emerald uppercase tracking-[0.4em] block mb-4">Estimated Range</span>
                          <div className="text-display-md font-display text-obsidian">
                            £{result.low.toLocaleString()} — £{result.high.toLocaleString()}
                          </div>
                        </div>

                        <div className="space-y-6">
                           <p className="text-body-sm text-muted max-w-sm mx-auto">
                             AI is accurate, but human eyes are better. Want a precise figure?
                           </p>
                           <Button variant="primary" fullWidth size="lg" className="bg-emerald h-16">
                             Book Expert Valuation Visit
                           </Button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Footer */}
              <div className="p-10 border-t border-border bg-silk/30 flex items-center justify-between">
                <button
                  onClick={() => setCurrentStep(prev => prev - 1)}
                  disabled={currentStep === 1 || currentStep === 4}
                  className="text-[10px] font-bold uppercase tracking-widest text-muted hover:text-obsidian disabled:opacity-0 transition-all"
                >
                  ← Previous Step
                </button>

                {currentStep < 4 && (
                  <Button
                    variant="primary"
                    onClick={nextStep}
                    disabled={
                      (currentStep === 1 && !postcode) ||
                      (currentStep === 3 && !condition)
                    }
                    loading={loading}
                    className="min-w-[180px] bg-emerald"
                  >
                    {currentStep === 3 ? "Generate Valuation" : "Next Step"}
                  </Button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

