import Image, { type ImageProps } from "next/image";
import { cn } from "@@/lib/utils";

type ResponsiveImageProps = Omit<ImageProps, "fill" | "className"> & {
  /** Classes for the positioned frame (set its aspect ratio or height here). */
  className?: string;
  imageClassName?: string;
  overlay?: "none" | "bottom" | "full";
  /** Slow zoom when a parent `group` is hovered. */
  zoom?: boolean;
};

const OVERLAYS = {
  none: null,
  bottom: "bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent",
  full: "bg-gradient-to-tr from-primary-deep/90 via-primary-deep/55 to-primary-deep/10",
} as const;

/**
 * Fill-mode next/image inside a rounded frame. Lazy by default; pass
 * `preload` only on the first above-the-fold image of a page.
 */
export default function ResponsiveImage({
  className,
  imageClassName,
  overlay = "none",
  zoom = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  alt,
  ...props
}: ResponsiveImageProps) {
  const overlayClass = OVERLAYS[overlay];
  return (
    <div className={cn("relative overflow-hidden bg-surface-raised", className)}>
      <Image
        fill
        sizes={sizes}
        alt={alt}
        className={cn(
          "object-cover",
          zoom && "transition-transform duration-700 ease-out-expo group-hover:scale-105 motion-reduce:transform-none",
          imageClassName,
        )}
        {...props}
      />
      {overlayClass ? <div className={cn("pointer-events-none absolute inset-0", overlayClass)} aria-hidden="true" /> : null}
    </div>
  );
}
