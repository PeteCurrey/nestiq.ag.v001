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
        whileHover={{ y: -2 }}
        onClick={() => router.push(`/property/${property.slug}`)}
        className="group flex bg-white rounded-lg overflow-hidden border border-border shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer h-[280px]"
      >
        {/* Image - 40% */}
        <div className="relative w-[40%] h-full overflow-hidden">
          <Image
            src={property.imageUrl}
            alt={property.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, 40vw"
          />
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {property.featured && <Badge variant="emerald">Featured</Badge>}
            <Badge status={property.status}>{property.status.replace("-", " ")}</Badge>
          </div>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onSave?.(property.id);
            }}
            className="absolute bottom-3 right-3 p-2 bg-white/90 backdrop-blur-md rounded-full shadow-lg hover:bg-white transition-colors"
          >
            <Heart className={cn("w-5 h-5", isSaved ? "fill-red-500 text-red-500" : "text-obsidian")} />
          </button>
        </div>

        {/* Details - 60% */}
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-2">
               <div>
                  <span className="text-display-sm font-display font-bold text-obsidian">
                    £{property.price.toLocaleString()}
                  </span>
                  {property.price_qualifier && (
                    <p className="text-body-sm text-muted font-medium">{property.price_qualifier}</p>
                  )}
               </div>
               {showMatchScore && (
                 <Badge variant="emerald" className="bg-emerald/10 text-emerald border-emerald/20">98% Match</Badge>
               )}
            </div>
            <h3 className="text-body-xl font-display font-bold text-obsidian mb-1 truncate">{property.title}</h3>
            <p className="text-body-sm text-muted mb-4">{property.address}</p>
            
            <div className="flex items-center gap-6 mb-6">
              <div className="flex items-center gap-2 text-body-sm font-mono font-bold text-obsidian">
                <Bed className="w-4 h-4 text-subtle" /> {property.bedrooms}
              </div>
              <div className="flex items-center gap-2 text-body-sm font-mono font-bold text-obsidian">
                <Bath className="w-4 h-4 text-subtle" /> {property.bathrooms}
              </div>
              <div className="flex items-center gap-2 text-body-sm font-mono font-bold text-obsidian">
                <Move className="w-4 h-4 text-subtle" /> {property.sqft.toLocaleString()}
              </div>
            </div>
          </div>

          {showAgentBranding && (
            <div className="flex items-center gap-3 border-t border-border pt-4">
              <div className="w-8 h-8 rounded bg-warm flex items-center justify-center p-1 border border-border">
                {property.agencyLogo ? (
                  <img src={property.agencyLogo} alt="" className="w-full h-full object-contain" />
                ) : (
                  <Building2 className="w-4 h-4 text-subtle" />
                )}
              </div>
              <span className="text-label font-bold text-subtle uppercase tracking-widest truncate">{property.agencyName}</span>
            </div>
          )}
        </div>
      </motion.div>
    );
  }

  // Vertical variant
  return (
    <motion.div
      whileHover={{ y: -2 }}
      onClick={() => router.push(`/property/${property.slug}`)}
      className="group bg-white rounded-lg overflow-hidden border border-border shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={property.imageUrl}
          alt={property.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-4 right-4">
           <Badge status={property.status}>{property.status.replace("-", " ")}</Badge>
        </div>
        {property.featured && (
          <div className="absolute top-4 left-4">
             <Badge variant="emerald">Featured</Badge>
          </div>
        )}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onSave?.(property.id);
          }}
          className="absolute bottom-4 right-4 p-2.5 bg-white/90 backdrop-blur-md rounded-full shadow-lg hover:bg-white transition-colors"
        >
          <Heart className={cn("w-5 h-5", isSaved ? "fill-red-500 text-red-500" : "text-obsidian")} />
        </button>
      </div>

      <div className="p-6">
        <div className="mb-4">
          <span className="text-display-sm font-display font-bold text-obsidian">
            £{property.price.toLocaleString()}
          </span>
          {property.price_qualifier && (
            <p className="text-body-sm text-muted font-medium">{property.price_qualifier}</p>
          )}
        </div>

        <h3 className="text-body-xl font-display font-bold text-obsidian mb-1 truncate">{property.title}</h3>
        <p className="text-body-sm text-muted mb-4 truncate">{property.address}</p>

        <div className="flex items-center gap-6 border-t border-border pt-4">
          <div className="flex items-center gap-2 text-body-sm font-mono font-bold text-obsidian uppercase">
            <Bed className="w-4 h-4 text-subtle" /> {property.bedrooms}
          </div>
          <div className="flex items-center gap-2 text-body-sm font-mono font-bold text-obsidian uppercase">
            <Bath className="w-4 h-4 text-subtle" /> {property.bathrooms}
          </div>
          <div className="flex items-center gap-2 text-body-sm font-mono font-bold text-obsidian uppercase">
            <Move className="w-4 h-4 text-subtle" /> {property.sqft.toLocaleString()}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
