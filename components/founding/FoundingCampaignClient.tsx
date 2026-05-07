"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowDown, MapPin, Calendar as CalendarIcon, Video, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

// TopoJSON for UK map (lightweight boundaries)
const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/united-kingdom/uk-counties.json";

export function FoundingCampaignClient({ recipient }: { recipient: any }) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Tracking
  const [hasTrackedView, setHasTrackedView] = useState(false);
  const [scrollDepth, setScrollDepth] = useState(0);

  // Booking state
  const [visitType, setVisitType] = useState<'zoom' | 'in_person' | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [isBooking, setIsBooking] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(recipient.state === 'booked' || recipient.state === 'confirmed');

  // Savings slider state
  const [monthlySpend, setMonthlySpend] = useState(recipient.estimated_current_spend_monthly || 2500);
  const hasPredefinedSpend = !!recipient.estimated_current_spend_monthly;

  // Setup Lenis & GSAP
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Fade-in sections
    gsap.utils.toArray<HTMLElement>(".reveal-section").forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 50 },
        {
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 50%",
            scrub: true,
          },
          opacity: 1,
          y: 0,
        }
      );
    });

    // Animate stats
    gsap.utils.toArray<HTMLElement>(".stat-number").forEach((stat) => {
      const target = parseFloat(stat.getAttribute("data-target") || "0");
      const prefix = stat.getAttribute("data-prefix") || "";
      const suffix = stat.getAttribute("data-suffix") || "";
      
      gsap.fromTo(stat, 
        { innerHTML: 0 }, 
        {
          innerHTML: target,
          duration: 2,
          scrollTrigger: {
            trigger: stat,
            start: "top 85%",
          },
          snap: { innerHTML: 1 },
          onUpdate: function() {
            stat.innerHTML = `${prefix}${Math.ceil(Number(this.targets()[0].innerHTML)).toLocaleString()}${suffix}`;
          }
        }
      );
    });

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  // Track initial view and scroll depth
  useEffect(() => {
    if (!hasTrackedView) {
      const trackView = async () => {
        try {
          await fetch(`/api/founding/${recipient.token}/track`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ scroll_depth: 0, time_on_page: 0 })
          });
          setHasTrackedView(true);
        } catch (e) {
          console.error(e);
        }
      };
      trackView();
    }

    const handleScroll = () => {
      const depth = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
      setScrollDepth(depth);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasTrackedView, recipient.token]);

  // Handle booking submission
  const handleBooking = async () => {
    if (!visitType || !selectedSlot) return;
    setIsBooking(true);
    try {
      const res = await fetch(`/api/founding/${recipient.token}/book`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ start_time: selectedSlot, visit_type: visitType })
      });
      if (res.ok) {
        setIsConfirmed(true);
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsBooking(false);
    }
  };

  const calculateDaysRemaining = () => {
    if (!recipient.held_until) return 0;
    const diffTime = Math.abs(new Date(recipient.held_until).getTime() - new Date().getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const daysRemaining = calculateDaysRemaining();
  
  // Calculate savings
  const nqMonthly = 199;
  const monthlySaving = monthlySpend - nqMonthly;
  const yearlySaving = monthlySaving * 12;
  const tenYearSaving = yearlySaving * 10;

  return (
    <main ref={containerRef} className="bg-obsidian text-silk min-h-screen selection:bg-emerald/30 selection:text-obsidian font-serif">
      
      {/* SECTION 1: Acknowledgement */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(46,204,135,0.05),transparent)] pointer-events-none" />
        
        {isConfirmed ? (
          <div className="max-w-3xl mx-auto space-y-8 reveal-section">
            <h1 className="text-display-sm md:text-display-md font-display leading-[1.1] text-emerald italic">
              Confirmed.
            </h1>
            <p className="text-body-xl text-silk/80 leading-relaxed">
              Mr {recipient.principal_name.split(' ').pop()} — Pete will see you on <br/>
              {new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}.
            </p>
            <p className="text-body-md text-silk/50 uppercase tracking-widest font-sans">
              A calendar invitation has been sent.
            </p>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto space-y-12">
            <h1 className="text-display-sm md:text-display-lg leading-[1.2] text-silk">
              Mr {recipient.principal_name.split(' ').pop()} —<br/>
              the place held for <span className="italic text-emerald">{recipient.agency_name}</span><br/>
              is, for the moment,<br/>
              still open.
            </h1>

            <div className="flex flex-col items-center gap-4">
              <p className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] font-sans font-bold text-silk/60">
                {recipient.postcode_district} · 21 days from delivery · {daysRemaining} days remain
              </p>
              <Button 
                onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
                variant="outline"
                className="mt-8 border-emerald text-emerald hover:bg-emerald hover:text-obsidian rounded-none px-8 py-6 font-sans uppercase tracking-[0.2em] text-[10px] font-bold transition-all"
              >
                Book your thirty minutes <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}
        
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce opacity-30">
          <ArrowDown className="w-6 h-6" />
        </div>
      </section>

      {/* SECTION 2: The Letter */}
      <section className="py-40 px-6 max-w-2xl mx-auto reveal-section">
        <div className="space-y-8 text-body-lg text-silk/80 leading-relaxed">
          <p>
            The UK property market has relied on a handful of legacy portals for too long. We watched as subscription fees compounded year on year, squeezing the margins of independent agencies while offering nothing new in return.
          </p>
          <p>
            NestIQ was built to correct this. We are launching a fairer, structurally distinct platform. It does not punish your success. We have reserved one founding position for an agency in the {recipient.postcode_district} district, and {recipient.agency_name} was selected.
          </p>
          <p>
            The 100 agencies who join us as Founding Partners will receive lifetime price protection, bespoke onboarding, and early profile visibility. I would value thirty minutes of your time to discuss the architecture of this platform.
          </p>
          <div className="pt-8 border-t border-silk/10">
            <p className="font-sans text-sm font-bold uppercase tracking-widest text-emerald mb-1">Pete Avorria</p>
            <p className="font-sans text-[10px] uppercase tracking-widest text-silk/40">Founder, NestIQ</p>
          </div>
        </div>
      </section>

      {/* SECTION 3: Savings Calculator */}
      <section className="py-40 px-6 border-y border-silk/10 bg-obsidian/50 reveal-section">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-sans text-[11px] uppercase tracking-[0.4em] font-bold text-silk/50 mb-12">Commercial Impact</h2>
          
          <div className="text-display-xs md:text-display-sm leading-relaxed text-silk/90">
            On your current spend of <span className="text-emerald">£{monthlySpend.toLocaleString()}/month</span>, switching to NestIQ as a Founding Partner returns <span className="font-bold text-white">£{yearlySaving.toLocaleString()}</span> to the bottom line in year one, and approximately <span className="font-bold text-white">£{tenYearSaving.toLocaleString()}</span> over ten years.
          </div>

          {!hasPredefinedSpend && (
            <div className="mt-20 max-w-xl mx-auto">
              <label className="font-sans text-[10px] uppercase tracking-[0.2em] text-silk/60 mb-6 block">Adjust your current monthly portal spend</label>
              <input 
                type="range" 
                min="500" 
                max="10000" 
                step="100"
                value={monthlySpend}
                onChange={(e) => setMonthlySpend(Number(e.target.value))}
                className="w-full h-1 bg-silk/20 rounded-full appearance-none cursor-pointer accent-emerald"
              />
            </div>
          )}
        </div>
      </section>

      {/* SECTION 4: What's Included */}
      <section className="py-40 px-6 max-w-5xl mx-auto reveal-section">
        <h2 className="font-sans text-[11px] uppercase tracking-[0.4em] font-bold text-silk/50 mb-20 text-center">The Founding Proposition</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-16">
          {[
            { t: "Lifetime Price Protection", d: "Your subscription fee will never increase above inflation. You are protected from aggressive hikes.", f: true },
            { t: "Unrestricted Listing Volume", d: "List every property you instruct. No hidden per-listing fees, no branch limits." },
            { t: "Data Sovereignty", d: "You retain full ownership of your applicant data. We do not sell your vendor leads back to your competitors." },
            { t: "Territory Exclusivity", d: "Founding Partners receive priority display ranking in their chosen postcode districts for the first 12 months.", f: true },
            { t: "AI Description Generator", d: "Automated, SEO-optimised property descriptions generated instantly from EPC data and basic inputs." },
            { t: "Direct Founder Access", d: "A direct line to the founding team. Your feedback directly shapes our product roadmap.", f: true },
          ].map((item, i) => (
            <div key={i} className="border-t border-silk/20 pt-6">
              <div className="flex items-center gap-4 mb-4">
                <h3 className="text-xl font-display text-white">{item.t}</h3>
                {item.f && <span className="font-sans text-[8px] font-bold uppercase tracking-widest bg-emerald/10 text-emerald px-2 py-1">Founding</span>}
              </div>
              <p className="text-body-md text-silk/60 leading-relaxed">{item.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5: Traffic Plan */}
      <section className="py-40 px-6 border-y border-silk/10 bg-obsidian/50 reveal-section">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="font-sans text-[11px] uppercase tracking-[0.4em] font-bold text-silk/50 mb-8">How We Bring The Buyers</h2>
          <p className="text-body-lg text-silk/70 max-w-2xl mx-auto mb-20 leading-relaxed">
            A portal is only as valuable as its audience. NestIQ employs aggressive, hyper-local SEO and programmatic advertising to ensure your properties are seen by active buyers, not just casual browsers.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 border-t border-b border-silk/10 py-16">
            <div>
              <div className="text-display-md text-emerald mb-2 font-display"><span className="stat-number" data-target="1.2" data-prefix="£" data-suffix="m">0</span></div>
              <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-silk/50 font-bold">Launch Marketing Budget</p>
            </div>
            <div>
              <div className="text-display-md text-emerald mb-2 font-display"><span className="stat-number" data-target="12000" data-prefix="" data-suffix="+">0</span></div>
              <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-silk/50 font-bold">Active Local Buyers</p>
            </div>
            <div>
              <div className="text-display-md text-emerald mb-2 font-display"><span className="stat-number" data-target="90" data-prefix="" data-suffix="">0</span></div>
              <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-silk/50 font-bold">Day Launch Trajectory</p>
            </div>
            <div>
              <div className="text-display-md text-emerald mb-2 font-display"><span className="stat-number" data-target="100" data-prefix="" data-suffix="%">0</span></div>
              <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-silk/50 font-bold">Organic Growth Focus</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: District Map */}
      <section className="py-40 px-6 reveal-section overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-20">
          <div className="flex-1 space-y-8">
            <h2 className="font-sans text-[11px] uppercase tracking-[0.4em] font-bold text-silk/50">One Per District</h2>
            <p className="text-body-xl leading-relaxed text-silk">
              We are deliberately restricting Founding Partner intake to ensure maximum value for early adopters. The position in <span className="text-emerald italic">{recipient.postcode_district}</span> remains secured for {recipient.agency_name} until the expiry date.
            </p>
            <div className="flex items-center gap-4 text-sm font-sans">
              <div className="w-3 h-3 rounded-full bg-emerald shadow-[0_0_15px_rgba(46,204,135,0.6)]" />
              <span className="text-silk/70">Held for You</span>
            </div>
          </div>
          <div className="flex-1 w-full relative">
            <div className="absolute inset-0 bg-gradient-to-r from-obsidian to-transparent z-10 w-24" />
            <ComposableMap projection="geoAlbersUK" projectionConfig={{ scale: 3000, center: [-2, 54] }} className="w-full h-[500px] opacity-40 grayscale">
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography 
                      key={geo.rsmKey} 
                      geography={geo} 
                      fill="#1E201F" 
                      stroke="#2A2C2B" 
                      strokeWidth={0.5} 
                    />
                  ))
                }
              </Geographies>
              {/* Fake coordinate for the user's district just to show the green dot effect */}
              <Marker coordinates={[-1.47, 53.38]}>
                <circle r={6} fill="#2ECC87" className="animate-pulse" />
              </Marker>
            </ComposableMap>
          </div>
        </div>
      </section>

      {/* SECTION 7: Booking */}
      <section id="booking" className="py-40 px-6 bg-obsidian border-t border-silk/10 reveal-section">
        <div className="max-w-3xl mx-auto text-center">
          
          {isConfirmed ? (
            <div className="p-12 border border-emerald/30 bg-emerald/5">
              <CheckCircle className="w-12 h-12 text-emerald mx-auto mb-6" />
              <h2 className="text-display-xs font-display text-emerald mb-4">Meeting Scheduled</h2>
              <p className="text-body-md text-silk/80 font-sans">
                A calendar invitation has been dispatched to {recipient.principal_email}.<br/>
                I look forward to our conversation.
              </p>
            </div>
          ) : (
            <>
              <h2 className="font-sans text-[11px] uppercase tracking-[0.4em] font-bold text-silk/50 mb-16">Reserve Your Placement</h2>
              
              {!visitType ? (
                <div className="space-y-8">
                  <p className="text-body-xl text-silk">In person at your office, or over Zoom?</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <button 
                      onClick={() => setVisitType('in_person')}
                      className="p-10 border border-silk/20 hover:border-emerald transition-colors text-center group bg-obsidian/50"
                    >
                      <MapPin className="w-8 h-8 text-silk/40 group-hover:text-emerald mx-auto mb-6 transition-colors" />
                      <h3 className="font-display text-xl mb-2">In Person</h3>
                      <p className="text-body-sm font-sans text-silk/50">I will visit your {recipient.postcode_district} office.</p>
                    </button>
                    <button 
                      onClick={() => setVisitType('zoom')}
                      className="p-10 border border-silk/20 hover:border-emerald transition-colors text-center group bg-obsidian/50"
                    >
                      <Video className="w-8 h-8 text-silk/40 group-hover:text-emerald mx-auto mb-6 transition-colors" />
                      <h3 className="font-display text-xl mb-2">Video Call</h3>
                      <p className="text-body-sm font-sans text-silk/50">A concise 30-minute Zoom meeting.</p>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-12">
                  <div className="flex items-center justify-center gap-4 text-silk/60 cursor-pointer" onClick={() => setVisitType(null)}>
                    <ArrowRight className="w-4 h-4 rotate-180" /> <span className="font-sans text-[10px] uppercase tracking-widest font-bold">Change Format</span>
                  </div>
                  
                  <p className="text-body-xl text-silk">Select a convenient time.</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 font-sans">
                    {/* Mock slots */}
                    {['Tomorrow, 10:00 AM', 'Tomorrow, 2:30 PM', 'Thursday, 9:00 AM', 'Thursday, 1:00 PM', 'Friday, 11:30 AM', 'Monday, 10:00 AM'].map(slot => (
                      <button 
                        key={slot}
                        onClick={() => setSelectedSlot(slot)}
                        className={`p-4 border text-[11px] font-bold uppercase tracking-widest transition-all ${selectedSlot === slot ? 'border-emerald bg-emerald/10 text-emerald' : 'border-silk/20 text-silk/60 hover:border-silk/60'}`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>

                  <Button 
                    onClick={handleBooking}
                    disabled={!selectedSlot || isBooking}
                    className="w-full bg-emerald text-obsidian hover:bg-white disabled:opacity-50 h-16 rounded-none font-sans uppercase tracking-[0.3em] font-bold text-[11px]"
                  >
                    {isBooking ? 'Confirming...' : 'Confirm Meeting'}
                  </Button>
                </div>
              )}
            </>
          )}

        </div>
      </section>

      {/* SECTION 8: Footer */}
      <footer className="py-20 px-6 border-t border-silk/10 text-center text-silk/40 font-sans text-[10px] uppercase tracking-widest">
        <p className="mb-4">Or, if you'd rather just speak to me — pete@nestiq.co.uk · +44 (0)20 4538 9120</p>
        <p>NestIQ Ltd. Registered in England & Wales.</p>
      </footer>

    </main>
  );
}
