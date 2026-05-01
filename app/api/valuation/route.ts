import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: Request) {
  try {
    const supabase = await createClient()
    const { postcode, bedrooms, property_type } = await req.json()

    // 1. Query comparable sold properties
    // In a real scenario, this would use a stored procedure or complex SQL for radius search
    const { data: comparables, error } = await supabase
      .from('properties')
      .select('*')
      .eq('status', 'sold')
      .eq('bedrooms', bedrooms)
      .eq('property_type', property_type)
      .ilike('postcode', `${postcode}%`) // Simplified local search
      .limit(20)

    if (error) throw error

    if (!comparables || comparables.length === 0) {
      return NextResponse.json({ 
        estimate: null, 
        confidence: 'low',
        message: 'Insufficient data for this area' 
      })
    }

    // 2. Weight by recency
    const now = new Date()
    let totalWeightedPrice = 0
    let totalWeight = 0

    comparables.forEach(prop => {
      const soldDate = new Date(prop.published_at || prop.updated_at)
      const diffMonths = (now.getTime() - soldDate.getTime()) / (1000 * 60 * 60 * 24 * 30)
      
      let weight = 0.8
      if (diffMonths <= 3) weight = 1.0
      else if (diffMonths <= 6) weight = 0.9

      totalWeightedPrice += prop.price * weight
      totalWeight += weight
    })

    const estimate = Math.round(totalWeightedPrice / totalWeight)
    const range_low = Math.round(estimate * 0.85)
    const range_high = Math.round(estimate * 1.15)

    return NextResponse.json({
      estimate,
      range_low,
      range_high,
      comparables_count: comparables.length,
      confidence: comparables.length > 5 ? 'high' : 'medium'
    })
  } catch (error) {
    console.error('Valuation Error:', error)
    return NextResponse.json({ error: 'Failed to calculate valuation' }, { status: 500 })
  }
}
