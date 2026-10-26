import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";

/* ------------------------------------------------------------------ */
/* Signed render token (time trap)                                     */
/* ------------------------------------------------------------------ */

export const TOKEN_MIN_AGE_MS = 3_000;
export const TOKEN_MAX_AGE_MS = 2 * 60 * 60 * 1000;
export const TOKEN_CLOCK_DRIFT_MS = 30_000;

const DEV_SECRET = "medgold-dev-form-token-secret-do-not-use-in-production";
let warnedDevSecret = false;

/** FORM_TOKEN_SECRET, else an HMAC derived from the SMTP app password, else a dev constant. */
export function formTokenSecret(env: NodeJS.ProcessEnv = process.env): string {
  const explicit = env.FORM_TOKEN_SECRET?.trim();
  if (explicit) return explicit;
  const smtp = env.SMTP_APP_PASSWORD?.replace(/\s+/g, "");
  if (smtp) return createHmac("sha256", smtp).update("medgold-form-token").digest("hex");
  if (env.NODE_ENV === "production" && !warnedDevSecret) {
    warnedDevSecret = true;
    console.warn("FORM_TOKEN_SECRET is not set; using the development constant.");
  }
  return DEV_SECRET;
}

function sign(secret: string, payload: string): string {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

export function issueToken(secret: string, now = Date.now()): string {
  const nonce = randomBytes(12).toString("base64url");
  const payload = `${now}.${nonce}`;
  return `${payload}.${sign(secret, payload)}`;
}

export type TokenResult =
  | { ok: true }
  | { ok: false; reason: "missing" | "malformed" | "bad-signature" | "too-fast" | "expired" | "future" };

export function verifyToken(token: unknown, secret: string, now = Date.now()): TokenResult {
  if (typeof token !== "string" || token === "") return { ok: false, reason: "missing" };
  const parts = token.split(".");
  if (parts.length !== 3 || !/^\d{10,16}$/.test(parts[0]) || !parts[1] || !parts[2]) {
    return { ok: false, reason: "malformed" };
  }
  const [issued, nonce, signature] = parts;
  const expected = Buffer.from(sign(secret, `${issued}.${nonce}`));
  const given = Buffer.from(signature);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) {
    return { ok: false, reason: "bad-signature" };
  }
  const age = now - Number(issued);
  if (age < -TOKEN_CLOCK_DRIFT_MS) return { ok: false, reason: "future" };
  if (age < TOKEN_MIN_AGE_MS) return { ok: false, reason: "too-fast" };
  if (age > TOKEN_MAX_AGE_MS) return { ok: false, reason: "expired" };
  return { ok: true };
}

/* ------------------------------------------------------------------ */
/* Rate limit: in-memory sliding window, best effort per instance      */
/* ------------------------------------------------------------------ */

export function createRateLimiter({ limit = 5, windowMs = 10 * 60 * 1000, maxKeys = 5_000 } = {}) {
  const hits = new Map<string, number[]>();
  return {
    /** Records a hit and returns false when the key is over the limit. */
    hit(key: string, now = Date.now()): boolean {
      const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
      if (recent.length >= limit) {
        hits.delete(key);
        hits.set(key, recent);
        return false;
      }
      recent.push(now);
      hits.delete(key);
      hits.set(key, recent);
      while (hits.size > maxKeys) {
        const oldest = hits.keys().next().value;
        if (oldest === undefined) break;
        hits.delete(oldest);
      }
      return true;
    },
    reset(key?: string) {
      if (key === undefined) hits.clear();
      else hits.delete(key);
    },
    size: () => hits.size,
  };
}

export function clientIp(headers: Pick<Headers, "get">): string {
  const xff = headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  if (xff) return xff;
  const real = headers.get("x-real-ip")?.trim();
  return real || "unknown";
}

/* ------------------------------------------------------------------ */
/* Origin / Referer allow-list                                         */
/* ------------------------------------------------------------------ */

function toOrigin(value: string | undefined | null): string | null {
  if (!value) return null;
  try {
    const url = new URL(value.includes("://") ? value : `https://${value}`);
    return url.origin;
  } catch {
    return null;
  }
}

export function allowedOrigins(env: NodeJS.ProcessEnv = process.env): Set<string> {
  const candidates = [
    "https://medgoldhealthcare.com",
    env.NEXT_PUBLIC_SITE_URL,
    env.VERCEL_URL,
    env.VERCEL_BRANCH_URL,
    env.VERCEL_PROJECT_PRODUCTION_URL,
    ...(env.FORM_ALLOWED_ORIGINS ?? "").split(","),
    `http://localhost:${env.PORT || 3000}`,
  ];
  const set = new Set<string>();
  for (const candidate of candidates) {
    const origin = toOrigin(candidate?.trim());
    if (!origin) continue;
    set.add(origin);
    const url = new URL(origin);
    if (!url.hostname.startsWith("www.") && url.hostname !== "localhost") {
      url.hostname = `www.${url.hostname}`;
      set.add(url.origin);
    }
  }
  return set;
}

