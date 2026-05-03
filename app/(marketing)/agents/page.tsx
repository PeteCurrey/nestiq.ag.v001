"use client";

import { 
  Building2, 
  Zap, 
  ShieldCheck, 
  Users, 
  ArrowRight, 
  BarChart3, 
  CheckCircle2,
  Globe,
  Database
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AgentMarketingPage() {
  return (
    <div className="bg-silk min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center overflow-hidden bg-obsidian">
        <div className="absolute inset-0 z-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2400&auto=format&fit=crop" 
            className="w-full h-full object-cover"
            alt="Modern Office"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/80 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 w-full">
          <div className="max-w-3xl">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-[10px] font-bold text-gold uppercase tracking-[0.5em] mb-8 block"
            >
              The Agent-First Portal
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-silk text-[clamp(2.5rem,6vw,5.5rem)] font-display leading-[1.05] mb-8"
            >
              The platform built <br /> <span className="italic font-normal">for your growth.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-silk/50 text-body-xl mb-12 max-w-xl leading-relaxed"
            >
              NestIQ is the first UK property portal that prioritizes independent agents. We provide the tools, data, and leads you need to win instructions and close deals faster.
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
                className="bg-gold text-obsidian hover:bg-silk px-12 h-16 text-[10px] font-bold uppercase tracking-[0.3em]"
              >
                Become a Partner <ArrowRight className="ml-3 w-4 h-4" />
              </Button>
              <Link href="/agents/directory">
                <Button 
                  variant="secondary" 
                  size="lg" 
                  className="border-silk/20 text-silk hover:bg-silk/5 px-12 h-16 text-[10px] font-bold uppercase tracking-[0.3em]"
                >
                  View Partner Network
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Advantages */}
      <section className="py-32 px-6 md:px-12 max-w-[1800px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="space-y-8">
            <div className="w-16 h-16 bg-obsidian text-gold flex items-center justify-center">
              <Zap className="w-8 h-8" strokeWidth={1} />
            </div>
            <h3 className="text-display-sm font-display leading-tight">Instant Sync Integration</h3>
            <p className="text-body-lg text-muted leading-relaxed">
              Stop double-keying data. NestIQ syncs directly with Alto, Street, and other leading CRMs to keep your listings accurate and up-to-date in real-time.
            </p>
            <ul className="space-y-4">
              {['Auto-Listing Creation', 'Real-time Lead Injection', 'Status Syncing'].map(f => (
                <li key={f} className="flex items-center gap-3 text-body-sm font-bold uppercase tracking-widest text-obsidian">
                  <CheckCircle2 className="w-4 h-4 text-gold" /> {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-8">
            <div className="w-16 h-16 bg-obsidian text-gold flex items-center justify-center">
              <Users className="w-8 h-8" strokeWidth={1} />
            </div>
            <h3 className="text-display-sm font-display leading-tight">Qualified, High-Intent Leads</h3>
            <p className="text-body-lg text-muted leading-relaxed">
              We don't just send emails. Every lead from NestIQ is scored and enriched with market data, so you know exactly which ones to prioritize for valuation.
            </p>
            <ul className="space-y-4">
              {['Lead Scoring AI', 'Valuation Intent Tracking', 'Buyer Readiness Data'].map(f => (
                <li key={f} className="flex items-center gap-3 text-body-sm font-bold uppercase tracking-widest text-obsidian">
                  <CheckCircle2 className="w-4 h-4 text-gold" /> {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-8">
            <div className="w-16 h-16 bg-obsidian text-gold flex items-center justify-center">
              <ShieldCheck className="w-8 h-8" strokeWidth={1} />
            </div>
            <h3 className="text-display-sm font-display leading-tight">Fair Fees, No Locks</h3>
            <p className="text-body-lg text-muted leading-relaxed">
              Transparent, flat-rate pricing designed for independent agencies. No hidden costs, no multi-year lock-ins, and no competing with your own data.
            </p>
            <ul className="space-y-4">
              {['Month-to-Month Flex', 'Data Ownership Guarantee', 'Fair Listing Priority'].map(f => (
                <li key={f} className="flex items-center gap-3 text-body-sm font-bold uppercase tracking-widest text-obsidian">
                  <CheckCircle2 className="w-4 h-4 text-gold" /> {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Feature Showcase */}
      <section className="py-32 bg-silk border-y border-border/40">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div>
            <span className="text-[10px] font-bold text-gold uppercase tracking-[0.4em] mb-8 block">Agent Intelligence</span>
            <h2 className="text-display-md leading-[1.1] mb-8">Win more instructions with <span className="italic font-normal">Market Intel.</span></h2>
            <p className="text-body-lg text-muted mb-12 leading-relaxed">
              Our agent dashboard provides deep insights into local market velocity, competitor performance, and buyer sentiment. Use our data to build the most compelling case for every valuation visit.
            </p>
            <div className="grid grid-cols-2 gap-8 mb-12">
               <div>
                  <BarChart3 className="w-6 h-6 text-gold mb-4" />
                  <p className="text-[11px] font-bold uppercase tracking-widest text-obsidian">Yield Analysis</p>
               </div>
               <div>
                  <Database className="w-6 h-6 text-gold mb-4" />
                  <p className="text-[11px] font-bold uppercase tracking-widest text-obsidian">Sold Price Intel</p>
               </div>
               <div>
                  <Globe className="w-6 h-6 text-gold mb-4" />
                  <p className="text-[11px] font-bold uppercase tracking-widest text-obsidian">Hyper-local Search Data</p>
               </div>
               <div>
                  <Zap className="w-6 h-6 text-gold mb-4" />
                  <p className="text-[11px] font-bold uppercase tracking-widest text-obsidian">Real-time Lead Sync</p>
               </div>
            </div>
            <Button variant="primary">Request a Demo</Button>
          </div>
          <div className="relative">
             <div className="bg-obsidian p-2 shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop" 
                  className="w-full h-auto grayscale opacity-80"
                  alt="Dashboard Preview"
                />
             </div>
             <div className="absolute -bottom-8 -left-8 bg-gold p-10 text-obsidian max-w-xs shadow-2xl">
                <p className="text-display-sm font-display mb-4">800+</p>
                <p className="text-[10px] font-bold uppercase tracking-widest">Independent agencies already partnered</p>
             </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-40 text-center bg-obsidian text-silk">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-display-md font-display mb-12">Ready to list with the <span className="italic font-normal text-gold">future of property?</span></h2>
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <Button size="lg" className="bg-gold text-obsidian px-12">Become a Partner</Button>
            <Button size="lg" variant="secondary" className="border-silk/20 text-silk px-12">Contact Sales</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
