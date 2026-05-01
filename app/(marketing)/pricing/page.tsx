"use client";

import { Check, ArrowRight, ShieldCheck, Zap, Globe, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SavingCalculator } from "@/components/shared/SavingCalculator";
import { cn } from "@/lib/utils/cn";

const plans = [
  {
    name: "Starter",
    price: "199",
    description: "Perfect for boutique agencies and independent agents.",
    features: [
      "Up to 25 active listings",
      "Standard Search placement",
      "Basic AI Description tool",
      "Lead email notifications",
      "Agent profile page",
      "Standard support"
    ],
    button: "Start Free Trial",
    popular: false
  },
  {
    name: "Growth",
    price: "499",
    description: "For established agencies looking to scale aggressively.",
    features: [
      "Up to 100 active listings",
      "Featured Search placement",
      "Unlimited AI Description tool",
      "Full CRM dashboard",
      "Lead SMS notifications",
      "Priority email support",
      "Performance analytics"
    ],
    button: "Start Free Trial",
    popular: true
  },
  {
    name: "Pro",
    price: "999",
    description: "Enterprise features for multi-branch operations.",
    features: [
      "Unlimited active listings",
      "Premium 'Top of Search' slots",
      "Multi-user team accounts",
      "API access & Webhooks",
      "Dedicated account manager",
      "24/7 Phone support",
      "White-label reporting"
    ],
    button: "Contact Sales",
    popular: false
  }
];

export default function PricingPage() {
  return (
    <div className="bg-pearl min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 text-center mb-20">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-forest/5 border border-forest/10 rounded-full mb-8">
          <ShieldCheck className="w-4 h-4 text-forest" />
          <span className="text-label text-forest uppercase font-bold tracking-widest">Pricing Built for Growth</span>
        </div>
        <h1 className="text-display-lg md:text-display-xl font-display font-extrabold text-obsidian mb-6">
          Simple, Fair, <span className="text-forest">Transparent.</span>
        </h1>
        <p className="text-body-xl text-muted max-w-2xl mx-auto">
          No hidden fees. No long-term contracts. Just a world-class platform 
          designed to get your listings seen by more buyers.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
        {plans.map((plan) => (
          <div 
            key={plan.name}
            className={cn(
              "relative bg-white p-10 rounded-3xl border transition-all duration-500",
              plan.popular ? "border-forest shadow-2xl scale-105 z-10" : "border-border shadow-sm hover:shadow-lg"
            )}
          >
            {plan.popular && (
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-forest text-white px-6 py-2 rounded-full text-label font-bold uppercase tracking-widest">
                Most Popular
              </div>
            )}
            
            <div className="mb-10">
               <h3 className="text-display-sm font-display font-bold text-obsidian mb-2">{plan.name}</h3>
               <p className="text-body-sm text-muted mb-8 leading-relaxed">{plan.description}</p>
               <div className="flex items-baseline gap-1">
                  <span className="text-display-md font-display font-extrabold text-obsidian">£{plan.price}</span>
                  <span className="text-body-md text-muted font-bold">/month</span>
               </div>
            </div>

            <ul className="space-y-4 mb-12">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-forest/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-forest" />
                  </div>
                  <span className="text-body-sm text-obsidian font-medium">{feature}</span>
                </li>
              ))}
            </ul>

            <Button 
              variant={plan.popular ? "primary" : "outline"} 
              fullWidth 
              size="lg"
              className={cn(plan.popular && "bg-forest hover:bg-forest/90")}
            >
              {plan.button}
            </Button>
          </div>
        ))}
      </div>

      <SavingCalculator />

      {/* Comparison Table */}
      <section className="py-24 max-w-5xl mx-auto px-4">
         <h2 className="text-display-md font-display font-extrabold text-obsidian text-center mb-16">Compare to Rightmove</h2>
         <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
            <table className="w-full text-left">
               <thead>
                  <tr className="bg-warm border-b border-border">
                     <th className="p-6 text-label font-bold uppercase tracking-widest text-muted">Feature</th>
                     <th className="p-6 text-label font-bold uppercase tracking-widest text-forest">Nestiq</th>
                     <th className="p-6 text-label font-bold uppercase tracking-widest text-red-600">Rightmove</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-border">
                  {[
                    { f: "Monthly Fee", n: "From £199", r: "£1,500 - £2,500+" },
                    { f: "Listing Descriptions", n: "Claude 3.5 AI Included", r: "Manual / 3rd Party" },
                    { f: "CRM Integration", n: "Built-in (Growth+)", r: "Paid Extra" },
                    { f: "Contract Term", n: "Monthly (No Lock-in)", r: "12-24 Months" },
                    { f: "Mobile App Access", n: "Included Free", r: "Paid Feature" },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-pearl transition-colors">
                       <td className="p-6 text-body-sm font-bold text-obsidian">{row.f}</td>
                       <td className="p-6 text-body-sm font-medium text-forest">{row.n}</td>
                       <td className="p-6 text-body-sm font-medium text-red-600">{row.r}</td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-obsidian text-white">
         <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-display-sm font-display font-bold mb-16 text-center">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
               {[
                 { q: "How long is the free trial?", a: "Every Nestiq account starts with a 14-day free trial of our Growth plan. No credit card required." },
                 { q: "Can I upgrade or downgrade?", a: "Yes, you can change your plan at any time from your billing dashboard. Changes take effect on the next billing cycle." },
                 { q: "Do you have multi-branch discounts?", a: "Yes, for agencies with more than 3 branches, please contact our sales team for custom volume pricing." },
                 { q: "How are leads delivered?", a: "Leads are delivered via real-time email, SMS (Growth+), and stored in your Nestiq CRM dashboard." },
               ].map((faq, i) => (
                 <div key={i}>
                    <h4 className="text-body-lg font-bold mb-4 text-emerald">{faq.q}</h4>
                    <p className="text-body-md text-white/60 leading-relaxed">{faq.a}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>
    </div>
  );
}
