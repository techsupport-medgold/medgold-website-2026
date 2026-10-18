import { describe, expect, it, beforeEach } from "vitest";
import { checkRateLimit, resetRateLimits } from "@@/lib/rate-limit";

describe("checkRateLimit", () => {
  beforeEach(() => {
    resetRateLimits();
  });

  it("allows a burst up to the limit and then asks the caller to wait", () => {
    const now = 1_000_000;
    for (let attempt = 0; attempt < 3; attempt += 1) {
      expect(checkRateLimit("enquiry:1.1.1.1", 3, 60_000, now).ok).toBe(true);
    }
    const blocked = checkRateLimit("enquiry:1.1.1.1", 3, 60_000, now + 1_000);
    expect(blocked.ok).toBe(false);
    if (!blocked.ok) expect(blocked.retryAfterSec).toBe(59);
  });

  it("opens a new window after the previous one expires", () => {
    expect(checkRateLimit("application:2.2.2.2", 1, 1_000, 0).ok).toBe(true);
    expect(checkRateLimit("application:2.2.2.2", 1, 1_000, 500).ok).toBe(false);
    expect(checkRateLimit("application:2.2.2.2", 1, 1_000, 1_000).ok).toBe(true);
  });

  it("counts each key separately", () => {
    expect(checkRateLimit("enquiry:a", 1, 60_000, 0).ok).toBe(true);
    expect(checkRateLimit("enquiry:b", 1, 60_000, 0).ok).toBe(true);
  });
});
