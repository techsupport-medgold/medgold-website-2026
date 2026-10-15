/** Shape returned by the careers and contact server actions. */
export type FormActionResult<Field extends string> =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: Partial<Record<Field, string>> };

/** Hidden field that people never see; bots that fill every input reveal themselves. */
export const HONEYPOT_FIELD = "company_website";

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
