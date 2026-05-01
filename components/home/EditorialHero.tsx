"use client";

import { motion } from "framer-motion";
import { ArrowRight, MapPin, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function EditorialHero() {
  return (
    <section className="relative h-screen min-h-[700px] flex items-center overflow-hidden bg-obsidian">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-obsidian/30 z-10" />
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          poster="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1800&auto=format&fit=crop"
          className="w-full h-full object-cover opacity-100"
        >
          <source src="https://player.vimeo.com/external/494252666.hd.mp4?s=727af30c6a993e390c2941e97669d57a4a275f96&profile_id=170" type="video/mp4" />
          <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1800&auto=format&fit=crop" className="w-full h-full object-cover" alt="Luxury Estate" />
        </video>
      </div>

      <div className="container relative z-20 mx-auto px-6 md:px-12">
        <div className="max-w-[1000px] pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-4 text-silk font-medium text-[10px] uppercase tracking-[0.4em] mb-8">
              <div className="w-12 h-px bg-gold" />
              The UK's Premier Property Intelligence
            </div>
            
            <h1 className="text-silk text-[clamp(3.5rem,8vw,6.5rem)] font-display leading-[0.9] mb-12 tracking-tight">
              Find Home. <br />
              <span className="italic font-normal">Fair and Fast.</span>
            </h1>

            <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
              <Button variant="primary" className="bg-silk text-obsidian hover:bg-gold hover:text-silk border-none min-w-[240px]">
                Search Listings
              </Button>
              <div className="flex flex-col">
                <span className="text-silk/60 text-[10px] uppercase tracking-[0.2em] mb-1">Live Market Listings</span>
                <span className="text-silk font-display text-2xl">842,500+</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Hero Search Bar - Centered & Responsive */}
      <div className="absolute bottom-12 left-0 right-0 z-30 px-6 md:px-12">
        <div className="max-w-6xl mx-auto bg-white/95 backdrop-blur-md shadow-2xl p-2 rounded-sm border border-border/30">
          <div className="flex flex-col md:flex-row items-stretch">
            <div className="flex-1 flex items-center px-6 py-5 border-b md:border-b-0 md:border-r border-border/50">
              <MapPin className="w-4 h-4 text-gold mr-4" />
              <input 
                type="text" 
                placeholder="Enter Location, Postcode or Station..." 
                className="w-full bg-transparent border-none focus:outline-none text-body-sm font-medium text-obsidian placeholder:text-muted/60 uppercase tracking-widest"
              />
            </div>
            <div className="flex-1 flex items-center px-6 py-5 border-b md:border-b-0 md:border-r border-border/50">
              <Search className="w-4 h-4 text-gold mr-4" />
              <select className="w-full bg-transparent border-none focus:outline-none text-body-sm font-medium text-obsidian uppercase tracking-widest appearance-none cursor-pointer">
                <option>For Sale</option>
                <option>To Rent</option>
                <option>Commercial</option>
                <option>New Homes</option>
              </select>
            </div>
            <button className="bg-obsidian text-silk px-10 py-5 font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-forest transition-colors duration-500">
              Search
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
