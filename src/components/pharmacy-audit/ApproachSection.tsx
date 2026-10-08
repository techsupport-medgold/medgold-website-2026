import Section from "@@/components/ui/section";
import SectionHeader from "@@/components/ui/section-header";
import Timeline from "@@/components/ui/timeline";
import { approach } from "@@/data/pharmacyAudit";

export default function ApproachSection() {
  return (
    <Section tone="dark" aria-labelledby="approach-heading">
      <SectionHeader
        id="approach-heading"
        eyebrow={approach.eyebrow}
        title={approach.heading}
        intro={approach.intro}
        align="center"
        tone="dark"
      />

      <Timeline
        tone="dark"
        className="mt-14"
        steps={approach.stages.map((stage, index) => ({
          meta: `Stage ${index + 1}`,
          title: stage.title,
          text: stage.description,
        }))}
      />
    </Section>
  );
}
