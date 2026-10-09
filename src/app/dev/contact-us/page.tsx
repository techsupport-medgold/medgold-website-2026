import type { Metadata } from "next";
import { ExternalLink, MapPin, MessageCircle, Navigation, Phone, UserRound } from "lucide-react";
import Breadcrumb from "@@/components/common/Breadcrumb";
import EnquiryForm from "@@/components/contact/EnquiryForm";
import { Button } from "@@/components/ui/button";
import { DevRoutes } from "@@/config/routes";
import { SITE, directionsUrl, mapEmbedUrl, whatsappUrl } from "@@/config/site";
import { CONTACT_SEO, contactHero, findUs } from "@@/data/contact";

export const metadata: Metadata = {
  title: CONTACT_SEO.title,
  description: CONTACT_SEO.description,
};

const cardClass =
  "group flex items-start gap-4 rounded-lg border border-border-muted bg-surface-muted p-5 transition-colors hover:border-primary/40";

export default function ContactPage() {
  return (
    <>
      <Breadcrumb current="Contact Us" path={DevRoutes.CONTACT} />
      <section aria-labelledby="contact-page-heading" className="brand-wash">
        <div className="container pb-12 pt-16 sm:pb-16 sm:pt-20">
          <div className="max-w-2xl">
            <span className="gold-rule" aria-hidden="true" />
            <h1 id="contact-page-heading" className="mt-4 text-4xl font-bold sm:text-5xl">
              {contactHero.heading}
            </h1>
            <p className="mt-6 text-lg text-ink-muted">{contactHero.intro}</p>
          </div>
        </div>
      </section>

      <section aria-label="Enquiry form and contact details" className="py-12 sm:py-16">
        <div className="container grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:items-start">
          <EnquiryForm />

          <aside aria-labelledby="contact-details-heading" className="lg:sticky lg:top-32">
            <h2 id="contact-details-heading" className="text-xl font-bold">
              Prefer to talk?
            </h2>
            <p className="mt-2 text-ink-muted">Reach our team directly.</p>
            <address className="mt-6 grid gap-4 not-italic">
              <div className={`${cardClass} hover:border-border-muted`}>
                <UserRound className="size-6 shrink-0 text-primary" aria-hidden="true" />
                <span>
                  <span className="block text-sm font-medium text-ink-muted">Contact person</span>
                  <span className="block font-semibold text-ink">{SITE.contact.person}</span>
                </span>
              </div>
              <a href={`tel:${SITE.contact.phoneHref}`} className={cardClass}>
                <Phone className="size-6 shrink-0 text-primary" aria-hidden="true" />
                <span>
                  <span className="block text-sm font-medium text-ink-muted">Call</span>
                  <span className="block font-semibold text-link group-hover:underline">
                    {SITE.contact.phone}
                  </span>
                </span>
              </a>
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className={cardClass}>
                <MessageCircle className="size-6 shrink-0 text-primary" aria-hidden="true" />
                <span>
                  <span className="block text-sm font-medium text-ink-muted">WhatsApp</span>
                  <span className="block font-semibold text-link group-hover:underline">
                    Chat on WhatsApp
                    <span className="sr-only"> (opens in a new tab)</span>
                  </span>
                </span>
              </a>
              <a href={SITE.mapUrl} target="_blank" rel="noopener noreferrer" className={cardClass}>
                <MapPin className="size-6 shrink-0 text-primary" aria-hidden="true" />
                <span>
                  <span className="block text-sm font-medium text-ink-muted">Address</span>
                  <span className="block font-semibold text-ink">
                    {SITE.address.street}, {SITE.address.locality}
                  </span>
                  <span className="block text-sm text-ink-muted">
                    {SITE.address.city}, {SITE.address.region} {SITE.address.postalCode}
                  </span>
                  <span className="mt-1 block text-sm font-medium text-link group-hover:underline">
                    View on Google Maps
                    <span className="sr-only"> (opens in a new tab)</span>
                  </span>
                </span>
              </a>
            </address>
          </aside>
        </div>
      </section>

      <section
        aria-labelledby="find-us-heading"
        className="border-t border-border-muted bg-surface-muted py-12 sm:py-16"
      >
        <div className="container">
          <span className="gold-rule" aria-hidden="true" />
          <h2 id="find-us-heading" className="mt-4 text-3xl font-bold">
            {findUs.heading}
          </h2>
          <p className="mt-3 max-w-2xl text-ink-muted">{findUs.intro}</p>
          <p className="mt-2 font-medium text-ink">{SITE.address.full}</p>

          <div className="mt-8 overflow-hidden rounded-lg border border-border-muted bg-surface shadow-card">
            <iframe
              src={mapEmbedUrl()}
              title={findUs.mapTitle}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="block h-[360px] w-full border-0 sm:h-[420px]"
            />
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="hover:bg-primary-deep">
              <a href={directionsUrl()} target="_blank" rel="noopener noreferrer">
                <Navigation aria-hidden="true" />
                Get directions
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary/40 bg-surface text-primary hover:bg-primary/5 hover:text-primary"
            >
              <a href={SITE.mapUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink aria-hidden="true" />
                Open in Google Maps
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
