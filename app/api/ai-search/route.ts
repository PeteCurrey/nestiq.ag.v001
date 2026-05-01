import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || "",
});

export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json();

    if (!query) {
      return NextResponse.json({ error: "Missing query" }, { status: 400 });
    }

    // This is a placeholder for the real AI parsing logic
    // In a real scenario, we'd use Claude to extract structured filters
    console.log(`AI Search Query: ${query}`);

    // Simulate structured response
    const mockFilters = {
      location: "Chesterfield",
      minPrice: 0,
      maxPrice: 300000,
      bedrooms: 3,
      propertyType: "house",
      listingType: "sale"
    };

    return NextResponse.json({ filters: mockFilters });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
