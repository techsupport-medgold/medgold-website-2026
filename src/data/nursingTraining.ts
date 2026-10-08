/** Copy for the Nursing Training service page, previewed at /dev/nursing-training. */
export const NURSING_TRAINING_SEO = {
  title: "Nursing Training & Skills Development in Chennai",
  description:
    "Hands-on nursing training in Chennai: ventilator handling, CPR, BLS & ACLS, ICU protocols and patient care in a real hospital, with job placement assistance.",
};

export const breadcrumb = {
  current: "Nursing Training & Skills Development Program",
  badges: [
    { icon: "iso", label: "ISO 9001:2015 Certified Company" },
    { icon: "hospital", label: "Real Hospital Environment" },
    { icon: "placement", label: "Job Placement Assistance" },
  ],
  hotlineLabel: "Hotline:",
} as const;

export type TrainingTrustIcon = "hospital" | "placement" | "faculty" | "certified";

export const hero = {
  eyebrow: "MEDGOLD HEALTHCARE • AN ISO 9001:2015 CERTIFIED COMPANY",
  heading: { lead: "Nursing In House", accent: "Training & Development Program" },
  intro:
    "Nursing Training & Skills Development Program for Hospitals & Healthcare Careers. Master critical on-floor competencies, ventilator handling, CPR, and advanced patient management.",
  motto: {
    label: "MOTTO:",
    primary: "Real Skills • Real Care • Real Impact",
    secondary: "Learn • Practice • Excel",
  },
  primaryCta: "Enroll in Training Program",
  trust: [
    { icon: "hospital", title: "Real Hospital Environment", detail: "Live ward clinical rotations" },
    { icon: "placement", title: "Job Placement Assistance", detail: "Partner hospital tie-ups" },
    { icon: "faculty", title: "Experienced Faculty", detail: "CNOs & Certified Instructors" },
    { icon: "certified", title: "BLS & ACLS Certified", detail: "Recognized credentials" },
  ] satisfies { icon: TrainingTrustIcon; title: string; detail: string }[],
  image: {
    src: "/images/nursing-training/training-hero.jpg",
    alt: "Senior nurse teaching a group of nursing trainees beside a patient's bed in a hospital ward",
  },
  card: {
    title: "Nursing Training & Skills Development Center",
    location: "Kolathur, Chennai",
    description: "Hands-on ICU & Ward simulations with state-of-the-art medical equipment handling.",
    locationLabel: "Location:",
    hotlinesLabel: "Hotlines:",
  },
};

export type ProfileIcon = "diploma" | "anm" | "gnm" | "bsc" | "aide" | "ward";

export const traineeProfiles = {
  heading: "Who Can Enroll? Target Trainee Profiles",
  intro: "Immediate admission for clinical staff & healthcare aspirants across Tamil Nadu",
  profiles: [
    { icon: "diploma", label: "Diploma Nurses" },
    { icon: "anm", label: "A.N.M Nursing" },
    { icon: "gnm", label: "G.N.M Graduates" },
    { icon: "bsc", label: "B.Sc Nursing" },
    { icon: "aide", label: "Nursing Aides" },
    { icon: "ward", label: "GDAs & Ward Staff" },
  ] satisfies { icon: ProfileIcon; label: string }[],
};

export type PillarIcon = "clinical" | "certification" | "skills" | "emergency";

export const pillars = {
  eyebrow: "ADVANCED PRACTICAL TRAINING & DEVELOPMENT",
  heading: "The 4 Core Training Pillars",
  intro:
    "Comprehensive clinical masterclasses, international certifications, foundational nursing skills, and high-intensity emergency drills.",
  badge: "ISO 9001:2015 Certified Curriculum",
  cards: [
    {
      icon: "clinical",
      accent: "primary",
      label: "PILLAR 1",
      title: "Clinical Masterclass",
      items: ["Ventilator Management", "ICU Protocols & Critical Care", "Advanced Clinical Procedures"],
    },
    {
      icon: "certification",
      accent: "gold",
      label: "PILLAR 2",
      title: "Certifications",
      items: ["Basic Life Support (BLS)", "Advanced Cardiac Life Support (ACLS)", "Certified Master Instructors"],
    },
    {
      icon: "skills",
      accent: "primary",
      label: "PILLAR 3",
      title: "Skills Development",
      items: ["IV / IO Line Insertion", "Aseptic Wound Care & Dressing", "EKG Interpretation & EMR"],
    },
    {
      icon: "emergency",
      accent: "gold",
      label: "PILLAR 4",
      title: "Emergency Response",
      items: ["Code Blue Simulations", "Trauma Care Protocols", "Crisis Communication"],
    },
  ] satisfies {
    icon: PillarIcon;
    accent: "primary" | "gold";
    label: string;
    title: string;
    items: string[];
  }[],
};

