/** Copy for the Patient Feedback System service page, previewed at /dev/patient-feedback-collection-system-integration-services. */
export const PATIENT_FEEDBACK_SEO = {
  title: "Patient Feedback System for Hospitals in Chennai",
  description:
    "Hospital patient feedback software in Chennai: bedside tablets, bilingual kiosks, real-time red alerts, 24-hour service recovery and NABH-ready audit reports.",
};

export const breadcrumb = {
  current: "Patient Feedback System (SOP-PFS)",
  badge: "Patient Feedback System (SOP-PFS)",
  compliance: "DISHA Compliant",
} as const;

export const hero = {
  eyebrow: "MEDGOLD HEALTHCARE • PROFESSIONAL HEALTHCARE CONSULTANTS",
  heading: "Patient Feedback System",
  tagline: "Transform Patient Voices into Actionable Quality Improvement",
  callout: {
    title: "SOFTWARE SOLUTIONS: OUR INTEGRATED FEEDBACK SOFTWARE",
    text: "Our integrated feedback software platform provides real-time data access, detailed trend analysis, and comprehensive performance dashboards for all hospital levels.",
  },
  primaryCta: "Schedule Free System Audit Demo",
  callLabel: "Call:",
  tiles: [
    { value: "Real-Time", label: "Data Access" },
    { value: "<24 Hrs", label: "Service Recovery" },
    { value: "Red Alert", label: "Negative Reviews" },
    { value: "NABH/JCI", label: "Compliance Audits", accent: true },
  ],
  image: {
    src: "/images/patient-feedback/feedback-hero.jpg",
    alt: "Doctor and nurse showing an elderly inpatient a feedback survey on a tablet at his bedside",
  },
  dashboard: {
    title: "Patient Feedback System (SOP-PFS)",
    badge: "Live Dashboard",
    value: "98.4%",
    percent: 94.6,
    label: "Patient Voice Captured",
    scope: "All Hospital Levels",
    contactLabel: "Direct contact:",
  },
} as const;

export const stats = [
  { value: "2.8M+", label: "Surveys Captured", detail: "Verified IPD & OPD touchpoints in Tamil Nadu" },
  { value: "<10 Min", label: "Escalation Mean Time", detail: "Critical incident to Duty Medical Superintendent" },
  { value: "+82 NPS", label: "Average Score Growth", detail: "Measured after 6 months of SOP-PFS deployment" },
  { value: "100%", label: "NABH 5th Ed CQI Ready", detail: "Automated Continuous Quality Improvement logs" },
] as const;

export type TouchpointIcon = "tablet" | "kiosk" | "telemetry";

export const touchpoints = {
  eyebrow: "MULTIMODAL FIELD ARCHITECTURE",
  heading: "Three Pillars of Patient Capture",
  intro:
    "From pre-discharge bedside evaluations to multilingual counter kiosks and executive real-time command dashboards, MedGold eliminates the feedback drop-off gap.",
  standard: "NABH Chapter CQI Standard Operating Protocols",
  items: [
    {
      icon: "tablet",
      title: "Bedside IPD Digital Rounds",
      text: "Standardized daily bedside evaluations led by dedicated Patient Care Coordinators. Evaluates nursing responsiveness, consultant bedside manner, dietary services, and room sanitation prior to patient discharge.",
      badge: "98.2% IPD Coverage",
      footer: "Resolution: Immediate On-Floor",
      image: {
        src: "/images/patient-feedback/touchpoint-bedside.jpg",
        alt: "Doctor and nurse collecting feedback from an inpatient on a tablet in a hospital room",
      },
    },
    {
      icon: "kiosk",
      title: "Discharge & OP Bilingual Kiosks",
      text: "Ultra-fast 30-second touchpoints localized in Tamil and English located at pharmacy queues, discharge billing counters, and radiology reception zones to stop grievance escalations after discharge.",
      badge: "32s Avg Completion",
      footer: "Bilingual: Tamil & English",
      image: {
        src: "/images/patient-feedback/touchpoint-kiosk.jpg",
        alt: "Smiling patient rating her visit on a touchscreen feedback kiosk at a hospital counter",
      },
    },
    {
      icon: "telemetry",
      title: "Command Center & Escalation Telemetry",
      text: "Live sentiment heatmaps, department root-cause drill-downs, automated SMS to the Medical Director for 1-star ratings, and continuous CAPA tracking compliant with state healthcare audits.",
      badge: "Real-Time Sync",
      footer: "Alert SLA: <10 Minutes",
      image: {
        src: "/images/patient-feedback/touchpoint-command.jpg",
        alt: "Hospital managers reviewing live patient sentiment dashboards on a large command center screen",
      },
    },
  ] satisfies {
    icon: TouchpointIcon;
    title: string;
    text: string;
    badge: string;
    footer: string;
    image: { src: string; alt: string };
  }[],
};

export type WorkflowIcon = "collect" | "categorize" | "alert" | "recover" | "report";
export type WorkflowAccent = "primary" | "destructive" | "gold";

export type WorkflowStage = {
  icon: WorkflowIcon;
  accent: WorkflowAccent;
  title: string;
  highlight?: string;
  items: { strong?: string; text?: string; strongAfter?: string }[];
};

