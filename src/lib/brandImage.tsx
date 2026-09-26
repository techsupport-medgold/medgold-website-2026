import { BRAND_COLORS } from "@@/config/site";

/** Brand mark for `next/og` routes (inline styles only; Tailwind does not apply there). */
export function BrandMark({ size }: { size: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.25,
        background: BRAND_COLORS.primary,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg width={size * 0.72} height={size * 0.72} viewBox="0 0 48 48">
        <path
          d="M20 8h8v12h12v8H28v12h-8V28H8v-8h12z"
          fill={BRAND_COLORS.gold}
        />
      </svg>
    </div>
  );
}
