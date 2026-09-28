import { readFile } from "node:fs/promises";
import path from "node:path";
import { BRAND_COLORS, SITE } from "@@/config/site";

/** Background of `public/images/fav.svg`, used to fill its rounded corners where transparency is not allowed. */
const FAVICON_BACKGROUND = BRAND_COLORS.primary;

async function publicFileDataUrl(publicPath: string) {
  const svg = await readFile(path.join(process.cwd(), "public", publicPath));
  return `data:image/svg+xml;base64,${svg.toString("base64")}`;
}

/**
 * Square brand icon (`public/images/fav.svg`) for favicon / app icon routes (`next/og`, inline styles only).
 * `solid` fills the transparent rounded corners, since iOS renders transparency as black and applies its own mask.
 */
export async function brandMark({ size, solid = false }: { size: number; solid?: boolean }) {
  const src = await publicFileDataUrl(SITE.favicon);
  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        background: solid ? FAVICON_BACKGROUND : "transparent",
      }}
    >
      {/* eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element */}
      <img src={src} width={size} height={size} />
    </div>
  );
}

/** The official logo as a data URL, for embedding in generated share images. */
export function logoDataUrl() {
  return publicFileDataUrl(SITE.logo);
}
