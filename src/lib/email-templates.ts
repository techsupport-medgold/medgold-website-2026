import { Routes } from "@@/config/routes";
import { SITE, absoluteUrl } from "@@/config/site";
import { THANK_YOU_CONTENT } from "@@/data/thankYou";
import { formatFileSize, type ApplicationValues } from "@@/lib/application";
import { EMAIL_BANNER } from "@@/lib/email-assets";
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

/**
 * Email clients invert backgrounds but never images, so the logo is baked onto a light plate
 * (public/images/email/medgold-logo-plate.png, 480x200 shown at 240x100) and loaded from the
 * production domain. It only shows in inboxes after it is deployed.
 */
export const EMAIL_ASSET_ORIGIN = (process.env.EMAIL_ASSET_ORIGIN?.trim() || "https://medgoldhealthcare.com").replace(/\/$/, "");
export const EMAIL_LOGO_PLATE = {
  src: `${EMAIL_ASSET_ORIGIN}/images/email/medgold-logo-plate.png`,
  width: 240,
  height: 100,
} as const;

const DARK = { bg: "#0F172A", header: "#1E293B", card: "rgba(248,250,252,.06)", text: "#F8FAFC", muted: "#CBD5E1", link: "#93C5FD" };
const HOOKS: Array<[string, string]> = [
  ["x-bg", `background-color:${DARK.bg} !important;`],
  ["x-container", `background-color:${DARK.bg} !important;`],
  ["x-header", `background-color:${DARK.header} !important;`],
  ["x-card", `background-color:${DARK.card} !important;`],
  ["x-text", `color:${DARK.text} !important;`],
  ["x-muted", `color:${DARK.muted} !important;`],
  ["x-link", `color:${DARK.link} !important;`],
];
const DARK_RULES = HOOKS.map(([cls, rule]) => `.${cls}{${rule}}`).join("");
const OUTLOOK_RULES = HOOKS.map(([cls, rule]) => `[data-ogs${rule.startsWith("color") ? "c" : "b"}] .${cls}{${rule}}`).join("");

export const EMAIL_HEAD_STYLE = `<meta name="color-scheme" content="light dark">
<meta name="supported-color-schemes" content="light dark">
<style>
:root{color-scheme:light dark;supported-color-schemes:light dark;}
@media (prefers-color-scheme: dark){${DARK_RULES}}
${OUTLOOK_RULES}
@media (max-width:600px){.x-container{width:100% !important;}}
</style>`;

/** Escapes, then keeps the visitor's line breaks. */
function escapeMultiline(value: string): string {
  return escapeHtml(value).replace(/\r?\n/g, "<br>");
}

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
  <td class="x-muted" style="padding:10px 12px;border-bottom:1px solid ${COLORS.border};color:${COLORS.muted};font-size:14px;width:38%;vertical-align:top;">${escapeHtml(label)}</td>
  <td class="x-text" style="padding:10px 12px;border-bottom:1px solid ${COLORS.border};color:${COLORS.ink};font-size:14px;font-weight:600;">${escapeMultiline(value)}</td>
</tr>`,
    )
    .join("");
  return `<table class="x-card" role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;background:${COLORS.surface};border-radius:8px;margin:20px 0;">${body}</table>`;
}

function detailsText(rows: Row[]): string {
  return rows.map(([label, value]) => `${label}: ${value}`).join("\n");
}

