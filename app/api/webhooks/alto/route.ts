import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const signature = req.headers.get("x-alto-signature");
  
  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 401 });
  }

  // Verify signature logic...
  
  const payload = await req.json();
  const { eventType, propertyId } = payload;

  console.log(`Received Alto webhook: ${eventType} for property ${propertyId}`);

  // On create/update: upsert single property
  // On delete: set status = 'withdrawn'

  return NextResponse.json({ received: true });
}
