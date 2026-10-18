"use server";

import {
  resumeContentType,
  safeAttachmentName,
  validateApplication,
  validateResume,
  type ApplicationField,
  type ApplicationValues,
} from "@@/lib/application";
import { applicationCandidateEmail, applicationCompanyEmail } from "@@/lib/email-templates";
import { isBot, readFields, type FormActionResult } from "@@/lib/form-action";
import { isRateLimited } from "@@/lib/form-rate";
import { MAIL_FAILURE_MESSAGE, companyInbox, sendMail } from "@@/lib/mailer";
import { RATE_LIMIT_MESSAGE } from "@@/lib/rate-limit";

const FIELDS = ["name", "phone", "email", "position", "experience", "qualification", "city", "note"] as const;

export type ApplicationResult = FormActionResult<ApplicationField | "resume">;

export async function submitApplication(formData: FormData): Promise<ApplicationResult> {
  if (isBot(formData)) {
    return { ok: true };
  }

  if (await isRateLimited("application")) {
    return { ok: false, error: RATE_LIMIT_MESSAGE };
  }

  const values: ApplicationValues = readFields(formData, FIELDS);
  const resume = formData.get("resume");
  const resumeFile = resume instanceof File ? resume : null;

  const fieldErrors: Partial<Record<ApplicationField | "resume", string>> = validateApplication(values);
  const resumeError = validateResume(resumeFile);
  if (resumeError) {
    fieldErrors.resume = resumeError;
  }
  if (Object.keys(fieldErrors).length > 0 || !resumeFile) {
    return { ok: false, error: "Please fix the highlighted fields and try again.", fieldErrors };
  }

  try {
    const company = applicationCompanyEmail(values, { name: resumeFile.name, size: resumeFile.size });
    await sendMail({
      to: companyInbox(),
      replyTo: values.email.trim(),
      ...company,
      attachments: [
        {
          filename: safeAttachmentName(resumeFile.name),
          content: Buffer.from(await resumeFile.arrayBuffer()),
          contentType: resumeContentType(resumeFile.name) ?? undefined,
        },
      ],
    });
  } catch (error) {
    console.error("Application email to the company failed", error);
    return { ok: false, error: MAIL_FAILURE_MESSAGE };
  }

  try {
    await sendMail({ to: values.email.trim(), ...applicationCandidateEmail(values) });
  } catch (error) {
    console.error("Application acknowledgement email failed", error);
  }

  return { ok: true };
}
