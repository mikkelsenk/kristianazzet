globalThis.process ??= {}; globalThis.process.env ??= {};
export { renderers } from '../../renderers.mjs';

const prerender = false;
const POST = async ({ request, locals }) => {
  try {
    const data = await request.json();
    if (!data.name || !data.email || !data.phone || !data.eventDate || !data.guests) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const env = locals?.runtime?.env ?? {};
    const resendApiKey = env.RESEND_API_KEY || undefined                              ;
    const notificationEmail = env.NOTIFICATION_EMAIL || undefined                                   || "kristian@kristianazzet.com";
    const emailBody = `
Ny firmafest-forespørgsel fra kristianazzet.com/firmafest

NAVN: ${data.name}
FIRMA: ${data.company || "-"}
EMAIL: ${data.email}
TELEFON: ${data.phone}

EVENT DATO: ${data.eventDate}
ANTAL GÆSTER: ${data.guests}
LOKALE: ${data.venue || "-"}

BESKED:
${data.message || "(ingen besked)"}

---
Modtaget: ${(/* @__PURE__ */ new Date()).toISOString()}
    `.trim();
    if (resendApiKey) {
      const resendResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${resendApiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          from: "Firmafest Lead <leads@kristianazzet.com>",
          to: [notificationEmail],
          reply_to: data.email,
          subject: `Firmafest lead: ${data.name} / ${data.company || "privat"} / ${data.eventDate}`,
          text: emailBody
        })
      });
      if (!resendResponse.ok) {
        const errText = await resendResponse.text();
        console.error("Resend error:", errText);
        return new Response(
          JSON.stringify({ error: "Email send failed" }),
          { status: 500, headers: { "Content-Type": "application/json" } }
        );
      }
    } else {
      console.log("Firmafest lead (no API key configured):", data);
    }
    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Firmafest API error:", error);
    return new Response(
      JSON.stringify({ error: "Server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
