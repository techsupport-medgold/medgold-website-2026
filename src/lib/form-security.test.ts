import { describe, expect, it } from "vitest";
import {
  TOKEN_MAX_AGE_MS,
  allowedOrigins,
  clientIp,
  createRateLimiter,
  hasHeaderInjection,
  isAllowedOrigin,
  issueToken,
  sanitizeMultiLine,
  sanitizeSingleLine,
  spamReason,
  turnstileEnabled,
  verifyToken,
  type SpamReason,
} from "@@/lib/form-security";

const SECRET = "test-secret";
const T0 = 1_760_000_000_000;
const h = (values: Record<string, string>) => new Headers(values);

describe("render token", () => {
  const token = issueToken(SECRET, T0);
  it("accepts a token between 3 s and 2 h old", () => {
    expect(verifyToken(token, SECRET, T0 + 5_000)).toEqual({ ok: true });
  });
  it.each([
    ["missing", undefined, T0 + 5_000],
    ["missing", "", T0 + 5_000],
    ["malformed", "abc.def", T0 + 5_000],
    ["malformed", "notanumber.nonce.sig", T0 + 5_000],
    ["bad-signature", `${token.slice(0, -2)}xx`, T0 + 5_000],
    ["too-fast", token, T0 + 1_000],
    ["expired", token, T0 + TOKEN_MAX_AGE_MS + 1],
    ["future", token, T0 - 60_000],
  ])("rejects %s", (reason, value, now) => {
    expect(verifyToken(value, SECRET, now)).toEqual({ ok: false, reason });
  });
  it("rejects a token signed with another secret", () => {
    expect(verifyToken(issueToken("other", T0), SECRET, T0 + 5_000)).toEqual({ ok: false, reason: "bad-signature" });
  });
  it("rejects a tampered timestamp", () => {
    const [, nonce, sig] = token.split(".");
    expect(verifyToken(`${T0 - 10_000}.${nonce}.${sig}`, SECRET, T0 + 5_000)).toEqual({ ok: false, reason: "bad-signature" });
  });
  it("takes the constant-time path for same-length and rejects different-length signatures", () => {
    const flipped = `${token.slice(0, -1)}${token.endsWith("A") ? "B" : "A"}`;
    expect(verifyToken(flipped, SECRET, T0 + 5_000)).toEqual({ ok: false, reason: "bad-signature" });
    expect(verifyToken(`${token}x`, SECRET, T0 + 5_000)).toEqual({ ok: false, reason: "bad-signature" });
  });
});

describe("rate limiter", () => {
  it("allows 5 then blocks the 6th, and the window slides", () => {
    const limiter = createRateLimiter({ limit: 5, windowMs: 600_000 });
    for (let i = 0; i < 5; i++) expect(limiter.hit("ip", T0 + i)).toBe(true);
    expect(limiter.hit("ip", T0 + 10)).toBe(false);
    expect(limiter.hit("ip", T0 + 600_001)).toBe(true);
  });
  it("reset clears a key", () => {
    const limiter = createRateLimiter({ limit: 1 });
    limiter.hit("ip", T0);
    expect(limiter.hit("ip", T0)).toBe(false);
    limiter.reset("ip");
    expect(limiter.hit("ip", T0)).toBe(true);
  });
  it("caps the number of keys, evicting the oldest", () => {
    const limiter = createRateLimiter({ limit: 1, maxKeys: 3 });
    ["a", "b", "c", "d"].forEach((k) => limiter.hit(k, T0));
    expect(limiter.size()).toBe(3);
    expect(limiter.hit("a", T0)).toBe(true);
  });
});

describe("clientIp", () => {
  it("uses the first x-forwarded-for hop", () => expect(clientIp(h({ "x-forwarded-for": "1.1.1.1, 2.2.2.2" }))).toBe("1.1.1.1"));
  it("falls back to x-real-ip", () => expect(clientIp(h({ "x-real-ip": "3.3.3.3" }))).toBe("3.3.3.3"));
  it("returns unknown", () => expect(clientIp(h({}))).toBe("unknown"));
});

