import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import Logo from "@@/components/common/Logo";
import { Button } from "@@/components/ui/button";
import { SITE } from "@@/config/site";
import { comingSoonHero } from "@@/data/comingSoon";

export default function ComingSoonHero() {
  return (
    <div className="coming-soon-hero text-white">
      <header className="container flex items-center justify-between py-6">
        <Link href="/" aria-label={`${SITE.name} home`} className="rounded-lg">
          <Logo tone="light" />
        </Link>
        <a
          href={`mailto:${SITE.contact.email}`}
          className="hidden min-h-11 items-center rounded-md px-3 text-sm font-medium text-white/90 underline-offset-4 hover:text-white hover:underline sm:inline-flex"
        >
          {SITE.contact.email}
        </a>
      </header>

      <section
        aria-labelledby="coming-soon-heading"
        className="container pb-24 pt-12 sm:pb-32 sm:pt-20"
      >
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white">
            <span className="status-dot" aria-hidden="true" />
            {comingSoonHero.eyebrow}
          </p>

          <h1
            id="coming-soon-heading"
            className="mt-6 text-4xl font-bold text-white sm:text-5xl lg:text-6xl"
          >
            {comingSoonHero.heading}
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-white/85 sm:text-xl">
            {comingSoonHero.intro}
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="bg-gold text-ink hover:bg-gold/90"
            >
              <a href={`mailto:${SITE.contact.email}`}>
                <Mail aria-hidden="true" />
                Email us
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="ghost"
              className="border border-white/30 text-white hover:bg-white/10 hover:text-white"
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
