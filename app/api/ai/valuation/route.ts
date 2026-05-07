import Anthropic from '@anthropic-ai/sdk'
import { NextResponse } from 'next/server'

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || 'mock_key',
})

export async function POST(req: Request) {
  try {
    const data = await req.json()

    const prompt = `You are an expert UK property analyst and RICS surveyor. The user is requesting an indicative valuation for a residential property.
    
PROPERTY DATA:
Postcode/Area: ${data.postcode}
Property Type: ${data.propertyType}
Bedrooms: ${data.bedrooms}
Bathrooms: ${data.bathrooms}
Condition: ${data.condition}
Garden: ${data.garden ? 'Yes' : 'No'}
Parking: ${data.parking ? 'Yes' : 'No'}

TASK:
Write a 3-paragraph indicative valuation report.
1. Start with a clear, estimated price range (e.g. £250,000 - £275,000). Base this on general market knowledge of the area and property type in the UK.
2. In the second paragraph, explain the positive factors (e.g., condition, parking) and any local market trends you know about the area.
3. In the third paragraph, explain the limitations of an algorithmic valuation and recommend they speak to a local independent estate agent for a precise market appraisal.

REQUIREMENTS:
- Do NOT hallucinate specific recent sales. Speak in general terms for the area.
- Tone should be professional, objective, and helpful.
- Output ONLY the text of the report. Use markdown for the estimated price range (make it bold).`

    const message = await client.messages.create({
      model: 'claude-3-5-sonnet-20240620',
      max_tokens: 600,
      messages: [{ role: 'user', content: prompt }]
    })

    const report = message.content[0].type === 'text'
      ? message.content[0].text.trim()
      : 'Failed to generate report.'

    return NextResponse.json({ report })
  } catch (error) {
    console.error('AI Valuation Error:', error)
    return NextResponse.json({ error: 'Failed to generate valuation' }, { status: 500 })
  }
}
