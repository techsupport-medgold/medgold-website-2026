# Med Gold Website

Website for Med Gold, a Chennai hospital operations partner, built on the same stack and conventions as the AVR Energies site.

## Stack

- Next.js 16 (App Router, Turbopack), React 19, TypeScript
- Tailwind CSS 3 + SCSS (`src/styles`), shadcn/ui (`new-york`), lucide icons
- ESLint 9 (`eslint-config-next` + jsx-a11y), Vitest

## Getting started

```bash
cp .env.example .env.local   # set NEXT_PUBLIC_SITE_URL and optional IDs
npm install
npm run dev                  # http://localhost:3000
```

| Script | Purpose |
|--------|---------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run test` | Vitest |

## Environment variables

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | Public origin; drives canonical URLs, sitemap, robots, OG, JSON-LD |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Google Search Console meta tag |
| `NEXT_PUBLIC_BING_SITE_VERIFICATION` | Bing Webmaster meta tag |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager (only loaded when set) |
| `NEXT_PUBLIC_CLARITY_ID` | Optional override for the Microsoft Clarity project ID (default in `src/config/site.ts`; loads on the production site only) |

## Project structure

```text
src/
  app/          root layout, metadata, robots.ts, sitemap.ts, manifest.ts, OG image + icons
  app/(site)/   every public page (Header + Footer layout); (site)/page.tsx is the homepage
  components/   ui/ (shadcn), common/ (Logo, Header, Footer, Breadcrumb, JsonLd, Analytics),
                home/, services/ and per-page sections
  config/       site.ts - brand, domain, contact; routes.ts - Routes + navigation
  data/         page copy and SEO constants
  lib/          utils, JSON-LD schema builders, brand image helper
  styles/       globals.scss, _tailwind.scss (tokens), base/, components/
```

## Pages

Every public page lives in `src/app/(site)/<slug>/page.tsx` and is served at `/<slug>`.
All pages are `index, follow` and listed in `src/app/sitemap.ts`, except the internal
`/style-guide`, which is `noindex`.

- New page: create `src/app/(site)/<slug>/page.tsx`, add the path to `Routes` in
  `src/config/routes.ts`, and add it to `ROUTES` in `src/app/sitemap.ts`.
- The old pre-launch `/dev/*` URLs 301-redirect to their root paths (`next.config.ts`).

## Deploying to Vercel

The repo deploys from GitHub (`techsupport-medgold/website`, branch `main`).

1. In [Vercel](https://vercel.com/new), import the GitHub repo and keep the Next.js preset
   (build `next build`, no output directory override).
2. Add environment variables for Production: `NEXT_PUBLIC_SITE_URL` (e.g. `https://medgold.com`),
   plus verification/analytics IDs when available.
3. Under Settings > Domains, add the apex domain and `www`. The app redirects `www` to the apex.
4. Every push to `main` deploys to production; other branches get preview URLs, which Vercel
   serves with `X-Robots-Tag: noindex` so they are never indexed.

## SEO checklist

Built in: title template, meta description, canonical URLs, robots meta, Open Graph and
Twitter cards with generated 1200x630 images, generated favicon / apple icon, web manifest,
`robots.txt`, `sitemap.xml`, JSON-LD (`MedicalOrganization`, `WebSite`, `WebPage`),
self-hosted fonts, static rendering, security headers, and `www` to apex redirect.

After launch:

1. Confirm the domain (`NEXT_PUBLIC_SITE_URL`) in Vercel.
2. Add Search Console / Bing verification tokens and submit `/sitemap.xml`.
3. Validate structured data with the [Rich Results Test](https://search.google.com/test/rich-results).

## Brand

- Logo: `public/images/logo-medgold.svg`, rendered via `src/components/common/Logo.tsx`.
  To update it, replace the SVG (keep the file name) and adjust the aspect ratio in `Logo.tsx`
  and `opengraph-image.tsx` if it changes.
- Colours: teal `#0B6376`, gold `#D4AF37`, charcoal `#1F2937`, gray `#6B7280`,
  light gray `#F3F4F6`, white. Tokens live in `src/styles/_tailwind.scss`; usage and contrast
  rules are in `.cursor/rules/ui-components.mdc`.

Project conventions for new pages live in `.cursor/rules/`.
