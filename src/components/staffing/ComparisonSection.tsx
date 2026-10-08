import ComparisonTable from "@@/components/services/ComparisonTable";
import Reveal from "@@/components/ui/reveal";
import Section from "@@/components/ui/section";
import SectionHeader from "@@/components/ui/section-header";
import { comparison } from "@@/data/staffing";

export default function ComparisonSection() {
  return (
    <Section tone="raised" aria-labelledby="staffing-comparison-heading">
      <SectionHeader
        id="staffing-comparison-heading"
        eyebrow={comparison.eyebrow}
        title={comparison.heading}
        intro={comparison.intro}
      />

      <Reveal className="relative isolate mt-12">
        <div
          className="absolute -inset-2 -z-10 rounded-[1.25rem] bg-gradient-to-br from-gold/25 via-transparent to-primary/15 blur-xl"
          aria-hidden="true"
        />
        <div className="overflow-hidden rounded-card shadow-card-hover ring-1 ring-black/5">
          <ComparisonTable
            caption={comparison.heading}
            labelledBy="staffing-comparison-heading"
            columns={comparison.columns}
            rows={comparison.rows.map((row) => [row.dimension, row.conventional, row.medgold] as const)}
            highlightColumn={2}
          />
        </div>
      </Reveal>
    </Section>
  );
}
