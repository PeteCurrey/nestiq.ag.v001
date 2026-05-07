"use client";

import { motion } from "framer-motion";
import { Scale, CheckCircle2, Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

const principles = [
  {
    num: "01",
    title: "Flat, Transparent Pricing",
    desc: "No complex tiered pricing or arbitrary price hikes based on your agency's success. A simple, flat-rate subscription that scales fairly with your branch network."
  },
  {
    num: "02",
    title: "Zero Multi-Year Lock-Ins",
    desc: "We believe a platform should earn your business every month. No restrictive multi-year contracts that make it difficult to reassess your software stack."
  },
  {
    num: "03",
    title: "No Pay-To-Play Visibility",
    desc: "Search results should be determined by what the buyer is looking for, not by who paid the most for a 'premium' or 'featured' listing slot."
  },
  {
    num: "04",
    title: "Agent Data Sovereignty",
    desc: "Your data belongs to you. We will never use your listings, sold prices, or vendor data to train AI models that compete against your own valuation services."
  },
  {
    num: "05",
    title: "Equal Representation",
    desc: "Independent, single-branch agencies receive the same platform capabilities and technical infrastructure as national corporate networks."
  },
  {
    num: "06",
    title: "Verified Leads Only",
    desc: "Quality over quantity. We prioritize highly-qualified, data-rich leads over generating low-intent spam just to inflate our platform's engagement metrics."
  },
  {
    num: "07",
    title: "Member Roadmap Influence",
    desc: "Founding agents have a direct channel to our product team, ensuring we build features that actually solve ground-level agency problems."
  },
  {
    num: "08",
    title: "No Competing Products",
    desc: "We are a technology partner, not a competitor. We will not launch online agency models or direct-to-vendor valuation services that bypass our partner agents."
  },
  {
    num: "09",
    title: "Strict Agency Vetting",
    desc: "To protect the integrity of the platform, only verified, professional estate and letting agencies are permitted to list properties."
  },
  {
    num: "10",
    title: "Open API Architecture",
    desc: "Your software should talk to each other. We provide open API access to ensure seamless integration with your existing CRM and marketing stack."
  }
];

export default function FairPortalCharterPage() {
  return (
    <div className="bg-silk min-h-screen">
      {/* Hero */}
      <section className="pt-40 pb-20 px-6 md:px-12 bg-obsidian text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_right,rgba(46,204,135,0.1),transparent)] pointer-events-none" />
        <div className="max-w-[1200px] mx-auto relative z-10 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald/10 mb-8 border border-emerald/20">
             <Scale className="w-8 h-8 text-emerald" />
          </div>
          <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-display leading-[1.05] mb-8">
            A fairer property portal starts <br /> with a <span className="italic font-normal text-emerald">better set of rules.</span>
          </h1>
          <p className="text-body-xl text-silk/70 mb-12 max-w-2xl mx-auto leading-relaxed">
            NestIQ is being built around transparency, agent-owned data, and a healthier relationship between agencies, vendors, buyers, and renters.
          </p>
          <Link href="/agents">
            <Button size="lg" className="bg-emerald text-obsidian px-10 h-16 text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-white transition-all">
              Join the Founding Agent Programme
            </Button>
          </Link>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-24 px-6 md:px-12 max-w-[1000px] mx-auto">
        <div className="prose prose-lg prose-emerald max-w-none text-center">
          <h2 className="text-display-sm font-display text-obsidian mb-6">The Market Frustration</h2>
          <p className="text-body-lg text-muted leading-relaxed">
            For years, independent estate agents have expressed growing frustration with the trajectory of the UK property portal market. The narrative is consistent: escalating operational costs, restrictive long-term contracts, and a feeling that the relationship between portal and agent has become dangerously unbalanced.
          </p>
          <p className="text-body-lg text-muted leading-relaxed mt-6">
            Many agencies feel they are trapped by portal dependency, forced to pay rising fees to maintain visibility while losing control of the very data that powers their business. It's a system that heavily favors legacy platforms at the expense of the independent agents who generate the inventory.
          </p>
          <div className="mt-12 p-8 bg-warm/50 border border-border/40 inline-block text-left">
            <div className="flex items-start gap-4">
               <Shield className="w-6 h-6 text-emerald shrink-0 mt-1" />
               <p className="text-body-md font-medium text-obsidian italic leading-relaxed max-w-xl">
                 "We believe the solution is not simply to build another portal, but to fundamentally redesign the rules of engagement. NestIQ is our response."
               </p>
            </div>
          </div>
        </div>
      </section>

      {/* The 10 Principles */}
      <section className="py-32 bg-white border-t border-border/30 px-6 md:px-12">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-20">
            <span className="text-[10px] font-bold text-emerald uppercase tracking-[0.5em] mb-4 block">The Charter</span>
            <h2 className="text-display-md font-display text-obsidian">The 10 Principles of a <br/><span className="italic font-normal">Fair Portal.</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
             {principles.map((p, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex gap-6 group"
                >
                  <div className="text-display-xs font-display text-border group-hover:text-emerald transition-colors shrink-0">
                    {p.num}
                  </div>
                  <div>
                    <h3 className="text-body-xl font-display text-obsidian mb-3">{p.title}</h3>
                    <p className="text-body-md text-muted leading-relaxed">{p.desc}</p>
                  </div>
                </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 text-center bg-silk px-6 border-t border-border/30">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-display-sm font-display mb-8">Ready to reclaim control?</h2>
          <p className="text-body-lg text-muted mb-12">Join hundreds of independent agencies who are actively reducing their dependency on legacy portals.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
             <Link href="/agents">
               <Button size="lg" className="bg-obsidian text-silk px-10 h-16 text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-forest w-full sm:w-auto transition-all">
                 Apply for Beta Access
               </Button>
             </Link>
             <Link href="/portal-cost-calculator">
               <Button size="lg" variant="outline" className="px-10 h-16 text-[11px] font-bold uppercase tracking-[0.3em] w-full sm:w-auto">
                 Calculate Your Savings
               </Button>
             </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
