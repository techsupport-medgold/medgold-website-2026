import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  ChartNoAxesCombined,
  IndianRupee,
  ListChecks,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@@/components/ui/button";
import CountUp from "@@/components/ui/count-up";
import IconBadge from "@@/components/ui/icon-badge";
import Pill from "@@/components/ui/pill";
import { DevRoutes } from "@@/config/routes";
import { hero, snapshot, type HeroFeatureIcon } from "@@/data/pharmacyAudit";
import { cn } from "@@/lib/utils";

const FEATURE_ICONS: Record<HeroFeatureIcon, LucideIcon> = {
  verify: BadgeCheck,
  sop: ListChecks,
  kpi: ChartNoAxesCombined,
  liquidation: IndianRupee,
};

const BAR_OPACITY = ["opacity-20", "opacity-30", "opacity-40", "opacity-50", "opacity-70", "opacity-100"];

export default function AuditHero() {
  return (
    <section aria-labelledby="pharmacy-audit-heading" className="brand-wash">
      <div className="container grid items-center gap-12 pb-16 pt-10 sm:pb-20 sm:pt-14 lg:grid-cols-12 lg:gap-10">
        <div className="min-w-0 lg:col-span-7">
          <p className="inline-flex max-w-full items-start gap-2.5 rounded-2xl border border-primary/10 bg-surface/90 px-4 py-2 text-xs font-semibold text-primary-deep shadow-card backdrop-blur sm:items-center sm:rounded-full">
            <TrendingUp className="mt-0.5 size-3.5 shrink-0 text-gold-ink sm:mt-0" aria-hidden="true" />
            {hero.badge}
          </p>
          <h1
            id="pharmacy-audit-heading"
            className="mt-6 font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-primary-deep sm:text-5xl lg:text-[3.4rem]"
          >
            {hero.heading}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted">{hero.intro}</p>

          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Highlights">
            {hero.chips.map((chip) => (
              <li key={chip.label}>
                <Pill
                  tone={chip.accent ? "gold" : "teal"}
                  size="md"
                  className={cn("text-xs ring-1 ring-inset", chip.accent ? "ring-gold/40" : "ring-primary/15")}
                >
                  {chip.label}
                </Pill>
              </li>
            ))}
          </ul>

          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {hero.features.map((feature) => (
              <li
                key={feature.label}
                className="hover-lift group flex items-center gap-3 rounded-xl border border-border-muted bg-surface/95 p-3 text-sm font-semibold text-ink shadow-card hover:border-primary/30"
              >
                <IconBadge icon={FEATURE_ICONS[feature.icon]} tone="gold" size="sm" />
                {feature.label}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button asChild size="lg" className="h-auto min-h-12 shrink whitespace-normal px-6 py-3 font-semibold">
              <Link href={DevRoutes.CONTACT}>
                <CalendarCheck aria-hidden="true" />
                {hero.primaryCta}
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="relative min-w-0 lg:col-span-5">
          <div
            className="absolute -inset-3 -z-10 rotate-2 rounded-[1.75rem] bg-gradient-to-br from-gold/40 via-gold/10 to-primary/20 sm:-inset-4"
            aria-hidden="true"
          />
          <div className="relative overflow-hidden rounded-card bg-surface p-6 shadow-card-hover ring-1 ring-black/5 animate-in fade-in-0 slide-in-from-bottom-4 fill-mode-both duration-700 sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="flex items-center gap-2.5 text-sm font-bold uppercase tracking-wider text-primary-deep">
                <span className="status-dot" aria-hidden="true" />
                {snapshot.title}
              </h2>
              <Pill tone="gold">{snapshot.region}</Pill>
            </div>

            <div className="mt-5 rounded-xl bg-surface-raised p-4">
              <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-xs">
                <span className="font-medium text-ink-muted">{snapshot.chartLabel}</span>
                <span className="font-bold text-primary-deep">{snapshot.chartValue}</span>
              </div>
              <div className="mt-4 flex h-16 items-end gap-1.5" aria-hidden="true">
                {snapshot.bars.map((height, index) => (
                  <div
                    key={height}
                    className={cn(
                      "flex-1 rounded-t-md animate-in fade-in-0 slide-in-from-bottom-3 fill-mode-both duration-700",
                      index === snapshot.bars.length - 1
                        ? "bg-gold shadow-glow-gold"
                        : cn("bg-primary-deep", BAR_OPACITY[index]),
                    )}
                    style={{ height: `${height * 1.5}px`, animationDelay: `${300 + index * 90}ms` }}
                  />
                ))}
              </div>
              <ul className="mt-2 flex justify-between gap-2 text-xs text-ink-muted">
                {snapshot.milestones.map((milestone) => (
                  <li key={milestone}>{milestone}</li>
                ))}
              </ul>
            </div>

            <dl className="mt-4 grid grid-cols-2 gap-3">
              {snapshot.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="hover-lift flex flex-col rounded-xl border border-border-muted bg-surface p-3.5"
                >
                  <dt className="order-2 mt-1 text-xs font-semibold text-ink-subtle">{stat.label}</dt>
                  <dd
                    className={cn(
                      "order-1 font-display text-3xl font-extrabold tracking-tight",
                      stat.accent ? "text-gold-ink" : "text-primary-deep",
                    )}
                  >
                    <CountUp value={stat.value} />
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
