import { absoluteUrl } from "@@/config/site";
import { DevRoutes } from "@@/config/routes";

/** Copy for the Hospital Branding & Marketing service page, previewed at /dev/hospital-clinic-branding-marketing-services. */
export const BRANDING_PAGE_URL = absoluteUrl(DevRoutes.BRANDING);

export const BRANDING_SEO = {
  title: "Hospital Branding & Digital Marketing Services in Chennai",
  description:
    "Hospital branding and digital marketing in Chennai: Google and Meta ads, SEO, doctor branding, reputation management and patient lead generation for clinics.",
};

export const breadcrumb = {
  current: "Digital Marketing & Hospital Growth Solutions",
  badge: "Brochure Certified",
  specialist: "Healthcare-Specialized Agency",
  compliance: "Ethical Medical Marketing (NMC Aligned)",
} as const;

export type PromiseIcon = "visibility" | "patients" | "revenue" | "brand";

export const hero = {
  eyebrow: "DIGITAL MARKETING & HOSPITAL GROWTH SOLUTIONS",
  heading: { first: "GROW YOUR HOSPITAL.", second: "INCREASE PATIENTS.", third: "BUILD YOUR BRAND." },
  intro:
    "Transform your healthcare business with result-driven digital marketing, branding & growth strategies. We empower hospitals, specialty centers, clinics, and doctors to dominate patient mindshare and scale revenue predictably.",
  promises: [
    { icon: "visibility", title: "More Visibility", text: "Top Google & Social" },
    { icon: "patients", title: "More Patients", text: "High-Intent Leads" },
    { icon: "revenue", title: "More Revenue", text: "Predictable OPD & IPD" },
    { icon: "brand", title: "Stronger Brand", text: "Doctor Trust & ORM" },
  ] satisfies { icon: PromiseIcon; title: string; text: string }[],
  primaryCta: "Book a Free Hospital Growth Consultation",
  callLabel: "Call:",
  quote: {
    title: 'OUR PROMISE: "MORE VISIBILITY • MORE PATIENTS • MORE REVENUE"',
    text: '"We don\'t just market hospitals. We build healthcare brands and growth ecosystems."',
  },
  dashboard: {
    title: "HOSPITAL DIGITAL GROWTH DASHBOARD",
    badge: "Live Telemetry",
    caption: "Illustrative dashboard. Figures are examples, not client results.",
    metrics: [
      { label: "REVENUE GROWTH", value: "+35.6%", detail: "Across OPD & IPD Surgeries", gold: true },
      { label: "PATIENT ENQUIRIES", value: "8,320", change: "+18.7%", detail: "Verified Qualified Leads" },
    ],
    channelsLabel: "Targeted Multichannel Reach:",
    channels: [
      { id: "facebook", label: "Facebook", short: "f" },
      { id: "instagram", label: "Instagram", short: "ig" },
      { id: "google", label: "Google", short: "G" },
      { id: "youtube", label: "YouTube", short: "▶" },
    ],
  },
  photos: [
    {
      src: "/images/branding/doctor-consult.jpg",
      alt: "Senior doctor reviewing a patient file with a colleague on a hospital ward",
      label: "Doctor Authority & Trust",
    },
    {
      src: "/images/branding/hospital-interior.jpg",
      alt: "Modern hospital recovery room with clinical equipment beside the bed",
      label: "Hospital Brand Loyalty",
    },
  ],
  squad: { text: "Dedicated Healthcare Growth Squad: Chennai & Tamil Nadu", badge: "100% Focused" },
} as const;

export const banner = {
  heading: "BUILDING INDIA’S NEXT ₹100 CRORE HEALTHCARE ECOSYSTEM",
  text: "Scaling clinical excellence, patient trust, and sustainable multi-specialty profitability.",
  tags: ["Healthcare Growth", "Digital Marketing", "Hospital Branding", "Business Development"],
} as const;

export type GrowthServiceIcon =
  | "digital"
  | "branding"
  | "leads"
  | "ads"
  | "social"
  | "website"
  | "doctor"
  | "orm"
  | "reviews"
  | "content"
  | "business"
  | "revenue";

export type Tone = "primary" | "gold";

