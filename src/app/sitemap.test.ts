import { describe, expect, it } from "vitest";
import sitemap from "@@/app/sitemap";
import { NOINDEX_PATHS } from "@@/config/indexing";
import { Routes } from "@@/config/routes";
import { absoluteUrl } from "@@/config/site";

describe("sitemap", () => {
  it("lists indexable pages and leaves status and utility pages out", () => {
    const urls = sitemap().map((entry) => entry.url);
    expect(urls).toContain(absoluteUrl(Routes.HOME));
    expect(urls).toContain(absoluteUrl(Routes.CONTACT));
    for (const path of NOINDEX_PATHS) {
      expect(urls.some((url) => url.includes(path))).toBe(false);
    }
  });
});
