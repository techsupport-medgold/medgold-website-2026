import { BadgeCheck, Phone } from "lucide-react";
import ServiceBreadcrumb from "@@/components/services/ServiceBreadcrumb";
import { SITE } from "@@/config/site";
import { breadcrumb } from "@@/data/branding";

const phoneLinkClass = "inline-flex min-h-11 items-center hover:text-primary hover:underline sm:min-h-0";

export default function BrandingBreadcrumb() {
  return (
    <ServiceBreadcrumb current={breadcrumb.current}>
      <p className="rounded bg-gold/40 px-1.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-gold-ink">
        {breadcrumb.badge}
      </p>
      <p className="flex items-center gap-1.5 text-xs font-medium text-primary-deep">
        <span className="size-2 rounded-full bg-gold-ink" aria-hidden="true" />
        {breadcrumb.specialist}
      </p>
      <p className="flex items-center gap-1 text-xs font-semibold text-ink-muted">
        <BadgeCheck className="size-3.5 text-primary-deep" aria-hidden="true" />
        {breadcrumb.compliance}
      </p>
      <p className="flex flex-wrap items-center gap-x-1 text-xs font-medium text-primary-deep">
        <Phone className="size-3" aria-hidden="true" />
        Call:
        <a href={`tel:${SITE.contact.phoneHref}`} className={phoneLinkClass}>
          {SITE.contact.phone}
        </a>
        <span aria-hidden="true">|</span>
        <a href={`tel:${SITE.contact.phoneAltHref}`} className={phoneLinkClass}>
          {SITE.contact.phoneAlt}
        </a>
      </p>
    </ServiceBreadcrumb>
  );
}
