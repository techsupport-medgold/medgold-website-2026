import { CircleCheck, Phone, Quote } from "lucide-react";
import { SITE } from "@@/config/site";
import { comparison, philosophy, whyMedGold } from "@@/data/pharmacyAudit";

export default function ComparisonSection() {
  return (
    <section aria-labelledby="comparison-heading" className="bg-surface py-16 sm:py-20">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold-ink">
            <span className="h-0.5 w-6 bg-gold-ink" aria-hidden="true" />
            {comparison.eyebrow}
          </p>
          <h2 id="comparison-heading" className="mt-4 text-3xl font-bold tracking-tight text-primary-deep sm:text-4xl">
            {comparison.heading}
          </h2>
          <p className="mt-4 text-ink-muted">{comparison.intro}</p>
        </div>

        <div
          className="mt-12 overflow-x-auto rounded-xl border border-border-muted shadow-card"
          role="region"
          aria-labelledby="comparison-heading"
          tabIndex={0}
        >
          <table className="w-full min-w-[720px] border-collapse text-left text-sm">
            <caption className="sr-only">{comparison.heading}</caption>
            <thead className="bg-primary-deep text-white">
              <tr>
                {comparison.columns.map((column) => (
                  <th key={column} scope="col" className="px-4 py-3 text-xs font-bold uppercase tracking-wider">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparison.rows.map((row) => (
                <tr key={row.parameter} className="border-t border-border-muted">
                  <th scope="row" className="bg-surface px-4 py-3 font-bold text-primary-deep">
                    {row.parameter}
                  </th>
                  <td className="bg-surface px-4 py-3 text-destructive">{row.before}</td>
                  <td className="bg-surface-raised px-4 py-3 font-semibold text-primary-deep">{row.after}</td>
                  <td className="bg-surface px-4 py-3 font-bold text-gold-ink">{row.roi}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-12">
          <div className="rounded-2xl bg-surface-raised p-6 sm:p-8 lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-wider text-gold-ink">{whyMedGold.eyebrow}</p>
            <h3 className="mt-2 text-2xl font-bold tracking-tight text-primary-deep">{whyMedGold.heading}</h3>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {whyMedGold.points.map((point) => (
                <li key={point} className="flex items-center gap-2.5 text-sm font-semibold text-primary-deep">
                  <CircleCheck className="size-4 shrink-0 text-primary" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col justify-between gap-6 rounded-2xl bg-primary-deep p-6 text-white sm:p-8 lg:col-span-5">
            <div>
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold">
                <Quote className="size-4" aria-hidden="true" />
                {philosophy.eyebrow}
              </p>
              <blockquote className="mt-3 text-2xl font-bold leading-snug">{philosophy.quote}</blockquote>
              <p className="mt-3 text-sm text-white/80">{philosophy.body}</p>
            </div>
            <p className="text-sm text-white/80">
              {philosophy.hotlineLabel}{" "}
              <a
                href={`tel:${SITE.contact.phoneHref}`}
                className="inline-flex min-h-11 items-center gap-1.5 font-bold text-gold hover:underline"
              >
                <Phone className="size-4" aria-hidden="true" />
                {SITE.contact.phone}
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
