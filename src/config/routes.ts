export const Routes = {
  HOME: "/",
  ABOUT: "/about",
} as const;

/**
 * Routes under src/app/(in-development). Each one (and its sub-paths) is served with
 * `X-Robots-Tag: noindex, nofollow` and must stay out of the sitemap until launch.
 */
export const DEV_ROUTES: string[] = [Routes.ABOUT];
