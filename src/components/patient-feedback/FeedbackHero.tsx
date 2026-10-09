import { ArrowRight, CalendarCheck, Sparkles } from "lucide-react";
import { Button } from "@@/components/ui/button";
import CountUp from "@@/components/ui/count-up";
import ResponsiveImage from "@@/components/ui/responsive-image";
import { hero } from "@@/data/patientFeedback";
import { cn } from "@@/lib/utils";

export default function FeedbackHero() {
  return (
    <section aria-labelledby="feedback-heading" className="brand-wash">
      <div className="container grid items-center gap-12 pb-20 pt-10 sm:pt-14 lg:grid-cols-12 lg:gap-10 lg:pb-24">
        <div className="min-w-0 lg:col-span-7">
          <p className="inline-flex max-w-full items-start gap-2.5 rounded-2xl border border-primary/10 bg-surface/90 px-4 py-2 text-xs font-semibold text-primary-deep shadow-card backdrop-blur sm:items-center sm:rounded-full">
            <span className="status-dot mt-1 shrink-0 sm:mt-0" aria-hidden="true" />
            {hero.eyebrow}
          </p>
          <h1
            id="feedback-heading"
            className="mt-6 font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-primary-deep sm:text-5xl lg:text-[3.25rem]"
          >
            {hero.heading}
          </h1>
          <p className="mt-4 font-display text-xl font-semibold leading-snug text-gold-ink sm:text-2xl">{hero.tagline}</p>

          <div className="mt-6 flex gap-4 rounded-2xl border border-primary/10 bg-surface/90 p-4 shadow-card backdrop-blur sm:p-5">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-white" aria-hidden="true">
              <Sparkles className="size-5" />
            </span>
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-wider text-primary-deep">{hero.callout.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-muted">{hero.callout.text}</p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button asChild size="lg" className="h-auto min-h-12 shrink whitespace-normal px-6 py-3 font-semibold">
              <a href="#feedback-cta">
                <CalendarCheck aria-hidden="true" />
                {hero.primaryCta}
                <ArrowRight aria-hidden="true" />
              </a>
            </Button>
          </div>

          <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {hero.tiles.map((tile, index) => {
              const accent = "accent" in tile && tile.accent;
              return (
                <li
                  key={tile.label}
                  className={cn(
                    "hover-lift rounded-xl bg-surface p-3 shadow-card ring-1 ring-black/5 animate-in fade-in-0 slide-in-from-bottom-2 fill-mode-both duration-700",
                    accent && "ring-gold/40",
                  )}
                  style={{ animationDelay: `${150 + index * 80}ms` }}
                >
                  <p
                    className={cn(
                      "font-display text-lg font-extrabold leading-snug",
                      accent ? "text-gold-ink" : "text-primary-deep",
                    )}
                  >
                    {tile.value}
                  </p>
                  <p className="mt-0.5 text-xs font-semibold text-ink-muted">{tile.label}</p>
                </li>
              );
            })}
          </ul>
        </div>

        <figure className="relative min-w-0 lg:col-span-5">
          <div
            className="absolute -inset-3 -z-10 rotate-2 rounded-[1.75rem] bg-gradient-to-br from-gold/40 via-gold/10 to-primary/20 sm:-inset-4"
            aria-hidden="true"
          />
          <div className="relative overflow-hidden rounded-card shadow-card-hover ring-1 ring-black/5">
            <ResponsiveImage
              src={hero.image.src}
              alt={hero.image.alt}
              preload
              sizes="(min-width: 1024px) 40vw, 100vw"
              overlay="bottom"
              className="aspect-[4/3]"
            />
          </div>

          <figcaption className="relative mx-3 -mt-12 grid gap-2 rounded-2xl bg-surface/95 p-4 shadow-card-hover ring-1 ring-black/5 backdrop-blur animate-in fade-in-0 slide-in-from-bottom-4 fill-mode-both delay-300 duration-700 sm:mx-6 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs font-semibold text-primary-deep">{hero.dashboard.title}</p>
              <span className="inline-flex items-center gap-1.5 rounded-pill bg-gold px-2.5 py-0.5 text-[11px] font-bold text-ink">
                <span className="size-1.5 rounded-full bg-ink" aria-hidden="true" />
                {hero.dashboard.badge}
              </span>
            </div>
            <div className="flex flex-wrap items-baseline justify-between gap-x-3">
              <p className="flex items-baseline gap-1.5">
                <span className="font-display text-3xl font-extrabold tracking-tight text-primary-deep">
                  <CountUp value={hero.dashboard.value} />
                </span>
                <span className="text-xs font-semibold text-ink-muted">{hero.dashboard.label}</span>
              </p>
              <p className="text-xs font-semibold text-gold-ink">{hero.dashboard.scope}</p>
            </div>
            <div
              role="img"
              aria-label={`${hero.dashboard.value} ${hero.dashboard.label}`}
              className="h-2 overflow-hidden rounded-full bg-surface-muted"
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary to-teal-300 animate-in slide-in-from-left-full fill-mode-both delay-500 duration-1000"
                style={{ width: `${hero.dashboard.percent}%` }}
              />
            </div>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
