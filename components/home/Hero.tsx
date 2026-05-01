"use client";

import { motion } from "framer-motion";
import { Search, MapPin, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { useState } from "react";
import { cn } from "@/lib/utils/cn";
import { WordCarousel } from "./WordCarousel";

export function Hero() {
  const [activeTab, setActiveTab] = useState<"buy" | "rent">("buy");

  const trustBadges = [
    "✓ 12,400 Properties",
    "✓ 800+ Verified Agents",
    "✓ Always Free to Search"
  ];

  return (
    <section className="relative min-h-screen lg:h-screen flex items-center bg-pearl pt-24 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 h-full items-center">
        
        {/* Left Column (55%) */}
        <div className="lg:col-span-7 z-10 py-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-display-lg md:text-display-2xl font-display font-extrabold text-obsidian mb-4 tracking-tighter leading-[1.1]">
              Find Your Next <br />
              <WordCarousel />
            </h1>
            
            <p className="text-body-xl text-muted mb-12 max-w-xl">
              Search 12,000+ properties across the UK. <br />
              Free for buyers and renters, always.
            </p>

            {/* Pill Search Bar */}
            <div className="bg-white rounded-full shadow-lg border border-border p-2 max-w-3xl mb-12">
              <div className="flex flex-col md:flex-row items-center gap-2">
                {/* Buy/Rent Toggle */}
                <div className="flex bg-warm rounded-full p-1 self-start md:self-center ml-2">
                  {(["buy", "rent"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={cn(
                        "px-6 py-2 rounded-full text-label font-bold uppercase tracking-widest transition-all",
                        activeTab === tab ? "bg-forest text-white shadow-sm" : "text-muted hover:text-forest"
                      )}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="flex-1 flex items-center w-full px-2">
                  <MapPin className="text-subtle w-5 h-5 mr-3 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Location or Postcode..."
                    className="flex-1 bg-transparent border-none py-4 text-obsidian font-sans font-medium focus:ring-0 placeholder:text-subtle"
                  />
                </div>

                <div className="hidden xl:flex items-center gap-4 px-4 border-l border-border h-10">
                   <select className="bg-transparent border-none text-body-sm font-bold text-obsidian focus:ring-0">
                      <option>Any Beds</option>
                      <option>1+</option>
                      <option>2+</option>
                      <option>3+</option>
                   </select>
                </div>

                <Button variant="emerald" size="lg" className="w-full md:w-auto h-[60px] rounded-full px-10">
                  <Search className="w-5 h-5 mr-2" />
                  Search
                </Button>
              </div>
            </div>

            {/* Trust Bar */}
            <div className="flex flex-wrap gap-3">
              {trustBadges.map((badge, i) => (
                <motion.div
                  key={badge}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="px-4 py-2 bg-white border border-border rounded-full text-label font-bold text-forest tracking-wider shadow-sm"
                >
                  {badge}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column (45%) - Masonry Grid */}
        <div className="lg:col-span-5 relative h-[600px] lg:h-[80%] hidden md:block">
          <div className="grid grid-cols-2 gap-4 h-full">
            <div className="flex flex-col gap-4 pt-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="relative flex-1 rounded-2xl overflow-hidden shadow-xl"
              >
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  alt="Property"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-md shadow-lg border border-white/20">
                   <span className="text-display-sm font-display font-extrabold text-forest">£1.2M</span>
                </div>
                <div className="absolute bottom-4 right-4 animate-fade-in">
                   <Badge variant="emerald">New Listing</Badge>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="h-[40%] rounded-2xl overflow-hidden shadow-xl"
              >
                <img
                  src="https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=800&auto=format&fit=crop"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  alt="Property"
                />
              </motion.div>
            </div>
            <div className="flex flex-col gap-4 pb-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="h-[40%] rounded-2xl overflow-hidden shadow-xl"
              >
                <img
                  src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=800&auto=format&fit=crop"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  alt="Property"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex-1 rounded-2xl overflow-hidden shadow-xl"
              >
                <img
                  src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800&auto=format&fit=crop"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  alt="Property"
                />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Mobile Hero Image (Stacked) */}
        <div className="md:hidden relative h-[300px] w-full rounded-2xl overflow-hidden mb-8">
           <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop"
              className="w-full h-full object-cover"
              alt="Property"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 to-transparent" />
        </div>

      </div>
    </section>
  );
}
