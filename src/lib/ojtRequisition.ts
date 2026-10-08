import { EMAIL_PATTERN, normalizeIndianMobile } from "@@/lib/enquiry";

export type RequisitionValues = {
  facility: string;
  contact: string;
  email: string;
  phone: string;
  aides: string;
  timeline: string;
  challenges: string;
};

export type RequisitionField = keyof RequisitionValues;
export type RequisitionErrors = Partial<Record<RequisitionField, string>>;

export function validateRequisition(values: RequisitionValues): RequisitionErrors {
  const errors: RequisitionErrors = {};

  if (values.facility.trim().length < 2) {
    errors.facility = "Enter the hospital or facility name.";
  }
  if (values.contact.trim().length < 2) {
    errors.contact = "Enter the contact person's name and designation.";
  }
  if (!values.email.trim()) {
    errors.email = "Enter the official hospital email.";
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "Enter a valid email address, for example name@hospital.org.";
  }
  if (!values.phone.trim()) {
    errors.phone = "Enter a contact phone or WhatsApp number.";
  } else if (!normalizeIndianMobile(values.phone)) {
    errors.phone = "Enter a valid 10-digit mobile number, for example 98765 43210.";
  }

  return errors;
}

export function buildRequisitionMessage(values: RequisitionValues): string {
  const phone = normalizeIndianMobile(values.phone) ?? values.phone.trim();
  return [
    "In-hospital OJT requisition from the Med Gold website",
    "",
    `Facility: ${values.facility.trim()}`,
    `Contact: ${values.contact.trim()}`,
    `Email: ${values.email.trim()}`,
    `Phone: +91 ${phone}`,
    ...(values.aides ? [`Aides to train: ${values.aides}`] : []),
    ...(values.timeline ? [`Preferred start: ${values.timeline}`] : []),
    ...(values.challenges.trim() ? ["", "Priority areas:", values.challenges.trim()] : []),
  ].join("\n");
}
