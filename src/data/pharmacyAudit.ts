/** Copy for the Pharmacy Stock Audit & Profit Consulting service page, previewed at /dev/services/pharmacy-audit. */
export const PHARMACY_AUDIT_SEO = {
  title: "Pharmacy Stock Audit & Profit Consulting",
  description:
    "We help hospital and retail pharmacies eliminate dead stock, halt expiry leakage, enforce SOPs and KPI/KRA frameworks, and build high-profit operations.",
};

export const breadcrumb = {
  current: "Pharmacy Stock Audit & Profit Consulting",
  tagline: "Reduce Losses • Increase Profit • Scale Faster",
};

export type HeroFeatureIcon = "verify" | "sop" | "kpi" | "liquidation";

export const hero = {
  badge: "Complete Stock Audit, SOPs & Profit Improvement Consulting",
  heading: "Turn Your Pharmacy Into A High-Profit Business",
  intro:
    "We help hospital and retail pharmacies eliminate dead stock, halt expiry leakage, enforce standard SOPs, implement KPI/KRA frameworks, and transform into predictable high-profit retail & clinical operations.",
  chips: [
    { label: "100+ Pharmacies Consulted", accent: false },
    { label: "5+ Years Experience", accent: false },
    { label: "Proven Systems & Processes", accent: false },
    { label: "Measurable Results", accent: true },
  ],
  features: [
    { icon: "verify", label: "100% Physical Stock Verification" },
    { icon: "sop", label: "Standardized SOP Enforcement" },
    { icon: "kpi", label: "Owner & Staff KPI / KRA Systems" },
    { icon: "liquidation", label: "Fast Dead-Stock Expiry Liquidation" },
  ] satisfies { icon: HeroFeatureIcon; label: string }[],
  primaryCta: "Book Business Diagnostic",
};

export const snapshot = {
  title: "Diagnostic Snapshot",
  region: "South India Command",
  chartLabel: "Pharmacy Stock Turnover Ratio",
  chartValue: "4.8x Active Benchmark",
  bars: [16, 20, 24, 28, 32, 36, 40],
  milestones: ["Audit Day 1", "SOP Rollout", "KPI Tracking", "Target"],
  stats: [
    { value: "100+", label: "Pharmacies Consulted", accent: false },
    { value: "-85%", label: "Expiry Discard Shrinkage", accent: true },
    { value: "+24%", label: "Gross Margin Uplift", accent: false },
    { value: "<48h", label: "Rapid Diagnostic Audit", accent: false },
  ],
  emailLabel: "Email:",
};

export const evidenceStats = [
  { value: "100+", label: "Pharmacies Consulted" },
  { value: "5+ Yrs", label: "Specialized Experience" },
  { value: "₹4.8 Cr+", label: "Dead Stock & Expiry Reclaimed" },
  { value: "100%", label: "Proven Systems & Measurable ROI" },
] as const;

export type ProblemIcon =
  | "dead-stock"
  | "expired"
  | "slow-moving"
  | "staff"
  | "purchase"
  | "leakage"
  | "sop"
  | "kpi";

export const problems = {
  eyebrow: "Operational diagnostic alert",
  heading: "Is Your Pharmacy Losing Money Without Knowing It?",
  intro:
    "Most pharmacy owners focus entirely on top-line sales while undetected operational leakages bleed bottom-line profits every single month.",
  cards: [
    { icon: "dead-stock", title: "Dead Stock", description: "Capital trapped on back shelves with unsold, non-moving formulations." },
    { icon: "expired", title: "Expired Medicines", description: "Direct monthly write-offs due to missed return-to-vendor deadlines." },
    { icon: "slow-moving", title: "Slow Moving Inventory", description: "High inventory holding costs draining vital operating working capital." },
    { icon: "staff", title: "Staff Productivity Issues", description: "Lack of role clarity, weak counter salesmanship, and uneven shifts." },
    { icon: "purchase", title: "Poor Purchase Planning", description: "Over-ordering non-essentials while running out of high-demand staples." },
    { icon: "leakage", title: "Revenue Leakage", description: "Unbilled items, pilferage, inaccurate credit discounts, and cashier gaps." },
    { icon: "sop", title: "No SOP System", description: "Chaotic daily operations dependent entirely on owner physical presence." },
    { icon: "kpi", title: "No KPI Tracking", description: "Zero performance measurement, leaving staff with no goals or accountability." },
  ] satisfies { icon: ProblemIcon; title: string; description: string }[],
};

