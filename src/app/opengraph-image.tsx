import { ImageResponse } from "next/og";
import { BRAND_COLORS, SITE } from "@@/config/site";
import { logoDataUrl } from "@@/lib/brandImage";

export const alt = SITE.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const LOGO_HEIGHT = 150;
const LOGO_WIDTH = Math.round((1588 / 642) * LOGO_HEIGHT);

export default async function OpengraphImage() {
  const logo = await logoDataUrl();

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
          background: `linear-gradient(135deg, #FFFFFF 55%, ${BRAND_COLORS.lightGray} 100%)`,
          color: BRAND_COLORS.charcoal,
        }}
      >
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <img src={logo} width={LOGO_WIDTH} height={LOGO_HEIGHT} />

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              fontWeight: 700,
              color: BRAND_COLORS.primary,
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            Coming soon
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 60,
              fontWeight: 700,
              lineHeight: 1.1,
              maxWidth: 980,
            }}
          >
            {SITE.tagline}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              width: 80,
              height: 6,
              borderRadius: 6,
              background: BRAND_COLORS.gold,
            }}
          />
          <div style={{ display: "flex", fontSize: 26, color: BRAND_COLORS.gray }}>
            {SITE.url.replace(/^https?:\/\//, "")}
          </div>
        </div>
      </div>
    ),
    size
  );
}
