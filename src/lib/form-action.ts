/** Shape returned by the careers and contact server actions. */
export type FormActionResult<Field extends string> =
  | { ok: true }
  | {
      ok: false;
      error: string;
      fieldErrors?: Partial<Record<Field, string>>;
      /** Lets the form stay on the page (expired, rate-limited, verification) instead of the failure page. */
      code?: "invalid" | "expired" | "rate-limited" | "verification" | "send-failed";
    };

/** Hidden field that people never see; bots that fill every input reveal themselves. */
// Not a name browsers autofill (company_website was autofilled, so real visitors looked like bots).
export const HONEYPOT_FIELD = "medgold_hp";
export const TOKEN_FIELD = "form_token";
export const TURNSTILE_FIELD = "cf-turnstile-response";

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
