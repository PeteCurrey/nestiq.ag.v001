"use client";

import { 
  Building2, Zap, ShieldCheck, Users, ArrowRight, BarChart3, 
  CheckCircle2, Globe, Database, LineChart, Scale, AlertTriangle, 
  TrendingDown, FileSignature, Send
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export default function AgentMarketingPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      toast.success("Application received! We'll be in touch shortly.");
    }, 1500);
  };

  return (
    <div className="bg-silk min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center overflow-hidden bg-obsidian">
        <div className="absolute inset-0 z-0 opacity-50">
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2400&auto=format&fit=crop" 
            className="w-full h-full object-cover grayscale brightness-50"
            alt="Modern Agency Hub"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/80 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 w-full">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-3 px-4 py-2 bg-emerald/10 border border-emerald/20 rounded-full mb-8"
            >
              <Building2 className="w-4 h-4 text-emerald" />
              <span className="text-[10px] font-bold text-emerald uppercase tracking-[0.5em]">Agent Growth Platform</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-white text-[clamp(2.5rem,6vw,5.5rem)] font-display leading-[1.05] mb-8"
            >
              The fairer property portal for <span className="italic font-normal text-emerald">independent agents.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-white/70 text-body-xl mb-12 max-w-xl leading-relaxed"
            >
              List properties, capture better leads, reduce portal dependency, and keep total control of your data.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-6"
            >
              <Button 
                variant="primary" 
                size="lg" 
                onClick={() => document.getElementById('founding-programme')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-emerald text-obsidian hover:bg-white px-12 h-16 text-[11px] font-bold uppercase tracking-[0.3em] transition-all"
              >
                Join Founding Programme <ArrowRight className="ml-3 w-4 h-4" />
              </Button>
              <Link href="/portal-cost-calculator">
                <Button 
                  variant="secondary" 
                  size="lg" 
                  className="border-white/20 text-white hover:bg-white/5 px-12 h-16 text-[11px] font-bold uppercase tracking-[0.3em]"
                >
                  Compare Portal Costs
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pain Section */}
      <section className="py-32 bg-white px-6 md:px-12 border-b border-border/40">
         <div className="max-w-[1400px] mx-auto">
            <div className="text-center mb-24 max-w-3xl mx-auto">
               <span className="text-[10px] font-bold text-emerald uppercase tracking-[0.5em] mb-6 block">The Current Market</span>
               <h2 className="text-display-md font-display text-obsidian leading-tight">
                 You are paying more for less control. <span className="italic text-emerald">It's time to reassess.</span>
               </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
               {[
                 { icon: TrendingDown, title: "Rising Portal Costs", desc: "Annual fee increases consistently outpacing inflation, squeezing agency margins." },
                 { icon: ShieldCheck, title: "Lead Ownership", desc: "Portals utilizing your listing data to train competing valuation and financial products." },
                 { icon: AlertTriangle, title: "Pay-to-Play Visibility", desc: "Expensive premium tiers required just to maintain standard visibility in your local area." },
                 { icon: FileSignature, title: "Long Contracts", desc: "Restrictive multi-year lock-ins making it difficult to switch or negotiate." },
                 { icon: Users, title: "Weak Differentiation", desc: "Standardized templates that dilute your unique agency brand and local expertise." },
                 { icon: Globe, title: "Overreliance", desc: "Dangerous dependency on one or two major portals for your entire lead pipeline." }
               ].map((pain, i) => (
                 <div key={i} className="p-10 bg-pearl border border-border/40 hover:border-emerald/40 transition-colors">
                    <pain.icon className="w-8 h-8 text-obsidian mb-6" strokeWidth={1.5} />
                    <h3 className="text-body-xl font-display font-medium text-obsidian mb-4">{pain.title}</h3>
                    <p className="text-muted leading-relaxed">{pain.desc}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* Core Advantages */}
      <section className="py-32 px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="text-center mb-24">
          <span className="text-[10px] font-bold text-emerald uppercase tracking-[0.5em] mb-6 block">The NestIQ Standard</span>
          <h2 className="text-display-md font-display">A fairer ecosystem for <span className="italic font-normal text-emerald">Growth.</span></h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
          <div className="space-y-8">
            <div className="w-16 h-16 bg-emerald/10 text-emerald flex items-center justify-center rounded-2xl">
              <Scale className="w-8 h-8" strokeWidth={1.5} />
            </div>
            <h3 className="text-display-sm font-display leading-tight">Fairer Fee Structure</h3>
            <p className="text-body-lg text-muted leading-relaxed">
              Ditch the complex tiered pricing. We offer simple, flat-rate subscriptions with zero multi-year lock-ins. You pay for value, not access.
            </p>
          </div>

          <div className="space-y-8">
            <div className="w-16 h-16 bg-emerald/10 text-emerald flex items-center justify-center rounded-2xl">
              <Zap className="w-8 h-8" strokeWidth={1.5} />
            </div>
            <h3 className="text-display-sm font-display leading-tight">Better Lead Intelligence</h3>
            <p className="text-body-lg text-muted leading-relaxed">
              Our AI doesn't just send leads; it scores them. Every enquiry includes buyer readiness data and valuation intent insights.
            </p>
          </div>

          <div className="space-y-8">
            <div className="w-16 h-16 bg-emerald/10 text-emerald flex items-center justify-center rounded-2xl">
              <ShieldCheck className="w-8 h-8" strokeWidth={1.5} />
            </div>
            <h3 className="text-display-sm font-display leading-tight">Data Sovereignty</h3>
            <p className="text-body-lg text-muted leading-relaxed">
              Your data belongs to you. We never use your listings to train models that compete with your valuation services.
            </p>
          </div>
        </div>
      </section>

      {/* Founding Agent Programme Section */}
      <section id="founding-programme" className="py-32 bg-obsidian text-silk px-6 md:px-12 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_right,rgba(46,204,135,0.1),transparent)] pointer-events-none" />
         
         <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative z-10">
            <div>
               <div className="inline-flex items-center gap-3 px-4 py-2 bg-emerald/10 border border-emerald/20 rounded-full mb-8">
                 <div className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
                 <span className="text-[10px] font-bold text-emerald uppercase tracking-[0.5em]">Beta Phase Access</span>
               </div>
               <h2 className="text-display-lg font-display mb-8 leading-[1.1]">
                 The Founding Agent <br /><span className="italic font-normal text-emerald">Programme.</span>
               </h2>
               <p className="text-body-xl text-silk/70 mb-12 leading-relaxed max-w-xl">
                 We are currently onboarding a select group of independent agencies to help shape the future of Nestiq. Join early and secure lifetime benefits.
               </p>
               
               <div className="space-y-8 mb-12">
                  {[
                    { title: "Price Protection", desc: "Lock in a guaranteed low rate that will never increase as long as you remain a partner." },
                    { title: "Initial Visibility Boost", desc: "Gain enhanced territory visibility during the platform's public launch phase." },
                    { title: "Roadmap Influence", desc: "Direct channel to our product team to request features that your agency actually needs." },
                    { title: "Dashboard Preview Access", desc: "Get early access to our agent intelligence dashboard and AI listing tools." }
                  ].map((benefit, i) => (
                    <div key={i} className="flex gap-4">
                       <CheckCircle2 className="w-6 h-6 text-emerald shrink-0" />
                       <div>
                         <h4 className="text-body-lg font-bold text-white mb-1">{benefit.title}</h4>
                         <p className="text-silk/60 text-body-sm leading-relaxed">{benefit.desc}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            {/* Application Form */}
            <div className="bg-white text-obsidian p-10 md:p-14 border border-border/20 shadow-2xl relative">
               {status === "success" ? (
                 <div className="text-center py-20 animate-in fade-in zoom-in duration-500">
                    <div className="w-20 h-20 bg-emerald/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="w-10 h-10 text-emerald" />
                    </div>
                    <h3 className="text-display-sm font-display mb-4">Application Received</h3>
                    <p className="text-muted mb-8">Our partnership team will be in touch within 24 hours.</p>
                 </div>
               ) : (
                 <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="mb-10">
                      <h3 className="text-display-xs font-display mb-2">Apply for Founding Status</h3>
                      <p className="text-body-sm text-muted">Complete the form below to register your agency's interest.</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-muted">Agency Name</label>
                        <input required className="w-full bg-pearl border-none px-6 py-4 outline-none focus:ring-1 focus:ring-emerald/40 transition-all text-body-sm font-medium" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-muted">Contact Name</label>
                        <input required className="w-full bg-pearl border-none px-6 py-4 outline-none focus:ring-1 focus:ring-emerald/40 transition-all text-body-sm font-medium" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-muted">Email Address</label>
                        <input required type="email" className="w-full bg-pearl border-none px-6 py-4 outline-none focus:ring-1 focus:ring-emerald/40 transition-all text-body-sm font-medium" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-muted">Phone Number</label>
                        <input required type="tel" className="w-full bg-pearl border-none px-6 py-4 outline-none focus:ring-1 focus:ring-emerald/40 transition-all text-body-sm font-medium" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-muted">Number of Branches</label>
                      <select className="w-full bg-pearl border-none px-6 py-4 outline-none focus:ring-1 focus:ring-emerald/40 transition-all text-body-sm font-medium cursor-pointer">
                         <option>1 (Single Branch)</option>
                         <option>2 - 4 (Multi-Branch)</option>
                         <option>5 - 10 (Regional)</option>
                         <option>10+ (Network)</option>
                      </select>
                    </div>

                    <div className="pt-6">
                      <Button 
                        type="submit" 
                        fullWidth 
                        loading={status === "loading"}
                        className="bg-emerald text-obsidian hover:bg-forest hover:text-white h-16 text-[11px] font-bold uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-3"
                      >
                        <Send className="w-4 h-4" /> Submit Application
                      </Button>
                    </div>
                 </form>
               )}
            </div>
         </div>
      </section>

      {/* Integration Logos / Trust */}
      <section className="py-24 border-b border-border bg-white">
        <div className="max-w-[1400px] mx-auto px-6 text-center">
           <p className="text-[10px] font-bold text-muted uppercase tracking-[0.5em] mb-12">Seamless CRM Integrations</p>
           <div className="flex flex-wrap justify-center items-center gap-16 opacity-30 grayscale contrast-125">
              <span className="text-2xl font-display font-bold">ALTO</span>
              <span className="text-2xl font-display font-bold">STREET.CO.UK</span>
              <span className="text-2xl font-display font-bold">REAPIT</span>
              <span className="text-2xl font-display font-bold">JUPIX</span>
              <span className="text-2xl font-display font-bold">STREET</span>
           </div>
        </div>
      </section>
    </div>
  );
}

