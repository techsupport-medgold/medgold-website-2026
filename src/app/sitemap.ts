import type { MetadataRoute } from "next";
import { NOINDEX_PATHS } from "@@/config/indexing";
import { absoluteUrl } from "@@/config/site";
import { Routes } from "@@/config/routes";

type SitemapRoute = {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
};

/** Every indexable page. Thank-you, case studies, the style guide and the 404 stay out. */
const ROUTES: SitemapRoute[] = [
  { path: Routes.HOME, priority: 1, changeFrequency: "weekly" },
  ...[Routes.STAFFING, Routes.PHARMACY_AUDIT, Routes.BRANDING, Routes.PATIENT_FEEDBACK, Routes.NURSING_TRAINING].map(
    (path): SitemapRoute => ({ path, priority: 0.9, changeFrequency: "monthly" }),
  ),
  ...[Routes.ABOUT, Routes.CAREERS, Routes.CONTACT].map(
    (path): SitemapRoute => ({ path, priority: 0.7, changeFrequency: "monthly" }),
  ),
  ...[Routes.PRIVACY, Routes.TERMS].map((path): SitemapRoute => ({ path, priority: 0.3, changeFrequency: "yearly" })),
];

const NOINDEX = new Set<string>(NOINDEX_PATHS);

if (ROUTES.some((route) => NOINDEX.has(route.path))) {
  throw new Error("Sitemap includes a noindex path. Remove it from ROUTES.");
}

const lastModified = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency,
    priority,
  }));
}