const workflowStages: WorkflowStage[] = [
    {
      icon: "collect",
      accent: "primary",
      title: "Data Collection",
      items: [
        { strong: "Digital Kiosks", text: " (Discharge Desks)" },
        { strong: "Automated SMS/WhatsApp", text: " Forms" },
        { strong: "In-Room QR Codes" },
      ],
    },
    {
      icon: "categorize",
      accent: "primary",
      title: "Smart Categorization",
      items: [
        { text: "Categorizes feedback by department" },
        { text: "Identify specific service issues" },
        { text: "Categorize by: ", strongAfter: "Doctor, Nurse, Facility" },
      ],
    },
    {
      icon: "alert",
      accent: "destructive",
      title: "Real-Time Alerts",
      highlight: "Red Alert for Negative Reviews",
      items: [{ text: "Immediately alerts management via SMS/Email" }, { text: "Catch issues before they escalate" }],
    },
    {
      icon: "recover",
      accent: "gold",
      title: "Service Recovery",
      items: [
        { strong: "Prompt Follow-Up", text: " (within 24 hours)" },
        { text: "Address grievances effectively" },
        { text: "Log resolution steps" },
      ],
    },
    {
      icon: "report",
      accent: "primary",
      title: "Quality Audits & Reports",
      items: [
        { text: "Monthly Quality Audit Reports" },
        { text: "Analyze NPS and satisfaction trends" },
        { text: "Insights for staff training & upgrades" },
      ],
    },
];

export const workflow = {
  eyebrow: "OPERATIONAL METHODOLOGY",
  heading: "5-Stage System Workflow",
  intro:
    "Transforming real-time patient input into standardized clinical governance and verified quality improvement.",
  stages: workflowStages,
};

export const benefits = {
  eyebrow: "HOSPITAL GROWTH & EXCELLENCE",
  heading: "System Benefits for Your Hospital",
  intro: "Designed to strengthen clinical reputation, patient loyalty, and institutional accreditation compliance.",
  items: [
    {
      title: "Boost Patient Retention",
      text: "Engaged patients feel heard, drastically increasing return visits and long-term loyalty.",
    },
    {
      title: "Improve Care Quality",
      text: "Actionable insights drive targeted clinical training, nursing excellence, and facility upgrades.",
    },
    {
      title: "Reduce Negative Online Reviews",
      text: "Immediate real-time service recovery resolves patient issues before they reach social channels or Google.",
      gold: true,
    },
    {
      title: "Maintain Compliance Standards",
      text: "Comprehensive automated audit logs aligned directly with NABH & JCI accreditation protocols.",
    },
  ],
  survey: {
    caption: "Example of the bedside kiosk satisfaction survey",
    title: "Satisfaction Survey",
    badge: "Bedside Kiosk UI",
    question: "How was your care experience today?",
    rating: "4.8 out of 5.0 Rating",
    bars: [
      { label: "Doctor Communication", value: "Excellent", percent: 96 },
      { label: "Nursing Care & Promptness", value: "98% Positive", percent: 98 },
    ],
    button: "Submit Review & Trigger SLA",
  },
};

export const estimator = {
  eyebrow: "DYNAMIC DEPLOYMENT ESTIMATOR",
  heading: "Configure Your Hospital's Feedback Infrastructure",
  intro:
    "Select your operational capacity to estimate hardware footprint, patient coordinator staff allocation, and SLA guarantees.",
  capacityLegend: "Step 1: Hospital Operational Bed Footprint",
  capacityOptions: [
    { id: "daycare", label: "Daycare / 30 Beds" },
    { id: "mid", label: "50 - 100 Beds" },
    { id: "large", label: "100 - 300 Beds" },
    { id: "tertiary", label: "300+ Tertiary" },
  ],
  touchpointLegend: "Step 2: Active Digital Feedback Touchpoints",
  touchpointOptions: [
    { id: "tablets", label: "Bedside IPD Inpatient Tablets" },
    { id: "kiosks", label: "Discharge & Billing Counter Kiosks" },
    { id: "qr", label: "Pharmacy & OPD Waiting QR Codes" },
    { id: "er", label: "Emergency Room (ER) Fast-Track Feedback" },
  ],
  protocolHeading: "Step 3: Protocol SLA Options",
  protocols: ["Immediate SMS to Duty MS (<10 mins)", "Automated NABH CQI Audit Reports"],
  output: {
    heading: "Deployment Blueprint",
    badge: "Ready to Pilot",
    tabletsLabel: "Recommended Bedside Tablets:",
    coordinatorsLabel: "Dedicated Patient Care Coordinators:",
    slaLabel: "Grievance Escalation SLA:",
    npsLabel: "Target NPS Uplift (90 Days):",
    accreditationLabel: "Accreditation Support:",
    cta: "Lock In Architecture SLA & Request Pilot",
    ctaNote: "No-cost initial bedside simulation conducted in Chennai.",
  },
} as const;

export const cta = {
  eyebrow: "PROUDLY PRESENTED BY MEDGOLD HEALTHCARE | PROFESSIONAL HEALTHCARE CONSULTANTS",
  heading: "Ready to Measure and Improve Patient Satisfaction?",
  subheading: "Contact Us for a FREE SYSTEM AUDIT DEMO",
  intro:
    "Get an in-depth on-site audit demonstration with automated grievance capture, SMS alerts, and NABH compliance reports.",
  shareFields: [
    "Healthcare Facility / Hospital Name",
    "Medical Director / Operations Head Name",
    "Official Email ID",
    "Direct Phone / WhatsApp",
    "Total Hospital Bed Capacity & OP Volume",
    "Feedback Channels Desired",
    "Specific Service Recovery Pain Points / Target Timeline",
  ],
  note: "Signed Institutional Non-Disclosure Agreement (NDA) available prior to demonstration.",
  button: "Request Free System Audit Demo",
} as const;
