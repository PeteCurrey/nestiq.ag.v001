"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart, MapPin, Bed, Bath, Move,
  Map as MapIcon, Video, Box, Layers, Info,
  ChevronRight, ArrowLeft, Phone, Mail,
  TrendingUp, ShieldCheck, Check, Send, AlertCircle
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils/cn";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

interface Property {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  address_line1: string;
  town: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  features: string[];
  status: string;
  featured: boolean;
  ai_summary: string;
  property_images: { url: string; sort_order: number }[];
  agencies: {
    id: string;
    name: string;
    logo_url: string;
    phone: string;
    email: string;
  };
}

const tabs = [
  { id: "description", label: "Description", icon: Info },
  { id: "map", label: "Map View", icon: MapIcon },
  { id: "tour", label: "3D & Video Tour", icon: Box },
  { id: "floorplan", label: "Floor Plan", icon: Layers },
];

export function PropertyDetail({ property }: { property: Property }) {
  const [activeTab, setActiveTab] = useState("description");
  const images = property.property_images?.sort((a,b) => a.sort_order - b.sort_order).map(img => img.url) || [];

  return (
    <div className="min-h-screen bg-silk">
      {/* Back Navigation */}
      <div className="fixed top-24 left-0 right-0 z-40 px-6 md:px-12 pointer-events-none">
        <div className="max-w-[1800px] mx-auto">
          <Link
            href="/search"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-md border border-border/50 text-[10px] font-bold uppercase tracking-widest text-obsidian hover:bg-white transition-all pointer-events-auto"
          >
            <ArrowLeft className="w-3 h-3" /> Back to Search
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="relative h-[85vh] w-full overflow-hidden">
        <ImageGallery images={images.length > 0 ? images : ["https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop"]} />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent pointer-events-none" />

        <div className="absolute bottom-16 left-0 right-0 px-6 md:px-12">
          <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row justify-between items-end gap-12">
            <div className="max-w-4xl">
              <div className="flex gap-3 mb-8">
                {property.featured && (
                  <Badge
                    variant="emerald"
                    className="rounded-none bg-emerald text-white border-none uppercase tracking-[0.3em] text-[9px] py-2 px-5 shadow-2xl"
                  >
                    Featured Property
                  </Badge>
                )}
                <Badge className="rounded-none bg-white/10 backdrop-blur-md text-white border border-white/20 uppercase tracking-[0.3em] text-[9px] py-2 px-5">
                  {property.status.replace("-", " ")}
                </Badge>
              </div>
              <h1 className="text-white text-[clamp(2.5rem,6vw,4.5rem)] font-display leading-[1.05] mb-6 drop-shadow-2xl">
                {property.title}
              </h1>
              <div className="flex items-center gap-3 text-white/70 text-body-lg font-medium tracking-wide">
                <MapPin className="w-5 h-5 text-emerald" strokeWidth={2} />
                {property.address_line1}, {property.town}
              </div>
            </div>

            <div className="bg-white/95 backdrop-blur-xl p-10 md:p-12 border border-white/20 shadow-[0_30px_60px_rgba(0,0,0,0.3)] w-full md:min-w-[380px]">
              <span className="text-[10px] font-bold text-muted uppercase tracking-[0.4em] mb-4 block text-center">
                Market Value
              </span>
              <div className="text-[2.5rem] md:text-[3.5rem] font-display text-obsidian text-center leading-none mb-8">
                £{property.price.toLocaleString()}
              </div>
              <div className="grid grid-cols-1 gap-4">
                <Button 
                  variant="primary" 
                  className="w-full h-16 bg-forest text-white text-[11px] font-bold uppercase tracking-widest"
                  onClick={() => document.getElementById('enquiry-form')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Request Particulars
                </Button>
                <div className="grid grid-cols-2 gap-4">
                   <Button variant="outline" className="h-14 border-border/40 text-[10px] font-bold uppercase tracking-widest">
                     <Heart className="w-4 h-4 mr-2" /> Save
                   </Button>
                   <Button variant="outline" className="h-14 border-border/40 text-[10px] font-bold uppercase tracking-widest">
                     Share
                   </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <main className="max-w-[1800px] mx-auto px-6 md:px-12 py-16 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-24 items-start">
          {/* Main Content Area */}
          <div className="lg:col-span-2">
            {/* Highlights Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border/20 border border-border/20 mb-12 md:mb-20 overflow-hidden">
              {[
                { icon: Bed, value: property.bedrooms, label: "Bedrooms" },
                { icon: Bath, value: property.bathrooms, label: "Bathrooms" },
                { icon: Move, value: property.sqft ? property.sqft.toLocaleString() : "—", label: "Sq Ft" },
                { icon: ShieldCheck, value: "Freehold", label: "Tenure" },
              ].map(({ icon: Icon, value, label }) => (
                <div
                  key={label}
                  className="p-6 md:p-10 bg-white text-center group hover:bg-silk transition-colors"
                >
                  <Icon className="w-5 h-5 text-emerald mx-auto mb-4 opacity-60 group-hover:opacity-100 transition-opacity" strokeWidth={1.5} />
                  <span className="block text-[20px] md:text-display-xs font-display text-obsidian mb-1">
                    {value}
                  </span>
                  <span className="text-[9px] font-bold text-muted uppercase tracking-[0.2em]">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* AI Summary Section */}
            <div className="relative p-8 md:p-12 bg-obsidian text-silk mb-16 md:mb-24 overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-emerald/5 blur-[80px] rounded-full -mr-32 -mt-32" />
               <div className="relative z-10">
                 <div className="flex items-center gap-3 text-emerald mb-6 md:mb-8">
                   <ShieldCheck className="w-5 h-5" />
                   <span className="text-[10px] font-bold uppercase tracking-[0.4em]">Nestiq Intelligence Report</span>
                 </div>
                 <p className="text-[20px] md:text-display-xs font-display leading-relaxed italic text-silk/90">
                   &ldquo;{property.ai_summary || `This ${property.bedrooms}-bedroom property in ${property.town} represents a premier investment opportunity. Our data indicates high market velocity in this specific postcode area, driven by recent local infrastructure improvements and school catchment prestige.`}&rdquo;
                 </p>
               </div>
            </div>

            {/* Description Tab Bar */}
            <div className="flex gap-8 md:gap-12 mb-12 md:mb-16 border-b border-border/30 overflow-x-auto no-scrollbar whitespace-nowrap">
               {[
                 { id: "overview", label: "Overview" },
                 { id: "floorplan", label: "Floorplan & EPC" },
                 { id: "location", label: "Local Area" },
                 { id: "tour", label: "Virtual Tour" },
               ].map(tab => (
                 <button
                   key={tab.id}
                   onClick={() => setActiveTab(tab.id)}
                   className={cn(
                     "pb-6 text-[11px] font-bold uppercase tracking-[0.3em] transition-all relative",
                     activeTab === tab.id ? "text-obsidian" : "text-muted hover:text-obsidian"
                   )}
                 >
                   {tab.label}
                   {activeTab === tab.id && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald" />}
                 </button>
               ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="prose prose-lg max-w-none"
              >
                {(activeTab === "overview" || activeTab === "description") && (
                  <div className="space-y-16">
                    <div>
                      <h2 className="text-display-sm font-display mb-8">The Residence</h2>
                      <p className="text-body-lg text-muted leading-relaxed whitespace-pre-line">
                        {property.description}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] mb-12 text-subtle border-b border-border/30 pb-4">
                        Key Features
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-20">
                        {property.features.map((feature, i) => (
                          <div key={i} className="flex items-center gap-4 text-body-md text-obsidian border-b border-border/10 pb-4">
                            <Check className="w-4 h-4 text-emerald" />
                            <span className="font-medium tracking-tight">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "floorplan" && (
                  <div className="space-y-16">
                    <div>
                      <h2 className="text-display-sm font-display mb-8">Floorplan</h2>
                      <div className="w-full aspect-[4/3] bg-silk border border-border/40 flex items-center justify-center p-12 relative overflow-hidden group">
                         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
                         <div className="text-center relative z-10">
                           <Layers className="w-12 h-12 text-emerald mx-auto mb-6 opacity-80" />
                           <p className="text-[12px] font-bold uppercase tracking-widest text-obsidian mb-4">Interactive Floorplan</p>
                           <Button variant="outline" className="border-emerald text-emerald hover:bg-emerald hover:text-white">View Full Screen</Button>
                         </div>
                      </div>
                    </div>

                    <div>
                      <h2 className="text-display-sm font-display mb-8">Energy Performance</h2>
                      <div className="flex flex-col md:flex-row gap-12 items-center bg-white p-12 border border-border/40">
                         <div className="w-32 h-32 bg-emerald flex flex-col items-center justify-center text-white shrink-0">
                            <span className="text-display-lg font-display leading-none">B</span>
                            <span className="text-[10px] font-bold uppercase tracking-widest mt-2">Rating</span>
                         </div>
                         <div>
                            <h3 className="text-body-xl font-display text-obsidian mb-2">High Efficiency Home</h3>
                            <p className="text-muted text-body-sm leading-relaxed mb-6">This property benefits from modern insulation, double glazing throughout, and a recently upgraded central heating system. It falls within the top 20% of UK properties for energy efficiency.</p>
                            <Button variant="outline" className="text-[10px] font-bold uppercase tracking-widest">Download Full Certificate</Button>
                         </div>
                      </div>
                    </div>
                  </div>
                )}

                {(activeTab === "location" || activeTab === "map") && (
                  <div className="space-y-12">
                    <div className="w-full h-[500px] bg-silk border border-border/30 relative">
                       <div className="absolute inset-0 flex items-center justify-center bg-obsidian/5">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-muted">Interactive Map Loading...</p>
                       </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                       <div className="bg-white p-8 border border-border/40 text-center">
                          <span className="text-display-md font-display text-emerald block mb-2">0.4</span>
                          <span className="text-[9px] font-bold uppercase tracking-widest text-muted">Miles to Station</span>
                       </div>
                       <div className="bg-white p-8 border border-border/40 text-center">
                          <span className="text-display-md font-display text-emerald block mb-2">3</span>
                          <span className="text-[9px] font-bold uppercase tracking-widest text-muted">Outstanding Schools</span>
                       </div>
                       <div className="bg-white p-8 border border-border/40 text-center">
                          <span className="text-display-md font-display text-emerald block mb-2">94%</span>
                          <span className="text-[9px] font-bold uppercase tracking-widest text-muted">Area Safety Score</span>
                       </div>
                    </div>
                  </div>
                )}

                {activeTab === "tour" && (
                  <div className="w-full aspect-video bg-obsidian border border-border/30 flex flex-col items-center justify-center text-silk">
                     <Video className="w-16 h-16 text-emerald mb-6" />
                     <h3 className="text-body-xl font-display mb-2">Virtual Tour Available</h3>
                     <p className="text-body-sm text-silk/60 max-w-md text-center">Step inside and explore every room of this property from your device.</p>
                     <Button className="mt-8 bg-emerald text-white border-none">Start Tour</Button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Sticky Sidebar */}
          <aside className="space-y-12 lg:sticky lg:top-32">
            {/* Enquiry Form */}
            <div id="enquiry-form" className="bg-white border border-border/40 p-10 shadow-2xl">
              <div className="flex items-center gap-6 mb-10">
                <div className="w-16 h-16 bg-silk flex items-center justify-center border border-border/20">
                  {property.agencies?.logo_url ? (
                    <img src={property.agencies.logo_url} className="w-full h-full object-contain p-2" alt={property.agencies.name} />
                  ) : (
                    <Building2 className="w-8 h-8 text-emerald" />
                  )}
                </div>
                <div>
                  <span className="text-[9px] font-bold text-muted uppercase tracking-widest block mb-1">Estate Agent</span>
                  <span className="text-body-md font-bold text-obsidian uppercase tracking-wider">{property.agencies?.name}</span>
                </div>
              </div>

              <EnquiryForm propertyId={property.id} agencyId={property.agencies?.id} />
              
              <div className="mt-10 pt-10 border-t border-border/30 flex items-center justify-center gap-12">
                 <div className="text-center">
                    <p className="text-[9px] font-bold text-muted uppercase tracking-widest mb-1">Direct Dial</p>
                    <p className="text-body-sm font-bold text-obsidian">{property.agencies?.phone || '01246 567540'}</p>
                 </div>
                 <div className="w-px h-8 bg-border/40" />
                 <div className="text-center">
                    <p className="text-[9px] font-bold text-muted uppercase tracking-widest mb-1">Response Time</p>
                    <p className="text-body-sm font-bold text-emerald">Under 1 hour</p>
                 </div>
              </div>
            </div>

            {/* Mortgage Insight */}
            <div className="p-10 bg-silk border border-border/40 space-y-8">
               <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-obsidian flex items-center gap-2">
                 <TrendingUp className="w-4 h-4 text-emerald" /> Finance Insight
               </h4>
               <div className="space-y-6">
                 <div>
                   <p className="text-[9px] text-muted uppercase tracking-widest mb-2 font-bold">Estimated Repayment</p>
                   <p className="text-3xl font-display text-obsidian">£{Math.round((property.price * 0.8) / 240).toLocaleString()}<span className="text-sm font-normal text-muted">/mo</span></p>
                   <p className="text-[8px] text-muted uppercase tracking-widest mt-2">Based on 20% deposit @ 4.8%</p>
                 </div>
                 <Button variant="secondary" fullWidth className="h-12 text-[9px] uppercase tracking-widest font-bold">Apply for Pre-Approval</Button>
               </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

function EnquiryForm({ propertyId, agencyId }: { propertyId: string; agencyId: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    
    const formData = new FormData(e.currentTarget);
    const { error } = await supabase.from('enquiries').insert({
      property_id: propertyId,
      agency_id: agencyId,
      full_name: formData.get('fullName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      message: formData.get('message'),
      status: 'new'
    });

    if (error) {
      console.error(error);
      setStatus("error");
      toast.error("Failed to send enquiry. Please try again.");
    } else {
      setStatus("success");
      toast.success("Enquiry sent successfully!");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-emerald/5 border border-emerald/20 p-8 text-center animate-in fade-in zoom-in duration-500">
        <div className="w-12 h-12 bg-emerald text-white rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-6 h-6" />
        </div>
        <h3 className="text-body-lg font-display font-bold text-emerald-900 mb-2">Message Sent</h3>
        <p className="text-body-sm text-emerald-800">The agent will contact you shortly.</p>
        <Button variant="outline" className="mt-6 h-10 border-emerald/30 text-emerald" onClick={() => setStatus("idle")}>Send Another</Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-4">
        <input 
          required 
          name="fullName" 
          placeholder="FULL NAME" 
          className="w-full bg-silk border-none px-6 py-4 text-[10px] font-bold uppercase tracking-widest outline-none focus:ring-1 focus:ring-emerald/30 transition-all"
        />
        <input 
          required 
          type="email" 
          name="email" 
          placeholder="EMAIL ADDRESS" 
          className="w-full bg-silk border-none px-6 py-4 text-[10px] font-bold uppercase tracking-widest outline-none focus:ring-1 focus:ring-emerald/30 transition-all"
        />
        <input 
          required 
          type="tel" 
          name="phone" 
          placeholder="PHONE NUMBER" 
          className="w-full bg-silk border-none px-6 py-4 text-[10px] font-bold uppercase tracking-widest outline-none focus:ring-1 focus:ring-emerald/30 transition-all"
        />
        <textarea 
          required 
          name="message" 
          rows={4} 
          placeholder="YOUR MESSAGE..." 
          className="w-full bg-silk border-none px-6 py-4 text-[10px] font-bold uppercase tracking-widest outline-none focus:ring-1 focus:ring-emerald/30 transition-all resize-none"
        />
      </div>
      <Button 
        type="submit" 
        fullWidth 
        loading={status === "loading"}
        className="bg-emerald text-white h-16 text-[10px] font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-3"
      >
        <Send className="w-4 h-4" /> Send Enquiry
      </Button>
    </form>
  );
}

function ImageGallery({ images }: { images: string[] }) {
  const [current, setCurrent] = useState(0);

  return (
    <div className="w-full h-full group cursor-pointer" onClick={() => setCurrent((prev) => (prev + 1) % images.length)}>
      <AnimatePresence mode="wait">
        <motion.img
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          src={images[current]}
          className="w-full h-full object-cover"
          alt="Property feature image"
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-obsidian/10 group-hover:bg-transparent transition-colors duration-700" />

      {images.length > 1 && (
        <div className="absolute bottom-16 right-16 z-30 flex items-center gap-6">
           <div className="text-white text-[11px] font-bold uppercase tracking-[0.5em] bg-obsidian/40 backdrop-blur-xl px-6 py-3 border border-white/10">
             {current + 1} / {images.length}
           </div>
           <button
             onClick={(e) => { e.stopPropagation(); setCurrent((prev) => (prev + 1) % images.length); }}
             className="bg-white/95 backdrop-blur-xl p-5 rounded-full shadow-2xl hover:bg-emerald hover:text-white transition-all duration-500 group/btn"
           >
             <ChevronRight className="w-6 h-6 group-hover/btn:translate-x-1 transition-transform" />
           </button>
        </div>
      )}
    </div>
  );
}

const Building2 = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/>
    <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/>
    <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/>
    <path d="M10 6h4"/>
    <path d="M10 10h4"/>
    <path d="M10 14h4"/>
    <path d="M10 18h4"/>
  </svg>
);
