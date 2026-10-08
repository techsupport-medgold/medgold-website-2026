import { CircleCheck, ClipboardList, Rocket, Stethoscope, Target, Warehouse, type LucideIcon } from "lucide-react";
import Card from "@@/components/ui/card";
import IconBadge from "@@/components/ui/icon-badge";
import Pill from "@@/components/ui/pill";
import Reveal from "@@/components/ui/reveal";
import Section from "@@/components/ui/section";
import SectionHeader from "@@/components/ui/section-header";
import { framework, type FrameworkIcon, type FrameworkStep } from "@@/data/pharmacyAudit";
import { stagger } from "@@/lib/motion";
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
    <ul className="grid gap-2.5 text-sm text-ink-subtle">
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
      <div className="grid gap-2.5 sm:grid-cols-2 sm:gap-6">
        {step.bulletColumns.map((column) => (
          <BulletList key={column[0]} items={column} />
        ))}
      </div>
    );
  }
  return (
    <dl className="grid gap-3">
      {step.kpis?.map((kpi) => (
        <div key={kpi.label} className="rounded-xl border-l-2 border-gold bg-surface-raised p-3.5">
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
    <Section tone="muted" aria-labelledby="framework-heading">
      <SectionHeader
        id="framework-heading"
        eyebrow={framework.eyebrow}
        title={framework.heading}
        intro={framework.intro}
        align="center"
      />

      <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {framework.steps.map((step, index) => {
          const isLast = index === lastIndex;
          return (
            <Reveal as="li" key={step.title} delay={stagger(index % 3)} className={cn("min-w-0", isLast && "md:col-span-2")}>
              <Card
                interactive
                variant={isLast ? "elevated" : "default"}
                className={cn("group h-full overflow-hidden", isLast && "ring-1 ring-gold/40")}
              >
                <span
                  className={cn(
                    "absolute inset-x-0 top-0 h-1 bg-gold",
                    !isLast && "origin-left scale-x-0 transition-transform duration-500 ease-out-expo group-hover:scale-x-100",
                  )}
                  aria-hidden="true"
                />
                <span
                  className="pointer-events-none absolute -right-2 -top-4 font-display text-8xl font-extrabold leading-none text-primary/[0.05] transition-colors duration-300 group-hover:text-gold/10"
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="relative flex items-start justify-between gap-3">
                  <IconBadge icon={STEP_ICONS[step.icon]} tone={isLast ? "gold" : "soft"} />
                  <Pill
                    tone={isLast ? "gold" : "teal"}
                    className={cn("uppercase tracking-wider", isLast && "bg-gold text-primary-deep")}
                  >
                    Step {index + 1}
                  </Pill>
                </div>
                <h3 className="relative mt-5 text-lg font-bold text-primary-deep">{step.title}</h3>
                <p className="relative mb-5 mt-2 text-sm leading-relaxed text-ink-subtle">{step.description}</p>
                <div className="relative mt-auto border-t border-border-muted pt-5">
                  <StepBody step={step} />
                </div>
              </Card>
            </Reveal>
          );
        })}
      </ol>
    </Section>
  );
}
