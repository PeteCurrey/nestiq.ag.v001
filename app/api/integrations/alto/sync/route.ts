import { NextRequest, NextResponse } from "next/server";
import { fetchAltoProperties, normaliseAltoProperty } from "@/lib/integrations/alto";

export async function POST(req: NextRequest) {
  try {
    const { apiKey, agencyId, agencyName } = await req.json();

    if (!apiKey || !agencyId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const properties = await fetchAltoProperties(apiKey);
    const normalised = properties.map(p => normaliseAltoProperty(p, agencyId, agencyName));

    // Here we would upsert to Supabase
    // const { count, error } = await supabase.from('properties').upsert(normalised)

    return NextResponse.json({
      synced: normalised.length,
      updated: normalised.length, // Simplified
      errors: []
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
