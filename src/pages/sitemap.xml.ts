import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async ({ site }) => {
  const baseUrl = site?.toString().replace(/\/$/, '') || 'https://kristianazzet.com';

  const pages = [
    { path: '', priority: '1.0', changefreq: 'weekly' },
    { path: 'shows', priority: '0.9', changefreq: 'weekly' },
    { path: 'music', priority: '0.8', changefreq: 'monthly' },
    { path: 'contact', priority: '0.8', changefreq: 'monthly' },
    { path: 'firmafest', priority: '0.6', changefreq: 'monthly' },
    { path: 'terms', priority: '0.3', changefreq: 'yearly' },
    { path: 'privacy', priority: '0.3', changefreq: 'yearly' },
    { path: 'cookies', priority: '0.3', changefreq: 'yearly' },
  ];

  const urlEntries = pages.map(({ path, priority, changefreq }) => `
    <url>
      <loc>${baseUrl}/${path}</loc>
      <changefreq>${changefreq}</changefreq>
      <priority>${priority}</priority>
      <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    </url>`).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urlEntries}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
