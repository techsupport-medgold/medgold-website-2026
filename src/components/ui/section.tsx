import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@@/lib/utils";

export const SECTION_TONES = {
  surface: "bg-surface",
  raised: "bg-surface-raised",
  muted: "bg-surface-muted",
  wash: "brand-wash",
  dark: "brand-dark text-white",
} as const;

export type SectionTone = keyof typeof SECTION_TONES;

type SectionProps = Omit<ComponentPropsWithoutRef<"section">, "children"> & {
  tone?: SectionTone;
  /** Drop the inner container for full-bleed content. */
  bleed?: boolean;
  containerClassName?: string;
  children: ReactNode;
};

/** Standard page band: tone, vertical rhythm, anchor offset and container. */
export default function Section({
  tone = "surface",
  bleed = false,
  className,
  containerClassName,
  children,
  ...props
}: SectionProps) {
  return (
    <section className={cn("scroll-mt-24 py-section", SECTION_TONES[tone], className)} {...props}>
      {bleed ? children : <div className={cn("container", containerClassName)}>{children}</div>}
    </section>
  );
}
