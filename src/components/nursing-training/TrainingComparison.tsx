import ComparisonTable from "@@/components/services/ComparisonTable";
import { comparison } from "@@/data/nursingTraining";

export default function TrainingComparison() {
  return (
    <section aria-labelledby="training-comparison-heading" className="bg-surface py-16 sm:py-20">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-gold-ink">{comparison.eyebrow}</p>
          <h2
            id="training-comparison-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-primary-deep sm:text-4xl"
          >
            {comparison.heading}
          </h2>
          <p className="mt-4 text-ink-muted">{comparison.intro}</p>
        </div>

        <div className="mt-10">
          <ComparisonTable
            caption={comparison.caption}
            labelledBy="training-comparison-heading"
            columns={comparison.columns}
            rows={comparison.rows}
            highlightColumn={1}
          />
        </div>
      </div>
    </section>
  );
}
