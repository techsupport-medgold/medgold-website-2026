import { Award, BadgeCheck, CircleCheck, HeartPulse, Siren, Syringe, type LucideIcon } from "lucide-react";
import { pillars, type PillarIcon } from "@@/data/nursingTraining";
import { cn } from "@@/lib/utils";

const PILLAR_ICONS: Record<PillarIcon, LucideIcon> = {
  clinical: HeartPulse,
  certification: Award,
  skills: Syringe,
  emergency: Siren,
};

export default function TrainingPillars() {
  return (
    <section aria-labelledby="pillars-heading" className="bg-surface py-16 sm:py-20">
      <div className="container">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-gold-ink">{pillars.eyebrow}</p>
            <h2 id="pillars-heading" className="mt-3 text-3xl font-bold tracking-tight text-primary-deep sm:text-4xl">
              {pillars.heading}
            </h2>
            <p className="mt-4 text-ink-muted">{pillars.intro}</p>
          </div>
          <p className="inline-flex w-fit shrink-0 items-center gap-1.5 rounded bg-surface-raised px-4 py-2 text-xs font-semibold text-primary-deep">
            <BadgeCheck className="size-4" aria-hidden="true" />
            {pillars.badge}
          </p>
        </div>

        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.cards.map((card) => {
            const Icon = PILLAR_ICONS[card.icon];
            return (
              <li
                key={card.title}
                className={cn(
                  "min-w-0 rounded-lg border-t-4 bg-surface p-6 shadow-card",
                  card.accent === "gold" ? "border-t-gold" : "border-t-primary-deep",
                )}
              >
                <span className="flex size-12 items-center justify-center rounded bg-surface-raised">
                  <Icon className="size-6 text-primary-deep" aria-hidden="true" />
                </span>
                <p className="mt-4 text-sm font-semibold uppercase tracking-wider text-gold-ink">{card.label}</p>
                <h3 className="text-lg font-bold text-primary-deep">{card.title}</h3>
                <ul className="mt-3 grid gap-1.5 text-sm text-ink-muted">
                  {card.items.map((item) => (
                    <li key={item} className="flex items-start gap-1.5">
                      <CircleCheck className="mt-0.5 size-4 shrink-0 text-gold-ink" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
