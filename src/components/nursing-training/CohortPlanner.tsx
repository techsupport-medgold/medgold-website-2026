"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@@/components/ui/button";
import { whatsappUrl } from "@@/config/site";
import { planner } from "@@/data/nursingTraining";
import {
  buildCohortMessage,
  DEFAULT_COHORT,
  recommendCohort,
  type BatchId,
  type CapacityId,
} from "@@/lib/ojtPlanner";

const legendClass = "text-sm font-semibold text-primary-deep";
const chipClass =
  "flex min-h-11 cursor-pointer items-center justify-center rounded px-3 py-2 text-center text-xs font-semibold transition-colors bg-surface-raised text-primary-deep hover:bg-primary/10 has-[:checked]:bg-primary-deep has-[:checked]:text-white has-[:focus-visible]:ring-[3px] has-[:focus-visible]:ring-ring/50";

type ChipGroupProps<T extends string> = {
  name: string;
  legend: string;
  options: readonly { id: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
};

function ChipGroup<T extends string>({ name, legend, options, value, onChange }: ChipGroupProps<T>) {
  return (
    <fieldset>
      <legend className={legendClass}>{legend}</legend>
      <div className="mt-2 grid grid-cols-2 gap-1.5 sm:grid-cols-4">
        {options.map((option) => (
          <label key={option.id} className={chipClass}>
            <input
              type="radio"
              name={name}
              value={option.id}
              checked={value === option.id}
              onChange={() => onChange(option.id)}
              className="sr-only"
            />
            {option.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export default function CohortPlanner() {
  const [capacity, setCapacity] = useState<CapacityId>(DEFAULT_COHORT.capacity);
  const [batch, setBatch] = useState<BatchId>(DEFAULT_COHORT.batch);
  const [focusAreas, setFocusAreas] = useState<string[]>([...DEFAULT_COHORT.focusAreas]);

  const input = { capacity, batch, focusAreas };
  const result = recommendCohort(input);

  const toggleFocus = (area: string) =>
    setFocusAreas((current) =>
      current.includes(area)
        ? current.filter((item) => item !== area)
        : planner.focusAreas.filter((item) => item === area || current.includes(item)),
    );

  return (
    <section aria-labelledby="planner-heading" className="bg-surface-raised py-16 sm:py-20">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-gold-ink">{planner.eyebrow}</p>
          <h2 id="planner-heading" className="mt-3 text-3xl font-bold tracking-tight text-primary-deep sm:text-4xl">
            {planner.heading}
          </h2>
          <p className="mt-4 text-ink-muted">{planner.intro}</p>
        </div>

        <div className="mt-12 grid items-start gap-8 lg:grid-cols-12">
          <form
            className="grid gap-6 rounded-lg bg-surface p-6 shadow-card sm:p-8 lg:col-span-7"
            aria-label="Cohort requirements"
            onSubmit={(event) => event.preventDefault()}
          >
            <ChipGroup
              name="capacity"
              legend={planner.capacityLegend}
              options={planner.capacityOptions}
              value={capacity}
              onChange={setCapacity}
            />
            <ChipGroup
              name="batch"
              legend={planner.batchLegend}
              options={planner.batchOptions}
              value={batch}
              onChange={setBatch}
            />
            <fieldset>
              <legend className={legendClass}>{planner.focusLegend}</legend>
              <div className="mt-2 grid gap-1.5 sm:grid-cols-2">
                {planner.focusAreas.map((area) => (
                  <label
                    key={area}
                    className="flex min-h-11 cursor-pointer items-center gap-2 rounded bg-surface-raised px-2 py-1.5 text-xs text-ink"
                  >
                    <input
                      type="checkbox"
                      checked={focusAreas.includes(area)}
                      onChange={() => toggleFocus(area)}
                      className="size-4 shrink-0 accent-primary-deep"
                    />
                    {area}
                  </label>
                ))}
              </div>
            </fieldset>
          </form>

          <div className="grid gap-4 rounded-lg bg-primary-deep p-6 text-white shadow-lg sm:p-8 lg:col-span-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-gold">{planner.output.eyebrow}</h3>
              <span className="rounded bg-white/20 px-2 py-0.5 text-xs font-semibold">{planner.output.badge}</span>
            </div>

            <dl aria-live="polite" className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <dt className="text-xs text-white/80">{planner.output.formatLabel}</dt>
                <dd className="mt-1 text-xl font-bold leading-snug sm:text-2xl">{result.format}</dd>
              </div>
              <div className="rounded bg-white/10 p-3">
                <dt className="text-xs text-white/80">{planner.output.ratioLabel}</dt>
                <dd className="text-2xl font-bold text-gold sm:text-3xl">{result.ratio}</dd>
                <dd className="text-xs text-white/80">{result.ratioNote}</dd>
              </div>
              <div className="rounded bg-white/10 p-3">
                <dt className="text-xs text-white/80">{planner.output.batchesLabel}</dt>
                <dd className="text-2xl font-bold sm:text-3xl">{result.batches}</dd>
                <dd className="text-xs text-white/80">{result.batchNote}</dd>
              </div>
            </dl>

            <p className="rounded bg-white/10 p-3 text-xs text-white/80">
              <span className="block font-semibold text-gold">{planner.output.complianceLead}</span>
              {planner.output.compliance}
            </p>

            <Button
              asChild
              size="lg"
              className="h-auto min-h-11 whitespace-normal bg-gold py-2.5 text-primary-deep hover:bg-gold/90"
            >
              <a href={whatsappUrl(buildCohortMessage(input))} target="_blank" rel="noopener noreferrer">
                <MessageCircle aria-hidden="true" />
                {planner.output.cta}
                <span className="sr-only"> (opens WhatsApp in a new tab)</span>
              </a>
            </Button>
            <p className="-mt-2 text-center text-xs text-white/70">{planner.output.ctaNote}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
