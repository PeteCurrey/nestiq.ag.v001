"use client";

import Link from "next/link";
import { Building2, Mail, Phone, MapPin, Globe, Shield } from "lucide-react";

const footerLinks = [
  {
    title: "Search",
    links: [
      { name: "Property for Sale", href: "/search?type=sale" },
      { name: "Property to Rent", href: "/search?type=rent" },
      { name: "New Homes", href: "/search?type=newbuild" },
      { name: "Commercial", href: "/search?type=commercial" },
    ],
  },
  {
    title: "Intelligence",
    links: [
      { name: "Market Reports", href: "/market-data" },
      { name: "Free Valuation", href: "/valuation" },
      { name: "Partner Login", href: "/login?role=agent" },
      { name: "Become a Partner", href: "/pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "Our Standard", href: "/about" },
      { name: "Partner Network", href: "/agents/directory" },
      { name: "Press Office", href: "/press" },
      { name: "Contact Partnership Team", href: "/contact" },
      { name: "Privacy & Terms", href: "/privacy" },
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
              <div className="bg-emerald p-1 rounded-none group-hover:bg-silk transition-colors duration-500">
                <Building2 className="w-5 h-5 text-obsidian" strokeWidth={1.5} />
              </div>
              <span className="text-lg font-display font-medium tracking-[0.2em] uppercase">
                NESTIQ
              </span>
            </Link>
            <p className="text-silk/40 text-body-sm leading-relaxed max-w-sm">
              The UK property portal built for agents, not against them. Providing a faster, fairer way to find your next home.
            </p>
            <div className="flex gap-6">
              <Mail className="w-4 h-4 text-silk/20 hover:text-emerald cursor-pointer transition-colors" />
              <Globe className="w-4 h-4 text-silk/20 hover:text-emerald cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Links Columns */}
          {footerLinks.map((column) => (
            <div key={column.title} className="space-y-8">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-emerald">{column.title}</h4>
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
          <div className="flex flex-wrap items-center gap-8 text-[9px] font-bold uppercase tracking-widest text-silk/20">
            <span>© 2026 NestIQ</span>
            <span className="normal-case tracking-normal opacity-60">NestIQ is currently operated as an Avorria property technology project in founding partner beta.</span>
          </div>
          <div className="flex gap-8 text-[9px] font-bold uppercase tracking-widest text-silk/20 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-silk transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-silk transition-colors">Terms of Service</Link>
            <Link href="/cookies" className="hover:text-silk transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
