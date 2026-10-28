import { SITE, SITE_URL } from "@@/config/site";

export type LegalListItem = string | { term: string; text: string };

export type LegalSubsection = { heading: string; paragraphs?: string[]; list?: LegalListItem[] };

export type LegalSection = {
  id: string;
  heading: string;
  paragraphs: string[];
  list?: LegalListItem[];
  subsections?: LegalSubsection[];
  closing?: string[];
};

export const PRIVACY_LAST_UPDATED = "12 October 2026";
export const TERMS_LAST_UPDATED = "12 October 2026";

const contactList: LegalListItem[] = [
  { term: "Name", text: SITE.contact.person.replace(/^Mr\.\s*/, "") },
  { term: "Phone", text: SITE.contact.phone },
  { term: "Email", text: SITE.contact.email },
  { term: "Address", text: SITE.address.full },
];

export const PRIVACY_SEO = {
  title: "Privacy at MedGold Healthcare in Chennai",
  description:
    "Read MedGold Healthcare's Privacy Policy to learn how we collect, use, protect, and share personal and data across our healthcare services.",
};

export const TERMS_SEO = {
  title: "Terms of Service for MedGold Healthcare",
  description:
    "Review MedGold Healthcare's Terms & Conditions governing use of our website and services, including pharmacy audit, staffing, training, and feedback systems.",
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
    list: contactList,
  },
];

