"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Home, 
  MapPin, 
  Sparkles, 
  TrendingUp, 
  ChevronRight, 
  ChevronLeft,
  Building2,
  Calendar,
  LayoutList
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const steps = [
  { id: 1, title: "Address", icon: <MapPin className="w-4 h-4" /> },
  { id: 2, title: "Property Details", icon: <Home className="w-4 h-4" /> },
  { id: 3, title: "Condition", icon: <LayoutList className="w-4 h-4" /> },
  { id: 4, title: "Your Estimate", icon: <Sparkles className="w-4 h-4" /> },
];

export default function ValuationPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<number | null>(null);

  const nextStep = () => {
    if (currentStep === 3) {
      calculateValuation();
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const calculateValuation = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 2000));
    setResult(425000);
    setLoading(false);
    setCurrentStep(4);
  };

  return (
    <div className="bg-silk min-h-screen pt-48 pb-32">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-24">
          <span className="text-[10px] font-bold text-gold uppercase tracking-[0.4em] mb-6 block">Asset Intelligence</span>
          <h1 className="text-display-md font-display text-obsidian mb-6 leading-tight">
             Institutional <span className="italic font-normal">Asset Valuation</span>
          </h1>
          <p className="text-body-lg text-muted max-w-xl mx-auto">Leveraging Nestiq AI and 10 years of institutional asset data for high-fidelity estimates.</p>
        </div>

        {/* Wizard */}
        <div className="bg-white p-12 md:p-20 border border-border/40 shadow-[0_32px_64px_rgba(0,0,0,0.05)] min-h-[600px] flex flex-col relative overflow-hidden">
           {/* Progress Line */}
           <div className="absolute top-0 left-0 right-0 h-1 bg-silk">
              <motion.div 
                className="h-full bg-gold"
                initial={{ width: "0%" }}
                animate={{ width: `${(currentStep / 4) * 100}%` }}
              />
           </div>

           <AnimatePresence mode="wait">
             <motion.div
               key={currentStep}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -10 }}
               className="flex-1 flex flex-col justify-center"
             >
                {currentStep === 1 && (
                  <div className="space-y-12">
                     <div className="text-center">
                        <div className="w-20 h-20 bg-silk border border-border/40 flex items-center justify-center mx-auto mb-8">
                           <MapPin className="w-8 h-8 text-gold" strokeWidth={1} />
                        </div>
                        <h2 className="text-display-xs font-display text-obsidian mb-4">Location Assessment</h2>
                        <p className="text-body-sm text-muted uppercase tracking-widest">Enter the postal code for boundary verification.</p>
                     </div>
                     <div className="max-w-md mx-auto">
                        <input 
                          placeholder="E.G. W1J 7JX" 
                          className="w-full bg-silk border-none px-8 py-6 text-center text-xl font-display uppercase tracking-[0.2em] outline-none focus:ring-1 focus:ring-gold"
                        />
                     </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-12">
                     <h2 className="text-display-xs font-display text-obsidian text-center">Asset Specifications</h2>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-xl mx-auto w-full">
                        <div className="space-y-4">
                           <label className="text-[10px] font-bold text-muted uppercase tracking-widest block">Total Bedrooms</label>
                           <input type="number" placeholder="5" className="w-full bg-silk border-none px-6 py-4 outline-none focus:ring-1 focus:ring-gold" />
                        </div>
                        <div className="space-y-4">
                           <label className="text-[10px] font-bold text-muted uppercase tracking-widest block">Asset Classification</label>
                           <select className="w-full bg-silk border-none py-4 px-6 text-body-sm font-bold uppercase tracking-widest outline-none focus:ring-1 focus:ring-gold appearance-none">
                              <option>Stately Home</option>
                              <option>Penthouse Portfolio</option>
                              <option>Institutional Residential</option>
                              <option>Detached Estate</option>
                           </select>
                        </div>
                     </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-12">
                     <h2 className="text-display-xs font-display text-obsidian text-center">Condition Analysis</h2>
                     <div className="grid grid-cols-1 gap-4 max-w-md mx-auto">
                        {['Institutional Grade', 'Excellent', 'Refurbishment Potential', 'Development Opportunity'].map(cond => (
                           <button key={cond} className="w-full py-5 px-8 bg-silk hover:bg-obsidian hover:text-silk text-[10px] font-bold uppercase tracking-[0.2em] transition-all text-left border border-border/40">
                              {cond}
                           </button>
                        ))}
                     </div>
                  </div>
                )}

                {currentStep === 4 && result && (
                  <div className="space-y-12 text-center py-8">
                     <div className="inline-flex items-center gap-3 px-6 py-2 bg-obsidian text-silk">
                        <Sparkles className="w-4 h-4 text-gold" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Valuation Report Generated</span>
                     </div>
                     <div>
                        <span className="text-[10px] font-bold text-muted uppercase tracking-widest block mb-4">Estimated Market Position</span>
                        <div className="text-display-md font-display text-obsidian">
                           £4,250,000 — £4,500,000
                        </div>
                     </div>
                     <div className="p-10 bg-silk border border-border/40 max-w-md mx-auto space-y-4">
                        <TrendingUp className="w-8 h-8 text-gold mx-auto mb-2" strokeWidth={1} />
                        <p className="text-body-sm text-obsidian font-bold uppercase tracking-widest leading-relaxed">
                           Yield Forecast: <span className="text-emerald">+5.2% Annually</span>
                        </p>
                     </div>
                  </div>
                )}
             </motion.div>
           </AnimatePresence>

           <div className="pt-12 border-t border-border/30 flex justify-between mt-12">
              <button 
                onClick={() => setCurrentStep(prev => prev - 1)} 
                disabled={currentStep === 1 || currentStep === 4}
                className="text-[10px] font-bold uppercase tracking-widest text-muted hover:text-obsidian disabled:opacity-0 transition-all"
              >
                 ← Previous
              </button>
              {currentStep < 4 ? (
                <Button variant="primary" onClick={nextStep} loading={loading} className="min-w-[200px]">
                   {currentStep === 3 ? "Generate Report" : "Continue"}
                </Button>
              ) : (
                <Button variant="primary" href="/agents" className="min-w-[240px]">
                   Consult Portfolio Manager
                </Button>
              )}
           </div>
        </div>

        {/* Intelligence Context */}
        <div className="mt-32 max-w-2xl mx-auto text-center space-y-8">
           <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-gold">The Nestiq Methodology</h3>
           <p className="text-body-sm text-muted leading-relaxed uppercase tracking-widest">
              Our valuation engine integrates historical liquidity data, 
              live market velocity, and asset-specific risk scores to deliver 
              high-fidelity intelligence for institutional portfolios.
           </p>
        </div>
      </div>
    </div>
  );
}

