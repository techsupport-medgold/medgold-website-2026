import { describe, expect, it } from "vitest";
import type { ApplicationValues } from "@@/lib/application";
import type { EnquiryValues } from "@@/lib/enquiry";
import {
  applicationCandidateEmail,
  applicationCompanyEmail,
  enquiryAcknowledgementEmail,
  enquiryCompanyEmail,
  escapeHtml,
} from "@@/lib/email-templates";

const application: ApplicationValues = {
  name: "Priya Raman",
  phone: "98765 43210",
  email: "priya@example.com",
  position: "Staff Nurse",
  experience: "3-5 years",
  qualification: "B.Sc Nursing",
  city: "Chennai",
  note: "",
};

const enquiry: EnquiryValues = {
  name: "Arun Kumar",
  phone: "+91 91234 56789",
  email: "",
  type: "Nursing Training",
  message: "Please share the next batch dates.",
};

describe("escapeHtml", () => {
  it("escapes markup characters", () => {
    expect(escapeHtml(`<b>"Tom" & 'Jerry'</b>`)).toBe("&lt;b&gt;&quot;Tom&quot; &amp; &#39;Jerry&#39;&lt;/b&gt;");
  });
});

describe("application emails", () => {
  it("builds the company copy with every filled field", () => {
    const email = applicationCompanyEmail(application, "priya-cv.pdf");
    expect(email.subject).toBe("New application: Staff Nurse - Priya Raman");
    expect(email.text).toContain("Phone: +91 9876543210");
    expect(email.text).toContain("Resume: priya-cv.pdf");
    expect(email.text).not.toContain("Note:");
    expect(email.html).toContain("Reply to candidate");
    expect(email.html).toContain("mailto:priya@example.com");
  });

  it("builds the candidate acknowledgement", () => {
    const email = applicationCandidateEmail(application);
    expect(email.subject).toBe("We received your application - MedGold Healthcare");
    expect(email.html).toContain("Thank you for applying, Priya Raman");
    expect(email.text).toContain("within 3 working days");
  });

  it("escapes user input in HTML and keeps subjects on one line", () => {
    const email = applicationCompanyEmail({ ...application, name: "<script>x</script>\nBcc: a@b.c" }, "cv.pdf");
    expect(email.html).not.toContain("<script>");
    expect(email.html).toContain("&lt;script&gt;");
    expect(email.subject).not.toMatch(/[\r\n]/);
  });
});

describe("enquiry emails", () => {
  it("builds the company copy with a call-back link when no email is given", () => {
    const email = enquiryCompanyEmail(enquiry);
    expect(email.subject).toBe("New enquiry: Nursing Training - Arun Kumar");
    expect(email.html).toContain("tel:+919123456789");
    expect(email.text).not.toMatch(/^Email:/m);
    expect(email.text).toContain("Please share the next batch dates.");
  });

  it("offers an email reply when an email is given", () => {
    const email = enquiryCompanyEmail({ ...enquiry, email: "arun@example.com" });
    expect(email.html).toContain("mailto:arun@example.com");
  });

  it("builds the acknowledgement with a copy of the message", () => {
    const email = enquiryAcknowledgementEmail(enquiry);
    expect(email.subject).toBe("We received your enquiry - MedGold Healthcare");
    expect(email.text).toContain("Your message: Please share the next batch dates.");
  });
});
