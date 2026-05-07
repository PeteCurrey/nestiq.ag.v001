import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Download, Calculator, Search, TrendingUp, Sparkles, Building2, ShieldCheck, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Agency Resource Hub | Insights & Guides for Independent Estate Agents | NestIQ",
  description: "Expert guides, industry reports, and downloadable templates designed to help independent estate agents grow, reduce portal dependency, and master property marketing.",
};

const categories = [
  { name: "Portal Costs", icon: TrendingUp },
  { name: "Estate Agent Growth", icon: Building2 },
  { name: "AI for Estate Agents", icon: Sparkles },
  { name: "Compliance", icon: ShieldCheck },
  { name: "Templates & Downloads", icon: Download }
];

const latestGuides = [
  {
    title: "How Independent Estate Agents Can Reduce Portal Dependency",
    category: "Portal Costs",
    readTime: "8 min read",
    slug: "how-to-reduce-portal-dependency"
  },
  {
    title: "Rightmove Alternatives for UK Estate Agents",
    category: "Market Reports",
    readTime: "12 min read",
    slug: "rightmove-alternatives-uk-estate-agents"
  },
  {
    title: "How Much Should Estate Agents Pay for Portals?",
    category: "Portal Costs",
    readTime: "6 min read",
    slug: "estate-agent-portal-costs-guide"
  },
  {
    title: "AI Listing Generators vs Manual Copy",
    category: "AI for Estate Agents",
    readTime: "5 min read",
    slug: "ai-listing-generators-vs-manual-copy"
  },
  {
    title: "The 2024 Guide to Local Agency SEO",
    category: "Property Marketing",
    readTime: "15 min read",
    slug: "2024-guide-local-agency-seo"
  }
];

