import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PropertyCard } from '@/components/property/PropertyCard';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ArrowRight, MapPin, TrendingUp, Info } from 'lucide-react';

interface LocationPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function LocationPage({ params }: LocationPageProps) {
  const { slug } = await params;
  const supabase = await createClient();

  // Fetch location page data
  const { data: page, error: pageError } = await supabase
    .from('location_pages')
    .select('*')
    .eq('slug', slug)
    .single();

  if (pageError || !page) {
    notFound();
  }

  // Fetch properties in this location
  // For now, we'll search by town name match
  const { data: properties, error: propError } = await supabase
    .from('properties')
    .select('*')
    .ilike('town', `%${page.location_name}%`)
    .limit(12);

  return (
    <div className="bg-silk min-h-screen">
      <Header />
      
      <main className="pt-32 pb-20">
        {/* Hero Section */}
        <section className="px-6 md:px-12 max-w-[1800px] mx-auto mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald/10 border border-emerald/20 rounded-full mb-6">
                <MapPin className="w-3 h-3 text-emerald" />
                <span className="text-[10px] font-bold text-emerald uppercase tracking-widest">{page.county}</span>
              </div>
              <h1 className="text-display-lg font-display mb-8 leading-[1.1]">
                {page.h1}
              </h1>
              <p className="text-body-xl text-muted max-w-xl leading-relaxed mb-12">
                {page.intro_paragraph}
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary" className="bg-obsidian text-silk px-10 h-14">
                  View All Listings
                </Button>
                <Button variant="outline" className="px-10 h-14">
                  Market Data
                </Button>
              </div>
            </div>
            
            <div className="relative aspect-[4/3] bg-warm overflow-hidden">
               <img 
                 src={`https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop`} 
                 className="w-full h-full object-cover grayscale brightness-90"
                 alt={page.location_name}
               />
               <div className="absolute inset-0 bg-gradient-to-t from-obsidian/40 to-transparent" />
            </div>
          </div>
        </section>

        {/* Properties Grid */}
        <section className="px-6 md:px-12 max-w-[1800px] mx-auto mb-32">
          <div className="flex items-end justify-between mb-16">
            <div>
              <h2 className="text-display-sm font-display mb-4">Latest Listings in {page.location_name}</h2>
              <p className="text-body-md text-muted">The newest properties from our independent agent partners.</p>
            </div>
            <Link href={`/search?location=${page.location_name}`} className="text-[10px] font-bold uppercase tracking-widest text-emerald hover:text-emerald/80 flex items-center gap-2">
              See All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {properties && properties.length > 0 ? (
              properties.map((prop) => (
                <PropertyCard key={prop.id} property={prop as any} />
              ))
            ) : (
              <div className="col-span-full py-20 text-center border border-dashed border-border">
                <p className="text-muted text-body-md">No active listings found in {page.location_name} at this moment.</p>
              </div>
            )}
          </div>
        </section>

        {/* Market Insights Placeholder */}
        <section className="px-6 md:px-12 max-w-[1800px] mx-auto">
          <div className="bg-obsidian p-16 text-silk">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
              <div className="lg:col-span-1">
                <TrendingUp className="w-10 h-10 text-emerald mb-8" strokeWidth={1} />
                <h3 className="text-display-xs font-display mb-6">{page.location_name} Market Insight</h3>
                <p className="text-silk/60 text-body-md leading-relaxed mb-8">
                  The property market in {page.location_name} has shown resilient growth over the last 12 months, with a particular demand for character properties and modern family homes.
                </p>
                <Button variant="outline" className="border-silk/20 text-silk hover:bg-silk/10">
                  Full Market Report
                </Button>
              </div>
              
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-10 bg-white/5 border border-white/10">
                  <span className="text-[9px] font-bold text-silk/40 uppercase tracking-widest block mb-4">Avg. Asking Price</span>
                  <div className="text-display-sm font-display">£425,000</div>
                  <span className="text-emerald text-[10px] font-bold">+4.2% YoY</span>
                </div>
                <div className="p-10 bg-white/5 border border-white/10">
                  <span className="text-[9px] font-bold text-silk/40 uppercase tracking-widest block mb-4">Properties Sold (2025)</span>
                  <div className="text-display-sm font-display">184</div>
                  <span className="text-silk/40 text-[10px] font-bold">In this area</span>
                </div>
                <div className="p-10 bg-white/5 border border-white/10">
                  <span className="text-[9px] font-bold text-silk/40 uppercase tracking-widest block mb-4">Time on Market</span>
                  <div className="text-display-sm font-display">42 Days</div>
                  <span className="text-emerald text-[10px] font-bold">-5 days vs avg</span>
                </div>
                <div className="p-10 bg-white/5 border border-white/10">
                  <span className="text-[9px] font-bold text-silk/40 uppercase tracking-widest block mb-4">Rental Yield</span>
                  <div className="text-display-sm font-display">4.8%</div>
                  <span className="text-silk/40 text-[10px] font-bold">Average for {page.location_name}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
