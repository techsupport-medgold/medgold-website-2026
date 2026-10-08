import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@@/lib/utils";

export const cardVariants = cva("relative flex min-w-0 flex-col rounded-card", {
  variants: {
    variant: {
      default: "border border-border-muted bg-surface shadow-card",
      elevated: "bg-surface shadow-card-hover",
      outline: "border border-primary/15 bg-surface/60",
      soft: "bg-surface-raised",
      dark: "border border-white/10 bg-white/[0.06] text-white backdrop-blur-sm",
    },
    padding: {
      none: "",
      sm: "p-5",
      md: "p-6 sm:p-7",
      lg: "p-8 sm:p-10",
    },
    interactive: {
      true: "hover-lift hover:border-primary/30",
      false: "",
    },
  },
  defaultVariants: { variant: "default", padding: "md", interactive: false },
});

type CardProps = Omit<ComponentPropsWithoutRef<"div">, "children"> &
  VariantProps<typeof cardVariants> & {
    as?: ElementType;
    children: ReactNode;
  };

export default function Card({ as: Tag = "div", variant, padding, interactive, className, children, ...props }: CardProps) {
  return (
    <Tag className={cn(cardVariants({ variant, padding, interactive }), className)} {...props}>
      {children}
    </Tag>
  );
}
