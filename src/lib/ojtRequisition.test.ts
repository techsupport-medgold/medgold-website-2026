import { describe, expect, it } from "vitest";
import { buildRequisitionMessage, validateRequisition, type RequisitionValues } from "@@/lib/ojtRequisition";

const valid: RequisitionValues = {
  facility: "City Care Hospital",
  contact: "A. Kumar, Nursing Director",
  email: "nursing.admin@example.org",
  phone: "98765 43210",
  aides: "",
  timeline: "",
  challenges: "",
};

describe("validateRequisition", () => {
  it("passes a complete requisition", () => {
    expect(validateRequisition(valid)).toEqual({});
  });

  it("flags every required field when empty", () => {
    const errors = validateRequisition({ ...valid, facility: "", contact: "", email: "", phone: "" });
    expect(Object.keys(errors).sort()).toEqual(["contact", "email", "facility", "phone"]);
  });

  it("flags an invalid email and phone", () => {
    const errors = validateRequisition({ ...valid, email: "not-an-email", phone: "12345" });
    expect(errors.email).toBeDefined();
    expect(errors.phone).toBeDefined();
  });
});

describe("buildRequisitionMessage", () => {
  it("includes required details and normalises the phone", () => {
    const message = buildRequisitionMessage(valid);
    expect(message).toContain("Facility: City Care Hospital");
    expect(message).toContain("Phone: +91 9876543210");
    expect(message).not.toContain("Aides to train:");
    expect(message).not.toContain("Priority areas:");
  });

  it("adds optional details when provided", () => {
    const message = buildRequisitionMessage({
      ...valid,
      aides: "26 to 50 Attendants / GDAs (Two Cohorts)",
      timeline: "Within the next 30 days",
      challenges: "Inpatient falls",
    });
    expect(message).toContain("Aides to train: 26 to 50 Attendants / GDAs (Two Cohorts)");
    expect(message).toContain("Preferred start: Within the next 30 days");
    expect(message).toContain("Inpatient falls");
  });
});
