"use client";

import { motion } from "framer-motion";
import { Home, Building2, Landmark, GraduationCap, Briefcase, Sparkles } from "lucide-react";
import Link from "next/link";

const categories = [
  { name: "Houses for Sale", icon: <Home />, img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop" },
  { name: "Flats to Rent", icon: <Building2 />, img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800&auto=format&fit=crop" },
  { name: "New Builds", icon: <Sparkles />, img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop" },
  { name: "Investment Properties", icon: <Landmark />, img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800&auto=format&fit=crop" },
  { name: "Commercial", icon: <Briefcase />, img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop" },
  { name: "Student Lets", icon: <GraduationCap />, img: "https://images.unsplash.com/photo-1555854817-5b2260d1bd63?q=80&w=800&auto=format&fit=crop" },
];

export function PropertyTypeGrid() {
  return (
    <section className="py-24 max-w-7xl mx-auto px-4 w-full">
      <h2 className="text-display-md font-display font-extrabold text-obsidian mb-12">
        What are you looking for?
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {categories.map((cat, i) => (
          <Link href="/search" key={i} className="group relative aspect-[3/4] rounded-xl overflow-hidden shadow-md">
            <img 
              src={cat.img} 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
              alt={cat.name} 
            />
            <div className="absolute inset-0 bg-obsidian/40 group-hover:bg-obsidian/30 transition-colors" />
            
            <div className="absolute inset-0 p-6 flex flex-col justify-between">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                {cat.icon}
              </div>
              <span className="text-body-md font-display font-bold text-white group-hover:-translate-y-1 transition-transform">
                {cat.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
