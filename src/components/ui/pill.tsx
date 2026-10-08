import type { ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@@/lib/utils";

export const pillVariants = cva("inline-flex items-center gap-1.5 rounded-pill font-semibold", {
  variants: {
    tone: {
      teal: "bg-primary/10 text-primary-deep",
      gold: "bg-gold/15 text-gold-ink",
      neutral: "bg-surface-muted text-ink-muted",
      dark: "bg-white/10 text-white ring-1 ring-inset ring-white/20",
      solid: "bg-primary text-white",
    },
    size: {
      sm: "px-2.5 py-0.5 text-xs",
      md: "px-3.5 py-1 text-sm",
    },
  },
  defaultVariants: { tone: "teal", size: "sm" },
});

type PillProps = VariantProps<typeof pillVariants> & { children: ReactNode; className?: string };

export default function Pill({ tone, size, className, children }: PillProps) {
  return <span className={cn(pillVariants({ tone, size }), className)}>{children}</span>;
}
