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
  ArrowRight,
  Building2
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PropertyCard } from "@/components/property/PropertyCard";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  
  const { data: agency } = await supabase
    .from('agencies')
    .select('name, description')
    .eq('slug', slug)
    .single();

  if (!agency) return { title: 'Agent Profile | Nestiq' };

  return {
    title: `${agency.name} — Estate Agent in UK | Nestiq`,
    description: agency.description?.substring(0, 155),
  };
}

export default async function AgentProfilePage({ params }: PageProps) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: agency, error } = await supabase
    .from('agencies')
    .select(`
      *,
      properties(
        id, title, slug, price, listing_type, status,
        bedrooms, bathrooms, address_line1, town, postcode,
        property_images(url, sort_order)
      )
    `)
    .eq('slug', slug)
    .single();

  if (error || !agency) {
    notFound();
  }

  const properties = (agency as any).properties || [];

  return (
    <div className="bg-silk min-h-screen">
      {/* Hero Header */}
      <section className="bg-obsidian text-silk pt-40 pb-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
             <div className="w-32 h-32 bg-white flex items-center justify-center p-4 border border-white/10 flex-shrink-0 overflow-hidden">
                {agency.logo_url ? (
                  <img src={agency.logo_url} alt={agency.name} className="w-full h-full object-contain" />
                ) : (
                  <Building2 className="w-12 h-12 text-forest" />
                )}
             </div>
             <div className="flex-1 space-y-6">
                <div className="flex flex-wrap items-center gap-4">
                  <h1 className="text-display-md font-display font-bold">{agency.name}</h1>
                  {agency.verified && (
                    <span className="bg-emerald/20 text-emerald text-[10px] font-bold px-3 py-1 uppercase tracking-widest flex items-center gap-2">
                      <ShieldCheck className="w-3 h-3" />
                      Verified Partner
                    </span>
                  )}
                </div>
                <p className="text-body-lg text-silk/60 max-w-2xl leading-relaxed">
                  {agency.description}
                </p>
                <div className="flex flex-wrap gap-8 pt-4">
                   {agency.avg_rating > 0 && (
                     <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-emerald fill-emerald" />
                        <span className="text-sm font-bold">{agency.avg_rating}</span>
                        <span className="text-sm text-silk/40">({agency.review_count || 0} reviews)</span>
                     </div>
                   )}
                   <div className="flex items-center gap-2 text-silk/60 text-sm">
                      <MapPin className="w-4 h-4 text-emerald" />
                      {agency.city}, {agency.county}
                   </div>
                </div>
             </div>
             <div className="w-full lg:w-auto flex flex-col gap-4">
                <Button className="bg-emerald text-silk hover:bg-white hover:text-obsidian border-none h-14 px-12 text-[10px] font-bold uppercase tracking-widest w-full">
                  Contact Agency
                </Button>
                <div className="flex gap-4">
                   {agency.phone && (
                     <a href={`tel:${agency.phone}`} className="flex-1 h-12 border border-white/10 flex items-center justify-center gap-3 hover:bg-white/5 transition-colors">
                        <Phone className="w-3.5 h-3.5 text-emerald" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Call</span>
                     </a>
                   )}
                   {agency.website_url && (
                     <a href={agency.website_url} target="_blank" rel="noopener noreferrer" className="flex-1 h-12 border border-white/10 flex items-center justify-center gap-3 hover:bg-white/5 transition-colors">
                        <Globe className="w-3.5 h-3.5 text-emerald" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Website</span>
                     </a>
                   )}
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-16">
          
          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-12">
             <div className="space-y-6">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted">Agency Overview</h3>
                <div className="space-y-4">
                   <div className="flex items-center gap-4 text-sm text-obsidian font-medium">
                      <Clock className="w-4 h-4 text-emerald" />
                      <span className="text-muted">Member Since</span>
                      <span className="ml-auto">{new Date(agency.created_at).getFullYear()}</span>
                   </div>
                   <div className="flex items-center gap-4 text-sm text-obsidian font-medium">
                      <Award className="w-4 h-4 text-emerald" />
                      <span className="text-muted">Status</span>
                      <span className="ml-auto text-emerald font-bold uppercase text-[9px] tracking-widest">Partner</span>
                   </div>
                </div>
             </div>

             <div className="bg-white border border-border/40 p-8 space-y-6">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-obsidian">Office Details</h4>
                <div className="space-y-4">
                   <div className="flex flex-col gap-1 border-l-2 border-emerald pl-4">
                      <p className="text-sm font-bold">{agency.city} Office</p>
                      <p className="text-[10px] text-muted uppercase">{agency.county}</p>
                   </div>
                </div>
                <div className="pt-4 border-t border-border/20">
                   <p className="text-[10px] text-muted leading-relaxed uppercase tracking-widest">
                     {agency.address_line1}<br/>
                     {agency.postcode}
                   </p>
                </div>
             </div>
          </aside>

          {/* Property Results */}
          <div className="lg:col-span-3 space-y-12">
             <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border/20 pb-8 gap-6">
                <h2 className="text-display-sm font-display font-bold text-obsidian uppercase tracking-tight">Active Listings</h2>
                <div className="flex gap-4">
                   <button className="text-[10px] font-bold text-emerald border-b-2 border-emerald pb-2 uppercase tracking-widest">For Sale</button>
                   <button className="text-[10px] font-bold text-muted hover:text-obsidian pb-2 uppercase tracking-widest">To Rent</button>
                </div>
             </div>

             {properties.length > 0 ? (
               <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  {properties.map((prop: any) => (
                    <PropertyCard key={prop.id} property={prop} />
                  ))}
               </div>
             ) : (
               <div className="py-20 text-center bg-white border border-dashed border-border/60">
                  <p className="text-[10px] font-bold text-muted uppercase tracking-[0.4em]">No active listings found for this agency</p>
               </div>
             )}

             {properties.length > 6 && (
               <div className="flex justify-center pt-12">
                  <Button variant="secondary" className="group border-forest text-forest hover:bg-forest hover:text-white">
                     Load More Listings <ArrowRight className="ml-2 w-3 h-3 group-hover:translate-x-1 transition-transform duration-500" />
                  </Button>
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}
