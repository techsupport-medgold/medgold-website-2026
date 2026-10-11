import type { MetadataRoute } from "next";
import { absoluteUrl } from "@@/config/site";
import { Routes } from "@@/config/routes";

type SitemapRoute = {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
};

/** Every indexable page. Noindex pages (style guide, 404) stay out. */
const ROUTES: SitemapRoute[] = [
  { path: Routes.HOME, priority: 1, changeFrequency: "weekly" },
  ...[Routes.STAFFING, Routes.PHARMACY_AUDIT, Routes.BRANDING, Routes.PATIENT_FEEDBACK, Routes.NURSING_TRAINING].map(
    (path): SitemapRoute => ({ path, priority: 0.9, changeFrequency: "monthly" }),
  ),
  ...[Routes.ABOUT, Routes.CASE_STUDIES, Routes.CAREERS, Routes.CONTACT].map(
    (path): SitemapRoute => ({ path, priority: 0.7, changeFrequency: "monthly" }),
  ),
  ...[Routes.PRIVACY, Routes.TERMS].map((path): SitemapRoute => ({ path, priority: 0.3, changeFrequency: "yearly" })),
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency,
    priority,
  }));
}
