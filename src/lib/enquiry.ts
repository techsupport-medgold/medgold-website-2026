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

const EMAIL_PATTERN =
  /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*\.[A-Za-z]{2,}$/;
const LINE_BREAK = /[\r\n]|%0a|%0d|\\r|\\n/i;
const ENQUIRY_TYPES = new Set<string>(enquiryTypes);

export const ENQUIRY_MESSAGE_MIN = 20;
export const ENQUIRY_MESSAGE_MAX = 2000;
export const ENQUIRY_NAME_MAX = 100;
export const ENQUIRY_EMAIL_MAX = 254;
export const ENQUIRY_PHONE_MAX = 20;

/** Returns the 10-digit Indian mobile number, or null. Accepts spaces, dashes, +91, 91, or a leading 0. */
export function normalizeIndianMobile(input: string): string | null {
  const digits = input.replace(/[\s\-()]/g, "").replace(/^(\+91|91|0)(?=\d{10}$)/, "");
  return /^[6-9]\d{9}$/.test(digits) ? digits : null;
}

export function validateEnquiry(values: EnquiryValues): EnquiryErrors {
  const errors: EnquiryErrors = {};

  const name = values.name.trim();
  if (name.length < 2) {
    errors.name = "Enter your full name.";
  } else if (name.length > ENQUIRY_NAME_MAX) {
    errors.name = `Keep your name under ${ENQUIRY_NAME_MAX} characters.`;
  } else if (LINE_BREAK.test(values.name)) {
    errors.name = "Enter your name on one line.";
  }
  if (!values.phone.trim()) {
    errors.phone = "Enter your mobile number.";
  } else if (values.phone.length > ENQUIRY_PHONE_MAX || !normalizeIndianMobile(values.phone)) {
    errors.phone = "Enter a valid 10-digit mobile number, for example 98765 43210.";
  }
  if (!values.email.trim()) {
    errors.email = "Enter your email address so we can reply to you.";
  } else if (
    values.email.trim().length > ENQUIRY_EMAIL_MAX ||
    LINE_BREAK.test(values.email) ||
    !EMAIL_PATTERN.test(values.email.trim())
  ) {
    errors.email = "Enter a valid email address, for example name@example.com.";
  }
  if (!values.type || !ENQUIRY_TYPES.has(values.type)) {
    errors.type = "Choose an enquiry type.";
  }
  const messageLength = values.message.trim().length;
  if (messageLength < ENQUIRY_MESSAGE_MIN) {
    errors.message = `Tell us a little more (at least ${ENQUIRY_MESSAGE_MIN} characters).`;
  } else if (messageLength > ENQUIRY_MESSAGE_MAX) {
    errors.message = `Keep your message under ${ENQUIRY_MESSAGE_MAX} characters.`;
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
