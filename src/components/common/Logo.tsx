import Image from "next/image";
import { SITE } from "@@/config/site";
import { cn } from "@@/lib/utils";

const LOGO_WIDTH = 1550;
const LOGO_HEIGHT = 605;

type LogoProps = {
  className?: string;
  /** Rendered height in px; width follows the logo's aspect ratio. */
  height?: number;
  priority?: boolean;
};

export default function Logo({ className, height = 56, priority = false }: LogoProps) {
  return (
    <Image
      src={SITE.logo}
      alt="Med Gold Healthcare"
      width={Math.round((LOGO_WIDTH / LOGO_HEIGHT) * height)}
      height={height}
      priority={priority}
      unoptimized
      className={cn("h-auto", className)}
    />
  );
}
