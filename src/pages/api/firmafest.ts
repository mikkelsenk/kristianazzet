import type { APIRoute } from 'astro';

export const prerender = false;

interface FirmafestPayload {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  eventDate?: string;
  guests?: string;
  venue?: string;
  message?: string;
}

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const data = await request.json() as FirmafestPayload;

    // Basic validation
    if (!data.name || !data.email || !data.phone || !data.eventDate || !data.guests) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Honeypot / rate limiting could be added here

    // Get env vars (Cloudflare Pages injects via locals.runtime.env)
    const env = (locals as any)?.runtime?.env ?? {};
    const resendApiKey = env.RESEND_API_KEY || import.meta.env.RESEND_API_KEY;
    const notificationEmail = env.NOTIFICATION_EMAIL || import.meta.env.NOTIFICATION_EMAIL || 'kristian@kristianazzet.com';

    // Compose email
    const emailBody = `
Ny firmafest-forespørgsel fra kristianazzet.com/firmafest

NAVN: ${data.name}
FIRMA: ${data.company || '-'}
EMAIL: ${data.email}
TELEFON: ${data.phone}

EVENT DATO: ${data.eventDate}
ANTAL GÆSTER: ${data.guests}
LOKALE: ${data.venue || '-'}

BESKED:
${data.message || '(ingen besked)'}

---
Modtaget: ${new Date().toISOString()}
    `.trim();

    // Send via Resend (https://resend.com)
    if (resendApiKey) {
      const resendResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Firmafest Lead <leads@kristianazzet.com>',
          to: [notificationEmail],
          reply_to: data.email,
          subject: `Firmafest lead: ${data.name} / ${data.company || 'privat'} / ${data.eventDate}`,
          text: emailBody,
        }),
      });

      if (!resendResponse.ok) {
        const errText = await resendResponse.text();
        console.error('Resend error:', errText);
        return new Response(
          JSON.stringify({ error: 'Email send failed' }),
          { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
      }
    } else {
      // Dev mode - log til konsol
      console.log('Firmafest lead (no API key configured):', data);
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Firmafest API error:', error);
    return new Response(
      JSON.stringify({ error: 'Server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
