import type { ReactNode } from "react";
import Reveal from "@@/components/ui/reveal";
import { stagger } from "@@/lib/motion";
import { cn } from "@@/lib/utils";

export type TimelineStep = {
  title: string;
  text?: ReactNode;
  meta?: ReactNode;
};

type TimelineProps = {
  steps: readonly TimelineStep[];
  tone?: "light" | "dark";
  /** Horizontal on large screens (up to 5 steps); always vertical on small ones. */
  orientation?: "vertical" | "horizontal";
  className?: string;
};

const LG_COLS: Record<number, string> = {
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
};

/** Numbered process steps joined by a rail. */
export default function Timeline({ steps, tone = "light", orientation = "horizontal", className }: TimelineProps) {
  const dark = tone === "dark";
  const horizontal = orientation === "horizontal" && steps.length <= 5;
  return (
    <ol className={cn("grid gap-8", horizontal && LG_COLS[steps.length], className)}>
      {steps.map((step, index) => (
        <Reveal
          as="li"
          key={step.title}
          delay={stagger(index, 100)}
          className={cn("group relative flex gap-5", horizontal && "lg:flex-col lg:gap-4")}
        >
          {index < steps.length - 1 ? (
            <span
              aria-hidden="true"
              className={cn(
                "absolute -bottom-8 left-6 top-12 w-px",
                horizontal && "lg:-right-8 lg:bottom-auto lg:left-14 lg:top-6 lg:h-px lg:w-auto",
                dark ? "bg-white/20" : "bg-primary/20",
              )}
            />
          ) : null}
          <span
            className={cn(
              "relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full font-display text-base font-bold ring-4 transition-transform duration-300 ease-spring group-hover:scale-110",
              dark ? "bg-gold text-ink ring-primary-deep" : "bg-primary text-white ring-surface",
            )}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="min-w-0 pb-2">
            {step.meta ? (
              <p className={cn("text-xs font-bold uppercase tracking-wider", dark ? "text-gold" : "text-gold-ink")}>{step.meta}</p>
            ) : null}
            <h3 className={cn("text-lg font-bold", dark ? "text-white" : "text-primary-deep")}>{step.title}</h3>
            {step.text ? (
              <div className={cn("mt-2 text-sm leading-relaxed", dark ? "text-white/80" : "text-ink-muted")}>{step.text}</div>
            ) : null}
          </div>
        </Reveal>
      ))}
    </ol>
  );
}
