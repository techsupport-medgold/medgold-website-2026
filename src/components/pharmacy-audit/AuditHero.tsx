import Link from "next/link";
import {
  BadgeCheck,
  CalendarCheck,
  ChartNoAxesCombined,
  IndianRupee,
  ListChecks,
  Phone,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@@/components/ui/button";
import { DevRoutes } from "@@/config/routes";
import { SITE } from "@@/config/site";
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
      <div className="container grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-12 lg:gap-12">
        <div className="min-w-0 lg:col-span-7">
          <p className="inline-flex items-center gap-1.5 rounded bg-surface-raised px-2 py-1 text-xs font-semibold text-primary-deep">
            <TrendingUp className="size-3.5" aria-hidden="true" />
            {hero.badge}
          </p>
          <h1
            id="pharmacy-audit-heading"
            className="mt-5 text-4xl font-bold leading-tight tracking-tight text-primary-deep sm:text-5xl"
          >
            {hero.heading}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-ink-muted">{hero.intro}</p>

          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Highlights">
            {hero.chips.map((chip) => (
              <li
                key={chip.label}
                className={cn(
                  "rounded bg-surface-raised px-2 py-1 text-xs font-semibold",
                  chip.accent ? "text-gold-ink" : "text-primary-deep",
                )}
              >
                {chip.label}
              </li>
            ))}
          </ul>

          <ul className="mt-6 grid gap-2 sm:grid-cols-2">
            {hero.features.map((feature) => {
              const Icon = FEATURE_ICONS[feature.icon];
              return (
                <li
                  key={feature.label}
                  className="flex items-center gap-2 rounded-md bg-surface p-3 text-sm font-semibold text-ink shadow-sm"
                >
                  <Icon className="size-4 shrink-0 text-gold-ink" aria-hidden="true" />
                  {feature.label}
                </li>
              );
            })}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-auto min-h-11 whitespace-normal py-2.5 hover:bg-primary-deep">
              <Link href={DevRoutes.CONTACT}>
                <CalendarCheck aria-hidden="true" />
                {hero.primaryCta}
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-auto min-h-11 whitespace-normal border-primary/40 bg-surface py-2.5 text-primary hover:bg-primary/5 hover:text-primary"
            >
              <a href={`tel:${SITE.contact.phoneHref}`}>
                <Phone aria-hidden="true" />
                Call {SITE.contact.phone}
              </a>
            </Button>
          </div>
        </div>

        <div className="rounded-xl border border-border-muted bg-surface p-6 shadow-lg lg:col-span-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-primary-deep">
              <span className="size-3 rounded-full bg-gold" aria-hidden="true" />
              {snapshot.title}
            </h2>
            <span className="text-xs font-semibold text-gold-ink">{snapshot.region}</span>
          </div>

          <div className="mt-4 rounded-md bg-surface-raised p-4">
            <div className="flex items-center justify-between gap-3 text-xs">
              <span className="font-medium text-ink-muted">{snapshot.chartLabel}</span>
              <span className="font-bold text-primary-deep">{snapshot.chartValue}</span>
            </div>
            <div className="mt-3 flex h-12 items-end gap-1" aria-hidden="true">
              {snapshot.bars.map((height, index) => (
                <div
                  key={height}
                  className={cn(
                    "flex-1 rounded-sm",
                    index === snapshot.bars.length - 1 ? "bg-gold" : cn("bg-primary-deep", BAR_OPACITY[index]),
                  )}
                  style={{ height: `${height}px` }}
                />
              ))}
            </div>
            <ul className="mt-2 flex justify-between text-xs text-ink-muted">
              {snapshot.milestones.map((milestone) => (
                <li key={milestone}>{milestone}</li>
              ))}
            </ul>
          </div>

          <dl className="mt-4 grid grid-cols-2 gap-2">
            {snapshot.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col rounded-md bg-surface-muted p-3">
                <dt className="order-2 mt-1 text-xs font-semibold text-ink-muted">{stat.label}</dt>
                <dd
                  className={cn(
                    "order-1 text-3xl font-bold tracking-tight",
                    stat.accent ? "text-gold-ink" : "text-primary-deep",
                  )}
                >
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>

          <p className="mt-4 rounded-md bg-surface-raised p-2.5 text-center text-xs font-bold text-gold-ink">
            {snapshot.emailLabel}{" "}
            <a
              href={`mailto:${SITE.contact.email}`}
              className="font-medium text-primary-deep hover:text-primary hover:underline"
            >
              {SITE.contact.email}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
