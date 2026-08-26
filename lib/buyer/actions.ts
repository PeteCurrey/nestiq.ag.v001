"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

/**
 * Buyer account mutations.
 *
 * Every action re-reads the session server-side rather than trusting an id
 * passed from the client, and RLS is the second line: collections,
 * saved_properties, saved_searches and property_views are all scoped to
 * auth.uid() by policy, so a forged id fails at the database too.
 */

async function requireUser() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("You need to be signed in to do that.");
  return { supabase, user };
}

/** The user's default shortlist, created by trigger on signup. */
async function defaultCollectionId(
  supabase: Awaited<ReturnType<typeof createClient>>,
  userId: string
): Promise<string | null> {
  const { data } = await supabase
    .from("collections").select("id")
    .eq("user_id", userId).eq("is_default", true).maybeSingle();
  if (data) return data.id;

  // Profiles created before 0008 have no default collection yet.
  const { data: created } = await supabase
    .from("collections")
    .insert({ user_id: userId, name: "My shortlist", is_default: true })
    .select("id").single();
  return created?.id ?? null;
}

export async function saveProperty(propertyId: string, collectionId?: string) {
  const { supabase, user } = await requireUser();

  const { data: property } = await supabase
    .from("properties").select("price").eq("id", propertyId).single();

  const target = collectionId ?? (await defaultCollectionId(supabase, user.id));

  const { error } = await supabase.from("saved_properties").upsert(
    {
      user_id: user.id,
      property_id: propertyId,
      collection_id: target,
      price_at_save: property?.price ?? null,
    },
    { onConflict: "user_id,property_id" }
  );
  if (error) throw new Error(error.message);

  revalidatePath("/account/saved");
  return { saved: true };
}

export async function unsaveProperty(propertyId: string) {
  const { supabase, user } = await requireUser();
  const { error } = await supabase
    .from("saved_properties").delete()
    .eq("user_id", user.id).eq("property_id", propertyId);
  if (error) throw new Error(error.message);

  revalidatePath("/account/saved");
  return { saved: false };
}

export async function toggleSaveProperty(propertyId: string) {
  const { supabase, user } = await requireUser();
  const { data: existing } = await supabase
    .from("saved_properties").select("id")
    .eq("user_id", user.id).eq("property_id", propertyId).maybeSingle();

  return existing ? unsaveProperty(propertyId) : saveProperty(propertyId);
}

export async function updateSavedNote(propertyId: string, notes: string) {
  const { supabase, user } = await requireUser();
  const { error } = await supabase
    .from("saved_properties")
    .update({ notes: notes.trim() || null })
    .eq("user_id", user.id).eq("property_id", propertyId);
  if (error) throw new Error(error.message);
  revalidatePath("/account/saved");
}

export async function moveToCollection(propertyId: string, collectionId: string | null) {
  const { supabase, user } = await requireUser();
  const { error } = await supabase
    .from("saved_properties").update({ collection_id: collectionId })
    .eq("user_id", user.id).eq("property_id", propertyId);
  if (error) throw new Error(error.message);
  revalidatePath("/account/saved");
}

export async function createCollection(name: string, description?: string) {
  const { supabase, user } = await requireUser();
  const trimmed = name.trim();
  if (!trimmed) throw new Error("Give the shortlist a name.");

  const { data, error } = await supabase
    .from("collections")
    .insert({ user_id: user.id, name: trimmed, description: description?.trim() || null })
    .select("id, name").single();
  if (error) throw new Error(error.message);

  revalidatePath("/account/saved");
  return data;
}

export async function deleteCollection(collectionId: string) {
  const { supabase, user } = await requireUser();
  // Saved properties survive; collection_id is ON DELETE SET NULL.
  const { error } = await supabase
    .from("collections").delete()
    .eq("id", collectionId).eq("user_id", user.id).eq("is_default", false);
  if (error) throw new Error(error.message);
  revalidatePath("/account/saved");
}

// --- Saved searches ---------------------------------------------------------

export type SearchFilters = {
  q?: string;
  town?: string;
  listing_type?: "sale" | "rent";
  min_price?: number;
  max_price?: number;
  min_bedrooms?: number;
  property_type?: string;
  min_completeness?: number;
};

export async function createSavedSearch(
  name: string,
  filters: SearchFilters,
  alertFrequency: "instant" | "daily" | "weekly" = "instant"
) {
  const { supabase, user } = await requireUser();
  const trimmed = name.trim();
  if (!trimmed) throw new Error("Give the search a name.");

  const { data, error } = await supabase
    .from("saved_searches")
    .insert({
      user_id: user.id,
      name: trimmed,
      filters,
      alert_enabled: true,
      alert_frequency: alertFrequency,
    })
    .select("id").single();
  if (error) throw new Error(error.message);

  revalidatePath("/account/searches");
  return data;
}

export async function updateSearchAlert(
  searchId: string,
  alertEnabled: boolean,
  alertFrequency?: "instant" | "daily" | "weekly"
) {
  const { supabase, user } = await requireUser();
  const patch = alertFrequency
    ? { alert_enabled: alertEnabled, alert_frequency: alertFrequency }
    : { alert_enabled: alertEnabled };

  const { error } = await supabase
    .from("saved_searches").update(patch)
    .eq("id", searchId).eq("user_id", user.id);
  if (error) throw new Error(error.message);
  revalidatePath("/account/searches");
}

export async function deleteSavedSearch(searchId: string) {
  const { supabase, user } = await requireUser();
  const { error } = await supabase
    .from("saved_searches").delete()
    .eq("id", searchId).eq("user_id", user.id);
  if (error) throw new Error(error.message);
  revalidatePath("/account/searches");
}

// --- Readiness profile ------------------------------------------------------

export type ReadinessInput = {
  buyer_position?: string | null;
  mortgage_status?: string | null;
  budget_min?: number | null;
  budget_max?: number | null;
  deposit_available?: number | null;
  min_bedrooms?: number | null;
  moving_timescale?: string | null;
  preferred_areas?: string[] | null;
  phone?: string | null;
};

export async function updateReadiness(input: ReadinessInput) {
  const { supabase, user } = await requireUser();
  const { error } = await supabase
    .from("profiles")
    .update({ ...input, readiness_updated_at: new Date().toISOString() } as never)
    .eq("id", user.id);
  if (error) throw new Error(error.message);

  revalidatePath("/account/profile");
}

// --- Recently viewed --------------------------------------------------------

export async function recordPropertyView(propertyId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return; // Anonymous browsing is not tracked here.

  await supabase.from("property_views").upsert(
    { user_id: user.id, property_id: propertyId, viewed_at: new Date().toISOString() },
    { onConflict: "user_id,property_id" }
  );
}
