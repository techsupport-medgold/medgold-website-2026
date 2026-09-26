/** Single source of truth for brand, URL, and contact data used by pages, metadata, and JSON-LD. */

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://medgold.com"
).replace(/\/$/, "");

export const SITE = {
  name: "Med Gold",
  legalName: "Med Gold",
  shortName: "Med Gold",
  url: SITE_URL,
  title: "Med Gold | Trusted Healthcare - Coming Soon",
  tagline: "Gold-standard healthcare, built around you.",
  description:
    "Med Gold is launching soon: patient-first healthcare with experienced doctors, modern diagnostics, and compassionate care. Get in touch to learn more.",
  keywords: [
    "Med Gold",
    "healthcare",
    "medical care",
    "doctors",
    "clinic",
    "diagnostics",
    "health checkup",
    "patient care",
  ],
  locale: "en_IN",
  language: "en",
  logo: "/images/med-gold-logo.svg",
  launchYear: 2026,
  contact: {
    email: "hello@medgold.com",
    phone: "+91 00000 00000",
    phoneHref: "+910000000000",
    address: {
      streetAddress: "Address to be announced",
      addressLocality: "Chennai",
      addressRegion: "Tamil Nadu",
      postalCode: "600001",
      addressCountry: "IN",
    },
  },
  social: [] as string[],
} as const;

export const BRAND_COLORS = {
  primary: "#0b4f4a",
  gold: "#c89b3c",
  background: "#f7faf9",
} as const;

export const absoluteUrl = (path = "/") =>
  `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
