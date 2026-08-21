import { createClient as createSupabaseClient, SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/database";

/**
 * Service-role Supabase client. Bypasses RLS — server-only, never import
 * this into a client component.
 *
 * Created lazily and cached. Building it at module scope crashes `next build`
 * during page-data collection, because route modules are evaluated in an
 * environment that has no secrets.
 */
let cached: SupabaseClient<Database> | null = null;

export function createAdminClient(): SupabaseClient<Database> {
  if (cached) return cached;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error(
      "Supabase admin client needs NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY. Copy .env.example to .env.local and fill them in."
    );
  }

  cached = createSupabaseClient<Database>(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  return cached;
}
