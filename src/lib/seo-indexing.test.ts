import { describe, expect, it } from "vitest";
import nextConfig from "../../next.config";
import sitemap, { ROUTES } from "@@/app/sitemap";
import { Routes, MAIN_NAV, SERVICE_NAV } from "@@/config/routes";
import { NURSING_TRAINING_SEO, NURSING_TRAINING_SERVICE, overview as nursingOverview } from "@@/data/nursingTraining";
import { PHARMACY_AUDIT_SEO, PHARMACY_AUDIT_SERVICE, overview as pharmacyOverview } from "@@/data/pharmacyAudit";
import { faqPageSchema, serviceSchema } from "@@/lib/schema";

const words = (o: typeof nursingOverview | typeof pharmacyOverview) =>
  [...o.paragraphs, ...o.faqs.flatMap((f) => [f.question, f.answer])].join(" ").split(/\s+/).filter(Boolean).length;

const allText = (o: typeof nursingOverview | typeof pharmacyOverview) =>
  [o.eyebrow, o.heading, o.faqHeading, ...o.paragraphs, ...o.faqs.flatMap((f) => [f.question, f.answer])];

describe("redirects and headers", () => {
  it("permanently redirects /index.html to /", async () => {
    const rules = await nextConfig.redirects!();
    expect(rules).toContainEqual(expect.objectContaining({ source: "/index.html", destination: "/", permanent: true }));
  });

  it("sends X-Robots-Tag noindex on generated asset routes", async () => {
    const rules = await nextConfig.headers!();
    const noindex = rules
      .filter((r) => r.headers.some((h) => h.key === "X-Robots-Tag" && h.value === "noindex"))
      .map((r) => r.source);
    for (const prefix of ["/opengraph-image", "/twitter-image", "/icon", "/apple-icon", "/manifest.webmanifest"]) {
      expect(noindex.some((s) => s.startsWith(prefix))).toBe(true);
    }
    expect(noindex.some((s) => s === "/(.*)" || s === "/:path*")).toBe(false);
  });
});

describe("sitemap", () => {
  it("lists every indexable page once with a real lastmod date", () => {
    const entries = sitemap();
    const paths = ROUTES.map((r) => r.path);
    expect(new Set(paths).size).toBe(paths.length);
    for (const route of [Routes.HOME, Routes.CAREERS, Routes.CONTACT, Routes.NURSING_TRAINING, Routes.PHARMACY_AUDIT]) {
      expect(paths).toContain(route);
    }
    for (const entry of entries) {
      expect(String(entry.lastModified)).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  it("leaves out noindex pages", () => {
    const paths = ROUTES.map((r) => r.path);
    for (const route of [Routes.THANK_YOU, Routes.STYLE_GUIDE, Routes.CASE_STUDIES]) {
      expect(paths).not.toContain(route);
    }
  });
});

describe("internal links", () => {
  it("puts careers, contact, nursing training and pharmacy audit in the navigation", () => {
    const hrefs = [...MAIN_NAV, ...SERVICE_NAV].map((i) => i.href);
    for (const route of [Routes.CAREERS, Routes.CONTACT, Routes.NURSING_TRAINING, Routes.PHARMACY_AUDIT]) {
      expect(hrefs).toContain(route);
    }
  });
});

describe("service page copy", () => {
  it.each([
    ["nursing training", nursingOverview],
    ["pharmacy audit", pharmacyOverview],
  ])("%s has at least 300 words of overview and FAQ copy", (_, o) => {
    expect(words(o)).toBeGreaterThanOrEqual(300);
  });

  it("follows the house copy rules", () => {
    const text = [
      ...allText(nursingOverview),
      ...allText(pharmacyOverview),
      NURSING_TRAINING_SEO.title,
      NURSING_TRAINING_SEO.description,
      PHARMACY_AUDIT_SEO.title,
      PHARMACY_AUDIT_SEO.description,
      ...Object.values(NURSING_TRAINING_SERVICE),
      ...Object.values(PHARMACY_AUDIT_SERVICE),
    ];
    for (const line of text) {
      expect(line).not.toMatch(/, and\b/);
      expect(line).not.toContain("\u2014");
      expect(line).not.toMatch(/, r/i);
    }
  });

  it("builds Service and FAQPage schema that matches the visible FAQ", () => {
    const faq = faqPageSchema("https://example.com/x", pharmacyOverview.faqs);
    expect(faq["@type"]).toBe("FAQPage");
    expect(faq.mainEntity).toHaveLength(pharmacyOverview.faqs.length);
    expect(faq.mainEntity[0].acceptedAnswer.text).toBe(pharmacyOverview.faqs[0].answer);
    const svc = serviceSchema({ url: "https://example.com/x", name: "N", serviceType: "T", description: "D", areaServed: "Tamil Nadu" });
    expect(svc["@type"]).toBe("Service");
    expect(svc.areaServed).toEqual({ "@type": "AdministrativeArea", name: "Tamil Nadu" });
  });
});
