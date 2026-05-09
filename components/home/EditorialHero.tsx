"use client";

import { motion } from "framer-motion";
import { ArrowRight, MapPin, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [type, setType] = useState("For Sale");

  const handleSearch = () => {
    if (!location.trim()) return;
    const query = encodeURIComponent(location.trim());
    router.push(`/search?q=${query}&type=${encodeURIComponent(type)}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

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
          preload="metadata"
          poster="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2000&auto=format&fit=crop"
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

      <div className="relative z-20 w-full px-6 md:px-12 py-20 md:py-32">
        <div className="max-w-[1400px] mx-auto pt-10 md:pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-4 text-silk font-medium text-[9px] md:text-[10px] uppercase tracking-[0.4em] md:tracking-[0.5em] mb-8 md:mb-10">
              <div className="hidden md:block w-12 h-px bg-emerald" />
              <span className="leading-relaxed">Find your next home with confidence</span>
            </div>
            
            <h1 className="text-silk text-[clamp(2.25rem,6vw,4.5rem)] font-display leading-[1.05] mb-8 tracking-tight">
              A smarter way to search for <br />
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="italic font-normal text-emerald inline-block"
              >
                <TypewriterLoop 
                  words={["houses for sale.", "flats to rent.", "new build homes.", "commercial property."]} 
                />
              </motion.span>
            </h1>
            
            <p className="text-silk/80 text-body-xl max-w-2xl leading-relaxed mb-12">
              Connect with verified local independent agents and uncover properties before they hit the mass market.
            </p>

            <div className="flex flex-wrap gap-4 mb-16 md:mb-24">
              <Button 
                variant="primary" 
                href="/properties-for-sale"
                className="bg-emerald text-obsidian hover:bg-emerald/90 border-none px-8 py-4"
              >
                Browse Properties
              </Button>
              <Button 
                variant="outline" 
                href="/tools"
                className="border-silk/30 text-silk hover:bg-silk/10 hover:border-silk px-8 py-4"
              >
                Explore Consumer Tools
              </Button>
            </div>

            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center">
              <div className="flex flex-col border-l border-emerald pl-6">
                <span className="text-silk/60 text-[9px] font-bold uppercase tracking-[0.3em] mb-1">Status</span>
                <span className="text-silk font-display text-xl md:text-2xl italic">Live Beta</span>
              </div>
              <div className="flex flex-col border-l border-silk/20 pl-6">
                <span className="text-silk/60 text-[9px] font-bold uppercase tracking-[0.3em] mb-1">Listings</span>
                <span className="text-silk font-display text-xl md:text-2xl">Verified Agents</span>
              </div>
              <div className="flex flex-col border-l border-silk/20 pl-6">
                <span className="text-silk/60 text-[9px] font-bold uppercase tracking-[0.3em] mb-1">Focus</span>
                <span className="text-silk font-display text-xl md:text-2xl">Hyper-Local</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Hero Search Bar - Institutional Layout */}
      <div className="relative md:absolute md:bottom-16 left-0 right-0 z-30 px-6 md:px-12 pb-16 md:pb-0">
        <div className="max-w-[1400px] mx-auto bg-white shadow-[0_40px_80px_rgba(0,0,0,0.15)] p-1 rounded-none border border-border/10">
          <div className="flex flex-col lg:flex-row items-stretch">
            <div className="flex-[2] flex items-center px-6 md:px-8 py-5 md:py-7 border-b lg:border-b-0 lg:border-r border-border/30 group">
              <MapPin className="w-4 h-4 text-emerald mr-4 md:mr-6 group-hover:scale-110 transition-transform" />
              <input 
                type="text" 
                placeholder="City, postcode or development..." 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent border-none focus:outline-none text-[11px] md:text-body-md font-medium text-obsidian placeholder:text-muted/40 uppercase tracking-widest"
              />
            </div>
            <div className="flex-1 flex items-center px-6 md:px-8 py-5 md:py-7 border-b lg:border-b-0 lg:border-r border-border/30 bg-silk/30">
              <Search className="w-4 h-4 text-emerald mr-4 md:mr-6" />
              <select 
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full bg-transparent border-none focus:outline-none text-[10px] md:text-body-sm font-bold text-obsidian uppercase tracking-[0.2em] appearance-none cursor-pointer"
              >
                <option>For Sale</option>
                <option>To Rent</option>
                <option>Commercial</option>
                <option>New Homes</option>
              </select>
            </div>
            <button 
              onClick={handleSearch}
              className="flex-1 bg-forest text-silk px-12 py-5 md:py-7 font-bold uppercase tracking-[0.4em] text-[10px] hover:bg-emerald transition-all duration-700"
            >
              Find Property
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}


