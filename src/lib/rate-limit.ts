type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

export type RateLimitResult = { ok: true } | { ok: false; retryAfterSec: number };

/** Shown when a form is submitted too many times from the same address. */
export const RATE_LIMIT_MESSAGE = "Please wait a few minutes before sending again.";

/**
 * Fixed-window limit. On serverless this only covers the current instance,
 * which is enough to slow a burst against one isolate.
 */
export function checkRateLimit(key: string, limit = 8, windowMs = 10 * 60 * 1000, now = Date.now()): RateLimitResult {
  if (buckets.size > 500) {
    for (const [bucketKey, bucket] of buckets) {
      if (bucket.resetAt <= now) buckets.delete(bucketKey);
    }
  }

  const existing = buckets.get(key);
  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true };
  }
  if (existing.count >= limit) {
    return { ok: false, retryAfterSec: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)) };
  }
  existing.count += 1;
  return { ok: true };
}

export function resetRateLimits(): void {
  buckets.clear();
}
