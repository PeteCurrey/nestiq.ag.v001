"use client";

import { motion } from "framer-motion";
import { Heart, Bed, Bath, Move, Building2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
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
  const displayStatus = (property.status === 'active' ? 'for sale' : property.status).replace("-", " ");

  if (variant === "horizontal") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        onClick={() => router.push(`/property/${property.slug}`)}
        onClick={() => router.push(`/property/${property.slug}`)}
        className="group flex bg-white rounded-none overflow-hidden border border-border/60 hover:border-emerald/30 transition-all duration-700 cursor-pointer h-[320px]"
      >
        {/* Image - 45% */}
        <div className="relative w-[45%] h-full overflow-hidden">
          <Image
            src={displayImage}
            alt={property.title}
            fill
            className="object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1.5s] ease-out"
            sizes="(max-width: 768px) 100vw, 45vw"
          />
          <div className="absolute top-6 left-6 flex flex-col gap-2">
            {property.featured && <Badge variant="emerald" className="rounded-none uppercase tracking-[0.2em] text-[8px] bg-obsidian text-silk border-none">Featured</Badge>}
            <Badge status={property.status as any} className="rounded-none uppercase tracking-[0.2em] text-[8px] border-none">{displayStatus}</Badge>
          </div>
        </div>

        {/* Details - 55% */}
        <div className="flex-1 p-10 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-6">
               <div className="space-y-1">
                  <span className="text-display-sm font-display font-medium text-obsidian tracking-tight">
                    £{property.price.toLocaleString()}
                  </span>
                  {property.price_qualifier && (
                    <p className="text-[10px] text-muted uppercase tracking-widest font-bold">{property.price_qualifier}</p>
                  )}
               </div>
            </div>
            <h3 className="text-display-xs font-display font-medium text-obsidian mb-2">{property.title}</h3>
            <p className="text-body-sm text-muted/80 tracking-wide mb-8">{displayAddress}</p>
            
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3 text-[10px] font-bold text-obsidian uppercase tracking-widest">
                <Bed className="w-3.5 h-3.5 text-emerald/60" strokeWidth={1.5} /> {property.bedrooms} Bed
              </div>
              <div className="flex items-center gap-3 text-[10px] font-bold text-obsidian uppercase tracking-widest">
                <Bath className="w-3.5 h-3.5 text-emerald/60" strokeWidth={1.5} /> {property.bathrooms} Bath
              </div>
              {property.sqft && (
                <div className="flex items-center gap-3 text-[10px] font-bold text-obsidian uppercase tracking-widest">
                  <Move className="w-3.5 h-3.5 text-emerald/60" strokeWidth={1.5} /> {property.sqft.toLocaleString()} Sq Ft
                </div>
              )}
            </div>
          </div>

          {showAgentBranding && (
            <div className="flex items-center gap-4 border-t border-border/40 pt-6">
              <span className="text-[9px] font-bold text-subtle uppercase tracking-[0.2em]">{displayAgency}</span>
            </div>
          )}
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
      onClick={() => router.push(`/property/${property.slug}`)}
      className="group bg-white rounded-none overflow-hidden border border-border/50 hover:border-emerald/30 transition-all duration-700 cursor-pointer shadow-sm hover:shadow-xl"
    >
      <div className="relative aspect-[5/4] overflow-hidden">
        <Image
          src={displayImage}
          alt={property.title}
          fill
          className="object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[2s] ease-out"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-6 left-6">
           <Badge status={property.status as any} className="rounded-none uppercase tracking-[0.2em] text-[8px] border-none shadow-xl bg-white/90 text-obsidian backdrop-blur-sm">{displayStatus}</Badge>
        </div>
        {property.featured && (
          <div className="absolute bottom-6 left-6">
             <Badge variant="emerald" className="rounded-none uppercase tracking-[0.2em] text-[8px] bg-obsidian text-silk border-none shadow-xl">Featured</Badge>
          </div>
        )}
      </div>

      <div className="p-8">
        <div className="mb-6 space-y-1">
          <span className="text-display-sm font-display font-medium text-obsidian tracking-tight">
            £{property.price.toLocaleString()}
          </span>
          {property.price_qualifier && (
            <p className="text-[10px] text-muted uppercase tracking-widest font-bold">{property.price_qualifier}</p>
          )}
        </div>

        <h3 className="text-display-xs font-display font-medium text-obsidian mb-2 truncate">{property.title}</h3>
        <p className="text-body-sm text-muted/80 mb-8 truncate tracking-wide">{displayAddress}</p>

        <div className="flex items-center justify-between border-t border-border/40 pt-6">
           <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-[10px] font-bold text-obsidian uppercase tracking-widest">
                <Bed className="w-3 h-3 text-emerald/60" strokeWidth={1.5} /> {property.bedrooms}
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold text-obsidian uppercase tracking-widest">
                <Bath className="w-3 h-3 text-emerald/60" strokeWidth={1.5} /> {property.bathrooms}
              </div>
           </div>
           <span className="text-[9px] font-bold text-subtle uppercase tracking-[0.2em]">{displayAgency}</span>
        </div>
      </div>
    </motion.div>
  );
}

