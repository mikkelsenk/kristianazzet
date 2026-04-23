import type { APIRoute } from 'astro';

export const prerender = false;

interface NewsletterPayload {
  firstName?: string;
  lastName?: string;
  email?: string;
}

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const data = await request.json() as NewsletterPayload;

    if (!data.email || !data.firstName) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const env = (locals as any)?.runtime?.env ?? {};
    const mailerliteApiKey = env.MAILERLITE_API_KEY || import.meta.env.MAILERLITE_API_KEY;
    const mailerliteGroupId = env.MAILERLITE_GROUP_ID || import.meta.env.MAILERLITE_GROUP_ID;

    if (mailerliteApiKey) {
      // MailerLite subscriber API
      const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${mailerliteApiKey}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          fields: {
            name: data.firstName,
            last_name: data.lastName || '',
          },
          groups: mailerliteGroupId ? [mailerliteGroupId] : [],
        }),
      });

      if (!response.ok) {
        const errText = await response.text();
        console.error('MailerLite error:', errText);
        return new Response(
          JSON.stringify({ error: 'Subscribe failed' }),
          { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
      }
    } else {
      // Dev mode - log til konsol
      console.log('Newsletter signup (no API key configured):', data);
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Newsletter API error:', error);
    return new Response(
      JSON.stringify({ error: 'Server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
