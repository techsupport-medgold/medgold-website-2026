import { experienceLevels, positions } from "@@/data/careers";
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
const POSITIONS = new Set<string>(positions);
const EXPERIENCE_LEVELS = new Set<string>(experienceLevels);

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
  if (!values.email.trim()) {
    errors.email = "Enter your email address so we can confirm your application.";
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "Enter a valid email address, for example name@example.com.";
  }
  if (!values.position || !POSITIONS.has(values.position)) {
    errors.position = "Choose the position you are applying for.";
  }
  if (!values.experience || !EXPERIENCE_LEVELS.has(values.experience)) {
    errors.experience = "Choose your years of experience.";
  }
  if (values.qualification.trim().length < 2) {
    errors.qualification = "Enter your highest qualification, for example B.Sc Nursing.";
  }

  return errors;
}

export const RESUME_MAX_BYTES = 4 * 1024 * 1024;
export const RESUME_ACCEPT = ".pdf,.doc,.docx";

const RESUME_TYPES: Record<string, string> = {
  pdf: "application/pdf",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
};

type ResumeFile = { name: string; size: number };

/** Returns an error message, or null when the resume is acceptable. */
export function validateResume(file: ResumeFile | null | undefined): string | null {
  if (!file || file.size === 0) {
    return "Upload your resume as a PDF, DOC or DOCX file.";
  }
  if (!resumeContentType(file.name)) {
    return "Your resume must be a PDF, DOC or DOCX file.";
  }
  if (file.size > RESUME_MAX_BYTES) {
    return `Your resume is ${formatFileSize(file.size)}. Upload a file of 4 MB or less.`;
  }
  return null;
}

/** Drops path segments and header characters from an uploaded file name. */
export function safeAttachmentName(fileName: string): string {
  const base = fileName.split(/[/\\]/).pop() ?? "";
  const cleaned = base.replace(/[^\w.\- ()]+/g, "").replace(/^\.+/, "").slice(0, 120);
  return cleaned || "resume";
}

export function resumeContentType(fileName: string): string | null {
  const extension = fileName.split(".").pop()?.toLowerCase() ?? "";
  return RESUME_TYPES[extension] ?? null;
}

export function formatFileSize(bytes: number): string {
  return bytes >= 1024 * 1024 ? `${(bytes / (1024 * 1024)).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;
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
