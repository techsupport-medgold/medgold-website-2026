import { ImageResponse } from "next/og";
import { BRAND_COLORS, SITE } from "@@/config/site";
import { BrandMark } from "@@/lib/brandImage";

export const alt = SITE.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          color: "#ffffff",
          background: `linear-gradient(160deg, ${BRAND_COLORS.primary} 0%, #062e2b 100%)`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <BrandMark size={88} />
          <div style={{ display: "flex", fontSize: 48, fontWeight: 700 }}>
            Med&nbsp;<span style={{ color: BRAND_COLORS.gold }}>Gold</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              color: BRAND_COLORS.gold,
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            Coming soon
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 64,
              fontWeight: 700,
              lineHeight: 1.1,
              maxWidth: 960,
            }}
          >
            {SITE.tagline}
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 26, opacity: 0.85 }}>
          {SITE.url.replace(/^https?:\/\//, "")}
        </div>
      </div>
    ),
    size
  );
}
