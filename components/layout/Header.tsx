"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Heart, Building2 } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button";

const navLinks = [
  { name: "Buy", href: "/search?type=for-sale" },
  { name: "Rent", href: "/search?type=to-rent" },
  { name: "Agents", href: "/agents" },
  { name: "Valuation", href: "/valuation" },
  { name: "Market Data", href: "/market-data" },
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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-8 py-6",
        isScrolled ? "bg-white/90 backdrop-blur-md border-b border-border py-4" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-forest p-1.5 rounded-sm group-hover:bg-emerald transition-colors">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-display font-extrabold tracking-tight text-obsidian uppercase">
            NESTIQ
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "text-body-sm font-semibold uppercase tracking-wider transition-colors",
                link.accent 
                  ? "text-forest hover:text-emerald" 
                  : "text-obsidian/70 hover:text-forest"
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link href="/saved" className="hidden sm:flex text-obsidian/60 hover:text-forest transition-colors">
            <Heart className="w-5 h-5" />
          </Link>
          <Button variant="ghost" size="sm" className="hidden sm:flex text-obsidian/70 font-bold uppercase tracking-wider">
            Sign In
          </Button>
          <Button variant="primary" size="sm" className="font-bold uppercase tracking-wider">
            List Property
          </Button>
          
          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 text-obsidian"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-pearl border-b border-border overflow-hidden"
          >
            <div className="flex flex-col p-8 gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-display-sm font-bold text-obsidian hover:text-forest transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex flex-col gap-4 mt-4">
                <Button variant="secondary" className="w-full font-bold uppercase">Sign In</Button>
                <Button variant="primary" className="w-full font-bold uppercase">List Property</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