export type CurriculumIcon = "procedures" | "emergency" | "curriculum";

export const curriculum = {
  eyebrow: "COMPREHENSIVE PROGRAM ARCHITECTURE",
  heading: "Detailed Clinical Procedures & Emergency Responsiveness",
  intro:
    "Direct practical drill breakdown across clinical procedures, emergency triage, core academic curriculum, and real hospital department rotations.",
  cards: [
    {
      icon: "procedures",
      title: "Clinical Procedures & Skills",
      intro: "Rigorous bedside clinical execution taught in real hospital wings under Senior Nurse Educators.",
      items: [
        "Aseptic Wound Care & Dressing",
        "IV Line Insertion & Fluid Management",
        "Medication Administration (Oral, IM, IV)",
        "Specimen Collection & Phlebotomy",
        "Vitals Monitoring & Fluid Logging",
        "Catheter & Tube Care",
      ],
    },
    {
      icon: "emergency",
      title: "Emergency Responsiveness",
      intro: "Instinctive rapid-response protocols to prevent patient deterioration and ensure survival outcomes.",
      items: [
        "CPR (Cardiopulmonary Resuscitation)",
        "Basic Life Support (BLS) Certification",
        "Basic First Aid & Bleeding Control",
        "Code Blue Drills & Simulations",
        "Trauma Care & Splinting",
        "Crisis Communication & Escalation",
      ],
    },
    {
      icon: "curriculum",
      title: "Curriculum & Department Rotations",
      intro: "Balanced theoretical foundation coupled with dynamic practical rotations and community outreach.",
      items: [
        "Clinical Pharmacology Fundamentals",
        "Patient Care Procedures & Documentation",
        "Healthcare Ethics & Communication",
        "Specialized Nursing Departments",
        "Medical Equipment Handling Drills",
        "Community Health Camp Deployments",
      ],
    },
  ] satisfies { icon: CurriculumIcon; title: string; intro: string; items: string[] }[],
};

export const comparison = {
  eyebrow: "QUALITY & COMPLIANCE GAP ANALYSIS",
  heading: "Ad-Hoc Shadowing vs. MedGold Structured OJT",
  intro:
    "Why Tamil Nadu's leading hospital networks are replacing unverified peer-shadowing with MedGold's standardized HSSC/TNC on-floor training cohorts.",
  caption: "Comparison of MedGold structured on-the-job training with conventional informal shadowing",
  columns: ["Evaluation Dimension", "MedGold Structured 14-Day OJT", "Conventional Informal Shadowing"] as [
    string,
    string,
    string,
  ],
  rows: [
    [
      "Curriculum Rigor & Alignment",
      "Standardized 6-pillar syllabus mapped directly to HSSC QP-GDA & NABH 5th Edition Chapter on Human Resource Management.",
      "Unstandardized word-of-mouth training passed down informally by senior wardboys without curriculum documentation.",
    ],
    [
      "Clinical Trainer Credentials",
      "Led by retired Nursing Superintendents, NABH Certified Lead Assessors, and HSSC Master Trainers.",
      "Rushed peers on active shift duty who have minimal pedagogical training or time to instruct properly.",
    ],
    [
      "Infection Control & BMW",
      "Practical 7-step handrub audits with UV detection, BMW 2016 color bin compliance test, and sharps safety certification.",
      "Frequent cross-contamination risks, erratic bin selection, and habitual needle capping leading to sharps accidents.",
    ],
    [
      "Patient Ergonomics & Falls",
      "Hands-on slider board transfers, Morse Fall risk protocols, reducing hospital inpatient falls by over 42%.",
      "Dangerous pulling techniques causing caregiver lumbar strain, shoulder dislocations, and preventable patient slips.",
    ],
    [
      "Audit Traceability & Records",
      "Individual verified competency scorecards, digital attendance logs, and verifiable photo documentation for NABH assessors.",
      "Blank or signed-off blank sheets without quantifiable clinical proof, triggering frequent NABH audit non-conformances (NCs).",
    ],
  ] as [string, string, string][],
};

