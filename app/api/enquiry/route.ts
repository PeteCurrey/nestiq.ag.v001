import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { Resend } from 'resend'
import { z } from 'zod'

const resend = new Resend(process.env.RESEND_API_KEY)

const enquirySchema = z.object({
  propertyId: z.string().uuid(),
  agencyId: z.string().uuid(),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(10),
  preferredContact: z.enum(['any', 'morning', 'afternoon', 'evening']).default('any'),
  address: z.string() // For email context
})

export async function POST(req: Request) {
  try {
    const supabase = await createClient()
    const body = await req.json()
    const validated = enquirySchema.parse(body)

    // 1. Store in Supabase
    const { data: enquiry, error: dbError } = await supabase
      .from('enquiries')
      .insert({
        property_id: validated.propertyId,
        agency_id: validated.agencyId,
        name: validated.name,
        email: validated.email,
        phone: validated.phone,
        message: validated.message,
        preferred_contact: validated.preferredContact,
        status: 'new',
        source: 'listing_page'
      })
      .select()
      .single()

    if (dbError) throw dbError

    // 2. Send Email to Agent
    await resend.emails.send({
      from: 'NESTIQ <leads@nestiq.co.uk>',
      to: 'agent@example.com', // In reality, fetch agency email
      reply_to: validated.email,
      subject: `New enquiry for ${validated.address} from ${validated.name}`,
      text: `
        Name: ${validated.name}
        Email: ${validated.email}
        Phone: ${validated.phone || 'Not provided'}
        Message: ${validated.message}
        Preferred Contact: ${validated.preferredContact}
        
        View Lead: https://nestiq.co.uk/agent/leads/${enquiry.id}
      `
    })

    // 3. Send Confirmation to Enquirer
    await resend.emails.send({
      from: 'NESTIQ <hello@nestiq.co.uk>',
      to: validated.email,
      subject: 'Your enquiry has been sent',
      text: `
        Hi ${validated.name},
        
        Your enquiry for ${validated.address} has been sent to the agent.
        They will be in touch shortly.
        
        Property: https://nestiq.co.uk/property/${validated.propertyId}
      `
    })

    return NextResponse.json({ success: true, enquiry_id: enquiry.id })
  } catch (error) {
    console.error('Enquiry Error:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to process enquiry' }, { status: 500 })
  }
}
