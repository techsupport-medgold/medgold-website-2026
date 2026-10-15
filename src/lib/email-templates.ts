import { SITE } from "@@/config/site";
import type { ApplicationValues } from "@@/lib/application";
import { normalizeIndianMobile, type EnquiryValues } from "@@/lib/enquiry";

export type EmailContent = { subject: string; html: string; text: string };

const BRAND = "MedGold Healthcare";
const COLORS = {
  primary: "#0B6376",
  deep: "#084E5D",
  gold: "#D4AF37",
  goldInk: "#876A14",
  ink: "#1F2937",
  muted: "#4B5563",
  surface: "#F3F7F8",
  border: "#E5E7EB",
};
const SITE_LINK = SITE.url;

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Strips line breaks so user input can't add lines to a subject header. */
function oneLine(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function formatPhone(phone: string): string {
  return `+91 ${normalizeIndianMobile(phone) ?? phone.trim()}`;
}

type Row = [label: string, value: string];

function rowsFrom(entries: Array<[string, string]>): Row[] {
  return entries.filter(([, value]) => value.trim()).map(([label, value]) => [label, value.trim()]);
}

function detailsTable(rows: Row[]): string {
  const body = rows
    .map(
      ([label, value]) => `<tr>
  <td style="padding:10px 12px;border-bottom:1px solid ${COLORS.border};color:${COLORS.muted};font-size:14px;width:38%;vertical-align:top;">${escapeHtml(label)}</td>
  <td style="padding:10px 12px;border-bottom:1px solid ${COLORS.border};color:${COLORS.ink};font-size:14px;font-weight:600;white-space:pre-wrap;">${escapeHtml(value)}</td>
</tr>`,
    )
    .join("");
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;background:${COLORS.surface};border-radius:8px;margin:20px 0;">${body}</table>`;
}

function detailsText(rows: Row[]): string {
  return rows.map(([label, value]) => `${label}: ${value}`).join("\n");
}

function button(href: string, label: string): string {
  return `<a href="${escapeHtml(href)}" style="display:inline-block;background:${COLORS.primary};color:#ffffff;text-decoration:none;font-weight:600;font-size:14px;padding:12px 20px;border-radius:8px;">${escapeHtml(label)}</a>`;
}

function layout({ preheader, heading, body }: { preheader: string; heading: string; body: string }): string {
  return `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(heading)}</title></head>
<body style="margin:0;padding:0;background:#EEF3F4;font-family:Arial,Helvetica,sans-serif;">
<div style="display:none;max-height:0;overflow:hidden;">${escapeHtml(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#EEF3F4;padding:24px 12px;">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden;">
<tr><td style="background:${COLORS.deep};padding:20px 28px;border-bottom:4px solid ${COLORS.gold};">
  <span style="color:#ffffff;font-size:20px;font-weight:700;letter-spacing:0.5px;">MED<span style="color:${COLORS.gold};">GOLD</span></span>
  <span style="display:block;color:#CFE3E8;font-size:11px;letter-spacing:3px;margin-top:2px;">HEALTHCARE</span>
</td></tr>
<tr><td style="padding:28px;color:${COLORS.ink};font-size:15px;line-height:1.6;">
  <h1 style="margin:0 0 12px;font-size:22px;color:${COLORS.deep};">${escapeHtml(heading)}</h1>
  ${body}
</td></tr>
<tr><td style="padding:20px 28px;background:${COLORS.surface};color:${COLORS.muted};font-size:12px;line-height:1.6;">
  <strong style="color:${COLORS.deep};">${BRAND}</strong><br>
  ${escapeHtml(SITE.address.full)}<br>
  Phone: <a href="tel:${SITE.contact.phoneHref}" style="color:${COLORS.primary};">${SITE.contact.phone}</a>
  &nbsp;|&nbsp; Email: <a href="mailto:${SITE.contact.email}" style="color:${COLORS.primary};">${SITE.contact.email}</a><br>
  <a href="${SITE_LINK}" style="color:${COLORS.primary};">${SITE_LINK.replace(/^https?:\/\//, "")}</a>
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}

function textFooter(): string {
  return [
    "--",
    BRAND,
    SITE.address.full,
    `Phone: ${SITE.contact.phone} | Email: ${SITE.contact.email}`,
    SITE_LINK,
  ].join("\n");
}

function paragraph(text: string): string {
  return `<p style="margin:0 0 12px;">${text}</p>`;
}

function applicationRows(values: ApplicationValues, resumeName?: string): Row[] {
  return rowsFrom([
    ["Name", values.name],
    ["Position", values.position],
    ["Experience", values.experience],
    ["Qualification", values.qualification],
    ["Phone", formatPhone(values.phone)],
    ["Email", values.email],
    ["Current city", values.city],
    ["Resume", resumeName ?? ""],
    ["Note", values.note],
  ]);
}

export function applicationCompanyEmail(values: ApplicationValues, resumeName: string): EmailContent {
  const name = oneLine(values.name);
  const rows = applicationRows(values, resumeName);
  const replyHref = `mailto:${values.email.trim()}?subject=${encodeURIComponent(`Your application for ${oneLine(values.position)} at ${BRAND}`)}`;
  return {
    subject: `New application: ${oneLine(values.position)} - ${name}`,
    html: layout({
      preheader: `${name} applied for ${values.position}.`,
      heading: "New job application",
      body: [
        paragraph(`<strong>${escapeHtml(name)}</strong> applied for <strong>${escapeHtml(values.position.trim())}</strong> through the careers page. The resume is attached.`),
        detailsTable(rows),
        `<p style="margin:0;">${button(replyHref, "Reply to candidate")}</p>`,
      ].join(""),
    }),
    text: [
      "New job application from the website",
      "",
      detailsText(rows),
      "",
      "The resume is attached. Reply to this email to contact the candidate.",
      "",
      textFooter(),
    ].join("\n"),
  };
}

export function applicationCandidateEmail(values: ApplicationValues): EmailContent {
  const name = oneLine(values.name);
  const position = values.position.trim();
  return {
    subject: `We received your application - ${BRAND}`,
    html: layout({
      preheader: `Thank you for applying for ${position}.`,
      heading: `Thank you for applying, ${name}`,
      body: [
        paragraph(`We have received your application for <strong>${escapeHtml(position)}</strong> at ${BRAND}, along with your resume.`),
        paragraph("<strong>What happens next</strong>"),
        `<ol style="margin:0 0 16px;padding-left:20px;">
  <li style="margin-bottom:6px;">Our team reviews applications within 3 working days.</li>
  <li style="margin-bottom:6px;">If your profile matches the role, we will call you to arrange an interview.</li>
  <li>Keep your phone handy; we will contact you on ${escapeHtml(formatPhone(values.phone))}.</li>
</ol>`,
        paragraph(`Questions in the meantime? Call us on <a href="tel:${SITE.contact.phoneHref}" style="color:${COLORS.primary};">${SITE.contact.phone}</a> or simply reply to this email.`),
        paragraph(`Warm regards,<br><strong>The ${BRAND} team</strong>`),
      ].join(""),
    }),
    text: [
      `Thank you for applying, ${name}`,
      "",
      `We have received your application for ${position} at ${BRAND}, along with your resume.`,
      "",
      "What happens next",
      "1. Our team reviews applications within 3 working days.",
      "2. If your profile matches the role, we will call you to arrange an interview.",
      `3. Keep your phone handy; we will contact you on ${formatPhone(values.phone)}.`,
      "",
      `Questions in the meantime? Call us on ${SITE.contact.phone} or simply reply to this email.`,
      "",
      "Warm regards,",
      `The ${BRAND} team`,
      "",
      textFooter(),
    ].join("\n"),
  };
}

function enquiryRows(values: EnquiryValues): Row[] {
  return rowsFrom([
    ["Name", values.name],
    ["Enquiry type", values.type],
    ["Phone", formatPhone(values.phone)],
    ["Email", values.email],
    ["Message", values.message],
  ]);
}

export function enquiryCompanyEmail(values: EnquiryValues): EmailContent {
  const name = oneLine(values.name);
  const rows = enquiryRows(values);
  const email = values.email.trim();
  return {
    subject: `New enquiry: ${oneLine(values.type)} - ${name}`,
    html: layout({
      preheader: `${name} sent a ${values.type} enquiry.`,
      heading: "New website enquiry",
      body: [
        paragraph(`<strong>${escapeHtml(name)}</strong> sent an enquiry through the contact page.`),
        detailsTable(rows),
        `<p style="margin:0;">${
          email
            ? button(`mailto:${email}`, "Reply by email")
            : button(`tel:+91${normalizeIndianMobile(values.phone) ?? ""}`, "Call back")
        }</p>`,
      ].join(""),
    }),
    text: [
      "New enquiry from the website",
      "",
      detailsText(rows),
      "",
      email ? "Reply to this email to contact them." : "No email given; please call them back.",
      "",
      textFooter(),
    ].join("\n"),
  };
}

export function enquiryAcknowledgementEmail(values: EnquiryValues): EmailContent {
  const name = oneLine(values.name);
  const rows = rowsFrom([
    ["Enquiry type", values.type],
    ["Your message", values.message],
  ]);
  return {
    subject: `We received your enquiry - ${BRAND}`,
    html: layout({
      preheader: "Thank you for contacting MedGold Healthcare.",
      heading: `Thank you, ${name}`,
      body: [
        paragraph(`Thank you for contacting ${BRAND}. Our team will review your enquiry and get back to you soon.`),
        paragraph("Here is a copy of what you sent us:"),
        detailsTable(rows),
        paragraph(`Need us sooner? Call <a href="tel:${SITE.contact.phoneHref}" style="color:${COLORS.primary};">${SITE.contact.phone}</a> or simply reply to this email.`),
        paragraph(`Warm regards,<br><strong>The ${BRAND} team</strong>`),
      ].join(""),
    }),
    text: [
      `Thank you, ${name}`,
      "",
      `Thank you for contacting ${BRAND}. Our team will review your enquiry and get back to you soon.`,
      "",
      "Here is a copy of what you sent us:",
      detailsText(rows),
      "",
      `Need us sooner? Call ${SITE.contact.phone} or simply reply to this email.`,
      "",
      "Warm regards,",
      `The ${BRAND} team`,
      "",
      textFooter(),
    ].join("\n"),
  };
}
