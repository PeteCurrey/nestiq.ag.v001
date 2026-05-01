import Anthropic from '@anthropic-ai/sdk'
import { NextResponse } from 'next/server'

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || 'mock_key',
})

const SEARCH_SYSTEM_PROMPT = `You are a UK property search assistant. 
Extract search parameters from the user's natural language query.

Return ONLY valid JSON with this exact structure:
{
  "listing_type": "sale" | "rent" | null,
  "location": string | null,
  "location_type": "city" | "town" | "postcode" | "area" | null,
  "price_max": number | null,
  "price_min": number | null,
  "bedrooms_min": number | null,
  "bedrooms_max": number | null,
  "property_types": string[] | null,
  "features": string[] | null,
  "radius_miles": number | null,
  "keywords": string | null
}

UK-specific rules:
- Prices: £280k = 280000, £1.2m = 1200000
- "near good schools" → features: ["near schools"]  
- "south facing" → features: ["south-facing garden"]
- "pet friendly" → features: ["pets_allowed"] (rental only)
- If listing_type unclear, default to "sale"
- Location must be a real UK place`

function buildInterpretation(filters: any): string {
  const parts = [];
  if (filters.bedrooms_min) parts.push(`${filters.bedrooms_min}+ beds`);
  if (filters.property_types?.length) parts.push(filters.property_types.join(' or '));
  if (filters.location) parts.push(`in ${filters.location}`);
  if (filters.price_max) parts.push(`under £${filters.price_max.toLocaleString()}`);
  return parts.length > 0 ? `Searching for ${parts.join(' ')}` : 'Searching all properties';
}

export async function POST(req: Request) {
  try {
    const { prompt, page = 1 } = await req.json()

    const message = await client.messages.create({
      model: 'claude-3-5-sonnet-20240620',
      max_tokens: 300,
      system: SEARCH_SYSTEM_PROMPT,
      messages: [{ role: 'user', content: prompt }]
    })

    const text = message.content[0].type === 'text' ? message.content[0].text : '{}'
    const filters = JSON.parse(text.replace(/```json|```/g, '').trim())

    // In a real app, you would execute Algolia search here
    // For now, we return the parsed filters and interpretation

    return NextResponse.json({ 
      filters, 
      interpretation: buildInterpretation(filters) 
    })
  } catch (error) {
    console.error('AI Search Error:', error)
    return NextResponse.json({ error: 'Failed to parse search query' }, { status: 500 })
  }
}