export const planner = {
  eyebrow: "HOSPITAL PLANNING TOOL",
  heading: "Interactive OJT Cohort & Syllabus Planner",
  intro:
    "Configure your hospital's workforce requirements below to estimate on-premise trainer deployment timeframes and cohort structuring.",
  capacityLegend: "1. Hospital Operational Capacity",
  batchLegend: "2. Target GDA / Ward Aide Batch Size",
  capacityOptions: [
    { id: "daycare", label: "Daycare / 30 Beds" },
    { id: "mid", label: "50 - 100 Beds" },
    { id: "large", label: "100 - 300 Beds" },
    { id: "multi", label: "300+ Multi-Unit" },
  ],
  batchOptions: [
    { id: "xs", label: "10 - 20 Aides" },
    { id: "sm", label: "21 - 40 Aides" },
    { id: "md", label: "41 - 80 Aides" },
    { id: "lg", label: "80+ Aides" },
  ],
  focusLegend: "3. Select Critical Ward Focus Areas",
  focusAreas: [
    "Bedside Vitals & TPR Recording",
    "Zero-Strain Ergonomic Transfers",
    "Infection Control & BMW 2016",
    "Emergency Code Blue & BLS CPR",
    "Hospital Etiquette & Tamil/Eng Soft Skills",
    "Catheter, Tube & Drain Safety",
  ],
  output: {
    eyebrow: "RECOMMENDED DEPLOYMENT MODEL",
    badge: "Hospital On-Premise",
    formatLabel: "Program Format",
    ratioLabel: "Trainer-to-Aide Ratio",
    batchesLabel: "Shift Rotation",
    complianceLead: "NABH Compliance Guarantee:",
    compliance:
      "Every certified aide receives an individual laminated skill checklist, pre/post audit scorecard, and verifiable digital verification QR code compliant with NABH 5th edition staff competency files.",
    cta: "Confirm Cohort Specification & Book Dates",
    ctaNote: "Opens WhatsApp with your selections filled in.",
  },
} as const;

export type AssuranceIcon = "nda" | "schedule" | "card";

export const requisition = {
  eyebrow: "HOSPITAL INSTITUTIONAL REQUISITION",
  heading: "Request In-Hospital OJT Assessment & Cohort Dates",
  intro:
    "Our clinical training directorate will conduct a preliminary ward walkthrough and aide skill baseline appraisal before deploying instructors.",
  assurances: [
    { icon: "nda", text: "Institutional NDA guaranteed prior to ward floor presence" },
    { icon: "schedule", text: "Curriculum adapted to your hospital's specific HIS & shift rosters" },
    { icon: "card", text: "Laminated individual competency cards awarded upon certification" },
  ] satisfies { icon: AssuranceIcon; text: string }[],
  deskHeading: "MedGold Healthcare Enrollment Desk:",
  phoneLabel: "Phone / WhatsApp:",
  emailLabel: "Email:",
  webLabel: "Web:",
  confidential: "Confidential Hospital Assessment",
  submit: "Submit Requisition",
  submitNote: "Submitting opens WhatsApp with your requisition ready to send.",
  aidesOptions: [
    "10 to 25 Attendants / GDAs (Single Cohort)",
    "26 to 50 Attendants / GDAs (Two Cohorts)",
    "51 to 100 Attendants / GDAs (Multi-Cohort)",
    "100+ Attendants / GDAs (Rolling Programme)",
  ],
  timelineOptions: [
    "Immediate (Within next 7-10 days)",
    "Within the next 30 days",
    "In 1 to 3 months",
    "Planning for next quarter",
  ],
} as const;
