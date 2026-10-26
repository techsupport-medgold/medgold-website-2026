import { describe, expect, it } from "vitest";
import {
  RESUME_MAX_BYTES,
  buildApplicationMessage,
  formatFileSize,
  resumeContentType,
  safeAttachmentName,
  validateApplication,
  validateResume,
  type ApplicationValues,
} from "@@/lib/application";

const valid: ApplicationValues = {
  name: "Priya Raman",
  phone: "98765 43210",
  email: "priya@example.com",
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
    expect(Object.keys(errors).sort()).toEqual(["email", "experience", "name", "phone", "position", "qualification"]);
  });

  it("rejects a position or experience level that is not on the form", () => {
    expect(validateApplication({ ...valid, position: "CEO of everything" }).position).toBeDefined();
    expect(validateApplication({ ...valid, experience: "100 years" }).experience).toBeDefined();
  });

  it("rejects an invalid mobile number and an invalid email", () => {
    const errors = validateApplication({ ...valid, phone: "12345", email: "not-an-email" });
    expect(errors.phone).toBeDefined();
    expect(errors.email).toContain("valid email");
  });
});

describe("validateResume", () => {
  it("requires a file", () => {
    expect(validateResume(null)).toContain("Upload your resume");
    expect(validateResume({ name: "cv.pdf", size: 0 })).toContain("Upload your resume");
  });

  it("accepts PDF, DOC and DOCX up to 4 MB", () => {
    expect(validateResume({ name: "cv.pdf", size: 200_000 })).toBeNull();
    expect(validateResume({ name: "CV.DOCX", size: RESUME_MAX_BYTES })).toBeNull();
    expect(validateResume({ name: "cv.doc", size: 1024 })).toBeNull();
  });

  it("rejects other file types and files over 4 MB", () => {
    expect(validateResume({ name: "photo.jpg", size: 1024 })).toContain("PDF, DOC or DOCX");
    expect(validateResume({ name: "cv.pdf", size: RESUME_MAX_BYTES + 1 })).toContain("4 MB or less");
  });

  it("strips path and header characters from a resume file name", () => {
    expect(safeAttachmentName("../../secret.pdf")).toBe("secret.pdf");
    expect(safeAttachmentName("cv.pdf\r\nBcc: evil@example.com")).toBe("cv.pdfBcc evilexample.com");
    expect(safeAttachmentName("...")).toBe("resume");
  });

  it("maps extensions to content types", () => {
    expect(resumeContentType("resume.pdf")).toBe("application/pdf");
    expect(resumeContentType("resume.exe")).toBeNull();
  });

  it("formats file sizes", () => {
    expect(formatFileSize(512)).toBe("1 KB");
    expect(formatFileSize(250 * 1024)).toBe("250 KB");
    expect(formatFileSize(5 * 1024 * 1024)).toBe("5.0 MB");
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
    const message = buildApplicationMessage({ ...valid, email: "" });
    expect(message).not.toContain("Email:");
    expect(message).not.toContain("Current city:");
    expect(message).not.toContain("Note:");
  });
});
