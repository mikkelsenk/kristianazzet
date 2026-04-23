# kristianazzet.com

Astro + React + Tailwind site deployet på Cloudflare Pages med Sanity CMS til content management.

## Stack

- **Astro 4** — statisk site generator med SSR islands via Cloudflare adapter
- **React** — til interaktive komponenter
- **Tailwind CSS** — styling med brand tokens (Signal Lime, Stone Black, BN Bones, Geomanist)
- **Sanity CMS** — headless CMS til shows og site settings (valgfrit, falder tilbage til JSON)
- **Cloudflare Pages + Workers** — hosting og API endpoints
- **Resend** — transactional email til firmafest leads
- **MailerLite** — newsletter subscribers

## Sider

- `/` — hovedside (hero, upcoming shows, featured video, booking, mailing list)
- `/firmafest` — landing page til Google Ads (noindex, ikke linket fra hovedsiden)

## Kom i gang lokalt

```bash
# Install dependencies
npm install

# Opret .env baseret på template
cp .env.example .env
# Udfyld evt. API keys (alle er valgfri for lokal udvikling)

# Start dev server
npm run dev
# Åbner på http://localhost:4321
```

Uden API keys kører det på placeholder JSON data (`src/data/shows.json`) og logger form submissions til konsollen.

## Content management

### Option A: Rediger JSON (enkelt)

Åbn `src/data/shows.json` og rediger direkte. Push til Git for at deploye.

```json
{
  "id": "5",
  "venue": "Nyt Venue",
  "date": "2025-03-15",
  "city": "Aarhus",
  "country": "Denmark",
  "address": "Adresse her",
  "ticketUrl": "https://tickets.dk/...",
  "status": "upcoming"
}
```

**Status options:** `upcoming`, `soldout`, `private`, `past`, `cancelled`

### Option B: Sanity CMS (fleksibelt)

Når du er klar til at redigere uden at rode i kode:

1. Opret projekt på [sanity.io](https://sanity.io) (gratis tier rigeligt)
2. I Sanity Studio, kopier schemas fra `sanity/schemas/` ind
3. Sæt i `.env`:
   ```
   SANITY_PROJECT_ID=dit-projekt-id
   SANITY_DATASET=production
   ```
4. Konfigurer webhook i Sanity til at trigge Cloudflare Pages rebuild ved ændringer

## Deploy til Cloudflare Pages

### Første gang

1. Push kode til GitHub
2. Gå til [dash.cloudflare.com](https://dash.cloudflare.com) → Pages → Create project
3. Connect til GitHub repo
4. Build settings:
   - Framework preset: `Astro`
   - Build command: `npm run build`
   - Build output directory: `dist`
5. Environment variables (under Settings → Environment variables):
   ```
   RESEND_API_KEY=...
   NOTIFICATION_EMAIL=kristian@kristianazzet.com
   MAILERLITE_API_KEY=...
   MAILERLITE_GROUP_ID=...
   SANITY_PROJECT_ID=... (hvis Sanity bruges)
   SANITY_DATASET=production
   ```
6. Deploy

### Custom domain

Settings → Custom domains → `kristianazzet.com` og `www.kristianazzet.com`.
Cloudflare håndterer SSL automatisk.

### DNS migration fra WordPress

Når den nye side er deployet og testet:
1. Export eventuel data fra WordPress (shows, images)
2. Peg DNS records til Cloudflare Pages
3. Cloudflare håndterer cache og SSL

## Google Ads setup til firmafest

1. Opret Google Ads kampagne med landing page URL: `https://kristianazzet.com/firmafest`
2. Landing pagen har `noindex, nofollow` så den ikke dukker op i organic søgeresultater
3. Conversion tracking: formularen pusher `firmafest_lead` event til `dataLayer` ved successful submit — tilføj GTM snippet hvis du vil tracke det server-side via Stape.io

### GTM / Stape.io integration (valgfrit)

Tilføj i `src/layouts/BaseLayout.astro` head-slot:

```html
<!-- GTM via Stape -->
<script async src="https://sgtm.kristianazzet.com/gtm.js?id=GTM-XXXXXX"></script>
```

## Mapstruktur

```
src/
├── assets/           # Kilde fonts og logos (kopieres til public/ ved behov)
├── components/       # Astro komponenter
│   ├── Nav.astro
│   ├── Hero.astro
│   ├── Shows.astro
│   ├── ShowCard.astro
│   ├── FeaturedVideo.astro
│   ├── ContactBlock.astro
│   ├── MailingList.astro
│   └── Footer.astro
├── config/
│   └── site.ts       # Site-wide config (nav, booking info, social)
├── data/
│   └── shows.json    # Placeholder data (fallback når Sanity ikke bruges)
├── layouts/
│   └── BaseLayout.astro
├── lib/
│   └── sanity.ts     # Sanity client med JSON fallback
├── pages/
│   ├── index.astro           # Forside
│   ├── firmafest.astro       # Landing page (noindex)
│   ├── sitemap.xml.ts        # Dynamisk sitemap
│   └── api/
│       ├── firmafest.ts      # Form submission → email
│       └── newsletter.ts     # Newsletter signup → MailerLite
└── styles/
    └── global.css    # Tailwind + fonts + overrides

public/
├── fonts/            # BN Bones, Geomanist Regular + Bold
├── images/           # Logos og statiske billeder
└── robots.txt        # Blokerer /firmafest fra indexering
```

## Design tokens

Defineret i `tailwind.config.mjs`:

| Token | Værdi | Brug |
|-------|-------|------|
| `stone-black` | `#0B1313` | Primær baggrund |
| `stone-black-dark` | `#080e0e` | Alternativ sektion baggrund |
| `neon-green` | `#DCFF42` | Accents, CTAs, highlights |
| `font-display` | BN Bones | Headlines |
| `font-sans` | Geomanist | Alt andet |

**0px corners er global** — alle komponenter har `border-radius: 0` undtagen social icons (`.rounded-full`).

## Næste skridt

- [ ] Tilføj rigtige shows til `shows.json` eller Sanity
- [ ] Tilføj musik-links til `src/config/site.ts`
- [ ] Opload hero-billede til `public/images/hero-bg.jpg`
- [ ] Opload firmafest hero-billede til `public/images/firmafest-hero.jpg`
- [ ] Opret Resend konto og tilføj API key
- [ ] Opret MailerLite konto og tilføj API key + group ID
- [ ] Opret domain og pek DNS til Cloudflare Pages
- [ ] Sæt Google Ads kampagne op med firmafest URL
- [ ] Tilføj rigtige testimonials til firmafest siden
- [ ] Tilføj klient logoer som SVG filer (erstat tekst-placeholders)
