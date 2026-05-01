"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Building2, 
  MapPin, 
  Camera, 
  LayoutList, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft,
  Sparkles,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const steps = [
  { id: 1, title: "Basic Info", icon: <Building2 className="w-4 h-4" /> },
  { id: 2, title: "Location", icon: <MapPin className="w-4 h-4" /> },
  { id: 3, title: "Features", icon: <LayoutList className="w-4 h-4" /> },
  { id: 4, title: "Media", icon: <Camera className="w-4 h-4" /> },
  { id: 5, title: "AI Description", icon: <Sparkles className="w-4 h-4" /> },
  { id: 6, title: "Review & Publish", icon: <CheckCircle2 className="w-4 h-4" /> },
];

export default function NewListingWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progression Indicator */}
      <div className="mb-12">
        <div className="flex items-center justify-between">
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col items-center gap-2 relative">
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 z-10",
                currentStep >= step.id ? "bg-forest border-forest text-white" : "bg-white border-border text-muted"
              )}>
                {currentStep > step.id ? <CheckCircle2 className="w-5 h-5" /> : step.icon}
              </div>
              <span className={cn(
                "text-[10px] font-bold uppercase tracking-widest text-center absolute -bottom-6 w-20 transition-colors",
                currentStep >= step.id ? "text-forest" : "text-muted"
              )}>
                {step.title}
              </span>
              
              {/* Connector */}
              {step.id < steps.length && (
                <div className="absolute left-10 top-5 w-[calc(100vw/6)] h-0.5 bg-border -z-0">
                   <div className={cn(
                     "h-full bg-forest transition-all duration-500",
                     currentStep > step.id ? "w-full" : "w-0"
                   )} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-white p-10 rounded-3xl border border-border shadow-sm mt-16 min-h-[500px] flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1"
          >
            {currentStep === 1 && <Step1Info />}
            {currentStep === 2 && <Step2Location />}
            {currentStep === 3 && <Step3Features />}
            {currentStep === 4 && <Step4Media />}
            {currentStep === 5 && <Step5AI />}
            {currentStep === 6 && <Step6Review />}
          </motion.div>
        </AnimatePresence>

        {/* Footer Navigation */}
        <div className="pt-10 border-t border-border flex justify-between mt-12">
          <Button 
            variant="ghost" 
            onClick={prevStep} 
            disabled={currentStep === 1}
            iconLeft={<ChevronLeft className="w-4 h-4" />}
          >
            Back
          </Button>
          <Button 
            variant="primary" 
            onClick={nextStep}
            iconRight={currentStep === steps.length ? <CheckCircle2 className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          >
            {currentStep === steps.length ? "Publish Listing" : "Continue"}
          </Button>
        </div>
      </div>
    </div>
  );
}

function Step1Info() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-display-sm font-display font-bold text-obsidian mb-2">Basic Information</h2>
        <p className="text-body-md text-muted">Let's start with the core details of your listing.</p>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="col-span-2">
          <label className="text-label font-bold text-muted uppercase tracking-widest block mb-2">Listing Title</label>
          <Input placeholder="e.g. Stunning 3-Bed Manor House" />
        </div>
        <div>
          <label className="text-label font-bold text-muted uppercase tracking-widest block mb-2">Listing Type</label>
          <select className="w-full bg-warm border-none rounded-md py-4 px-4 text-body-md font-bold focus:ring-2 focus:ring-forest">
            <option>For Sale</option>
            <option>To Rent</option>
          </select>
        </div>
        <div>
          <label className="text-label font-bold text-muted uppercase tracking-widest block mb-2">Property Type</label>
          <select className="w-full bg-warm border-none rounded-md py-4 px-4 text-body-md font-bold focus:ring-2 focus:ring-forest">
            <option>House</option>
            <option>Flat</option>
            <option>Bungalow</option>
          </select>
        </div>
        <div>
          <label className="text-label font-bold text-muted uppercase tracking-widest block mb-2">Price (£)</label>
          <Input type="number" placeholder="450000" />
        </div>
        <div>
          <label className="text-label font-bold text-muted uppercase tracking-widest block mb-2">Price Qualifier</label>
          <select className="w-full bg-warm border-none rounded-md py-4 px-4 text-body-sm font-bold focus:ring-2 focus:ring-forest">
             <option>Guide Price</option>
             <option>Offers in Region of</option>
             <option>Fixed Price</option>
          </select>
        </div>
      </div>
    </div>
  );
}

// Placeholder sub-components for other steps
function Step2Location() { return <div className="space-y-6"> <h2 className="text-display-sm font-display font-bold text-obsidian">Location Details</h2> <p className="text-body-md text-muted">Search for an address or enter manually. This determines the map placement.</p> <Input placeholder="Search address or postcode..." icon={<MapPin className="w-4 h-4" />} /> <div className="h-64 bg-warm rounded-xl border-2 border-dashed border-border flex items-center justify-center text-muted">Interactive Map Placeholder</div> </div>; }
function Step3Features() { return <div className="space-y-6"> <h2 className="text-display-sm font-display font-bold text-obsidian">Property Features</h2> <div className="grid grid-cols-2 gap-8"> <div> <label className="text-label font-bold text-muted uppercase tracking-widest block mb-2">Bedrooms</label> <Input type="number" placeholder="3" /> </div> <div> <label className="text-label font-bold text-muted uppercase tracking-widest block mb-2">Bathrooms</label> <Input type="number" placeholder="2" /> </div> </div> </div>; }
function Step4Media() { return <div className="space-y-6 text-center py-12"> <div className="w-20 h-20 bg-forest/10 rounded-full flex items-center justify-center mx-auto mb-6"> <Camera className="w-10 h-10 text-forest" /> </div> <h2 className="text-display-sm font-display font-bold text-obsidian">Upload Property Media</h2> <p className="text-body-md text-muted max-w-md mx-auto">Drag and drop high-resolution photos. We recommend at least 12 photos for maximum engagement.</p> <div className="mt-8"> <Button variant="outline">Choose Files</Button> </div> </div>; }
function Step5AI() { return <div className="space-y-6"> <div className="flex items-center gap-3 bg-emerald/10 p-4 rounded-xl border border-emerald/20 mb-8"> <Sparkles className="w-5 h-5 text-emerald" /> <p className="text-body-sm text-emerald font-bold uppercase tracking-wider">Claude AI Listing Assistant</p> </div> <h2 className="text-display-sm font-display font-bold text-obsidian">Listing Description</h2> <p className="text-body-md text-muted">We've drafted a compliant description based on your info. Refine it below.</p> <textarea className="w-full h-64 bg-warm border-none rounded-xl p-6 text-body-md leading-relaxed focus:ring-2 focus:ring-forest" defaultValue="Stunning 3-bedroom manor house located in the heart of Sheffield..." /> <div className="flex justify-end"> <Button variant="ghost" size="sm" iconLeft={<RefreshCw className="w-3 h-3" />}>Regenerate with AI</Button> </div> </div>; }
function Step6Review() { return <div className="space-y-8 text-center py-12"> <div className="w-20 h-20 bg-emerald/10 rounded-full flex items-center justify-center mx-auto mb-6"> <CheckCircle2 className="w-10 h-10 text-emerald" /> </div> <h2 className="text-display-sm font-display font-bold text-obsidian">Ready to Publish?</h2> <p className="text-body-md text-muted max-w-md mx-auto">Your listing is complete and meets all UK compliance requirements. It will be live on Nestiq and synced to Algolia instantly.</p> </div>; }

function RefreshCw({ className }: { className?: string }) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/></svg>;
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
