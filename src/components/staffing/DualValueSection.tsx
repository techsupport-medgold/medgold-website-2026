import Link from "next/link";
import { ArrowRight, Building2, CircleCheck, GraduationCap, type LucideIcon } from "lucide-react";
import Card from "@@/components/ui/card";
import IconBadge from "@@/components/ui/icon-badge";
import Pill from "@@/components/ui/pill";
import Reveal from "@@/components/ui/reveal";
import Section from "@@/components/ui/section";
import SectionHeader from "@@/components/ui/section-header";
import { DevRoutes } from "@@/config/routes";
import { dualValue, type DualValueCard, type DualValueIcon } from "@@/data/staffing";
import { stagger } from "@@/lib/motion";
import { cn } from "@@/lib/utils";

const CARD_ICONS: Record<DualValueIcon, LucideIcon> = {
  hospital: Building2,
  training: GraduationCap,
};

function CardLink({ card }: { card: DualValueCard }) {
  const className = cn(
    "group/link inline-flex min-h-11 items-center gap-1.5 font-semibold transition-colors",
    card.accent === "gold" ? "text-gold-ink hover:text-ink" : "text-primary-deep hover:text-primary",
  );
  return (
    <Link href={DevRoutes.CONTACT} className={className}>
      <span className="link-underline">{card.link.label}</span>
      <ArrowRight
        className="size-4 shrink-0 transition-transform duration-300 group-hover/link:translate-x-1"
        aria-hidden="true"
      />
    </Link>
  );
}

export default function DualValueSection() {
  return (
    <Section aria-labelledby="dual-value-heading">
      <SectionHeader
        id="dual-value-heading"
        align="center"
        eyebrow={dualValue.eyebrow}
        title={dualValue.heading}
        intro={dualValue.intro}
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {dualValue.cards.map((card, index) => {
          const gold = card.accent === "gold";
          return (
            <Reveal key={card.title} delay={stagger(index)} className="h-full">
              <Card
                as="article"
                variant="elevated"
                padding="lg"
                interactive
                className="group h-full gap-5 overflow-hidden"
              >
                <span
                  className={cn(
                    "absolute inset-x-0 top-0 h-1.5",
                    gold ? "bg-gradient-to-r from-gold via-gold/70 to-gold/30" : "bg-gradient-to-r from-primary-deep via-primary to-teal-300",
                  )}
                  aria-hidden="true"
                />
                <span
                  className={cn(
                    "pointer-events-none absolute -right-16 -top-16 size-48 rounded-full blur-3xl transition-opacity duration-500 group-hover:opacity-100",
                    gold ? "bg-gold/15 opacity-60" : "bg-primary/10 opacity-60",
                  )}
                  aria-hidden="true"
                />
                <div className="relative flex items-start gap-4">
                  <IconBadge icon={CARD_ICONS[card.icon]} tone={gold ? "gold" : "teal"} />
                  <div className="min-w-0">
                    <Pill tone={gold ? "teal" : "gold"} className="uppercase tracking-wider">
                      {card.eyebrow}
                    </Pill>
                    <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-primary-deep">{card.title}</h3>
                  </div>
                </div>
                <p className="relative leading-relaxed text-ink-muted">{card.intro}</p>
                <ul className="relative grid gap-3 text-sm text-ink">
                  {card.points.map((point) => (
                    <li key={point.lead} className="flex items-start gap-2.5">
                      <CircleCheck
                        className={cn("mt-0.5 size-4 shrink-0", gold ? "text-gold-ink" : "text-primary")}
                        aria-hidden="true"
                      />
                      <span>
                        <strong className="font-bold text-primary-deep">{point.lead}</strong> {point.text}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="relative mt-auto border-t border-border-muted pt-2">
                  <CardLink card={card} />
                </div>
              </Card>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
