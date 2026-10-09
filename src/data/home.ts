import { DevRoutes, LEGAL_NAV } from "@@/config/routes";

/** Copy for the future homepage, previewed at /dev/home. */
export const HOME_SEO = {
  title: "Hospital Healthcare Operations Management and Maintenance Company Chennai India",
  description:
    "From NABH-compliant clinical audits to sterile housekeeping, nursing aide upskilling and digital records, Med Gold powers hospital operations across Chennai.",
};

export const homeHero = {
  badge:
    "Chennai's foremost hospital audit, O&M and healthcare growth partner • 120+ healthcare facilities managed",
  heading: "MedGold Healthcare",
  intro:
    "From NABH-compliant clinical audits to clinical facility staffing, nursing aide upskilling, and digital medical records, we power healthcare continuity across Chennai and Kanchipuram with zero operational disruptions.",
  primaryCta: "Schedule Operations Audit",
  secondaryCta: "Explore Core Healthcare Services",
  compliance: ["NABH 5th Edition Aligned", "ISO 9001:2015 Clinical Quality", "BMWM 2016 Certification"],
  image: {
    src: "/images/staffing/staffing-hero.jpg",
    alt: "Med Gold clinical team of a doctor, nurses in teal scrubs, a technician and a coordinator standing together in a Chennai hospital lobby",
  },
  imageTag: "Clinical Staffing & Roster Command • Chennai Metro Hub",
  imageStatus: "Online",
  metricCards: [
    { value: "99.8%", label: "Shift Fill & Roster Adherence", tone: "primary" },
    { value: "100%", label: "NABH & Statutory Vetted Staff", tone: "gold" },
  ],
} as const;

export const trustMetrics = [
  { eyebrow: "Clinical compliance", value: "140+", label: "Hospital & Clinic Audits Completed" },
  { eyebrow: "Facility scope", value: "3,500+", label: "Hospital Beds Under Active Quality SOPs" },
  { eyebrow: "Trained personnel", value: "1,200+", label: "Clinical Staff & Nursing Aides Deployed" },
  { eyebrow: "Emergency response", value: "<45 min", label: "Average Rapid Dispatch Time in Chennai" },
] as const;

export const servicesIntro = {
  heading: "Healthcare Operations Management",
  intro:
    "Standardizing hospital clinical governance, infection deterrence, biomedical uptime, and statutory inspection compliance through certified standard operating procedures.",
  linkLabel: "Explore Services",
};

export type PillarIcon = "pharmacy" | "branding" | "staffing" | "feedback" | "training";

export type ServicePillar = {
  title: string;
  subtitle?: string;
  description: string;
  tags: readonly string[];
  code: string;
  icon: PillarIcon;
  image?: { src: string; alt: string };
  href?: string;
};

