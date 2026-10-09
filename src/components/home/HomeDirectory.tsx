import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@@/components/ui/reveal";
import { stagger } from "@@/lib/motion";
import { Eyebrow } from "@@/components/ui/section-header";
import { DevRoutes } from "@@/config/routes";
import { directory } from "@@/data/home";

export default function HomeDirectory() {
  return (
    <section aria-labelledby="directory-heading" className="bg-surface-raised py-14">
      <div className="container">
        <div className="flex flex-col gap-4 border-b border-primary/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Eyebrow>{directory.eyebrow}</Eyebrow>
            <h2 id="directory-heading" className="mt-3 font-display text-xl font-bold text-primary-deep">
              {directory.heading}
            </h2>
          </div>
          <Link
            href={DevRoutes.CONTACT}
            className="hover-lift inline-flex min-h-11 w-fit items-center gap-2 rounded-pill bg-surface px-5 text-sm font-semibold text-primary-deep shadow-card hover:text-primary"
          >
            {directory.contactLabel}
            <ArrowRight className="size-4 text-gold-ink" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-8 lg:grid-cols-4">
          {directory.columns.map((column, index) => (
            <Reveal as="nav" key={column.title} aria-label={column.title} delay={stagger(index)}>
              <h3 className="text-sm font-bold text-primary-deep">{column.title}</h3>
              <ul className="mt-2">
                {column.links.map((link) => (
                  <li key={link.label}>
                    {link.href ? (
                      <Link
                        href={link.href}
                        className="link-underline inline-flex min-h-9 items-center text-sm text-ink-muted transition-colors hover:text-primary"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <span className="inline-flex min-h-9 items-center text-sm text-ink-muted">{link.label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
