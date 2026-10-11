import Link from "next/link";
import { ArrowRight, ChevronRight, HeartPulse, Send } from "lucide-react";
import { Button } from "@@/components/ui/button";
import ResponsiveImage from "@@/components/ui/responsive-image";
import { Routes } from "@@/config/routes";
import { hero } from "@@/data/about";

export default function AboutHero() {
  return (
    <section aria-labelledby="about-heading" className="brand-wash">
      <div className="container grid items-center gap-12 pb-20 pt-10 sm:pt-14 lg:grid-cols-12 lg:gap-10 lg:pb-24">
        <div className="min-w-0 lg:col-span-7">
          <p className="inline-flex max-w-full items-start gap-2.5 rounded-2xl border border-primary/10 bg-surface/90 px-4 py-2 text-xs font-semibold tracking-wide text-primary-deep shadow-card backdrop-blur sm:items-center sm:rounded-full">
            <span className="status-dot mt-1 shrink-0 sm:mt-0" aria-hidden="true" />
            {hero.eyebrow}
          </p>
          <h1
            id="about-heading"
            className="mt-6 font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-primary-deep sm:text-5xl lg:text-[3.25rem]"
          >
            {hero.heading}
          </h1>
          {hero.intro.map((paragraph) => (
            <p key={paragraph} className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-muted">
              {paragraph}
            </p>
          ))}

          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Our services">
            {hero.services.map((service, index) => (
              <li
                key={service.label}
                className="animate-in fade-in-0 slide-in-from-bottom-2 fill-mode-both duration-700"
                style={{ animationDelay: `${150 + index * 80}ms` }}
              >
                <Link
                  href={service.href}
                  className="group inline-flex min-h-11 items-center gap-1.5 rounded-pill bg-surface px-4 py-2 text-sm font-semibold text-primary-deep shadow-sm ring-1 ring-inset ring-border-muted transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary hover:text-white hover:shadow-card-hover motion-reduce:hover:translate-y-0"
                >
                  {service.label}
                  <ChevronRight className="size-4 text-gold-ink transition-colors group-hover:text-gold" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button asChild size="lg" className="h-auto min-h-12 shrink whitespace-normal px-6 py-3 font-semibold">
              <Link href={Routes.CONTACT}>
                <Send aria-hidden="true" />
                {hero.primaryCta}
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </div>
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
          <figcaption className="relative mx-3 -mt-10 flex items-center gap-3 rounded-2xl bg-surface/95 p-4 shadow-card-hover ring-1 ring-black/5 backdrop-blur animate-in fade-in-0 slide-in-from-bottom-4 fill-mode-both delay-300 duration-700 sm:mx-6 sm:p-5">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-white" aria-hidden="true">
              <HeartPulse className="size-5" />
            </span>
            <p className="font-display text-base font-bold leading-snug text-primary-deep sm:text-lg">{hero.caption}</p>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
