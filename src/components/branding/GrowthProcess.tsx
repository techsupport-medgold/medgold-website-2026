import {
  CalendarCheck,
  CalendarDays,
  Eye,
  Filter,
  Gem,
  IndianRupee,
  Search,
  Shield,
  TrendingUp,
  UserCheck,
  type LucideIcon,
} from "lucide-react";
import Card from "@@/components/ui/card";
import IconBadge from "@@/components/ui/icon-badge";
import Pill from "@@/components/ui/pill";
import Reveal from "@@/components/ui/reveal";
import Section from "@@/components/ui/section";
import SectionHeader from "@@/components/ui/section-header";
import { process, type OutcomeIcon, type ProcessIcon } from "@@/data/branding";
import { stagger } from "@@/lib/motion";
import { cn } from "@@/lib/utils";

const STEP_ICONS: Record<ProcessIcon, LucideIcon> = {
  visibility: Search,
  leads: Filter,
  appointments: CalendarCheck,
  revenue: IndianRupee,
  brand: Gem,
};

const OUTCOME_ICONS: Record<OutcomeIcon, LucideIcon> = {
  eye: Eye,
  funnel: UserCheck,
  calendar: CalendarDays,
  trend: TrendingUp,
  shield: Shield,
};

export default function GrowthProcess() {
  return (
    <Section tone="dark" aria-labelledby="growth-process-heading">
      <SectionHeader
        id="growth-process-heading"
        tone="dark"
        eyebrow={process.eyebrow}
        title={process.heading}
        intro={process.intro}
      />

      <Reveal className="mt-12 hidden lg:block" aria-hidden="true">
        <div className="h-1 overflow-hidden rounded-full bg-white/10">
          <div className="reveal-bar h-full w-full rounded-full bg-gradient-to-r from-primary via-teal-300 to-gold" />
        </div>
      </Reveal>

      <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-8 lg:grid-cols-5">
        {process.steps.map((step, index) => {
          const OutcomeIconComponent = OUTCOME_ICONS[step.outcomeIcon];
          const gold = step.tone === "gold";
          return (
            <Reveal as="li" key={step.title} delay={stagger(index, 100)}>
              <Card variant="dark" interactive className="group h-full hover:border-gold/40 hover:bg-white/[0.09]">
                <div className="flex items-start justify-between gap-2">
                  <IconBadge
                    icon={STEP_ICONS[step.icon]}
                    tone="dark"
                    className={cn(gold && "bg-gold text-ink")}
                  />
                  <span
                    className="font-display text-4xl font-extrabold leading-none tracking-tight text-white/15 transition-colors duration-300 group-hover:text-gold/40"
                    aria-hidden="true"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <Pill tone="dark" className="mt-5 w-fit text-[11px] font-bold tracking-wider">
                  STEP {index + 1}
                </Pill>
                <h3 className="mt-3 text-lg font-bold leading-snug text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/75">{step.text}</p>
                <div className="mt-auto pt-6">
                  <p
                    className={cn(
                      "flex items-center gap-1.5 border-t border-white/15 pt-3 text-xs font-semibold tracking-wide",
                      gold ? "text-gold" : "text-teal-200",
                    )}
                  >
                    <OutcomeIconComponent className="size-3.5 shrink-0" aria-hidden="true" />
                    {step.outcome}
                  </p>
                </div>
              </Card>
            </Reveal>
          );
        })}
      </ol>
    </Section>
  );
}
