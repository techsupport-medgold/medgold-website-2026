"use client";

import { useState } from "react";
import { ArrowRight, BadgeCheck, Check, ClipboardList, Zap } from "lucide-react";
import { Button } from "@@/components/ui/button";
import Reveal from "@@/components/ui/reveal";
import Section from "@@/components/ui/section";
import SectionHeader from "@@/components/ui/section-header";
import { whatsappUrl } from "@@/config/site";
import { estimator } from "@@/data/patientFeedback";
import {
  buildEstimatorMessage,
  DEFAULT_ESTIMATE_INPUT,
  estimateDeployment,
  type FeedbackCapacityId,
  type TouchpointId,
} from "@@/lib/feedbackEstimator";

const legendClass = "font-display text-base font-bold text-primary-deep";
const optionFocusClass = "has-[:focus-visible]:ring-[3px] has-[:focus-visible]:ring-ring/50";
const chipClass = `flex min-h-12 cursor-pointer items-center justify-center rounded-xl border border-border-muted bg-surface px-3 py-2 text-center text-sm font-semibold text-primary-deep shadow-sm transition-all duration-200 ease-out-expo hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-card active:scale-[0.97] has-[:checked]:border-primary has-[:checked]:bg-primary has-[:checked]:text-white has-[:checked]:shadow-card motion-reduce:transform-none ${optionFocusClass}`;
const checkClass = `group flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border border-border-muted bg-surface px-3 py-2 text-sm text-ink shadow-sm transition-colors duration-200 hover:border-primary/40 hover:bg-primary/[0.03] has-[:checked]:border-primary/50 has-[:checked]:bg-primary/[0.06] ${optionFocusClass}`;
const PROTOCOL_ICONS = [Zap, ClipboardList] as const;

export default function FeedbackEstimator() {
  const [capacity, setCapacity] = useState<FeedbackCapacityId>(DEFAULT_ESTIMATE_INPUT.capacity);
  const [touchpoints, setTouchpoints] = useState<TouchpointId[]>([...DEFAULT_ESTIMATE_INPUT.touchpoints]);

  const input = { capacity, touchpoints };
  const result = estimateDeployment(input);
  const { output } = estimator;

  const rows = [
    { label: output.tabletsLabel, value: result.tablets },
    { label: output.coordinatorsLabel, value: result.coordinators },
    { label: output.slaLabel, value: result.sla, gold: true },
    { label: output.npsLabel, value: result.npsUplift },
    { label: output.accreditationLabel, value: result.accreditation },
  ];

  const toggleTouchpoint = (id: TouchpointId) =>
    setTouchpoints((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : estimator.touchpointOptions.map((option) => option.id).filter((item) => item === id || current.includes(item)),
    );

  return (
    <Section aria-labelledby="estimator-heading">
      <SectionHeader
        id="estimator-heading"
        eyebrow={estimator.eyebrow}
        title={estimator.heading}
        intro={estimator.intro}
        align="center"
      />

      <Reveal className="mt-12 grid items-stretch gap-6 rounded-[1.75rem] border border-border-muted bg-surface-raised p-4 shadow-card-hover sm:p-6 lg:grid-cols-12 lg:gap-8 lg:p-8">
        <form
          className="grid content-start gap-8 p-2 sm:p-4 lg:col-span-7"
          aria-label="Feedback infrastructure requirements"
          onSubmit={(event) => event.preventDefault()}
        >
          <fieldset>
            <legend className={legendClass}>{estimator.capacityLegend}</legend>
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {estimator.capacityOptions.map((option) => (
                <label key={option.id} className={chipClass}>
                  <input
                    type="radio"
                    name="feedback-capacity"
                    value={option.id}
                    checked={capacity === option.id}
                    onChange={() => setCapacity(option.id)}
                    className="sr-only"
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className={legendClass}>{estimator.touchpointLegend}</legend>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {estimator.touchpointOptions.map((option) => (
                <label key={option.id} className={checkClass}>
                  <input
                    type="checkbox"
                    checked={touchpoints.includes(option.id)}
                    onChange={() => toggleTouchpoint(option.id)}
                    className="peer sr-only"
                  />
                  <span
                    className="flex size-5 shrink-0 items-center justify-center rounded-md border-2 border-primary/40 bg-surface text-transparent transition-all duration-200 ease-spring group-hover:border-primary peer-checked:scale-110 peer-checked:border-primary peer-checked:bg-primary peer-checked:text-white motion-reduce:transform-none"
                    aria-hidden="true"
                  >
                    <Check className="size-3.5" strokeWidth={3} />
                  </span>
                  {option.label}
                </label>
              ))}
            </div>
          </fieldset>

          <div>
            <h3 className={legendClass}>{estimator.protocolHeading}</h3>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {estimator.protocols.map((protocol, index) => {
                const Icon = PROTOCOL_ICONS[index % PROTOCOL_ICONS.length];
                return (
                  <li
                    key={protocol}
                    className="flex min-h-12 items-center gap-3 rounded-xl border border-gold/30 bg-gold/10 px-3 py-2 text-sm text-ink"
                  >
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-gold text-ink" aria-hidden="true">
                      <Icon className="size-4" />
                    </span>
                    {protocol}
                  </li>
                );
              })}
            </ul>
          </div>
        </form>

        <div className="brand-dark flex flex-col gap-5 rounded-card p-6 shadow-card-hover sm:p-8 lg:col-span-5">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4">
            <h3 className="flex items-center gap-2.5 font-display text-lg font-bold text-white">
              <span className="status-dot" aria-hidden="true" />
              {output.heading}
            </h3>
            <span className="rounded-pill bg-gold px-2.5 py-0.5 text-[11px] font-bold text-ink">{output.badge}</span>
          </div>

          <dl aria-live="polite" className="grid gap-3">
            {rows.map((row) => (
              <div
                key={row.label}
                className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3"
              >
                <dt className="text-xs text-white/80">{row.label}</dt>
                <dd
                  className={
                    row.gold
                      ? "font-display text-base font-bold text-gold"
                      : "font-display text-base font-bold text-white"
                  }
                >
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-auto grid gap-3 pt-2">
            <Button
              asChild
              size="lg"
              variant="accent"
              className="h-auto min-h-12 shrink whitespace-normal px-6 py-3 font-semibold"
            >
              <a href={whatsappUrl(buildEstimatorMessage(input))} target="_blank" rel="noopener noreferrer">
                <BadgeCheck aria-hidden="true" />
                {output.cta}
                <span className="sr-only"> (opens WhatsApp in a new tab)</span>
                <ArrowRight aria-hidden="true" />
              </a>
            </Button>
            <p className="text-center text-xs text-white/75">{output.ctaNote}</p>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
