import { Info } from "lucide-react";
import Breadcrumb from "@@/components/common/Breadcrumb";
import { LEGAL_LAST_UPDATED, LEGAL_PLACEHOLDER_NOTE, type LegalSection } from "@@/data/legal";

type LegalPageProps = {
  title: string;
  path: string;
  sections: LegalSection[];
};

export default function LegalPage({ title, path, sections }: LegalPageProps) {
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
            <p className="mt-4 text-ink-muted">Last updated: {LEGAL_LAST_UPDATED}</p>
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
            <p
              role="note"
              className="flex items-start gap-3 rounded-lg border border-gold/50 bg-gold/10 p-4 text-sm text-ink"
            >
              <Info className="mt-0.5 size-4 shrink-0 text-gold-ink" aria-hidden="true" />
              {LEGAL_PLACEHOLDER_NOTE}
            </p>

            {sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                aria-labelledby={`${section.id}-heading`}
                className="mt-10 scroll-mt-32"
              >
                <h2 id={`${section.id}-heading`} className="text-2xl font-bold">
                  {section.heading}
                </h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="mt-4 leading-relaxed text-ink-muted">
                    {paragraph}
                  </p>
                ))}
                {section.list && (
                  <ul className="mt-4 list-disc space-y-2 pl-6 leading-relaxed text-ink-muted marker:text-primary">
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </div>
      </article>
    </>
  );
}
