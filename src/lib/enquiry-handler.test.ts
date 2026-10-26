import { describe, expect, it, vi } from "vitest";
import { EXPIRED_MESSAGE, RATE_LIMIT_MESSAGE, handleEnquiry, type EnquiryDeps } from "@@/lib/enquiry-handler";
import { HONEYPOT_FIELD, TOKEN_FIELD } from "@@/lib/form-action";
import { TOKEN_MAX_AGE_MS, issueToken } from "@@/lib/form-security";
import type { Mail } from "@@/lib/mailer";

const SECRET = "s";
const NOW = 1_760_000_000_000;

function form(overrides: Record<string, string> = {}) {
  const data = new FormData();
  const fields = {
    name: "Priya Raman",
    phone: "98765 43210",
    email: "priya@example.com",
    type: "Appointment",
    message: 'Is 5 < 6 & "quote" ready?\nPlease call next week.',
    [TOKEN_FIELD]: issueToken(SECRET, NOW - 10_000),
    [HONEYPOT_FIELD]: "",
    ...overrides,
  };
  Object.entries(fields).forEach(([k, v]) => data.set(k, v));
  return data;
}

function deps(overrides: Partial<EnquiryDeps> = {}) {
  const sent: Mail[] = [];
  const log = vi.fn();
  const d: EnquiryDeps = {
    headers: new Headers({ origin: "https://medgoldhealthcare.com" }),
    secret: SECRET,
    now: NOW,
    isAllowedOrigin: () => true,
    clientIp: () => "1.1.1.1",
    rateLimit: () => true,
    verifyTurnstile: async () => true,
    sendMail: async (mail) => {
      sent.push(mail);
    },
    companyInbox: () => "sundharmedgold@gmail.com",
    autoReply: false,
    log,
    ...overrides,
  };
  return { d, sent, log };
}

describe("handleEnquiry", () => {
  it("honeypot filled: fake success, nothing sent", async () => {
    const { d, sent, log } = deps();
    expect(await handleEnquiry(form({ [HONEYPOT_FIELD]: "x" }), d)).toEqual({ ok: true });
    expect(sent).toHaveLength(0);
    expect(log).toHaveBeenCalledWith("blocked automated submission (honeypot)");
  });
  it("bad origin: fake success", async () => {
    const { d, sent } = deps({ isAllowedOrigin: () => false });
    expect(await handleEnquiry(form(), d)).toEqual({ ok: true });
    expect(sent).toHaveLength(0);
  });
  it("too fast: fake success", async () => {
    const { d, sent, log } = deps();
    expect(await handleEnquiry(form({ [TOKEN_FIELD]: issueToken(SECRET, NOW - 500) }), d)).toEqual({ ok: true });
    expect(sent).toHaveLength(0);
    expect(log).toHaveBeenCalledWith("blocked automated submission (token-too-fast)");
  });
  it("invalid fields: field errors for a human", async () => {
    const { d, sent } = deps();
    const result = await handleEnquiry(form({ email: "nope", name: "P" }), d);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(Object.keys(result.fieldErrors ?? {})).toEqual(expect.arrayContaining(["email", "name"]));
    expect(sent).toHaveLength(0);
  });
  it("header injection in email is a field error", async () => {
    const { d } = deps();
    const result = await handleEnquiry(form({ email: "a@b.com%0Abcc:x@y.com" }), d);
    expect(!result.ok && result.fieldErrors?.email).toBeTruthy();
  });
  it("expired token: helpful message", async () => {
    const { d, sent } = deps();
    const result = await handleEnquiry(form({ [TOKEN_FIELD]: issueToken(SECRET, NOW - TOKEN_MAX_AGE_MS - 1) }), d);
    expect(result).toEqual({ ok: false, code: "expired", error: EXPIRED_MESSAGE });
    expect(sent).toHaveLength(0);
  });
  it("spam: fake success", async () => {
    const { d, sent } = deps();
    expect(await handleEnquiry(form({ message: "We sell cheap backlinks for every hospital website" }), d)).toEqual({ ok: true });
    expect(sent).toHaveLength(0);
  });
  it("rate limited: message", async () => {
    const { d, sent } = deps({ rateLimit: () => false });
    expect(await handleEnquiry(form(), d)).toEqual({ ok: false, code: "rate-limited", error: RATE_LIMIT_MESSAGE });
    expect(sent).toHaveLength(0);
  });
  it("turnstile failure: verification message", async () => {
    const { d } = deps({ verifyTurnstile: async () => false });
    const result = await handleEnquiry(form(), d);
    expect(!result.ok && result.code).toBe("verification");
  });
  it("send failure: failed", async () => {
    const { d } = deps({ sendMail: async () => Promise.reject(new Error("smtp")) });
    vi.spyOn(console, "error").mockImplementation(() => {});
    const result = await handleEnquiry(form(), d, "fail");
    expect(result).toEqual({ ok: false, code: "send-failed", error: "fail" });
  });
  it("success: sends the escaped admin email only", async () => {
    const { d, sent } = deps();
    expect(await handleEnquiry(form(), d)).toEqual({ ok: true });
    expect(sent).toHaveLength(1);
    expect(sent[0].to).toBe("sundharmedgold@gmail.com");
    expect(sent[0].replyTo).toBe("priya@example.com");
    expect(sent[0].html).toContain("Is 5 &lt; 6 &amp; &quot;quote&quot; ready?<br>Please call next week.");
    expect(sent[0].html).not.toContain('"quote"');
  });
  it("success with CONTACT_AUTO_REPLY: also sends the auto-reply", async () => {
    const { d, sent } = deps({ autoReply: true });
    await handleEnquiry(form(), d);
    expect(sent.map((m) => m.to)).toEqual(["sundharmedgold@gmail.com", "priya@example.com"]);
    expect(sent[1].subject).toContain("We received your enquiry");
  });
});
