import { MessageCircle, Phone, UserRound } from "lucide-react";
import { SITE, whatsappUrl } from "@@/config/site";

const cardClass =
  "group flex flex-col gap-3 rounded-lg border border-border-muted bg-surface-muted p-6 transition-colors hover:border-primary/40";

export default function ContactSection() {
  return (
    <section
      aria-labelledby="contact-heading"
      className="border-t border-border-muted bg-surface py-20 sm:py-24"
    >
      <div className="container grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-start">
        <div>
          <span className="gold-rule" aria-hidden="true" />
          <h2 id="contact-heading" className="mt-4 text-3xl font-bold sm:text-4xl">
            Get in touch
          </h2>
          <p className="mt-4 text-lg text-ink-muted">
            Have a question or want to know when we open? We would love to hear from you.
          </p>
        </div>

        <address className="grid gap-4 not-italic sm:grid-cols-2">
          <div className={`${cardClass} sm:col-span-2 hover:border-border-muted`}>
            <UserRound className="size-6 text-primary" aria-hidden="true" />
            <span className="text-sm font-medium text-ink-muted">Contact person</span>
            <span className="font-semibold text-ink">{SITE.contact.person}</span>
          </div>
          <a href={`tel:${SITE.contact.phoneHref}`} className={cardClass}>
            <Phone className="size-6 text-primary" aria-hidden="true" />
            <span className="text-sm font-medium text-ink-muted">Call</span>
            <span className="font-semibold text-link group-hover:underline">
              {SITE.contact.phone}
            </span>
          </a>
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className={cardClass}
          >
            <MessageCircle className="size-6 text-primary" aria-hidden="true" />
            <span className="text-sm font-medium text-ink-muted">WhatsApp</span>
            <span className="font-semibold text-link group-hover:underline">
              Chat on WhatsApp
              <span className="sr-only"> (opens in a new tab)</span>
            </span>
          </a>
        </address>
      </div>
    </section>
  );
}
