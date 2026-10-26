/** Copy for the Nursing Training service page. */
export const NURSING_TRAINING_SEO = {
  title: "Nursing Training & Skills Development in Chennai",
  description:
    "Hands-on nursing training in Chennai: ventilator handling, CPR, BLS & ACLS, ICU protocols and patient care in a real hospital, with job placement assistance.",
};

export const breadcrumb = {
  current: "Nursing Training & Skills Development Program",
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
    alt: "Senior nurse educator teaching a group of nursing trainees beside a training manikin in a hospital skills lab",
  },
  card: {
    title: "Nursing Training & Skills Development Center",
    location: "Kolathur, Chennai",
    description: "Hands-on ICU & Ward simulations with state-of-the-art medical equipment handling.",
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
  shareFields: [
    "Hospital / Healthcare Facility Name",
    "Contact Official & Designation",
    "Official Hospital Email ID",
    "Contact Phone / WhatsApp",
    "Estimated Number of Aides to Train",
    "Preferred Cohort Start Timeline",
    "Specific Inpatient Challenges / Priority Areas",
  ],
  confidential: "Confidential Hospital Assessment",
  cta: "Request Hospital Assessment",
} as const;

export const NURSING_TRAINING_SERVICE = {
  name: "Nursing Training & Skills Development Program",
  serviceType: "Nursing training and skills development",
  areaServed: "Tamil Nadu",
} as const;

export const overview = {
  eyebrow: "PROGRAM OVERVIEW",
  heading: "About the Nursing Training & Skills Development Program",
  paragraphs: [
    "Med Gold Healthcare runs a nursing training and skills development program from Kolathur in Chennai for hospitals and for people building a healthcare career. Training takes place in a real hospital environment with live ward clinical rotations, so trainees practise on the floor and not only in a classroom. Sessions are led by experienced faculty that includes chief nursing officers, senior nurse educators and certified instructors.",
    "The program is open to diploma nurses, A.N.M and G.N.M graduates, B.Sc nursing graduates, nursing aides, general duty assistants and ward staff across Tamil Nadu. The syllabus is built on four core pillars. The clinical masterclass covers ventilator management, ICU protocols and critical care. The certification pillar prepares trainees for Basic Life Support (BLS) and Advanced Cardiac Life Support (ACLS). Skills development covers IV and IO line insertion, aseptic wound care, EKG interpretation and EMR use. Emergency response covers Code Blue simulations, trauma care protocols and crisis communication.",
    "For hospitals, Med Gold also delivers structured on-the-job training on the hospital premises. Before instructors are deployed, our clinical training team carries out a ward walkthrough and a baseline appraisal of aide skills. The curriculum is adapted to the hospital's HIS and shift rosters. An institutional NDA is signed before any ward floor presence and each certified aide receives a laminated individual competency card. Trainees who complete the program also get job placement assistance through our partner hospital tie-ups.",
  ],
  faqHeading: "Nursing training FAQs",
  faqs: [
    {
      question: "Who can enroll in the nursing training program?",
      answer:
        "Diploma nurses, A.N.M and G.N.M graduates, B.Sc nursing graduates, nursing aides, general duty assistants and ward staff can enroll. Admission is open to clinical staff and healthcare aspirants across Tamil Nadu.",
    },
    {
      question: "Where does the training take place?",
      answer:
        "Training is based at our nursing training and skills development center in Kolathur, Chennai and includes live ward clinical rotations in a real hospital environment. Hospitals can also book on-premise cohorts for their own staff.",
    },
    {
      question: "Which certifications does the program cover?",
      answer:
        "The program prepares trainees for Basic Life Support (BLS) and Advanced Cardiac Life Support (ACLS) with certified instructors. The curriculum is ISO 9001:2015 certified.",
    },
    {
      question: "Do you help trainees find jobs?",
      answer: "Yes. Trainees get job placement assistance through Med Gold partner hospital tie-ups.",
    },
    {
      question: "How can a hospital book an on-site training cohort?",
      answer:
        "Use the hospital assessment request on this page or contact us. We start with a ward walkthrough and a skill baseline of your aides, then plan the cohort around your shift rosters.",
    },
  ],
} as const;
