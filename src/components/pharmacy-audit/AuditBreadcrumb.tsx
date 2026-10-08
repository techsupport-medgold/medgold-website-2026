import { Mail, Phone } from "lucide-react";
import ServiceBreadcrumb from "@@/components/services/ServiceBreadcrumb";
import { SITE } from "@@/config/site";
import { breadcrumb } from "@@/data/pharmacyAudit";

const contactLinkClass =
  "inline-flex min-h-11 items-center gap-1.5 text-xs font-semibold text-primary-deep transition-colors hover:text-primary hover:underline sm:min-h-0";

export default function AuditBreadcrumb() {
  return (
    <ServiceBreadcrumb current={breadcrumb.current}>
      <p className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-deep">
        <span className="size-2 rounded-full bg-primary-deep" aria-hidden="true" />
        {breadcrumb.tagline}
      </p>
      <a href={`tel:${SITE.contact.phoneHref}`} className={contactLinkClass}>
        <Phone className="size-3.5 text-gold-ink" aria-hidden="true" />
        {SITE.contact.phone}
      </a>
      <a href={`mailto:${SITE.contact.email}`} className={contactLinkClass}>
        <Mail className="size-3.5 text-gold-ink" aria-hidden="true" />
        {SITE.contact.email}
      </a>
    </ServiceBreadcrumb>
  );
}
