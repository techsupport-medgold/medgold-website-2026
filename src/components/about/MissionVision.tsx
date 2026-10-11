import { Eye, Target, type LucideIcon } from "lucide-react";
import Card from "@@/components/ui/card";
import IconBadge from "@@/components/ui/icon-badge";
import Reveal from "@@/components/ui/reveal";
import Section from "@@/components/ui/section";
import SectionHeader from "@@/components/ui/section-header";
import { purpose } from "@@/data/about";
import { stagger } from "@@/lib/motion";

const ITEMS: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Target, ...purpose.mission },
  { icon: Eye, ...purpose.vision },
];

export default function MissionVision() {
  return (
    <Section tone="dark" aria-labelledby="purpose-heading">
      <SectionHeader id="purpose-heading" eyebrow={purpose.eyebrow} title={purpose.heading} tone="dark" />
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {ITEMS.map((item, index) => (
          <Reveal key={item.title} delay={stagger(index, 120)}>
            <Card variant="dark" padding="lg" interactive className="group h-full gap-5 hover:border-gold/40 hover:bg-white/[0.1]">
              <IconBadge icon={item.icon} tone="dark" />
              <h3 className="font-display text-2xl font-bold text-white">{item.title}</h3>
              <p className="text-lg leading-relaxed text-white/85">{item.text}</p>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
