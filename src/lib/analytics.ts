export const GTM_ID_PATTERN = /^GTM-[A-Z0-9]+$/;
export const CLARITY_ID_PATTERN = /^[a-z0-9]{6,32}$/;

/**
 * Public analytics IDs are interpolated into script tags. An override that
 * does not match the expected shape falls back to the known-good id.
 */
export function resolvePublicId(override: string | undefined, fallback: string, pattern: RegExp): string {
  const value = override?.trim();
  if (!value || !pattern.test(value)) return fallback;
  return value;
}

type ClarityEnv = {
  hostname: string;
  nodeEnv: string | undefined;
  /** Vercel's NEXT_PUBLIC_VERCEL_ENV: "production", "preview", or "development"; unset off Vercel. */
  vercelEnv: string | undefined;
};

const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "[::1]"]);

/** Track only real production traffic: skip dev builds, localhost, and Vercel preview deployments. */
export function shouldLoadClarity({ hostname, nodeEnv, vercelEnv }: ClarityEnv): boolean {
  if (nodeEnv !== "production") return false;
  if (LOCAL_HOSTS.has(hostname)) return false;
  return !vercelEnv || vercelEnv === "production";
}
