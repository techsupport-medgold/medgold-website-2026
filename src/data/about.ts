import { absoluteUrl } from "@@/config/site";
import { Routes } from "@@/config/routes";

/** Copy for the About Us page. */
export const ABOUT_PAGE_URL = absoluteUrl(Routes.ABOUT);

export const ABOUT_SEO = {
  title: "About Us",
  description: "Learn about MedGold Healthcare, our mission, values, and integrated services",
};

export const hero = {
  eyebrow: "MEDGOLD HEALTHCARE",
  heading: "About MedGold Healthcare",
  intro: [
    "MedGold Healthcare is a specialized healthcare solutions provider committed to strengthening hospital operations, empowering healthcare professionals, and improving patient experiences.",
    "Through our integrated services - Hospital Pharmacy Audit, Healthcare Staffing, Nursing Training, and Patient Feedback System Integration - we help healthcare organizations deliver safer, smarter, and more patient-centered care.",
  ],
  services: [
    { label: "Hospital Pharmacy Audit", href: Routes.PHARMACY_AUDIT },
    { label: "Healthcare Staffing", href: Routes.STAFFING },
    { label: "Nursing Training", href: Routes.NURSING_TRAINING },
    { label: "Patient Feedback System Integration", href: Routes.PATIENT_FEEDBACK },
  ],
  primaryCta: "Contact Us Today",
  caption: "Safer, smarter, and more patient-centered care",
  image: {
    src: "/images/about/about-hero.jpg",
    alt: "A doctor, a pharmacist and a hospital administrator discussing plans in a bright hospital corridor",
  },
};

export const whoWeAre = {
  eyebrow: "Who we are",
  heading: "Bridging healthcare growth and operational excellence",
  paragraphs: [
    "MedGold Healthcare was founded with a clear purpose: to bridge the gap between healthcare facility growth and operational excellence. We understand that behind every hospital, clinic, and care facility lies a complex ecosystem of people, processes, and systems that must work together.",
    "We partner with hospitals, healthcare institutions, and medical organizations to improve the quality of care they provide - not just through technology or audits, but through a deep commitment to patient safety, regulatory compliance, and continuous improvement.",
    "Our team brings together experienced pharmacists, healthcare administrators, nursing educators, quality auditors, and technology specialists who share a common passion for making healthcare better.",
  ],
  teamLabel: "Our team",
  team: ["Pharmacists", "Healthcare Administrators", "Nursing Educators", "Quality Auditors", "Technology Specialists"],
  image: {
    src: "/images/about/who-we-are.jpg",
    alt: "A nursing educator guiding a group of nurses through a hands-on session with a patient manikin",
  },
};

export const purpose = {
  eyebrow: "Our purpose",
  heading: "Mission & Vision",
  mission: {
    title: "Our Mission",
    text: "To empower healthcare organizations with reliable, compliant, and innovative solutions that enhance operations, and support the professional growth of healthcare teams.",
  },
  vision: {
    title: "Our Vision",
    text: "To be a trusted partner in healthcare excellence and measurable growth.",
  },
};

export type ValueIcon = "integrity" | "quality" | "collaboration" | "innovation" | "compassion";

export const values = {
  eyebrow: "What guides us",
  heading: "Our Core Values",
  items: [
    {
      icon: "integrity",
      title: "Integrity",
      text: "We uphold the highest ethical standards in everything we do, ensuring transparency, confidentiality, and accountability in our work with clients and patients.",
    },
    {
      icon: "quality",
      title: "Quality",
      text: "We are committed to excellence, applying rigorous standards and evidence-based practices to every audit, placement, training program, and feedback initiative.",
    },
    {
      icon: "collaboration",
      title: "Collaboration",
      text: "We believe the best outcomes are achieved through partnership - working closely with hospitals, healthcare professionals, and patients to create sustainable improvements.",
    },
    {
      icon: "innovation",
      title: "Innovation",
      text: "We embrace technology and continuous learning to deliver smarter, more efficient, and more impactful healthcare solutions.",
    },
    {
      icon: "compassion",
      title: "Compassion",
      text: "At the heart of healthcare is care. We never lose sight of the people behind the processes - patients, families, and caregivers.",
    },
  ] satisfies { icon: ValueIcon; title: string; text: string }[],
};

