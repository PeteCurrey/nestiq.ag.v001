"use client";

import { useState, useEffect } from "react";
import { Search, Sparkles, MapPin, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface SearchBarProps {
  variant?: "default" | "compact";
  initialMode?: "standard" | "ai";
}

const aiPlaceholders = [
  "3 bed house in Leeds under £350k",
  "Modern flat in Manchester with parking",
  "2 bed apartment in London near a park",
  "Investment property with good yield in Sheffield"
];

export function SearchBar({ variant = "default", initialMode = "standard" }: SearchBarProps) {
  const [mode, setMode] = useState<"standard" | "ai">(initialMode);
  const [listingType, setListingType] = useState<"sale" | "rent">("sale");
  const [aiPlaceholder, setAiPlaceholder] = useState(aiPlaceholders[0]);
  const router = useRouter();

  useEffect(() => {
    if (mode === "ai") {
      const interval = setInterval(() => {
        setAiPlaceholder((prev) => {
          const idx = aiPlaceholders.indexOf(prev);
          return aiPlaceholders[(idx + 1) % aiPlaceholders.length];
        });
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [mode]);

  return (
    <div className={cn(
      "w-full max-w-4xl transition-all duration-500",
      variant === "compact" ? "bg-white p-2 rounded-lg border border-border shadow-sm" : "bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-border"
    )}>
      <div className="flex items-center justify-between mb-3 px-2">
         <div className="flex bg-warm rounded-full p-1">
            {(["standard", "ai"] as const).map((m) => (
               <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={cn(
                    "px-4 py-1.5 rounded-full text-label font-bold uppercase tracking-widest transition-all",
                    mode === m ? "bg-forest text-white" : "text-muted hover:text-forest"
                  )}
               >
                  {m === "ai" && <Sparkles className="w-3 h-3 inline mr-1" />}
                  {m}
               </button>
            ))}
         </div>
      </div>

      <AnimatePresence mode="wait">
        {mode === "standard" ? (
          <motion.div
            key="standard"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col md:flex-row items-center gap-2"
          >
            {/* Buy/Rent Toggle */}
            <div className="flex bg-warm rounded-md p-1">
               {(["sale", "rent"] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setListingType(type)}
                    className={cn(
                      "px-6 py-2 rounded text-body-sm font-bold uppercase tracking-wider transition-all",
                      listingType === type ? "bg-white text-forest shadow-sm" : "text-muted"
                    )}
                  >
                    {type === "sale" ? "Buy" : "Rent"}
                  </button>
               ))}
            </div>

            <div className="flex-1 flex items-center relative min-w-0">
               <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-subtle w-5 h-5" />
               <input
                 type="text"
                 placeholder="Search by location..."
                 className="w-full h-14 pl-12 pr-4 bg-warm border-none rounded-md text-obsidian font-sans font-medium focus:ring-2 focus:ring-forest"
               />
            </div>

            <div className="hidden lg:flex items-center gap-4 bg-warm h-14 px-4 rounded-md border-none">
               <select className="bg-transparent border-none text-body-sm font-bold text-obsidian focus:ring-0">
                  <option>Beds: Any</option>
                  <option>1+</option>
                  <option>2+</option>
                  <option>3+</option>
               </select>
               <ChevronDown className="w-4 h-4 text-muted" />
            </div>

            <Button variant="secondary" size="lg" className="w-full md:w-auto h-14 px-8 rounded-md">
               <Search className="w-5 h-5 mr-2" /> Search
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="ai"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2"
          >
            <div className="flex-1 relative">
               <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald w-5 h-5" />
               <textarea
                 rows={1}
                 placeholder={aiPlaceholder}
                 className="w-full h-14 pl-12 pr-4 py-4 bg-warm border-none rounded-md text-obsidian font-sans font-medium focus:ring-2 focus:ring-emerald resize-none overflow-hidden"
                 onInput={(e) => {
                   const target = e.target as HTMLTextAreaElement;
                   target.style.height = "auto";
                   target.style.height = target.scrollHeight + "px";
                 }}
               />
            </div>
            <Button variant="secondary" size="lg" className="h-14 px-8 rounded-md bg-emerald text-obsidian hover:bg-emerald/90">
               <Sparkles className="w-5 h-5 mr-2" /> AI Search
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
