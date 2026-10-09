/** Copy for the Healthcare Facility Staffing service page, previewed at /dev/hospital-healthcare-medical-facility-staffing-services. */
export const STAFFING_SEO = {
  title: "Hospital & Healthcare Staffing Services in Chennai",
  description:
    "Credentialed healthcare staffing for hospitals, clinics, labs and pharmacies across Chennai and South India, plus real hospital training for professionals.",
};

export const breadcrumb = {
  current: "Hospital Healthcare Staffing Services",
  rosterBadge: "Verified Clinical Roster Active | TNMC & TNC Compliant",
  slaBadge: "<4-Hour Emergency Reliever & Backfill SLA",
};

export type TrustIcon = "iso" | "training" | "placement" | "faculty";

export const hero = {
  badge: "MEDGOLD HEALTHCARE — AN ISO 9001:2015 CERTIFIED COMPANY",
  heading: "Medical & Healthcare Manpower Services & Clinical Staffing Solutions",
  intro:
    "End-to-end credentialed healthcare staffing and career development for hospitals, clinics, diagnostic labs, and pharmacies across Chennai and South India. Empowering institutions with qualified clinical manpower while advancing healthcare professionals through real hospital training.",  addressLabel: "Address:",
  webLabel: "Web:",
  primaryCta: "Request Staffing Roster",
  secondaryCta: "Upgrade Skills & Training",
  trust: [
    { icon: "iso", label: "ISO 9001:2015 Certified" },
    { icon: "training", label: "Real Hospital Training" },
    { icon: "placement", label: "Job Placement Support" },
    { icon: "faculty", label: "Experienced Faculty" },
  ] satisfies { icon: TrustIcon; label: string }[],
  image: {
    src: "/images/staffing/staffing-hero.jpg",
    alt: "Doctor, nurses, a technician and a front-office executive standing together in a hospital lobby at dusk",
  },
  overlay: {
    label: "Active Workforce Deployed",
    value: "1,850+ Personnel",
    attendance: "Shift Attendance: 99.6%",
    sla: "Emergency SLA: <4h",
  },
};

export const impactStats = [
  { value: "1,850+", label: "Active Vetted Personnel", detail: "On-campus 24/7 across South India" },
  { value: "45+", label: "Partner Hospitals", detail: "Tertiary, Day-Care & Diagnostics" },
  { value: "<4 Hours", label: "Backfill SLA Guarantee", detail: "Chennai metropolitan rapid pool" },
  { value: "100%", label: "Credential Validated", detail: "TNMC, TNC, HSSC & Police cleared" },
] as const;

export type DualValueIcon = "hospital" | "training";

export type DualValueCard = {
  icon: DualValueIcon;
  accent: "primary" | "gold";
  eyebrow: string;
  title: string;
  intro: string;
  points: readonly { lead: string; text: string }[];
  link: { label: string };
};

export const dualValue = {
  eyebrow: "COMPREHENSIVE HEALTHCARE SOLUTIONS",
  heading: "Dual Value Mandate: Institutional Staffing & Career Training",
  intro:
    "Connecting hospitals with rigorously screened medical professionals while providing candidates with advanced practical training in live hospital environments.",
  cards: [
    {
      icon: "hospital",
      accent: "primary",
      eyebrow: "FOR HOSPITALS & CLINICS",
      title: "Complete Manpower Staffing",
      intro:
        "Reliable turnkey staffing solutions across every hospital tier—from consultants and duty doctors to paramedical, pharmacy, and management staff.",
      points: [
        {
          lead: "42-Point Verification:",
          text: "Complete background checks, police clearance, and TNMC/TNC board licensing validation.",
        },
        {
          lead: "Zero-Absenteeism Guarantee:",
          text: "Standby floating reliever pool with <4-hour emergency turnaround.",
        },
        {
          lead: "All Departments Covered:",
          text: "Clinical, nursing, laboratory, pharmacy, administrative, and operations teams.",
        },
        {
          lead: "Turnkey & Shift Management:",
          text: "Rotational shifts, day-care, and round-the-clock intensive care staffing.",
        },
      ],
      link: { label: "Request Hospital Staffing Profiles" },
    },
    {
      icon: "training",
      accent: "gold",
      eyebrow: "FOR CANDIDATES & ASPIRANTS",
      title: "Advanced Practical Training",
      intro:
        "Upgrade your career and clinical skills through advanced, hands-on hospital department rotations led by senior medical professionals.",
      points: [
        {
          lead: "Live Hospital Training:",
          text: "Practical exposure across ICU, Emergency, Wards, Laboratory, and Pharmacy units.",
        },
        {
          lead: "Experienced Faculty:",
          text: "Intensive bedside mentoring, BLS CPR drills, infection protocols, and EMR handling.",
        },
        {
          lead: "Free Placement Assistance:",
          text: "Direct placement linkages with top hospitals, nursing homes, and diagnostic chains.",
        },
        {
          lead: "Community Health Camps:",
          text: "Practical field experience organizing and executing preventive healthcare camps.",
        },
      ],
      link: { label: "Contact the Enrollment Desk" },
    },
  ] satisfies DualValueCard[],
};

