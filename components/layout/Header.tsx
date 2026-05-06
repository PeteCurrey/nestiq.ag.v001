"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Heart, Building2, Search, User } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";
import { signOut } from "@/lib/supabase/actions";
import { useRouter } from "next/navigation";

const navLinks = [
  { name: "Search", href: "/search" },
  { name: "Valuation", href: "/valuation" },
  { name: "Market Data", href: "/market-data" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setUser(user);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getInitials = (email: string) => {
    if (!email) return "U";
    return email.charAt(0).toUpperCase();
  };

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
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-full border transition-all",
                  isScrolled ? "border-obsidian/20 text-obsidian bg-white hover:border-forest hover:text-forest" : "border-silk/20 text-silk bg-obsidian/20 hover:border-gold hover:text-gold"
                )}
              >
                <span className="text-xs font-bold">{getInitials(user.email)}</span>
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-4 w-56 bg-white border border-border shadow-2xl rounded-none py-2"
                  >
                    <Link href="/account/saved" className="block px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-obsidian/70 hover:text-forest hover:bg-forest/5">Saved Properties</Link>
                    <Link href="/account/searches" className="block px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-obsidian/70 hover:text-forest hover:bg-forest/5">My Searches</Link>
                    <Link href="/account/enquiries" className="block px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-obsidian/70 hover:text-forest hover:bg-forest/5">My Enquiries</Link>
                    <div className="h-px bg-border/40 my-2" />
                    <button 
                      onClick={() => {
                        signOut();
                        setIsDropdownOpen(false);
                      }}
                      className="block w-full text-left px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-red-500 hover:bg-red-50"
                    >
                      Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-4">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => router.push('/login')}
                className={cn(
                  "text-[9px] uppercase tracking-[0.2em] font-bold border px-6",
                  isScrolled ? "border-obsidian/20 text-obsidian hover:bg-obsidian/5" : "border-silk/20 text-silk hover:bg-silk/10"
                )}
              >
                Sign In
              </Button>
            </div>
          )}

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
                {!user ? (
                  <>
                    <Button variant="outline" className="w-full" onClick={() => { router.push('/login'); setIsMobileMenuOpen(false); }}>Sign In</Button>
                  </>
                ) : (
                  <>
                    <Link href="/account/saved" className="text-body-md font-medium text-obsidian" onClick={() => setIsMobileMenuOpen(false)}>Saved Properties</Link>
                    <Link href="/account/searches" className="text-body-md font-medium text-obsidian" onClick={() => setIsMobileMenuOpen(false)}>My Searches</Link>
                    <Link href="/account/enquiries" className="text-body-md font-medium text-obsidian" onClick={() => setIsMobileMenuOpen(false)}>My Enquiries</Link>
                    <button onClick={() => { signOut(); setIsMobileMenuOpen(false); }} className="text-left text-body-md font-medium text-red-500 mt-4">Sign Out</button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

