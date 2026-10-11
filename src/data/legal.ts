import { SITE, SITE_URL } from "@@/config/site";

export type LegalListItem = string | { term: string; text: string };

export type LegalSubsection = { heading: string; list: LegalListItem[] };

export type LegalSection = {
  id: string;
  heading: string;
  paragraphs: string[];
  list?: LegalListItem[];
  subsections?: LegalSubsection[];
  closing?: string[];
};

export const PRIVACY_LAST_UPDATED = "12 October 2026";
export const TERMS_LAST_UPDATED = "26 September 2026";

/** Terms of Service is still placeholder copy pending legal review. */
export const LEGAL_PLACEHOLDER_NOTE =
  "Placeholder content for review. Final text must be approved by Med Gold's legal advisor before launch.";

const contactLines = [
  `Contact person: ${SITE.contact.person}`,
  `Phone: ${SITE.contact.phone}`,
  `WhatsApp: ${SITE.contact.phone}`,
  `Address: ${SITE.address.full}`,
];

export const PRIVACY_SEO = {
  title: "Privacy Policy",
  description:
    "How MedGold Healthcare collects, uses, shares and protects personal and health data under India's DPDP Act 2023 across our audit, staffing and training services.",
};

export const TERMS_SEO = {
  title: "Terms of Service",
  description:
    "The terms and conditions that apply when you use the Med Gold website, including our medical disclaimer and enquiry terms.",
};

