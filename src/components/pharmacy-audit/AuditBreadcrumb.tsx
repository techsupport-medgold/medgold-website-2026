import Link from "next/link";
import { ChevronRight, Mail, Phone } from "lucide-react";
import { DevRoutes } from "@@/config/routes";
import { SITE } from "@@/config/site";
import { breadcrumb } from "@@/data/pharmacyAudit";

const contactLinkClass =
  "inline-flex min-h-11 items-center gap-1.5 text-xs font-semibold text-primary-deep transition-colors hover:text-primary hover:underline sm:min-h-0";

export default function AuditBreadcrumb() {
  return (
    <div className="border-b border-primary/10 bg-surface-raised">
      <div className="container flex flex-col gap-2 py-2.5 lg:flex-row lg:items-center lg:justify-between">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1 text-xs font-semibold text-ink-muted">
            <li>
              <Link href={DevRoutes.HOME} className="inline-flex min-h-11 items-center hover:text-primary hover:underline sm:min-h-0">
                Home
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="size-3.5" />
            </li>
            <li>
              <Link href={DevRoutes.SERVICES} className="inline-flex min-h-11 items-center hover:text-primary hover:underline sm:min-h-0">
                Services
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="size-3.5" />
            </li>
            <li aria-current="page" className="text-primary-deep">
              {breadcrumb.current}
            </li>
          </ol>
        </nav>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
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
        </div>
      </div>
    </div>
  );
}
