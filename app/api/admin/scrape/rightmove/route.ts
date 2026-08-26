import { NextRequest, NextResponse } from "next/server";
import { getJob } from "@/lib/scrapers/jobs";
import { createClient } from "@/lib/supabase/server";

/**
 * Admin-only. Middleware already gates /api/admin/*, but this route triggers
 * outbound crawling, so it re-checks here rather than trusting a single layer.
 *
 * It is additionally disabled unless SEEDING_ENABLED is explicitly set. Seeding
 * is a deliberate, supervised operation against a named branch, not something
 * that should be reachable by accident.
 */

async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { ok: false as const, status: 401, error: "Unauthorised" };

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    return { ok: false as const, status: 403, error: "Forbidden" };
  }
  return { ok: true as const };
}

export async function POST(req: NextRequest) {
  const auth = await requireAdmin();
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  if (process.env.SEEDING_ENABLED !== "true") {
    return NextResponse.json(
      {
        error:
          "Seeding is disabled. Set SEEDING_ENABLED=true to enable it, and only against a branch you intend to seed.",
      },
      { status: 503 }
    );
  }

  const { branchId } = await req.json().catch(() => ({}));

  if (!branchId) {
    return NextResponse.json({ error: "branchId required" }, { status: 400 });
  }

  // The previous implementation is withdrawn: it rehosted source photography
  // into our own storage and wrote to columns that do not exist. Seeding now
  // goes through lib/listings/ingest.ts, which refuses to copy images or
  // descriptions for compiled listings. Wiring the crawler to that path is the
  // next step in Phase 1.
  return NextResponse.json(
    {
      error:
        "The compiled-listing importer is being rebuilt on lib/listings/ingest.ts. Seeding is unavailable until it lands.",
    },
    { status: 501 }
  );
}

export async function GET(req: NextRequest) {
  const auth = await requireAdmin();
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const jobId = req.nextUrl.searchParams.get("jobId");
  if (!jobId) {
    return NextResponse.json({ error: "jobId required" }, { status: 400 });
  }

  const job = getJob(jobId);
  if (!job) {
    return NextResponse.json({ error: "Job not found" }, { status: 404 });
  }
  return NextResponse.json(job);
}
