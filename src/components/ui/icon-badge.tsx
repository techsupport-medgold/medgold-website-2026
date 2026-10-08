import type { LucideIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@@/lib/utils";

export const iconBadgeVariants = cva("inline-flex shrink-0 items-center justify-center transition-transform duration-300 ease-spring", {
  variants: {
    tone: {
      teal: "bg-primary text-white",
      gold: "bg-gold/15 text-gold-ink",
      soft: "bg-primary/10 text-primary",
      dark: "bg-white/10 text-gold",
    },
    size: {
      sm: "size-9 rounded-lg [&_svg]:size-4",
      md: "size-12 rounded-xl [&_svg]:size-6",
    },
  },
  defaultVariants: { tone: "soft", size: "md" },
});

type IconBadgeProps = VariantProps<typeof iconBadgeVariants> & {
  icon: LucideIcon;
  className?: string;
};

/** Decorative icon chip; wrap in `group` and it pops on the card's hover. */
export default function IconBadge({ icon: Icon, tone, size, className }: IconBadgeProps) {
  return (
    <span className={cn(iconBadgeVariants({ tone, size }), "group-hover:scale-110 group-hover:-rotate-3", className)}>
      <Icon aria-hidden="true" />
    </span>
  );
}
