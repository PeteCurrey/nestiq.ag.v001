import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@/lib/supabase/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'mock_key', {
  apiVersion: '2024-04-10' as any,
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: Request) {
  const body = await req.text()
  const signature = (await headers()).get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
  }

  const supabase = await createClient()

  switch (event.type) {
    case 'customer.subscription.created':
    case 'customer.subscription.updated': {
      const subscription = event.data.object as Stripe.Subscription
      const customerId = subscription.customer as string
      
      // Map plan to tier (simplified)
      const planId = subscription.items.data[0].plan.id
      let tier = 'starter'
      if (planId.includes('pro')) tier = 'pro'
      else if (planId.includes('growth')) tier = 'growth'

      await supabase
        .from('agencies')
        .update({
          stripe_subscription_id: subscription.id,
          subscription_status: subscription.status,
          plan_tier: tier as any
        })
        .eq('stripe_customer_id', customerId)
      break
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription
      await supabase
        .from('agencies')
        .update({
          subscription_status: 'cancelled',
          plan_tier: 'starter' // Default back
        })
        .eq('stripe_subscription_id', subscription.id)
      break
    }

    case 'invoice.payment_failed': {
      const invoice = event.data.object as Stripe.Invoice
      // Trigger dunning email via Resend here
      break
    }
  }

  return NextResponse.json({ received: true })
}
