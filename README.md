# Med Gold Website

Coming-soon website for Med Gold, built on the same stack and conventions as the AVR Energies site.

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
| `NEXT_PUBLIC_CLARITY_ID` | Microsoft Clarity (only loaded when set) |

## Project structure

```text
src/
  app/          routes, metadata, robots.ts, sitemap.ts, manifest.ts, OG image + icons
  components/   ui/ (shadcn), common/ (Logo, Footer, JsonLd, Analytics), coming-soon/
  config/       site.ts - brand, domain, contact details; routes.ts - Routes + DEV_ROUTES
  data/         page copy and SEO constants
  lib/          utils, JSON-LD schema builders, brand image helper
  styles/       globals.scss, _tailwind.scss (tokens), base/, pages/
```

## Pages in development

Only the coming-soon page (`/`) is indexed. Every other page is built inside
`src/app/(in-development)/`: it is reachable by its URL (for example `/about`) but is
served with `noindex, nofollow` (meta tag + `X-Robots-Tag` header) and kept out of the sitemap.

- New page: create `src/app/(in-development)/<route>/page.tsx` and add the path to
  `DEV_ROUTES` in `src/config/routes.ts`.
- Launch a page: move it to `src/app/<route>/`, remove it from `DEV_ROUTES`, and add it to
  `ROUTES` in `src/app/sitemap.ts`.
- Do not block dev pages in `robots.txt`; crawlers need to see the noindex.

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

Before launch:

1. Replace the placeholder domain, email, phone, and address in `src/config/site.ts`.
2. Replace the logo mark in `src/components/common/Logo.tsx` and `public/images/med-gold-logo.svg`.
3. Add Search Console / Bing verification tokens and submit `/sitemap.xml`.
4. Validate structured data with the [Rich Results Test](https://search.google.com/test/rich-results).

Project conventions for new pages live in `.cursor/rules/`.