describe("origin check", () => {
  const prod = { NODE_ENV: "production" } as NodeJS.ProcessEnv;
  it("allows the site and its www variant", () => {
    expect(isAllowedOrigin(h({ origin: "https://medgoldhealthcare.com" }), prod)).toBe(true);
    expect(isAllowedOrigin(h({ origin: "https://www.medgoldhealthcare.com" }), prod)).toBe(true);
  });
  it("allows Vercel preview URLs and extra origins", () => {
    const env = { ...prod, VERCEL_URL: "medgold-abc.vercel.app", FORM_ALLOWED_ORIGINS: "https://staging.example.com" } as NodeJS.ProcessEnv;
    expect(allowedOrigins(env).has("https://medgold-abc.vercel.app")).toBe(true);
    expect(isAllowedOrigin(h({ origin: "https://staging.example.com" }), env)).toBe(true);
  });
  it("rejects a foreign origin and prefix tricks", () => {
    expect(isAllowedOrigin(h({ origin: "https://evil.com" }), prod)).toBe(false);
    expect(isAllowedOrigin(h({ origin: "https://medgoldhealthcare.com.evil.com" }), prod)).toBe(false);
  });
  it("falls back to Referer", () => {
    expect(isAllowedOrigin(h({ referer: "https://medgoldhealthcare.com/contact-us" }), prod)).toBe(true);
  });
  it("rejects when neither header is present", () => expect(isAllowedOrigin(h({}), prod)).toBe(false));
  it("allows any localhost port in development only", () => {
    expect(isAllowedOrigin(h({ origin: "http://localhost:4123" }), { NODE_ENV: "development" } as NodeJS.ProcessEnv)).toBe(true);
    expect(isAllowedOrigin(h({ origin: "http://localhost:4123" }), prod)).toBe(false);
  });
});

describe("sanitisers and header injection", () => {
  it("strips control and zero-width characters", () => {
    expect(sanitizeSingleLine("  Pri\u200Bya \u0007 Raman  ")).toBe("Priya Raman");
    expect(sanitizeMultiLine("Line 1\r\nLine\u0000 2 ")).toBe("Line 1\nLine 2");
  });
  it.each(["a\nb", "a\rb", "a%0Abcc:x", "a%0d", "a\\nb"])("detects injection in %j", (v) => {
    expect(hasHeaderInjection(v)).toBe(true);
  });
  it("passes a normal value", () => expect(hasHeaderInjection("priya@example.com")).toBe(false));
});

describe("spam heuristics", () => {
  const human = { name: "Priya Raman", email: "priya@example.com", message: "I would like to book a health check-up for my father next week." };
  it("does not flag a normal human message", () => expect(spamReason(human)).toBeNull());
  const cases: Array<[SpamReason, Partial<typeof human>]> = [
    ["too-many-links", { message: "see http://a.com http://b.com http://c.com now please" }],
    ["url-in-name", { name: "Visit www.spam.com" }],
    ["markup", { message: "Hello <a href='x'>click here</a> for more" }],
    ["blocked-keyword", { message: "We offer cheap SEO services for your clinic site" }],
    ["name-without-letters", { name: "!!! ???" }],
    ["digits-in-name", { name: "Priya 123" }],
    ["random-case-name", { name: "xKqZvBnM" }],
    ["repeated-characters", { message: "Hellooooooooooooooo there my friend" }],
    ["gibberish-token", { message: `hi ${"a1b2c3d4".repeat(11)}` }],
    ["all-caps", { message: "PLEASE CALL ME BACK ABOUT THE APPOINTMENT RIGHT NOW TODAY" }],
    ["name-equals-message", { name: "Priya Raman", message: "priya raman" }],
    ["email-as-message", { message: "priya@example.com" }],
  ];
  it.each(cases)("flags %s", (reason, override) => {
    expect(spamReason({ ...human, ...override })).toBe(reason);
  });
});

describe("turnstile", async () => {
  const { verifyTurnstile } = await import("@@/lib/form-security");
  const env = { TURNSTILE_SECRET_KEY: "s", NEXT_PUBLIC_TURNSTILE_SITE_KEY: "k" } as unknown as NodeJS.ProcessEnv;
  const reply = (body: unknown) => (async () => new Response(JSON.stringify(body))) as unknown as typeof fetch;
  it("is disabled without both keys and then always passes", async () => {
    expect(turnstileEnabled({} as NodeJS.ProcessEnv)).toBe(false);
    expect(await verifyTurnstile("", "1.1.1.1", { env: {} as NodeJS.ProcessEnv })).toBe(true);
  });
  it("passes on success", async () => {
    expect(await verifyTurnstile("tok", "1.1.1.1", { env, fetchImpl: reply({ success: true }) })).toBe(true);
  });
  it("fails on a failed check or a missing response", async () => {
    expect(await verifyTurnstile("tok", "1.1.1.1", { env, fetchImpl: reply({ success: false }) })).toBe(false);
    expect(await verifyTurnstile("", "1.1.1.1", { env, fetchImpl: reply({ success: true }) })).toBe(false);
  });
  it("fails closed on a network error", async () => {
    const boom = (async () => {
      throw new Error("network");
    }) as unknown as typeof fetch;
    expect(await verifyTurnstile("tok", "1.1.1.1", { env, fetchImpl: boom })).toBe(false);
  });
});
