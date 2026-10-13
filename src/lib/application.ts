import { normalizeIndianMobile } from "@@/lib/enquiry";

export type ApplicationValues = {
  name: string;
  phone: string;
  email: string;
  position: string;
  experience: string;
  qualification: string;
  city: string;
  note: string;
};

export type ApplicationField = keyof ApplicationValues;
export type ApplicationErrors = Partial<Record<ApplicationField, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateApplication(values: ApplicationValues): ApplicationErrors {
  const errors: ApplicationErrors = {};

  if (values.name.trim().length < 2) {
    errors.name = "Enter your full name.";
  }
  if (!values.phone.trim()) {
    errors.phone = "Enter your mobile number.";
  } else if (!normalizeIndianMobile(values.phone)) {
    errors.phone = "Enter a valid 10-digit mobile number, for example 98765 43210.";
  }
  if (values.email.trim() && !EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "Enter a valid email address, for example name@example.com.";
  }
  if (!values.position) {
    errors.position = "Choose the position you are applying for.";
  }
  if (!values.experience) {
    errors.experience = "Choose your years of experience.";
  }
  if (values.qualification.trim().length < 2) {
    errors.qualification = "Enter your highest qualification, for example B.Sc Nursing.";
  }

  return errors;
}

export function buildApplicationMessage(values: ApplicationValues): string {
  const phone = normalizeIndianMobile(values.phone) ?? values.phone.trim();
  const lines = [
    "New job application from the Med Gold website",
    "",
    `Name: ${values.name.trim()}`,
    `Phone: +91 ${phone}`,
    ...(values.email.trim() ? [`Email: ${values.email.trim()}`] : []),
    `Position: ${values.position}`,
    `Experience: ${values.experience}`,
    `Qualification: ${values.qualification.trim()}`,
    ...(values.city.trim() ? [`Current city: ${values.city.trim()}`] : []),
    ...(values.note.trim() ? ["", "Note:", values.note.trim()] : []),
    "",
    "I will attach my resume in this chat.",
  ];
  return lines.join("\n");
}
