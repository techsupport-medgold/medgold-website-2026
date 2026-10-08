import { SITE } from "@@/config/site";

/** Placeholder legal copy, previewed at /dev/privacy-policy and /dev/terms-of-service. Must be reviewed by a legal advisor before launch. */

export type LegalSection = {
  id: string;
  heading: string;
  paragraphs: string[];
  list?: string[];
};

export const LEGAL_LAST_UPDATED = "26 September 2026";

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
    "How Med Gold collects, uses, and protects the personal information you share with us through our website and enquiry form.",
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
      `${SITE.legalName} ("we", "us", or "our") respects your privacy. This Privacy Policy explains what personal information we collect when you visit our website or contact us, how we use it, and the choices you have.`,
      "By using this website, you agree to the collection and use of information as described in this policy.",
    ],
  },
  {
    id: "information-we-collect",
    heading: "Information we collect",
    paragraphs: [
      "We only collect information that you choose to share with us, for example when you submit an enquiry. This may include:",
    ],
    list: [
      "Your full name",
      "Your mobile number",
      "Your email address (optional)",
      "The type of enquiry and the message you send us",
    ],
  },
  {
    id: "how-we-use-information",
    heading: "How we use your information",
    paragraphs: ["We use the information you provide to:"],
    list: [
      "Respond to your enquiry or request",
      "Schedule appointments and health check-ups",
      "Share information about our services when you ask for it",
      "Improve our website and the service we provide",
    ],
  },
  {
    id: "third-party-services",
    heading: "WhatsApp and third-party services",
    paragraphs: [
      "When you submit our enquiry form, your message is opened in WhatsApp so you can send it to our team. Messages sent through WhatsApp are also subject to WhatsApp's own privacy policy.",
      "We may use analytics tools to understand how visitors use our website. These tools collect anonymous usage data and do not identify you personally.",
    ],
  },
  {
    id: "data-retention",
    heading: "Data retention",
    paragraphs: [
      "We keep your personal information only for as long as needed to respond to your enquiry, provide our services, or meet legal and regulatory requirements. After that, it is securely deleted.",
    ],
  },
  {
    id: "data-security",
    heading: "Data security",
    paragraphs: [
      "We take reasonable technical and organisational measures to protect your information from unauthorised access, loss, or misuse. However, no method of transmission over the internet is completely secure.",
    ],
  },
  {
    id: "your-rights",
    heading: "Your rights",
    paragraphs: [
      "Under applicable Indian law, including the Digital Personal Data Protection Act, 2023, you may have the right to:",
    ],
    list: [
      "Access the personal information we hold about you",
      "Ask us to correct or update inaccurate information",
      "Ask us to delete your information",
      "Withdraw your consent at any time",
      "Raise a grievance with us about how your data is handled",
    ],
  },
  {
    id: "childrens-privacy",
    heading: "Children's privacy",
    paragraphs: [
      "Our website is not intended for children under 18. Enquiries about a child's care should be made by a parent or legal guardian.",
    ],
  },
  {
    id: "changes",
    heading: "Changes to this policy",
    paragraphs: [
      'We may update this Privacy Policy from time to time. Any changes will be posted on this page with a revised "Last updated" date.',
    ],
  },
  {
    id: "contact",
    heading: "Contact us",
    paragraphs: [
      "If you have any questions about this Privacy Policy or how we handle your information, please contact us:",
    ],
    list: contactLines,
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
