import { Routes } from "./routes";

/**
 * Routes that must not be indexed. They stay out of the sitemap and send
 * `noindex, follow` (meta tag and, for real paths, an X-Robots-Tag header).
 * The 404 uses the same robots value but has no stable path to match.
 */
export const NOINDEX_PATHS = [Routes.THANK_YOU, Routes.CASE_STUDIES, Routes.STYLE_GUIDE] as const;

export const NOINDEX_FOLLOW = { index: false, follow: true } as const;
