import { describe, expect, it } from "vitest";
import type { ApplicationValues } from "@@/lib/application";
import type { EnquiryValues } from "@@/lib/enquiry";
import {
  applicationCandidateEmail,
  applicationCompanyEmail,
  enquiryAcknowledgementEmail,
  enquiryCompanyEmail,
  EMAIL_LOGO_PLATE,
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

const resume = { name: "priya-cv.pdf", size: 245_760 };

describe("email layout", () => {
  const emails = () => [
    applicationCompanyEmail(application, resume),
    applicationCandidateEmail(application),
    enquiryCompanyEmail(enquiry),
    enquiryAcknowledgementEmail(enquiry),
  ];

  it("shows the centred light-plate logo in every template", () => {
    for (const email of emails()) {
      expect(email.html).toContain(`src="${EMAIL_LOGO_PLATE.src}"`);
      expect(email.html).toContain('alt="MedGold Healthcare"');
      expect(email.html).toMatch(/<td class="x-header" align="center"[^>]*>\s*<img src="https:\/\/medgoldhealthcare\.com\//);
    }
  });

  it("uses the deep brand colour for the footer", () => {
    for (const email of emails()) {
      expect(email.html).toContain("background:#084E5D;border-top:3px solid #D4AF37");
    }
  });
});

describe("application emails", () => {
  it("builds the company copy with every filled field and a resume card", () => {
    const email = applicationCompanyEmail(application, resume);
    expect(email.subject).toBe("New application: Staff Nurse - Priya Raman");
    expect(email.text).toContain("Phone: +91 9876543210");
    expect(email.text).toContain("Resume (attached): priya-cv.pdf, 240 KB");
    expect(email.text).not.toContain("Note:");
    expect(email.html).toContain("Resume attached");
    expect(email.html).toContain(">PDF<");
    expect(email.html).toContain("240 KB");
    expect(email.html).not.toMatch(/>Resume<\/td>/);
    expect(email.html).toContain("Reply to candidate");
    expect(email.html).toContain("mailto:priya@example.com");
  });

  it("builds the candidate acknowledgement with the same warm copy as the website", () => {
    const email = applicationCandidateEmail(application);
    expect(email.subject).toBe("We received your application - MedGold Healthcare");
    expect(email.html).toContain("Your next great opportunity is on its way, Priya Raman");
    expect(email.html).toContain('src="cid:medgold-careers-banner"');
    expect(email.html).toContain("A wonderful opportunity could be just a call away.");
    expect(email.html).toContain("What happens next");
    expect(email.html).not.toContain("We&#39;ve emailed you a confirmation");
    expect(email.text).toContain("we will call you on +91 9876543210");
  });

  it("only the candidate email carries the banner", () => {
    expect(applicationCompanyEmail(application, resume).html).not.toContain("cid:medgold-careers-banner");
    expect(enquiryAcknowledgementEmail(enquiry).html).not.toContain("cid:medgold-careers-banner");
  });

  it("escapes user input in HTML and keeps subjects on one line", () => {
    const email = applicationCompanyEmail({ ...application, name: "<script>x</script>\nBcc: a@b.c" }, resume);
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

describe("dark/light-safe email layout", () => {
  const sample: EnquiryValues = {
    name: "Priya Raman",
    phone: "98765 43210",
    email: "priya@example.com",
    type: "Appointment",
    message: `Hi <b>team</b> & "friends"\nSecond line`,
  };
  const { html, text } = enquiryCompanyEmail(sample);

  it("declares light and dark colour schemes with Outlook rules", () => {
    expect(html).toContain('<meta name="color-scheme" content="light dark">');
    expect(html).toContain('<meta name="supported-color-schemes" content="light dark">');
    expect(html).toContain(":root{color-scheme:light dark;");
    expect(html).toContain("@media (prefers-color-scheme: dark)");
    expect(html).toContain("[data-ogsc]");
    expect(html).toContain("[data-ogsb]");
  });
  it("uses the light-plate logo by absolute https URL with size and alt", () => {
    expect(EMAIL_LOGO_PLATE.src).toBe("https://medgoldhealthcare.com/images/email/medgold-logo-plate.png");
    expect(html).toContain(`src="${EMAIL_LOGO_PLATE.src}" width="240" height="100" alt="MedGold Healthcare"`);
    expect(html).not.toContain("cid:medgold-logo");
  });
  it("uses presentation tables", () => {
    expect(html).toContain('role="presentation"');
  });
  it("escapes user input and keeps line breaks", () => {
    expect(html).toContain("Hi &lt;b&gt;team&lt;/b&gt; &amp; &quot;friends&quot;<br>Second line");
  });
  it("has a plain-text part with the message and no tags", () => {
    expect(text).toContain("Second line");
    expect(text).not.toMatch(/<\/?(p|td|table|br|a)\b/i);
  });
  it("renders the auto-reply subject and body", () => {
    const reply = enquiryAcknowledgementEmail(sample);
    expect(reply.subject).toBe("We received your enquiry - MedGold Healthcare");
    expect(reply.html).toContain("Thank you, Priya Raman");
    expect(reply.html).toContain("prefers-color-scheme: dark");
  });
});
