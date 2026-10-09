import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  Eye,
  Megaphone,
  Quote,
  ShieldCheck,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@@/components/ui/button";
import CountUp from "@@/components/ui/count-up";
import IconBadge from "@@/components/ui/icon-badge";
import Pill from "@@/components/ui/pill";
import ResponsiveImage from "@@/components/ui/responsive-image";
import { hero, type PromiseIcon } from "@@/data/branding";
import { cn } from "@@/lib/utils";

const PROMISE_ICONS: Record<PromiseIcon, LucideIcon> = {
  visibility: Eye,
  patients: Users,
  revenue: TrendingUp,
  brand: ShieldCheck,
};

const CHANNEL_COLORS: Record<(typeof hero.dashboard.channels)[number]["id"], string> = {
  facebook: "bg-blue-600 text-white",
  instagram: "bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white",
  google: "bg-white text-slate-800",
  youtube: "bg-red-600 text-white",
};

export default function BrandingHero() {
  return (
    <section aria-labelledby="branding-heading" className="brand-wash">
      <div className="container grid items-center gap-12 pb-20 pt-10 sm:pt-14 lg:grid-cols-12 lg:gap-10 lg:pb-24">
        <div className="min-w-0 lg:col-span-7">
          <p className="inline-flex max-w-full items-start gap-2 rounded-2xl border border-primary/10 bg-surface/90 px-4 py-2 text-xs font-bold uppercase tracking-wider text-primary-deep shadow-card backdrop-blur sm:items-center sm:rounded-full">
            <Megaphone className="mt-0.5 size-4 shrink-0 text-gold-ink sm:mt-0" aria-hidden="true" />
            {hero.eyebrow}
          </p>
          <h1
            id="branding-heading"
            className="mt-6 font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-primary-deep sm:text-5xl"
          >
            <span className="block">{hero.heading.first}</span>
            <span className="text-primary">{hero.heading.second}</span>{" "}
            <span className="text-gold-ink">{hero.heading.third}</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted">{hero.intro}</p>

          <ul className="mt-8 grid grid-cols-2 gap-3 animate-in fade-in-0 slide-in-from-bottom-2 fill-mode-both duration-700 xl:grid-cols-4">
            {hero.promises.map((promise, index) => {
              const Icon = PROMISE_ICONS[promise.icon];
              return (
                <li
                  key={promise.title}
                  className="hover-lift group flex items-center gap-3 rounded-xl bg-surface/95 p-3 shadow-card ring-1 ring-black/5"
                >
                  <IconBadge icon={Icon} tone={index % 2 === 0 ? "soft" : "gold"} size="sm" />
                  <span className="min-w-0">
                    <span className="block text-xs font-bold text-primary-deep">{promise.title}</span>
                    <span className="block text-xs text-ink-muted">{promise.text}</span>
                  </span>
                </li>
              );
            })}
          </ul>

          <div className="mt-8 flex flex-col items-start gap-3">
            <Button asChild size="lg" className="h-auto min-h-12 shrink whitespace-normal px-6 py-3 font-semibold">
              <a href="#branding-cta">
                <CalendarCheck aria-hidden="true" />
                {hero.primaryCta}
                <ArrowRight aria-hidden="true" />
              </a>
            </Button>
          </div>

          <blockquote className="mt-8 flex gap-3 rounded-card border-l-4 border-gold bg-surface/90 p-5 shadow-card ring-1 ring-black/5">
            <Quote className="mt-0.5 size-5 shrink-0 text-gold-ink" aria-hidden="true" />
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-primary-deep">{hero.quote.title}</p>
              <p className="mt-1 text-sm italic text-ink-muted">{hero.quote.text}</p>
            </div>
          </blockquote>
        </div>

        <div className="relative min-w-0 lg:col-span-5">
          <div
            className="absolute -inset-3 -z-10 rotate-2 rounded-[1.75rem] bg-gradient-to-br from-gold/40 via-gold/10 to-primary/20 sm:-inset-4"
            aria-hidden="true"
          />
          <div className="flex flex-col gap-4 rounded-card bg-surface p-4 shadow-card-hover ring-1 ring-black/5 animate-in fade-in-0 slide-in-from-bottom-4 fill-mode-both duration-700 sm:p-5">
            <figure>
              <div className="brand-dark rounded-xl p-5 text-white shadow-card">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/15 pb-3">
                  <p className="flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-wider text-white/90">
                    <span className="status-dot" aria-hidden="true" />
                    {hero.dashboard.title}
                  </p>
                  <Pill tone="dark" className="font-mono text-[11px]">
                    {hero.dashboard.badge}
                  </Pill>
                </div>
                <dl className="grid grid-cols-2 gap-3 py-4">
                  {hero.dashboard.metrics.map((metric) => (
                    <div key={metric.label} className="flex flex-col rounded-xl border border-white/10 bg-white/[0.06] p-3">
                      <dt className="text-[11px] font-bold uppercase tracking-wider text-white/75">{metric.label}</dt>
                      <dd className="mt-1 flex flex-wrap items-baseline gap-x-1.5">
                        <span
                          className={cn(
                            "font-display text-2xl font-extrabold tracking-tight sm:text-3xl",
                            "gold" in metric && metric.gold ? "text-gold" : "text-white",
                          )}
                        >
                          <CountUp value={metric.value} />
                        </span>
                        {"change" in metric ? (
                          <span className="text-xs font-semibold text-emerald-300">{metric.change}</span>
                        ) : null}
                      </dd>
                      <dd className="mt-1 text-[11px] text-white/75">{metric.detail}</dd>
                    </div>
                  ))}
                </dl>
                <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/15 pt-3">
                  <p className="text-xs font-medium text-white/80">{hero.dashboard.channelsLabel}</p>
                  <ul className="flex gap-2">
                    {hero.dashboard.channels.map((channel) => (
                      <li
                        key={channel.id}
                        className={cn(
                          "flex size-8 items-center justify-center rounded-full text-xs font-bold shadow-sm ring-2 ring-white/10 transition-transform duration-300 ease-spring hover:-translate-y-0.5 hover:scale-110 motion-reduce:transform-none",
                          CHANNEL_COLORS[channel.id],
                        )}
                      >
                        <span aria-hidden="true">{channel.short}</span>
                        <span className="sr-only">{channel.label}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <figcaption className="mt-2 text-[11px] text-ink-subtle">{hero.dashboard.caption}</figcaption>
            </figure>

            <ul className="grid grid-cols-2 gap-3">
              {hero.photos.map((photo, index) => (
                <li key={photo.src} className="group relative overflow-hidden rounded-xl ring-1 ring-black/5">
                  <ResponsiveImage
                    src={photo.src}
                    alt={photo.alt}
                    preload={index === 0}
                    sizes="(min-width: 1280px) 260px, (min-width: 1024px) 20vw, 50vw"
                    overlay="bottom"
                    zoom
                    className="aspect-video"
                  />
                  <span className="absolute inset-x-0 bottom-0 p-2.5 text-[11px] font-semibold leading-tight text-white sm:text-xs">
                    {photo.label}
                  </span>
                </li>
              ))}
            </ul>

            <p className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-surface-raised p-3 text-xs font-semibold text-primary-deep">
              <span className="flex items-center gap-2">
                <BadgeCheck className="size-4 shrink-0 text-gold-ink" aria-hidden="true" />
                {hero.squad.text}
              </span>
              <Pill tone="gold" className="shrink-0 font-bold">
                {hero.squad.badge}
              </Pill>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