export const servicePillars: readonly ServicePillar[] = [
  {
    title: "Pharmacy Stock Audit & Optimization",
    subtitle: "Stop Dead Stock, Expiry & Leakage • High-Profit Center",
    description:
      "Physical stock verification & valuation, purchase/sales SOP development, KPI & KRA frameworks, staff training, and leakage eradication.",
    tags: ["Stock Audit & Valuation", "Zero Expiry Losses", "SOP & KPI Systems"],
    code: "SOP-PHA",
    icon: "pharmacy",
    href: DevRoutes.PHARMACY_AUDIT,
    image: {
      src: "/images/home/pharmacy-audit.jpg",
      alt: "Hospital pharmacist scanning medicine stock on store-room shelves, with a stock dashboard and cold-chain refrigerator nearby",
    },
  },
  {
    title: "Hospital Branding, Marketing & Growth Services",
    subtitle: "OPD Footfall Expansion • Institutional Revenue Growth",
    description:
      "Strategic hospital positioning, targeted patient lead generation, doctor personal branding, and multi-channel digital campaigns to scale OPD footfall and institutional revenue.",
    tags: ["Patient Acquisition", "Digital Marketing", "Brand Equity"],
    code: "SOP-MKT",
    icon: "branding",
    href: DevRoutes.BRANDING,
    image: {
      src: "/images/branding/doctor-consult.jpg",
      alt: "Senior consultant and a younger doctor in white coats reviewing a patient file together on a hospital ward",
    },
  },
  {
    title: "Healthcare Facility Staffing",
    description:
      "Vetted Duty Medical Officers (DMOs), NABH-oriented ICU charge nurses, lab tech professionals, radiology technicians, and hospital operations dispatchers on demand.",
    tags: ["ICU Specialist Nurses", "Duty Doctors"],
    code: "SOP-STF",
    icon: "staffing",
    href: DevRoutes.STAFFING,
    image: {
      src: "/images/staffing/nursing.jpg",
      alt: "ICU nurses in scrubs adjusting an IV line for a resting patient beside a bedside vital-signs monitor",
    },
  },
  {
    title: "Patient Feedback Systems",
    description:
      "Bedside touchpoint feedback collection, automated NPS reporting, real-time grievance escalation for nursing superintendents, and qualitative inpatient sentiment indexing.",
    tags: ["Digital Bedside NPS", "Instant Escalation"],
    code: "SOP-PFS",
    icon: "feedback",
    href: DevRoutes.PATIENT_FEEDBACK,
    image: {
      src: "/images/patient-feedback/touchpoint-bedside.jpg",
      alt: "Patient relations executive with a tablet collecting bedside feedback from a smiling inpatient while a nurse checks her IV",
    },
  },
  {
    title: "Nursing Training",
    description:
      "Rigorous bedside simulation, geriatric care handling, pressure-ulcer prevention, sterile catheter management, and Basic Life Support (BLS) training.",
    tags: ["Bedside Simulation", "BLS Certified"],
    code: "SOP-OJT",
    icon: "training",
    href: DevRoutes.NURSING_TRAINING,
    image: {
      src: "/images/nursing-training/training-hero.jpg",
      alt: "Nurse educator briefing nursing aide trainees in scrubs around a patient-care manikin in a simulation ward",
    },
  },
];

export type AdvantageIcon = "audits" | "operations" | "growth";

export const advantage = {
  eyebrow: "Why Chennai institutions partner with us",
  heading: "Operations & Maintenance (O&M) and Healthcare Growth",
  intro:
    "An operational lapse or compliance penalty stunts institutional scale. MedGold delivers a high-impact triad: certified clinical audits, meticulous operations & maintenance (O&M), and continuous capacity growth for hospitals.",
  cards: [
    {
      icon: "audits",
      title: "Clinical & Facility Audits",
      description:
        "NABH 5th Edition, pharmacy cold chain, bio-waste, and statutory pre-inspection readiness conducted by accredited hospital auditors.",
    },
    {
      icon: "operations",
      title: "Healthcare Operations & Maintenance (O&M)",
      description:
        "Turnkey daily hospital workflow stewardship—ICU staffing, EHR/EMR digitizing, terminal OT sanitization, and strict clinical SOP adherence.",
    },
    {
      icon: "growth",
      title: "Institutional Growth & Capacity Scaling",
      description:
        "Faster OT turnarounds, optimized bed occupancy, proactive NPS patient retention, and revenue protection via zero statutory non-conformances.",
    },
  ] satisfies { icon: AdvantageIcon; title: string; description: string }[],
};

export const opsPanel = {
  title: "MedGold Operational Command: Central Tamil Nadu Cluster",
  tag: "Live Telemetry Feed",
  stats: [
    { label: "Active operations nodes", value: "124", note: "100% SLA Maintained", tone: "gold" },
    { label: "Ward protocols monitored", value: "3,542", note: "0 Audit Non-Conformances", tone: "primary" },
    { label: "Daily bio-waste logged", value: "8.2 Tons", note: "100% CPCB Barcoded", tone: "muted" },
  ],
  bars: [
    { label: "Emergency & ICU Operational Hygiene Readiness", value: 99.94, display: "99.94%", tone: "primary" },
    { label: "OT Airflow & Laminar Particle Count Compliance", value: 99.2, display: "99.20%", tone: "gold" },
    {
      label: "Pharmacy Temperature Sensors (2°C - 8°C Strict Cold Chain)",
      value: 100,
      display: "100.0%",
      tone: "primary",
    },
  ],
  note: "Daily automated audits synced with NABH 5th Edition digital logs.",
  linkLabel: "Request Demo Portal Access",
} as const;

