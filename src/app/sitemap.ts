import type { MetadataRoute } from "next";
import { absoluteUrl } from "@@/config/site";
import { Routes } from "@@/config/routes";

type SitemapRoute = {
  path: string;
  /** Date the page's content last changed (YYYY-MM-DD). Update it when you edit the page or its copy. */
  lastModified: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
};

/**
 * Every indexable page with the date its content last changed.
 * Noindex pages (thank-you, style guide, case studies placeholder, 404) stay out.
 */
export const ROUTES: SitemapRoute[] = [
  { path: Routes.HOME, lastModified: "2026-10-26", priority: 1, changeFrequency: "weekly" },
  { path: Routes.STAFFING, lastModified: "2026-10-11", priority: 0.9, changeFrequency: "monthly" },
  { path: Routes.PHARMACY_AUDIT, lastModified: "2026-10-26", priority: 0.9, changeFrequency: "monthly" },
  { path: Routes.BRANDING, lastModified: "2026-10-11", priority: 0.9, changeFrequency: "monthly" },
  { path: Routes.PATIENT_FEEDBACK, lastModified: "2026-10-11", priority: 0.9, changeFrequency: "monthly" },
  { path: Routes.NURSING_TRAINING, lastModified: "2026-10-26", priority: 0.9, changeFrequency: "monthly" },
  { path: Routes.ABOUT, lastModified: "2026-10-15", priority: 0.7, changeFrequency: "monthly" },
  { path: Routes.CAREERS, lastModified: "2026-10-15", priority: 0.7, changeFrequency: "monthly" },
  { path: Routes.CONTACT, lastModified: "2026-10-26", priority: 0.7, changeFrequency: "monthly" },
  { path: Routes.PRIVACY, lastModified: "2026-10-11", priority: 0.3, changeFrequency: "yearly" },
  { path: Routes.TERMS, lastModified: "2026-10-11", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map(({ path, lastModified, priority, changeFrequency }) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency,
    priority,
  }));
}
