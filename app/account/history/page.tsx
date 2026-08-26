import { History } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/Button";
import { PropertyCard } from "@/components/property/PropertyCard";

export const dynamic = "force-dynamic";

export default async function HistoryPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: views } = await supabase
    .from("property_views")
    .select(`
      id, viewed_at,
      properties (
        id, slug, title, price, price_qualifier, status, listing_type,
        bedrooms, bathrooms, sqft, address_line1, town, postcode,
        epc_rating, completeness_score, featured,
        property_images ( url, sort_order ),
        agencies ( name, logo_url )
      )
    `)
    .eq("user_id", user.id)
    .order("viewed_at", { ascending: false })
    .limit(24);

  const rows = (views ?? []).filter((v) => v.properties);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-display-sm font-display text-obsidian mb-2">Recently viewed</h1>
        <p className="text-body-md text-muted">
          The last two dozen properties you looked at, most recent first.
        </p>
      </div>

      {rows.length === 0 ? (
        <div className="bg-white p-16 border border-border text-center">
          <div className="w-16 h-16 bg-warm rounded-full flex items-center justify-center mx-auto mb-6">
            <History className="w-8 h-8 text-subtle" strokeWidth={1.5} />
          </div>
          <h3 className="text-body-lg font-display text-obsidian mb-2">Nothing viewed yet</h3>
          <p className="text-body-sm text-muted mb-8 max-w-md mx-auto leading-relaxed">
            Properties you open will appear here so you can find your way back to them.
          </p>
          <Button variant="primary" href="/search">Start searching</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {rows.map((v) => (
            <PropertyCard key={v.id} property={v.properties as never} />
          ))}
        </div>
      )}
    </div>
  );
}
