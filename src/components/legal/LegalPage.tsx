import { Info } from "lucide-react";
import Breadcrumb from "@@/components/common/Breadcrumb";
import type { LegalListItem, LegalSection } from "@@/data/legal";

type LegalPageProps = {
  title: string;
  path: string;
  lastUpdated: string;
  note?: string;
  sections: LegalSection[];
};

function LegalList({ items }: { items: LegalListItem[] }) {
  return (
    <ul className="mt-4 list-disc space-y-2 pl-6 leading-relaxed text-ink-muted marker:text-primary">
      {items.map((item) =>
        typeof item === "string" ? (
          <li key={item}>{item}</li>
        ) : (
          <li key={item.term}>
            <strong className="font-semibold text-ink">{item.term}:</strong> {item.text}
          </li>
        ),
      )}
    </ul>
  );
}

function Paragraphs({ items }: { items: string[] }) {
  return items.map((paragraph) => (
    <p key={paragraph} className="mt-4 leading-relaxed text-ink-muted">
      {paragraph}
    </p>
  ));
}

export default function LegalPage({ title, path, lastUpdated, note, sections }: LegalPageProps) {
  return (
    <>
      <Breadcrumb current={title} path={path} />
      <article aria-labelledby="legal-heading">
        <header className="brand-wash">
          <div className="container pb-12 pt-16 sm:pb-16 sm:pt-20">
            <span className="gold-rule" aria-hidden="true" />
            <h1 id="legal-heading" className="mt-4 text-4xl font-bold sm:text-5xl">
              {title}
            </h1>
            <p className="mt-4 text-ink-muted">Last updated: {lastUpdated}</p>
          </div>
        </header>

        <div className="container grid gap-10 py-12 sm:py-16 lg:grid-cols-[16rem_1fr] lg:gap-16">
          <nav aria-labelledby="legal-toc-heading" className="hidden lg:block">
            <div className="sticky top-32">
              <h2 id="legal-toc-heading" className="text-sm font-semibold text-ink">
                On this page
              </h2>
              <ol className="mt-3 border-l border-border-muted">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="-ml-px block border-l-2 border-transparent py-1.5 pl-4 text-sm text-ink-muted transition-colors hover:border-primary hover:text-primary"
                    >
                      {section.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          <div className="max-w-3xl">
            {note && (
              <p
                role="note"
                className="mb-10 flex items-start gap-3 rounded-lg border border-gold/50 bg-gold/10 p-4 text-sm text-ink"
              >
                <Info className="mt-0.5 size-4 shrink-0 text-gold-ink" aria-hidden="true" />
                {note}
              </p>
            )}

            {sections.map((section, index) => (
              <section
                key={section.id}
                id={section.id}
                aria-labelledby={`${section.id}-heading`}
                className={index === 0 ? "scroll-mt-32" : "mt-10 scroll-mt-32"}
              >
                <h2 id={`${section.id}-heading`} className="text-2xl font-bold">
                  {section.heading}
                </h2>
                <Paragraphs items={section.paragraphs} />
                {section.list && <LegalList items={section.list} />}
                {section.subsections?.map((subsection) => (
                  <div key={subsection.heading} className="mt-6">
                    <h3 className="text-lg font-semibold text-ink">{subsection.heading}</h3>
                    <LegalList items={subsection.list} />
                  </div>
                ))}
                {section.closing && <Paragraphs items={section.closing} />}
              </section>
            ))}
          </div>
        </div>
      </article>
    </>
  );
}
