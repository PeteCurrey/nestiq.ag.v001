"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useState, useEffect } from "react";

const samples = [
  "3 bed family home near a good primary school in Sheffield under £280,000",
  "2 bed flat to rent in Manchester city centre, pet friendly, under £1,200 a month",
  "Investment property in Leeds with good yield, terraced, near the university",
  "Detached bungalow with large garden in Derbyshire, quiet village, under £350k"
];

export function AISearchShowcase() {
  const [currentSampleIndex, setCurrentSampleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const currentSample = samples[currentSampleIndex];

    if (isTyping) {
      if (displayText.length < currentSample.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentSample.slice(0, displayText.length + 1));
        }, 60);
      } else {
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, 2500);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, displayText.length - 1));
        }, 30);
      } else {
        setIsTyping(true);
        setCurrentSampleIndex((prev) => (prev + 1) % samples.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isTyping, currentSampleIndex]);

  return (
    <section className="bg-obsidian py-32 overflow-hidden relative">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald/10 border border-emerald/20 rounded-full mb-8">
            <Sparkles className="w-4 h-4 text-emerald" />
            <span className="text-label text-emerald uppercase font-bold tracking-widest">
              Natural Language Search
            </span>
          </div>

          <h2 className="text-display-lg md:text-display-xl font-display font-extrabold text-white mb-6">
            Search in <span className="text-emerald italic">Plain English</span>.
          </h2>
          
          <p className="text-body-xl text-subtle mb-16 max-w-2xl mx-auto">
            Our AI understands what you actually mean. <br />
            No endless filter menus.
          </p>

          {/* Typing Demo */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-12 text-left relative group">
            <div className="absolute top-4 right-6 flex gap-1.5">
               <div className="w-3 h-3 rounded-full bg-white/10" />
               <div className="w-3 h-3 rounded-full bg-white/10" />
               <div className="w-3 h-3 rounded-full bg-white/10" />
            </div>
            
            <div className="flex items-start gap-4">
               <div className="w-10 h-10 rounded-full bg-emerald flex items-center justify-center flex-shrink-0 mt-1">
                  <Sparkles className="w-5 h-5 text-obsidian" />
               </div>
               <div className="flex-1">
                  <div className="text-display-sm font-sans font-medium text-white/90 min-h-[1.5em] leading-relaxed">
                    {displayText}
                    <span className="inline-block w-[2px] h-[1em] bg-emerald ml-1 animate-pulse align-middle" />
                  </div>
               </div>
            </div>
          </div>

          <Button variant="emerald" size="xl" className="group">
            Try AI Search
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
      
      {/* Background Glow */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald/5 rounded-full blur-[120px]" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-forest/5 rounded-full blur-[120px]" />
    </section>
  );
}
