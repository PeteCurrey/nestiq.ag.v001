"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Heart, Share2, MapPin, Bed, Bath, Move, 
  Map as MapIcon, Video, Box, Layers, Info,
  ChevronRight, ArrowLeft, Phone, Mail, Calendar
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils/cn";
import { allProperties } from "@/lib/data/properties";
import { notFound } from "next/navigation";

const tabs = [
  { id: "description", label: "Description", icon: Info },
  { id: "map", label: "Map View", icon: MapIcon },
  { id: "satellite", label: "Satellite Fly By", icon: Globe },
  { id: "tour", label: "3D & Video Tour", icon: Box },
  { id: "floorplan", label: "Floor Plan", icon: Layers },
];

function Globe(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}

export default function PropertyPage({ params }: { params: { slug: string } }) {
  const [activeTab, setActiveTab] = useState("description");
  const property = allProperties.find((p) => p.slug === params.slug);

  if (!property) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-silk">
      {/* Navigation Breadcrumb */}
      <div className="fixed top-24 left-0 right-0 z-40 px-6 md:px-12 pointer-events-none">
        <div className="max-w-[1800px] mx-auto">
          <Link href="/search" className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-md border border-border/50 text-[10px] font-bold uppercase tracking-widest text-obsidian hover:bg-white transition-all pointer-events-auto">
            <ArrowLeft className="w-3 h-3" /> Back to Search
          </Link>
        </div>
      </div>

      {/* Hero Image Section */}
      <section className="relative h-[70vh] w-full overflow-hidden">
        <ImageGallery images={property.images} />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 via-transparent to-transparent pointer-events-none" />
        
        <div className="absolute bottom-12 left-0 right-0 px-6 md:px-12">
          <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row justify-between items-end gap-8">
            <div className="max-w-3xl">
              <div className="flex gap-3 mb-6">
                <Badge variant="emerald" className="rounded-none bg-gold text-silk border-none uppercase tracking-[0.2em] text-[10px] py-1.5 px-4 shadow-2xl">Premium Collection</Badge>
                <Badge className="rounded-none bg-white/20 backdrop-blur-md text-silk border-none uppercase tracking-[0.2em] text-[10px] py-1.5 px-4">For Sale</Badge>
              </div>
              <h1 className="text-silk text-[clamp(2rem,5vw,3.5rem)] font-display leading-[1.1] mb-4 drop-shadow-2xl">
                {property.title}
              </h1>
              <div className="flex items-center gap-2 text-silk/80 text-body-md font-medium tracking-wide">
                <MapPin className="w-4 h-4 text-gold" strokeWidth={2} />
                {property.address}
              </div>
            </div>
            
            <div className="bg-white/95 backdrop-blur-md p-8 md:p-10 border border-border/50 shadow-2xl min-w-[320px]">
              <span className="text-[10px] font-bold text-muted uppercase tracking-[0.3em] mb-2 block text-center">Guide Price</span>
              <div className="text-display-md font-display text-obsidian text-center mb-6">
                £{property.price.toLocaleString()}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="primary" className="w-full">Enquire</Button>
                <Button variant="secondary" className="w-full">
                  <Heart className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section with Tabs */}
      <main className="max-w-[1800px] mx-auto px-6 md:px-12 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
          
          {/* Main Content (Left 2/3) */}
          <div className="lg:col-span-2">
            {/* Custom Tab Navigation */}
            <div className="flex flex-wrap gap-2 mb-12 border-b border-border/30 pb-4">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "flex items-center gap-3 px-6 py-4 text-[10px] font-bold uppercase tracking-[0.25em] transition-all duration-500 relative",
                      activeTab === tab.id 
                        ? "text-obsidian after:absolute after:bottom-[-17px] after:left-0 after:right-0 after:h-0.5 after:bg-gold" 
                        : "text-muted hover:text-obsidian"
                    )}
                  >
                    <Icon className={cn("w-4 h-4 transition-colors", activeTab === tab.id ? "text-gold" : "text-subtle")} strokeWidth={1.5} />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="min-h-[500px]"
              >
                {activeTab === "description" && (
                  <div className="space-y-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                       <div className="p-8 bg-white border border-border/40 text-center group hover:border-gold/30 transition-colors">
                          <Bed className="w-6 h-6 text-gold mx-auto mb-4" strokeWidth={1} />
                          <span className="block text-display-xs font-display text-obsidian">{property.bedrooms}</span>
                          <span className="text-[10px] font-bold text-muted uppercase tracking-widest">Bedrooms</span>
                       </div>
                       <div className="p-8 bg-white border border-border/40 text-center group hover:border-gold/30 transition-colors">
                          <Bath className="w-6 h-6 text-gold mx-auto mb-4" strokeWidth={1} />
                          <span className="block text-display-xs font-display text-obsidian">{property.bathrooms}</span>
                          <span className="text-[10px] font-bold text-muted uppercase tracking-widest">Bathrooms</span>
                       </div>
                       <div className="p-8 bg-white border border-border/40 text-center group hover:border-gold/30 transition-colors">
                          <Move className="w-6 h-6 text-gold mx-auto mb-4" strokeWidth={1} />
                          <span className="block text-display-xs font-display text-obsidian">{property.sqft.toLocaleString()}</span>
                          <span className="text-[10px] font-bold text-muted uppercase tracking-widest">Sq Ft</span>
                       </div>
                       <div className="p-8 bg-white border border-border/40 text-center group hover:border-gold/30 transition-colors">
                          <Layers className="w-6 h-6 text-gold mx-auto mb-4" strokeWidth={1} />
                          <span className="block text-display-xs font-display text-obsidian">3</span>
                          <span className="text-[10px] font-bold text-muted uppercase tracking-widest">Floors</span>
                       </div>
                    </div>

                    <div className="prose prose-lg max-w-none">
                      <h2 className="text-display-sm font-display mb-8">Executive Summary</h2>
                      <p className="text-body-lg text-muted leading-relaxed whitespace-pre-line">
                        {property.description}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-body-lg font-bold uppercase tracking-[0.2em] mb-8 border-b border-border/30 pb-4">Key Features</h3>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
                        {property.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-4 text-body-md text-obsidian group">
                            <div className="w-1.5 h-1.5 bg-gold rounded-full" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === "map" && (
                  <div className="w-full h-[600px] bg-warm flex items-center justify-center border border-border/50 overflow-hidden relative group">
                    <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200&auto=format&fit=crop" className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 transition-all duration-1000" alt="Map View" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-obsidian text-silk px-8 py-4 text-[10px] font-bold uppercase tracking-widest">Interactive Map Ready</div>
                    </div>
                  </div>
                )}

                {activeTab === "satellite" && (
                  <div className="w-full h-[600px] bg-obsidian flex items-center justify-center border border-border/50 overflow-hidden relative">
                    <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200&auto=format&fit=crop" className="w-full h-full object-cover" alt="Satellite View" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-obsidian/60" />
                    <div className="absolute bottom-8 left-8 flex items-center gap-4">
                       <button className="bg-white text-obsidian p-4 rounded-full shadow-2xl hover:scale-110 transition-transform">
                          <Video className="w-5 h-5" />
                       </button>
                       <span className="text-silk text-[10px] font-bold uppercase tracking-widest">Play Satellite Flyby</span>
                    </div>
                  </div>
                )}

                {activeTab === "tour" && (
                  <div className="w-full h-[600px] bg-obsidian flex items-center justify-center border border-border/50 overflow-hidden relative">
                    <video autoPlay loop muted className="w-full h-full object-cover opacity-60">
                      <source src="https://player.vimeo.com/external/494252666.sd.mp4?s=727af30c6a993e390c2941e97669d57a4a275f96&profile_id=165" type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <Box className="w-16 h-16 text-gold mb-6 animate-pulse" strokeWidth={1} />
                      <h2 className="text-silk text-display-sm font-display mb-8">Virtual Reality Experience</h2>
                      <Button variant="primary" className="bg-silk text-obsidian border-none">Enter 3D Tour</Button>
                    </div>
                  </div>
                )}

                {activeTab === "floorplan" && (
                  <div className="w-full h-[600px] bg-white flex items-center justify-center border border-border/50 p-12">
                    <div className="w-full h-full border-2 border-dashed border-border/40 flex flex-col items-center justify-center text-center">
                       <Layers className="w-12 h-12 text-muted/30 mb-6" strokeWidth={1} />
                       <span className="text-muted/60 text-[10px] font-bold uppercase tracking-widest mb-4">Architectural Floor Plan</span>
                       <Button variant="secondary" size="sm">Download PDF (High Res)</Button>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Sidebar (Right 1/3) */}
          <aside className="space-y-12">
            {/* Agent Card */}
            <div className="bg-white border border-border/40 p-10 shadow-sm">
              <div className="flex items-center gap-6 mb-10">
                <div className="w-16 h-16 bg-warm rounded-none border border-border flex items-center justify-center overflow-hidden">
                   <img src="https://www.dalesandpeaks.co.uk/wp-content/themes/dalesandpeaks/assets/images/logo.svg" className="w-full h-full object-contain p-2" alt="Agent Logo" />
                </div>
                <div>
                  <span className="text-[9px] font-bold text-muted uppercase tracking-widest block mb-1">Presented By</span>
                  <span className="text-body-lg font-bold text-obsidian uppercase tracking-wider">{property.agency.name}</span>
                </div>
              </div>

              <div className="space-y-6 mb-10">
                <div className="flex items-center gap-4 text-body-md text-obsidian">
                  <div className="w-10 h-10 bg-silk border border-border/40 flex items-center justify-center">
                    <Phone className="w-4 h-4 text-gold" strokeWidth={1.5} />
                  </div>
                  {property.agency.phone}
                </div>
                <div className="flex items-center gap-4 text-body-md text-obsidian">
                  <div className="w-10 h-10 bg-silk border border-border/40 flex items-center justify-center">
                    <Mail className="w-4 h-4 text-gold" strokeWidth={1.5} />
                  </div>
                  Send Enquiry
                </div>
              </div>

              <Button variant="primary" fullWidth size="lg">Book a Viewing</Button>
            </div>

            {/* Smart Intelligence Panel */}
            <div className="bg-obsidian p-10 text-silk space-y-8">
               <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-gold" strokeWidth={1.5} />
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Nestiq Intelligence</span>
               </div>
               <div className="space-y-6">
                  <div>
                    <span className="text-silk/40 text-[9px] uppercase tracking-widest block mb-2">Market Sentiment</span>
                    <div className="flex items-center justify-between">
                       <span className="text-body-lg font-display">High Interest</span>
                       <TrendingUp className="w-4 h-4 text-emerald" />
                    </div>
                  </div>
                  <div className="h-px bg-silk/10" />
                  <div>
                    <span className="text-silk/40 text-[9px] uppercase tracking-widest block mb-2">Viewing Velocity</span>
                    <span className="text-body-lg font-display italic">12 Booked this week</span>
                  </div>
               </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}


function ImageGallery({ images }: { images: string[] }) {
  const [current, setCurrent] = useState(0);

  return (
    <div className="w-full h-full group">
       <AnimatePresence mode="wait">
          <motion.img
            key={current}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            src={images[current]}
            className="w-full h-full object-cover"
            alt="Property Hero"
          />
       </AnimatePresence>
       
       {/* Gallery Controls */}
       <div className="absolute bottom-12 right-12 z-30 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <button 
            onClick={() => setCurrent((prev) => (prev + 1) % images.length)}
            className="bg-white/90 backdrop-blur-md p-4 rounded-full shadow-2xl hover:bg-white"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
       </div>

       {/* Counter */}
       <div className="absolute top-12 right-12 z-30 text-silk text-[10px] font-bold uppercase tracking-[0.4em] bg-obsidian/40 backdrop-blur-md px-4 py-2">
          {current + 1} / {images.length}
       </div>
    </div>
  );
}

function TrendingUp(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  )
}

function Shield(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    </svg>
  )
}
