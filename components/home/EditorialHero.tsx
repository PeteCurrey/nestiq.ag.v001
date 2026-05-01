"use client";

import { motion } from "framer-motion";
import { ArrowRight, MapPin, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function EditorialHero() {
  return (
    <section className="relative h-screen min-h-[800px] flex items-center overflow-hidden bg-obsidian">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-obsidian/40 z-10" />
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          key="hero-video"
          poster="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000&auto=format&fit=crop"
          className="w-full h-full object-cover scale-105"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-modern-luxury-house-exterior-at-night-42880-large.mp4" type="video/mp4" />
          <source src="https://assets.mixkit.co/videos/preview/mixkit-beautiful-modern-house-exterior-at-sunset-42884-large.mp4" type="video/mp4" />
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
              The Institutional Standard in Property Discovery
            </div>
            
            <h1 className="text-silk text-[clamp(3rem,8vw,6.5rem)] font-display leading-[0.85] mb-12 tracking-tight">
              Curated Estates. <br />
              <span className="italic font-normal">Global Authority.</span>
            </h1>

            <div className="flex flex-col md:flex-row gap-8 items-start md:items-center mb-24">
              <div className="flex flex-col border-l border-gold pl-6">
                <span className="text-silk/60 text-[9px] font-bold uppercase tracking-[0.3em] mb-1">Portfolio Value</span>
                <span className="text-silk font-display text-3xl">£4.8Bn+</span>
              </div>
              <div className="flex flex-col border-l border-silk/20 pl-6">
                <span className="text-silk/60 text-[9px] font-bold uppercase tracking-[0.3em] mb-1">Exclusive Listings</span>
                <span className="text-silk font-display text-3xl">1,240+</span>
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
                <option>Sold Prices</option>
                <option>Institutional</option>
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