export default function ResourceHubPage() {
  return (
    <div className="bg-silk min-h-screen">
      {/* Hero Section */}
      <section className="pt-40 pb-24 px-6 md:px-12 bg-obsidian text-white border-b border-white/10">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-emerald/10 border border-emerald/20 rounded-full mb-8">
              <BookOpen className="w-4 h-4 text-emerald" />
              <span className="text-[10px] font-bold text-emerald uppercase tracking-[0.5em]">Industry Intelligence</span>
            </div>
            <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-display leading-[1.05] mb-8">
              The Agency <br/> <span className="italic font-normal text-emerald">Resource Hub.</span>
            </h1>
            <p className="text-body-xl text-silk/70 mb-10 max-w-xl leading-relaxed">
              Expert guides, market reports, and strategic tools designed to help independent estate agents grow and reclaim control of their data.
            </p>
            
            <div className="relative max-w-lg">
               <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
               <input 
                 type="text" 
                 placeholder="Search guides, templates, and reports..." 
                 className="w-full bg-white/5 border border-white/10 text-white placeholder:text-white/40 pl-12 pr-4 py-4 text-body-sm outline-none focus:border-emerald/40 transition-colors"
               />
            </div>
          </div>
          
          {/* Featured Article Card */}
          <Link href="/resources/how-to-reduce-portal-dependency" className="block group">
            <div className="relative aspect-[4/3] bg-obsidian border border-white/10 overflow-hidden shadow-2xl">
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:opacity-50 group-hover:scale-105 transition-all duration-700" />
               <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/60 to-transparent" />
               <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                  <span className="inline-block px-3 py-1 bg-emerald text-obsidian text-[9px] font-bold uppercase tracking-widest mb-4">Featured Guide</span>
                  <h3 className="text-display-sm font-display text-white mb-4 leading-tight group-hover:text-emerald transition-colors">How Independent Estate Agents Can Reduce Portal Dependency</h3>
                  <p className="text-body-sm text-white/60 mb-6 line-clamp-2">A strategic breakdown of how modern agencies are shifting their marketing spend to build proprietary audiences and reduce reliance on expensive legacy portals.</p>
                  <span className="flex items-center gap-2 text-[10px] font-bold text-emerald uppercase tracking-widest group-hover:translate-x-2 transition-transform">Read Full Guide <ArrowRight className="w-3 h-3" /></span>
               </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Category Navigation */}
      <section className="bg-white border-b border-border/40 sticky top-20 z-30 hidden md:block">
         <div className="max-w-[1400px] mx-auto px-6 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-12 py-6">
               <span className="text-[10px] font-bold uppercase tracking-widest text-muted shrink-0">Topics:</span>
               {categories.map(cat => (
                 <button key={cat.name} className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-obsidian hover:text-emerald transition-colors whitespace-nowrap">
                   <cat.icon className="w-4 h-4 opacity-50" /> {cat.name}
                 </button>
               ))}
            </div>
         </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-24 grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Main Content: Latest Guides */}
        <div className="lg:col-span-8 space-y-16">
           <div>
             <h2 className="text-display-xs font-display text-obsidian mb-10 border-b border-border/40 pb-4">Latest Insights</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {latestGuides.map(guide => (
                  <Link key={guide.slug} href={`/resources/${guide.slug}`} className="group block bg-white border border-border/40 p-8 hover:border-emerald/40 transition-colors">
                     <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-emerald mb-4 block">{guide.category} • {guide.readTime}</span>
                     <h3 className="text-body-xl font-display text-obsidian mb-6 group-hover:text-emerald transition-colors leading-snug">{guide.title}</h3>
                     <span className="flex items-center gap-2 text-[10px] font-bold text-muted uppercase tracking-widest group-hover:text-obsidian group-hover:translate-x-2 transition-all">Read Article <ArrowRight className="w-3 h-3" /></span>
                  </Link>
                ))}
             </div>
           </div>
        </div>

        {/* Sidebar Tools & CTAs */}
        <div className="lg:col-span-4 space-y-8">
           
           {/* Calculator Promo */}
           <div className="bg-obsidian text-white p-10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald/10 blur-[40px] rounded-full group-hover:bg-emerald/20 transition-colors" />
              <Calculator className="w-8 h-8 text-emerald mb-6 relative z-10" />
              <h3 className="text-body-xl font-display mb-4 relative z-10">Portal Cost Calculator</h3>
              <p className="text-body-sm text-white/60 mb-8 relative z-10">Compare your current software and portal spend against NestIQ's flat-rate proposition.</p>
              <Link href="/portal-cost-calculator">
                 <Button className="w-full bg-emerald text-obsidian text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-colors relative z-10">Calculate Savings</Button>
              </Link>
           </div>

           {/* Downloads Promo */}
           <div className="bg-pearl border border-border/40 p-10">
              <Download className="w-8 h-8 text-obsidian mb-6" />
              <h3 className="text-body-xl font-display text-obsidian mb-4">Templates & Downloads</h3>
              <ul className="space-y-4 mb-8">
                 <li className="flex items-center gap-3 text-body-sm text-muted hover:text-emerald transition-colors cursor-pointer">
                   <ChevronRight className="w-4 h-4 text-emerald" /> Vendor Valuation Presentation Deck
                 </li>
                 <li className="flex items-center gap-3 text-body-sm text-muted hover:text-emerald transition-colors cursor-pointer">
                   <ChevronRight className="w-4 h-4 text-emerald" /> Local SEO Checklist for Agents
                 </li>
                 <li className="flex items-center gap-3 text-body-sm text-muted hover:text-emerald transition-colors cursor-pointer">
                   <ChevronRight className="w-4 h-4 text-emerald" /> Pre-Listing Photography Guide
                 </li>
              </ul>
           </div>

           {/* Founding Agent Promo */}
           <div className="bg-emerald text-obsidian p-10 text-center">
              <Building2 className="w-8 h-8 mx-auto mb-4" />
              <h3 className="text-body-lg font-bold uppercase tracking-wider mb-2">Founding Agent Beta</h3>
              <p className="text-body-sm text-obsidian/80 mb-6">Join early to secure territory visibility and lifetime price protection.</p>
              <Link href="/agents">
                 <Button variant="outline" className="w-full border-obsidian text-obsidian hover:bg-obsidian hover:text-emerald text-[10px] font-bold uppercase tracking-widest">Apply Now</Button>
              </Link>
           </div>

        </div>

      </div>
    </div>
  );
}