export function isAllowedOrigin(headers: Pick<Headers, "get">, env: NodeJS.ProcessEnv = process.env): boolean {
  const origin = toOrigin(headers.get("origin")) ?? toOrigin(headers.get("referer"));
  if (!origin) return false;
  if (allowedOrigins(env).has(origin)) return true;
  if (env.NODE_ENV !== "production") {
    const host = new URL(origin).hostname;
    return host === "localhost" || host === "127.0.0.1";
  }
  return false;
}

/* ------------------------------------------------------------------ */
/* Sanitising and header injection                                     */
/* ------------------------------------------------------------------ */

// Control characters (except tab/newline) and zero-width / bidi characters.
const CONTROL = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;
const INVISIBLE = /[\u200B-\u200F\u202A-\u202E\u2060-\u2064\uFEFF]/g;

export function sanitizeMultiLine(value: string): string {
  return value.replace(/\r\n?/g, "\n").replace(CONTROL, "").replace(INVISIBLE, "").trim();
}

export function sanitizeSingleLine(value: string): string {
  return value.replace(CONTROL, "").replace(INVISIBLE, "").replace(/\s+/g, " ").trim();
}

export function hasHeaderInjection(value: string): boolean {
  return /[\r\n]|%0a|%0d|\\r|\\n/i.test(value);
}

/* ------------------------------------------------------------------ */
/* Spam heuristics                                                     */
/* ------------------------------------------------------------------ */

export type SpamReason =
  | "too-many-links"
  | "url-in-name"
  | "markup"
  | "blocked-keyword"
  | "name-without-letters"
  | "digits-in-name"
  | "random-case-name"
  | "repeated-characters"
  | "gibberish-token"
  | "all-caps"
  | "name-equals-message"
  | "email-as-message";

const URL_PATTERN = /(https?:\/\/|www\.)\S+/gi;
const BLOCKED = [
  "seo services",
  "backlinks",
  "crypto investment",
  "casino",
  "viagra",
  "web traffic",
  "guest post",
  "rank your website",
  "bitcoin",
];

export function spamReason(input: { name: string; email: string; message: string }): SpamReason | null {
  const name = input.name.trim();
  const message = input.message.trim();
  const lower = `${name} ${message}`.toLowerCase();

  if ((message.match(URL_PATTERN) ?? []).length > 2) return "too-many-links";
  if (/(https?:\/\/|www\.|\.(com|net|org|ru|xyz|io)\b)/i.test(name)) return "url-in-name";
  if (/<\/?[a-z][^>]*>|\[\/?(url|link|b|i|img)[^\]]*\]/i.test(`${name} ${message}`)) return "markup";
  if (BLOCKED.some((phrase) => lower.includes(phrase))) return "blocked-keyword";
  if (!/\p{L}/u.test(name)) return "name-without-letters";
  if (/\d/.test(name)) return "digits-in-name";
  if (name.split(/\s+/).some((word) => word.length >= 6 && /[a-z]/.test(word) && (word.slice(1).match(/[A-Z]/g) ?? []).length >= 3)) {
    return "random-case-name";
  }
  if (/(.)\1{9,}/.test(message.replace(/\s/g, ""))) return "repeated-characters";
  if (message.replace(URL_PATTERN, " ").split(/\s+/).some((token) => token.length >= 80)) return "gibberish-token";
  const letters = message.replace(/[^\p{L}]/gu, "");
  if (letters.length >= 40 && letters === letters.toUpperCase() && letters !== letters.toLowerCase()) return "all-caps";
  if (name.toLowerCase() === message.toLowerCase()) return "name-equals-message";
  if (input.email.trim() && message.toLowerCase() === input.email.trim().toLowerCase()) return "email-as-message";
  return null;
}

/* ------------------------------------------------------------------ */
/* Optional Cloudflare Turnstile                                       */
/* ------------------------------------------------------------------ */

export function turnstileEnabled(env: NodeJS.ProcessEnv = process.env): boolean {
  return Boolean(env.TURNSTILE_SECRET_KEY?.trim() && env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim());
}

export async function verifyTurnstile(
  response: string,
  ip: string,
  { env = process.env, fetchImpl = fetch, timeoutMs = 5_000 }: { env?: NodeJS.ProcessEnv; fetchImpl?: typeof fetch; timeoutMs?: number } = {},
): Promise<boolean> {
  if (!turnstileEnabled(env)) return true;
  if (!response) return false;
  try {
    const body = new URLSearchParams({ secret: env.TURNSTILE_SECRET_KEY!.trim(), response });
    if (ip && ip !== "unknown") body.set("remoteip", ip);
    const res = await fetchImpl("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body,
      signal: AbortSignal.timeout(timeoutMs),
    });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false; // fail closed
  }
}