function button(href: string, label: string): string {
  // Bulletproof button: a solid-colour table cell keeps its colour in light and dark mode.
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="display:inline-table;border-collapse:separate;"><tr><td bgcolor="${COLORS.primary}" style="background-color:${COLORS.primary};border-radius:8px;"><a href="${escapeHtml(href)}" style="display:inline-block;color:#ffffff;text-decoration:none;font-weight:600;font-size:14px;padding:12px 20px;border-radius:8px;">${escapeHtml(label)}</a></td></tr></table>`;
}

type Banner = { cid: string; alt: string; width: number; height: number };

function layout({
  preheader,
  heading,
  eyebrow,
  banner,
  body,
}: {
  preheader: string;
  heading: string;
  eyebrow?: string;
  banner?: Banner;
  body: string;
}): string {
  const footerLink = "color:#ffffff;text-decoration:underline;";
  return `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
${EMAIL_HEAD_STYLE}
<title>${escapeHtml(heading)}</title></head>
<body class="x-bg" style="margin:0;padding:0;background:#EEF3F4;font-family:Arial,Helvetica,sans-serif;">
<div style="display:none;max-height:0;overflow:hidden;">${escapeHtml(preheader)}</div>
<table class="x-bg" role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#EEF3F4;padding:24px 12px;">
<tr><td align="center">
<table class="x-container" role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden;">
<tr><td class="x-header" align="center" style="background:${COLORS.deep};padding:24px 28px;border-bottom:4px solid ${COLORS.gold};text-align:center;">
  <img src="${EMAIL_LOGO_PLATE.src}" width="${EMAIL_LOGO_PLATE.width}" height="${EMAIL_LOGO_PLATE.height}" alt="${BRAND}" style="display:block;margin:0 auto;border:0;outline:none;text-decoration:none;width:${EMAIL_LOGO_PLATE.width}px;height:auto;max-width:100%;">
</td></tr>
${
  banner
    ? `<tr><td style="padding:0;line-height:0;font-size:0;">
  <img src="cid:${banner.cid}" width="${banner.width}" height="${banner.height}" alt="${escapeHtml(banner.alt)}" style="display:block;width:100%;max-width:${banner.width}px;height:auto;border:0;outline:none;text-decoration:none;">
</td></tr>
`
    : ""
}<tr><td class="x-text" style="padding:28px;color:${COLORS.ink};font-size:15px;line-height:1.6;">
  ${
    eyebrow
      ? `<p class="x-muted" style="margin:0 0 6px;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${COLORS.goldInk};">${escapeHtml(eyebrow)}</p>
  <div style="width:40px;height:3px;background:${COLORS.gold};border-radius:2px;margin:0 0 14px;"></div>
  `
      : ""
  }<h1 class="x-text" style="margin:0 0 12px;font-size:22px;color:${COLORS.deep};">${escapeHtml(heading)}</h1>
  ${body}
</td></tr>
<tr><td align="center" style="padding:22px 28px;background:${COLORS.deep};border-top:3px solid ${COLORS.gold};color:#D6E4E7;font-size:12px;line-height:1.7;text-align:center;">
  <strong style="color:${COLORS.gold};font-size:13px;">${BRAND}</strong><br>
  ${escapeHtml(SITE.address.full)}<br>
  Phone: <a href="tel:${SITE.contact.phoneHref}" style="${footerLink}">${SITE.contact.phone}</a>
  &nbsp;|&nbsp; Email: <a href="mailto:${SITE.contact.email}" style="${footerLink}">${SITE.contact.email}</a><br>
  <a href="${SITE_LINK}" style="${footerLink}">${SITE_LINK.replace(/^https?:\/\//, "")}</a>
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
  return `<p class="x-text" style="margin:0 0 12px;">${text}</p>`;
}

function applicationRows(values: ApplicationValues): Row[] {
  return rowsFrom([
    ["Name", values.name],
    ["Position", values.position],
    ["Experience", values.experience],
    ["Qualification", values.qualification],
    ["Phone", formatPhone(values.phone)],
    ["Email", values.email],
    ["Current city", values.city],
    ["Note", values.note],
  ]);
}

export type ResumeInfo = { name: string; size: number };

function fileBadge(fileName: string): string {
  return /\.pdf$/i.test(fileName) ? "PDF" : "DOC";
}

function resumeCard(resume: ResumeInfo): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate;border:1px solid ${COLORS.border};border-radius:10px;margin:20px 0;">
<tr>
  <td width="56" style="padding:14px 0 14px 14px;vertical-align:middle;">
    <div style="width:44px;height:52px;line-height:52px;border-radius:6px;background:${COLORS.primary};color:#ffffff;font-size:12px;font-weight:700;text-align:center;letter-spacing:1px;">${fileBadge(resume.name)}</div>
  </td>
  <td style="padding:14px;vertical-align:middle;">
    <div style="font-size:12px;color:${COLORS.muted};text-transform:uppercase;letter-spacing:1px;">Resume attached</div>
    <div style="font-size:15px;font-weight:700;color:${COLORS.ink};word-break:break-all;">${escapeHtml(resume.name)}</div>
    <div style="font-size:13px;color:${COLORS.muted};">${escapeHtml(formatFileSize(resume.size))}</div>
  </td>
</tr>
<tr><td colspan="2" style="padding:10px 14px;background:#FBF6E6;border-top:1px solid ${COLORS.border};border-radius:0 0 10px 10px;font-size:13px;color:${COLORS.goldInk};">
  Attached to this email. Open or download it from the attachments below.
</td></tr>
</table>`;
}

export function applicationCompanyEmail(values: ApplicationValues, resume: ResumeInfo): EmailContent {
  const name = oneLine(values.name);
  const rows = applicationRows(values);
  const replyHref = `mailto:${values.email.trim()}?subject=${encodeURIComponent(`Your application for ${oneLine(values.position)} at ${BRAND}`)}`;
  return {
    subject: `New application: ${oneLine(values.position)} - ${name}`,
    html: layout({
      preheader: `${name} applied for ${values.position}.`,
      heading: "New job application",
      body: [
        paragraph(`<strong>${escapeHtml(name)}</strong> applied for <strong>${escapeHtml(values.position.trim())}</strong> through the careers page. Their resume is attached below.`),
        resumeCard(resume),
        detailsTable(rows),
        `<p style="margin:0;">${button(replyHref, "Reply to candidate")}</p>`,
      ].join(""),
    }),
    text: [
      "New job application from the website",
      "",
      detailsText(rows),
      `Resume (attached): ${resume.name}, ${formatFileSize(resume.size)}`,
      "",
      "Reply to this email to contact the candidate.",
      "",
      textFooter(),
    ].join("\n"),
  };
}

function stepsPanel(heading: string, steps: readonly string[]): string {
  const rows = steps
    .map(
      (step, index) => `<tr>
  <td width="40" style="padding:6px 0;vertical-align:top;">
    <div style="width:28px;height:28px;line-height:28px;border-radius:14px;background:${COLORS.gold};color:${COLORS.ink};font-size:13px;font-weight:700;text-align:center;">${index + 1}</div>
  </td>
  <td style="padding:10px 0 6px;vertical-align:top;font-size:14px;line-height:1.5;color:${COLORS.muted};">${step}</td>
</tr>`,
    )
    .join("");
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#E8F1F3;border-radius:10px;margin:20px 0;">
<tr><td style="padding:18px 20px;">
  <div style="font-size:16px;font-weight:700;color:${COLORS.deep};margin-bottom:8px;">${escapeHtml(heading)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows}</table>
</td></tr>
</table>`;
}

function pill(text: string): string {
  return `<p style="margin:16px 0;"><span style="display:inline-block;background:#FBF3D9;color:${COLORS.goldInk};font-size:14px;font-weight:700;padding:8px 16px;border-radius:999px;">&#10022;&nbsp; ${escapeHtml(text)}</span></p>`;
}

export function applicationCandidateEmail(values: ApplicationValues): EmailContent {
  const content = THANK_YOU_CONTENT.application.success;
  const name = oneLine(values.name);
  const position = values.position.trim();
  const phone = formatPhone(values.phone);
  const steps = [
    ...(content.steps ?? []).map(escapeHtml),
    `Keep your phone handy; we will call you on <strong>${escapeHtml(phone)}</strong>.`,
  ];
  const heading = `${content.heading}, ${name}`;
  const encouragement = content.encouragement ?? "";
  return {
    subject: `We received your application - ${BRAND}`,
    html: layout({
      preheader: `Thank you for applying for ${position}. ${encouragement}`,
      eyebrow: content.eyebrow,
      heading,
      banner: content.image
        ? { cid: EMAIL_BANNER.cid, alt: content.image.alt, width: EMAIL_BANNER.width, height: EMAIL_BANNER.height }
        : undefined,
      body: [
        paragraph(escapeHtml(content.intro)),
        paragraph(`We have received your application for <strong>${escapeHtml(position)}</strong>, along with your resume.`),
        encouragement ? pill(encouragement) : "",
        stepsPanel(content.stepsHeading ?? "What happens next", steps),
        `<p style="margin:0 0 20px;">${button(absoluteUrl(Routes.ABOUT), "Learn about us")}</p>`,
        paragraph(`Questions in the meantime? Call us on <a href="tel:${SITE.contact.phoneHref}" class="x-link" style="color:${COLORS.primary};">${SITE.contact.phone}</a> or simply reply to this email.`),
        paragraph(`Warm regards,<br><strong>The ${BRAND} team</strong>`),
      ].join(""),
    }),
    text: [
      heading,
      "",
      content.intro,
      `We have received your application for ${position}, along with your resume.`,
      "",
      encouragement,
      "",
      content.stepsHeading ?? "What happens next",
      ...(content.steps ?? []).map((step, index) => `${index + 1}. ${step}`),
      `${(content.steps?.length ?? 0) + 1}. Keep your phone handy; we will call you on ${phone}.`,
      "",
      `Learn about us: ${absoluteUrl(Routes.ABOUT)}`,
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
        paragraph(`Need us sooner? Call <a href="tel:${SITE.contact.phoneHref}" class="x-link" style="color:${COLORS.primary};">${SITE.contact.phone}</a> or simply reply to this email.`),
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
