"use client";

import { useState } from "react";
import { Check, X, ShieldCheck, Zap, Building2, Globe, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";

const tiers = [
  {
    name: "Starter",
    price: 99,
    target: "Single Branch Independent",
    description: "Essential listing visibility and lead capture for independent agencies establishing their digital footprint.",
    features: [
      "Up to 50 active listings",
      "1 branch location",
      "Basic lead capture inbox",
      "Standard email support"
    ],
    cta: "Start Free Trial"
  },
  {
    name: "Growth",
    price: 199,
    target: "Ambitious Agencies",
    description: "Advanced intelligence tools and AI generation for agencies looking to increase their local market share.",
    features: [
      "Up to 250 active listings",
      "Up to 3 branch locations",
      "AI Listing Assistant",
      "Lead Scoring & Intent Data",
      "Priority support"
    ],
    cta: "Start Free Trial",
    popular: true
  },
  {
    name: "Pro",
    price: 349,
    target: "Regional Networks",
    description: "Full intelligence suite, unlimited volume, and white-label tools for dominant regional players.",
    features: [
      "Unlimited active listings",
      "Up to 10 branch locations",
      "Territory Velocity Analytics",
      "White-label vendor reports",
      "Dedicated account manager"
    ],
    cta: "Contact Sales"
  },
  {
    name: "Enterprise",
    price: "Custom",
    target: "National Groups & Developers",
    description: "Custom API integrations, bespoke branding, and enterprise-grade SLA for major networks.",
    features: [
      "Unlimited branches",
      "Custom API architecture",
      "Franchise management",
      "Bespoke reporting dashboards",
      "24/7 technical SLA"
    ],
    cta: "Contact Enterprise Team"
  }
];

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <div className="bg-silk min-h-screen">
      
      {/* Hero & Founding Agent Callout */}
      <section className="pt-40 pb-24 px-6 md:px-12 bg-obsidian text-white relative overflow-hidden text-center">
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(46,204,135,0.05),transparent)] pointer-events-none" />
         <div className="max-w-[1000px] mx-auto relative z-10">
            <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-display leading-[1.05] mb-8">
              Transparent pricing for agencies <br/> that want <span className="italic font-normal text-emerald">more control.</span>
            </h1>
            <p className="text-body-xl text-silk/70 mb-12 max-w-2xl mx-auto leading-relaxed">
              No hidden fees, no pay-to-play visibility, and absolutely no multi-year lock-ins. You pay for software value, not access to your own data.
            </p>
         </div>
      </section>

      {/* Founding Agent Promo */}
      <section className="py-12 bg-emerald border-y border-emerald/20 text-obsidian">
         <div className="max-w-[1200px] mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="flex-1">
               <div className="flex items-center gap-3 mb-4">
                 <Star className="w-5 h-5 fill-obsidian" />
                 <h2 className="text-display-xs font-display font-bold">The Founding Agent Programme</h2>
               </div>
               <p className="text-body-lg font-medium max-w-2xl">
                 Secure lifetime price protection, enhanced onboarding, and early profile visibility by joining our beta launch. Limited availability by region.
               </p>
            </div>
            <Link href="/agents">
               <Button className="bg-obsidian text-emerald hover:bg-white hover:text-obsidian px-10 h-16 text-[11px] font-bold uppercase tracking-[0.3em] transition-all whitespace-nowrap">
                 Apply for Beta Access
               </Button>
            </Link>
         </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-32 px-6 md:px-12 max-w-[1400px] mx-auto">
         
         {/* Toggle */}
         <div className="flex items-center justify-center gap-6 mb-20">
           <span className={cn("text-[11px] font-bold uppercase tracking-widest", !isAnnual ? "text-obsidian" : "text-muted")}>Monthly</span>
           <button 
             onClick={() => setIsAnnual(!isAnnual)}
             className="w-16 h-8 rounded-full bg-obsidian relative transition-colors duration-300 flex items-center px-1"
           >
             <div className={cn(
               "w-6 h-6 rounded-full bg-emerald transition-transform duration-300 shadow-sm",
               isAnnual ? "translate-x-8" : "translate-x-0"
             )} />
           </button>
           <div className="flex items-center gap-3">
             <span className={cn("text-[11px] font-bold uppercase tracking-widest", isAnnual ? "text-obsidian" : "text-muted")}>Annually</span>
             <span className="bg-emerald/10 text-emerald text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded">
               Save 20%
             </span>
           </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {tiers.map((tier) => (
              <div 
                key={tier.name}
                className={cn(
                  "bg-white border p-10 flex flex-col relative transition-all duration-300",
                  tier.popular ? "border-emerald shadow-[0_20px_40px_rgba(46,204,135,0.1)] scale-105 z-10" : "border-border/40"
                )}
              >
                 {tier.popular && (
                   <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-emerald text-obsidian px-4 py-1 text-[9px] font-bold uppercase tracking-widest border border-emerald shadow-sm">
                     Most Popular
                   </div>
                 )}
                 <span className="text-[10px] font-bold text-muted uppercase tracking-[0.2em] mb-2 block">{tier.target}</span>
                 <h3 className="text-display-sm font-display text-obsidian mb-4">{tier.name}</h3>
                 <p className="text-body-sm text-muted mb-8 min-h-[60px]">{tier.description}</p>
                 
                 <div className="mb-10 pb-10 border-b border-border/40">
                   {typeof tier.price === "number" ? (
                      <div className="flex items-baseline gap-1">
                         <span className="text-display-md font-display text-obsidian">£{isAnnual ? Math.round(tier.price * 0.8) : tier.price}</span>
                         <span className="text-body-sm font-bold text-muted">/mo</span>
                      </div>
                   ) : (
                      <div className="text-display-md font-display text-obsidian">{tier.price}</div>
                   )}
                   {typeof tier.price === "number" && isAnnual && (
                      <span className="text-[10px] font-bold text-emerald uppercase tracking-widest block mt-2">Billed annually</span>
                   )}
                 </div>

                 <ul className="space-y-4 flex-1 mb-10">
                    {tier.features.map(f => (
                      <li key={f} className="flex items-start gap-3">
                         <Check className="w-4 h-4 text-emerald shrink-0 mt-0.5" />
                         <span className="text-body-sm font-medium text-obsidian">{f}</span>
                      </li>
                    ))}
                 </ul>

                 <Button 
                   variant={tier.popular ? "primary" : "outline"} 
                   className={cn("w-full h-14 text-[10px] font-bold uppercase tracking-widest", tier.popular ? "bg-obsidian text-silk hover:bg-forest border-none" : "border-border/40 hover:bg-pearl")}
                 >
                   {tier.cta}
                 </Button>
              </div>
            ))}
         </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-32 bg-white border-t border-border/30 px-6 md:px-12">
         <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-20">
               <span className="text-[10px] font-bold text-emerald uppercase tracking-[0.5em] mb-4 block">Platform Capabilities</span>
               <h2 className="text-display-md font-display text-obsidian">Compare all features.</h2>
            </div>
            
            <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse min-w-[800px]">
                  <thead>
                     <tr>
                        <th className="p-6 border-b border-obsidian text-[10px] font-bold uppercase tracking-widest text-obsidian w-1/3">Feature Category</th>
                        <th className="p-6 border-b border-obsidian text-[10px] font-bold uppercase tracking-widest text-obsidian">Starter</th>
                        <th className="p-6 border-b border-emerald text-[10px] font-bold uppercase tracking-widest text-emerald bg-emerald/5 relative">
                           Growth
                           <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald text-obsidian px-2 py-0.5 text-[8px] rounded-sm">RECOMMENDED</div>
                        </th>
                        <th className="p-6 border-b border-obsidian text-[10px] font-bold uppercase tracking-widest text-obsidian">Pro</th>
                     </tr>
                  </thead>
                  <tbody>
                     {/* Capacity */}
                     <tr className="bg-pearl/50"><td colSpan={4} className="px-6 py-3 text-[9px] font-bold uppercase tracking-widest text-muted">Capacity</td></tr>
                     {[
                       { f: "Active Listings", s: "50", g: "250", p: "Unlimited" },
                       { f: "Branch Locations", s: "1", g: "3", p: "10" },
                       { f: "User Accounts", s: "3", g: "10", p: "Unlimited" }
                     ].map((row, i) => (
                        <tr key={`cap-${i}`} className="border-b border-border/20 hover:bg-pearl/20 transition-colors">
                           <td className="p-6 text-body-sm font-medium text-obsidian">{row.f}</td>
                           <td className="p-6 text-body-sm text-muted">{row.s}</td>
                           <td className="p-6 text-body-sm font-bold text-obsidian bg-emerald/5">{row.g}</td>
                           <td className="p-6 text-body-sm text-muted">{row.p}</td>
                        </tr>
                     ))}

                     {/* Intelligence */}
                     <tr className="bg-pearl/50"><td colSpan={4} className="px-6 py-3 text-[9px] font-bold uppercase tracking-widest text-muted mt-8 block border-t border-border/40">Intelligence & AI</td></tr>
                     {[
                       { f: "AI Listing Generator", s: <X className="w-4 h-4 text-border" />, g: <Check className="w-4 h-4 text-emerald" />, p: <Check className="w-4 h-4 text-emerald" /> },
                       { f: "Lead Intent Scoring", s: <X className="w-4 h-4 text-border" />, g: <Check className="w-4 h-4 text-emerald" />, p: <Check className="w-4 h-4 text-emerald" /> },
                       { f: "Territory Velocity Data", s: <X className="w-4 h-4 text-border" />, g: <X className="w-4 h-4 text-border" />, p: <Check className="w-4 h-4 text-emerald" /> },
                       { f: "Vendor Reporting", s: <X className="w-4 h-4 text-border" />, g: "Standard", p: "White-Labelled" }
                     ].map((row, i) => (
                        <tr key={`intel-${i}`} className="border-b border-border/20 hover:bg-pearl/20 transition-colors">
                           <td className="p-6 text-body-sm font-medium text-obsidian">{row.f}</td>
                           <td className="p-6 text-body-sm text-muted">{row.s}</td>
                           <td className="p-6 text-body-sm font-bold text-obsidian bg-emerald/5">{row.g}</td>
                           <td className="p-6 text-body-sm text-muted">{row.p}</td>
                        </tr>
                     ))}

                     {/* Platform */}
                     <tr className="bg-pearl/50"><td colSpan={4} className="px-6 py-3 text-[9px] font-bold uppercase tracking-widest text-muted mt-8 block border-t border-border/40">Platform & Support</td></tr>
                     {[
                       { f: "API / CRM Sync", s: "Daily", g: "Real-time", p: "Real-time + Webhooks" },
                       { f: "Data Export", s: "CSV", g: "CSV / JSON", p: "Direct DB Connection" },
                       { f: "Support Level", s: "Email", g: "Priority Email", p: "Dedicated Account Manager" }
                     ].map((row, i) => (
                        <tr key={`plat-${i}`} className="border-b border-border/20 hover:bg-pearl/20 transition-colors last:border-0">
                           <td className="p-6 text-body-sm font-medium text-obsidian">{row.f}</td>
                           <td className="p-6 text-body-sm text-muted">{row.s}</td>
                           <td className="p-6 text-body-sm font-bold text-obsidian bg-emerald/5">{row.g}</td>
                           <td className="p-6 text-body-sm text-muted">{row.p}</td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
      </section>
    </div>
  );
}
