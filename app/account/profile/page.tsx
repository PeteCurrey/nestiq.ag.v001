import { createClient } from "@/lib/supabase/server";
import { ReadinessForm } from "./_ReadinessForm";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null; // middleware redirects; defensive fallback

  const { data: profile } = await supabase
    .from("profiles")
    .select(`
      full_name, phone, buyer_position, mortgage_status,
      budget_min, budget_max, deposit_available, min_bedrooms,
      moving_timescale, preferred_areas, id_verified,
      readiness_score, readiness_updated_at
    `)
    .eq("id", user.id)
    .single();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-display-sm font-display text-obsidian mb-2">Your buying position</h1>
        <p className="text-body-md text-muted max-w-2xl leading-relaxed">
          Agents receive far more enquiries than they can chase properly. Telling them where
          you actually stand puts you at the front of that queue &mdash; and unlocks early
          access to listings before they reach the mass-market portals.
        </p>
      </div>

      <ReadinessForm
        initial={{
          phone: profile?.phone ?? null,
          buyer_position: profile?.buyer_position ?? null,
          mortgage_status: profile?.mortgage_status ?? null,
          budget_min: profile?.budget_min ?? null,
          budget_max: profile?.budget_max ?? null,
          deposit_available: profile?.deposit_available ?? null,
          min_bedrooms: profile?.min_bedrooms ?? null,
          moving_timescale: profile?.moving_timescale ?? null,
        }}
        score={profile?.readiness_score ?? 0}
        idVerified={profile?.id_verified ?? false}
      />
    </div>
  );
}
