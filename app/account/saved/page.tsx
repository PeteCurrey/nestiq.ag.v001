import Link from "next/link";
import { Heart, Search, TrendingDown, TrendingUp } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/Button";
import { PropertyCard } from "@/components/property/PropertyCard";
import { SavedControls } from "./_SavedControls";

export const dynamic = "force-dynamic";

type SearchParams = { collection?: string };

export default async function SavedPropertiesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { collection } = await searchParams;
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return (
      <EmptyState
        title="Sign in to see your shortlist"
        body="Saved properties are kept to your account, so they follow you between devices."
        href="/login?redirect=/account/saved"
        cta="Sign in"
      />
    );
  }

  const { data: collections } = await supabase
    .from("collections")
    .select("id, name, is_default")
    .order("is_default", { ascending: false })
    .order("created_at", { ascending: true });

  let query = supabase
    .from("saved_properties")
    .select(`
      id, notes, price_at_save, created_at, collection_id,
      properties (
        id, slug, title, price, price_qualifier, status, listing_type,
        bedrooms, bathrooms, sqft, address_line1, town, postcode,
        epc_rating, completeness_score, featured,
        property_images ( url, sort_order ),
        agencies ( name, logo_url )
      )
    `)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (collection) query = query.eq("collection_id", collection);

  const { data: saved } = await query;
  const rows = (saved ?? []).filter((r) => r.properties);

  if (rows.length === 0) {
    return (
      <div className="space-y-8">
        <Header count={0} collections={collections ?? []} active={collection} />
        <EmptyState
          title={collection ? "Nothing in this shortlist yet" : "No saved properties yet"}
          body="Save a property from any search result and it will appear here, with its price tracked from the day you saved it."
          href="/search"
          cta="Start searching"
        />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Header count={rows.length} collections={collections ?? []} active={collection} />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {rows.map((row) => {
          const p = row.properties as NonNullable<typeof row.properties>;
          const movement =
            row.price_at_save != null && Number(row.price_at_save) !== Number(p.price)
              ? Number(p.price) - Number(row.price_at_save)
              : null;

          return (
            <div key={row.id} className="flex flex-col gap-3">
              <PropertyCard property={p as never} isSaved />

              {movement !== null && (
                <div
                  className={`flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest px-4 py-2 ${
                    movement < 0 ? "bg-emerald/10 text-forest" : "bg-warning/10 text-warning"
                  }`}
                >
                  {movement < 0 ? (
                    <TrendingDown className="w-3.5 h-3.5" />
                  ) : (
                    <TrendingUp className="w-3.5 h-3.5" />
                  )}
                  {movement < 0 ? "Reduced" : "Increased"} by £
                  {Math.abs(movement).toLocaleString()} since you saved it
                </div>
              )}

              <SavedControls
                propertyId={p.id}
                notes={row.notes}
                collectionId={row.collection_id}
                collections={collections ?? []}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Header({
  count,
  collections,
  active,
}: {
  count: number;
  collections: { id: string; name: string; is_default: boolean }[];
  active?: string;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-display-sm font-display text-obsidian mb-2">Saved properties</h1>
        <p className="text-body-md text-muted">
          {count === 0
            ? "Nothing saved yet."
            : `${count} ${count === 1 ? "property" : "properties"} on your shortlist. Prices are tracked from the day you saved.`}
        </p>
      </div>

      {collections.length > 0 && (
        <nav className="flex flex-wrap gap-2" aria-label="Shortlists">
          <FilterLink href="/account/saved" active={!active} label="All" />
          {collections.map((c) => (
            <FilterLink
              key={c.id}
              href={`/account/saved?collection=${c.id}`}
              active={active === c.id}
              label={c.name}
            />
          ))}
        </nav>
      )}
    </div>
  );
}

function FilterLink({ href, active, label }: { href: string; active: boolean; label: string }) {
  return (
    <Link
      href={href}
      className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest border transition-colors ${
        active
          ? "bg-forest text-white border-forest"
          : "bg-white text-muted border-border hover:border-forest hover:text-forest"
      }`}
    >
      {label}
    </Link>
  );
}

function EmptyState({
  title,
  body,
  href,
  cta,
}: {
  title: string;
  body: string;
  href: string;
  cta: string;
}) {
  return (
    <div className="bg-white p-16 border border-border text-center">
      <div className="w-16 h-16 bg-warm rounded-full flex items-center justify-center mx-auto mb-6">
        <Heart className="w-8 h-8 text-subtle" strokeWidth={1.5} />
      </div>
      <h3 className="text-body-lg font-display text-obsidian mb-2">{title}</h3>
      <p className="text-body-sm text-muted mb-8 max-w-md mx-auto leading-relaxed">{body}</p>
      <Button variant="primary" href={href}>
        <Search className="w-4 h-4 mr-2" /> {cta}
      </Button>
    </div>
  );
}
