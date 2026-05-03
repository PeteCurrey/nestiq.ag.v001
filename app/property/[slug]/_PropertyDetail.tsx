"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart, MapPin, Bed, Bath, Move,
  Map as MapIcon, Video, Box, Layers, Info,
  ChevronRight, ArrowLeft, Phone, Mail,
  TrendingUp, ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils/cn";
import { allProperties } from "@/lib/data/properties";

type Property = (typeof allProperties)[0];

const tabs = [
  { id: "description", label: "Description", icon: Info },
  { id: "map", label: "Map View", icon: MapIcon },
  { id: "tour", label: "3D & Video Tour", icon: Box },
  { id: "floorplan", label: "Floor Plan", icon: Layers },
];

export function PropertyDetail({ property }: { property: Property }) {
  const [activeTab, setActiveTab] = useState("description");

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
      <section className="relative h-[70vh] w-full overflow-hidden">
        <ImageGallery images={property.images} />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 via-transparent to-transparent pointer-events-none" />

        <div className="absolute bottom-12 left-0 right-0 px-6 md:px-12">
          <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row justify-between items-end gap-8">
            <div className="max-w-3xl">
              <div className="flex gap-3 mb-6">
                <Badge
                  variant="emerald"
                  className="rounded-none bg-emerald-600 text-silk border-none uppercase tracking-[0.2em] text-[10px] py-1.5 px-4 shadow-2xl"
                >
                  New to Market
                </Badge>
                <Badge className="rounded-none bg-white/20 backdrop-blur-md text-silk border-none uppercase tracking-[0.2em] text-[10px] py-1.5 px-4">
                  For Sale
                </Badge>
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
              <span className="text-[10px] font-bold text-muted uppercase tracking-[0.3em] mb-2 block text-center">
                Guide Price
              </span>
              <div className="text-display-md font-display text-obsidian text-center mb-6">
                £{property.price.toLocaleString()}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="primary" className="w-full">
                  Enquire
                </Button>
                <Button variant="secondary" className="w-full">
                  <Heart className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <main className="max-w-[1800px] mx-auto px-6 md:px-12 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
          {/* Main */}
          <div className="lg:col-span-2">
            {/* Tab Bar */}
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
                    <Icon
                      className={cn(
                        "w-4 h-4 transition-colors",
                        activeTab === tab.id ? "text-gold" : "text-muted"
                      )}
                      strokeWidth={1.5}
                    />
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
                transition={{ duration: 0.4 }}
                className="min-h-[500px]"
              >
                {activeTab === "description" && (
                  <div className="space-y-12">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                      {[
                        { icon: Bed, value: property.bedrooms, label: "Bedrooms" },
                        { icon: Bath, value: property.bathrooms, label: "Bathrooms" },
                        { icon: Move, value: property.sqft.toLocaleString(), label: "Sq Ft" },
                        { icon: Layers, value: "—", label: "Tenure" },
                      ].map(({ icon: Icon, value, label }) => (
                        <div
                          key={label}
                          className="p-8 bg-white border border-border/40 text-center hover:border-gold/30 transition-colors"
                        >
                          <Icon className="w-6 h-6 text-gold mx-auto mb-4" strokeWidth={1} />
                          <span className="block text-display-xs font-display text-obsidian">
                            {value}
                          </span>
                          <span className="text-[10px] font-bold text-muted uppercase tracking-widest">
                            {label}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* AI Summary */}
                    <div className="bg-emerald-50 p-8 border border-emerald-100">
                      <div className="flex items-center gap-3 text-emerald-700 mb-4">
                        <ShieldCheck className="w-5 h-5" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">
                          Nestiq AI Summary
                        </span>
                      </div>
                      <p className="text-emerald-900 font-medium leading-relaxed italic">
                        &ldquo;This property offers exceptional value for families seeking a move-in ready home in{" "}
                        {property.address.split(",").slice(-2, -1)[0]?.trim() || property.address}. The{" "}
                        {property.bedrooms}-bedroom layout is well-balanced with a private plot that is rare for this price point.&rdquo;
                      </p>
                    </div>

                    {/* Description */}
                    <div>
                      <h2 className="text-display-sm font-display mb-6">Property Description</h2>
                      <p className="text-body-lg text-muted leading-relaxed whitespace-pre-line">
                        {property.description}
                      </p>
                    </div>

                    {/* Features */}
                    <div>
                      <h3 className="text-body-lg font-bold uppercase tracking-[0.2em] mb-8 border-b border-border/30 pb-4">
                        Key Features
                      </h3>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
                        {property.features.map((feature, i) => (
                          <li
                            key={i}
                            className="flex items-center gap-4 text-body-md text-obsidian"
                          >
                            <div className="w-1.5 h-1.5 bg-gold rounded-full flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === "map" && (
                  <div className="w-full h-[600px] bg-warm flex items-center justify-center border border-border/50 overflow-hidden relative group">
                    <img
                      src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200&auto=format&fit=crop"
                      className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 transition-all duration-1000"
                      alt="Map area"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-obsidian text-silk px-8 py-4 text-[10px] font-bold uppercase tracking-widest">
                        Interactive Map — Add Mapbox token to activate
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "tour" && (
                  <div className="w-full h-[600px] bg-obsidian flex items-center justify-center border border-border/50 overflow-hidden relative">
                    <video autoPlay loop muted className="w-full h-full object-cover opacity-60">
                      <source
                        src="https://player.vimeo.com/external/494252666.sd.mp4?s=727af30c6a993e390c2941e97669d57a4a275f96&profile_id=165"
                        type="video/mp4"
                      />
                    </video>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <Box className="w-16 h-16 text-gold mb-6 animate-pulse" strokeWidth={1} />
                      <h2 className="text-silk text-display-sm font-display mb-8">Virtual Tour</h2>
                      <Button variant="primary" className="bg-silk text-obsidian border-none">
                        Enter 3D Tour
                      </Button>
                    </div>
                  </div>
                )}

                {activeTab === "floorplan" && (
                  <div className="w-full h-[600px] bg-white flex items-center justify-center border border-border/50 p-12">
                    <div className="w-full h-full border-2 border-dashed border-border/40 flex flex-col items-center justify-center text-center">
                      <Layers className="w-12 h-12 text-muted/30 mb-6" strokeWidth={1} />
                      <span className="text-muted/60 text-[10px] font-bold uppercase tracking-widest mb-4">
                        Floor Plan
                      </span>
                      <Button variant="secondary" size="sm">
                        Download PDF
                      </Button>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Sidebar */}
          <aside className="space-y-12">
            {/* Agent Card */}
            <div className="bg-white border border-border/40 p-10 shadow-sm">
              <div className="flex items-center gap-6 mb-10">
                <div className="w-16 h-16 bg-silk flex items-center justify-center border border-border/20">
                  <span className="text-obsidian font-display font-bold text-xs leading-tight text-center">
                    DALES &<br />PEAKS
                  </span>
                </div>
                <div>
                  <span className="text-[9px] font-bold text-muted uppercase tracking-widest block mb-1">
                    Presented By
                  </span>
                  <span className="text-body-lg font-bold text-obsidian uppercase tracking-wider">
                    {property.agencyName}
                  </span>
                </div>
              </div>

              <div className="space-y-6 mb-10">
                <div className="flex items-center gap-4 text-body-md text-obsidian">
                  <div className="w-10 h-10 bg-silk border border-border/40 flex items-center justify-center">
                    <Phone className="w-4 h-4 text-gold" strokeWidth={1.5} />
                  </div>
                  01246 567540
                </div>
                <div className="flex items-center gap-4 text-body-md text-obsidian">
                  <div className="w-10 h-10 bg-silk border border-border/40 flex items-center justify-center">
                    <Mail className="w-4 h-4 text-gold" strokeWidth={1.5} />
                  </div>
                  Send Enquiry
                </div>
              </div>

              <Button
                variant="primary"
                fullWidth
                size="lg"
                className="h-16 uppercase tracking-[0.2em] text-[10px] font-bold"
              >
                Book a Viewing
              </Button>
            </div>

            {/* Mortgage Calculator */}
            <div className="bg-white border border-border/40 p-10 space-y-8">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-obsidian">
                Mortgage Calculator
              </h4>
              <div className="space-y-6">
                <div>
                  <span className="text-muted text-[9px] uppercase tracking-widest block mb-2">
                    Deposit (15%)
                  </span>
                  <p className="text-lg font-display font-bold">
                    £{(property.price * 0.15).toLocaleString()}
                  </p>
                </div>
                <div>
                  <span className="text-muted text-[9px] uppercase tracking-widest block mb-2">
                    Est. Monthly Repayment
                  </span>
                  <p className="text-2xl font-display font-bold text-emerald-600">
                    £{Math.round((property.price * 0.85 * 0.05) / 12).toLocaleString()}/mo
                  </p>
                  <span className="text-[9px] text-muted/60 mt-1 block">
                    Based on 5% interest over 25 years
                  </span>
                </div>
                <Button
                  variant="secondary"
                  fullWidth
                  className="h-12 border-border/40 text-[9px] font-bold uppercase tracking-widest"
                >
                  Adjust Calculations
                </Button>
              </div>
            </div>

            {/* Market Intel */}
            <div className="bg-obsidian p-10 text-silk space-y-8">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-gold" strokeWidth={1.5} />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em]">
                  Nestiq Insights
                </span>
              </div>
              <div className="space-y-6">
                <div>
                  <span className="text-silk/40 text-[9px] uppercase tracking-widest block mb-2">
                    Market Sentiment
                  </span>
                  <div className="flex items-center justify-between">
                    <span className="text-body-lg font-display">High Interest</span>
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                  </div>
                </div>
                <div className="h-px bg-silk/10" />
                <div>
                  <span className="text-silk/40 text-[9px] uppercase tracking-widest block mb-2">
                    Days on Market
                  </span>
                  <span className="text-body-lg font-display italic">Just Listed</span>
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
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          src={images[current]}
          className="w-full h-full object-cover"
          alt="Property"
        />
      </AnimatePresence>

      {images.length > 1 && (
        <div className="absolute bottom-12 right-12 z-30 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <button
            onClick={() => setCurrent((prev) => (prev + 1) % images.length)}
            className="bg-white/90 backdrop-blur-md p-4 rounded-full shadow-2xl hover:bg-white"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      <div className="absolute top-12 right-12 z-30 text-silk text-[10px] font-bold uppercase tracking-[0.4em] bg-obsidian/40 backdrop-blur-md px-4 py-2">
        {current + 1} / {images.length}
      </div>
    </div>
  );
}
