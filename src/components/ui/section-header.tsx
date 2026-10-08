import type { ReactNode } from "react";
import { cn } from "@@/lib/utils";

type Tone = "light" | "dark";

export function Eyebrow({
  children,
  tone = "light",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em]",
        tone === "dark" ? "text-gold" : "text-gold-ink",
        className,
      )}
    >
      <span className={cn("h-0.5 w-6 shrink-0 rounded-full", tone === "dark" ? "bg-gold" : "bg-gold-ink")} aria-hidden="true" />
      {children}
    </p>
  );
}

export function GoldRule({ className }: { className?: string }) {
  return <span className={cn("gold-rule", className)} aria-hidden="true" />;
}

type SectionHeaderProps = {
  id?: string;
  eyebrow?: ReactNode;
  title: ReactNode;
  intro?: ReactNode;
  as?: "h1" | "h2" | "h3";
  align?: "left" | "center";
  tone?: Tone;
  size?: "md" | "lg";
  className?: string;
  children?: ReactNode;
};

/** Eyebrow + heading + intro block shared by every section. */
export default function SectionHeader({
  id,
  eyebrow,
  title,
  intro,
  as: Heading = "h2",
  align = "left",
  tone = "light",
  size = "md",
  className,
  children,
}: SectionHeaderProps) {
  const centered = align === "center";
  return (
    <div className={cn("max-w-3xl", centered && "mx-auto text-center", className)}>
      {eyebrow ? (
        <Eyebrow tone={tone} className={centered ? "justify-center" : undefined}>
          {eyebrow}
        </Eyebrow>
      ) : null}
      <Heading
        id={id}
        className={cn(
          "font-display font-bold tracking-tight",
          eyebrow && "mt-4",
          size === "lg" ? "text-4xl sm:text-5xl lg:text-[3.25rem]" : "text-3xl sm:text-4xl",
          tone === "dark" ? "text-white" : "text-primary-deep",
        )}
      >
        {title}
      </Heading>
      {intro ? (
        <p className={cn("mt-4 text-lg leading-relaxed", tone === "dark" ? "text-white/85" : "text-ink-muted")}>{intro}</p>
      ) : null}
      {children}
    </div>
  );
}
