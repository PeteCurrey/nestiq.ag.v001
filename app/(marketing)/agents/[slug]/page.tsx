import { Star, MapPin, Building2, Phone, Mail, Globe, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PropertyCard } from "@/components/property/PropertyCard";
import { Badge } from "@/components/ui/Badge";

const mockAgent = {
  name: "Savills Chelsea",
  logo: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=200",
  cover: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1400",
  rating: 4.9,
  reviews: 124,
  active_listings: 42,
  location: "London, SW3",
  address: "132 Kings Road, Chelsea, London SW3 4TR",
  phone: "020 7591 2200",
  email: "chelsea@savills.com",
  website: "savills.co.uk",
  description: "As one of the world's leading property agents, our Chelsea office specializes in prime residential sales and lettings across Chelsea, Kensington and Knightsbridge. Our expert team combines local knowledge with a global network to deliver exceptional results for our clients.",
  listings: [
    {
      id: "1",
      slug: "ash-manor",
      title: "The Ash Manor",
      price: 1450000,
      address: "Chelsea, London • SW3",
      bedrooms: 4,
      bathrooms: 3,
      sqft: 2200,
      imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
      status: "for-sale" as const,
      featured: true,
      agencyName: "Savills Chelsea"
    },
    {
      id: "2",
      slug: "modern-townhouse",
      title: "Modern Townhouse",
      price: 650000,
      address: "Oxford • OX1",
      bedrooms: 3,
      bathrooms: 2,
      sqft: 1400,
      imageUrl: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=800&auto=format&fit=crop",
      status: "for-sale" as const,
      agencyName: "Savills Chelsea"
    }
  ]
};

export default function AgentProfilePage() {
  return (
    <div className="bg-pearl min-h-screen">
      {/* Cover Photo */}
      <div className="h-[300px] w-full relative">
         <img src={mockAgent.cover} className="w-full h-full object-cover" alt="Cover" />
         <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-20 relative z-10">
         <div className="grid grid-cols-12 gap-8">
            
            {/* Left Content */}
            <div className="col-span-12 lg:col-span-8">
               <div className="bg-white p-10 rounded-3xl border border-border shadow-sm mb-8">
                  <div className="flex flex-col md:flex-row gap-8 items-start mb-8">
                     <div className="w-32 h-32 rounded-2xl bg-warm border border-border p-6 flex items-center justify-center flex-shrink-0">
                        <Building2 className="w-16 h-16 text-forest" />
                     </div>
                     <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-4 mb-3">
                           <h1 className="text-display-md font-display font-bold text-obsidian">{mockAgent.name}</h1>
                           <Badge variant="emerald">Verified Partner</Badge>
                        </div>
                        <div className="flex flex-wrap items-center gap-6 text-body-sm font-bold text-muted uppercase tracking-widest">
                           <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-forest" /> {mockAgent.location}</span>
                           <span className="flex items-center gap-1.5 text-amber-500"><Star className="w-4 h-4 fill-current" /> {mockAgent.rating} ({mockAgent.reviews} Reviews)</span>
                        </div>
                     </div>
                  </div>

                  <p className="text-body-lg text-muted leading-relaxed mb-10">
                     {mockAgent.description}
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y border-border">
                     <div className="text-center">
                        <p className="text-display-xs font-display font-black text-obsidian">{mockAgent.active_listings}</p>
                        <p className="text-[10px] font-bold text-muted uppercase tracking-widest">Active Listings</p>
                     </div>
                     <div className="text-center">
                        <p className="text-display-xs font-display font-black text-obsidian">182</p>
                        <p className="text-[10px] font-bold text-muted uppercase tracking-widest">Sold in 12m</p>
                     </div>
                     <div className="text-center">
                        <p className="text-display-xs font-display font-black text-obsidian">98%</p>
                        <p className="text-[10px] font-bold text-muted uppercase tracking-widest">Asking Price Met</p>
                     </div>
                     <div className="text-center">
                        <p className="text-display-xs font-display font-black text-obsidian">12d</p>
                        <p className="text-[10px] font-bold text-muted uppercase tracking-widest">Avg Days on Market</p>
                     </div>
                  </div>
               </div>

               {/* Agency Listings */}
               <h2 className="text-display-sm font-display font-bold text-obsidian mb-8">Properties from {mockAgent.name}</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {mockAgent.listings.map((prop) => (
                    <PropertyCard key={prop.id} property={prop as any} />
                  ))}
               </div>
            </div>

            {/* Right Sidebar (Contact) */}
            <div className="col-span-12 lg:col-span-4">
               <div className="sticky top-24 space-y-8">
                  <div className="bg-forest p-10 rounded-3xl text-white shadow-xl">
                     <h3 className="text-body-lg font-display font-bold mb-8">Contact Agent</h3>
                     <div className="space-y-6 mb-10">
                        <div className="flex items-start gap-4">
                           <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                              <Phone className="w-5 h-5 text-emerald" />
                           </div>
                           <div>
                              <p className="text-xs font-bold text-emerald uppercase tracking-widest mb-1">Phone</p>
                              <p className="text-body-md font-bold">{mockAgent.phone}</p>
                           </div>
                        </div>
                        <div className="flex items-start gap-4">
                           <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                              <Mail className="w-5 h-5 text-emerald" />
                           </div>
                           <div>
                              <p className="text-xs font-bold text-emerald uppercase tracking-widest mb-1">Email</p>
                              <p className="text-body-md font-bold">{mockAgent.email}</p>
                           </div>
                        </div>
                        <div className="flex items-start gap-4">
                           <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                              <Globe className="w-5 h-5 text-emerald" />
                           </div>
                           <div>
                              <p className="text-xs font-bold text-emerald uppercase tracking-widest mb-1">Website</p>
                              <p className="text-body-md font-bold">{mockAgent.website}</p>
                           </div>
                        </div>
                     </div>
                     <Button variant="secondary" fullWidth size="lg" className="bg-emerald text-obsidian hover:bg-emerald/90">
                        Request Valuation
                        <ArrowRight className="ml-2 w-4 h-4" />
                     </Button>
                  </div>

                  <div className="bg-white p-8 rounded-3xl border border-border shadow-sm">
                     <h4 className="text-label font-bold uppercase tracking-widest text-muted mb-4">Location</h4>
                     <p className="text-body-sm font-bold text-obsidian mb-4">{mockAgent.address}</p>
                     <div className="h-48 bg-warm rounded-xl border border-border flex items-center justify-center text-muted text-xs font-bold uppercase tracking-widest">
                        Map Placeholder
                     </div>
                  </div>
               </div>
            </div>

         </div>
      </div>
    </div>
  );
}
