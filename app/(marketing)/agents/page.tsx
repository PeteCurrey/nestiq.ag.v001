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
  Database,
  LineChart,
  Scale
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AgentMarketingPage() {
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
              <span className="text-[10px] font-bold text-emerald uppercase tracking-[0.5em]">The Agent-First Revolution</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-white text-[clamp(2.5rem,6vw,5.5rem)] font-display leading-[1.05] mb-8"
            >
              Built for <span className="italic font-normal text-emerald">Agencies.</span> <br /> Not against them.
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-white/50 text-body-xl mb-12 max-w-xl leading-relaxed"
            >
              Nestiq is an estate agent platform. Properties are listed exclusively by our verified partner agencies. We prioritize independent agents with a platform designed to win you instructions.
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
                className="bg-emerald text-obsidian hover:bg-white px-12 h-16 text-[11px] font-bold uppercase tracking-[0.3em] transition-all"
              >
                Join the Network <ArrowRight className="ml-3 w-4 h-4" />
              </Button>
              <Link href="/agents/directory">
                <Button 
                  variant="secondary" 
                  size="lg" 
                  className="border-white/20 text-white hover:bg-white/5 px-12 h-16 text-[11px] font-bold uppercase tracking-[0.3em]"
                >
                  View Directory
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Advantages */}
      <section className="py-40 px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="text-center mb-32">
          <span className="text-[10px] font-bold text-emerald uppercase tracking-[0.5em] mb-6 block">The NestIQ Standard</span>
          <h2 className="text-display-md font-display">A fairer ecosystem for <span className="italic font-normal">Independent Agents.</span></h2>
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
            <ul className="space-y-4 pt-4 border-t border-border">
              {['No Locked Contracts', 'Flat-Rate Pricing', 'No Pay-to-Play Listings'].map(f => (
                <li key={f} className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-obsidian">
                  <CheckCircle2 className="w-4 h-4 text-emerald" /> {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-8">
            <div className="w-16 h-16 bg-emerald/10 text-emerald flex items-center justify-center rounded-2xl">
              <Zap className="w-8 h-8" strokeWidth={1.5} />
            </div>
            <h3 className="text-display-sm font-display leading-tight">Better Lead Intelligence</h3>
            <p className="text-body-lg text-muted leading-relaxed">
              Our AI doesn't just send leads; it scores them. Every enquiry includes buyer readiness data and valuation intent insights.
            </p>
            <ul className="space-y-4 pt-4 border-t border-border">
              {['AI Lead Scoring', 'Valuation Intent Data', 'Zero Duplicate Charges'].map(f => (
                <li key={f} className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-obsidian">
                  <CheckCircle2 className="w-4 h-4 text-emerald" /> {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-8">
            <div className="w-16 h-16 bg-emerald/10 text-emerald flex items-center justify-center rounded-2xl">
              <ShieldCheck className="w-8 h-8" strokeWidth={1.5} />
            </div>
            <h3 className="text-display-sm font-display leading-tight">Data Sovereignty</h3>
            <p className="text-body-lg text-muted leading-relaxed">
              Your data belongs to you. We never use your listings to train models that compete with your valuation services.
            </p>
            <ul className="space-y-4 pt-4 border-t border-border">
              {['No Data Scraping', 'GDPR-First Privacy', 'Transparent API Access'].map(f => (
                <li key={f} className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-obsidian">
                  <CheckCircle2 className="w-4 h-4 text-emerald" /> {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Analytics Showcase */}
      <section className="py-40 bg-obsidian text-white overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="order-2 lg:order-1 relative">
            <div className="absolute -inset-20 bg-emerald/20 blur-[120px] rounded-full" />
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              className="relative bg-obsidian p-2 shadow-2xl border border-white/10"
            >
              <img 
                src="/agent-marketing-dashboard-preview.png" 
                className="w-full h-auto"
                alt="Agent Dashboard Preview"
              />
            </motion.div>
          </div>
          <div className="order-1 lg:order-2">
            <span className="text-[10px] font-bold text-emerald uppercase tracking-[0.5em] mb-8 block">Intelligence at Scale</span>
            <h2 className="text-display-md leading-[1.1] mb-8">Win the instruction <br /> <span className="italic font-normal text-emerald">before the visit.</span></h2>
            <p className="text-white/40 text-body-lg mb-12 leading-relaxed">
              Our agent dashboard provides deep insights into local market velocity and buyer sentiment. Use our data to build the most compelling case for every valuation visit.
            </p>
            <div className="grid grid-cols-2 gap-8 mb-12">
               {[
                 { icon: <LineChart className="w-5 h-5" />, label: "Velocity Tracking" },
                 { icon: <Database className="w-5 h-5" />, label: "CRM Auto-Sync" },
                 { icon: <Globe className="w-5 h-5" />, label: "Market Heatmaps" },
                 { icon: <Zap className="w-5 h-5" />, label: "Real-time Alerts" }
               ].map((item, i) => (
                 <div key={i} className="flex items-center gap-4">
                   <div className="text-emerald">{item.icon}</div>
                   <p className="text-[11px] font-bold uppercase tracking-widest text-white/80">{item.label}</p>
                 </div>
               ))}
            </div>
            <Button variant="outline" className="border-emerald text-emerald hover:bg-emerald hover:text-obsidian px-10">Request Platform Demo</Button>
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

      {/* Final CTA */}
      <section className="py-40 text-center bg-obsidian text-silk relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(46,204,135,0.05),transparent)] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <h2 className="text-display-md font-display mb-12">The future of property is <br /> <span className="italic font-normal text-emerald">Independent.</span></h2>
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <Button size="lg" className="bg-emerald text-obsidian px-12 h-16 text-[11px] font-bold uppercase tracking-widest shadow-xl hover:bg-white transition-all">Become a Partner</Button>
            <Button size="lg" variant="secondary" className="border-white/20 text-white px-12 h-16 text-[11px] font-bold uppercase tracking-widest hover:bg-white/5">Contact Partnership Team</Button>
          </div>
        </div>
      </section>
    </div>
  );
}

