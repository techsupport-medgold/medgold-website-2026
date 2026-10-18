import { CLARITY_ID_PATTERN, GTM_ID_PATTERN, resolvePublicId } from "@@/lib/analytics";

/** Single source of truth for brand, URL, and contact data used by pages, metadata, and JSON-LD. */

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://medgoldhealthcare.com"
).replace(/\/$/, "");

export const SITE = {
  name: "Med Gold",
  legalName: "Med Gold",
  shortName: "Med Gold",
  url: SITE_URL,
  title: "Hospital Operations Management and Maintenance Company",
  tagline: "Gold-standard healthcare, built around you.",
  description:
    "MedGold Healthcare runs hospital operations in Chennai: NABH audits, facility staffing, pharmacy stock control, nursing training and patient feedback.",
  keywords: [
    "MedGold Healthcare",
    "hospital operations Chennai",
    "NABH audit",
    "healthcare facility staffing",
    "pharmacy stock audit",
    "nursing training Chennai",
    "patient feedback system",
    "hospital branding",
  ],
  locale: "en_IN",
  language: "en",
  logo: "/images/logo-medgold.svg",
  favicon: "/images/fav.svg",
  launchYear: 2026,
  country: "IN",
  contact: {
    person: "Mr. Sundaramoorthy",
    phone: "+91 91509 37804",
    phoneHref: "+919150937804",
    phoneAlt: "+91 82480 60804",
    phoneAltHref: "+918248060804",
    whatsapp: "919150937804",
    email: "sundharmedgold@gmail.com",
  },
  address: {
    street: "Santosh Nagar, Janaki Raman Nagar, Teacher Colony",
    locality: "Kolathur",
    city: "Chennai",
    region: "Tamil Nadu",
    postalCode: "600099",
    full: "Santosh Nagar, Janaki Raman Nagar, Teacher Colony, Kolathur, Chennai, Tamil Nadu 600099",
  },
  geo: { lat: 13.1309443, lng: 80.199499 },
  mapUrl: "https://maps.app.goo.gl/pkUEuPoQ5N37jBJZ9",
  social: [] as string[],
} as const;

/** Public Microsoft Clarity project ID; NEXT_PUBLIC_CLARITY_ID overrides it when the value is a real project id. */
export const CLARITY_PROJECT_ID = resolvePublicId(
  process.env.NEXT_PUBLIC_CLARITY_ID,
  "yoaflrji2q",
  CLARITY_ID_PATTERN,
);

/** Public Google Tag Manager container ID; NEXT_PUBLIC_GTM_ID overrides it when the value is a GTM id. */
export const GTM_ID = resolvePublicId(process.env.NEXT_PUBLIC_GTM_ID, "GTM-P8G73P5Q", GTM_ID_PATTERN);

export const whatsappUrl = (message?: string) =>
  `https://wa.me/${SITE.contact.whatsapp}${
    message ? `?text=${encodeURIComponent(message)}` : ""
  }`;

/** Keyless Google Maps embed pinned to SITE.geo. */
export const mapEmbedUrl = () =>
  `https://www.google.com/maps?q=${SITE.geo.lat},${SITE.geo.lng}&z=17&output=embed`;

export const directionsUrl = () =>
  `https://www.google.com/maps/dir/?api=1&destination=${SITE.geo.lat},${SITE.geo.lng}`;

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
