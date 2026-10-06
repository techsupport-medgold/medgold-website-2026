import Link from "next/link";
import {
  ArrowRight,
  Check,
  ClipboardList,
  Recycle,
  Settings,
  ShieldCheck,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { DevRoutes } from "@@/config/routes";
import { advantage, opsPanel, type AdvantageIcon } from "@@/data/home";
import { cn } from "@@/lib/utils";

const CARD_ICONS: Record<AdvantageIcon, LucideIcon> = {
  audits: ShieldCheck,
  operations: Settings,
  growth: TrendingUp,
};

const STAT_ICONS = { gold: TrendingUp, primary: Check, muted: Recycle } as const;

const STAT_NOTE_TONE = {
  gold: "text-gold-ink",
  primary: "text-primary-deep",
  muted: "text-ink-muted",
} as const;

export default function AdvantageSection() {
  return (
    <section aria-labelledby="advantage-heading" className="bg-surface-raised py-16 sm:py-20">
      <div className="container grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold-ink">
            <span className="h-0.5 w-6 bg-gold-ink" aria-hidden="true" />
            {advantage.eyebrow}
          </p>
          <h2 id="advantage-heading" className="mt-4 text-3xl font-bold tracking-tight text-primary-deep sm:text-4xl">
            {advantage.heading}
          </h2>
          <p className="mt-4 text-ink-muted">{advantage.intro}</p>

          <ul className="mt-8 grid gap-4">
            {advantage.cards.map((card) => {
              const Icon = CARD_ICONS[card.icon];
              return (
                <li key={card.title} className="flex gap-4 rounded-lg bg-surface p-5 shadow-card">
                  <Icon className="mt-0.5 size-5 shrink-0 text-gold-ink" aria-hidden="true" />
                  <div>
                    <h3 className="text-lg font-semibold text-primary-deep">{card.title}</h3>
                    <p className="mt-1 text-sm text-ink-muted">{card.description}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="rounded-2xl bg-surface p-6 shadow-lg sm:p-8 lg:col-span-7">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-surface-raised pb-4">
            <h3 className="flex items-center gap-2 text-sm font-bold text-primary-deep">
              <span className="size-3 shrink-0 rounded-full bg-gold" aria-hidden="true" />
              {opsPanel.title}
            </h3>
            <span className="rounded-sm bg-surface-raised px-2 py-0.5 text-[11px] font-semibold text-ink-muted">
              {opsPanel.tag}
            </span>
          </div>

          <dl className="mt-6 grid gap-4 sm:grid-cols-3">
            {opsPanel.stats.map((stat) => {
              const Icon = STAT_ICONS[stat.tone];
              return (
                <div key={stat.label} className="flex flex-col rounded-lg bg-surface-raised p-4">
                  <dt className="order-1 text-[11px] font-semibold uppercase tracking-wider text-ink-subtle">
                    {stat.label}
                  </dt>
                  <dd className="order-2 mt-2 text-3xl font-semibold tracking-tight text-primary-deep">{stat.value}</dd>
                  <dd className={cn("order-3 mt-2 flex items-start gap-1 text-xs font-semibold", STAT_NOTE_TONE[stat.tone])}>
                    <Icon className="mt-0.5 size-3 shrink-0" aria-hidden="true" />
                    {stat.note}
                  </dd>
                </div>
              );
            })}
          </dl>

          <ul className="mt-6 grid gap-4">
            {opsPanel.bars.map((bar) => (
              <li key={bar.label}>
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-sm font-semibold text-ink">{bar.label}</span>
                  <span
                    className={cn(
                      "shrink-0 font-mono text-sm font-bold",
                      bar.tone === "gold" ? "text-gold-ink" : "text-primary-deep",
                    )}
                  >
                    {bar.display}
                  </span>
                </div>
                <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-surface-raised" aria-hidden="true">
                  <div
                    className={cn("h-full rounded-full", bar.tone === "gold" ? "bg-gold" : "bg-primary")}
                    style={{ width: `${bar.value}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-col gap-3 rounded-lg bg-surface-raised p-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-center gap-2 text-sm text-ink-muted">
              <ClipboardList className="size-5 shrink-0 text-gold-ink" aria-hidden="true" />
              {opsPanel.note}
            </p>
            <Link
              href={DevRoutes.CONTACT}
              className="group inline-flex min-h-11 shrink-0 items-center gap-1 text-sm font-bold text-primary hover:underline"
            >
              {opsPanel.linkLabel}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
