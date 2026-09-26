import { MessageCircle, Phone } from "lucide-react";
import { Button } from "@@/components/ui/button";
import { SITE, whatsappUrl } from "@@/config/site";
import { homeHero } from "@@/data/home";

export default function HomeHero() {
  return (
    <section aria-labelledby="home-heading" className="brand-wash">
      <div className="container pb-24 pt-16 sm:pb-32 sm:pt-24">
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-3 rounded-full border border-primary/20 bg-surface px-4 py-1.5 text-sm font-medium text-primary shadow-card">
            <span className="status-dot" aria-hidden="true" />
            {homeHero.eyebrow}
          </p>

          <h1 id="home-heading" className="mt-6 text-4xl font-bold sm:text-5xl lg:text-6xl">
            {homeHero.headingLead}{" "}
            <span className="text-primary">{homeHero.headingAccent}</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-ink-muted sm:text-xl">
            {homeHero.intro}
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="hover:bg-primary-deep">
              <a href={`tel:${SITE.contact.phoneHref}`}>
                <Phone aria-hidden="true" />
                Call {SITE.contact.phone}
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
                WhatsApp us
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