export const caseStudy = {
  badge: "Institutional Impact Case Study • Chennai Medical Corridor",
  heading:
    "450-Bed Tertiary Care Hospital in Chennai Achieves 38% Faster OT Turnaround & Zero Clinical Disruption",
  intro:
    "Facing persistent delays between emergency surgeries and frequent workflow bottlenecks, this leading multi-speciality facility engaged MedGold to re-engineer their facility management workflows and operating theatre sanitation squads.",
  metrics: [
    { value: "38%", label: "OT Turnaround Acceleration" },
    { value: "0 hrs", label: "Unplanned Clinical Halts (12 Mos)" },
    { value: "100%", label: "NABH Re-Accreditation Score" },
  ],
  primaryCta: "Read Full Case Documentation",
  secondaryCta: "Request Facility Benchmark",
  roadmapHeading: "Deployment roadmap",
  roadmap: [
    {
      title: "Comprehensive Gap Audit",
      description:
        "Assessed 610 biomedical assets, documented calibration drifts, and benchmarked OT cleaning workflows.",
    },
    {
      title: "Embedded Facility Operations Desk",
      description:
        "Stationed certified supervisors onsite 24/7 with immediate response protocols for theatre turnarounds.",
    },
    {
      title: "Sterility & BMWM Protocol Enforcement",
      description:
        "Instituted strict sterile turnover controls and hospital-grade vaporized disinfection protocols between operative cases.",
    },
  ],
} as const;

export type AuditBenefitIcon = "response" | "scorecard" | "briefing";

export const auditCta = {
  eyebrow: "Fast-track clinical audit",
  heading: "Book a Comprehensive Hospital Operations & Clinical Audit",
  intro:
    "Get an unbiased evaluation of your facility's operational workflow, statutory compliance, waste management, and patient care standards.",
  benefits: [
    { icon: "response", text: "Response within 4 operational hours across Chennai" },
    { icon: "scorecard", text: "Complete 42-point NABH conformity readiness scorecard" },
    { icon: "briefing", text: "Zero-obligation executive briefing for Medical Directors" },
  ] satisfies { icon: AuditBenefitIcon; text: string }[],
  shareHeading: "Share with our audit team",
  shareFields: [
    "Hospital / Clinic Name",
    "Medical Superintendent / Lead Name",
    "Official Contact Phone",
    "Official Institutional Email",
    "Inpatient Bed Capacity",
    "Operational Services Required",
    "Primary Healthcare Facility Location",
  ],
  cta: "Submit Assessment Request & Deploy Audit Team",
};

export type DirectoryLink = { label: string; href?: string };

export const directory = {
  eyebrow: "Fast navigation directory",
  heading: "Direct Operational Portals & Institutional Documentation",
  contactLabel: "Contact our team",
  columns: [
    {
      title: "Clinical Audits",
      links: [
        { label: "Pharmacy Audit Services", href: DevRoutes.PHARMACY_AUDIT },
        { label: "Hospital & Clinic Audits", href: DevRoutes.CONTACT },
        { label: "Medical Record Maintenance", href: DevRoutes.CONTACT },
        { label: "Patient Feedback Systems", href: DevRoutes.PATIENT_FEEDBACK },
      ],
    },
    {
      title: "Operations & Maintenance (O&M)",
      links: [
        { label: "Biomedical & Lab Maintenance", href: DevRoutes.CONTACT },
        { label: "Healthcare Facility Staffing", href: DevRoutes.STAFFING },
        { label: "Nursing Training", href: DevRoutes.NURSING_TRAINING },
      ],
    },
    {
      title: "Enterprise Hub",
      links: [
        { label: "About MedGold Operations", href: DevRoutes.ABOUT },
        { label: "South India Case Studies", href: DevRoutes.CASE_STUDIES },
        { label: "Operations & Growth Careers", href: DevRoutes.CAREERS },
        { label: "Connect with Ops Desk", href: DevRoutes.CONTACT },
      ],
    },
    {
      title: "Statutory & Quality",
      links: [
        { label: "Healthcare Privacy Policy", href: LEGAL_NAV[0].href },
        { label: "Institutional Terms of Service", href: LEGAL_NAV[1].href },
        { label: "NABH / ISO 9001:2015" },
      ],
    },
  ] satisfies { title: string; links: DirectoryLink[] }[],
};
