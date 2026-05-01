import Anthropic from '@anthropic-ai/sdk'
import { NextResponse } from 'next/server'

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || 'mock_key',
})

export async function POST(req: Request) {
  try {
    const data = await req.json()

    const prompt = `You are an expert UK estate agent copywriter. Write a compelling, 
compliant property listing description based on the following details.

PROPERTY DATA:
Type: ${data.propertyType}
Listing: ${data.listingType}
Bedrooms: ${data.bedrooms}
Bathrooms: ${data.bathrooms}
Reception rooms: ${data.receptionRooms}
Size: ${data.sqft ? data.sqft + ' sq ft' : 'Not specified'}
Address area: ${data.town}, ${data.county}
Key features: ${data.features?.join(', ') || 'None specified'}
Garden: ${data.garden}
Parking: ${data.parking?.join(', ') || 'None'}
EPC rating: ${data.epcRating || 'Not specified'}
Council tax band: ${data.councilTaxBand || 'Not specified'}
Year built: ${data.yearBuilt || 'Not specified'}

REQUIREMENTS:
- 150–250 words
- Warm, professional tone — not stiff, not salesy
- Lead with the most compelling selling point
- Include location context and lifestyle benefits
- Reference key features naturally within prose
- Do NOT use: unique, rare, stunning, immaculate, prestigious, luxury (unless genuinely warranted)
- Do NOT make unverifiable claims about schools, crime, or transport
- End with: 'Contact [Agency Name] to arrange your viewing'
- Comply with UK Consumer Protection from Unfair Trading Regulations 2008

Output only the description text. No preamble, no labels.`

    const message = await client.messages.create({
      model: 'claude-3-5-sonnet-20240620',
      max_tokens: 600,
      messages: [{ role: 'user', content: prompt }]
    })

    const description = message.content[0].type === 'text'
      ? message.content[0].text.trim()
      : ''

    return NextResponse.json({ description })
  } catch (error) {
    console.error('AI Description Error:', error)
    return NextResponse.json({ error: 'Failed to generate description' }, { status: 500 })
  }
}
