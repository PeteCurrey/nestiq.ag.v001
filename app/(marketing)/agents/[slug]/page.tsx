"use client";

import React from "react";
import { 
  Phone, 
  Mail, 
  Globe, 
  MapPin, 
  Star, 
  ShieldCheck, 
  Clock, 
  Award,
  ChevronRight,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PropertyCard } from "@/components/property/PropertyCard";
import { allProperties } from "@/lib/data/properties";

const agency = {
  name: "Dales & Peaks",
  slug: "dales-and-peaks",
  description: "Award-winning family estate agent covering Derbyshire, the Peak District, and surrounding areas. Established 2006. Chesterfield and Matlock offices.",
  phone: "01246 567540",
  email: "info@dalesandpeaks.co.uk",
  website: "https://dalesandpeaks.co.uk",
  address: "Unit 2, Old Brick Works Lane, Chesterfield, Derbyshire, S41 7JD",
  rating: 4.7,
  reviews: 428,
  specialisms: ["Residential Sales", "Lettings", "New Homes"],
  established: "2006"
};

export default function AgencyProfilePage() {
  const agencyProperties = allProperties.filter(p => p.agencyName === agency.name);

  return (
    <div className="bg-silk min-h-screen">
      {/* Hero Header */}
      <section className="bg-obsidian text-silk pt-40 pb-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
             <div className="w-32 h-32 bg-white flex items-center justify-center p-4 border border-white/10 flex-shrink-0">
                <span className="text-obsidian font-display font-bold text-lg leading-tight text-center">DALES &<br/>PEAKS</span>
             </div>
             <div className="flex-1 space-y-6">
                <div className="flex flex-wrap items-center gap-4">
                  <h1 className="text-display-md font-display font-bold">{agency.name}</h1>
                  <span className="bg-gold/20 text-gold text-[10px] font-bold px-3 py-1 uppercase tracking-widest flex items-center gap-2">
                    <ShieldCheck className="w-3 h-3" />
                    Verified Partner
                  </span>
                </div>
                <p className="text-body-lg text-silk/60 max-w-2xl leading-relaxed">
                  {agency.description}
                </p>
                <div className="flex flex-wrap gap-8 pt-4">
                   <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-gold fill-gold" />
                      <span className="text-sm font-bold">{agency.rating}</span>
                      <span className="text-sm text-silk/40">({agency.reviews} reviews)</span>
                   </div>
                   <div className="flex items-center gap-2 text-silk/60 text-sm">
                      <MapPin className="w-4 h-4 text-gold" />
                      {agency.address}
                   </div>
                </div>
             </div>
             <div className="w-full lg:w-auto flex flex-col gap-4">
                <Button className="bg-gold text-silk hover:bg-white hover:text-obsidian border-none h-14 px-12 text-[10px] font-bold uppercase tracking-widest w-full">
                  Contact Agency
                </Button>
                <div className="flex gap-4">
                   <a href={`tel:${agency.phone}`} className="flex-1 h-12 border border-white/10 flex items-center justify-center gap-3 hover:bg-white/5 transition-colors">
                      <Phone className="w-3.5 h-3.5 text-gold" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Call</span>
                   </a>
                   <a href={agency.website} target="_blank" className="flex-1 h-12 border border-white/10 flex items-center justify-center gap-3 hover:bg-white/5 transition-colors">
                      <Globe className="w-3.5 h-3.5 text-gold" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Website</span>
                   </a>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-16">
          
          {/* Sidebar Filters */}
          <aside className="lg:col-span-1 space-y-12">
             <div className="space-y-6">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted">Service Specialisms</h3>
                <div className="space-y-3">
                   {agency.specialisms.map(s => (
                     <div key={s} className="flex items-center gap-3 text-sm text-obsidian font-medium">
                        <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                        {s}
                     </div>
                   ))}
                </div>
             </div>

             <div className="bg-white border border-border/40 p-8 space-y-6">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-obsidian">Office Locations</h4>
                <div className="space-y-4">
                   <div className="flex flex-col gap-1 border-l-2 border-gold pl-4">
                      <p className="text-sm font-bold">Chesterfield Office</p>
                      <p className="text-[10px] text-muted uppercase">S41 7JD</p>
                   </div>
                   <div className="flex flex-col gap-1 border-l-2 border-border/20 pl-4">
                      <p className="text-sm font-bold text-muted">Matlock Office</p>
                      <p className="text-[10px] text-muted/40 uppercase">DE4 3AJ</p>
                   </div>
                </div>
             </div>
          </aside>

          {/* Property Results */}
          <div className="lg:col-span-3 space-y-12">
             <div className="flex items-center justify-between border-b border-border/20 pb-8">
                <h2 className="text-display-sm font-display font-bold text-obsidian uppercase tracking-tight">Active Listings</h2>
                <span className="text-[10px] font-bold text-muted uppercase tracking-widest">{agencyProperties.length} Properties Found</span>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {agencyProperties.map(prop => (
                  <PropertyCard key={prop.slug} property={prop as any} />
                ))}
             </div>

             <div className="flex justify-center pt-12">
                <Button variant="secondary" className="group">
                   Load More Listings <ArrowRight className="ml-2 w-3 h-3 group-hover:translate-x-1 transition-transform duration-500" />
                </Button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
