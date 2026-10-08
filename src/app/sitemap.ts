import type { MetadataRoute } from "next";
import { absoluteUrl } from "@@/config/site";
import { Routes } from "@@/config/routes";

/**
 * Launched routes only. A page is added here when it moves out of
 * src/app/dev and is removed from DevRoutes.
 */
const ROUTES: {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}[] = [{ path: Routes.HOME, priority: 1, changeFrequency: "weekly" }];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency,
    priority,
  }));
}
