import { BookOpen, BriefcaseMedical, Check, Siren, type LucideIcon } from "lucide-react";
import Card from "@@/components/ui/card";
import IconBadge from "@@/components/ui/icon-badge";
import Reveal from "@@/components/ui/reveal";
import Section from "@@/components/ui/section";
import SectionHeader from "@@/components/ui/section-header";
import { curriculum, type CurriculumIcon } from "@@/data/nursingTraining";
import { stagger } from "@@/lib/motion";

const CURRICULUM_ICONS: Record<CurriculumIcon, LucideIcon> = {
  procedures: BriefcaseMedical,
  emergency: Siren,
  curriculum: BookOpen,
};

export default function CurriculumSection() {
  return (
    <Section tone="raised" aria-labelledby="curriculum-heading">
      <SectionHeader
        id="curriculum-heading"
        eyebrow={curriculum.eyebrow}
        title={curriculum.heading}
        intro={curriculum.intro}
        align="center"
      />

      <ul className="mt-12 grid gap-6 lg:grid-cols-3">
        {curriculum.cards.map((card, index) => (
          <Reveal as="li" key={card.title} delay={stagger(index, 100)}>
            <Card padding="none" interactive className="group h-full overflow-hidden">
              <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-surface to-gold/10 p-6 sm:p-7">
                <span
                  className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-gold/15 blur-2xl transition-transform duration-700 ease-out-expo group-hover:scale-150"
                  aria-hidden="true"
                />
                <div className="relative flex items-start gap-4">
                  <IconBadge icon={CURRICULUM_ICONS[card.icon]} tone="teal" className="shadow-card" />
                  <div className="min-w-0">
                    <h3 className="text-lg font-bold leading-snug text-primary-deep">{card.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{card.intro}</p>
                  </div>
                </div>
              </div>
              <ul className="grid gap-2.5 border-t border-border-muted p-6 text-sm text-ink sm:p-7">
                {card.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold-ink">
                      <Check className="size-3" aria-hidden="true" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