export const termsSections: LegalSection[] = [
  {
    id: "introduction",
    heading: "Introduction",
    paragraphs: [
      `Welcome to MedGold Healthcare ("MedGold," "we," "us," or "our"). These Terms & Conditions ("Terms") govern your access to and use of our website at ${SITE_URL}/ and all related services, including Hospital Pharmacy Audit, Healthcare Staffing, Nursing Training, and Patient Feedback System Integration (collectively, the "Services").`,
      "By accessing, browsing, or using our website or Services, you agree to be bound by these Terms and our Privacy Policy. If you do not agree, please do not use our website or Services.",
    ],
  },
  {
    id: "definitions",
    heading: "1. Definitions",
    paragraphs: [],
    list: [
      { term: '"User," "you," or "your"', text: "means any person or entity accessing or using the website or Services." },
      {
        term: '"Services"',
        text: "means all services offered by MedGold, including Hospital Pharmacy Audit, Healthcare Staffing, Nursing Training, Patient Feedback System Integration, and any related consulting or support services.",
      },
      {
        term: '"Content"',
        text: "means all text, graphics, logos, software, data, reports, training materials, and other materials made available through the website or Services.",
      },
      {
        term: '"Client"',
        text: "means a hospital, clinic, healthcare institution, or other organization that engages MedGold for Services.",
      },
      {
        term: '"Personal Data" and "Protected Health Information" (PHI)',
        text: "have the meanings given in our Privacy Policy and applicable law.",
      },
    ],
  },
  {
    id: "eligibility",
    heading: "2. Eligibility",
    paragraphs: [
      "You must be at least 18 years of age and legally capable of entering into a binding contract to use our website or Services. If you use the Services on behalf of an organization, you represent and warrant that you have authority to bind that organization to these Terms.",
    ],
  },
  {
    id: "acceptance",
    heading: "3. Acceptance of Terms",
    paragraphs: [
      "By using the website or Services, you confirm that you have read, understood, and agreed to these Terms. We may update these Terms from time to time. Continued use after changes are posted constitutes acceptance of the revised Terms.",
    ],
  },
  {
    id: "services",
    heading: "4. Services",
    paragraphs: [],
    subsections: [
      {
        heading: "4.1 Hospital Pharmacy Audit",
        paragraphs: [
          "MedGold provides advisory and operational pharmacy audit services designed to review medication management, pharmacy workflows, compliance practices, and related processes. Audit findings are based on information made available to us and are provided for quality improvement and operational purposes. Our audits are not a substitute for statutory audits, regulatory inspections, or professional legal or medical advice.",
        ],
      },
      {
        heading: "4.2 Healthcare Staffing",
        paragraphs: [
          "MedGold facilitates recruitment, screening, credential verification, and placement of healthcare professionals, including nurses and pharmacists. Unless expressly stated in a separate written agreement, MedGold acts as a staffing facilitator and not as the employer of placed professionals. Clients are responsible for final hiring decisions, employment terms, compliance with labour laws, and workplace supervision.",
        ],
      },
      {
        heading: "4.3 Nursing Training",
        paragraphs: [
          "MedGold offers nursing training programs, assessments, and related educational services. Completion certificates are issued subject to satisfactory participation and assessment. Participation in training does not guarantee employment or placement. Trainees must comply with program rules, codes of conduct, and clinical training requirements.",
        ],
      },
      {
        heading: "4.4 Patient Feedback System Integration",
        paragraphs: [
          "MedGold supports the collection, integration, and analysis of patient feedback for healthcare quality improvement. Feedback may be anonymized or aggregated for reporting. Patient feedback systems are not intended for medical emergencies or urgent clinical communication. Healthcare providers remain responsible for obtaining any necessary patient consents and for using feedback in compliance with applicable laws.",
        ],
      },
    ],
  },
  {
    id: "no-medical-advice",
    heading: "5. No Medical Advice; No Doctor-Patient Relationship",
    paragraphs: [
      "The content on our website and in our Services is for informational and operational purposes only. It does not constitute medical advice, diagnosis, or treatment. No doctor-patient, nurse-patient, or other clinical relationship is created by your use of the website or Services. In case of a medical emergency, contact emergency services or a qualified healthcare professional immediately.",
    ],
  },
  {
    id: "user-responsibilities",
    heading: "6. User Accounts and Responsibilities",
    paragraphs: ["Where you create an account or provide information, you agree to:"],
    list: [
      "Provide accurate, current, and complete information.",
      "Maintain the confidentiality of your login credentials.",
      "Notify us promptly of any unauthorized use.",
      "Accept responsibility for all activity under your account.",
    ],
  },
  {
    id: "client-obligations",
    heading: "7. Client and Healthcare Provider Obligations",
    paragraphs: ["If you are a Client or healthcare provider using our Services, you agree to:"],
    list: [
      "Obtain all necessary patient, employee, and candidate consents.",
      "Comply with applicable healthcare, privacy, employment, and data protection laws.",
      "Ensure that information shared with MedGold is accurate and lawfully provided.",
      "Use our Services only for lawful and legitimate purposes.",
      "Maintain appropriate security and access controls within your organization.",
    ],
  },
  {
    id: "prohibited-conduct",
    heading: "8. Prohibited Conduct",
    paragraphs: ["You agree not to:"],
    list: [
      "Use the website or Services for any unlawful, fraudulent, or harmful purpose.",
      "Upload or transmit viruses, malware, or harmful code.",
      "Attempt to gain unauthorized access to our systems or data.",
      "Interfere with the operation, security, or availability of the website or Services.",
      "Copy, scrape, reverse engineer, or misuse our Content or technology.",
      "Submit false, misleading, or infringing information.",
      "Violate any applicable law, regulation, or professional obligation.",
    ],
  },
  {
    id: "fees",
    heading: "9. Fees and Payment",
    paragraphs: [
      "Fees for Services are set out in separate proposals, agreements, or invoices. Unless otherwise stated, all fees are exclusive of applicable taxes. Payment terms, late fees, and refund policies will be specified in the relevant agreement. We reserve the right to suspend or terminate Services for non-payment.",
    ],
  },
  {
    id: "intellectual-property",
    heading: "10. Intellectual Property",
    paragraphs: [
      "All Content, trademarks, logos, software, audit tools, training materials, reports, and methodologies are owned by MedGold or its licensors and are protected by applicable intellectual property laws. You may not reproduce, distribute, modify, or create derivative works without our prior written consent.",
      "If you submit feedback, suggestions, or other content, you grant MedGold a non-exclusive, worldwide, royalty-free license to use, reproduce, and incorporate that content for service improvement and business purposes, subject to our Privacy Policy.",
    ],
  },
  {
    id: "confidentiality",
    heading: "11. Confidentiality",
    paragraphs: [
      "Each party may receive confidential information from the other. You agree to protect MedGold's confidential information and to use it only for the purposes of the Services. These obligations do not apply to information that is publicly available, independently developed, or required to be disclosed by law.",
    ],
  },
  {
    id: "privacy",
    heading: "12. Privacy and Data Protection",
    paragraphs: [
      "Your use of the website and Services is also governed by our Privacy Policy. We process Personal Data and PHI in accordance with applicable laws, including the Digital Personal Data Protection Act, 2023, the Digital Personal Data Protection Rules, 2025, the Information Technology Act, 2000, and, where applicable, HIPAA-related principles. By using our Services, you consent to such processing as described in our Privacy Policy.",
    ],
  },
  {
    id: "third-party-links",
    heading: "13. Third-Party Links and Services",
    paragraphs: [
      "Our website may contain links to third-party websites or services. We are not responsible for the content, privacy practices, or terms of any third party. Your use of third-party services is at your own risk.",
    ],
  },
  {
    id: "disclaimers",
    heading: "14. Disclaimers",
    paragraphs: [
      'The website and Services are provided on an "as is" and "as available" basis. To the maximum extent permitted by law, MedGold disclaims all warranties, express or implied, including warranties of merchantability, fitness for a particular purpose, and non-infringement. We do not warrant that the website or Services will be uninterrupted, error-free, or completely secure. We do not guarantee any specific audit outcome, staffing placement, training result, or feedback outcome.',
    ],
  },
  {
    id: "limitation-of-liability",
    heading: "15. Limitation of Liability",
    paragraphs: [
      "To the maximum extent permitted by law, MedGold shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or business opportunities, arising out of or related to your use of the website or Services.",
    ],
  },
  {
    id: "indemnification",
    heading: "16. Indemnification",
    paragraphs: [
      "You agree to indemnify, defend, and hold harmless MedGold, its officers, directors, employees, and agents from any claims, liabilities, damages, losses, or expenses arising from:",
    ],
    list: [
      "Your use of the website or Services.",
      "Your violation of these Terms.",
      "Your violation of any law or third-party rights.",
      "Any data or information you provide to us.",
    ],
  },
  {
    id: "termination",
    heading: "17. Term and Termination",
    paragraphs: [
      "We may suspend or terminate your access to the website or Services at any time, with or without notice, for conduct that violates these Terms or applicable law. You may stop using the Services at any time. Provisions relating to intellectual property, confidentiality, disclaimers, limitation of liability, indemnification, and governing law shall survive termination.",
    ],
  },
  {
    id: "governing-law",
    heading: "18. Governing Law and Dispute Resolution",
    paragraphs: [
      "These Terms shall be governed by and construed in accordance with the laws of India. Subject to any separate written agreement, the courts at Chennai, India, shall have exclusive jurisdiction over any disputes arising out of or relating to these Terms or the Services.",
    ],
  },
  {
    id: "changes",
    heading: "19. Changes to These Terms",
    paragraphs: [
      'We may update these Terms from time to time. The revised Terms will be posted on this page with an updated "Last Updated" date. Your continued use of the website or Services after changes are posted constitutes acceptance of the revised Terms.',
    ],
  },
  {
    id: "miscellaneous",
    heading: "20. Miscellaneous",
    paragraphs: [],
    list: [
      {
        term: "Entire Agreement",
        text: "These Terms, together with our Privacy Policy and any separate written agreement, constitute the entire agreement between you and MedGold regarding the website and Services.",
      },
      { term: "Severability", text: "If any provision is found unenforceable, the remaining provisions shall remain in full force." },
      { term: "Waiver", text: "Our failure to enforce any provision does not constitute a waiver." },
      {
        term: "Assignment",
        text: "You may not assign these Terms without our written consent. We may assign our rights and obligations.",
      },
      {
        term: "Force Majeure",
        text: "We are not liable for delays or failures caused by events beyond our reasonable control.",
      },
      {
        term: "Relationship",
        text: "Nothing in these Terms creates a partnership, agency, joint venture, or employment relationship unless expressly stated.",
      },
    ],
  },
  {
    id: "contact",
    heading: "21. Contact Information",
    paragraphs: ["For questions about these Terms & Conditions, please contact:"],
    list: contactList,
  },
];
