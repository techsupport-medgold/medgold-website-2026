import Link from "next/link";
import Reveal from "@@/components/ui/reveal";
import { stagger } from "@@/lib/motion";
import { directory } from "@@/data/home";

export default function HomeDirectory() {
  return (
    <section aria-label="Site directory" className="bg-surface-raised py-14">
      <div className="container">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
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
