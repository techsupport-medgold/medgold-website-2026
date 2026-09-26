import { Mail, MapPin, Phone } from "lucide-react";
import { SITE } from "@@/config/site";

const { address } = SITE.contact;

export default function ContactSection() {
  return (
    <section
      aria-labelledby="contact-heading"
      className="border-t border-border-muted bg-surface py-20 sm:py-24"
    >
      <div className="container grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-start">
        <div>
          <span className="gold-rule" aria-hidden="true" />
          <h2
            id="contact-heading"
            className="mt-4 text-3xl font-bold sm:text-4xl"
          >
            Get in touch
          </h2>
          <p className="mt-4 text-lg text-ink-muted">
            Have a question or want to know when we open? We would love to
            hear from you.
          </p>
        </div>

        <address className="grid gap-4 not-italic sm:grid-cols-2">
          <a
            href={`mailto:${SITE.contact.email}`}
            className="group flex flex-col gap-3 rounded-lg border border-border-muted bg-surface-muted p-6 transition-colors hover:border-primary/40 sm:col-span-2"
          >
            <Mail className="size-6 text-primary" aria-hidden="true" />
            <span className="text-sm font-medium text-ink-muted">Email</span>
            <span className="font-semibold text-link [overflow-wrap:anywhere] group-hover:underline">
              {SITE.contact.email}
            </span>
          </a>
          <a
            href={`tel:${SITE.contact.phoneHref}`}
            className="group flex flex-col gap-3 rounded-lg border border-border-muted bg-surface-muted p-6 transition-colors hover:border-primary/40"
          >
            <Phone className="size-6 text-primary" aria-hidden="true" />
            <span className="text-sm font-medium text-ink-muted">Phone</span>
            <span className="font-semibold text-link group-hover:underline">
              {SITE.contact.phone}
            </span>
          </a>
          <div className="flex flex-col gap-3 rounded-lg border border-border-muted bg-surface-muted p-6">
            <MapPin className="size-6 text-primary" aria-hidden="true" />
            <span className="text-sm font-medium text-ink-muted">Location</span>
            <span className="font-semibold text-ink">
              {address.addressLocality}, {address.addressRegion}
            </span>
          </div>
        </address>
      </div>
    </section>
  );
}
