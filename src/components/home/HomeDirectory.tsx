import Link from "next/link";
import { Phone } from "lucide-react";
import { SITE } from "@@/config/site";
import { directory } from "@@/data/home";

export default function HomeDirectory() {
  return (
    <section aria-labelledby="directory-heading" className="bg-surface-raised py-12">
      <div className="container">
        <div className="flex flex-col gap-4 border-b border-primary/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-gold-ink">{directory.eyebrow}</p>
            <h2 id="directory-heading" className="mt-2 text-lg font-semibold text-primary-deep">
              {directory.heading}
            </h2>
          </div>
          <a
            href={`tel:${SITE.contact.phoneHref}`}
            className="inline-flex min-h-11 w-fit items-center gap-2 rounded-md bg-surface px-4 text-sm font-semibold text-primary-deep shadow-sm transition-colors hover:text-primary"
          >
            <Phone className="size-4 text-gold-ink" aria-hidden="true" />
            {directory.hotlineLabel}
            <span className="sr-only">: {SITE.contact.phone}</span>
          </a>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-8 lg:grid-cols-4">
          {directory.columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h3 className="text-sm font-bold text-primary-deep">{column.title}</h3>
              <ul className="mt-2">
                {column.links.map((link) => (
                  <li key={link.label}>
                    {link.href ? (
                      <Link
                        href={link.href}
                        className="inline-flex min-h-9 items-center text-sm text-ink-muted transition-colors hover:text-primary hover:underline"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <span className="inline-flex min-h-9 items-center text-sm text-ink-subtle">{link.label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>
    </section>
  );
}
