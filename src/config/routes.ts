export const Routes = {
  HOME: "/",
} as const;

/**
 * Pre-launch pages live under /dev (src/app/dev). Everything under this prefix is served
 * noindex, nofollow (layout metadata + X-Robots-Tag header) and stays out of the sitemap.
 */
export const DEV_PREFIX = "/dev";

export const DevRoutes = {
  INDEX: DEV_PREFIX,
  HOME: `${DEV_PREFIX}/home`,
  ABOUT: `${DEV_PREFIX}/about`,
} as const;
