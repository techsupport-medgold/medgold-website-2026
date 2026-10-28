import { describe, expect, it } from "vitest";
import { ABOUT_SEO } from "@@/data/about";
import { BRANDING_SEO } from "@@/data/branding";
import { CAREERS_SEO } from "@@/data/careers";
import { CONTACT_SEO } from "@@/data/contact";
import { HOME_SEO } from "@@/data/home";
import { PRIVACY_SEO, TERMS_SEO } from "@@/data/legal";
import { NURSING_TRAINING_SEO } from "@@/data/nursingTraining";
import { PATIENT_FEEDBACK_SEO } from "@@/data/patientFeedback";
import { PHARMACY_AUDIT_SEO } from "@@/data/pharmacyAudit";
import { STAFFING_SEO } from "@@/data/staffing";

const BRAND_SUFFIX = " | Med Gold";

/**
 * Page titles and meta descriptions are set verbatim by the SEO expert.
 * The final <title>: templated pages get the root " | Med Gold" suffix,
 * the homepage uses an absolute title.
 */
const SHEET = [
  { seo: HOME_SEO, templated: false, title: "Hospital Consultant in Chennai India | Operations & Management Consultancy Services", description: "MedGold Healthcare offers hospital consultancy services in Chennai India for 360 Operation Excellence and Management" },
  { seo: PRIVACY_SEO, templated: true, title: "Privacy at MedGold Healthcare in Chennai | Med Gold", description: "Read MedGold Healthcare's Privacy Policy to learn how we collect, use, protect, and share personal and data across our healthcare services." },
  { seo: TERMS_SEO, templated: true, title: "Terms of Service for MedGold Healthcare | Med Gold", description: "Review MedGold Healthcare's Terms & Conditions governing use of our website and services, including pharmacy audit, staffing, training, and feedback systems." },
  { seo: ABOUT_SEO, templated: true, title: "Learn About MedGold Healthcare, Chennai | Med Gold", description: "Learn about MedGold Healthcare, our mission, values, and integrated services" },
  { seo: CONTACT_SEO, templated: true, title: "Contact MedGold Healthcare Team, Chennai | Med Gold", description: "Contact MedGold Healthcare send an enquiry about appointments, training or careers, or call and WhatsApp our team directly." },
  { seo: STAFFING_SEO, templated: true, title: "Hospital & Healthcare Staffing Services in Chennai | Med Gold", description: "Credentialed healthcare staffing for hospitals, clinics, labs and pharmacies across Chennai and South India, plus real hospital training for professionals." },
  { seo: PHARMACY_AUDIT_SEO, templated: true, title: "Pharmacy Stock Audit & Profit Consulting | Med Gold", description: "We help hospital and retail pharmacies eliminate dead stock, halt expiry leakage, enforce SOPs and KPI/KRA frameworks, and build high-profit operations." },
  { seo: BRANDING_SEO, templated: true, title: "Hospital Branding & Digital Marketing Services in Chennai | Med Gold", description: "Hospital branding and digital marketing in Chennai: Google and Meta ads, SEO, doctor branding, reputation management and patient lead generation for clinics." },
  { seo: PATIENT_FEEDBACK_SEO, templated: true, title: "Patient Feedback System for Hospitals in Chennai | Med Gold", description: "Hospital patient feedback software in Chennai: bedside tablets, bilingual kiosks, real-time red alerts, 24-hour service recovery and NABH-ready audit reports." },
  { seo: NURSING_TRAINING_SEO, templated: true, title: "Nursing Training & Skills Development in Chennai | Med Gold", description: "Hands-on nursing training in Chennai: ventilator handling, CPR, BLS & ACLS, ICU protocols and patient care in a real hospital, with job placement assistance." },
  { seo: CAREERS_SEO, templated: true, title: "Careers with MedGold Healthcare, Chennai | Med Gold", description: "Apply for nursing, medical, technician and hospital operations jobs at MedGold Healthcare in Chennai. Send your application and our team will contact you." },
];

describe("SEO expert titles and descriptions", () => {
  it.each(SHEET)("renders $title exactly", ({ seo, templated, title }) => {
    expect(templated ? `${seo.title}${BRAND_SUFFIX}` : seo.title).toBe(title);
  });

  it.each(SHEET)("uses the sheet description for $title", ({ seo, description }) => {
    expect(seo.description).toBe(description);
  });
});
