import Image from "next/image";
import {
  Award,
  Briefcase,
  GraduationCap,
  Hospital,
  Phone,
  UserPlus,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@@/components/ui/button";
import { SITE, SITE_URL } from "@@/config/site";
import { hero, type TrainingTrustIcon } from "@@/data/nursingTraining";

const TRUST_ICONS: Record<TrainingTrustIcon, LucideIcon> = {
  hospital: Hospital,
  placement: Briefcase,
  faculty: Users,
  certified: Award,
};

const phoneLinkClass = "inline-flex min-h-11 items-center hover:underline sm:min-h-0";

export default function TrainingHero() {
  return (
    <section aria-labelledby="training-heading" className="brand-wash">
      <div className="container grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-2 lg:gap-8">
        <div className="min-w-0">
          <p className="flex items-start gap-1.5 text-xs font-semibold uppercase tracking-wide text-gold-ink sm:items-center">
            <GraduationCap className="size-4 shrink-0" aria-hidden="true" />
            {hero.eyebrow}
          </p>
          <h1
            id="training-heading"
            className="mt-4 text-4xl font-bold leading-tight tracking-tight text-primary-deep sm:text-5xl"
          >
            {hero.heading.lead} <span className="text-gold-ink">{hero.heading.accent}</span>
          </h1>
          <p className="mt-4 max-w-xl text-ink-muted">{hero.intro}</p>

          <p className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 rounded border border-primary/10 bg-surface-raised px-3 py-1.5 text-sm font-semibold">
            <span className="uppercase tracking-wider text-primary-deep">{hero.motto.label}</span>
            <span className="text-gold-ink">{hero.motto.primary}</span>
            <span className="text-ink-subtle" aria-hidden="true">
              |
            </span>
            <span className="text-primary-deep">{hero.motto.secondary}</span>
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button asChild size="lg" className="h-auto min-h-11 whitespace-normal py-2.5 hover:bg-primary-deep">
              <a href="#training-requisition">
                <UserPlus aria-hidden="true" />
                {hero.primaryCta}
              </a>
            </Button>
            <p className="inline-flex min-h-11 flex-wrap items-center justify-center gap-x-1.5 rounded-md border sm:whitespace-nowrap border-primary/40 bg-surface px-6 py-2 text-sm font-semibold text-primary-deep shadow-sm">
              <Phone className="size-4" aria-hidden="true" />
              <a href={`tel:${SITE.contact.phoneHref}`} className={phoneLinkClass}>
                {SITE.contact.phone}
              </a>
              <span aria-hidden="true">/</span>
              <a href={`tel:${SITE.contact.phoneAltHref}`} className={phoneLinkClass}>
                {SITE.contact.phoneAlt}
              </a>
            </p>
          </div>

          <ul className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {hero.trust.map((item) => {
              const Icon = TRUST_ICONS[item.icon];
              return (
                <li key={item.title} className="rounded-lg bg-surface p-3 shadow-sm">
                  <Icon className="size-4 text-gold-ink" aria-hidden="true" />
                  <p className="mt-1.5 text-sm font-semibold leading-snug text-primary-deep">{item.title}</p>
                  <p className="mt-0.5 text-xs text-ink-muted">{item.detail}</p>
                </li>
              );
            })}
          </ul>
        </div>

        <figure className="min-w-0 overflow-hidden rounded-lg bg-surface shadow-xl">
          <div className="relative aspect-[16/10] sm:h-[400px] sm:aspect-auto">
            <Image
              src={hero.image.src}
              alt={hero.image.alt}
              fill
              preload
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <figcaption className="grid gap-2 p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="flex items-center gap-2 text-lg font-bold text-primary-deep">
                <span className="size-2.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                {hero.card.title}
              </p>
              <span className="rounded bg-surface-raised px-2 py-0.5 text-xs font-semibold text-primary-deep">
                {hero.card.location}
              </span>
            </div>
            <p className="text-xs text-ink-muted">
              {hero.card.locationLabel} {SITE.address.full}. {hero.card.description}
            </p>
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border-muted pt-2 text-sm font-semibold">
              <p className="text-primary-deep">
                {hero.card.hotlinesLabel}{" "}
                <a href={`tel:${SITE.contact.phoneHref}`} className={phoneLinkClass}>
                  {SITE.contact.phone}
                </a>{" "}
                |{" "}
                <a href={`tel:${SITE.contact.phoneAltHref}`} className={phoneLinkClass}>
                  {SITE.contact.phoneAlt}
                </a>
              </p>
              <p className="text-gold-ink">{new URL(SITE_URL).host}</p>
            </div>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
