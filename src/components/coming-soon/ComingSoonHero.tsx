import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import Logo from "@@/components/common/Logo";
import { Button } from "@@/components/ui/button";
import { SITE } from "@@/config/site";
import { comingSoonHero } from "@@/data/comingSoon";

export default function ComingSoonHero() {
  return (
    <div className="coming-soon-hero">
      <header className="border-b border-border-muted bg-surface/80 backdrop-blur">
        <div className="container flex items-center justify-between py-4">
          <Link href="/" aria-label={`${SITE.name} home`} className="rounded-md">
            <Logo priority />
          </Link>
          <a
            href={`mailto:${SITE.contact.email}`}
            className="hidden min-h-11 items-center rounded-md px-3 text-sm font-medium text-link underline-offset-4 hover:underline sm:inline-flex"
          >
            {SITE.contact.email}
          </a>
        </div>
      </header>

      <section
        aria-labelledby="coming-soon-heading"
        className="container pb-24 pt-16 sm:pb-32 sm:pt-24"
      >
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-3 rounded-full border border-primary/20 bg-surface px-4 py-1.5 text-sm font-medium text-primary shadow-card">
            <span className="status-dot" aria-hidden="true" />
            {comingSoonHero.eyebrow}
          </p>

          <h1
            id="coming-soon-heading"
            className="mt-6 text-4xl font-bold sm:text-5xl lg:text-6xl"
          >
            {comingSoonHero.headingLead}{" "}
            <span className="text-primary">{comingSoonHero.headingAccent}</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-ink-muted sm:text-xl">
            {comingSoonHero.intro}
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="hover:bg-primary-deep">
              <a href={`mailto:${SITE.contact.email}`}>
                <Mail aria-hidden="true" />
                Email us
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary/40 bg-surface text-primary hover:bg-primary/5 hover:text-primary"
            >
              <a href={`tel:${SITE.contact.phoneHref}`}>
                <Phone aria-hidden="true" />
                Call {SITE.contact.phone}
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
