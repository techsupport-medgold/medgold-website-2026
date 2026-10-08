import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  Briefcase,
  GraduationCap,
  Hospital,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@@/components/ui/button";
import { DevRoutes } from "@@/config/routes";
import { SITE, SITE_URL } from "@@/config/site";
import { hero, type TrustIcon } from "@@/data/staffing";

const TRUST_ICONS: Record<TrustIcon, LucideIcon> = {
  iso: Award,
  training: Hospital,
  placement: Briefcase,
  faculty: Users,
};

const chipClass = "rounded bg-surface-raised px-2 py-0.5 text-xs text-primary-deep";
const phoneLinkClass = "inline-flex min-h-11 items-center hover:text-primary hover:underline sm:min-h-0";

export default function StaffingHero() {
  return (
    <section aria-labelledby="staffing-heading" className="brand-wash">
      <div className="container grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-12 lg:gap-8">
        <div className="min-w-0 lg:col-span-7">
          <p className="inline-flex max-w-full items-start gap-1.5 rounded bg-surface-raised px-2 py-1 text-xs font-semibold uppercase tracking-wide text-primary-deep sm:items-center">
            <BadgeCheck className="mt-0.5 size-3.5 shrink-0 sm:mt-0" aria-hidden="true" />
            {hero.badge}
          </p>
          <h1
            id="staffing-heading"
            className="mt-4 text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl"
          >
            {hero.heading}
          </h1>
          <p className="mt-4 max-w-2xl text-ink-muted">{hero.intro}</p>

          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Contact details">
            <li className={chipClass}>
              <span className="font-bold">{hero.hotlinesLabel}</span>{" "}
              <a href={`tel:${SITE.contact.phoneHref}`} className={phoneLinkClass}>
                {SITE.contact.phone}
              </a>{" "}
              /{" "}
              <a href={`tel:${SITE.contact.phoneAltHref}`} className={phoneLinkClass}>
                {SITE.contact.phoneAlt}
              </a>
            </li>
            <li className={chipClass}>
              <span className="font-bold">{hero.addressLabel}</span> {SITE.address.full}
            </li>
            <li className={chipClass}>
              <span className="font-bold">{hero.webLabel}</span> {new URL(SITE_URL).host}
            </li>
          </ul>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-auto min-h-11 whitespace-normal py-2.5 hover:bg-primary-deep">
              <Link href={DevRoutes.CONTACT}>
                {hero.primaryCta}
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-auto min-h-11 whitespace-normal border-primary/40 bg-surface py-2.5 text-primary hover:bg-primary/5 hover:text-primary"
            >
              <Link href={DevRoutes.NURSING_TRAINING}>
                <GraduationCap aria-hidden="true" />
                {hero.secondaryCta}
              </Link>
            </Button>
          </div>

          <ul className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {hero.trust.map((item) => {
              const Icon = TRUST_ICONS[item.icon];
              return (
                <li
                  key={item.label}
                  className="flex items-center gap-1.5 rounded bg-surface p-2.5 text-xs font-semibold text-ink shadow-sm"
                >
                  <Icon className="size-4 shrink-0 text-primary" aria-hidden="true" />
                  {item.label}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="relative overflow-hidden rounded-2xl bg-surface-raised shadow-xl lg:col-span-5">
          <div className="relative aspect-[4/5] sm:aspect-[16/11] lg:aspect-[49/48]">
            <Image
              src={hero.image.src}
              alt={hero.image.alt}
              fill
              preload
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
          <div
            className="absolute inset-0 bg-gradient-to-t from-primary-deep/80 via-transparent to-transparent"
            aria-hidden="true"
          />
          <div className="absolute inset-x-4 bottom-4 rounded-lg bg-white/95 p-4 shadow-lg backdrop-blur">
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-semibold text-ink-muted">{hero.overlay.label}</span>
              <span className="text-xs font-bold text-primary-deep">{hero.overlay.value}</span>
            </div>
            <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-surface-raised" aria-hidden="true">
              <div className="h-full w-[99.6%] bg-primary" />
            </div>
            <div className="mt-1.5 flex items-center justify-between gap-3 text-xs font-semibold">
              <span className="inline-flex items-center gap-1 text-ink">
                <span className="size-2 rounded-full bg-primary" aria-hidden="true" />
                {hero.overlay.attendance}
              </span>
              <span className="text-gold-ink">{hero.overlay.sla}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
