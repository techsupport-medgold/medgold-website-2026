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
import Card from "@@/components/ui/card";
import Reveal from "@@/components/ui/reveal";
import Section from "@@/components/ui/section";
import SectionHeader from "@@/components/ui/section-header";
import { workflow, type WorkflowAccent, type WorkflowIcon } from "@@/data/patientFeedback";
import { stagger } from "@@/lib/motion";
import { cn } from "@@/lib/utils";

const STAGE_ICONS: Record<WorkflowIcon, LucideIcon> = {
  collect: MonitorSmartphone,
  categorize: Shapes,
  alert: TriangleAlert,
  recover: Headset,
  report: BarChart3,
};

const ACCENTS: Record<WorkflowAccent, { bar: string; badge: string; icon: string }> = {
  primary: { bar: "bg-teal-300", badge: "bg-teal-300 text-ink", icon: "text-teal-300" },
  destructive: { bar: "bg-red-400", badge: "bg-red-400 text-ink", icon: "text-red-300" },
  gold: { bar: "bg-gold", badge: "bg-gold text-ink", icon: "text-gold" },
};

export default function WorkflowSection() {
  return (
    <Section tone="dark" aria-labelledby="workflow-heading">
      <SectionHeader
        id="workflow-heading"
        eyebrow={workflow.eyebrow}
        title={workflow.heading}
        intro={workflow.intro}
        align="center"
        tone="dark"
      />

      <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {workflow.stages.map((stage, index) => {
          const Icon = STAGE_ICONS[stage.icon];
          const accent = ACCENTS[stage.accent];
          const last = index === workflow.stages.length - 1;
          return (
            <Reveal as="li" key={stage.title} delay={stagger(index, 100)} className="relative">
              {last ? null : (
                <span className="absolute -right-4 top-11 z-10 hidden h-px w-4 bg-white/30 lg:block" aria-hidden="true" />
              )}
              <Card
                variant="dark"
                padding="none"
                interactive
                className="group h-full overflow-hidden px-5 pb-6 pt-7 hover:border-white/25 hover:bg-white/[0.1]"
              >
                <span className={cn("absolute inset-x-0 top-0 h-1", accent.bar)} aria-hidden="true" />
                <div className="flex items-center justify-between">
                  <span
                    className={cn(
                      "flex size-10 items-center justify-center rounded-xl font-display text-base font-bold transition-transform duration-300 ease-spring group-hover:scale-110 group-hover:-rotate-3",
                      accent.badge,
                    )}
                    aria-hidden="true"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <Icon className={cn("size-6", accent.icon)} aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-lg font-bold leading-snug text-white">
                  <span className="sr-only">Stage {index + 1}: </span>
                  {stage.title}
                </h3>
                <ul className="mt-3 grid gap-2 text-sm text-white/80">
                  {stage.highlight ? (
                    <li className="flex items-start gap-1.5 rounded-lg bg-red-500/15 p-2 text-xs font-bold uppercase tracking-wide text-red-200 ring-1 ring-inset ring-red-400/30">
                      <CircleAlert className="mt-px size-3.5 shrink-0" aria-hidden="true" />
                      {stage.highlight}
                    </li>
                  ) : null}
                  {stage.items.map((item) => (
                    <li key={`${item.strong ?? ""}${item.text ?? ""}`} className="flex items-start gap-1.5">
                      <CircleCheck className={cn("mt-0.5 size-4 shrink-0", accent.icon)} aria-hidden="true" />
                      <span>
                        {item.strong ? <strong className="font-semibold text-white">{item.strong}</strong> : null}
                        {item.text}
                        {item.strongAfter ? <strong className="font-semibold text-white">{item.strongAfter}</strong> : null}
                      </span>
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          );
        })}
      </ol>
    </Section>
  );
}
