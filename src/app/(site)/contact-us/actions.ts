"use server";

import { headers } from "next/headers";
import { handleEnquiry, type EnquiryResult } from "@@/lib/enquiry-handler";
import {
  clientIp,
  createRateLimiter,
  formTokenSecret,
  isAllowedOrigin,
  issueToken,
  verifyTurnstile,
} from "@@/lib/form-security";
import { MAIL_FAILURE_MESSAGE, companyInbox, sendMail } from "@@/lib/mailer";

const limiter = createRateLimiter({ limit: 5, windowMs: 10 * 60 * 1000 });

/** Called by the form on mount, so the contact page itself stays static. */
export async function getEnquiryToken(): Promise<string> {
  return issueToken(formTokenSecret());
}

export async function submitEnquiry(formData: FormData): Promise<EnquiryResult> {
  return handleEnquiry(
    formData,
    {
      headers: await headers(),
      secret: formTokenSecret(),
      isAllowedOrigin: (h) => isAllowedOrigin(h),
      clientIp,
      rateLimit: (ip) => limiter.hit(ip),
      verifyTurnstile: (response, ip) => verifyTurnstile(response, ip),
      sendMail,
      companyInbox,
      autoReply: process.env.CONTACT_AUTO_REPLY?.trim().toLowerCase() === "true",
    },
    MAIL_FAILURE_MESSAGE,
  );
}
