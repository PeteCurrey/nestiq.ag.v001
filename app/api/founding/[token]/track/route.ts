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
    const { scroll_depth, time_on_page } = body;
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    const supabase = await createClient();
    
    // Fetch current logs and state
    const { data: recipient, error: fetchError } = await supabase
      .from('founding_recipients')
      .select('view_log, state')
      .eq('token', token)
      .single();

    if (fetchError || !recipient) {
      return NextResponse.json({ error: 'Recipient not found' }, { status: 404 });
    }

    const currentLogs = Array.isArray(recipient.view_log) ? recipient.view_log : [];
    
    const newLog = {
      ts: new Date().toISOString(),
      ip_hash: ip, // Usually you'd hash this, but simplified for MVP
      user_agent: userAgent,
      scroll_depth: scroll_depth || 0,
      time_on_page: time_on_page || 0
    };

    const newState = recipient.state === 'unclaimed' ? 'viewed' : recipient.state;

    const { error: updateError } = await supabase
      .from('founding_recipients')
      .update({
        view_log: [...currentLogs, newLog],
        state: newState
      })
      .eq('token', token);

    if (updateError) throw updateError;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Tracking Error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