export const privacySections: LegalSection[] = [
  {
    id: "introduction",
    heading: "Introduction",
    paragraphs: [
      `This Privacy Policy explains how MedGold Healthcare ("MedGold," "we," "us," or "our") collects, uses, shares, stores, secures, retains, and disposes of personal and health-related information when you access or use our website at ${SITE_URL}/ and the services we provide, including Hospital Pharmacy Audit, Healthcare Staffing, Nursing Training, and Patient Feedback System Integration (collectively, the "Services").`,
      "We are committed to protecting personal information, including Personal Data, Personally Identifiable Information (PII), and Protected Health Information (PHI), and we implement appropriate administrative, technical, and physical safeguards supported by periodic reviews and continuous improvement.",
      'This Policy is published in compliance with applicable Indian laws, including the Digital Personal Data Protection Act, 2023 ("DPDP Act") and the Digital Personal Data Protection Rules, 2025 ("DPDP Rules"), the Information Technology Act, 2000 and associated rules, and other applicable healthcare and privacy regulations as amended from time to time. Where our Services involve U.S. persons or U.S.-linked contractual obligations, we also align our practices with HIPAA-related healthcare privacy and security principles.',
      "By accessing our website or using our Services, you acknowledge that you have read and understood this Privacy Policy. Where required by law, we will obtain your free, informed, specific, and unambiguous consent before processing your personal data.",
    ],
  },
  {
    id: "definitions",
    heading: "1. Definitions",
    paragraphs: ["For the purposes of this Privacy Policy:"],
    list: [
      {
        term: '"Data Principal"',
        text: "means the individual to whom the personal data relates, including patients, healthcare professionals, trainees, employees, candidates, and website visitors.",
      },
      {
        term: '"Data Fiduciary"',
        text: "means the entity that determines the purpose and means of processing personal data. MedGold Healthcare acts as a Data Fiduciary in relation to the personal data it collects through its website and Services.",
      },
      {
        term: '"Data Processor"',
        text: "means an entity that processes personal data on behalf of a Data Fiduciary. Third-party service providers engaged by MedGold may act as Data Processors.",
      },
      {
        term: '"Personal Data"',
        text: "means any data about an individual who is identifiable by or in relation to such data.",
      },
      {
        term: '"Protected Health Information" (PHI)',
        text: "means health-related information that identifies an individual, including medical history, prescriptions, diagnostic reports, and treatment records.",
      },
    ],
  },
  {
    id: "scope",
    heading: "2. Scope of This Privacy Policy",
    paragraphs: ["This Privacy Policy applies to:"],
    list: [
      { term: "Website Visitors", text: `Individuals who visit ${SITE_URL}/.` },
      {
        term: "Patients and Healthcare Providers",
        text: "Individuals and institutions whose data is processed in connection with our Hospital Pharmacy Audit and Patient Feedback System Integration services.",
      },
      {
        term: "Healthcare Professionals and Candidates",
        text: "Nurses, pharmacists, and other healthcare personnel who engage with our Healthcare Staffing services or apply for placements.",
      },
      { term: "Trainees", text: "Individuals enrolled in or applying for our Nursing Training programs." },
      {
        term: "Business Partners and Clients",
        text: "Hospitals, clinics, and organizations that engage MedGold for any of the Services.",
      },
    ],
  },
  {
    id: "information-we-collect",
    heading: "3. Information We Collect",
    paragraphs: [
      "We collect only information that is necessary for legitimate healthcare delivery, business operations, and legal or regulatory purposes. The categories of information we may collect include:",
    ],
    subsections: [
      {
        heading: "3.1 Personal Identification Information",
        list: [
          "Name, contact details, address, gender, date of birth, and photographs",
          "Government-issued identifiers such as Aadhaar, PAN, passport, or voter ID, where legally required",
          "Emergency contact details",
        ],
      },
      {
        heading: "3.2 Health and Medical Information (PHI)",
        list: [
          "Medical history, prescriptions, lab reports, diagnostic data, and consultation notes",
          "Treatment records and pharmacy-related data (in connection with Hospital Pharmacy Audit services)",
          "Patient feedback and complaint submissions, including supporting documents and correspondence",
        ],
      },
      {
        heading: "3.3 Employment and Professional Information",
        list: [
          "Employment details, qualifications, licenses, certifications, and professional registration numbers",
          "Payroll, benefits, performance, and training information (where applicable)",
          "Placement history and compliance records for healthcare staffing candidates",
        ],
      },
      {
        heading: "3.4 Training and Educational Information",
        list: [
          "Academic records, training completion certificates, and assessment results for Nursing Training participants",
          "Clinical training logs and competency evaluation records",
        ],
      },
      {
        heading: "3.5 Technical and Usage Information",
        list: [
          "Log data generated through use of our website, applications, systems, devices, and security monitoring tools",
          "IP address, browser type, operating system, and pages visited",
          "Cookies and similar tracking technologies",
        ],
      },
    ],
  },
  {
    id: "how-we-use-information",
    heading: "4. How We Use Your Information",
    paragraphs: ["We process personal data and PHI for legitimate and lawful purposes, including:"],
    list: [
      {
        term: "Service Delivery",
        text: "Providing Hospital Pharmacy Audit services, including evaluating pharmacy operations, medication management, and compliance with hospital protocols.",
      },
      {
        term: "Healthcare Staffing",
        text: "Recruiting, screening, and placing qualified healthcare professionals, and managing workforce administration.",
      },
      {
        term: "Nursing Training",
        text: "Delivering training programs, assessing competencies, and maintaining training records.",
      },
      {
        term: "Patient Feedback System Integration",
        text: "Collecting, processing, and analyzing patient feedback to improve healthcare quality and patient experience.",
      },
      {
        term: "Communication",
        text: "Responding to inquiries, providing updates, and managing client and candidate relationships.",
      },
      { term: "Compliance", text: "Meeting legal, regulatory, insurance, and health and safety obligations." },
      {
        term: "IT Operations and Security",
        text: "Managing cybersecurity, access control, monitoring, audit logging, and business continuity.",
      },
    ],
    closing: [
      "Personal data is used only for the purposes for which it is collected, unless otherwise permitted or required by law.",
    ],
  },
  {
    id: "legal-basis",
    heading: "5. Legal Basis for Processing",
    paragraphs: [
      "Under the DPDP Act, consent is the default ground for processing personal data, including health data. We obtain consent that is free, specific, informed, unconditional, unambiguous, and given by a clear affirmative action.",
      "We may also process personal data without consent where permitted or required by law, including for:",
    ],
    list: [
      "Compliance with legal obligations",
      "Medical emergency or public health response",
      "Employment-related purposes (where you are our employee or contractor)",
      "Court orders or statutory reporting requirements",
    ],
  },
  {
    id: "how-we-share-information",
    heading: "6. How We Share Your Information",
    paragraphs: [
      "MedGold does not sell personal data. We share Personal Data and PHI only where necessary for healthcare delivery, business operations, legal compliance, or as otherwise permitted under applicable law.",
      "Access to Personal Data and PHI is restricted to authorized personnel on a strict need-to-know and minimum necessary basis. We may disclose information to:",
    ],
    list: [
      {
        term: "Authorized Healthcare Professionals",
        text: "Pharmacists, nurses, and medical practitioners involved in service delivery",
      },
      {
        term: "Affiliate Companies and Approved Business Associates",
        text: "Entities working with MedGold under contractual safeguards",
      },
      {
        term: "Third-Party Service Providers",
        text: "IT, hosting, diagnostics, and operations partners supporting our Services",
      },
      { term: "Regulatory, Judicial, or Law Enforcement Authorities", text: "When required by law" },
    ],
    closing: [
      "All third parties are contractually required to implement appropriate data protection safeguards and to process personal data only for the purposes for which it was shared.",
    ],
  },
  {
    id: "data-security",
    heading: "7. Data Security",
    paragraphs: [
      "We implement administrative, technical, and physical safeguards to protect personal data and PHI from unauthorized access, disclosure, alteration, loss, or destruction. These safeguards include:",
    ],
    list: [
      "Encryption of data at rest and in transit",
      "Access controls based on role and minimum necessary principles",
      "Security monitoring and audit logging",
      "Employee training on privacy and security practices",
      "Incident response procedures for detecting, reporting, and mitigating data breaches",
    ],
    closing: ["We conduct periodic reviews and risk assessments to ensure the effectiveness of our security measures."],
  },
  {
    id: "data-retention",
    heading: "8. Data Retention and Deletion",
    paragraphs: [
      "We retain personal data only for as long as necessary to fulfill the purposes for which it was collected, or as required by applicable law, regulatory obligations, or contractual commitments. When the purpose of processing has been fulfilled and retention is no longer necessary, we securely erase or anonymize the data.",
      "Retention periods vary depending on the type of data and the service:",
    ],
    list: [
      {
        term: "Pharmacy Audit Records",
        text: "Retained for the duration of the audit engagement and for a period thereafter as required by healthcare regulations.",
      },
      {
        term: "Staffing and Employment Records",
        text: "Retained for the duration of employment or placement and for statutory limitation periods.",
      },
      {
        term: "Nursing Training Records",
        text: "Retained for the duration of the training program and for a reasonable period thereafter for certification and verification purposes.",
      },
      {
        term: "Patient Feedback Data",
        text: "Retained in accordance with healthcare quality monitoring requirements; personal identifiers may be anonymized where appropriate.",
      },
    ],
  },
  {
    id: "cookies",
    heading: "9. Cookies and Tracking Technologies",
    paragraphs: [
      "Our website may use cookies and similar tracking technologies to enhance functionality, analyze usage patterns, and improve user experience. You can manage cookie preferences through your browser settings. Please note that disabling certain cookies may affect website functionality.",
    ],
  },
  {
    id: "your-rights",
    heading: "10. Your Rights",
    paragraphs: ["Under the DPDP Act, you have the following rights in relation to your personal data:"],
    list: [
      {
        term: "Right to Access",
        text: "Request a summary of the personal data we process about you and the identities of Data Fiduciaries with whom it has been shared.",
      },
      {
        term: "Right to Correction, Completion, and Updating",
        text: "Request correction of inaccurate or incomplete personal data.",
      },
      {
        term: "Right to Erasure",
        text: "Request deletion of personal data where retention is no longer necessary for the purpose for which it was collected.",
      },
      { term: "Right to Grievance Redressal", text: "Raise complaints regarding the processing of your personal data." },
      {
        term: "Right to Withdraw Consent",
        text: "Withdraw your consent at any time, where processing is based on consent. Withdrawal will not affect the lawfulness of processing carried out before withdrawal.",
      },
    ],
    closing: ["To exercise any of these rights, please contact us using the details provided in Section 14."],
  },
  {
    id: "childrens-privacy",
    heading: "11. Children's Privacy",
    paragraphs: [
      "Our Services are not directed at children under the age of 18. We do not knowingly collect personal data from children. If we become aware that we have collected personal data from a child without appropriate consent, we will take steps to delete such data promptly.",
    ],
  },
  {
    id: "international-transfers",
    heading: "12. International Data Transfers",
    paragraphs: [
      "Your personal data may be processed and stored in India or in other jurisdictions where our service providers operate. Where we transfer personal data outside India, we ensure that appropriate safeguards are in place, including contractual protections and compliance with applicable legal requirements.",
    ],
  },
  {
    id: "changes",
    heading: "13. Changes to This Privacy Policy",
    paragraphs: [
      'We may update this Privacy Policy from time to time to reflect changes in our practices, legal requirements, or operational needs. The updated Policy will be posted on this page with a revised "Last Updated" date. We encourage you to review this Policy periodically.',
    ],
  },
  {
    id: "contact",
    heading: "14. Grievance Redressal and Contact Information",
    paragraphs: [
      "If you have any questions, concerns, or complaints regarding this Privacy Policy or our data processing practices, please contact our Grievance Officer / Data Protection Officer:",
    ],
    list: [
      { term: "Name", text: SITE.contact.person.replace(/^Mr\.\s*/, "") },
      { term: "Phone", text: SITE.contact.phone },
      { term: "Address", text: SITE.address.full },
    ],
  },
];

