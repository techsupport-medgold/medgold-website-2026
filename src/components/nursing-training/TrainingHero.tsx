import {
  ArrowRight,
  Award,
  Briefcase,
  Globe,
  GraduationCap,
  Hospital,
  MapPin,
  UserPlus,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@@/components/ui/button";
import IconBadge from "@@/components/ui/icon-badge";
import Pill from "@@/components/ui/pill";
import ResponsiveImage from "@@/components/ui/responsive-image";
import { SITE, SITE_URL } from "@@/config/site";
import { hero, type TrainingTrustIcon } from "@@/data/nursingTraining";

const TRUST_ICONS: Record<TrainingTrustIcon, LucideIcon> = {
  hospital: Hospital,
  placement: Briefcase,
  faculty: Users,
  certified: Award,
};

export default function TrainingHero() {
  return (
    <section aria-labelledby="training-heading" className="brand-wash">
      <div className="container grid items-center gap-12 pb-20 pt-10 sm:pt-14 lg:grid-cols-12 lg:gap-10 lg:pb-24">
        <div className="min-w-0 lg:col-span-7">
          <p className="inline-flex max-w-full items-start gap-2.5 rounded-2xl border border-primary/10 bg-surface/90 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-primary-deep shadow-card backdrop-blur sm:items-center sm:rounded-full">
            <GraduationCap className="mt-0.5 size-4 shrink-0 text-gold-ink sm:mt-0" aria-hidden="true" />
            {hero.eyebrow}
          </p>
          <h1
            id="training-heading"
            className="mt-6 font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-primary-deep sm:text-5xl lg:text-[3.25rem]"
          >
            {hero.heading.lead}{" "}
            <span className="bg-gradient-to-r from-gold-ink to-primary bg-clip-text text-transparent">
              {hero.heading.accent}
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted">{hero.intro}</p>

          <p className="mt-6 inline-flex max-w-full flex-wrap items-center gap-x-2.5 gap-y-1 rounded-2xl bg-surface px-4 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-border-muted sm:rounded-pill">
            <span className="status-dot shrink-0" aria-hidden="true" />
            <span className="uppercase tracking-wider text-primary-deep">{hero.motto.label}</span>
            <span className="text-gold-ink">{hero.motto.primary}</span>
            <span className="text-ink-subtle" aria-hidden="true">
              |
            </span>
            <span className="text-primary-deep">{hero.motto.secondary}</span>
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Button asChild size="lg" className="h-auto min-h-12 shrink whitespace-normal px-6 py-3 font-semibold">
              <a href="#training-requisition">
                <UserPlus aria-hidden="true" />
                {hero.primaryCta}
                <ArrowRight aria-hidden="true" />
              </a>
            </Button>
          </div>

          <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {hero.trust.map((item, index) => (
              <li
                key={item.title}
                className="hover-lift group flex flex-col gap-2 rounded-xl bg-surface p-3 shadow-card ring-1 ring-black/5 animate-in fade-in-0 slide-in-from-bottom-2 fill-mode-both duration-700"
                style={{ animationDelay: `${150 + index * 80}ms` }}
              >
                <IconBadge icon={TRUST_ICONS[item.icon]} tone="soft" size="sm" />
                <p className="text-sm font-semibold leading-snug text-primary-deep">{item.title}</p>
                <p className="-mt-1.5 text-xs text-ink-muted">{item.detail}</p>
              </li>
            ))}
          </ul>
        </div>

        <figure className="relative isolate min-w-0 lg:col-span-5">
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

          <figcaption className="relative mx-3 -mt-12 grid gap-3 rounded-2xl bg-surface/95 p-4 shadow-card-hover ring-1 ring-black/5 backdrop-blur animate-in fade-in-0 slide-in-from-bottom-4 fill-mode-both delay-300 duration-700 sm:mx-6 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="flex items-center gap-2.5 font-display text-base font-bold leading-snug text-primary-deep sm:text-lg">
                <span className="status-dot shrink-0" aria-hidden="true" />
                {hero.card.title}
              </p>
              <Pill tone="gold">
                <MapPin className="size-3.5" aria-hidden="true" />
                {hero.card.location}
              </Pill>
            </div>
            <p className="text-xs leading-relaxed text-ink-muted">
              <span className="font-semibold text-ink">{hero.card.locationLabel}</span> {SITE.address.full}.{" "}
              {hero.card.description}
            </p>
            <div className="border-t border-border-muted pt-3">
              <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold-ink">
                <Globe className="size-3.5" aria-hidden="true" />
                {new URL(SITE_URL).host}
              </p>
            </div>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
