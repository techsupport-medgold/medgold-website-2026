import { enquiryTypes } from "@@/data/contact";

export type EnquiryValues = {
  name: string;
  phone: string;
  email: string;
  type: string;
  message: string;
};

export type EnquiryField = keyof EnquiryValues;
export type EnquiryErrors = Partial<Record<EnquiryField, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ENQUIRY_TYPES = new Set<string>(enquiryTypes);

export const ENQUIRY_MESSAGE_MIN = 20;

/** Returns the 10-digit Indian mobile number, or null. Accepts spaces, dashes, +91, 91, or a leading 0. */
export function normalizeIndianMobile(input: string): string | null {
  const digits = input.replace(/[\s\-()]/g, "").replace(/^(\+91|91|0)(?=\d{10}$)/, "");
  return /^[6-9]\d{9}$/.test(digits) ? digits : null;
}

export function validateEnquiry(values: EnquiryValues): EnquiryErrors {
  const errors: EnquiryErrors = {};

  if (values.name.trim().length < 2) {
    errors.name = "Enter your full name.";
  }
  if (!values.phone.trim()) {
    errors.phone = "Enter your mobile number.";
  } else if (!normalizeIndianMobile(values.phone)) {
    errors.phone = "Enter a valid 10-digit mobile number, for example 98765 43210.";
  }
  if (!values.email.trim()) {
    errors.email = "Enter your email address so we can reply to you.";
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "Enter a valid email address, for example name@example.com.";
  }
  if (!values.type || !ENQUIRY_TYPES.has(values.type)) {
    errors.type = "Choose an enquiry type.";
  }
  if (values.message.trim().length < ENQUIRY_MESSAGE_MIN) {
    errors.message = `Tell us a little more (at least ${ENQUIRY_MESSAGE_MIN} characters).`;
  }

  return errors;
}

export function buildEnquiryMessage(values: EnquiryValues): string {
  const phone = normalizeIndianMobile(values.phone) ?? values.phone.trim();
  const lines = [
    "New enquiry from the Med Gold website",
    "",
    `Name: ${values.name.trim()}`,
    `Phone: +91 ${phone}`,
    ...(values.email.trim() ? [`Email: ${values.email.trim()}`] : []),
    `Enquiry type: ${values.type}`,
    "",
    "Message:",
    values.message.trim(),
  ];
  return lines.join("\n");
}
