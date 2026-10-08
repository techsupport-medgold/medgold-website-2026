import { CircleCheck, ClipboardList, Rocket, Stethoscope, Target, Warehouse, type LucideIcon } from "lucide-react";
import { framework, type FrameworkIcon, type FrameworkStep } from "@@/data/pharmacyAudit";
import { cn } from "@@/lib/utils";

const STEP_ICONS: Record<FrameworkIcon, LucideIcon> = {
  health: Stethoscope,
  stock: Warehouse,
  sop: ClipboardList,
  kpi: Target,
  growth: Rocket,
};

function BulletList({ items }: { items: readonly string[] }) {
  return (
    <ul className="grid gap-2 text-sm text-ink-muted">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2">
          <CircleCheck className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  );
}

function StepBody({ step }: { step: FrameworkStep }) {
  if (step.bullets) return <BulletList items={step.bullets} />;
  if (step.bulletColumns) {
    return (
      <div className="grid gap-2 sm:grid-cols-2 sm:gap-6">
        {step.bulletColumns.map((column) => (
          <BulletList key={column[0]} items={column} />
        ))}
      </div>
    );
  }
  return (
    <dl className="grid gap-3">
      {step.kpis?.map((kpi) => (
        <div key={kpi.label} className="rounded-lg bg-surface-raised p-3">
          <dt className="text-sm font-bold text-primary-deep">{kpi.label}</dt>
          <dd className="mt-1 text-sm text-ink-muted">{kpi.items}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function FrameworkSection() {
  const lastIndex = framework.steps.length - 1;

  return (
    <section aria-labelledby="framework-heading" className="bg-surface-muted py-16 sm:py-20">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold-ink">
            <span className="h-0.5 w-6 bg-gold-ink" aria-hidden="true" />
            {framework.eyebrow}
          </p>
          <h2 id="framework-heading" className="mt-4 text-3xl font-bold tracking-tight text-primary-deep sm:text-4xl">
            {framework.heading}
          </h2>
          <p className="mt-4 text-ink-muted">{framework.intro}</p>
        </div>

        <ol className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {framework.steps.map((step, index) => {
            const Icon = STEP_ICONS[step.icon];
            const isLast = index === lastIndex;
            return (
              <li
                key={step.title}
                className={cn(
                  "flex min-w-0 flex-col rounded-xl bg-surface p-6 shadow-card",
                  isLast && "border-t-4 border-gold md:col-span-2",
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <span
                    className={cn(
                      "flex size-11 items-center justify-center rounded-lg",
                      isLast ? "bg-gold/15 text-gold-ink" : "bg-primary/10 text-primary",
                    )}
                  >
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <span
                    className={cn(
                      "rounded px-2 py-1 text-xs font-bold uppercase tracking-wider",
                      isLast ? "bg-gold text-primary-deep" : "bg-surface-raised text-primary-deep",
                    )}
                  >
                    Step {index + 1}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-bold text-primary-deep">{step.title}</h3>
                <p className="mt-1.5 mb-4 text-sm text-ink-muted">{step.description}</p>
                <StepBody step={step} />
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
