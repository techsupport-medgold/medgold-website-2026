import { Routes } from "@@/config/routes";

export type SubmitStatus = "success" | "failed";
export type FormKind = "enquiry" | "application";

export function thankYouUrl(status: SubmitStatus, form: FormKind): string {
  return `${Routes.THANK_YOU}?status=${status}&form=${form}`;
}

type RawParams = Record<string, string | string[] | undefined>;

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export function parseThankYouParams(params: RawParams): { status: SubmitStatus; form: FormKind } {
  return {
    status: first(params.status) === "failed" ? "failed" : "success",
    form: first(params.form) === "application" ? "application" : "enquiry",
  };
}

type StorageLike = Pick<Storage, "getItem" | "setItem" | "removeItem">;

const draftKey = (form: FormKind) => `medgold:${form}-draft`;

function storage(): StorageLike | null {
  try {
    return typeof window === "undefined" ? null : window.sessionStorage;
  } catch {
    return null;
  }
}

/** Keeps what the visitor typed so "Try again" can refill the form after a failed send. */
export function saveDraft<T extends object>(form: FormKind, values: T, store = storage()): void {
  try {
    store?.setItem(draftKey(form), JSON.stringify(values));
  } catch {
    // Storage can be full or blocked; the visitor simply retypes.
  }
}

export function peekDraft<T extends object>(form: FormKind, store = storage()): Partial<T> | null {
  try {
    const raw = store?.getItem(draftKey(form));
    const parsed: unknown = raw ? JSON.parse(raw) : null;
    return parsed && typeof parsed === "object" ? (parsed as Partial<T>) : null;
  } catch {
    return null;
  }
}

/** Returns the saved draft once, then deletes it. */
export function takeDraft<T extends object>(form: FormKind, store = storage()): Partial<T> | null {
  const draft = peekDraft<T>(form, store);
  clearDraft(form, store);
  return draft;
}

export function clearDraft(form: FormKind, store = storage()): void {
  try {
    store?.removeItem(draftKey(form));
  } catch {
    // Nothing to clear.
  }
}
