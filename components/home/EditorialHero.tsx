"use client";

import { motion } from "framer-motion";
import { ArrowRight, MapPin, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function EditorialHero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 overflow-hidden bg-silk">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-obsidian/40 z-10" />
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 20, ease: "linear" }}
          src="/premium_editorial_estate_hero_1777653868614.png"
          alt="Luxury Architecture"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container relative z-20 mx-auto px-6 md:px-12">
        <div className="max-w-[1000px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-4 text-silk font-medium text-[10px] uppercase tracking-[0.4em] mb-8">
              <div className="w-12 h-px bg-gold" />
              Institutional Asset Management
            </div>
            
            <h1 className="text-silk text-[clamp(3.5rem,8vw,6.5rem)] font-display leading-[0.9] mb-12 tracking-tight">
              The Standard for <br />
              <span className="italic font-normal">High-Value</span> Estates.
            </h1>

            <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
              <Button variant="primary" className="bg-silk text-obsidian hover:bg-gold hover:text-silk border-none min-w-[240px]">
                Enter Private Office
              </Button>
              <div className="flex flex-col">
                <span className="text-silk/60 text-[10px] uppercase tracking-[0.2em] mb-1">Current Portfolio Value</span>
                <span className="text-silk font-display text-2xl">£14.2B+</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Hero Search Bar - Institutional Design */}
      <div className="absolute bottom-0 left-0 right-0 z-30 transform translate-y-1/2 px-6 md:px-12">
        <div className="max-w-6xl mx-auto bg-white shadow-2xl p-2 rounded-sm border border-border/50">
          <div className="flex flex-col md:flex-row items-stretch">
            <div className="flex-1 flex items-center px-6 py-6 border-b md:border-b-0 md:border-r border-border/50">
              <MapPin className="w-4 h-4 text-gold mr-4" />
              <input 
                type="text" 
                placeholder="Search Exclusive Estates, Penthouses or Manors..." 
                className="w-full bg-transparent border-none focus:outline-none text-body-sm font-medium text-obsidian placeholder:text-muted/60 uppercase tracking-widest"
              />
            </div>
            <div className="flex-1 flex items-center px-6 py-6 border-b md:border-b-0 md:border-r border-border/50">
              <Search className="w-4 h-4 text-gold mr-4" />
              <select className="w-full bg-transparent border-none focus:outline-none text-body-sm font-medium text-obsidian uppercase tracking-widest appearance-none cursor-pointer">
                <option>Residential Portfolio</option>
                <option>Commercial Assets</option>
                <option>Development Sites</option>
              </select>
            </div>
            <button className="bg-obsidian text-silk px-10 py-6 font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-forest transition-colors duration-500">
              Inquire
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