export const services = {
  eyebrow: "COMPREHENSIVE MEDICAL MARKETING & BUSINESS VERTICAL",
  heading: "Our Healthcare Growth Services",
  intro:
    "A 360° growth engine tailored exclusively for hospitals, specialty centers, and doctors. We handle everything from patient acquisition to institutional brand supremacy.",
  items: [
    {
      icon: "digital",
      tone: "primary",
      title: "Healthcare Digital Marketing",
      text: "Customized multi-channel digital campaigns designed specifically for clinical specialties to drive patient enquiries across catchment areas.",
      outcome: "High-Precision Medical Reach",
    },
    {
      icon: "branding",
      tone: "gold",
      title: "Hospital Branding & Positioning",
      text: "Carve a unique identity that sets your hospital apart from competitors. Establish premium clinical authority and patient loyalty in your city.",
      outcome: "Brand Equity & Recall",
    },
    {
      icon: "leads",
      tone: "primary",
      title: "Patient Lead Generation Campaigns",
      text: "High-converting digital funnels targeting patients actively searching for specific surgeries, consultations, scans, and specialty treatments.",
      outcome: "Pre-Qualified Inbound Leads",
    },
    {
      icon: "ads",
      tone: "gold",
      title: "Google Ads & Meta Ads Management",
      text: "Targeted Search, Display, Facebook & Instagram ads compliant with medical advertising regulations, optimized to minimize cost-per-patient-booking.",
      outcome: "Maximum ROI Ad Optimization",
    },
    {
      icon: "social",
      tone: "primary",
      title: "Social Media Marketing",
      text: "Engaging visual content, health awareness reels, doctor showcase videos, and patient success testimonials that cultivate an active community.",
      outcome: "Hyper-Local Community Engagement",
    },
    {
      icon: "website",
      tone: "gold",
      title: "Website Development & SEO",
      text: "High-speed, mobile-first hospital websites with direct appointment booking integrations, ranked #1 on Google for high-value treatment keywords.",
      outcome: "Organic Search Dominance",
    },
    {
      icon: "doctor",
      tone: "primary",
      title: "Doctor Personal Branding",
      text: "Transform leading surgeons, specialists, and consultants into trusted regional thought leaders via LinkedIn, video podcasts, and press features.",
      outcome: "Physician Celebrity Authority",
    },
    {
      icon: "orm",
      tone: "gold",
      title: "Online Reputation Management (ORM)",
      text: "Proactive review defense, negative feedback mitigation, and reputation protection on Google Maps, Practo, JustDial, and social channels.",
      outcome: "5-Star Patient Sentiment",
    },
    {
      icon: "reviews",
      tone: "primary",
      title: "Patient Review & Feedback System",
      text: "Automated post-discharge WhatsApp and SMS review prompts that channel satisfied patients directly to Google Reviews and capture grievances internally.",
      outcome: "Automated Google Rating Boost",
    },
    {
      icon: "content",
      tone: "gold",
      title: "Healthcare Content Creation",
      text: "Medically accurate, empathetic patient blogs, treatment guides, vernacular explainer videos (Tamil & English), and procedure animations.",
      outcome: "Clinically Verified Content",
    },
    {
      icon: "business",
      tone: "primary",
      title: "Hospital Business Development",
      text: "Doctor referral networks, corporate tie-ups, institutional empanelments, health camp activations, and community outreach partnership execution.",
      outcome: "B2B & Referral Channel Scaling",
    },
    {
      icon: "revenue",
      tone: "gold",
      title: "Healthcare Entrepreneurship & Revenue Strategies",
      text: "Strategic pricing, service line expansions (Day-care, IVF, ICU monetization), OT utilization maximization, and scalable healthcare startup models.",
      outcome: "Bottom-Line Margin Expansion",
    },
  ] satisfies { icon: GrowthServiceIcon; tone: Tone; title: string; text: string; outcome: string }[],
};

export type WhyIcon = "specialists" | "footfall" | "trust" | "growth" | "partner";

export const whyChoose = {
  eyebrow: "STRATEGIC COMPETITIVE EDGE",
  heading: "Why Choose MedGold?",
  intro:
    "General digital marketing agencies do not understand medical ethics, clinical specializations, or patient psychology. We live and breathe healthcare operations.",
  items: [
    {
      icon: "specialists",
      title: "Healthcare Industry Specialists",
      text: "100% focused on Healthcare & Medical Businesses. We understand NABH, clinical SOPs, and ethical marketing guidelines.",
    },
    {
      icon: "footfall",
      title: "Increase Patient Footfall",
      text: "Generate quality patient enquiries consistently. Transform low-occupancy wards into active revenue-generating centers.",
    },
    {
      icon: "trust",
      title: "Build Trust & Authority",
      text: "Strengthen your hospital and doctor's reputation with authentic testimonials, verified case profiles, and high Google rankings.",
    },
    {
      icon: "growth",
      title: "Revenue Growth Strategies",
      text: "Improve patient acquisition and business performance through measurable unit economics and higher procedure conversions.",
    },
    {
      icon: "partner",
      title: "End-to-End Growth Partner",
      text: "Marketing + Branding + Business Development + Front-Office Reception Training. A complete integrated ecosystem.",
    },
  ] satisfies { icon: WhyIcon; title: string; text: string }[],
};

