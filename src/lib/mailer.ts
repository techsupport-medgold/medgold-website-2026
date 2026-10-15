import "server-only";
import nodemailer, { type Transporter } from "nodemailer";
import { SITE } from "@@/config/site";
import { EMAIL_BANNER, EMAIL_LOGO } from "@@/lib/email-assets";

export type MailAttachment = { filename: string; content: Buffer; contentType?: string };

export type Mail = {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
  attachments?: MailAttachment[];
};

let transporter: Transporter | null = null;

function mailConfig() {
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_APP_PASSWORD?.replace(/\s+/g, "");
  const inbox = process.env.MAIL_TO?.trim() || user;
  if (!user || !pass || !inbox) {
    throw new Error("Email is not configured: set SMTP_USER, SMTP_APP_PASSWORD and MAIL_TO.");
  }
  return { user, pass, inbox };
}

/** Address that receives the company copy of applications and enquiries. */
export function companyInbox(): string {
  return mailConfig().inbox;
}

export async function sendMail(mail: Mail): Promise<void> {
  const { user, pass } = mailConfig();
  transporter ??= nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user, pass },
  });
  await transporter.sendMail({
    from: { name: "MedGold Healthcare", address: user },
    ...mail,
    attachments: [...inlineImages(mail.html), ...(mail.attachments ?? [])],
  });
}

const INLINE_IMAGES = [
  { asset: EMAIL_LOGO, filename: "medgold-logo.png", contentType: "image/png" },
  { asset: EMAIL_BANNER, filename: "medgold-careers.jpg", contentType: "image/jpeg" },
];

/** Attaches only the inline images the HTML actually references, so emails stay small. */
function inlineImages(html: string) {
  return INLINE_IMAGES.filter(({ asset }) => html.includes(`cid:${asset.cid}`)).map(
    ({ asset, filename, contentType }) => ({
      filename,
      content: Buffer.from(asset.base64, "base64"),
      contentType,
      cid: asset.cid,
      contentDisposition: "inline" as const,
    }),
  );
}

export const MAIL_FAILURE_MESSAGE = `We couldn't send your details right now. Please try again, or reach us on WhatsApp or call ${SITE.contact.phone}.`;
