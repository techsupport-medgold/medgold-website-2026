import { ChevronDown } from "lucide-react";
import Section from "@@/components/ui/section";
import SectionHeader from "@@/components/ui/section-header";

export type ServiceFaq = { question: string; answer: string };

export type ServiceOverviewContent = {
  eyebrow: string;
  heading: string;
  paragraphs: readonly string[];
  faqHeading: string;
  faqs: readonly ServiceFaq[];
};

type ServiceOverviewProps = { id: string; content: ServiceOverviewContent };

/** Plain-language overview and FAQ. The FAQ text matches the page's FAQPage JSON-LD. */
export default function ServiceOverview({ id, content }: ServiceOverviewProps) {
  const headingId = `${id}-heading`;
  const faqHeadingId = `${id}-faq-heading`;
  return (
    <Section id={id} aria-labelledby={headingId} tone="surface" className="border-t border-border-muted">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <SectionHeader id={headingId} eyebrow={content.eyebrow} title={content.heading} />
          <div className="mt-6 max-w-prose space-y-5 text-base leading-relaxed text-ink-muted">
            {content.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>
        </div>
        <div className="lg:col-span-5">
          <h2 id={faqHeadingId} className="font-display text-2xl font-bold text-primary-deep">
            {content.faqHeading}
          </h2>
          <div className="mt-6 divide-y divide-border-muted rounded-card border border-border-muted bg-surface">
            {content.faqs.map((faq) => (
              <details key={faq.question} className="group px-5">
                <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 py-3 font-semibold text-ink focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <ChevronDown
                    className="size-5 shrink-0 text-primary transition-transform group-open:rotate-180 motion-reduce:transition-none"
                    aria-hidden="true"
                  />
                </summary>
                <p className="pb-4 text-sm leading-relaxed text-ink-muted">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
