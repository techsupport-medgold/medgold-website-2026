import type { NextConfig } from "next";
import { DEV_PREFIX } from "./src/config/routes";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://medgold.com";
const apexHost = new URL(siteUrl).host.replace(/^www\./, "");

const nextConfig: NextConfig = {
  poweredByHeader: false,

  images: {
    formats: ["image/avif", "image/webp"],
  },

  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: `www.${apexHost}` }],
        destination: `https://${apexHost}/:path*`,
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      // Build output is content-hashed, so a new deploy produces new filenames
      // and a cached copy can never go stale. Dev is excluded: Turbopack reuses
      // chunk filenames across edits, so `immutable` would pin stale code.
      ...(process.env.NODE_ENV === "development"
        ? []
        : [
            {
              source: "/_next/static/:path*",
              headers: [
                {
                  key: "Cache-Control",
                  value: "public, max-age=31536000, immutable",
                },
              ],
            },
          ]),
      {
        source: "/(.*)",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value:
              "geolocation=(), microphone=(), camera=(), payment=(), fullscreen=(self), usb=(), accelerometer=(), gyroscope=(), magnetometer=()",
          },
        ],
      },
      ...[DEV_PREFIX, `${DEV_PREFIX}/:path*`].map((source) => ({
        source,
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      })),
    ];
  },
};

export default nextConfig;