export type ResultIcon = "profit" | "inventory" | "staff" | "cash" | "retention" | "control";

export const results = {
  heading: "Results You Can Expect",
  quote: "“What Gets Measured Gets Improved. Let Us Find Hidden Profit Opportunities Inside Your Pharmacy.”",
  items: [
    { icon: "profit", label: "Increase Profitability" },
    { icon: "inventory", label: "Reduce Inventory Losses" },
    { icon: "staff", label: "Improve Staff Productivity" },
    { icon: "cash", label: "Better Cash Flow" },
    { icon: "retention", label: "Higher Customer Retention" },
    { icon: "control", label: "Strong Operational Control" },
  ] satisfies { icon: ResultIcon; label: string }[],
};

export type FrameworkIcon = "health" | "stock" | "sop" | "kpi" | "growth";

export type FrameworkStep = {
  icon: FrameworkIcon;
  title: string;
  description: string;
  bullets?: readonly string[];
  bulletColumns?: readonly (readonly string[])[];
  kpis?: readonly { label: string; items: string }[];
};

export const framework = {
  eyebrow: "Complete pharmacy business consulting solution",
  heading: "The 5-Step Pharmacy Transformation Framework",
  intro:
    "Our structured end-to-end consulting model equips hospital and community pharmacies with foolproof systems, automated audits, and accountable performance culture.",
  steps: [
    {
      icon: "health",
      title: "Pharmacy Health Check",
      description: "Comprehensive 360° diagnostic covering all physical and financial health parameters.",
      bullets: [
        "Current Operations Review",
        "Inventory Assessment & Turnover",
        "Purchase Pattern Analysis",
        "Sales Analysis & Margin Leakage",
        "Financial Review & Working Capital",
      ],
    },
    {
      icon: "stock",
      title: "Stock Audit & Inventory Optimization",
      description: "Full physical verification and data alignment to liberate trapped liquid cash.",
      bullets: [
        "100% Physical Stock Verification",
        "Expiry Management & Early Alert",
        "Dead Stock Identification & Returns",
        "Fast Moving Product Analysis (A/B/C)",
        "Inventory Turnover Improvement",
      ],
    },
    {
      icon: "sop",
      title: "SOP Implementation",
      description:
        "Standardized Operating Procedures ensuring system-driven rather than people-dependent operations.",
      bullets: [
        "Purchase SOP (Vendor terms & POs)",
        "Sales & Customer Handling SOP",
        "Billing & Cash Counter Audit SOP",
        "Storage & Cold-Chain Maintenance SOP",
        "Audit & Statutory Compliance SOP",
      ],
    },
    {
      icon: "kpi",
      title: "KPI & KRA Implementation",
      description: "Clear accountability frameworks divided between business ownership and counter staff.",
      kpis: [
        { label: "Owner KPIs:", items: "Revenue Growth • Gross Margin • Net Profit • Inventory Turnover" },
        {
          label: "Staff KPIs:",
          items: "Sales Productivity • Customer Service • Stock Accuracy • Attendance & Discipline",
        },
      ],
    },
    {
      icon: "growth",
      title: "Business Growth Strategy",
      description:
        "Actionable blueprints for scaling customer footfall, increasing transaction size, and driving multi-branch expansion.",
      bulletColumns: [
        ["New Revenue Streams & Wellness Lines", "Generic Conversion Strategy & Margins", "Product Mix Optimization"],
        ["Digital Marketing & Local Outreach", "Customer Retention & Refill Loyalty", "Expansion & Multi-Outlet Planning"],
      ],
    },
  ] satisfies FrameworkStep[],
};

