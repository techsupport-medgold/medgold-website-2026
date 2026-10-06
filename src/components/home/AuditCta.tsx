import Link from "next/link";
import { CircleCheck, ClipboardCheck, FileCheck2, Handshake, MapPin, Phone, Timer, type LucideIcon } from "lucide-react";
import { Button } from "@@/components/ui/button";
import { DevRoutes } from "@@/config/routes";
import { SITE } from "@@/config/site";
import { auditCta, type AuditBenefitIcon } from "@@/data/home";

const BENEFIT_ICONS: Record<AuditBenefitIcon, LucideIcon> = {
  response: Timer,
  scorecard: FileCheck2,
  briefing: Handshake,
};

export default function AuditCta() {
  return (
    <section aria-labelledby="audit-heading" className="bg-surface-muted py-16 sm:py-20">
      <div className="container">
        <div className="grid gap-10 rounded-3xl bg-surface p-8 shadow-lg sm:p-12 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold-ink">
              <span className="h-0.5 w-6 bg-gold-ink" aria-hidden="true" />
              {auditCta.eyebrow}
            </p>
            <h2 id="audit-heading" className="mt-4 text-3xl font-bold tracking-tight text-primary-deep sm:text-4xl">
              {auditCta.heading}
            </h2>
            <p className="mt-4 text-ink-muted">{auditCta.intro}</p>
            <ul className="mt-8 grid gap-4">
              {auditCta.benefits.map((benefit) => {
                const Icon = BENEFIT_ICONS[benefit.icon];
                return (
                  <li key={benefit.text} className="flex items-center gap-3 text-sm font-semibold text-primary-deep">
                    <Icon className="size-5 shrink-0 text-gold-ink" aria-hidden="true" />
                    {benefit.text}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="flex flex-col justify-between gap-6 rounded-2xl bg-surface-raised p-6 sm:p-8 lg:col-span-6">
            <div>
              <h3 className="text-sm font-semibold text-primary-deep">{auditCta.shareHeading}</h3>
              <ul className="mt-3 grid gap-2.5 text-sm text-ink-muted">
                {auditCta.shareFields.map((field) => (
                  <li key={field} className="flex items-start gap-2.5">
                    <CircleCheck className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                    {field}
                  </li>
                ))}
              </ul>
              <Button
                asChild
                size="lg"
                className="mt-6 h-auto min-h-12 w-full whitespace-normal px-5 py-3 text-center text-sm font-semibold hover:bg-primary-deep"
              >
                <Link href={DevRoutes.CONTACT}>
                  <ClipboardCheck aria-hidden="true" />
                  {auditCta.cta}
                </Link>
              </Button>
              <p className="mt-2 text-center text-xs text-ink-subtle">{auditCta.ctaNote}</p>
            </div>

            <div className="rounded-xl bg-surface p-5 shadow-card">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-subtle">{auditCta.deskLabel}</p>
              <a
                href={`tel:${SITE.contact.phoneHref}`}
                className="mt-2 inline-flex min-h-11 items-center gap-2 text-lg font-semibold text-primary-deep hover:text-primary hover:underline"
              >
                <Phone className="size-4" aria-hidden="true" />
                {SITE.contact.phone}
              </a>
              <p className="flex items-start gap-2 text-sm text-ink-muted">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                {SITE.address.full}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
