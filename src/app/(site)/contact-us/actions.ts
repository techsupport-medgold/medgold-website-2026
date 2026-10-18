"use server";

import { enquiryAcknowledgementEmail, enquiryCompanyEmail } from "@@/lib/email-templates";
import { validateEnquiry, type EnquiryField, type EnquiryValues } from "@@/lib/enquiry";
import { isBot, readFields, type FormActionResult } from "@@/lib/form-action";
import { isRateLimited } from "@@/lib/form-rate";
import { MAIL_FAILURE_MESSAGE, companyInbox, sendMail } from "@@/lib/mailer";
import { RATE_LIMIT_MESSAGE } from "@@/lib/rate-limit";

const FIELDS = ["name", "phone", "email", "type", "message"] as const;

export type EnquiryResult = FormActionResult<EnquiryField>;

export async function submitEnquiry(formData: FormData): Promise<EnquiryResult> {
  if (isBot(formData)) {
    return { ok: true };
  }

  if (await isRateLimited("enquiry")) {
    return { ok: false, error: RATE_LIMIT_MESSAGE };
  }

  const values: EnquiryValues = readFields(formData, FIELDS);
  const fieldErrors = validateEnquiry(values);
  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, error: "Please fix the highlighted fields and try again.", fieldErrors };
  }

  const email = values.email.trim();
  try {
    await sendMail({ to: companyInbox(), replyTo: email, ...enquiryCompanyEmail(values) });
  } catch (error) {
    console.error("Enquiry email to the company failed", error);
    return { ok: false, error: MAIL_FAILURE_MESSAGE };
  }

  try {
    await sendMail({ to: email, ...enquiryAcknowledgementEmail(values) });
  } catch (error) {
    console.error("Enquiry acknowledgement email failed", error);
  }

  return { ok: true };
}
