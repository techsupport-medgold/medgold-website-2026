import Link from "next/link";
import { ChevronRight, Mail, Phone, type LucideIcon } from "lucide-react";
import Pill from "@@/components/ui/pill";
import { DevRoutes } from "@@/config/routes";
import { SITE } from "@@/config/site";

const crumbLinkClass = "link-underline inline-flex min-h-11 items-center hover:text-primary sm:min-h-0";
const contactLinkClass =
  "link-underline inline-flex min-h-11 items-center gap-1.5 text-xs font-semibold text-primary-deep hover:text-primary sm:min-h-6";

export type BreadcrumbBadge = { label: string; icon?: LucideIcon; tone?: "teal" | "gold" | "neutral" };
type ContactKey = "phone" | "phoneAlt" | "email";

const CONTACTS: Record<ContactKey, { href: string; label: string; icon: LucideIcon }> = {
  phone: { href: `tel:${SITE.contact.phoneHref}`, label: SITE.contact.phone, icon: Phone },
  phoneAlt: { href: `tel:${SITE.contact.phoneAltHref}`, label: SITE.contact.phoneAlt, icon: Phone },
  email: { href: `mailto:${SITE.contact.email}`, label: SITE.contact.email, icon: Mail },
};

type ServiceBreadcrumbProps = {
  current: string;
  badges?: readonly BreadcrumbBadge[];
  contacts?: readonly ContactKey[];
};

export default function ServiceBreadcrumb({ current, badges, contacts }: ServiceBreadcrumbProps) {
  const hasAside = Boolean(badges?.length || contacts?.length);
  return (
    <div className="border-b border-primary/10 bg-surface-raised">
      <div className="container flex flex-col gap-2 py-2.5 lg:flex-row lg:items-center lg:justify-between">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1 text-xs font-semibold text-ink-muted">
            <li>
              <Link href={DevRoutes.HOME} className={crumbLinkClass}>
                Home
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="size-3.5" />
            </li>
            <li>
              <Link href={DevRoutes.SERVICES} className={crumbLinkClass}>
                Services
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="size-3.5" />
            </li>
            <li aria-current="page" className="text-primary-deep">
              {current}
            </li>
          </ol>
        </nav>

        {hasAside ? (
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
            {badges?.map(({ label, icon: Icon, tone = "teal" }) => (
              <Pill key={label} tone={tone} className="bg-surface shadow-sm">
                {Icon ? <Icon className="size-3" aria-hidden="true" /> : <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />}
                {label}
              </Pill>
            ))}
            {contacts?.map((key) => {
              const { href, label, icon: Icon } = CONTACTS[key];
              return (
                <a key={key} href={href} className={contactLinkClass}>
                  <Icon className="size-3.5 text-gold-ink" aria-hidden="true" />
                  {label}
                </a>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
}
