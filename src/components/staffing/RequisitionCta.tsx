import Link from "next/link";
import { CircleCheck, Lock, MapPin, Phone, Send } from "lucide-react";
import { Button } from "@@/components/ui/button";
import { DevRoutes } from "@@/config/routes";
import { SITE } from "@@/config/site";
import { requisition } from "@@/data/staffing";

const phoneLinkClass =
  "inline-flex min-h-11 items-center gap-1.5 font-bold text-primary-deep hover:text-primary hover:underline sm:min-h-0";

export default function RequisitionCta() {
  return (
    <section aria-labelledby="requisition-heading" className="bg-surface-raised pb-16 sm:pb-20">
      <div className="container max-w-4xl">
        <div className="rounded-2xl bg-surface p-6 shadow-xl sm:p-12">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary-deep">{requisition.eyebrow}</p>
          <h2 id="requisition-heading" className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {requisition.heading}
          </h2>
          <p className="mt-4 text-sm text-ink-muted">{requisition.intro}</p>
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
            <a href={`tel:${SITE.contact.phoneHref}`} className={phoneLinkClass}>
              <Phone className="size-4 text-gold-ink" aria-hidden="true" />
              {SITE.contact.phone}
            </a>
            <a href={`tel:${SITE.contact.phoneAltHref}`} className={phoneLinkClass}>
              <Phone className="size-4 text-gold-ink" aria-hidden="true" />
              {SITE.contact.phoneAlt}
            </a>
          </div>
          <p className="mt-2 flex items-start gap-1.5 text-sm text-ink-muted">
            <MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
            {SITE.address.full}
          </p>

          <div className="mt-8 rounded-xl bg-surface-raised p-5 sm:p-6">
            <h3 className="text-sm font-semibold text-primary-deep">{requisition.shareHeading}</h3>
            <ul className="mt-3 grid gap-2.5 text-sm text-ink-muted sm:grid-cols-2">
              {requisition.shareFields.map((field) => (
                <li key={field} className="flex items-start gap-2">
                  <CircleCheck className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                  {field}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-subtle">
              <Lock className="size-3.5 shrink-0" aria-hidden="true" />
              {requisition.nda}
            </p>
            <div className="sm:text-right">
              <Button
                asChild
                size="lg"
                className="h-auto min-h-12 w-full whitespace-normal px-8 py-3 text-sm font-semibold hover:bg-primary-deep sm:w-auto"
              >
                <Link href={DevRoutes.CONTACT}>
                  {requisition.cta}
                  <Send aria-hidden="true" />
                </Link>
              </Button>
              <p className="mt-2 text-center text-xs text-ink-subtle sm:text-right">{requisition.ctaNote}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
