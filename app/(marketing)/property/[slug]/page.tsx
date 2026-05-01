import { PropertyMap } from "@/components/property/PropertyMap";
import { EPCDisplay } from "@/components/property/EPCDisplay";
import { MortgageCalculator } from "@/components/property/MortgageCalculator";
import { EnquiryForm } from "@/components/property/EnquiryForm";
import { Badge } from "@/components/ui/Badge";
import { Bed, Bath, Move, Calendar, MapPin, Share2, Heart, Building2 } from "lucide-react";
import Image from "next/image";

const mockProperty = {
  id: "1",
  slug: "ash-manor",
  title: "The Ash Manor",
  price: 1450000,
  address: "Chelsea, London • SW3",
  bedrooms: 4,
  bathrooms: 3,
  sqft: 2200,
  images: [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=800&auto=format&fit=crop",
  ],
  description: "A stunning 4-bedroom period manor located in the heart of Chelsea. This property has been meticulously renovated to the highest standards, combining classic architecture with modern luxury features.",
  features: ["Underfloor heating", "Private garden", "Wine cellar", "Home cinema", "Smart home system"],
  status: "for-sale" as const,
  lat: 51.4875,
  lng: -0.1687,
  agencyName: "Savills Chelsea",
  epc: "B" as const,
  tenure: "Freehold",
  council_tax: "Band G"
};

export default function PropertyDetailPage() {
  return (
    <div className="bg-pearl min-h-screen pt-24 pb-20">
      
      {/* Top Bar / Actions */}
      <div className="max-w-7xl mx-auto px-4 mb-8 flex justify-between items-end">
         <div>
            <nav className="flex gap-2 text-label font-bold uppercase tracking-widest text-muted mb-4">
              <a href="/">Home</a> <span>/</span> <a href="/search">Search</a> <span>/</span> <span className="text-forest">Property</span>
            </nav>
            <h1 className="text-display-md font-display font-extrabold text-obsidian">{mockProperty.title}</h1>
            <p className="text-body-lg text-muted flex items-center gap-2 mt-2">
               <MapPin className="w-4 h-4 text-forest" /> {mockProperty.address}
            </p>
         </div>
         <div className="flex gap-4">
            <button className="p-3 bg-white border border-border rounded-full hover:bg-warm transition-colors shadow-sm">
               <Share2 className="w-5 h-5 text-obsidian" />
            </button>
            <button className="p-3 bg-white border border-border rounded-full hover:bg-warm transition-colors shadow-sm">
               <Heart className="w-5 h-5 text-obsidian" />
            </button>
         </div>
      </div>

      {/* Image Gallery */}
      <div className="max-w-[1440px] mx-auto px-4 grid grid-cols-12 gap-4 h-[600px] mb-12">
         <div className="col-span-8 relative rounded-2xl overflow-hidden">
            <Image src={mockProperty.images[0]} fill className="object-cover" alt="Main" priority />
         </div>
         <div className="col-span-4 flex flex-col gap-4">
            <div className="flex-1 relative rounded-2xl overflow-hidden">
               <Image src={mockProperty.images[1]} fill className="object-cover" alt="Interior" />
            </div>
            <div className="flex-1 relative rounded-2xl overflow-hidden">
               <Image src={mockProperty.images[2]} fill className="object-cover" alt="Garden" />
               <div className="absolute inset-0 bg-obsidian/40 flex items-center justify-center">
                  <button className="px-6 py-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-white font-bold uppercase tracking-widest text-label hover:bg-white/40 transition-all">
                     View All 24 Photos
                  </button>
               </div>
            </div>
         </div>
      </div>

      {/* Content Grid */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-12 gap-12">
         
         {/* Left Column (Main Info) */}
         <div className="col-span-8 space-y-12">
            
            {/* Quick Stats */}
            <div className="grid grid-cols-4 gap-8 py-8 border-y border-border">
               <div className="flex flex-col gap-1">
                  <span className="text-label font-bold text-muted uppercase tracking-widest">Price</span>
                  <span className="text-display-sm font-display font-bold text-obsidian">£{mockProperty.price.toLocaleString()}</span>
               </div>
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-warm rounded-full flex items-center justify-center">
                     <Bed className="w-6 h-6 text-forest" />
                  </div>
                  <div>
                     <span className="text-label font-bold text-muted uppercase tracking-widest block">Bedrooms</span>
                     <span className="text-body-lg font-bold text-obsidian">{mockProperty.bedrooms}</span>
                  </div>
               </div>
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-warm rounded-full flex items-center justify-center">
                     <Bath className="w-6 h-6 text-forest" />
                  </div>
                  <div>
                     <span className="text-label font-bold text-muted uppercase tracking-widest block">Bathrooms</span>
                     <span className="text-body-lg font-bold text-obsidian">{mockProperty.bathrooms}</span>
                  </div>
               </div>
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-warm rounded-full flex items-center justify-center">
                     <Move className="w-6 h-6 text-forest" />
                  </div>
                  <div>
                     <span className="text-label font-bold text-muted uppercase tracking-widest block">Living Space</span>
                     <span className="text-body-lg font-bold text-obsidian">{mockProperty.sqft} sq ft</span>
                  </div>
               </div>
            </div>

            {/* Description */}
            <section>
               <h2 className="text-display-sm font-display font-bold text-obsidian mb-6">Property Overview</h2>
               <p className="text-body-lg text-muted leading-relaxed">
                  {mockProperty.description}
               </p>
            </section>

            {/* Features */}
            <section>
               <h2 className="text-display-sm font-display font-bold text-obsidian mb-6">Key Features</h2>
               <div className="grid grid-cols-2 gap-4">
                  {mockProperty.features.map(f => (
                    <div key={f} className="flex items-center gap-3 text-body-md text-obsidian font-medium">
                       <div className="w-2 h-2 bg-emerald rounded-full" />
                       {f}
                    </div>
                  ))}
               </div>
            </section>

            <EPCDisplay current={mockProperty.epc} potential="A" />

            <PropertyMap lat={mockProperty.lat} lng={mockProperty.lng} />

         </div>

         {/* Right Column (Sticky Form/Tools) */}
         <div className="col-span-4 space-y-8">
            <div className="sticky top-24 space-y-8">
               <EnquiryForm propertyId={mockProperty.id} address={mockProperty.address} />
               
               <div className="bg-white p-8 rounded-2xl border border-border shadow-sm flex items-center gap-4">
                  <div className="w-12 h-12 bg-warm rounded flex items-center justify-center p-2">
                     <Building2 className="w-8 h-8 text-forest" />
                  </div>
                  <div>
                     <span className="text-label font-bold text-muted uppercase tracking-widest block">Listed By</span>
                     <span className="text-body-md font-bold text-obsidian uppercase">{mockProperty.agencyName}</span>
                  </div>
               </div>

               <MortgageCalculator initialPrice={mockProperty.price} />
            </div>
         </div>

      </div>
    </div>
  );
}
