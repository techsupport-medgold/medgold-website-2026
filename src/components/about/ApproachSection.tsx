import Section from "@@/components/ui/section";
import SectionHeader from "@@/components/ui/section-header";
import Timeline from "@@/components/ui/timeline";
import { approach } from "@@/data/about";

export default function ApproachSection() {
  return (
    <Section tone="raised" aria-labelledby="approach-heading">
      <SectionHeader id="approach-heading" eyebrow={approach.eyebrow} title={approach.heading} intro={approach.intro} />
      <Timeline steps={approach.steps} className="mt-12" />
    </Section>
  );
}
