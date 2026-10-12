import { Award, Handshake, HeartHandshake, Lightbulb, ShieldCheck, type LucideIcon } from "lucide-react";
import Card from "@@/components/ui/card";
import IconBadge from "@@/components/ui/icon-badge";
import Reveal from "@@/components/ui/reveal";
import Section from "@@/components/ui/section";
import SectionHeader from "@@/components/ui/section-header";
import { values, type ValueIcon } from "@@/data/about";
import { stagger } from "@@/lib/motion";

const VALUE_ICONS: Record<ValueIcon, LucideIcon> = {
  integrity: ShieldCheck,
  quality: Award,
  collaboration: Handshake,
  innovation: Lightbulb,
  compassion: HeartHandshake,
};

export default function CoreValues() {
  return (
    <Section aria-labelledby="values-heading">
      <SectionHeader id="values-heading" eyebrow={values.eyebrow} title={values.heading} />
      <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
        {values.items.map((item, index) => (
          <Reveal
            as="li"
            key={item.title}
            delay={stagger(index)}
            className={index < 3 ? "lg:col-span-2" : "lg:col-span-3"}
          >
            <Card interactive className="group h-full gap-4">
              <IconBadge icon={VALUE_ICONS[item.icon]} tone={index % 2 === 0 ? "teal" : "gold"} />
              <h3 className="text-xl font-bold text-primary-deep">{item.title}</h3>
              <p className="text-sm leading-relaxed text-ink-muted">{item.text}</p>
            </Card>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
