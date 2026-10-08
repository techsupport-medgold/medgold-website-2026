import Link from "next/link";
import { CalendarCheck, Cog, Lock, Mail, Phone, Smile, Sprout, TrendingUp, type LucideIcon } from "lucide-react";
import { Button } from "@@/components/ui/button";
import { DevRoutes } from "@@/config/routes";
import { SITE } from "@@/config/site";
import { booking, type BookingBenefitIcon } from "@@/data/pharmacyAudit";

const BENEFIT_ICONS: Record<BookingBenefitIcon, LucideIcon> = {
  profit: TrendingUp,
  systems: Cog,
  customers: Smile,
  growth: Sprout,
};

const chipClass =
  "inline-flex min-h-11 items-center gap-2 rounded-lg bg-surface px-4 py-2 text-sm font-semibold text-primary-deep shadow-sm transition-colors hover:text-primary hover:underline";

export default function BookingCta() {
  return (
    <section aria-labelledby="booking-heading" className="bg-surface py-16 sm:py-20">
      <div className="container">
        <div className="grid gap-10 rounded-3xl bg-surface-raised p-8 shadow-lg sm:p-12 lg:grid-cols-12 lg:gap-12">
          <div className="min-w-0 lg:col-span-7">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold-ink">
              <span className="h-0.5 w-6 bg-gold-ink" aria-hidden="true" />
              {booking.eyebrow}
            </p>
            <h2 id="booking-heading" className="mt-4 text-3xl font-bold tracking-tight text-primary-deep sm:text-4xl">
              {booking.heading}
            </h2>
            <p className="mt-4 text-ink-muted">{booking.intro}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={`tel:${SITE.contact.phoneHref}`} className={chipClass}>
                <Phone className="size-4 text-gold-ink" aria-hidden="true" />
                {SITE.contact.phone}
              </a>
              <a href={`mailto:${SITE.contact.email}`} className={`${chipClass} break-all`}>
                <Mail className="size-4 shrink-0 text-gold-ink" aria-hidden="true" />
                {SITE.contact.email}
              </a>
            </div>
          </div>

          <div className="flex min-w-0 flex-col justify-between gap-6 rounded-2xl bg-surface p-6 shadow-card sm:p-8 lg:col-span-5">
            <ul className="grid grid-cols-2 gap-4">
              {booking.benefits.map((benefit) => {
                const Icon = BENEFIT_ICONS[benefit.icon];
                return (
                  <li key={benefit.title} className="flex items-start gap-2.5">
                    <Icon className="mt-0.5 size-5 shrink-0 text-gold-ink" aria-hidden="true" />
                    <span>
                      <span className="block text-sm font-bold text-primary-deep">{benefit.title}</span>
                      <span className="block text-xs text-ink-muted">{benefit.text}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
            <div>
              <p className="flex items-start gap-2 text-xs text-ink-muted">
                <Lock className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden="true" />
                {booking.confidentiality}
              </p>
              <Button
                asChild
                size="lg"
                className="mt-4 h-auto min-h-12 w-full whitespace-normal px-5 py-3 text-center text-sm font-semibold hover:bg-primary-deep"
              >
                <Link href={DevRoutes.CONTACT}>
                  <CalendarCheck aria-hidden="true" />
                  {booking.cta}
                </Link>
              </Button>
              <p className="mt-2 text-center text-xs text-ink-subtle">{booking.ctaNote}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
