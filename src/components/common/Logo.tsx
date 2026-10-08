import Image from "next/image";
import { SITE } from "@@/config/site";
import { cn } from "@@/lib/utils";

const LOGO_WIDTH = 1588;
const LOGO_HEIGHT = 642;

type LogoProps = {
  className?: string;
  /** Rendered height in px; width follows the logo's aspect ratio. */
  height?: number;
  /** Only where the logo is the page's main above-the-fold image. */
  preload?: boolean;
  loading?: "eager" | "lazy";
};

export default function Logo({ className, height = 56, preload = false, loading }: LogoProps) {
  return (
    <Image
      src={SITE.logo}
      alt="Med Gold Healthcare"
      width={Math.round((LOGO_WIDTH / LOGO_HEIGHT) * height)}
      height={height}
      preload={preload}
      loading={preload ? undefined : loading}
      unoptimized
      className={cn("h-auto", className)}
    />
  );
}