export type SegmentIcon =
  | "multi"
  | "single"
  | "clinic"
  | "dental"
  | "diagnostic"
  | "ivf"
  | "home"
  | "doctor"
  | "startup";

export const segments = {
  eyebrow: "TARGET HEALTHCARE VERTICALS",
  heading: "Perfect For Healthcare Leaders",
  intro:
    "Tailored growth campaigns designed for all scale levels, from multi-specialty hospital chains to individual super-specialists.",
  items: [
    { icon: "multi", label: "Multi-Speciality Hospitals" },
    { icon: "single", label: "Single Specialty Hospitals" },
    { icon: "clinic", label: "Clinics & Polyclinics" },
    { icon: "dental", label: "Dental Clinics" },
    { icon: "diagnostic", label: "Diagnostic Centers" },
    { icon: "ivf", label: "IVF & Fertility Centers" },
    { icon: "home", label: "Home Healthcare Services" },
    { icon: "doctor", label: "Individual Doctors" },
    { icon: "startup", label: "Healthcare Startups & Telemedicine Platforms" },
  ] satisfies { icon: SegmentIcon; label: string }[],
  geo: {
    title: "Chennai & Tamil Nadu Focus:",
    text: "Hyper-targeted geo-fencing for Annanagar, Guindy, Velachery, Tambaram, Kolathur, Coimbatore, Madurai, and Trichy healthcare catchments.",
  },
};

export type ProcessIcon = "visibility" | "leads" | "appointments" | "revenue" | "brand";
export type OutcomeIcon = "eye" | "funnel" | "calendar" | "trend" | "shield";

export const process = {
  eyebrow: "PREDICTABLE PATIENT ACQUISITION ENGINE",
  heading: "Our Proven Growth Process",
  intro:
    "A systematic 5-step pipeline that transitions strangers into satisfied, returning hospital patients and vocal advocates.",
  steps: [
    {
      icon: "visibility",
      outcomeIcon: "eye",
      tone: "primary",
      title: "We Increase Your Online Visibility",
      text: "SEO, Social Media, Google Ads, Engaging Content & Multi-channel Hospital Branding.",
      outcome: "Brand Discovered",
    },
    {
      icon: "leads",
      outcomeIcon: "funnel",
      tone: "primary",
      title: "We Generate Quality Patient Leads",
      text: "Targeted campaigns bring the right patients with high intent for specific specialties and procedures.",
      outcome: "Qualified Lead Funnel",
    },
    {
      icon: "appointments",
      outcomeIcon: "calendar",
      tone: "gold",
      title: "We Convert Leads To Appointments",
      text: "Smart follow-ups, automated WhatsApp reminders & patient engagement systems to minimize no-shows.",
      outcome: "Confirmed Bookings",
    },
    {
      icon: "revenue",
      outcomeIcon: "trend",
      tone: "primary",
      title: "We Grow Your Hospital Revenue",
      text: "More patients, more trust, higher bed occupancy, and higher treatment conversion translate into higher ROI.",
      outcome: "Revenue Scale ₹",
    },
    {
      icon: "brand",
      outcomeIcon: "shield",
      tone: "gold",
      title: "We Build Long-Term Growth & Brand Value",
      text: "Strong hospital brand, loyal patients, 5-star reputation, and sustainable institutional equity.",
      outcome: "Sustainable Moat",
    },
  ] satisfies {
    icon: ProcessIcon;
    outcomeIcon: OutcomeIcon;
    tone: Tone;
    title: string;
    text: string;
    outcome: string;
  }[],
};

export const cta = {
  eyebrow: "YOUR GROWTH, OUR MISSION",
  heading: "Book a Free Hospital Growth Consultation Today",
  intro:
    "Discover how we scale patient footfall, appointments, and institutional authority for your hospital. Get a customized digital audit and competitor benchmarking report.",
  shareFields: [
    "Hospital / Clinic / Brand Name",
    "Doctor / Managing Director / Administrator Name",
    "Healthcare Facility Category",
    "Primary Growth Priority",
    "Growth Solutions Needed (Digital Marketing, Branding, Google & Meta Ads, Doctor Branding, Website & SEO, Reviews & ORM)",
    "Current Growth Target / Target Specializations",
  ],
  note: "Institutional Confidentiality Guaranteed. MedGold adheres strictly to healthcare ethical marketing guidelines and does not disclose strategy metrics to competitors.",
  button: "Claim Free Growth Audit & Strategy Session",
} as const;
