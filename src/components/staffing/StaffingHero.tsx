import Link from "next/link";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  Briefcase,
  Globe,
  GraduationCap,
  Hospital,
  MapPin,
  Phone,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@@/components/ui/button";
import CountUp from "@@/components/ui/count-up";
import IconBadge from "@@/components/ui/icon-badge";
import ResponsiveImage from "@@/components/ui/responsive-image";
import { DevRoutes } from "@@/config/routes";
import { SITE, SITE_URL } from "@@/config/site";
import { hero, type TrustIcon } from "@@/data/staffing";

const TRUST_ICONS: Record<TrustIcon, LucideIcon> = {
  iso: Award,
  training: Hospital,
  placement: Briefcase,
  faculty: Users,
};

const chipClass =
  "inline-flex max-w-full items-start gap-1.5 rounded-2xl bg-surface px-3 py-1.5 text-xs text-ink-muted shadow-sm ring-1 ring-inset ring-border-muted sm:items-center sm:rounded-pill";
const chipIconClass = "mt-0.5 size-3.5 shrink-0 text-gold-ink sm:mt-0";
const phoneLinkClass =
  "link-underline inline-flex min-h-11 items-center font-semibold text-primary-deep hover:text-primary sm:min-h-6";

export default function StaffingHero() {
  return (
    <section aria-labelledby="staffing-heading" className="brand-wash">
      <div className="container grid items-center gap-12 pb-20 pt-10 sm:pt-14 lg:grid-cols-12 lg:gap-10 lg:pb-24">
        <div className="min-w-0 lg:col-span-7">
          <p className="inline-flex max-w-full items-start gap-2.5 rounded-2xl border border-primary/10 bg-surface/90 px-4 py-2 text-xs font-semibold text-primary-deep shadow-card backdrop-blur sm:items-center sm:rounded-full">
            <BadgeCheck className="mt-0.5 size-4 shrink-0 text-gold-ink sm:mt-0" aria-hidden="true" />
            {hero.badge}
          </p>
          <h1
            id="staffing-heading"
            className="mt-6 font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-primary-deep sm:text-5xl lg:text-[3.25rem]"
          >
            {hero.heading}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted">{hero.intro}</p>

          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Contact details">
            <li className={chipClass}>
              <Phone className={chipIconClass} aria-hidden="true" />
              <span className="flex flex-wrap items-center gap-x-1">
                <span className="font-bold text-ink">{hero.hotlinesLabel}</span>
                <a href={`tel:${SITE.contact.phoneHref}`} className={phoneLinkClass}>
                  {SITE.contact.phone}
                </a>
                <span aria-hidden="true">/</span>
                <a href={`tel:${SITE.contact.phoneAltHref}`} className={phoneLinkClass}>
                  {SITE.contact.phoneAlt}
                </a>
              </span>
            </li>
            <li className={chipClass}>
              <MapPin className={chipIconClass} aria-hidden="true" />
              <span>
                <span className="font-bold text-ink">{hero.addressLabel}</span> {SITE.address.full}
              </span>
            </li>
            <li className={chipClass}>
              <Globe className={chipIconClass} aria-hidden="true" />
              <span>
                <span className="font-bold text-ink">{hero.webLabel}</span> {new URL(SITE_URL).host}
              </span>
            </li>
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button asChild size="lg" className="h-auto min-h-12 shrink whitespace-normal px-6 py-3 font-semibold">
              <Link href={DevRoutes.CONTACT}>
                {hero.primaryCta}
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-auto min-h-12 shrink whitespace-normal border-primary/30 bg-surface/80 px-6 py-3 font-semibold text-primary-deep hover:border-primary hover:bg-surface hover:text-primary"
            >
              <Link href={DevRoutes.NURSING_TRAINING}>
                <GraduationCap aria-hidden="true" />
                {hero.secondaryCta}
              </Link>
            </Button>
          </div>

          <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {hero.trust.map((item, index) => (
              <li
                key={item.label}
                className="hover-lift group flex items-center gap-2.5 rounded-xl bg-surface p-3 text-xs font-semibold text-ink shadow-card ring-1 ring-black/5 animate-in fade-in-0 slide-in-from-bottom-2 fill-mode-both duration-700"
                style={{ animationDelay: `${150 + index * 80}ms` }}
              >
                <IconBadge icon={TRUST_ICONS[item.icon]} tone="soft" size="sm" />
                {item.label}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative isolate lg:col-span-5">
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

          <div className="relative mx-3 -mt-12 rounded-2xl bg-surface/95 p-4 shadow-card-hover ring-1 ring-black/5 backdrop-blur animate-in fade-in-0 slide-in-from-bottom-4 fill-mode-both delay-300 duration-700 sm:mx-6 sm:p-5">
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-semibold text-ink-muted">{hero.overlay.label}</span>
              <span className="font-display text-base font-extrabold text-primary-deep sm:text-lg">
                <CountUp value={hero.overlay.value} />
              </span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-surface-muted" aria-hidden="true">
              <div className="h-full w-[99.6%] rounded-full bg-gradient-to-r from-primary to-teal-300 animate-in slide-in-from-left-full fill-mode-both delay-500 duration-1000" />
            </div>
            <div className="mt-2 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-xs font-semibold">
              <span className="inline-flex items-center gap-1.5 text-ink">
                <span className="status-dot" aria-hidden="true" />
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
