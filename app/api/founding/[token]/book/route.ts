import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request, { params }: { params: Promise<{ token: string }> }) {
  const resolvedParams = await params;
  const token = resolvedParams.token;
  
  if (!token || token.length !== 8) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 400 });
  }

  try {
    const body = await request.json();
    const { start_time, visit_type } = body;

    if (!start_time || !['zoom', 'in_person'].includes(visit_type)) {
      return NextResponse.json({ error: 'Invalid booking data' }, { status: 400 });
    }

    const supabase = await createClient();
    
    // 1. Check if recipient exists
    const { data: recipient, error: fetchError } = await supabase
      .from('founding_recipients')
      .select('booking_id, state')
      .eq('token', token)
      .single();

    if (fetchError || !recipient) {
      return NextResponse.json({ error: 'Recipient not found' }, { status: 404 });
    }

    // Insert booking
    const { data: booking, error: bookingError } = await supabase
      .from('bookings')
      .insert({
        recipient_token: token,
        start_time,
        visit_type,
        status: 'scheduled'
      })
      .select()
      .single();

    if (bookingError) throw bookingError;

    // Update recipient state
    const { error: updateError } = await supabase
      .from('founding_recipients')
      .update({
        booking_id: booking.id,
        state: 'booked'
      })
      .eq('token', token);

    if (updateError) throw updateError;

    // TODO: Send Slack notification
    // TODO: Send Confirmation Email via Resend

    return NextResponse.json({ success: true, booking });
  } catch (err) {
    console.error('Booking Error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
