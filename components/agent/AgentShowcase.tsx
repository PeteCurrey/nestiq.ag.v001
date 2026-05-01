"use client";

import { motion } from "framer-motion";
import { Sparkles, BarChart3, ShieldCheck, Database, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function AgentShowcase() {
  const features = [
    {
      title: "AI Listing Writer",
      description: "Generate compelling descriptions in seconds with Claude-powered tools.",
      icon: <Sparkles className="w-5 h-5 text-emerald" />
    },
    {
      title: "Full CRM",
      description: "Complete pipeline, leads, contacts, and automation in one dashboard.",
      icon: <Database className="w-5 h-5 text-emerald" />
    },
    {
      title: "Smart Analytics",
      description: "Know exactly how your listings perform with real-time market data.",
      icon: <BarChart3 className="w-5 h-5 text-emerald" />
    }
  ];

  return (
    <section className="bg-forest py-32 overflow-hidden text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Left Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-display-lg font-display font-extrabold mb-8 leading-tight">
                Stop Paying Rightmove. <br />
                <span className="text-emerald">Start Growing.</span>
              </h2>
              <p className="text-body-xl text-white/80 mb-12 max-w-xl leading-relaxed">
                Save up to £6,000 a month. Get a full CRM, AI listing tools, 
                compliance dashboard, and performance analytics — all included. 
                From £199/month.
              </p>
              
              <div className="space-y-8 mb-12">
                {features.map((feature, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-body-lg font-bold mb-1">{feature.title}</h3>
                      <p className="text-body-md text-white/60">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button variant="white" size="lg" className="group">
                See Agent Plans
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </div>

          {/* Right Content - Browser Mockup */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-obsidian rounded-xl shadow-2xl border border-white/10 overflow-hidden"
            >
              {/* Browser Header */}
              <div className="bg-white/5 border-b border-white/10 px-4 py-3 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
                </div>
                <div className="mx-auto bg-white/5 rounded-sm px-12 py-1 text-[10px] text-white/30 font-mono">
                  nestiq.co.uk/agent/dashboard
                </div>
              </div>
              
              {/* Dashboard Wireframe */}
              <div className="p-6 grid grid-cols-12 gap-4 aspect-video">
                <div className="col-span-3 space-y-3">
                   <div className="h-4 bg-white/10 rounded w-3/4" />
                   <div className="h-10 bg-forest/20 rounded border border-forest/30" />
                   <div className="h-10 bg-white/5 rounded" />
                   <div className="h-10 bg-white/5 rounded" />
                </div>
                <div className="col-span-9 space-y-4">
                   <div className="grid grid-cols-3 gap-4">
                      <div className="h-24 bg-white/5 rounded border border-white/10" />
                      <div className="h-24 bg-white/5 rounded border border-white/10" />
                      <div className="h-24 bg-white/5 rounded border border-white/10" />
                   </div>
                   <div className="h-48 bg-white/5 rounded border border-white/10" />
                </div>
              </div>
            </motion.div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-emerald/20 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-forest/20 rounded-full blur-2xl -z-10" />
          </div>

        </div>
      </div>
    </section>
  );
}
