import { CircleCheck, CircleX, Quote, TrendingUp } from "lucide-react";
import Card from "@@/components/ui/card";
import Reveal from "@@/components/ui/reveal";
import Section from "@@/components/ui/section";
import SectionHeader, { Eyebrow } from "@@/components/ui/section-header";
import { comparison, philosophy, whyMedGold } from "@@/data/pharmacyAudit";
import { stagger } from "@@/lib/motion";
import { cn } from "@@/lib/utils";

export default function ComparisonSection() {
  return (
    <Section aria-labelledby="comparison-heading">
      <SectionHeader
        id="comparison-heading"
        eyebrow={comparison.eyebrow}
        title={comparison.heading}
        intro={comparison.intro}
        align="center"
      />

      <Reveal className="mt-12">
        <div
          className="overflow-x-auto rounded-card border border-border-muted bg-surface shadow-card-hover"
          role="region"
          aria-labelledby="comparison-heading"
          tabIndex={0}
        >
          <table className="w-full min-w-[760px] border-collapse text-left text-sm">
            <caption className="sr-only">{comparison.heading}</caption>
            <thead className="bg-primary-deep text-white">
              <tr>
                {comparison.columns.map((column, index) => (
                  <th
                    key={column}
                    scope="col"
                    className={cn(
                      "px-5 py-4 text-xs font-bold uppercase tracking-wider",
                      index === 1 && "text-white/80",
                      index === 2 && "bg-primary",
                      index === 3 && "text-gold",
                    )}
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparison.rows.map((row) => (
                <tr key={row.parameter} className="group border-t border-border-muted">
                  <th
                    scope="row"
                    className="bg-surface px-5 py-4 font-bold text-primary-deep transition-colors duration-200 group-hover:bg-surface-muted"
                  >
                    {row.parameter}
                  </th>
                  <td className="bg-surface px-5 py-4 text-destructive transition-colors duration-200 group-hover:bg-surface-muted">
                    <span className="flex items-start gap-2">
                      <CircleX className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                      {row.before}
                    </span>
                  </td>
                  <td className="bg-primary/5 px-5 py-4 font-semibold text-primary-deep transition-colors duration-200 group-hover:bg-primary/10">
                    <span className="flex items-start gap-2">
                      <CircleCheck className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                      {row.after}
                    </span>
                  </td>
                  <td className="bg-surface px-5 py-4 font-bold text-gold-ink transition-colors duration-200 group-hover:bg-gold/10">
                    <span className="flex items-start gap-2">
                      <TrendingUp className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                      {row.roi}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>

      <div className="mt-12 grid gap-6 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <Card variant="soft" padding="lg" className="h-full">
            <Eyebrow>{whyMedGold.eyebrow}</Eyebrow>
            <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-primary-deep sm:text-3xl">
              {whyMedGold.heading}
            </h3>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {whyMedGold.points.map((point, index) => (
                <Reveal
                  as="li"
                  key={point}
                  delay={stagger(index, 60)}
                  className="hover-lift group flex items-center gap-3 rounded-xl border border-border-muted bg-surface p-3.5 text-sm font-semibold text-primary-deep shadow-card hover:border-primary/30"
                >
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                    <CircleCheck className="size-4" aria-hidden="true" />
                  </span>
                  {point}
                </Reveal>
              ))}
            </ul>
          </Card>
        </Reveal>

        <Reveal delay={120} className="lg:col-span-5">
          <div className="brand-dark flex h-full flex-col justify-center gap-8 rounded-card p-8 shadow-card-hover sm:p-10">
            <Quote
              className="pointer-events-none absolute -right-4 -top-4 size-36 rotate-12 text-gold/10"
              aria-hidden="true"
            />
            <div className="relative">
              <Eyebrow tone="dark">{philosophy.eyebrow}</Eyebrow>
              <blockquote className="mt-4 font-display text-2xl font-bold leading-snug text-white sm:text-3xl">
                {philosophy.quote}
              </blockquote>
              <p className="mt-4 text-sm leading-relaxed text-white/80">{philosophy.body}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
