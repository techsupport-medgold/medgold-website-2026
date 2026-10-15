import "server-only";
import nodemailer, { type Transporter } from "nodemailer";
import { SITE } from "@@/config/site";

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
  await transporter.sendMail({ from: { name: "MedGold Healthcare", address: user }, ...mail });
}

export const MAIL_FAILURE_MESSAGE = `We couldn't send your details right now. Please try again, or reach us on WhatsApp or call ${SITE.contact.phone}.`;
