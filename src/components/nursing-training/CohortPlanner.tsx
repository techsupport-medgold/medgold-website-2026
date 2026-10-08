"use client";

import { useState } from "react";
import { ArrowRight, Check, ClipboardCheck, MessageCircle, ShieldCheck } from "lucide-react";
import { Button } from "@@/components/ui/button";
import Card from "@@/components/ui/card";
import Pill from "@@/components/ui/pill";
import Reveal from "@@/components/ui/reveal";
import Section from "@@/components/ui/section";
import SectionHeader from "@@/components/ui/section-header";
import { whatsappUrl } from "@@/config/site";
import { planner } from "@@/data/nursingTraining";
import {
  buildCohortMessage,
  DEFAULT_COHORT,
  recommendCohort,
  type BatchId,
  type CapacityId,
} from "@@/lib/ojtPlanner";

const legendClass = "text-sm font-bold text-primary-deep";
const focusRingClass = "has-[:focus-visible]:ring-[3px] has-[:focus-visible]:ring-ring/50";
const chipClass = `group relative flex min-h-12 cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-border-muted bg-surface px-3 py-2 text-center text-xs font-semibold text-primary-deep transition-all duration-200 ease-out-expo hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-card active:scale-[0.97] motion-reduce:transform-none has-[:checked]:border-primary-deep has-[:checked]:bg-primary-deep has-[:checked]:text-white has-[:checked]:shadow-card-hover ${focusRingClass}`;
const resultAnimClass = "animate-in fade-in-0 slide-in-from-bottom-1 duration-500";

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
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
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
            <Check
              className="hidden size-3.5 shrink-0 text-gold group-has-[:checked]:block group-has-[:checked]:animate-in group-has-[:checked]:zoom-in-50"
              aria-hidden="true"
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
    <Section tone="muted" aria-labelledby="planner-heading">
      <SectionHeader
        id="planner-heading"
        eyebrow={planner.eyebrow}
        title={planner.heading}
        intro={planner.intro}
        align="center"
      />

      <div className="mt-12 grid items-start gap-8 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <Card variant="elevated" padding="none" className="overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-primary-deep via-primary to-gold" aria-hidden="true" />
            <form
              className="grid gap-8 p-6 sm:p-8"
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
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {planner.focusAreas.map((area) => (
                    <label
                      key={area}
                      className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border border-border-muted bg-surface-raised px-3 py-2 text-sm text-ink transition-colors duration-200 hover:border-primary/40 hover:bg-primary/5 has-[:checked]:border-primary/40 has-[:checked]:bg-primary/10 has-[:checked]:font-semibold has-[:checked]:text-primary-deep ${focusRingClass}`}
                    >
                      <input
                        type="checkbox"
                        checked={focusAreas.includes(area)}
                        onChange={() => toggleFocus(area)}
                        className="size-4 shrink-0 cursor-pointer accent-primary-deep focus-visible:outline-none"
                      />
                      {area}
                    </label>
                  ))}
                </div>
              </fieldset>
            </form>
          </Card>
        </Reveal>

        <Reveal delay={120} className="lg:sticky lg:top-28 lg:col-span-5">
          <div className="brand-dark grid gap-5 rounded-card p-6 shadow-card-hover sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-5">
              <h3 className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.14em] text-gold">
                <span className="status-dot" aria-hidden="true" />
                {planner.output.eyebrow}
              </h3>
              <Pill tone="dark">{planner.output.badge}</Pill>
            </div>

            <dl aria-live="polite" aria-atomic="true" className="grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <dt className="text-xs font-semibold uppercase tracking-wider text-white/75">{planner.output.formatLabel}</dt>
                <dd key={result.format} className={`mt-1.5 font-display text-xl font-bold leading-snug text-white sm:text-2xl ${resultAnimClass}`}>
                  {result.format}
                </dd>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.06] p-4 transition-colors duration-300 hover:border-gold/40">
                <dt className="text-xs text-white/75">{planner.output.ratioLabel}</dt>
                <dd
                  key={result.ratio}
                  className={`mt-1 font-display text-3xl font-extrabold tracking-tight text-gold sm:text-4xl ${resultAnimClass}`}
                >
                  {result.ratio}
                </dd>
                <dd className="mt-1 text-xs text-white/75">{result.ratioNote}</dd>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.06] p-4 transition-colors duration-300 hover:border-gold/40">
                <dt className="text-xs text-white/75">{planner.output.batchesLabel}</dt>
                <dd
                  key={result.batches}
                  className={`mt-1 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl ${resultAnimClass}`}
                >
                  {result.batches}
                </dd>
                <dd className="mt-1 text-xs text-white/75">{result.batchNote}</dd>
              </div>
            </dl>

            <p className="flex items-start gap-3 rounded-xl bg-white/[0.06] p-4 text-xs leading-relaxed text-white/80">
              <ShieldCheck className="mt-0.5 size-5 shrink-0 text-gold" aria-hidden="true" />
              <span>
                <span className="block font-semibold text-gold">{planner.output.complianceLead}</span>
                {planner.output.compliance}
              </span>
            </p>

            <div>
              <Button
                asChild
                size="lg"
                variant="accent"
                className="h-auto min-h-12 w-full whitespace-normal px-5 py-3 text-center text-sm font-semibold"
              >
                <a href={whatsappUrl(buildCohortMessage(input))} target="_blank" rel="noopener noreferrer">
                  <MessageCircle aria-hidden="true" />
                  {planner.output.cta}
                  <span className="sr-only"> (opens WhatsApp in a new tab)</span>
                  <ArrowRight aria-hidden="true" />
                </a>
              </Button>
              <p className="mt-2 flex items-center justify-center gap-1.5 text-center text-xs text-white/75">
                <ClipboardCheck className="size-3.5 shrink-0" aria-hidden="true" />
                {planner.output.ctaNote}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
