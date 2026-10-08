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
  ABOUT: `${DEV_PREFIX}/about-us`,
  SERVICES: `${DEV_PREFIX}/services`,
  STAFFING: `${DEV_PREFIX}/hospital-healthcare-medical-facility-staffing-services`,
  PHARMACY_AUDIT: `${DEV_PREFIX}/pharmacy-stock-audit-growth-services`,
  BRANDING: `${DEV_PREFIX}/hospital-clinic-branding-marketing-services`,
  PATIENT_FEEDBACK: `${DEV_PREFIX}/patient-feedback-collection-system-integration-services`,
  NURSING_TRAINING: `${DEV_PREFIX}/nursing-training`,
  CASE_STUDIES: `${DEV_PREFIX}/case-studies`,
  CAREERS: `${DEV_PREFIX}/careers`,
  CONTACT: `${DEV_PREFIX}/contact-us`,
  PRIVACY: `${DEV_PREFIX}/privacy-policy`,
  TERMS: `${DEV_PREFIX}/terms-of-service`,
} as const;

export type NavItem = { href: string; label: string; children?: readonly NavItem[] };

export const SERVICE_NAV: readonly NavItem[] = [
  { href: DevRoutes.STAFFING, label: "Healthcare Facility Staffing" },
  { href: DevRoutes.PHARMACY_AUDIT, label: "Pharmacy Stock Audit & Growth" },
  { href: DevRoutes.BRANDING, label: "Hospital & Clinic Branding & Marketing" },
  { href: DevRoutes.PATIENT_FEEDBACK, label: "Patient Feedback Systems" },
  { href: DevRoutes.NURSING_TRAINING, label: "Nursing Training" },
];

export const DEV_NAV: readonly NavItem[] = [
  { href: DevRoutes.HOME, label: "Home" },
  { href: DevRoutes.ABOUT, label: "About" },
  { href: DevRoutes.SERVICES, label: "Services", children: SERVICE_NAV },
  { href: DevRoutes.CAREERS, label: "Careers" },
  { href: DevRoutes.CONTACT, label: "Contact Us" },
];

export const LEGAL_NAV = [
  { href: DevRoutes.PRIVACY, label: "Privacy Policy" },
  { href: DevRoutes.TERMS, label: "Terms of Service" },
] as const;
