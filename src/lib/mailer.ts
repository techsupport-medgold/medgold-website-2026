import "server-only";
import nodemailer, { type Transporter } from "nodemailer";
import { EMAIL_BANNER, EMAIL_LOGO } from "@@/lib/email-assets";
import { MAIL_FAILURE_MESSAGE } from "@@/lib/form-action";

export { MAIL_FAILURE_MESSAGE };

export type MailAttachment = { filename: string; content: Buffer; contentType?: string };

export type Mail = {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
  attachments?: MailAttachment[];
};

const SMTP_TIMEOUT_MS = 10_000;
const SMTP_SOCKET_TIMEOUT_MS = 20_000;

function mailConfig() {
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_APP_PASSWORD?.replace(/\s+/g, "");
  const inbox = process.env.MAIL_TO?.trim() || user;
  const missing = [
    user ? null : "SMTP_USER",
    pass ? null : "SMTP_APP_PASSWORD",
    inbox ? null : "MAIL_TO",
  ].filter((name): name is string => name !== null);
  if (missing.length > 0) {
    console.error(`Email is not configured. Missing environment variable: ${missing.join(", ")}`);
    throw new Error(`Email is not configured: set ${missing.join(", ")}.`);
  }
  return { user: user as string, pass: pass as string, inbox: inbox as string };
}

/** SMTP fields that are safe to log. The AUTH command can contain the password, so it is omitted. */
function safeMailError(error: unknown) {
  if (!error || typeof error !== "object") {
    return { message: "Unknown mail error" };
  }
  const record = error as { code?: unknown; responseCode?: unknown; response?: unknown; message?: unknown };
  const detail: { code?: string; responseCode?: number; response?: string; message?: string } = {};
  if (typeof record.code === "string") detail.code = record.code;
  if (typeof record.responseCode === "number") detail.responseCode = record.responseCode;
  if (typeof record.response === "string") detail.response = record.response.replace(/\s+/g, " ").slice(0, 300);
  if (typeof record.message === "string") detail.message = record.message.replace(/\s+/g, " ").slice(0, 300);
  return detail;
}

/** Address that receives the company copy of applications and enquiries. */
export function companyInbox(): string {
  return mailConfig().inbox;
}

export async function sendMail(mail: Mail): Promise<void> {
  const { user, pass } = mailConfig();
  const transport: Transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user, pass },
    connectionTimeout: SMTP_TIMEOUT_MS,
    greetingTimeout: SMTP_TIMEOUT_MS,
    socketTimeout: SMTP_SOCKET_TIMEOUT_MS,
  });
  try {
    await transport.sendMail({
      from: { name: "MedGold Healthcare", address: user },
      ...mail,
      attachments: [...inlineImages(mail.html), ...(mail.attachments ?? [])],
    });
  } catch (error) {
    console.error("SMTP send failed", safeMailError(error));
    throw new Error("Email could not be sent");
  } finally {
    transport.close();
  }
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