export const termsSections: LegalSection[] = [
  {
    id: "acceptance",
    heading: "Acceptance of terms",
    paragraphs: [
      `By accessing or using the ${SITE.name} website, you agree to these Terms of Service. If you do not agree, please do not use the website.`,
    ],
  },
  {
    id: "use-of-website",
    heading: "Use of the website",
    paragraphs: ["You agree to use this website only for lawful purposes. You must not:"],
    list: [
      "Submit false or misleading information",
      "Attempt to gain unauthorised access to the website or its systems",
      "Use the website in a way that could damage, disable, or impair it",
    ],
  },
  {
    id: "medical-disclaimer",
    heading: "Medical disclaimer",
    paragraphs: [
      "The content on this website is for general information only. It is not medical advice and should not replace a consultation with a qualified doctor.",
      "Do not ignore professional medical advice or delay seeking it because of something you read on this website.",
      "In a medical emergency, call 112 or go to the nearest hospital immediately.",
    ],
  },
  {
    id: "appointments-enquiries",
    heading: "Appointments and enquiries",
    paragraphs: [
      "Submitting an enquiry does not confirm an appointment. Our team will contact you to confirm availability, timing, and any applicable fees.",
    ],
  },
  {
    id: "intellectual-property",
    heading: "Intellectual property",
    paragraphs: [
      `All content on this website, including text, images, logos, and design, belongs to ${SITE.legalName} or its licensors. You may not copy, reproduce, or distribute it without our written permission.`,
    ],
  },
  {
    id: "third-party-links",
    heading: "Third-party links",
    paragraphs: [
      "Our website may link to third-party services such as WhatsApp. We are not responsible for the content, policies, or practices of those services.",
    ],
  },
  {
    id: "limitation-of-liability",
    heading: "Limitation of liability",
    paragraphs: [
      `To the fullest extent permitted by law, ${SITE.legalName} is not liable for any loss or damage arising from your use of this website or reliance on its content.`,
    ],
  },
  {
    id: "governing-law",
    heading: "Governing law",
    paragraphs: [
      "These Terms of Service are governed by the laws of India. Any disputes are subject to the exclusive jurisdiction of the courts of Tamil Nadu.",
    ],
  },
  {
    id: "changes",
    heading: "Changes to these terms",
    paragraphs: [
      'We may update these Terms of Service from time to time. Any changes will be posted on this page with a revised "Last updated" date.',
    ],
  },
  {
    id: "contact",
    heading: "Contact us",
    paragraphs: ["If you have any questions about these Terms of Service, please contact us:"],
    list: contactLines,
  },
];
