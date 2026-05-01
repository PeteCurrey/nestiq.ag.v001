import { Facebook, Instagram, Twitter, Linkedin, Building2 } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-obsidian text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="text-display-sm font-display font-extrabold tracking-tighter text-white">
              NESTIQ
            </Link>
            <p className="text-body-md text-white/60 leading-relaxed">
              The direct challenger to traditional property portals. 
              Fair for agents, fast for buyers, and always free for renters.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-white/40 hover:text-emerald transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="text-white/40 hover:text-emerald transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="text-white/40 hover:text-emerald transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="text-white/40 hover:text-emerald transition-colors"><Linkedin className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-label font-bold uppercase tracking-widest text-emerald mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {['Buy', 'Rent', 'Commercial', 'New Homes', 'Agents', 'Market Data'].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase().replace(' ', '-')}`} className="text-body-sm text-white/60 hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h4 className="text-label font-bold uppercase tracking-widest text-emerald mb-6">Popular Areas</h4>
            <ul className="space-y-4">
              {['London', 'Manchester', 'Leeds', 'Birmingham', 'Sheffield', 'Bristol'].map((city) => (
                <li key={city}>
                  <Link href={`/properties-for-sale/${city.toLowerCase()}`} className="text-body-sm text-white/60 hover:text-white transition-colors">
                    Properties in {city}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Agent CTA */}
          <div className="bg-white/5 p-8 rounded-xl border border-white/10">
            <h4 className="text-body-lg font-display font-bold mb-4">Are you an agent?</h4>
            <p className="text-body-sm text-white/60 mb-6 leading-relaxed">
              Switch to Nestiq and save up to £6,000 per month on portal fees. 
              Full CRM and AI tools included.
            </p>
            <Link 
              href="/pricing" 
              className="inline-flex items-center text-emerald font-bold uppercase tracking-widest text-label group"
            >
              See Agent Plans <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </div>

        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-label font-bold text-white/30 uppercase tracking-widest">
            © 2026 Nestiq Ltd. Find Home. Fair and Fast.
          </p>
          <div className="flex gap-8">
            <Link href="/privacy" className="text-label font-bold text-white/30 uppercase tracking-widest hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-label font-bold text-white/30 uppercase tracking-widest hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/cookies" className="text-label font-bold text-white/30 uppercase tracking-widest hover:text-white transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
