import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(req: Request) {
  const authHeader = req.headers.get('Authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 })
  }

  try {
    const supabase = await createClient()

    // Process leads in batches
    const { data: contacts, error } = await supabase
      .from('contacts')
      .select('*')

    if (error) throw error

    const updates = contacts.map(contact => {
      // 1. Recency: days since last activity
      const lastActivity = new Date(contact.last_activity_at || contact.created_at)
      const daysSince = (new Date().getTime() - lastActivity.getTime()) / (1000 * 60 * 60 * 24)
      const recencyScore = Math.max(0, 10 - (daysSince / 7))

      // 2. Intent: do they have preferences set?
      const intentScore = (contact.budget_max ? 3 : 0) + (contact.preferred_areas?.length ? 2 : 0)

      // 3. Normalized lead score (1-10)
      const finalScore = Math.min(10, Math.ceil((recencyScore + intentScore) / 1.3))

      return {
        id: contact.id,
        lead_score: finalScore
      }
    })

    // Bulk update (simplified)
    for (const update of updates) {
      await supabase
        .from('contacts')
        .update({ lead_score: update.lead_score })
        .eq('id', update.id)
    }

    return NextResponse.json({ success: true, updated_leads: updates.length })
  } catch (error) {
    console.error('Lead Score Cron Error:', error)
    return NextResponse.json({ error: 'Failed to update lead scores' }, { status: 500 })
  }
}
