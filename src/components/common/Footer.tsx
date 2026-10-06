import Link from "next/link";
import { MapPin, MessageCircle, Phone, UserRound } from "lucide-react";
import Logo from "@@/components/common/Logo";
import { DEV_NAV, LEGAL_NAV } from "@@/config/routes";
import { SITE, whatsappUrl } from "@@/config/site";

const linkClass =
  "inline-flex min-h-11 items-center gap-2 text-sm text-ink-muted transition-colors hover:text-primary";

export default function Footer() {
  return (
    <footer className="border-t border-border-muted bg-surface-muted">
      <div className="container grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo height={40} />
          <p className="mt-4 max-w-xs text-sm text-ink-muted">{SITE.tagline}</p>
        </div>

        <nav aria-labelledby="footer-links-heading">
          <h2 id="footer-links-heading" className="text-sm font-semibold text-ink">
            Quick links
          </h2>
          <ul className="mt-3">
            {DEV_NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold text-ink">Contact</h2>
          <address className="mt-3 not-italic">
            <p className="inline-flex min-h-11 items-center gap-2 text-sm text-ink-muted">
              <UserRound className="size-4 text-primary" aria-hidden="true" />
              {SITE.contact.person}
            </p>
            <ul>
              <li>
                <a href={`tel:${SITE.contact.phoneHref}`} className={linkClass}>
                  <Phone className="size-4 text-primary" aria-hidden="true" />
                  {SITE.contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  <MessageCircle className="size-4 text-primary" aria-hidden="true" />
                  Chat on WhatsApp
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
              <li>
                <a
                  href={SITE.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex max-w-xs items-start gap-2 py-2.5 text-sm text-ink-muted transition-colors hover:text-primary"
                >
                  <MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                  <span>
                    {SITE.address.full}
                    <span className="sr-only"> (opens Google Maps in a new tab)</span>
                  </span>
                </a>
              </li>
            </ul>
          </address>
        </div>
      </div>

      <div className="border-t border-border-muted">
        <div className="container flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="py-2 text-sm text-ink-muted">
            &copy; {SITE.launchYear} {SITE.legalName}. All rights reserved.
          </p>
          <nav aria-label="Legal">
            <ul className="flex flex-wrap gap-x-6">
              {LEGAL_NAV.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
