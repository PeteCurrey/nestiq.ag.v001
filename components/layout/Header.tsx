"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Heart, Building2, Search } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button";

const navLinks = [
  { name: "Search", href: "/search" },
  { name: "Market Data", href: "/market-data" },
  { name: "Agents", href: "/agents" },
  { name: "Valuation", href: "/valuation" },
  { name: "Pricing", href: "/pricing" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 md:px-12 py-8",
        isScrolled ? "bg-white/95 backdrop-blur-md border-b border-border/40 py-5" : "bg-transparent"
      )}
    >
      <div className="max-w-[1800px] mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className={cn(
            "p-1 rounded-none transition-colors duration-500",
            isScrolled ? "bg-obsidian group-hover:bg-forest" : "bg-silk group-hover:bg-gold"
          )}>
            <Building2 className={cn("w-5 h-5 transition-colors duration-500", isScrolled ? "text-silk" : "text-obsidian")} strokeWidth={1.5} />
          </div>
          <span className={cn(
            "text-lg font-display font-medium tracking-[0.2em] uppercase transition-colors duration-500",
            isScrolled ? "text-obsidian" : "text-silk"
          )}>
            NESTIQ
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-12">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "text-[10px] font-bold uppercase tracking-[0.25em] transition-colors duration-500",
                isScrolled ? "text-obsidian/60 hover:text-forest" : "text-silk/80 hover:text-gold"
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-6">
          <Link href="/account/saved" className={cn(
            "hidden sm:flex transition-colors duration-500",
            isScrolled ? "text-obsidian/40 hover:text-forest" : "text-silk/60 hover:text-gold"
          )}>
            <Heart className="w-4 h-4" strokeWidth={1.5} />
          </Link>
          <Link href="/login" className={cn(
            "hidden sm:block text-[10px] font-bold uppercase tracking-[0.25em] transition-colors duration-500",
            isScrolled ? "text-obsidian/80 hover:text-forest" : "text-silk hover:text-gold"
          )}>
            Sign In
          </Link>
          <Link
            href="/agent/dashboard"
            className={cn(
              "hidden sm:flex items-center gap-2 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-500",
              isScrolled
                ? "bg-obsidian text-silk hover:bg-forest"
                : "bg-silk/10 border border-silk/30 text-silk hover:bg-gold hover:border-gold"
            )}
          >
            For Agents
          </Link>
          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn(
              "lg:hidden p-2 transition-colors duration-500",
              isScrolled ? "text-obsidian" : "text-silk"
            )}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-border shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col p-12 gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-display-sm font-medium text-obsidian hover:text-forest transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex flex-col gap-4 mt-4">
                <Button variant="primary" className="w-full">Sign In</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

