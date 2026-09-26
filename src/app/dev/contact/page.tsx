import type { Metadata } from "next";
import { MessageCircle, Phone, UserRound } from "lucide-react";
import EnquiryForm from "@@/components/contact/EnquiryForm";
import { SITE, whatsappUrl } from "@@/config/site";
import { CONTACT_SEO, contactHero } from "@@/data/contact";

export const metadata: Metadata = {
  title: CONTACT_SEO.title,
  description: CONTACT_SEO.description,
};

const cardClass =
  "group flex items-start gap-4 rounded-lg border border-border-muted bg-surface-muted p-5 transition-colors hover:border-primary/40";

export default function ContactPage() {
  return (
    <>
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
            </address>
          </aside>
        </div>
      </section>
    </>
  );
}
