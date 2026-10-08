import { Award, BadgeCheck, CircleCheck, HeartPulse, Siren, Syringe, type LucideIcon } from "lucide-react";
import Card from "@@/components/ui/card";
import IconBadge from "@@/components/ui/icon-badge";
import Pill from "@@/components/ui/pill";
import Reveal from "@@/components/ui/reveal";
import Section from "@@/components/ui/section";
import SectionHeader from "@@/components/ui/section-header";
import { pillars, type PillarIcon } from "@@/data/nursingTraining";
import { stagger } from "@@/lib/motion";
import { cn } from "@@/lib/utils";

const PILLAR_ICONS: Record<PillarIcon, LucideIcon> = {
  clinical: HeartPulse,
  certification: Award,
  skills: Syringe,
  emergency: Siren,
};

export default function TrainingPillars() {
  return (
    <Section aria-labelledby="pillars-heading">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeader id="pillars-heading" eyebrow={pillars.eyebrow} title={pillars.heading} intro={pillars.intro} />
        <Pill tone="gold" size="md" className="w-fit shrink-0 py-2 shadow-sm">
          <BadgeCheck className="size-4" aria-hidden="true" />
          {pillars.badge}
        </Pill>
      </div>

      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {pillars.cards.map((card, index) => {
          const gold = card.accent === "gold";
          return (
            <Reveal as="li" key={card.title} delay={stagger(index)}>
              <Card interactive className="group h-full overflow-hidden">
                <span
                  className={cn(
                    "absolute inset-x-0 top-0 h-1 origin-left transition-transform duration-500 ease-out-expo group-hover:scale-x-100 sm:scale-x-50",
                    gold ? "bg-gradient-to-r from-gold to-gold/40" : "bg-gradient-to-r from-primary-deep to-primary",
                  )}
                  aria-hidden="true"
                />
                <div className="flex items-start justify-between gap-3">
                  <IconBadge icon={PILLAR_ICONS[card.icon]} tone={gold ? "gold" : "teal"} />
                  <span
                    className="font-display text-4xl font-extrabold leading-none text-primary/10 transition-colors duration-300 group-hover:text-primary/20"
                    aria-hidden="true"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="mt-5 text-xs font-bold uppercase tracking-[0.14em] text-gold-ink">{card.label}</p>
                <h3 className="mt-1 text-xl font-bold text-primary-deep">{card.title}</h3>
                <ul className="mt-4 grid gap-2.5 border-t border-border-muted pt-4 text-sm text-ink-muted">
                  {card.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CircleCheck className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}