export const approach = {
  eyebrow: "How we work",
  heading: "Our Approach",
  intro: "At MedGold Healthcare, we follow a structured, collaborative, and transparent approach to every engagement:",
  steps: [
    { title: "Understand", text: "We take time to understand your organization, challenges, and goals." },
    { title: "Assess", text: "We conduct thorough evaluations using proven tools and methodologies." },
    { title: "Recommend", text: "We provide clear, actionable recommendations tailored to your needs." },
    { title: "Implement", text: "We support you through implementation with hands-on guidance." },
    { title: "Review", text: "We monitor progress and continuously refine strategies for lasting impact." },
  ],
};

export type AudienceIcon = "hospital" | "clinic" | "pharmacy" | "education" | "public";

export const audiences = {
  eyebrow: "Who we serve",
  heading: "Who We Serve",
  items: [
    { icon: "hospital", label: "Hospitals and Multi-Specialty Healthcare Facilities" },
    { icon: "clinic", label: "Clinics and Diagnostic Centers" },
    { icon: "pharmacy", label: "Pharmacy Chains and Hospital Pharmacies" },
    { icon: "education", label: "Healthcare Educational Institutions" },
    { icon: "public", label: "Public Health Organizations" },
  ] satisfies { icon: AudienceIcon; label: string }[],
  image: {
    src: "/images/about/who-we-serve.jpg",
    alt: "A healthcare professional checking medicine stock on a tablet in a hospital pharmacy",
  },
};

export const cta = {
  eyebrow: "Partner with us",
  heading: "Let's Work Together",
  intro:
    "Whether you're looking to strengthen your pharmacy operations, build a reliable healthcare workforce, train your nursing team, or improve patient experience, MedGold Healthcare is here to help.",
  subheading: "We invite you to partner with us in advancing healthcare quality, safety, and compassion.",
  button: "Contact Us Today",
};

export type Trainer = {
  name: string;
  role: string;
  experienceYears: number;
  bio?: string;
  photo?: { src: string; alt: string };
};

export type Founder = Trainer & { about: string[]; expertise: string[] };

// TODO: replace with real details (experience years and the founder's about text).
export const founder: Founder = {
  name: "Mr. Sundramurthi",
  role: "Founder, MedGold Healthcare",
  experienceYears: 20,
  photo: {
    src: "/images/careers/sundaramoorthy-founder-medgold-healthcare.avif",
    alt: "Mr. Sundramurthi, Founder of MedGold Healthcare",
  },
  about: [
    "Mr. Sundramurthi founded MedGold Healthcare to give hospitals and clinics one dependable partner for the operational work that keeps patient care running smoothly.",
    "His experience spans hospital operations, pharmacy stock audits, healthcare staffing and nursing education. He personally guides our training programs and the teams we place with partner facilities.",
  ],
  expertise: [
    "Hospital Operations",
    "Pharmacy Stock Audit",
    "NABH Readiness",
    "Healthcare Staffing",
    "Nursing Training",
    "Patient Feedback Systems",
    "Hospital Branding",
  ],
};

export const trainers = {
  founderHeader: {
    eyebrow: "Learn from experienced leaders",
    heading: "Meet Our Founder",
    intro: "The vision and experience behind MedGold Healthcare's training and operations.",
  },
  staffHeader: {
    eyebrow: "Hands-on nursing education",
    heading: "Our Expert Trainers",
    intro: "Our senior nursing tutors lead classroom and bedside training for every batch.",
  },
  staff: [
    {
      name: "Gajalakshmi N",
      role: "Senior Nursing Tutor",
      experienceYears: 12,
      photo: {
        src: "/images/careers/gajalakshmi-n-senior-nursing-tutor.avif",
        alt: "Gajalakshmi N, Senior Nursing Tutor at MedGold Healthcare",
      },
    },
    {
      name: "Praveena",
      role: "Senior Nursing Tutor",
      experienceYears: 8,
      photo: {
        src: "/images/careers/praveena-senior-nursing-tutor.avif",
        alt: "Praveena, Senior Nursing Tutor at MedGold Healthcare",
      },
    },
  ] satisfies Trainer[] as Trainer[],
};
