import { describe, expect, it } from "vitest";
import {
  buildEnquiryMessage,
  normalizeIndianMobile,
  validateEnquiry,
  type EnquiryValues,
} from "@@/lib/enquiry";

const valid: EnquiryValues = {
  name: "Priya Raman",
  phone: "98765 43210",
  email: "priya@example.com",
  type: "Appointment",
  message: "I would like to book a consultation next week.",
};

describe("normalizeIndianMobile", () => {
  it.each([
    ["9876543210", "9876543210"],
    ["98765 43210", "9876543210"],
    ["+91 98765-43210", "9876543210"],
    ["919876543210", "9876543210"],
    ["09876543210", "9876543210"],
  ])("accepts %s", (input, expected) => {
    expect(normalizeIndianMobile(input)).toBe(expected);
  });

  it.each(["12345", "5876543210", "98765432101", "abcdefghij"])("rejects %s", (input) => {
    expect(normalizeIndianMobile(input)).toBeNull();
  });
});

describe("validateEnquiry", () => {
  it("passes a complete enquiry", () => {
    expect(validateEnquiry(valid)).toEqual({});
  });

  it("flags missing required fields", () => {
    const errors = validateEnquiry({ name: "", phone: "", email: "", type: "", message: "" });
    expect(Object.keys(errors).sort()).toEqual(["email", "message", "name", "phone", "type"]);
  });

  it("requires a valid email", () => {
    expect(validateEnquiry({ ...valid, email: "" }).email).toContain("so we can reply");
    expect(validateEnquiry({ ...valid, email: "not-an-email" }).email).toContain("valid email");
  });

  it("requires a message of at least 20 characters", () => {
    expect(validateEnquiry({ ...valid, message: "a".repeat(19) }).message).toContain("at least 20 characters");
    expect(validateEnquiry({ ...valid, message: `  ${"a".repeat(20)}  ` }).message).toBeUndefined();
  });
});

describe("buildEnquiryMessage", () => {
  it("includes the details and normalises the phone", () => {
    const message = buildEnquiryMessage({ ...valid, email: "priya@example.com" });
    expect(message).toContain("Name: Priya Raman");
    expect(message).toContain("Phone: +91 9876543210");
    expect(message).toContain("Email: priya@example.com");
    expect(message).toContain("Enquiry type: Appointment");
    expect(message).toContain("I would like to book a consultation next week.");
  });

  it("omits the email line when blank", () => {
    expect(buildEnquiryMessage({ ...valid, email: "" })).not.toContain("Email:");
  });
});
