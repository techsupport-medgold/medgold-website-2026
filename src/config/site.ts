/** Single source of truth for brand, URL, and contact data used by pages, metadata, and JSON-LD. */

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://medgold.com"
).replace(/\/$/, "");

export const SITE = {
  name: "Med Gold",
  legalName: "Med Gold",
  shortName: "Med Gold",
  url: SITE_URL,
  title: "Hospital Healthcare Operations Management and Maintenance Company Chennai India",
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
    phoneAlt: "+91 82480 60804",
    phoneAltHref: "+918248060804",
    whatsapp: "919150937804",
    email: "consulting@medgoldhealthcare.com",
  },
  address: {
    street: "No.5, Santhosh Nagar Annex",
    locality: "Kolathur",
    city: "Chennai",
    region: "Tamil Nadu",
    postalCode: "600099",
    full: "No.5, Santhosh Nagar Annex, Kolathur, Chennai, Tamil Nadu 600099",
  },
  geo: { lat: 13.1309443, lng: 80.199499 },
  mapUrl: "https://maps.app.goo.gl/pkUEuPoQ5N37jBJZ9",
  social: [] as string[],
} as const;

/** Public Microsoft Clarity project ID; NEXT_PUBLIC_CLARITY_ID overrides it. */
export const CLARITY_PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_ID || "yoaflrji2q";

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
