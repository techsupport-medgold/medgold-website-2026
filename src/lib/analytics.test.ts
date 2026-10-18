import { describe, expect, it } from "vitest";
import { CLARITY_ID_PATTERN, GTM_ID_PATTERN, resolvePublicId, shouldLoadClarity } from "@@/lib/analytics";

const live = { hostname: "medgoldhealthcare.com", nodeEnv: "production", vercelEnv: "production" };

describe("shouldLoadClarity", () => {
  it("loads on the production site", () => {
    expect(shouldLoadClarity(live)).toBe(true);
  });

  it("loads on a production build outside Vercel", () => {
    expect(shouldLoadClarity({ ...live, vercelEnv: undefined })).toBe(true);
  });

  it("skips dev builds", () => {
    expect(shouldLoadClarity({ ...live, nodeEnv: "development" })).toBe(false);
  });

  it.each(["localhost", "127.0.0.1", "[::1]"])("skips %s", (hostname) => {
    expect(shouldLoadClarity({ ...live, hostname })).toBe(false);
  });

  it("skips Vercel preview deployments", () => {
    expect(shouldLoadClarity({ ...live, vercelEnv: "preview" })).toBe(false);
  });
});

describe("resolvePublicId", () => {
  it("keeps a well-formed override", () => {
    expect(resolvePublicId("GTM-ABCDEF", "GTM-P8G73P5Q", GTM_ID_PATTERN)).toBe("GTM-ABCDEF");
    expect(resolvePublicId("abc123def", "yoaflrji2q", CLARITY_ID_PATTERN)).toBe("abc123def");
  });

  it("falls back when the override is empty or could break out of a script", () => {
    expect(resolvePublicId("", "GTM-P8G73P5Q", GTM_ID_PATTERN)).toBe("GTM-P8G73P5Q");
    expect(resolvePublicId("');alert(1)//", "GTM-P8G73P5Q", GTM_ID_PATTERN)).toBe("GTM-P8G73P5Q");
    expect(resolvePublicId("not an id", "yoaflrji2q", CLARITY_ID_PATTERN)).toBe("yoaflrji2q");
  });
});
