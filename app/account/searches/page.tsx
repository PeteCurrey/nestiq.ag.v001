import { Search, Bell } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/Button";
import { SearchRow } from "./_SearchRow";

export const dynamic = "force-dynamic";

type Filters = {
  town?: string;
  listing_type?: string;
  min_price?: number;
  max_price?: number;
  min_bedrooms?: number;
  min_completeness?: number;
};

/** Turns stored filters back into something a person can read. */
export function describeFilters(filters: Filters): string {
  const bits: string[] = [];
  if (filters.min_bedrooms) bits.push(`${filters.min_bedrooms}+ bed`);
  if (filters.listing_type) bits.push(filters.listing_type === "rent" ? "to rent" : "for sale");
  if (filters.town) bits.push(`in ${filters.town}`);
  if (filters.min_price && filters.max_price)
    bits.push(`£${filters.min_price.toLocaleString()}–£${filters.max_price.toLocaleString()}`);
  else if (filters.max_price) bits.push(`under £${filters.max_price.toLocaleString()}`);
  else if (filters.min_price) bits.push(`over £${filters.min_price.toLocaleString()}`);
  if (filters.min_completeness) bits.push(`${filters.min_completeness}%+ disclosed`);
  return bits.length ? bits.join(", ") : "Any property";
}

export default async function SavedSearchesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null; // middleware redirects; this is a defensive fallback

  const { data: searches } = await supabase
    .from("saved_searches")
    .select("id, name, filters, alert_enabled, alert_frequency, last_alerted_at, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const rows = searches ?? [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-display-sm font-display text-obsidian mb-2">Saved searches</h1>
        <p className="text-body-md text-muted max-w-2xl leading-relaxed">
          We watch these for you. When something new matches, you hear about it before it
          reaches the mass-market portals.
        </p>
      </div>

      <div className="bg-warm border border-border/60 px-5 py-4 flex items-start gap-3">
        <Bell className="w-4 h-4 text-forest mt-0.5 shrink-0" strokeWidth={1.5} />
        <p className="text-body-sm text-muted leading-relaxed">
          <strong className="text-obsidian">Alerts are not sending yet.</strong> Your
          preferences below are saved, but email delivery needs the Resend integration
          configured. Nothing is lost in the meantime.
        </p>
      </div>

      {rows.length === 0 ? (
        <div className="bg-white p-16 border border-border text-center">
          <div className="w-16 h-16 bg-warm rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="w-8 h-8 text-subtle" strokeWidth={1.5} />
          </div>
          <h3 className="text-body-lg font-display text-obsidian mb-2">No saved searches yet</h3>
          <p className="text-body-sm text-muted mb-8 max-w-md mx-auto leading-relaxed">
            Run a search, then save it. We will keep watching it so you do not have to keep
            checking back.
          </p>
          <Button variant="primary" href="/search">
            <Search className="w-4 h-4 mr-2" /> Start searching
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {rows.map((s) => (
            <SearchRow
              key={s.id}
              id={s.id}
              name={s.name}
              summary={describeFilters((s.filters ?? {}) as Filters)}
              alertEnabled={s.alert_enabled}
              alertFrequency={s.alert_frequency}
              lastAlertedAt={s.last_alerted_at}
            />
          ))}
        </div>
      )}
    </div>
  );
}
