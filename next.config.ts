import type { NextConfig } from "next";
import { Routes } from "./src/config/routes";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://medgold.com";
const apexHost = new URL(siteUrl).host.replace(/^www\./, "");

const nextConfig: NextConfig = {
  poweredByHeader: false,

  images: {
    formats: ["image/avif", "image/webp"],
  },

  experimental: {
    serverActions: {
      // A 4 MB resume plus multipart overhead; Vercel rejects request bodies over 4.5 MB.
      bodySizeLimit: "5mb",
    },
  },

  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: `www.${apexHost}` }],
        destination: `https://${apexHost}/:path*`,
        permanent: true,
      },
      ...[
        ["/about", Routes.ABOUT],
        ["/contact", Routes.CONTACT],
        ["/terms", Routes.TERMS],
        ["/index.html", Routes.HOME],
      ].map(([source, destination]) => ({ source, destination, permanent: true })),
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
      // Generated image, icon and manifest routes are assets, not pages: keep them
      // crawlable (so pages can reference them) but out of the search index.
      ...["/opengraph-image(.*)", "/twitter-image(.*)", "/icon(.*)", "/apple-icon(.*)", "/manifest.webmanifest"].map(
        (source) => ({ source, headers: [{ key: "X-Robots-Tag", value: "noindex" }] }),
      ),
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
    ];
  },
};

export default nextConfig;
