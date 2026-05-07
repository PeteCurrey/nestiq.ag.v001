import { Resend } from 'resend';

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    // Basic validation
    if (!name || !email || !message) {
      return Response.json(
        { error: 'Name, email and message are required' },
        { status: 400 }
      );
    }

    // Send via Resend if key available
    if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== 'mock_key') {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
          to: 'hello@nestiq.co.uk',
          replyTo: email,
          subject: `Nestiq contact form: ${subject}`,
          text: `From: ${name} (${email})\n\nSubject: ${subject}\n\nMessage:\n${message}`,
        });
      } catch (emailError) {
        console.error('Resend error:', emailError);
        // Fail gracefully - still return success to the user but log the error
      }
    } else {
      console.log('Mock email send (RESEND_API_KEY not set):', { name, email, subject, message });
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error('API Contact error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
