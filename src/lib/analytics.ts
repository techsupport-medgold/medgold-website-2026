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