export const comparison = {
  eyebrow: "Measurable operational transformation",
  heading: "Before vs. After Transformation Comparison",
  intro:
    "Documented outcomes comparing ad-hoc unmonitored pharmacy management with MedGold governed operations.",
  columns: ["Business Parameter", "Before MedGold", "After MedGold Consulting", "Financial & Operational ROI"],
  rows: [
    {
      parameter: "Dead Stock & Inventory",
      before: "High Dead Stock & Unsold Batches",
      after: "Optimized & High-Turnover Inventory",
      roi: "₹2.4L - ₹6.8L Cash Unlocked",
    },
    {
      parameter: "Inventory Turnover Ratio",
      before: "Low Turnover, Stagnant Working Capital",
      after: "High Inventory Velocity & Smart Refills",
      roi: "3.5x - 5.0x Speed Acceleration",
    },
    {
      parameter: "Profitability Clarity",
      before: "Unclear Profitability, Hidden Leakage",
      after: "Increased Net Profitability & Real Margins",
      roi: "+18% to +26% Margin Growth",
    },
    {
      parameter: "Staff Accountability",
      before: "Staff Not Accountable, Low Productivity",
      after: "Motivated, KPI-Driven & Productive Staff",
      roi: "Zero Unresolved Discrepancies",
    },
    {
      parameter: "Operating Systems",
      before: "No SOP or Defined Workflow Process",
      after: "Structured SOP-Driven Operations",
      roi: "Owner-Independent Execution",
    },
    {
      parameter: "Cash Flow Health",
      before: "Cash Flow Problems & Vendor Due Pressure",
      after: "Healthy, Predictable Working Capital Cycle",
      roi: "Timely Discount Capture",
    },
    {
      parameter: "Business Trajectory",
      before: "Business Stagnant & Vulnerable to Loss",
      after: "Continuous Expansion & Scalable Growth",
      roi: "Sustainable Multi-Branch Model",
    },
  ],
} as const;

export const whyMedGold = {
  eyebrow: "Why MedGold Healthcare?",
  heading: "Practical Expertise That Delivers Measurable Profit",
  points: [
    "Healthcare Industry Experts",
    "Practical Pharmacy Experience",
    "Data Driven Consulting",
    "Customized Solutions",
    "Sustainable Growth Model",
    "End-to-End Implementation",
  ],
} as const;

export const philosophy = {
  eyebrow: "Core philosophy",
  quote: "“Most Pharmacies Focus on Sales. We Focus on Profits.”",
  body: "Small systematic improvements across purchasing, stock rotations, and staff productivity compound into massive bottom-line results.",
  hotlineLabel: "Consulting Hotline:",
} as const;

export const approach = {
  eyebrow: "Methodology & phasing",
  heading: "Our 5-Stage Consulting Approach",
  intro:
    "A proven, structured execution cycle that seamlessly installs systems into your pharmacy with zero operational downtime.",
  stages: [
    { title: "Analyze", description: "Study the pharmacy business deeply through operations, purchases, and ledger review." },
    { title: "Strategize", description: "Create a customized action plan targeting your specific leakage points and dead stock." },
    { title: "Implement", description: "Execute proven SOPs, stock reconciliation, and train staff on standard protocols." },
    { title: "Monitor", description: "Track owner & staff KPI performance continuously with milestone audits." },
    { title: "Improve", description: "Optimize margins, scale generic conversion, and drive lasting multi-unit growth." },
  ],
} as const;

export type BookingBenefitIcon = "profit" | "systems" | "customers" | "growth";

export const booking = {
  eyebrow: "Fast-track business transformation",
  heading: "Book Your Pharmacy Business Audit Today!",
  intro:
    "Discover Hidden Profit Opportunities Inside Your Pharmacy. Connect directly with our Senior Pharmacy Business Consultants.",
  benefits: [
    { icon: "profit", title: "More Profit", text: "Better Bottom Line" },
    { icon: "systems", title: "Better Systems", text: "Smoother Operations" },
    { icon: "customers", title: "Happier Customers", text: "Stronger Loyalty" },
    { icon: "growth", title: "Sustainable Growth", text: "Long Term Success" },
  ] satisfies { icon: BookingBenefitIcon; title: string; text: string }[],
  confidentiality: "Complete business confidentiality assured. Strict NDA guaranteed.",
  cta: "Book Diagnostic Consultation",
  ctaNote: "Opens our Contact Us page.",
};
