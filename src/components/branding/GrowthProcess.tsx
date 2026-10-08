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
import { process, type OutcomeIcon, type ProcessIcon } from "@@/data/branding";
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
    <section aria-labelledby="growth-process-heading" className="bg-surface-raised py-16 sm:py-20">
      <div className="container">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-gold-ink">{process.eyebrow}</p>
          <h2
            id="growth-process-heading"
            className="mt-2 text-3xl font-bold tracking-tight text-primary-deep sm:text-4xl"
          >
            {process.heading}
          </h2>
          <p className="mt-3 text-ink-muted">{process.intro}</p>
        </div>

        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {process.steps.map((step, index) => {
            const Icon = STEP_ICONS[step.icon];
            const OutcomeIconComponent = OUTCOME_ICONS[step.outcomeIcon];
            const gold = step.tone === "gold";
            const number = String(index + 1).padStart(2, "0");
            return (
              <li key={step.title} className="flex flex-col rounded-lg border border-border-muted bg-surface p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <span
                    className={cn(
                      "text-4xl font-bold tracking-tight",
                      gold ? "text-gold-ink/40" : "text-primary-deep/30",
                    )}
                    aria-hidden="true"
                  >
                    {number}
                  </span>
                  <span
                    className={cn(
                      "rounded-sm bg-surface-raised px-2 py-0.5 text-[11px] font-bold tracking-wide",
                      gold ? "text-gold-ink" : "text-primary-deep",
                    )}
                  >
                    STEP {index + 1}
                  </span>
                </div>
                <span className="mt-1 flex size-10 items-center justify-center rounded-xl bg-surface-raised">
                  <Icon className={cn("size-4", gold ? "text-gold-ink" : "text-primary-deep")} aria-hidden="true" />
                </span>
                <h3 className="mt-2 text-lg font-bold leading-snug text-primary-deep">{step.title}</h3>
                <p className="mt-1 text-xs text-ink-muted">{step.text}</p>
                <div className="mt-auto pt-6">
                  <p
                    className={cn(
                      "flex items-center gap-1 border-t border-border-muted pt-2.5 text-[11px] font-semibold tracking-wide",
                      gold ? "text-gold-ink" : "text-primary-deep",
                    )}
                  >
                    <OutcomeIconComponent className="size-3.5" aria-hidden="true" />
                    {step.outcome}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
