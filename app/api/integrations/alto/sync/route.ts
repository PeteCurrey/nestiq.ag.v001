import { NextRequest, NextResponse } from "next/server";
import { fetchAltoProperties, normaliseAltoProperty } from "@/lib/integrations/alto";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || ""
);

export async function POST(req: NextRequest) {
  try {
    const { apiKey, agencyId, agencyName } = await req.json();

    if (!apiKey || !agencyId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const properties = await fetchAltoProperties(apiKey);
    let synced = 0;
    let errors = 0;

    for (const p of properties) {
      try {
        const normalised = normaliseAltoProperty(p, agencyId, agencyName);
        const photos = normalised._photos || [];
        delete normalised._photos;

        // Upsert property
        const { data: propData, error: propError } = await supabaseAdmin
          .from('properties')
          .upsert(normalised, { onConflict: 'external_id', ignoreDuplicates: false })
          .select('id')
          .single();

        if (propError) throw propError;

        const propertyId = propData.id;

        // Update images: delete old, insert new
        await supabaseAdmin.from('property_images').delete().eq('property_id', propertyId);
        
        if (photos.length > 0) {
          const imageRows = photos.map((photo: any, index: number) => ({
            property_id: propertyId,
            url: photo.url,
            alt_text: photo.caption || null,
            sort_order: index
          }));
          await supabaseAdmin.from('property_images').insert(imageRows);
        }

        synced++;
      } catch (err: any) {
        console.error(`Error syncing property ${p.id}:`, err);
        errors++;
      }
    }

    // Update alto_last_sync on agency
    await supabaseAdmin
      .from('agencies')
      .update({ alto_last_sync: new Date().toISOString() })
      .eq('id', agencyId);

    // Write sync log
    await supabaseAdmin
      .from('sync_logs')
      .insert({
        agency_id: agencyId,
        provider: 'alto',
        synced_count: synced,
        updated_count: synced,
        error_count: errors
      });

    return NextResponse.json({
      synced,
      updated: synced,
      errors
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
