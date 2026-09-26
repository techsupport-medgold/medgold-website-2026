import { cn } from "@@/lib/utils";

type Tone = "dark" | "light";

type LogoMarkProps = {
  className?: string;
  tone?: Tone;
};

export function LogoMark({ className, tone = "dark" }: LogoMarkProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={cn("size-10", className)}
      aria-hidden="true"
      focusable="false"
    >
      <rect
        x="0.5"
        y="0.5"
        width="47"
        height="47"
        rx="12"
        className={
          tone === "light"
            ? "fill-white/10 stroke-white/25"
            : "fill-primary stroke-primary"
        }
      />
      <path d="M20 11h8v9h9v8h-9v9h-8v-9h-9v-8h9z" className="fill-gold" />
    </svg>
  );
}

type LogoProps = {
  className?: string;
  tone?: Tone;
};

export default function Logo({ className, tone = "dark" }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <LogoMark tone={tone} />
      <span
        className={cn(
          "text-xl font-semibold tracking-tight",
          tone === "light" ? "text-white" : "text-ink"
        )}
      >
        Med{" "}
        <span className={tone === "light" ? "text-gold" : "text-gold-ink"}>
          Gold
        </span>
      </span>
    </span>
  );
}
