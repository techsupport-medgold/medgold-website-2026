import { describe, expect, it } from "vitest";
import {
  clearDraft,
  parseForm,
  parseStatus,
  peekDraft,
  saveDraft,
  takeDraft,
  thankYouUrl,
} from "@@/lib/thank-you";

function memoryStore() {
  const data = new Map<string, string>();
  return {
    getItem: (key: string) => data.get(key) ?? null,
    setItem: (key: string, value: string) => void data.set(key, value),
    removeItem: (key: string) => void data.delete(key),
  };
}

describe("thankYouUrl", () => {
  it("builds the status-only URL", () => {
    expect(thankYouUrl("success")).toBe("/thank-you?status=success");
    expect(thankYouUrl("failed")).toBe("/thank-you?status=failed");
  });
});

describe("parseStatus", () => {
  it("reads failed and falls back to success", () => {
    expect(parseStatus({ status: "failed" })).toBe("failed");
    expect(parseStatus({})).toBe("success");
    expect(parseStatus({ status: "oops" })).toBe("success");
  });

  it("uses the first value when a param repeats", () => {
    expect(parseStatus({ status: ["failed", "success"] })).toBe("failed");
  });
});

describe("parseForm", () => {
  it("reads application and falls back to enquiry", () => {
    expect(parseForm("application")).toBe("application");
    expect(parseForm("enquiry")).toBe("enquiry");
    expect(parseForm(undefined)).toBe("enquiry");
    expect(parseForm("other")).toBe("enquiry");
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
