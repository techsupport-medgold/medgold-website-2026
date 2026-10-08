import Link from "next/link";
import { ArrowRight, BadgeCheck, CircleCheck, LayoutGrid, ShieldCheck } from "lucide-react";
import { Button } from "@@/components/ui/button";
import ResponsiveImage from "@@/components/ui/responsive-image";
import { DevRoutes } from "@@/config/routes";
import { homeHero } from "@@/data/home";
import { cn } from "@@/lib/utils";

const METRIC_ICONS = { primary: BadgeCheck, gold: ShieldCheck } as const;

export default function HomeHero() {
  return (
    <section aria-labelledby="home-heading" className="brand-wash">
      <div className="container grid items-center gap-12 pb-20 pt-10 sm:pt-14 lg:grid-cols-12 lg:gap-10 lg:pb-24">
        <div className="min-w-0 lg:col-span-6">
          <p className="inline-flex max-w-full items-start gap-2.5 rounded-2xl border border-primary/10 bg-surface/90 px-4 py-2 text-xs font-semibold text-primary-deep shadow-card backdrop-blur sm:items-center sm:rounded-full">
            <span className="status-dot mt-1 shrink-0 sm:mt-0" aria-hidden="true" />
            {homeHero.badge}
          </p>

          <h1
            id="home-heading"
            className="mt-6 font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-primary-deep sm:text-5xl lg:text-[3.4rem]"
          >
            {homeHero.heading}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted">{homeHero.intro}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button asChild size="lg" className="h-auto min-h-12 shrink whitespace-normal px-6 py-3 font-semibold">
              <Link href={DevRoutes.CONTACT}>
                <ShieldCheck aria-hidden="true" />
                {homeHero.primaryCta}
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-auto min-h-12 shrink whitespace-normal border-primary/30 bg-surface/80 px-6 py-3 font-semibold text-primary-deep hover:border-primary hover:bg-surface hover:text-primary"
            >
              <a href="#services">
                <LayoutGrid aria-hidden="true" />
                {homeHero.secondaryCta}
              </a>
            </Button>
          </div>

          <ul className="mt-8 flex flex-wrap gap-2" aria-label="Certifications">
            {homeHero.compliance.map((item) => (
              <li
                key={item}
                className="inline-flex items-center gap-1.5 rounded-pill bg-surface px-3 py-1.5 text-xs font-semibold text-ink-muted shadow-sm ring-1 ring-inset ring-border-muted"
              >
                <CircleCheck className="size-3.5 text-gold-ink" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative lg:col-span-6">
          <div className="relative">
            <div
              className="absolute -inset-3 -z-10 rotate-2 rounded-[1.75rem] bg-gradient-to-br from-gold/40 via-gold/10 to-primary/20 sm:-inset-4"
              aria-hidden="true"
            />
            <div className="relative overflow-hidden rounded-card shadow-card-hover ring-1 ring-black/5">
              <ResponsiveImage
                src={homeHero.image.src}
                alt={homeHero.image.alt}
                preload
                sizes="(min-width: 1024px) 50vw, 100vw"
                overlay="bottom"
                className="aspect-[4/3]"
              />
              <div className="absolute inset-x-4 top-4 flex items-center justify-end gap-3 sm:justify-between">
                <span className="hidden rounded-pill bg-slate-950/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur sm:inline">
                  {homeHero.imageTag}
                </span>
                <span className="inline-flex shrink-0 items-center gap-2 rounded-pill bg-slate-950/60 px-3 py-1 text-xs font-semibold text-gold backdrop-blur">
                  <span className="status-dot" aria-hidden="true" />
                  {homeHero.imageStatus}
                </span>
              </div>
            </div>
          </div>

          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:mt-0 lg:block">
            {homeHero.metricCards.map((card, index) => {
              const Icon = METRIC_ICONS[card.tone];
              return (
                <li
                  key={card.label}
                  className={cn(
                    "flex items-center gap-3 rounded-2xl bg-surface/95 p-3 pr-5 shadow-card-hover ring-1 ring-black/5 backdrop-blur",
                    "animate-in fade-in-0 slide-in-from-bottom-4 fill-mode-both duration-700",
                    "lg:absolute lg:w-max",
                    index === 0 ? "lg:-left-8 lg:bottom-16 lg:animate-float" : "delay-150 lg:-bottom-8 lg:-right-6 lg:animate-float lg:[animation-delay:1.5s]",
                  )}
                >
                  <span
                    className={cn(
                      "flex size-11 items-center justify-center rounded-xl",
                      card.tone === "gold" ? "bg-gold text-ink" : "bg-primary text-white",
                    )}
                  >
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <span>
                    <span
                      className={cn(
                        "block font-display text-xl font-extrabold leading-tight",
                        card.tone === "gold" ? "text-gold-ink" : "text-primary-deep",
                      )}
                    >
                      {card.value}
                    </span>
                    <span className="block text-xs font-semibold text-ink-muted">{card.label}</span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
