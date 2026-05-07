import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, XCircle, Building2, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface CampaignTemplateProps {
  h1: string;
  intro: string;
  problemTitle: string;
  problemDesc: string;
  solutionTitle: string;
  solutionDesc: string;
}

export function CampaignTemplate({
  h1,
  intro,
  problemTitle,
  problemDesc,
  solutionTitle,
  solutionDesc
}: CampaignTemplateProps) {
  return (
    <div className="bg-silk min-h-screen">
      {/* Hero */}
      <section className="pt-40 pb-24 px-6 md:px-12 bg-obsidian text-white border-b border-white/10">
        <div className="max-w-[1000px] mx-auto text-center">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-emerald/10 border border-emerald/20 rounded-full mb-8">
            <Building2 className="w-4 h-4 text-emerald" />
            <span className="text-[10px] font-bold text-emerald uppercase tracking-[0.5em]">Agent Growth Platform</span>
          </div>
          <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-display leading-[1.05] mb-8">
            {h1}
          </h1>
          <p className="text-body-xl text-silk/70 mb-10 max-w-2xl mx-auto leading-relaxed">
            {intro}
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/agents">
               <Button className="bg-emerald text-obsidian px-10 h-16 text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-white transition-all">
                 Join Founding Beta
               </Button>
            </Link>
            <Link href="/portal-cost-calculator">
               <Button variant="outline" className="border-white/20 text-white px-10 h-16 text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-white/5 transition-all">
                 Compare Portal Costs
               </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Problem & Solution */}
      <section className="py-24 px-6 md:px-12 max-w-[1200px] mx-auto">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="bg-white p-10 md:p-12 border border-border/40">
               <TrendingDown className="w-10 h-10 text-obsidian opacity-50 mb-6" />
               <h2 className="text-display-xs font-display text-obsidian mb-6">{problemTitle}</h2>
               <p className="text-body-lg text-muted leading-relaxed whitespace-pre-line">{problemDesc}</p>
            </div>
            <div className="bg-emerald/5 p-10 md:p-12 border border-emerald/20 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-emerald/10 blur-[40px] rounded-full" />
               <CheckCircle2 className="w-10 h-10 text-emerald mb-6 relative z-10" />
               <h2 className="text-display-xs font-display text-obsidian mb-6 relative z-10">{solutionTitle}</h2>
               <p className="text-body-lg text-obsidian/80 leading-relaxed whitespace-pre-line relative z-10">{solutionDesc}</p>
            </div>
         </div>
      </section>

      {/* Comparison Table */}
      <section className="py-24 bg-white border-t border-border/30 px-6 md:px-12">
         <div className="max-w-[1000px] mx-auto">
            <div className="text-center mb-16">
               <span className="text-[10px] font-bold text-emerald uppercase tracking-[0.5em] mb-4 block">Platform Comparison</span>
               <h2 className="text-display-sm font-display text-obsidian">Current Market vs NestIQ Beta</h2>
            </div>
            
            <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse">
                  <thead>
                     <tr>
                        <th className="p-6 border-b border-border/40 text-[10px] font-bold uppercase tracking-widest text-muted">Feature</th>
                        <th className="p-6 border-b border-border/40 text-[10px] font-bold uppercase tracking-widest text-muted bg-pearl w-1/3">Legacy Portals</th>
                        <th className="p-6 border-b border-border/40 text-[10px] font-bold uppercase tracking-widest text-emerald bg-emerald/5 w-1/3">NestIQ Beta</th>
                     </tr>
                  </thead>
                  <tbody>
                     {[
                       { label: "Pricing Model", legacy: "Tiered & Escalating", nestiq: "Flat Rate Subscription" },
                       { label: "Contract Length", legacy: "Multi-Year Lock-ins", nestiq: "Rolling Monthly" },
                       { label: "Lead Ownership", legacy: "Portal retains data rights", nestiq: "100% Agent Owned" },
                       { label: "Listing Visibility", legacy: "Pay-to-play featured slots", nestiq: "Equal algorithmic visibility" },
                       { label: "Competing Products", legacy: "Direct-to-vendor valuation tools", nestiq: "No competing products ever" },
                     ].map((row, i) => (
                        <tr key={i} className="border-b border-border/20 last:border-0">
                           <td className="p-6 text-body-sm font-bold text-obsidian">{row.label}</td>
                           <td className="p-6 text-body-sm text-muted bg-pearl/50">
                              <div className="flex items-center gap-3">
                                 <XCircle className="w-4 h-4 text-obsidian/30" /> {row.legacy}
                              </div>
                           </td>
                           <td className="p-6 text-body-sm text-obsidian font-medium bg-emerald/5">
                              <div className="flex items-center gap-3">
                                 <CheckCircle2 className="w-4 h-4 text-emerald" /> {row.nestiq}
                              </div>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
      </section>

      {/* CTA */}
      <section className="py-32 text-center bg-obsidian text-silk relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(46,204,135,0.05),transparent)] pointer-events-none" />
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <h2 className="text-display-md font-display mb-12">Take back control of your <br /> <span className="italic font-normal text-emerald">lead generation.</span></h2>
          <Link href="/agents">
            <Button size="lg" className="bg-emerald text-obsidian px-12 h-16 text-[11px] font-bold uppercase tracking-widest shadow-xl hover:bg-white transition-all">
               Become a Founding Partner
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
