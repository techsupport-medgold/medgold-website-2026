export const Routes = {
  HOME: "/",
  ABOUT: "/about-us",
  STAFFING: "/hospital-healthcare-medical-facility-staffing-services",
  PHARMACY_AUDIT: "/pharmacy-stock-audit-growth-services",
  BRANDING: "/hospital-clinic-branding-marketing-services",
  PATIENT_FEEDBACK: "/patient-feedback-collection-system-integration-services",
  NURSING_TRAINING: "/nursing-training",
  CASE_STUDIES: "/case-studies",
  CAREERS: "/careers",
  CONTACT: "/contact-us",
  THANK_YOU: "/thank-you",
  PRIVACY: "/privacy-policy",
  TERMS: "/terms-of-service",
  STYLE_GUIDE: "/style-guide",
} as const;

export type NavItem = { href: string; label: string; children?: readonly NavItem[] };

export const SERVICE_NAV: readonly NavItem[] = [
  { href: Routes.STAFFING, label: "Healthcare Facility Staffing" },
  { href: Routes.PHARMACY_AUDIT, label: "Pharmacy Stock Audit & Growth" },
  { href: Routes.BRANDING, label: "Hospital & Clinic Branding & Marketing" },
  { href: Routes.PATIENT_FEEDBACK, label: "Patient Feedback Systems" },
  { href: Routes.NURSING_TRAINING, label: "Nursing Training" },
];

export const MAIN_NAV: readonly NavItem[] = [
  { href: Routes.HOME, label: "Home" },
  { href: Routes.ABOUT, label: "About" },
  { href: `${Routes.HOME}#services`, label: "Services", children: SERVICE_NAV },
  { href: Routes.CAREERS, label: "Careers" },
  { href: Routes.CONTACT, label: "Contact Us" },
];

export const LEGAL_NAV = [
  { href: Routes.PRIVACY, label: "Privacy Policy" },
  { href: Routes.TERMS, label: "Terms of Service" },
] as const;
