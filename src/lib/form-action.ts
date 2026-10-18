import { SITE } from "@@/config/site";

/** Shape returned by the careers and contact server actions. */
export type FormActionResult<Field extends string> =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: Partial<Record<Field, string>> };

/**
 * Shown when the company copy of a form could not be sent.
 * Lives here so client forms can import it; `mailer.ts` is server-only.
 */
export const MAIL_FAILURE_MESSAGE = `We couldn't send your details right now. Please try again, or reach us on WhatsApp or call ${SITE.contact.phone}.`;

/**
 * Hidden field that people never see; bots that fill every input reveal themselves.
 * The name is not a real website or company field. Browsers and password managers
 * autofill names like "company_website", which used to look like a bot, return
 * success, and never send the email.
 */
export const HONEYPOT_FIELD = "medgold_hp";

export function readFields<Field extends string>(formData: FormData, fields: readonly Field[]): Record<Field, string> {
  return Object.fromEntries(
    fields.map((field) => {
      const value = formData.get(field);
      return [field, typeof value === "string" ? value.slice(0, 5000) : ""];
    }),
  ) as Record<Field, string>;
}

export function isBot(formData: FormData): boolean {
  const value = formData.get(HONEYPOT_FIELD);
  return typeof value === "string" && value.trim() !== "";
}
