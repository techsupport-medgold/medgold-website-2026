export const Routes = {
  HOME: "/",
} as const;

/**
 * Pre-launch pages live under /dev (src/app/dev). Everything under this prefix is served
 * noindex, nofollow (layout metadata + X-Robots-Tag header) and stays out of the sitemap.
 */
export const DEV_PREFIX = "/dev";

export const DevRoutes = {
  INDEX: DEV_PREFIX,
  HOME: `${DEV_PREFIX}/home`,
  ABOUT: `${DEV_PREFIX}/about`,
  SERVICES: `${DEV_PREFIX}/services`,
  CAREERS: `${DEV_PREFIX}/careers`,
  CONTACT: `${DEV_PREFIX}/contact`,
  PRIVACY: `${DEV_PREFIX}/privacy-policy`,
  TERMS: `${DEV_PREFIX}/terms`,
} as const;

export const DEV_NAV = [
  { href: DevRoutes.HOME, label: "Home" },
  { href: DevRoutes.ABOUT, label: "About" },
  { href: DevRoutes.SERVICES, label: "Services" },
  { href: DevRoutes.CAREERS, label: "Careers" },
  { href: DevRoutes.CONTACT, label: "Contact Us" },
] as const;

export const LEGAL_NAV = [
  { href: DevRoutes.PRIVACY, label: "Privacy Policy" },
  { href: DevRoutes.TERMS, label: "Terms and Conditions" },
] as const;
