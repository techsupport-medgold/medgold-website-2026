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
| `NEXT_PUBLIC_GTM_ID` | Optional override for the Google Tag Manager container ID (default in `src/config/site.ts`) |
| `NEXT_PUBLIC_CLARITY_ID` | Optional override for the Microsoft Clarity project ID (default in `src/config/site.ts`; loads on the production site only) |
| `SMTP_USER` | Gmail or Workspace address that sends form emails (server only) |
| `SMTP_APP_PASSWORD` | App Password for `SMTP_USER` (server only, keep secret) |
| `MAIL_TO` | Inbox for applications and enquiries; comma-separate for several |

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
Indexable pages are `index, follow` and listed in `src/app/sitemap.ts`. Thank-you
(success and failure), the case-studies placeholder, the style guide and the 404
are `noindex, follow` and stay out of the sitemap.

- New page: create `src/app/(site)/<slug>/page.tsx`, add the path to `Routes` in
  `src/config/routes.ts`, and add it to `ROUTES` in `src/app/sitemap.ts`.

## Form emails

The careers application form (`/careers`, with a resume upload) and the contact enquiry form
(`/contact-us`) send email through Gmail SMTP using an App Password. Each submission sends two
emails: a company copy to `MAIL_TO` (with the resume attached for applications) and an
acknowledgement to the applicant or enquirer (enquiries only when they gave an email).
Code: `src/lib/mailer.ts`, `src/lib/email-templates.ts`, and the `actions.ts` next to each page.

Setup (currently `sundharmedgold@gmail.com`):

1. Sign in to the sending account, open [Google Account Security](https://myaccount.google.com/security)
   and turn on **2-Step Verification**.
2. Open [App Passwords](https://myaccount.google.com/apppasswords), create one named
   "MedGold website" and copy the 16-character password.
3. Add to `.env.local` (never commit this file):

   ```bash
   SMTP_USER=sundharmedgold@gmail.com
   SMTP_APP_PASSWORD=abcdefghijklmnop
   MAIL_TO=sundharmedgold@gmail.com
   ```

4. Restart `npm run dev` and submit a test application (with a PDF) and a test enquiry.
5. In Vercel, open Project Settings > Environment Variables, add the same three keys for
   Production and Preview, then redeploy.

Moving to Google Workspace later (for example `care@medgoldhealthcare.com`): turn on 2-Step
Verification for that user, create an App Password for it, and update `SMTP_USER`,
`SMTP_APP_PASSWORD` and `MAIL_TO`. No code changes are needed. If App Passwords are not offered,
a Workspace admin must allow 2-Step Verification under Admin console > Security >
Authentication > 2-Step Verification.

If email is not configured or Gmail rejects the login, the forms show an error with WhatsApp and
call buttons as a backup, and the server logs the reason.

## Deploying to Vercel

The repo deploys from GitHub (`techsupport-medgold/website`, branch `main`).

1. In [Vercel](https://vercel.com/new), import the GitHub repo and keep the Next.js preset
   (build `next build`, no output directory override).
2. Add environment variables for Production: `NEXT_PUBLIC_SITE_URL` (e.g. `https://medgoldhealthcare.com`),
   plus verification/analytics IDs when available, and the form email keys (see Form emails).
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
