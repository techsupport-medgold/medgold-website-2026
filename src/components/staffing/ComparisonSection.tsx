import ComparisonTable from "@@/components/services/ComparisonTable";
import { comparison } from "@@/data/staffing";

export default function ComparisonSection() {
  return (
    <section aria-labelledby="staffing-comparison-heading" className="bg-surface-raised py-16 sm:py-20">
      <div className="container">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary-deep">{comparison.eyebrow}</p>
          <h2
            id="staffing-comparison-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl"
          >
            {comparison.heading}
          </h2>
          <p className="mt-4 text-ink-muted">{comparison.intro}</p>
        </div>

        <div className="mt-10">
          <ComparisonTable
            caption={comparison.heading}
            labelledBy="staffing-comparison-heading"
            columns={comparison.columns}
            rows={comparison.rows.map((row) => [row.dimension, row.conventional, row.medgold] as const)}
            highlightColumn={2}
          />
        </div>
      </div>
    </section>
  );
}
