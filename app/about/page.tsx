import { Button } from "@/components/ui/Button";
import { ShieldCheck, Zap, BarChart3, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="bg-obsidian py-32 md:py-48 px-6">
        <div className="max-w-[1400px] mx-auto text-center">
          <h1 className="text-display-lg md:text-display-xl text-white mb-8">
            Built for Agents. <br className="hidden md:block" />
            <span className="text-emerald">Designed for Buyers.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-pearl/60 text-body-lg leading-relaxed mb-12">
            We're building the UK property portal that should have always existed — fair, transparent, and on your side.
          </p>
          <Button href="/pricing" size="lg" className="bg-emerald text-white hover:bg-emerald/90">
            Become a Partner Agent
          </Button>
        </div>
      </section>

      {/* Principles */}
      <section className="py-24 md:py-32 bg-pearl px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24">
            <div className="space-y-6">
              <div className="w-12 h-12 bg-forest/5 flex items-center justify-center rounded-sm">
                <Users className="w-6 h-6 text-forest" />
              </div>
              <h3 className="text-display-sm font-display text-obsidian">Agent-First</h3>
              <p className="text-muted leading-relaxed">
                We charge estate agents a fair subscription, not an extortionate levy. From £199/month with no lock-in contracts.
              </p>
            </div>
            <div className="space-y-6">
              <div className="w-12 h-12 bg-forest/5 flex items-center justify-center rounded-sm">
                <ShieldCheck className="w-6 h-6 text-forest" />
              </div>
              <h3 className="text-display-sm font-display text-obsidian">Transparent</h3>
              <p className="text-muted leading-relaxed">
                No hidden fees. No pay-to-play listings. No auction-style bidding for top placement. Every listing is treated equally.
              </p>
            </div>
            <div className="space-y-6">
              <div className="w-12 h-12 bg-forest/5 flex items-center justify-center rounded-sm">
                <BarChart3 className="w-6 h-6 text-forest" />
              </div>
              <h3 className="text-display-sm font-display text-obsidian">Data Yours</h3>
              <p className="text-muted leading-relaxed">
                Your listings, your leads, your data. We never use agent data to compete with valuation services or train models against your interests.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-24 md:py-32 bg-white px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="max-w-4xl">
            <span className="text-emerald font-bold uppercase tracking-[0.3em] text-[10px] mb-6 block">Our Mission</span>
            <h2 className="text-display-md text-obsidian mb-10 leading-tight">
              The UK property market is broken. Rightmove has a 70%+ profit margin and raised fees by 18% in 2025 while inflation sat at 2.5%. 
            </h2>
            <p className="text-body-lg text-muted leading-relaxed mb-8">
              Independent agents — the backbone of the UK housing market — are being squeezed out. Nestiq was built to change that.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 md:py-32 bg-pearl px-6">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-display-sm text-obsidian mb-16">Meet the Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
            {[
              { name: "Pete Barrett", role: "Founder & CEO", location: "Chesterfield, Derbyshire", initials: "PB" },
              { name: "Sarah Jennings", role: "Head of Partnerships", location: "Manchester", initials: "SJ" },
              { name: "David Chen", role: "CTO", location: "London", initials: "DC" },
            ].map((member) => (
              <div key={member.name} className="bg-white p-10 border border-border/40 shadow-sm">
                <div className="w-16 h-16 bg-forest text-white flex items-center justify-center text-xl font-display mb-8">
                  {member.initials}
                </div>
                <h4 className="text-body-lg font-bold text-obsidian mb-1">{member.name}</h4>
                <p className="text-[10px] font-bold text-emerald uppercase tracking-widest mb-4">{member.role}</p>
                <p className="text-body-sm text-muted">{member.location}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
