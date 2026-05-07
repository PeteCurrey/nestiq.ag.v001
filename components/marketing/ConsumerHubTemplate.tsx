import { Metadata } from "next";
import Link from "next/link";
import { Search, ChevronRight, Calculator, Home, Info, ArrowRight, Building2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ConsumerHubTemplateProps {
  h1: string;
  intro: string;
  icon: React.ElementType;
  primaryAction: {
    label: string;
    href: string;
    icon: React.ElementType;
  };
  tools: {
    title: string;
    desc: string;
  }[];
  guides: {
    title: string;
    readTime: string;
  }[];
  faqs: {
    q: string;
    a: string;
  }[];
}

export function ConsumerHubTemplate({
  h1,
  intro,
  icon: Icon,
  primaryAction,
  tools,
  guides,
  faqs
}: ConsumerHubTemplateProps) {
  return (
    <div className="bg-silk min-h-screen">
      {/* Hero */}
      <section className="pt-32 pb-20 px-6 md:px-12 bg-obsidian text-white text-center border-b border-white/10 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(46,204,135,0.05),transparent)] pointer-events-none" />
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald/10 mb-8 border border-emerald/20">
             <Icon className="w-8 h-8 text-emerald" />
          </div>
          <h1 className="text-[clamp(2.5rem,4vw,4rem)] font-display leading-[1.05] mb-6">
            {h1}
          </h1>
          <p className="text-body-lg text-silk/70 mb-10 max-w-xl mx-auto leading-relaxed">
            {intro}
          </p>
          <Link href={primaryAction.href}>
             <Button size="lg" className="bg-emerald text-obsidian px-10 h-16 text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-white transition-all flex items-center mx-auto">
               {primaryAction.label} <primaryAction.icon className="w-4 h-4 ml-3" />
             </Button>
          </Link>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-24 grid grid-cols-1 lg:grid-cols-12 gap-16">
         
         <div className="lg:col-span-8 space-y-24">
            {/* Guides Section */}
            <section>
               <h2 className="text-display-xs font-display text-obsidian mb-8 border-b border-border/40 pb-4">Essential Guides</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {guides.map((guide, i) => (
                    <div key={i} className="group p-8 bg-white border border-border/40 hover:border-emerald/40 transition-colors cursor-pointer">
                       <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-emerald mb-4 block">{guide.readTime}</span>
                       <h3 className="text-body-lg font-display text-obsidian mb-6 group-hover:text-emerald transition-colors">{guide.title}</h3>
                       <span className="flex items-center gap-2 text-[10px] font-bold text-muted uppercase tracking-widest group-hover:text-obsidian group-hover:translate-x-2 transition-all">Read Guide <ArrowRight className="w-3 h-3" /></span>
                    </div>
                  ))}
               </div>
            </section>

            {/* FAQs Section */}
            <section>
               <h2 className="text-display-xs font-display text-obsidian mb-8 border-b border-border/40 pb-4">Frequently Asked Questions</h2>
               <div className="space-y-4">
                  {faqs.map((faq, i) => (
                    <div key={i} className="p-8 bg-pearl border border-border/20">
                       <h3 className="text-body-lg font-bold text-obsidian mb-4">{faq.q}</h3>
                       <p className="text-muted leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
               </div>
            </section>
         </div>

         {/* Sidebar */}
         <div className="lg:col-span-4 space-y-8">
            
            {/* Tools Widget */}
            <div className="bg-white border border-border/40 p-8 shadow-sm">
               <h3 className="text-[11px] font-bold uppercase tracking-[0.3em] text-obsidian mb-6 flex items-center gap-2">
                 <Calculator className="w-4 h-4 text-emerald" /> Property Tools
               </h3>
               <div className="space-y-4 mb-6">
                  {tools.map((tool, i) => (
                    <Link key={i} href="/tools" className="block p-4 bg-pearl hover:bg-warm/50 border border-border/20 transition-colors group">
                       <h4 className="text-body-sm font-bold text-obsidian group-hover:text-emerald transition-colors">{tool.title}</h4>
                       <p className="text-[11px] text-muted mt-1">{tool.desc}</p>
                    </Link>
                  ))}
               </div>
               <p className="text-[9px] text-muted flex items-start gap-2 bg-pearl/50 p-3">
                 <Info className="w-3 h-3 shrink-0 mt-0.5" /> 
                 Indicative only. Not financial or legal advice. Always consult a professional.
               </p>
            </div>

            {/* Agent Connection Promo */}
            <div className="bg-obsidian text-white p-8 relative overflow-hidden group text-center">
               <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-emerald/10 blur-[40px] rounded-full group-hover:bg-emerald/20 transition-colors" />
               <Building2 className="w-8 h-8 text-emerald mx-auto mb-6 relative z-10" />
               <h3 className="text-body-xl font-display mb-4 relative z-10">Speak to an Expert</h3>
               <p className="text-body-sm text-white/60 mb-8 relative z-10">Connect with one of our verified, independent local estate agents for professional advice.</p>
               <Link href="/agents/directory">
                  <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10 text-[10px] font-bold uppercase tracking-widest relative z-10">Find a Local Agent</Button>
               </Link>
            </div>

         </div>

      </div>
    </div>
  );
}
