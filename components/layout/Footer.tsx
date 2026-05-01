"use client";

import Link from "next/link";
import { Building2, Mail, Phone, MapPin, Globe, Shield } from "lucide-react";

const footerLinks = [
  {
    title: "Portfolio",
    links: [
      { name: "Luxury Estates", href: "/search?type=estate" },
      { name: "City Penthouses", href: "/search?type=penthouse" },
      { name: "Development Sites", href: "/search?type=development" },
      { name: "Institutional Assets", href: "/search?type=institutional" },
    ],
  },
  {
    title: "Intelligence",
    links: [
      { name: "Market Reports", href: "/market-data" },
      { name: "Agent Portal", href: "/agent/dashboard" },
      { name: "Valuation API", href: "/valuation" },
      { name: "Nestiq Index", href: "/intelligence" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "Our Standard", href: "/about" },
      { name: "Partner Network", href: "/agents" },
      { name: "Press Office", href: "/press" },
      { name: "Contact", href: "/contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-obsidian text-silk pt-32 pb-12">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-24">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-8">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="bg-gold p-1 rounded-none group-hover:bg-silk transition-colors duration-500">
                <Building2 className="w-5 h-5 text-obsidian" strokeWidth={1.5} />
              </div>
              <span className="text-lg font-display font-medium tracking-[0.2em] uppercase">
                NESTIQ
              </span>
            </Link>
            <p className="text-silk/40 text-body-sm leading-relaxed max-w-sm">
              The UK's premier institutional property portal. Connecting global liquidity with exclusive residential and commercial assets through verifiable data.
            </p>
            <div className="flex gap-6">
              <Globe className="w-4 h-4 text-silk/20 hover:text-gold cursor-pointer transition-colors" />
              <Shield className="w-4 h-4 text-silk/20 hover:text-gold cursor-pointer transition-colors" />
              <Mail className="w-4 h-4 text-silk/20 hover:text-gold cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Links Columns */}
          {footerLinks.map((column) => (
            <div key={column.title} className="space-y-8">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">{column.title}</h4>
              <ul className="space-y-4">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-body-sm text-silk/40 hover:text-silk transition-colors duration-300">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-silk/10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-wrap justify-center gap-8 text-[9px] font-bold uppercase tracking-widest text-silk/20">
            <span>© 2026 Nestiq Global Ltd</span>
            <Link href="/privacy" className="hover:text-silk transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-silk transition-colors">Terms of Service</Link>
            <Link href="/cookies" className="hover:text-silk transition-colors">Cookie Policy</Link>
          </div>
          <div className="flex items-center gap-4 text-[9px] font-bold uppercase tracking-widest text-silk/40">
            <div className="w-2 h-2 bg-emerald rounded-full animate-pulse" />
            System Status: Nominal
          </div>
        </div>
      </div>
    </footer>
  );
}
