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
    // Mock AI calculation
    await new Promise(r => setTimeout(r, 2000));
    setResult(425000);
    setLoading(false);
    setCurrentStep(4);
  };

  return (
    <div className="bg-pearl min-h-screen pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-display-md font-display font-extrabold text-obsidian mb-4">
             Get an <span className="text-forest">Instant Valuation</span>
          </h1>
          <p className="text-body-lg text-muted">Powered by Nestiq AI and 10 years of sold price data.</p>
        </div>

        {/* Wizard */}
        <div className="bg-white p-12 rounded-3xl border border-border shadow-xl min-h-[500px] flex flex-col">
           <AnimatePresence mode="wait">
             <motion.div
               key={currentStep}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -10 }}
               className="flex-1"
             >
                {currentStep === 1 && (
                  <div className="space-y-8">
                     <div className="text-center">
                        <div className="w-16 h-16 bg-forest/5 rounded-full flex items-center justify-center mx-auto mb-6">
                           <MapPin className="w-8 h-8 text-forest" />
                        </div>
                        <h2 className="text-display-xs font-display font-bold text-obsidian mb-2">What's your address?</h2>
                        <p className="text-body-md text-muted">We use your postcode to find comparable properties nearby.</p>
                     </div>
                     <div className="max-w-md mx-auto">
                        <Input placeholder="Enter your postcode..." className="h-14 text-center text-lg" />
                     </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-8">
                     <h2 className="text-display-xs font-display font-bold text-obsidian text-center">Tell us about your home</h2>
                     <div className="grid grid-cols-2 gap-6 max-w-md mx-auto">
                        <div>
                           <label className="text-label font-bold text-muted uppercase tracking-widest block mb-2">Bedrooms</label>
                           <Input type="number" placeholder="3" />
                        </div>
                        <div>
                           <label className="text-label font-bold text-muted uppercase tracking-widest block mb-2">Property Type</label>
                           <select className="w-full bg-warm border-none rounded-lg py-4 px-4 text-body-sm font-bold focus:ring-2 focus:ring-forest">
                              <option>Detached</option>
                              <option>Semi-Detached</option>
                              <option>Terraced</option>
                           </select>
                        </div>
                     </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-8">
                     <h2 className="text-display-xs font-display font-bold text-obsidian text-center">What is the condition?</h2>
                     <div className="grid grid-cols-1 gap-4 max-w-md mx-auto">
                        {['Fully Renovated', 'Good Condition', 'Needs Cosmetic Update', 'Full Refurbishment Needed'].map(cond => (
                           <button key={cond} className="w-full py-4 px-6 bg-warm hover:bg-forest hover:text-white rounded-xl text-body-sm font-bold transition-all text-left">
                              {cond}
                           </button>
                        ))}
                     </div>
                  </div>
                )}

                {currentStep === 4 && result && (
                  <div className="space-y-10 text-center py-8">
                     <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald text-obsidian rounded-full mb-4">
                        <Sparkles className="w-4 h-4" />
                        <span className="text-label font-black uppercase tracking-widest">Valuation Complete</span>
                     </div>
                     <h2 className="text-body-lg font-display font-bold text-muted uppercase tracking-widest">Estimated Value</h2>
                     <div className="text-display-lg font-display font-black text-obsidian">
                        £415,000 — £435,000
                     </div>
                     <div className="p-8 bg-warm rounded-2xl border border-border max-w-md mx-auto">
                        <TrendingUp className="w-8 h-8 text-forest mx-auto mb-4" />
                        <p className="text-body-md text-obsidian font-medium leading-relaxed">
                           House prices in your area have risen by <span className="text-forest font-bold">4.2%</span> in the last 12 months.
                        </p>
                     </div>
                  </div>
                )}
             </motion.div>
           </AnimatePresence>

           <div className="pt-10 border-t border-border flex justify-between mt-12">
              <Button 
                variant="ghost" 
                onClick={() => setCurrentStep(prev => prev - 1)} 
                disabled={currentStep === 1 || currentStep === 4}
              >
                 Back
              </Button>
              {currentStep < 4 ? (
                <Button variant="primary" onClick={nextStep} loading={loading}>
                   {currentStep === 3 ? "Calculate Now" : "Continue"}
                </Button>
              ) : (
                <Button variant="primary" href="/agents">
                   Book Agent Appraisal
                </Button>
              )}
           </div>
        </div>

        {/* SEO Content */}
        <div className="mt-24 max-w-2xl mx-auto text-center space-y-8">
           <h3 className="text-body-xl font-display font-bold text-obsidian">How it works</h3>
           <p className="text-body-md text-muted leading-relaxed">
              Our AI engine analyzes millions of historical sales, current market trends, 
              and local demand scores to provide an estimate that is within 5% of actual 
              sale prices on average.
           </p>
        </div>
      </div>
    </div>
  );
}
