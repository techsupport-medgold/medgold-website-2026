import Image from "next/image";
import {
  BadgeCheck,
  CalendarCheck,
  Eye,
  Megaphone,
  Phone,
  Quote,
  ShieldCheck,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@@/components/ui/button";
import { SITE } from "@@/config/site";
import { hero, type PromiseIcon } from "@@/data/branding";
import { cn } from "@@/lib/utils";

const PROMISE_ICONS: Record<PromiseIcon, LucideIcon> = {
  visibility: Eye,
  patients: Users,
  revenue: TrendingUp,
  brand: ShieldCheck,
};

const CHANNEL_STYLES: Record<(typeof hero.dashboard.channels)[number]["id"], string> = {
  facebook: "bg-[#1877f2] text-white",
  instagram: "bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white",
  google: "bg-white text-slate-800",
  youtube: "bg-[#ff0000] text-white",
};

export default function BrandingHero() {
  return (
    <section aria-labelledby="branding-heading" className="brand-wash">
      <div className="container grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-12 lg:gap-8">
        <div className="min-w-0 lg:col-span-7">
          <p className="inline-flex items-center gap-1.5 rounded-xl border border-border-muted bg-surface-raised px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-primary-deep">
            <Megaphone className="size-3.5 shrink-0" aria-hidden="true" />
            {hero.eyebrow}
          </p>
          <h1
            id="branding-heading"
            className="mt-6 text-3xl font-extrabold leading-tight tracking-tight text-primary-deep sm:text-[44px] sm:leading-[52px]"
          >
            <span className="block">{hero.heading.first}</span>
            <span className="text-primary">{hero.heading.second}</span>{" "}
            <span className="text-gold-ink">{hero.heading.third}</span>
          </h1>
          <p className="mt-6 max-w-2xl text-ink-muted">{hero.intro}</p>

          <ul className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {hero.promises.map((promise) => {
              const Icon = PROMISE_ICONS[promise.icon];
              return (
                <li
                  key={promise.title}
                  className="flex items-center gap-2 rounded border border-border-muted bg-surface p-2.5 shadow-sm"
                >
                  <Icon className="size-4 shrink-0 text-primary-deep" aria-hidden="true" />
                  <span className="min-w-0">
                    <span className="block text-[11px] font-bold tracking-wide text-primary-deep">{promise.title}</span>
                    <span className="block text-[11px] text-ink-muted">{promise.text}</span>
                  </span>
                </li>
              );
            })}
          </ul>

          <div className="mt-6 flex flex-col items-start gap-3">
            <Button asChild size="lg" className="h-auto min-h-11 whitespace-normal py-2.5 hover:bg-primary-deep">
              <a href="#branding-cta">
                <CalendarCheck aria-hidden="true" />
                {hero.primaryCta}
              </a>
            </Button>
            <p className="flex flex-wrap items-center gap-x-1.5 rounded border border-border-muted bg-surface-raised px-4 py-1 text-sm font-semibold text-primary-deep sm:py-2">
              <Phone className="size-3.5" aria-hidden="true" />
              {hero.callLabel}
              <a href={`tel:${SITE.contact.phoneHref}`} className="inline-flex min-h-11 items-center hover:underline sm:min-h-0">
                {SITE.contact.phone}
              </a>
              <span className="hidden sm:inline" aria-hidden="true">|</span>
              <a href={`tel:${SITE.contact.phoneAltHref}`} className="inline-flex min-h-11 items-center hover:underline sm:min-h-0">
                {SITE.contact.phoneAlt}
              </a>
            </p>
          </div>

          <blockquote className="mt-6 flex gap-2 rounded-lg border-l-4 border-gold-ink bg-gold/20 py-4 pl-5 pr-4">
            <Quote className="mt-0.5 size-4 shrink-0 text-gold-ink" aria-hidden="true" />
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-ink">{hero.quote.title}</p>
              <p className="mt-0.5 text-xs italic text-ink-muted">{hero.quote.text}</p>
            </div>
          </blockquote>
        </div>

        <div className="flex min-w-0 flex-col gap-4 rounded-lg border border-border-muted bg-surface p-4 shadow-lg sm:p-6 lg:col-span-5">
          <figure>
            <div className="rounded bg-gradient-to-br from-primary-deep via-[#073842] to-slate-900 p-4 text-white shadow-md">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/15 pb-2">
                <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-white/90">
                  <span className="size-3 rounded-full bg-emerald-400" aria-hidden="true" />
                  {hero.dashboard.title}
                </p>
                <span className="rounded-sm bg-white/20 px-2 py-0.5 font-mono text-[11px]">{hero.dashboard.badge}</span>
              </div>
              <dl className="grid grid-cols-2 gap-2 py-3">
                {hero.dashboard.metrics.map((metric) => (
                  <div key={metric.label} className="rounded border border-white/10 bg-white/10 p-2.5">
                    <dt className="text-[11px] font-medium uppercase text-white/70">{metric.label}</dt>
                    <dd className="mt-0.5 flex items-baseline gap-1.5">
                      <span
                        className={cn(
                          "text-xl font-extrabold sm:text-2xl",
                          "gold" in metric && metric.gold ? "text-amber-300" : "text-white",
                        )}
                      >
                        {metric.value}
                      </span>
                      {"change" in metric ? (
                        <span className="text-[11px] font-medium text-emerald-300">{metric.change}</span>
                      ) : null}
                    </dd>
                    <dd className="mt-1 text-[10px] text-white/75">{metric.detail}</dd>
                  </div>
                ))}
              </dl>
              <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/15 pt-2.5">
                <p className="text-[11px] font-medium text-white/80">{hero.dashboard.channelsLabel}</p>
                <ul className="flex gap-2">
                  {hero.dashboard.channels.map((channel) => (
                    <li
                      key={channel.id}
                      className={cn(
                        "flex size-7 items-center justify-center rounded-full text-xs font-bold",
                        CHANNEL_STYLES[channel.id],
                      )}
                    >
                      <span aria-hidden="true">{channel.short}</span>
                      <span className="sr-only">{channel.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <figcaption className="mt-1.5 text-[11px] text-ink-subtle">{hero.dashboard.caption}</figcaption>
          </figure>

          <ul className="grid grid-cols-2 gap-2">
            {hero.photos.map((photo, index) => (
              <li key={photo.src} className="relative h-28 overflow-hidden rounded border border-border-muted bg-surface-raised">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  priority={index === 0}
                  sizes="(min-width: 1024px) 20vw, 50vw"
                  className="object-cover"
                />
                <span
                  className={cn(
                    "absolute inset-0 flex items-end bg-gradient-to-t to-transparent p-2 text-[11px] font-medium text-white",
                    index === 0 ? "from-primary-deep/90" : "from-slate-900/90",
                  )}
                >
                  {photo.label}
                </span>
              </li>
            ))}
          </ul>

          <p className="flex items-center justify-between gap-3 rounded bg-surface-raised p-2.5 text-xs font-medium text-primary-deep">
            <span className="flex items-center gap-2">
              <BadgeCheck className="size-4 shrink-0 text-gold-ink" aria-hidden="true" />
              {hero.squad.text}
            </span>
            <span className="shrink-0 text-[11px] font-bold tracking-wide text-gold-ink">{hero.squad.badge}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
