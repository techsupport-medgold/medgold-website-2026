import {
  BarChart3,
  CircleAlert,
  CircleCheck,
  Headset,
  MonitorSmartphone,
  Shapes,
  TriangleAlert,
  type LucideIcon,
} from "lucide-react";
import { workflow, type WorkflowAccent, type WorkflowIcon } from "@@/data/patientFeedback";
import { cn } from "@@/lib/utils";

const STAGE_ICONS: Record<WorkflowIcon, LucideIcon> = {
  collect: MonitorSmartphone,
  categorize: Shapes,
  alert: TriangleAlert,
  recover: Headset,
  report: BarChart3,
};

const ACCENTS: Record<WorkflowAccent, { border: string; badge: string; icon: string }> = {
  primary: { border: "border-t-primary-deep", badge: "bg-primary-deep", icon: "text-primary-deep" },
  destructive: { border: "border-t-destructive", badge: "bg-destructive", icon: "text-destructive" },
  gold: { border: "border-t-gold-ink", badge: "bg-gold-ink", icon: "text-gold-ink" },
};

export default function WorkflowSection() {
  return (
    <section aria-labelledby="workflow-heading" className="bg-surface-raised py-16 sm:py-20">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-gold-ink">{workflow.eyebrow}</p>
          <h2
            id="workflow-heading"
            className="mt-2 text-3xl font-bold uppercase tracking-tight text-primary-deep sm:text-4xl"
          >
            {workflow.heading}
          </h2>
          <p className="mt-3 text-ink-muted">{workflow.intro}</p>
        </div>

        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {workflow.stages.map((stage, index) => {
            const Icon = STAGE_ICONS[stage.icon];
            const accent = ACCENTS[stage.accent];
            return (
              <li
                key={stage.title}
                className={cn("rounded-lg border-t-4 bg-surface px-6 pb-6 pt-7 shadow-sm", accent.border)}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={cn(
                      "flex size-8 items-center justify-center rounded-xl text-lg font-bold text-white",
                      accent.badge,
                    )}
                    aria-hidden="true"
                  >
                    {index + 1}
                  </span>
                  <Icon className={cn("size-5", accent.icon)} aria-hidden="true" />
                </div>
                <h3 className="mt-3 text-lg font-bold uppercase leading-snug text-ink">
                  <span className="sr-only">Stage {index + 1}: </span>
                  {stage.title}
                </h3>
                <ul className="mt-2 grid gap-1.5 text-xs text-ink-muted">
                  {stage.highlight ? (
                    <li className="flex items-start gap-1 rounded-sm bg-destructive/10 p-1 font-semibold uppercase text-destructive">
                      <CircleAlert className="mt-px size-3.5 shrink-0" aria-hidden="true" />
                      {stage.highlight}
                    </li>
                  ) : null}
                  {stage.items.map((item) => (
                    <li key={`${item.strong ?? ""}${item.text ?? ""}`} className="flex items-start gap-1">
                      <CircleCheck className={cn("mt-px size-3.5 shrink-0", accent.icon)} aria-hidden="true" />
                      <span>
                        {item.strong ? <strong className="font-semibold">{item.strong}</strong> : null}
                        {item.text}
                        {item.strongAfter ? <strong className="font-semibold">{item.strongAfter}</strong> : null}
                      </span>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
