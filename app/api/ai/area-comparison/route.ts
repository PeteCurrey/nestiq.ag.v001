import Anthropic from '@anthropic-ai/sdk'
import { NextResponse } from 'next/server'

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || 'mock_key',
})

export async function POST(req: Request) {
  try {
    const data = await req.json()

    const prompt = `You are a knowledgeable UK local property expert. The user wants to compare two areas for living or investing.
    
AREAS TO COMPARE:
Area 1: ${data.area1}
Area 2: ${data.area2}

TASK:
Write a comparative analysis of these two areas.
Provide a structured response using markdown:

### Market & Pricing
Compare typical property prices, value for money, and the types of housing stock available in both areas.

### Lifestyle & Amenities
Compare the high streets, local parks, restaurants, and general "vibe" of both locations.

### Transport & Connectivity
Compare public transport links, road access, and commuting potential.

### Verdict
Provide a brief summary of who each area is best suited for (e.g., "Area 1 is better for young families, while Area 2 suits commuting professionals").

REQUIREMENTS:
- Be objective and balanced.
- Use your general knowledge of UK geography and property markets.
- If an area is extremely obscure or you don't know it well, provide the best general assessment possible based on its wider region.`

    const message = await client.messages.create({
      model: 'claude-3-5-sonnet-20240620',
      max_tokens: 800,
      messages: [{ role: 'user', content: prompt }]
    })

    const comparison = message.content[0].type === 'text'
      ? message.content[0].text.trim()
      : 'Failed to generate comparison.'

    return NextResponse.json({ comparison })
  } catch (error) {
    console.error('AI Area Comparison Error:', error)
    return NextResponse.json({ error: 'Failed to generate comparison' }, { status: 500 })
  }
}
