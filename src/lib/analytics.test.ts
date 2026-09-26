import { describe, expect, it } from "vitest";
import { shouldLoadClarity } from "@@/lib/analytics";

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
