import { readFile } from "node:fs/promises";
import path from "node:path";
import { BRAND_COLORS, SITE } from "@@/config/site";

/**
 * Square brand tile for favicon / app icons (`next/og` routes, inline styles only).
 * The full logo is a wide banner that is unreadable at favicon sizes.
 */
export function BrandMark({ size }: { size: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.22,
        background: BRAND_COLORS.primary,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          color: "#FFFFFF",
          fontSize: size * 0.62,
          fontWeight: 700,
          lineHeight: 1,
          marginTop: -size * 0.04,
        }}
      >
        M
      </div>
      <div
        style={{
          display: "flex",
          width: size * 0.46,
          height: Math.max(2, size * 0.07),
          borderRadius: size,
          background: BRAND_COLORS.gold,
          marginTop: size * 0.04,
        }}
      />
    </div>
  );
}

/** The official logo as a data URL, for embedding in generated share images. */
export async function logoDataUrl() {
  const svg = await readFile(path.join(process.cwd(), "public", SITE.logo));
  return `data:image/svg+xml;base64,${svg.toString("base64")}`;
}
