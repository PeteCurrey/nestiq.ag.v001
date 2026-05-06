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
  address: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  imageUrl: string;
  status: "for-sale" | "to-rent" | "sold" | "let" | "new-build";
  featured?: boolean;
  agencyLogo?: string;
  agencyName?: string;
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

  if (variant === "horizontal") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        onClick={() => router.push(`/property/${property.slug}`)}
        className="group flex bg-white rounded-none overflow-hidden border border-border/60 hover:border-gold/30 transition-all duration-700 cursor-pointer h-[320px]"
      >
        {/* Image - 45% */}
        <div className="relative w-[45%] h-full overflow-hidden">
          <Image
            src={property.imageUrl}
            alt={property.title}
            fill
            className="object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1.5s] ease-out"
            sizes="(max-width: 768px) 100vw, 45vw"
          />
          <div className="absolute top-6 left-6 flex flex-col gap-2">
            {property.featured && <Badge variant="emerald" className="rounded-none uppercase tracking-[0.2em] text-[8px] bg-obsidian text-silk border-none">Featured</Badge>}
            <Badge status={property.status} className="rounded-none uppercase tracking-[0.2em] text-[8px] border-none">{property.status.replace("-", " ")}</Badge>
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
            <p className="text-body-sm text-muted/80 tracking-wide mb-8">{property.address}</p>
            
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3 text-[10px] font-bold text-obsidian uppercase tracking-widest">
                <Bed className="w-3.5 h-3.5 text-gold/60" strokeWidth={1.5} /> {property.bedrooms} Bed
              </div>
              <div className="flex items-center gap-3 text-[10px] font-bold text-obsidian uppercase tracking-widest">
                <Bath className="w-3.5 h-3.5 text-gold/60" strokeWidth={1.5} /> {property.bathrooms} Bath
              </div>
              <div className="flex items-center gap-3 text-[10px] font-bold text-obsidian uppercase tracking-widest">
                <Move className="w-3.5 h-3.5 text-gold/60" strokeWidth={1.5} /> {property.sqft.toLocaleString()} Sq Ft
              </div>
            </div>
          </div>

          {showAgentBranding && (
            <div className="flex items-center gap-4 border-t border-border/40 pt-6">
              <span className="text-[9px] font-bold text-subtle uppercase tracking-[0.2em]">{property.agencyName}</span>
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
      className="group bg-white rounded-none overflow-hidden border border-border/50 hover:border-gold/30 transition-all duration-700 cursor-pointer shadow-sm hover:shadow-xl"
    >
      <div className="relative aspect-[5/4] overflow-hidden">
        <Image
          src={property.imageUrl}
          alt={property.title}
          fill
          className="object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[2s] ease-out"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-6 left-6">
           <Badge status={property.status} className="rounded-none uppercase tracking-[0.2em] text-[8px] border-none shadow-xl bg-white/90 text-obsidian backdrop-blur-sm">{property.status.replace("-", " ")}</Badge>
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
        <p className="text-body-sm text-muted/80 mb-8 truncate tracking-wide">{property.address}</p>

        <div className="flex items-center justify-between border-t border-border/40 pt-6">
           <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-[10px] font-bold text-obsidian uppercase tracking-widest">
                <Bed className="w-3 h-3 text-gold/60" strokeWidth={1.5} /> {property.bedrooms}
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold text-obsidian uppercase tracking-widest">
                <Bath className="w-3 h-3 text-gold/60" strokeWidth={1.5} /> {property.bathrooms}
              </div>
           </div>
           <span className="text-[9px] font-bold text-subtle uppercase tracking-[0.2em]">{property.agencyName}</span>
        </div>
      </div>
    </motion.div>
  );
}

