"use client";

import { motion } from "framer-motion";
import { ArrowRight, MapPin, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useState, useEffect } from "react";

function TypewriterLoop({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(150);

  useEffect(() => {
    const handleTyping = () => {
      const fullText = words[index];
      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1)
      );

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % words.length);
      }

      setSpeed(isDeleting ? 75 : 150);
    };

    const timer = setTimeout(handleTyping, speed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, index, words, speed]);

  return <span>{text}</span>;
}

export function EditorialHero() {
  return (
    <section className="relative h-screen min-h-[800px] flex items-center overflow-hidden bg-stone-900">
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Dark gradient — ensures heading legibility over any frame of the footage */}
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/75 via-obsidian/40 to-obsidian/65 z-10" />

        {/*
          Video sources:
          1. Pexels 3571264 — Aerial shot of gently crashing waves on the beach
          2. Pexels 6474855 — Secondary wave/beach footage
          
          Note: No 'poster' attribute is used here. By omitting it, the browser
          natively extracts and displays the very first frame of the video as the
          fallback image, ensuring a 100% seamless transition without a mismatched poster.
        */}
        <video
          autoPlay
          loop
          muted
          playsInline
          key="hero-waves-video"
          className="w-full h-full object-cover scale-[1.04] object-center"
        >
          <source
            src="https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4"
            type="video/mp4"
          />
          <source
            src="https://videos.pexels.com/video-files/6474855/6474855-uhd_3840_2160_25fps.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      <div className="relative z-20 w-full px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-4 text-silk font-medium text-[10px] uppercase tracking-[0.5em] mb-10">
              <div className="w-12 h-px bg-gold" />
              Search thousands of properties across the UK. Free for buyers and renters, always.
            </div>
            
            <h1 className="text-silk text-[clamp(3rem,8vw,6.5rem)] font-display leading-[0.85] mb-12 tracking-tight">
              Find Your Next <br />
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="italic font-normal text-gold inline-block"
              >
                <TypewriterLoop 
                  words={["Home", "Flat", "Rental", "Investment", "Forever Place"]} 
                />
              </motion.span>
            </h1>

            <div className="flex flex-col md:flex-row gap-8 items-start md:items-center mb-24">
              <div className="flex flex-col border-l border-gold pl-6">
                <span className="text-silk/60 text-[9px] font-bold uppercase tracking-[0.3em] mb-1">Properties Found</span>
                <span className="text-silk font-display text-3xl">12,400+</span>
              </div>
              <div className="flex flex-col border-l border-silk/20 pl-6">
                <span className="text-silk/60 text-[9px] font-bold uppercase tracking-[0.3em] mb-1">Partner Agents</span>
                <span className="text-silk font-display text-3xl">800+</span>
              </div>
              <div className="flex flex-col border-l border-silk/20 pl-6">
                <span className="text-silk/60 text-[9px] font-bold uppercase tracking-[0.3em] mb-1">Market Search</span>
                <span className="text-silk font-display text-3xl italic">Always Free</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Hero Search Bar - Institutional Layout */}
      <div className="absolute bottom-16 left-0 right-0 z-30 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto bg-white shadow-[0_40px_80px_rgba(0,0,0,0.15)] p-1 rounded-none border border-border/10">
          <div className="flex flex-col lg:flex-row items-stretch">
            <div className="flex-[2] flex items-center px-8 py-7 border-b lg:border-b-0 lg:border-r border-border/30 group">
              <MapPin className="w-4 h-4 text-gold mr-6 group-hover:scale-110 transition-transform" />
              <input 
                type="text" 
                placeholder="Search by city, postcode or development name..." 
                className="w-full bg-transparent border-none focus:outline-none text-body-md font-medium text-obsidian placeholder:text-muted/40 uppercase tracking-widest"
              />
            </div>
            <div className="flex-1 flex items-center px-8 py-7 border-b lg:border-b-0 lg:border-r border-border/30 bg-silk/30">
              <Search className="w-4 h-4 text-gold mr-6" />
              <select className="w-full bg-transparent border-none focus:outline-none text-body-sm font-bold text-obsidian uppercase tracking-[0.2em] appearance-none cursor-pointer">
                <option>For Sale</option>
                <option>To Rent</option>
                <option>Commercial</option>
                <option>New Homes</option>
              </select>
            </div>
            <button className="flex-1 bg-obsidian text-silk px-12 py-7 font-bold uppercase tracking-[0.4em] text-[10px] hover:bg-gold hover:text-silk transition-all duration-700">
              Find Property
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

