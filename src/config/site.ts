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
  logo: "/images/logo-medgold.svg",
  favicon: "/images/fav.svg",
  launchYear: 2026,
  /** ISO date with IST offset; NEXT_PUBLIC_LAUNCH_DATE overrides the announced date. */
  launchDate: process.env.NEXT_PUBLIC_LAUNCH_DATE || "2026-11-08T00:00:00+05:30",
  country: "IN",
  contact: {
    person: "Mr. Sundramurthi",
    phone: "+91 91509 37804",
    phoneHref: "+919150937804",
    whatsapp: "919150937804",
  },
  social: [] as string[],
} as const;

/** Public Microsoft Clarity project ID; NEXT_PUBLIC_CLARITY_ID overrides it. */
export const CLARITY_PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_ID || "yoaflrji2q";

export const whatsappUrl = (message?: string) =>
  `https://wa.me/${SITE.contact.whatsapp}${
    message ? `?text=${encodeURIComponent(message)}` : ""
  }`;

export const BRAND_COLORS = {
  primary: "#0B6376",
  gold: "#D4AF37",
  charcoal: "#1F2937",
  gray: "#6B7280",
  lightGray: "#F3F4F6",
  background: "#FFFFFF",
} as const;

export const absoluteUrl = (path = "/") =>
  `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
