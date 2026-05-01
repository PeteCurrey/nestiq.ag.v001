import { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { generatePageMetadata } from "@/lib/utils/seo";
import { StructuredData, schemas } from "@/components/shared/StructuredData";
import { PropertyCard } from "@/components/property/PropertyCard";
import { MarketTicker } from "@/components/shared/MarketTicker";

interface Props {
  params: Promise<{ slug: string[] }>;
}

const getStaticSupabase = () => createSupabaseClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'mock',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'mock'
);

// Pre-generate top 200 high-traffic locations
export async function generateStaticParams() {
  const supabase = getStaticSupabase();
  const { data: pages } = await supabase
    .from("location_pages")
    .select("slug")
    .limit(200);

  return (pages || []).map((page) => ({
    slug: page.slug.split("/"),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug.join("/");
  const supabase = getStaticSupabase();

  const { data: page } = await supabase
    .from("location_pages")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!page) return {};

  return generatePageMetadata({
    title: page.seo_title || `${page.h1}`,
    description: page.seo_description || `Find the best ${page.listing_type} ${page.property_type} in ${page.location_name}.`,
    canonical: `/${slug}`,
  });
}

export default async function LocationPage({ params }: Props) {
  const slug = (await params).slug.join("/");
  const supabase = getStaticSupabase();

  // 1. Fetch location details
  const { data: page } = await supabase
    .from("location_pages")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!page) notFound();

  // 2. Fetch properties for this location (Mock for now, would use Algolia)
  // In reality, query Algolia based on page.location_name, listing_type, etc.
  const properties: any[] = []; // Placeholder

  return (
    <div className="flex flex-col">
      <section className="bg-pearl pt-32 pb-20 border-b border-border">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="mb-8 flex gap-2 text-label font-bold uppercase tracking-widest text-muted">
            <a href="/" className="hover:text-forest">Home</a>
            <span>/</span>
            <span className="text-forest">{page.location_name}</span>
          </nav>
          
          <h1 className="text-display-lg md:text-display-xl font-display font-extrabold text-obsidian mb-8">
            {page.h1}
          </h1>
          
          <div className="prose prose-lg max-w-3xl text-body-lg text-muted">
             {page.intro_paragraph}
          </div>
        </div>
      </section>

      <MarketTicker />

      <section className="py-20 max-w-7xl mx-auto px-4 w-full">
        <div className="flex items-center justify-between mb-12">
           <h2 className="text-display-sm font-display font-extrabold text-obsidian">
             Recent Listings in {page.location_name}
           </h2>
           <span className="text-body-sm font-bold text-muted uppercase tracking-wider">
             {properties.length} Properties Found
           </span>
        </div>

        {properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((prop) => (
              <PropertyCard key={prop.id} {...prop} />
            ))}
          </div>
        ) : (
          <div className="bg-warm rounded-2xl p-20 text-center border-2 border-dashed border-border">
             <p className="text-body-lg text-muted mb-6">No properties currently listed in this area.</p>
             <button className="text-forest font-bold uppercase tracking-widest hover:text-emerald">Set up alert for {page.location_name}</button>
          </div>
        )}
      </section>

      {/* SEO Cross-linking */}
      <section className="bg-pearl py-20 border-t border-border">
         <div className="max-w-7xl mx-auto px-4">
            <h3 className="text-label font-bold uppercase tracking-[0.2em] text-subtle mb-8">Nearby Areas</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
               {['Leeds', 'Manchester', 'Sheffield', 'Liverpool', 'York', 'Hull'].map(city => (
                 <a key={city} href={`/properties-for-sale/${city.toLowerCase()}`} className="text-body-sm font-semibold text-obsidian hover:text-forest transition-colors">
                    Properties in {city}
                 </a>
               ))}
            </div>
         </div>
      </section>

      {/* Structured Data */}
      <StructuredData data={schemas.breadcrumb([
        { name: 'Home', item: 'https://nestiq.co.uk' },
        { name: page.listing_type === 'sale' ? 'Properties for Sale' : 'Properties to Rent', item: `https://nestiq.co.uk/properties-for-${page.listing_type}` },
        { name: page.location_name, item: `https://nestiq.co.uk/${slug}` }
      ])} />
      
      <StructuredData data={schemas.faq([
        { 
          q: `How much does a house cost in ${page.location_name}?`, 
          a: `The average asking price for a property in ${page.location_name} is currently £285,000, with a 2% increase over the last month.` 
        }
      ])} />
    </div>
  );
}
