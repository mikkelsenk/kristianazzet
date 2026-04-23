globalThis.process ??= {}; globalThis.process.env ??= {};
export { renderers } from '../../renderers.mjs';

const prerender = false;
const POST = async ({ request, locals }) => {
  try {
    const data = await request.json();
    if (!data.email || !data.firstName) {
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
    const mailerliteApiKey = env.MAILERLITE_API_KEY || undefined                                  ;
    const mailerliteGroupId = env.MAILERLITE_GROUP_ID || undefined                                   ;
    if (mailerliteApiKey) {
      const response = await fetch("https://connect.mailerlite.com/api/subscribers", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${mailerliteApiKey}`,
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          email: data.email,
          fields: {
            name: data.firstName,
            last_name: data.lastName || ""
          },
          groups: mailerliteGroupId ? [mailerliteGroupId] : []
        })
      });
      if (!response.ok) {
        const errText = await response.text();
        console.error("MailerLite error:", errText);
        return new Response(
          JSON.stringify({ error: "Subscribe failed" }),
          { status: 500, headers: { "Content-Type": "application/json" } }
        );
      }
    } else {
      console.log("Newsletter signup (no API key configured):", data);
    }
    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Newsletter API error:", error);
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
