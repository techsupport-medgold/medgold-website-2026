import { enquiryAcknowledgementEmail, enquiryCompanyEmail } from "@@/lib/email-templates";
import { validateEnquiry, type EnquiryField, type EnquiryValues } from "@@/lib/enquiry";
import { HONEYPOT_FIELD, TOKEN_FIELD, TURNSTILE_FIELD, readFields, type FormActionResult } from "@@/lib/form-action";
import { hasHeaderInjection, sanitizeMultiLine, sanitizeSingleLine, spamReason, verifyToken } from "@@/lib/form-security";
import type { Mail } from "@@/lib/mailer";

const FIELDS = ["name", "phone", "email", "type", "message"] as const;

export type EnquiryResult = FormActionResult<EnquiryField>;

export type EnquiryDeps = {
  headers: Pick<Headers, "get">;
  secret: string;
  now?: number;
  isAllowedOrigin: (headers: Pick<Headers, "get">) => boolean;
  clientIp: (headers: Pick<Headers, "get">) => string;
  rateLimit: (ip: string) => boolean;
  verifyTurnstile: (response: string, ip: string) => Promise<boolean>;
  sendMail: (mail: Mail) => Promise<void>;
  companyInbox: () => string;
  autoReply: boolean;
  log?: (message: string) => void;
};

export const EXPIRED_MESSAGE = "This form was open for a long time, so we refreshed it. Please press Send enquiry again.";
export const RATE_LIMIT_MESSAGE = "Too many messages from your connection. Please try again in a few minutes, or call us.";
export const VERIFICATION_MESSAGE = "Please complete the verification and send again.";

const FAKE_SUCCESS: EnquiryResult = { ok: true };

/** Every human-only check from the form-protection spec, in order. Bots get a silent fake success. */
export async function handleEnquiry(
  formData: FormData,
  deps: EnquiryDeps,
  failureMessage = "We couldn't send your details right now. Please try again.",
): Promise<EnquiryResult> {
  const log = deps.log ?? ((message: string) => console.warn(message));
  const blocked = (reason: string) => {
    log(`blocked automated submission (${reason})`);
    return FAKE_SUCCESS;
  };

  // 1. Honeypot
  const trap = formData.get(HONEYPOT_FIELD);
  if (typeof trap === "string" && trap.trim() !== "") return blocked("honeypot");

  // 2. Origin / Referer
  if (!deps.isAllowedOrigin(deps.headers)) return blocked("origin");

  // 3. Signed render token (expired is handled after validation, as a human)
  const token = verifyToken(formData.get(TOKEN_FIELD), deps.secret, deps.now);
  if (!token.ok && token.reason !== "expired") return blocked(`token-${token.reason}`);

  // 4. Strict validation
  const raw = readFields(formData, FIELDS);
  const values: EnquiryValues = {
    name: sanitizeSingleLine(raw.name),
    phone: sanitizeSingleLine(raw.phone),
    email: sanitizeSingleLine(raw.email),
    type: sanitizeSingleLine(raw.type),
    message: sanitizeMultiLine(raw.message),
  };
  const fieldErrors = validateEnquiry(values);
  for (const field of ["name", "phone", "email", "type"] as const) {
    if (!fieldErrors[field] && hasHeaderInjection(raw[field])) {
      fieldErrors[field] = "Remove line breaks from this field.";
    }
  }
  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, code: "invalid", error: "Please fix the highlighted fields and try again.", fieldErrors };
  }

  // 5. Token expired: a person left the tab open
  if (!token.ok) return { ok: false, code: "expired", error: EXPIRED_MESSAGE };

  // 6. Spam heuristics
  const spam = spamReason(values);
  if (spam) return blocked(`spam-${spam}`);

  // 7. Rate limit (only submissions that would send mail are counted)
  const ip = deps.clientIp(deps.headers);
  if (!deps.rateLimit(ip)) return { ok: false, code: "rate-limited", error: RATE_LIMIT_MESSAGE };

  // 8. Optional Turnstile
  const captcha = formData.get(TURNSTILE_FIELD);
  if (!(await deps.verifyTurnstile(typeof captcha === "string" ? captcha : "", ip))) {
    return { ok: false, code: "verification", error: VERIFICATION_MESSAGE };
  }

  // 9. Send
  try {
    await deps.sendMail({ to: deps.companyInbox(), replyTo: values.email, ...enquiryCompanyEmail(values) });
  } catch (error) {
    console.error("Enquiry email to the company failed", error);
    return { ok: false, code: "send-failed", error: failureMessage };
  }

  if (deps.autoReply) {
    try {
      await deps.sendMail({ to: values.email, ...enquiryAcknowledgementEmail(values) });
    } catch (error) {
      console.error("Enquiry auto-reply failed", error);
    }
  }

  return { ok: true };
}
