import { DevRoutes, LEGAL_NAV } from "@@/config/routes";

/** Copy for the future homepage, previewed at /dev/home. */
export const HOME_SEO = {
  title: "Hospital Operations Management & Clinical Maintenance",
  description:
    "From NABH-compliant clinical audits to sterile housekeeping, nursing aide upskilling and digital records, Med Gold powers hospital operations across Chennai.",
};

export const homeHero = {
  badge:
    "Chennai's foremost hospital audit, O&M and healthcare growth partner • 120+ healthcare facilities managed",
  heading: "Hospital Operations Management & Clinical Maintenance Company",
  intro:
    "From NABH-compliant clinical audits to sterile hospital housekeeping, nursing aide upskilling, and digital medical records, we power healthcare continuity across Chennai and Kanchipuram with zero operational disruptions.",
  primaryCta: "Schedule Operations Audit",
  secondaryCta: "Explore Core Healthcare Services",
  compliance: ["NABH 5th Edition Aligned", "ISO 9001:2015 Clinical Quality", "BMWM 2016 Certification"],
  image: {
    src: "/images/home/command-centre.jpg",
    alt: "MedGold hospital central command and telemetry room in Chennai, with staff monitoring operations dashboards",
  },
  imageTag: "Live operations telemetry • Chennai metro hub",
  imageStatus: "Online",
  metricCards: [
    { value: "99.8%", label: "Clinical SOP Compliance Rate", tone: "primary" },
    { value: "100%", label: "NABH/JCI Audit Readiness", tone: "gold" },
  ],
} as const;

export const trustMetrics = [
  { eyebrow: "Clinical compliance", value: "140+", label: "Hospital & Clinic Audits Completed" },
  { eyebrow: "Facility scope", value: "3,500+", label: "Hospital Beds Under Active Quality SOPs" },
  { eyebrow: "Trained personnel", value: "1,200+", label: "Clinical Staff & Nursing Aides Deployed" },
  { eyebrow: "Emergency response", value: "<45 min", label: "Average Rapid Dispatch Time in Chennai" },
] as const;

export const servicesIntro = {
  heading: "Healthcare Operations Architecture",
  intro:
    "Standardizing hospital clinical governance, infection deterrence, biomedical uptime, and statutory inspection compliance through certified standard operating procedures.",
  linkLabel: "Explore Services",
};

export type PillarIcon = "pharmacy" | "audit" | "sanitization" | "staffing" | "feedback" | "training";

export type ServicePillar = {
  title: string;
  description: string;
  tags: readonly string[];
  code: string;
  icon: PillarIcon;
  image?: { src: string; alt: string };
  href?: string;
};

export const servicePillars: readonly ServicePillar[] = [
  {
    title: "Pharmacy Audits",
    description:
      "Prescription compliance, expiry containment, Schedule H/X regulatory records, automated reconciliation, and strict cold-chain sensor audits.",
    tags: ["Schedule H/X Audits", "Cold-Chain 2°C-8°C"],
    code: "SOP-PHA",
    icon: "pharmacy",
    href: DevRoutes.PHARMACY_AUDIT,
    image: {
      src: "/images/home/pharmacy-audit.jpg",
      alt: "Pharmacist checking medicine stock and cold-chain records in a hospital pharmacy",
    },
  },
  {
    title: "Hospital & Clinic Audits",
    description:
      "NABH 5th edition, JCI assessments, OT positive pressure airflows, life safety verifications, and inpatient bottleneck eradication.",
    tags: ["NABH Readiness", "Infection Control"],
    code: "SOP-HCA",
    icon: "audit",
    image: {
      src: "/images/home/clinic-audit.jpg",
      alt: "Clinical quality director and doctor reviewing audit checklists on a hospital ward",
    },
  },
  {
    title: "Lab & Janitorial Sanitization",
    description:
      "Terminal OT sterilizations, Bio-Medical Waste barcoding (BMWM 2016), color-coded cleanroom zones, and ICMR lab standards.",
    tags: ["OT Terminal Clean", "BMWM Barcoding"],
    code: "SOP-HSK",
    icon: "sanitization",
    image: {
      src: "/images/home/janitorial-sanitization.jpg",
      alt: "Hospital housekeeping staff scrubbing and sanitizing a corridor floor",
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
  },
  {
    title: "Patient Feedback Systems",
    description:
      "Bedside touchpoint feedback collection, automated NPS reporting, real-time grievance escalation for nursing superintendents, and qualitative inpatient sentiment indexing.",
    tags: ["Digital Bedside NPS", "Instant Escalation"],
    code: "SOP-PFS",
    icon: "feedback",
    href: DevRoutes.PATIENT_FEEDBACK,
  },
  {
    title: "Nursing Assistant OJT",
    description:
      "Rigorous bedside simulation, geriatric care handling, pressure-ulcer prevention, sterile catheter management, and Basic Life Support (BLS) training.",
    tags: ["Bedside Simulation", "BLS Certified"],
    code: "SOP-OJT",
    icon: "training",
    href: DevRoutes.NURSING_TRAINING,
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
      title: "Microfiber & BMWM Enforcement",
      description:
        "Replaced manual floor scrubs with hospital-grade vaporized disinfectant protocols between operative cases.",
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
  hotlineLabel: "Chennai Emergency Hotline",
  columns: [
    {
      title: "Clinical Audits",
      links: [
        { label: "Pharmacy Audit Services", href: DevRoutes.PHARMACY_AUDIT },
        { label: "Hospital & Clinic Audits", href: DevRoutes.SERVICES },
        { label: "Medical Record Maintenance", href: DevRoutes.SERVICES },
        { label: "Patient Feedback Systems", href: DevRoutes.PATIENT_FEEDBACK },
      ],
    },
    {
      title: "Operations & Maintenance (O&M)",
      links: [
        { label: "Janitorial & OT Cleanroom", href: DevRoutes.SERVICES },
        { label: "Healthcare Facility Staffing", href: DevRoutes.STAFFING },
        { label: "Nursing Assistant OJT", href: DevRoutes.NURSING_TRAINING },
      ],
    },
    {
      title: "Enterprise Hub",
      links: [
        { label: "About MedGold Operations", href: DevRoutes.ABOUT },
        { label: "South India Case Studies", href: "#case-study" },
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
