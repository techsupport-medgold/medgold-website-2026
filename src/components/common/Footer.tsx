import Link from "next/link";
import { ArrowRight, Mail, MapPin, MessageCircle, Phone, UserRound } from "lucide-react";
import Logo from "@@/components/common/Logo";
import { Button } from "@@/components/ui/button";
import { MAIN_NAV, Routes, LEGAL_NAV, SERVICE_NAV } from "@@/config/routes";
import { SITE, whatsappUrl } from "@@/config/site";

const linkClass =
  "inline-flex min-h-11 items-center gap-2 text-sm text-ink-muted transition-colors hover:text-primary";
const headingClass = "text-xs font-bold uppercase tracking-[0.14em] text-primary-deep";

const QUICK_LINKS = MAIN_NAV.filter((item) => !item.children);

export default function Footer() {
  return (
    <footer className="bg-surface-muted">
      <div className="brand-dark">
        <div className="container flex flex-col gap-6 py-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="font-display text-2xl font-bold text-white sm:text-3xl">Ready to strengthen your hospital operations?</p>
            <p className="mt-2 text-white/80">
              Tell us what is slowing your facility down and a Med Gold specialist will get back to you.
            </p>
          </div>
          <Button asChild size="lg" variant="accent" className="h-12 w-fit px-6 font-semibold">
            <Link href={Routes.CONTACT}>
              Talk to our team
              <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="container grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_1.2fr]">
        <div>
          <Logo height={40} />
          <p className="mt-4 max-w-xs text-sm text-ink-muted">{SITE.tagline}</p>
        </div>

        <nav aria-labelledby="footer-links-heading">
          <h2 id="footer-links-heading" className={headingClass}>
            Company
          </h2>
          <ul className="mt-3">
            {QUICK_LINKS.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="footer-services-heading">
          <h2 id="footer-services-heading" className={headingClass}>
            Services
          </h2>
          <ul className="mt-3">
            {SERVICE_NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className={headingClass}>Contact</h2>
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
                <a href={`mailto:${SITE.contact.email}`} className={linkClass}>
                  <Mail className="size-4 text-primary" aria-hidden="true" />
                  {SITE.contact.email}
                </a>
              </li>
              <li>
                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className={linkClass}>
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
        <div className="container grid gap-1 py-3 sm:grid-cols-3 sm:items-center">
          <p className="py-2 text-sm text-ink-muted sm:justify-self-start">
            &copy; {SITE.launchYear} {SITE.legalName}. All rights reserved.
          </p>
          <nav aria-label="Legal" className="sm:justify-self-center">
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
          <p className="text-sm text-ink-muted sm:justify-self-end">
            Technology partner{" "}
            <a
              href="https://lasmind.com/"
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="inline-flex min-h-6 min-w-6 items-center font-semibold text-primary-deep underline decoration-1 underline-offset-4 transition-colors hover:text-primary"
            >
              LasMind
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
