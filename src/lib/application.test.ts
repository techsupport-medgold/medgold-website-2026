import { describe, expect, it } from "vitest";
import { buildApplicationMessage, validateApplication, type ApplicationValues } from "@@/lib/application";

const valid: ApplicationValues = {
  name: "Priya Raman",
  phone: "98765 43210",
  email: "",
  position: "Staff Nurse",
  experience: "3-5 years",
  qualification: "B.Sc Nursing",
  city: "",
  note: "",
};

describe("validateApplication", () => {
  it("accepts a complete application", () => {
    expect(validateApplication(valid)).toEqual({});
  });

  it("flags every required field when empty", () => {
    const errors = validateApplication({
      name: "",
      phone: "",
      email: "",
      position: "",
      experience: "",
      qualification: "",
      city: "",
      note: "",
    });
    expect(Object.keys(errors).sort()).toEqual(["experience", "name", "phone", "position", "qualification"]);
  });

  it("rejects an invalid mobile number and an invalid optional email", () => {
    const errors = validateApplication({ ...valid, phone: "12345", email: "not-an-email" });
    expect(errors.phone).toBeDefined();
    expect(errors.email).toBeDefined();
  });
});

describe("buildApplicationMessage", () => {
  it("includes the key details and the resume reminder", () => {
    const message = buildApplicationMessage({ ...valid, city: "Chennai", note: "Available immediately." });
    expect(message).toContain("New job application from the Med Gold website");
    expect(message).toContain("Phone: +91 9876543210");
    expect(message).toContain("Position: Staff Nurse");
    expect(message).toContain("Current city: Chennai");
    expect(message).toContain("Available immediately.");
    expect(message).toContain("I will attach my resume in this chat.");
  });

  it("omits optional lines when blank", () => {
    const message = buildApplicationMessage(valid);
    expect(message).not.toContain("Email:");
    expect(message).not.toContain("Current city:");
    expect(message).not.toContain("Note:");
  });
});
