import ComparisonTable from "@@/components/services/ComparisonTable";
import Reveal from "@@/components/ui/reveal";
import Section from "@@/components/ui/section";
import SectionHeader from "@@/components/ui/section-header";
import { comparison } from "@@/data/nursingTraining";

export default function TrainingComparison() {
  return (
    <Section aria-labelledby="training-comparison-heading">
      <SectionHeader
        id="training-comparison-heading"
        eyebrow={comparison.eyebrow}
        title={comparison.heading}
        intro={comparison.intro}
        align="center"
      />

      <Reveal className="relative isolate mt-12">
        <div
          className="absolute -inset-2 -z-10 rounded-[1.5rem] bg-gradient-to-br from-primary/15 via-transparent to-gold/20 blur-xl"
          aria-hidden="true"
        />
        <div className="rounded-lg shadow-card-hover ring-1 ring-black/5">
          <ComparisonTable
            caption={comparison.caption}
            labelledBy="training-comparison-heading"
            columns={comparison.columns}
            rows={comparison.rows}
            highlightColumn={1}
          />
        </div>
      </Reveal>
    </Section>
  );
}
