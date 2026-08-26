import { createClient } from "@/lib/supabase/server";
import { AccountSidebar } from "@/components/account/AccountSidebar";

export const dynamic = "force-dynamic";

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: profile } = user
    ? await supabase
        .from("profiles")
        .select("full_name, readiness_score, created_at")
        .eq("id", user.id)
        .single()
    : { data: null };

  return (
    <div className="bg-pearl min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row gap-12">
        <AccountSidebar
          name={profile?.full_name ?? user?.email?.split("@")[0] ?? "Your account"}
          email={user?.email ?? null}
          memberSince={profile?.created_at ?? null}
          readinessScore={profile?.readiness_score ?? null}
        />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
