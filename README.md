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
| `NEXT_PUBLIC_LAUNCH_DATE` | Optional countdown override, ISO with offset (default 8 Nov 2026 IST) |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Google Search Console meta tag |
| `NEXT_PUBLIC_BING_SITE_VERIFICATION` | Bing Webmaster meta tag |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager (only loaded when set) |
| `NEXT_PUBLIC_CLARITY_ID` | Optional override for the Microsoft Clarity project ID (default in `src/config/site.ts`; loads on the production site only) |

## Project structure

```text
src/
  app/          routes, metadata, robots.ts, sitemap.ts, manifest.ts, OG image + icons
  app/dev/      pre-launch pages (/dev, /dev/home, /dev/about), all noindex
  components/   ui/ (shadcn), common/ (Logo, Footer, JsonLd, Analytics),
                coming-soon/ (countdown page), home/ (future homepage sections)
  config/       site.ts - brand, domain, contact, launch date; routes.ts - Routes + DevRoutes
  data/         page copy and SEO constants
  lib/          utils, JSON-LD schema builders, brand image helper
  styles/       globals.scss, _tailwind.scss (tokens), base/, components/
```

## Coming-soon page and launch countdown

`/` is a single-screen coming-soon page with a countdown and the contact details from
`src/config/site.ts`. The launch date is **8 November 2026, 00:00 IST** (`SITE.launchDate`).
To change it, edit `site.ts` or set `NEXT_PUBLIC_LAUNCH_DATE` (ISO with IST offset) in
`.env.local` / Vercel, then redeploy. After the date passes the page shows "We are launching now."

## Pages in development (`/dev/...`)

Only `/` is indexed. Every page built before launch lives in `src/app/dev/<page>/` and is served
at `/dev/<page>`, for example `/dev/home` (future homepage) and `/dev/about`. `/dev` lists them.
All `/dev` URLs are `noindex, nofollow` (meta tag + `X-Robots-Tag` header) and out of the sitemap.

- New page: create `src/app/dev/<page>/page.tsx`, add it to `DevRoutes` in
  `src/config/routes.ts` and to the list in `src/app/dev/page.tsx`.
- Launch a page: move it to its final path (`dev/home` becomes `/`), remove it from `DevRoutes`,
  and add it to `ROUTES` in `src/app/sitemap.ts`.
- Do not block `/dev` in `robots.txt`; crawlers need to see the noindex.

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

1. Confirm the domain (`NEXT_PUBLIC_SITE_URL`) and the launch date in `src/config/site.ts`.
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
