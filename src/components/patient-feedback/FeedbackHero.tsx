import Image from "next/image";
import { CalendarCheck, Phone } from "lucide-react";
import { Button } from "@@/components/ui/button";
import { SITE } from "@@/config/site";
import { hero } from "@@/data/patientFeedback";
import { cn } from "@@/lib/utils";

const contactLinkClass = "inline-flex min-h-11 items-center hover:text-primary hover:underline sm:min-h-0";

export default function FeedbackHero() {
  return (
    <section aria-labelledby="feedback-heading" className="brand-wash">
      <div className="container grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-12 lg:gap-8">
        <div className="min-w-0 lg:col-span-7">
          <p className="flex items-start gap-1.5 text-xs font-semibold uppercase tracking-wide text-gold-ink sm:items-center">
            <span className="mt-1 size-2 shrink-0 rounded-full bg-gold-ink sm:mt-0" aria-hidden="true" />
            {hero.eyebrow}
          </p>
          <h1
            id="feedback-heading"
            className="mt-4 text-4xl font-bold leading-tight tracking-tight text-primary-deep sm:text-5xl"
          >
            {hero.heading}
          </h1>
          <p className="mt-3 text-xl font-semibold text-gold-ink sm:text-2xl">{hero.tagline}</p>

          <div className="mt-5 rounded border-l-4 border-primary-deep bg-surface-raised py-4 pl-5 pr-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-primary-deep">{hero.callout.title}</p>
            <p className="mt-1 text-sm text-ink-muted">{hero.callout.text}</p>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button asChild size="lg" className="h-auto min-h-11 whitespace-normal py-2.5 hover:bg-primary-deep">
              <a href="#feedback-cta">
                <CalendarCheck aria-hidden="true" />
                {hero.primaryCta}
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="h-auto min-h-11 whitespace-normal bg-surface-raised py-2.5 text-primary-deep hover:bg-primary/10"
            >
              <a href={`tel:${SITE.contact.phoneHref}`}>
                <Phone aria-hidden="true" />
                {hero.callLabel} {SITE.contact.phone}
              </a>
            </Button>
          </div>

          <ul className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {hero.tiles.map((tile) => (
              <li key={tile.label} className="rounded bg-surface-raised p-2.5">
                <p
                  className={cn(
                    "text-lg font-bold leading-snug",
                    "accent" in tile && tile.accent ? "text-gold-ink" : "text-primary-deep",
                  )}
                >
                  {tile.value}
                </p>
                <p className="text-xs text-ink-muted">{tile.label}</p>
              </li>
            ))}
          </ul>
        </div>

        <figure className="min-w-0 rounded-lg bg-surface-raised p-2 shadow-xl lg:col-span-5">
          <div className="relative aspect-[16/10] overflow-hidden rounded sm:aspect-auto sm:h-[344px]">
            <Image
              src={hero.image.src}
              alt={hero.image.alt}
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
          <figcaption className="mt-2 grid gap-1.5 rounded bg-surface p-4 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs font-semibold text-primary-deep">{hero.dashboard.title}</p>
              <span className="rounded-sm bg-gold px-1.5 py-0.5 text-[11px] font-semibold text-primary-deep">
                {hero.dashboard.badge}
              </span>
            </div>
            <div className="flex flex-wrap items-baseline justify-between gap-x-3">
              <p className="flex items-baseline gap-1.5">
                <span className="text-3xl font-bold tracking-tight text-primary-deep">{hero.dashboard.value}</span>
                <span className="text-xs text-ink-muted">{hero.dashboard.label}</span>
              </p>
              <p className="text-xs font-semibold text-gold-ink">{hero.dashboard.scope}</p>
            </div>
            <div
              role="img"
              aria-label={`${hero.dashboard.value} ${hero.dashboard.label}`}
              className="h-2 overflow-hidden rounded-full bg-primary/10"
            >
              <div className="h-full rounded-full bg-primary-deep" style={{ width: `${hero.dashboard.percent}%` }} />
            </div>
            <p className="text-right text-xs text-ink-subtle">
              {hero.dashboard.contactLabel}{" "}
              <a href={`tel:${SITE.contact.phoneHref}`} className={contactLinkClass}>
                {SITE.contact.phone}
              </a>{" "}
              |{" "}
              <a href={`mailto:${SITE.contact.email}`} className={cn(contactLinkClass, "break-all")}>
                {SITE.contact.email}
              </a>
            </p>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
