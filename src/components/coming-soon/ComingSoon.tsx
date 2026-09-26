import { MessageCircle, Phone } from "lucide-react";
import LaunchCountdown from "@@/components/coming-soon/LaunchCountdown";
import Logo from "@@/components/common/Logo";
import { Button } from "@@/components/ui/button";
import { SITE, whatsappUrl } from "@@/config/site";
import { comingSoonCopy } from "@@/data/comingSoon";

export default function ComingSoon() {
  return (
    <div className="brand-wash flex min-h-screen flex-col">
      <main className="container flex flex-1 flex-col items-center justify-center py-12 text-center sm:py-16">
        <Logo height={88} priority />

        <p className="mt-10 inline-flex items-center gap-3 rounded-full border border-primary/20 bg-surface px-4 py-1.5 text-sm font-medium text-primary shadow-card">
          <span className="status-dot" aria-hidden="true" />
          {comingSoonCopy.eyebrow}
        </p>

        <h1 className="mt-6 max-w-3xl text-4xl font-bold sm:text-5xl lg:text-6xl">
          {comingSoonCopy.headingLead}{" "}
          <span className="text-primary">{comingSoonCopy.headingAccent}</span>
        </h1>

        <p className="mt-5 max-w-xl text-lg text-ink-muted">{comingSoonCopy.intro}</p>

        <div className="mt-10 w-full max-w-xl">
          <LaunchCountdown launchDate={SITE.launchDate} />
        </div>

        <span className="gold-rule mt-12" aria-hidden="true" />

        <section
          aria-labelledby="contact-heading"
          className="mt-8 w-full max-w-md rounded-lg border border-border-muted bg-surface p-6 shadow-card"
        >
          <h2 id="contact-heading" className="text-sm font-semibold uppercase tracking-wider text-ink-muted">
            {comingSoonCopy.contactHeading}
          </h2>
          <p className="mt-3 text-xl font-semibold text-ink">{SITE.contact.person}</p>
          <p className="mt-1 text-lg tabular-nums text-ink-muted">{SITE.contact.phone}</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Button asChild size="lg" className="hover:bg-primary-deep">
              <a href={`tel:${SITE.contact.phoneHref}`}>
                <Phone aria-hidden="true" />
                Call
                <span className="sr-only"> {SITE.contact.person}</span>
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary/40 bg-surface text-primary hover:bg-primary/5 hover:text-primary"
            >
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                <MessageCircle aria-hidden="true" />
                WhatsApp
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </Button>
          </div>
        </section>
      </main>

      <footer className="pb-8 text-center text-sm text-ink-muted">
        &copy; {SITE.launchYear} {SITE.legalName}. All rights reserved.
      </footer>
    </div>
  );
}
