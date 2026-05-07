"use client";

import { motion } from "framer-motion";
import { Heart, Bed, Bath, Move, Building2, Leaf, Clock, ArrowRight, ArrowLeftRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Property {
  id: string;
  slug: string;
  title: string;
  price: number;
  address?: string;
  address_line1?: string;
  town?: string;
  bedrooms: number;
  bathrooms: number;
  sqft?: number;
  imageUrl?: string;
  property_images?: { url: string; sort_order: number }[];
  status: "for-sale" | "to-rent" | "active" | "sold" | "let" | "new-build";
  featured?: boolean;
  agencyLogo?: string;
  agencyName?: string;
  agencies?: { name: string; logo_url: string };
  price_qualifier?: string;
  epcRating?: string;
  addedDate?: string;
  aiSummary?: string;
}

interface PropertyCardProps {
  property: Property;
  variant?: "vertical" | "horizontal";
  showMatchScore?: boolean;
  showAgentBranding?: boolean;
  onSave?: (id: string) => void;
  isSaved?: boolean;
}

export function PropertyCard({
  property,
  variant = "vertical",
  showMatchScore,
  showAgentBranding = true,
  onSave,
  isSaved = false,
}: PropertyCardProps) {
  const router = useRouter();

  const displayAddress = property.address || `${property.address_line1}${property.town ? `, ${property.town}` : ""}`;
  const displayImage = property.imageUrl || (property.property_images && property.property_images.length > 0 
    ? property.property_images.sort((a, b) => a.sort_order - b.sort_order)[0].url 
    : "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop");
  const displayAgency = property.agencyName || property.agencies?.name;
  const displayAgencyLogo = property.agencyLogo || property.agencies?.logo_url;
  const displayStatus = (property.status === 'active' ? 'for sale' : property.status).replace("-", " ");
  
  // Demo data for missing fields
  const epc = property.epcRating || "B";
  const added = property.addedDate || "Just added";
  const summary = property.aiSummary || "An exceptional contemporary home offering premium specifications, generous living spaces, and a landscaped private garden in a sought-after location.";

  if (variant === "horizontal") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="group flex flex-col md:flex-row bg-white rounded-none overflow-hidden border border-border/60 hover:border-emerald/30 transition-all duration-700 min-h-[320px]"
      >
        {/* Image - 40% */}
        <div className="relative w-full md:w-[40%] h-[240px] md:h-auto overflow-hidden cursor-pointer" onClick={() => router.push(`/property/${property.slug}`)}>
          <Image
            src={displayImage}
            alt={property.title}
            fill
            className="object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1.5s] ease-out"
            sizes="(max-width: 768px) 100vw, 40vw"
          />
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {property.featured && <Badge variant="emerald" className="rounded-none uppercase tracking-[0.2em] text-[8px] bg-obsidian text-silk border-none shadow-lg">Featured</Badge>}
            <Badge status={property.status as any} className="rounded-none uppercase tracking-[0.2em] text-[8px] border-none shadow-lg">{displayStatus}</Badge>
          </div>
          <div className="absolute bottom-4 left-4 flex gap-2">
             <div className="bg-white/90 backdrop-blur-sm px-2 py-1 text-[8px] font-bold uppercase tracking-widest text-obsidian flex items-center gap-1.5 shadow-md">
                <Clock className="w-2.5 h-2.5 text-emerald" />
                {added}
             </div>
             <div className="bg-white/90 backdrop-blur-sm px-2 py-1 text-[8px] font-bold uppercase tracking-widest text-obsidian flex items-center gap-1.5 shadow-md">
                <Leaf className="w-2.5 h-2.5 text-emerald" />
                EPC {epc}
             </div>
          </div>
        </div>

        {/* Details - 60% */}
        <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-4">
               <div className="space-y-1">
                  <span className="text-display-sm font-display font-medium text-obsidian tracking-tight">
                    £{property.price.toLocaleString()}
                  </span>
                  {property.price_qualifier && (
                    <p className="text-[10px] text-muted uppercase tracking-widest font-bold">{property.price_qualifier}</p>
                  )}
               </div>
               <div className="flex gap-2">
                 <button className="w-8 h-8 rounded-full border border-border/60 flex items-center justify-center hover:bg-warm hover:text-emerald transition-colors text-subtle">
                   <ArrowLeftRight className="w-3.5 h-3.5" />
                 </button>
                 <button className="w-8 h-8 rounded-full border border-border/60 flex items-center justify-center hover:bg-warm hover:text-red-500 transition-colors text-subtle">
                   <Heart className="w-3.5 h-3.5" />
                 </button>
               </div>
            </div>
            <h3 className="text-body-xl font-display font-medium text-obsidian mb-1 cursor-pointer hover:text-emerald transition-colors" onClick={() => router.push(`/property/${property.slug}`)}>{property.title}</h3>
            <p className="text-body-sm text-muted/80 tracking-wide mb-6">{displayAddress}</p>
            
            <div className="flex items-center gap-6 mb-6">
              <div className="flex items-center gap-2 text-[10px] font-bold text-obsidian uppercase tracking-widest">
                <Bed className="w-3.5 h-3.5 text-emerald/60" strokeWidth={1.5} /> {property.bedrooms} Bed
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold text-obsidian uppercase tracking-widest">
                <Bath className="w-3.5 h-3.5 text-emerald/60" strokeWidth={1.5} /> {property.bathrooms} Bath
              </div>
              {property.sqft && (
                <div className="flex items-center gap-2 text-[10px] font-bold text-obsidian uppercase tracking-widest">
                  <Move className="w-3.5 h-3.5 text-emerald/60" strokeWidth={1.5} /> {property.sqft.toLocaleString()} Sq Ft
                </div>
              )}
            </div>

            <div className="bg-warm/50 p-4 border-l-2 border-emerald/30 mb-6 hidden md:block">
               <p className="text-body-sm text-muted/90 italic leading-relaxed line-clamp-2">
                 "{summary}"
               </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-t border-border/40 pt-6">
            {showAgentBranding && (
              <div className="flex items-center gap-3">
                {displayAgencyLogo ? (
                  <div className="w-8 h-8 relative rounded-sm overflow-hidden border border-border/30">
                    <Image src={displayAgencyLogo} alt={displayAgency || "Agent"} fill className="object-contain p-1" />
                  </div>
                ) : (
                  <div className="w-8 h-8 bg-obsidian flex items-center justify-center rounded-sm text-white">
                    <Building2 className="w-4 h-4" />
                  </div>
                )}
                <span className="text-[9px] font-bold text-obsidian uppercase tracking-[0.2em]">{displayAgency}</span>
              </div>
            )}
            
            <Button 
              variant="outline" 
              className="w-full md:w-auto border-emerald text-emerald hover:bg-emerald hover:text-white px-6 py-2 h-10 group"
              onClick={() => router.push(`/property/${property.slug}`)}
            >
              View Details <ArrowRight className="ml-2 w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </motion.div>
    );
  }

  // Vertical variant
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="group flex flex-col bg-white rounded-none overflow-hidden border border-border/50 hover:border-emerald/30 transition-all duration-700 shadow-sm hover:shadow-xl h-full"
    >
      <div className="relative aspect-[4/3] overflow-hidden cursor-pointer" onClick={() => router.push(`/property/${property.slug}`)}>
        <Image
          src={displayImage}
          alt={property.title}
          fill
          className="object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[2s] ease-out"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-4 left-4">
           <Badge status={property.status as any} className="rounded-none uppercase tracking-[0.2em] text-[8px] border-none shadow-xl bg-white/90 text-obsidian backdrop-blur-sm">{displayStatus}</Badge>
        </div>
        {property.featured && (
          <div className="absolute bottom-4 left-4">
             <Badge variant="emerald" className="rounded-none uppercase tracking-[0.2em] text-[8px] bg-obsidian text-silk border-none shadow-xl">Featured</Badge>
          </div>
        )}
        <div className="absolute top-4 right-4 flex gap-2">
           <button className="w-8 h-8 bg-white/90 backdrop-blur-sm shadow-md rounded-full flex items-center justify-center hover:text-emerald transition-colors text-obsidian">
             <ArrowLeftRight className="w-3.5 h-3.5" />
           </button>
           <button className="w-8 h-8 bg-white/90 backdrop-blur-sm shadow-md rounded-full flex items-center justify-center hover:text-red-500 transition-colors text-obsidian">
             <Heart className="w-3.5 h-3.5" />
           </button>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="mb-4 space-y-1">
          <span className="text-display-sm font-display font-medium text-obsidian tracking-tight">
            £{property.price.toLocaleString()}
          </span>
          {property.price_qualifier && (
            <p className="text-[10px] text-muted uppercase tracking-widest font-bold">{property.price_qualifier}</p>
          )}
        </div>

        <h3 className="text-body-lg font-display font-medium text-obsidian mb-1 truncate cursor-pointer hover:text-emerald transition-colors" onClick={() => router.push(`/property/${property.slug}`)}>{property.title}</h3>
        <p className="text-body-sm text-muted/80 mb-6 truncate tracking-wide">{displayAddress}</p>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-2 text-[10px] font-bold text-obsidian uppercase tracking-widest">
            <Bed className="w-3 h-3 text-emerald/60" strokeWidth={1.5} /> {property.bedrooms}
          </div>
          <div className="flex items-center gap-2 text-[10px] font-bold text-obsidian uppercase tracking-widest">
            <Bath className="w-3 h-3 text-emerald/60" strokeWidth={1.5} /> {property.bathrooms}
          </div>
          <div className="flex items-center gap-2 text-[10px] font-bold text-obsidian uppercase tracking-widest">
            <Leaf className="w-3 h-3 text-emerald/60" strokeWidth={1.5} /> {epc}
          </div>
        </div>
        
        <div className="mt-auto pt-6 border-t border-border/40 flex items-center justify-between">
           {showAgentBranding && (
             <div className="flex items-center gap-3">
               {displayAgencyLogo ? (
                  <div className="w-6 h-6 relative rounded-sm overflow-hidden border border-border/30">
                    <Image src={displayAgencyLogo} alt={displayAgency || "Agent"} fill className="object-contain p-0.5" />
                  </div>
               ) : null}
               <span className="text-[9px] font-bold text-subtle uppercase tracking-[0.2em] truncate max-w-[120px]">{displayAgency}</span>
             </div>
           )}
           <span className="text-[9px] font-bold text-emerald uppercase tracking-[0.2em]">{added}</span>
        </div>
      </div>
    </motion.div>
  );
}