export type CredentialIcon = "emr" | "nurse" | "lab" | "governance";

export const portfolio = {
  eyebrow: "PHOTOGRAPHIC PORTFOLIO",
  heading: "Institutional Clinical Workforce in Practice",
  intro: "Real clinical personnel executing institutional workflows across Chennai medical centers.",
  cards: [
    {
      tier: "Tier 01: Admissions",
      title: "Reception & Front-Office",
      description:
        "Compassionate patient navigation, insurance desk coordinators, OP/IP registration staff, and bilingual patient concierges.",
      credential: "HIS/EMR Certified Squads",
      icon: "emr",
      image: {
        src: "/images/staffing/front-office.jpg",
        alt: "Front-office executive with a headset assisting an elderly couple at the hospital reception desk",
      },
    },
    {
      tier: "Tier 04: Nursing",
      title: "Specialized Nursing Care",
      description:
        "ACLS/BLS certified ICU nurses, modular OT scrub teams, bedside palliative care, and chemotherapy specialty nurses.",
      credential: "TNC Registered Registered Nurses",
      icon: "nurse",
      image: {
        src: "/images/staffing/nursing.jpg",
        alt: "Two ICU nurses adjusting an IV line for a patient beside a bedside monitor",
      },
    },
    {
      tier: "Tier 02: Laboratory",
      title: "Clinical Diagnostics & Lab",
      description:
        "NABL-aligned pathology technicians, biochemistry analysts, centrifuge & analyzer specialists, and phlebotomists.",
      credential: "ISO 15189 Aligned Personnel",
      icon: "lab",
      image: {
        src: "/images/staffing/diagnostics-lab.jpg",
        alt: "Two laboratory technicians handling blood sample tubes beside automated analysers in a pathology lab",
      },
    },
    {
      tier: "Tier 07: C-Suite",
      title: "Executive Hospital CEOs",
      description:
        "Distinguished Medical Directors, Chief Medical Officers (CMOs), Hospital COO/CEOs, and clinical governance chairs.",
      credential: "Board-Level Governance",
      icon: "governance",
      image: {
        src: "/images/staffing/executive.jpg",
        alt: "Hospital leadership team led by a medical director meeting around a boardroom table overlooking the city",
      },
    },
  ] satisfies {
    tier: string;
    title: string;
    description: string;
    credential: string;
    icon: CredentialIcon;
    image: { src: string; alt: string };
  }[],
};

