import { Metadata } from "next";
import Link from "next/link";
import { Calculator, ArrowRight, Home, Percent, PoundSterling, Activity, Compass, Target, ClipboardList } from "lucide-react";

export const metadata: Metadata = {
  title: "Property Tools & Calculators | NestIQ",
  description: "Free, independent property tools including mortgage calculators, rental yields, and moving costs. Indicative figures to help you plan your next move.",
};

const tools = [
  { icon: PoundSterling, title: "Property Value Estimate", desc: "Get an indicative algorithm-based valuation for any UK residential property.", slug: "/tools/property-value-estimate" },
  { icon: Percent, title: "Mortgage Affordability", desc: "Calculate how much you could borrow based on your income and deposit.", slug: "/tools/mortgage-affordability" },
  { icon: Home, title: "Rent Affordability", desc: "Understand your comfortable monthly rental limit based on your salary.", slug: "/tools/rent-affordability" },
  { icon: Calculator, title: "Moving Cost Calculator", desc: "Estimate the total cost of moving, including solicitors, surveys, and removals.", slug: "/tools/moving-cost-calculator" },
  { icon: Activity, title: "Stamp Duty Calculator", desc: "Calculate your exact SDLT liability based on the latest government thresholds.", slug: "/tools/stamp-duty-calculator" },
  { icon: Target, title: "Rental Yield Calculator", desc: "Instantly calculate gross and net rental yields for investment properties.", slug: "/tools/rental-yield-calculator" },
  { icon: Compass, title: "Area Comparison Tool", desc: "Compare two postcodes side-by-side on price, safety, and amenities.", slug: "/tools/area-comparison-tool" },
  { icon: ClipboardList, title: "Offer Readiness Checklist", desc: "Ensure you have everything prepared before submitting an offer on a property.", slug: "/tools/offer-readiness-checklist" }
];

export default function ToolsHubPage() {
  return (
    <div className="bg-silk min-h-screen">
      <section className="pt-32 pb-24 px-6 md:px-12 bg-obsidian text-white text-center border-b border-white/10">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald/10 mb-8 border border-emerald/20">
             <Calculator className="w-8 h-8 text-emerald" />
          </div>
          <h1 className="text-[clamp(2.5rem,4vw,4rem)] font-display leading-[1.05] mb-6">
            Property Tools & <br /> <span className="italic font-normal text-emerald">Calculators.</span>
          </h1>
          <p className="text-body-lg text-silk/70 mb-10 max-w-xl mx-auto leading-relaxed">
            Free, independent tools to help you plan your move. Please note these calculators provide indicative figures only and do not constitute formal financial advice.
          </p>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-6 md:px-12 py-24">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map((tool, i) => (
              <Link href={tool.slug} key={i}>
                <div className="bg-white border border-border/40 p-10 hover:border-emerald/40 transition-colors group cursor-pointer h-full">
                   <tool.icon className="w-8 h-8 text-obsidian mb-6" strokeWidth={1.5} />
                   <h3 className="text-body-xl font-display text-obsidian mb-4 group-hover:text-emerald transition-colors">{tool.title}</h3>
                   <p className="text-muted leading-relaxed mb-8">{tool.desc}</p>
                   <span className="flex items-center gap-2 text-[10px] font-bold text-obsidian uppercase tracking-widest group-hover:translate-x-2 transition-all">Launch Tool <ArrowRight className="w-3 h-3 text-emerald" /></span>
                </div>
              </Link>
            ))}
         </div>
      </section>
    </div>
  );
}
