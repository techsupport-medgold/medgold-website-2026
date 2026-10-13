import { describe, expect, it } from "vitest";
import { gtmSnippet } from "@@/components/common/Analytics";
import { GTM_ID } from "@@/config/site";

describe("Google Tag Manager", () => {
  it("defaults to the Med Gold container ID", () => {
    expect(GTM_ID).toBe(process.env.NEXT_PUBLIC_GTM_ID || "GTM-P8G73P5Q");
  });

  it("builds the official GTM loader for the container", () => {
    const snippet = gtmSnippet("GTM-P8G73P5Q");
    expect(snippet).toContain("https://www.googletagmanager.com/gtm.js?id=");
    expect(snippet).toContain("'dataLayer','GTM-P8G73P5Q'");
    expect(snippet).toContain("'gtm.start'");
  });
});