export const directory = {
  eyebrow: "HOSPITAL MANPOWER DIRECTORY",
  heading: "Complete Healthcare Staffing & Roster Disciplines",
  intro:
    "Full institutional spectrum covering clinical specialists, nursing cadres, paramedical technicians, operations, and marketing teams.",
  badge: "ISO 9001:2015 & 42-Point Vetted",
  disciplines: [
    {
      eyebrow: "Doctors & Specialists",
      title: "Medical Consultants & Duty RMOs",
      roles: [
        "MBBS Doctors & Relieving Duty Doctors",
        "Super Specialty Doctors & Specialists",
        "Dental Doctors (BDS / MDS)",
        "Physiotherapists (BPT / MPT)",
      ],
      tags: ["TNMC Board Verified", "24/7 & On-Call Rotas"],
    },
    {
      eyebrow: "Nursing Care Cadres",
      title: "Comprehensive Nursing Staff",
      roles: [
        "B.Sc Nursing Staff (ICU, OT & Wards)",
        "G.N.M & A.N.M Certified Nurses",
        "Diploma Nurses & Specialty Care Nurses",
        "Home Care Nursing & Post-Op Support Staff",
      ],
      tags: ["TNC Registered", "3-Shift Roster & Relievers"],
    },
    {
      eyebrow: "Diagnostics & Lab",
      title: "Lab Techs & Paramedical Staff",
      roles: [
        "DMLT & BMLT Lab Technicians",
        "Phlebotomists & Sample Collection Teams",
        "Radiology / X-Ray & Imaging Techs",
        "Dialysis & Biomedical Technicians",
      ],
      tags: ["NABL / ISO Aligned", "Stat & Emergency Backfill"],
    },
    {
      eyebrow: "Pharmacy Services",
      title: "Pharmacists & Stock Audit Squads",
      roles: [
        "Registered B.Pharm / D.Pharm Pharmacists",
        "Pharmacy Salesmen & Counter Staff",
        "Pharmacy Stock Audit Teams & Reconciliation",
        "Inventory Expiry & Cold Chain Auditors",
      ],
      tags: ["Drug License Compliant", "Full Retail & In-Hospital"],
    },
    {
      eyebrow: "Administration & Front Desk",
      title: "Admin, Managers & Receptionists",
      roles: [
        "Hospital Administrators & Operations Managers",
        "Receptionists & Front Office Admissions",
        "Hospital Software / EMR Operations Staff",
        "All Other Support & Ward Care Staff",
      ],
      tags: ["HIS/EMR Certified", "24/7 Front-Desk Duty"],
    },
    {
      eyebrow: "Growth & Outreach",
      title: "Marketing & Medical Camp Teams",
      roles: [
        "Digital Marketing Specialists (Healthcare)",
        "Offline Healthcare Marketing Executives",
        "Medical Camp Organisation & Outreach Teams",
        "Home Care Operations & Community Relations",
      ],
      tags: ["Field & Digital Proven", "Turnkey Campaigns"],
    },
  ],
} as const;

export const comparison = {
  eyebrow: "INSTITUTIONAL QUALITY ASSURANCE",
  heading: "Conventional Contract Agencies vs. MedGold Clinical Staffing",
  intro: "Why South India’s premier hospital chains partner with MedGold for operational continuity.",
  columns: ["Clinical Dimension", "Conventional Manpower Agency", "MedGold Healthcare Staffing Protocol"],
  rows: [
    {
      dimension: "Credential Verification",
      conventional: "Casual document photocopy checks with no board verification.",
      medgold: "42-point background vetting, live TNMC & TNC board status check, police clearance certificate.",
    },
    {
      dimension: "Emergency Absence Buffer",
      conventional: "No reserve pool. Wards are left short-handed during absenteeism.",
      medgold: "15% dedicated floating buffer pool with guaranteed <4-hour replacement SLA in Chennai hubs.",
    },
    {
      dimension: "NABH & Infection Training",
      conventional: "Zero healthcare-specific induction or infection control training.",
      medgold:
        "Quarterly mandatory re-certifications in BLS, hand hygiene, biomedical waste rules & sterile protocol.",
    },
    {
      dimension: "Statutory Labor Compliance",
      conventional: "High risk of PF, ESI, and minimum wage non-compliance liabilities.",
      medgold:
        "100% compliant with ESI, PF, Gratuity, minimum wage acts & comprehensive Professional Indemnity coverage.",
    },
    {
      dimension: "Clinical Performance Audits",
      conventional: "No operational oversight once workers are deployed.",
      medgold: "Monthly clinical audits by MedGold Operations Supervisors aligned with hospital NABH targets.",
    },
  ],
} as const;

export const requisition = {
  eyebrow: "ISO 9001:2015 CERTIFIED HEALTHCARE PARTNER",
  heading: "Hospital Manpower Requisition & Training Enrollment",
  intro:
    "Request turnkey clinical staff or enroll healthcare professionals in advanced practical training. Dedicated Hotlines:",
  shareHeading: "Share with our team",
  shareFields: [
    "Healthcare Organization Name",
    "Medical Superintendent / HR Director Name",
    "Official Hospital Email",
    "Direct Phone / WhatsApp",
    "Primary Staffing Categories",
    "Personnel Headcount & Target Deployment Date",
    "Special Department Protocols & EMR Requirements",
  ],
  nda: "Hospital data protected under strict Healthcare NDA",
  cta: "Dispatch Staffing Roster Request",
} as const;
