import { describe, expect, it } from "vitest";
import { clearDraft, parseThankYouParams, peekDraft, saveDraft, takeDraft, thankYouUrl } from "@@/lib/thank-you";

function memoryStore() {
  const data = new Map<string, string>();
  return {
    getItem: (key: string) => data.get(key) ?? null,
    setItem: (key: string, value: string) => void data.set(key, value),
    removeItem: (key: string) => void data.delete(key),
  };
}

describe("thankYouUrl", () => {
  it("builds the status URL", () => {
    expect(thankYouUrl("success", "enquiry")).toBe("/thank-you?status=success&form=enquiry");
    expect(thankYouUrl("failed", "application")).toBe("/thank-you?status=failed&form=application");
  });
});

describe("parseThankYouParams", () => {
  it("reads valid values", () => {
    expect(parseThankYouParams({ status: "failed", form: "application" })).toEqual({
      status: "failed",
      form: "application",
    });
  });

  it("falls back to success and enquiry", () => {
    expect(parseThankYouParams({})).toEqual({ status: "success", form: "enquiry" });
    expect(parseThankYouParams({ status: "oops", form: "other" })).toEqual({ status: "success", form: "enquiry" });
  });

  it("uses the first value when a param repeats", () => {
    expect(parseThankYouParams({ status: ["failed", "success"] }).status).toBe("failed");
  });
});

describe("drafts", () => {
  it("saves, peeks and takes a draft once", () => {
    const store = memoryStore();
    saveDraft("enquiry", { name: "Priya" }, store);
    expect(peekDraft("enquiry", store)).toEqual({ name: "Priya" });
    expect(takeDraft("enquiry", store)).toEqual({ name: "Priya" });
    expect(takeDraft("enquiry", store)).toBeNull();
  });

  it("keeps enquiry and application drafts apart", () => {
    const store = memoryStore();
    saveDraft("application", { name: "Arun" }, store);
    expect(peekDraft("enquiry", store)).toBeNull();
    clearDraft("application", store);
    expect(peekDraft("application", store)).toBeNull();
  });

  it("ignores corrupt data and missing storage", () => {
    const store = memoryStore();
    store.setItem("medgold:enquiry-draft", "{not json");
    expect(peekDraft("enquiry", store)).toBeNull();
    expect(peekDraft("enquiry", null)).toBeNull();
  });
});
