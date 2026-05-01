"use client";

import { motion } from "framer-motion";
import { Sparkles, BarChart3, ShieldCheck, Database, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function AgentShowcase() {
  const features = [
    {
      title: "AI Listing Tools",
      description: "Automated description generation and compliance verification.",
      icon: <Database className="w-5 h-5 text-gold" />
    },
    {
      title: "Full CRM Suite",
      description: "Direct lead management pipeline with real-time analytics.",
      icon: <ShieldCheck className="w-5 h-5 text-gold" />
    },
    {
      title: "Market Analytics",
      description: "Advanced performance metrics and market sentiment tracking.",
      icon: <BarChart3 className="w-5 h-5 text-gold" />
    }
  ];

  return (
    <section className="bg-obsidian py-40 overflow-hidden text-silk">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          
          {/* Left Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-[10px] font-bold text-gold uppercase tracking-[0.4em] mb-8 block">The Agent Standard</span>
              <h2 className="text-display-lg font-display mb-12 leading-[1.1]">
                Stop Paying Rightmove. <br />
                <span className="italic font-normal">Start Growing With Nestiq.</span>
              </h2>
              <p className="text-body-xl text-silk/80 mb-16 max-w-xl leading-relaxed">
                Save up to £6,000 a month. Get a full CRM, AI listing tools, compliance tracking, and analytics — all included from £199/month.
              </p>
              
              <div className="space-y-12 mb-16">
                {features.map((feature, i) => (
                  <div key={i} className="flex gap-6 items-start">
                    <div className="w-12 h-12 bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-body-lg font-bold mb-2 uppercase tracking-wider text-silk">{feature.title}</h3>
                      <p className="text-body-sm text-silk/70 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button variant="primary" className="bg-silk text-obsidian hover:bg-gold hover:text-silk border-none group min-w-[280px]">
                See Agent Plans
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-500" />
              </Button>
            </motion.div>
          </div>

          {/* Right Content - Browser Mockup */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              className="bg-silk p-1 rounded-none shadow-[0_48px_100px_rgba(0,0,0,0.4)] overflow-hidden"
            >
              <div className="bg-obsidian rounded-none overflow-hidden border border-white/10">
                {/* Browser Header */}
                <div className="bg-white/10 border-b border-white/10 px-6 py-4 flex items-center gap-3">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-white/40" />
                    <div className="w-2 h-2 rounded-full bg-white/40" />
                    <div className="w-2 h-2 rounded-full bg-white/40" />
                  </div>
                  <div className="mx-auto bg-white/5 border border-white/5 rounded-none px-12 py-1 text-[9px] text-white/50 font-bold uppercase tracking-[0.2em]">
                    nestiq.com/agent/dashboard
                  </div>
                </div>
                
                {/* Dashboard Wireframe */}
                <div className="p-10 grid grid-cols-12 gap-8 aspect-video bg-obsidian">
                  <div className="col-span-3 space-y-4">
                     <div className="h-2 bg-white/20 w-3/4 mb-8" />
                     <div className="h-12 bg-white/10 border border-gold/40" />
                     <div className="h-12 bg-white/5 border border-white/10" />
                     <div className="h-12 bg-white/5 border border-white/10" />
                  </div>
                  <div className="col-span-9 space-y-8">
                     <div className="grid grid-cols-3 gap-6">
                        <div className="h-32 bg-white/10 border border-white/10" />
                        <div className="h-32 bg-white/10 border border-white/10" />
                        <div className="h-32 bg-white/10 border border-white/10" />
                     </div>
                     <div className="h-64 bg-white/10 border border-white/10" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
