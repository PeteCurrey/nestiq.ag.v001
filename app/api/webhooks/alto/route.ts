import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { normaliseAltoProperty } from "@/lib/integrations/alto";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || ""
);

export async function POST(req: NextRequest) {
  const signature = req.headers.get("x-alto-signature");
  
  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 401 });
  }

  // Verify signature logic would go here
  
  try {
    const payload = await req.json();
    const { eventType, propertyId, branchId } = payload;

    console.log(`Received Alto webhook: ${eventType} for property ${propertyId}`);

    if (!propertyId || !branchId) {
      return NextResponse.json({ error: "Missing propertyId or branchId" }, { status: 400 });
    }

    // Lookup agency by branchId
    const { data: agency } = await supabaseAdmin
      .from('agencies')
      .select('id, name, alto_api_key')
      .eq('alto_branch_id', branchId)
      .single();

    if (!agency) {
      return NextResponse.json({ error: "Unknown branch ID" }, { status: 404 });
    }

    if (eventType === 'property.deleted') {
      await supabaseAdmin
        .from('properties')
        .update({ status: 'withdrawn' })
        .eq('external_id', propertyId)
        .eq('agency_id', agency.id);
        
      return NextResponse.json({ received: true, action: 'withdrawn' });
    }

    if (eventType === 'property.created' || eventType === 'property.updated') {
      // In a real implementation, we would fetch the single property from Alto API
      // const res = await fetch(`https://api.alto-software.com/v1/properties/${propertyId}`, {
      //   headers: { Authorization: `Bearer ${agency.alto_api_key}` }
      // });
      // const p = await res.json();
      
      // For now, we simulate fetching the updated property
      // const normalised = normaliseAltoProperty(p, agency.id, agency.name);
      
      // Upsert logic would go here
      console.log(`Would fetch and upsert property ${propertyId} for agency ${agency.name}`);
      
      return NextResponse.json({ received: true, action: 'upsert_queued' });
    }

    return NextResponse.json({ received: true, action: 'ignored' });
  } catch (error: any) {
    console.error('Webhook processing error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
