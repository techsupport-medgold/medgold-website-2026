"use client";

import { useState } from "react";
import { BadgeCheck, ClipboardList, Zap } from "lucide-react";
import { Button } from "@@/components/ui/button";
import { whatsappUrl } from "@@/config/site";
import { estimator } from "@@/data/patientFeedback";
import {
  buildEstimatorMessage,
  DEFAULT_ESTIMATE_INPUT,
  estimateDeployment,
  type FeedbackCapacityId,
  type TouchpointId,
} from "@@/lib/feedbackEstimator";

const legendClass = "text-sm font-semibold text-primary-deep";
const chipClass =
  "flex min-h-11 cursor-pointer items-center justify-center rounded px-3 py-2 text-center text-xs font-semibold transition-colors bg-surface-raised text-primary-deep hover:bg-primary/10 has-[:checked]:bg-primary-deep has-[:checked]:text-white has-[:focus-visible]:ring-[3px] has-[:focus-visible]:ring-ring/50";
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
    <section aria-labelledby="estimator-heading" className="bg-surface-raised py-16 sm:py-20">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-gold-ink">{estimator.eyebrow}</p>
          <h2 id="estimator-heading" className="mt-2 text-3xl font-bold tracking-tight text-primary-deep sm:text-4xl">
            {estimator.heading}
          </h2>
          <p className="mt-3 text-ink-muted">{estimator.intro}</p>
        </div>

        <div className="mt-12 grid items-start gap-8 rounded-lg bg-surface p-6 shadow-card sm:p-8 lg:grid-cols-12">
          <form
            className="grid gap-6 lg:col-span-7"
            aria-label="Feedback infrastructure requirements"
            onSubmit={(event) => event.preventDefault()}
          >
            <fieldset>
              <legend className={legendClass}>{estimator.capacityLegend}</legend>
              <div className="mt-2 grid grid-cols-2 gap-1.5 sm:grid-cols-4">
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
              <div className="mt-2 grid gap-1.5 sm:grid-cols-2">
                {estimator.touchpointOptions.map((option) => (
                  <label
                    key={option.id}
                    className="flex min-h-11 cursor-pointer items-center gap-2 rounded bg-surface-raised px-2 py-1.5 text-xs text-ink"
                  >
                    <input
                      type="checkbox"
                      checked={touchpoints.includes(option.id)}
                      onChange={() => toggleTouchpoint(option.id)}
                      className="size-4 shrink-0 accent-primary-deep"
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            </fieldset>

            <div>
              <h3 className={legendClass}>{estimator.protocolHeading}</h3>
              <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
                {estimator.protocols.map((protocol, index) => {
                  const Icon = PROTOCOL_ICONS[index % PROTOCOL_ICONS.length];
                  return (
                    <li
                      key={protocol}
                      className="flex min-h-11 items-center gap-2 rounded bg-surface-raised px-2 py-1.5 text-xs text-ink"
                    >
                      <Icon className="size-4 shrink-0 text-gold-ink" aria-hidden="true" />
                      {protocol}
                    </li>
                  );
                })}
              </ul>
            </div>
          </form>

          <div className="grid gap-4 rounded-lg bg-surface-raised p-6 lg:col-span-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-sm font-semibold text-primary-deep">{output.heading}</h3>
              <span className="rounded-sm bg-gold-ink px-1.5 py-0.5 text-[11px] font-semibold text-white">
                {output.badge}
              </span>
            </div>

            <dl aria-live="polite" className="grid gap-2">
              {rows.map((row) => (
                <div key={row.label} className="flex flex-wrap items-baseline justify-between gap-x-3">
                  <dt className="text-xs text-ink-muted">{row.label}</dt>
                  <dd className={row.gold ? "text-sm font-semibold text-gold-ink" : "text-sm font-semibold text-primary-deep"}>
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>

            <Button asChild size="lg" className="mt-2 h-auto min-h-12 whitespace-normal py-3 hover:bg-primary-deep">
              <a href={whatsappUrl(buildEstimatorMessage(input))} target="_blank" rel="noopener noreferrer">
                <BadgeCheck aria-hidden="true" />
                {output.cta}
                <span className="sr-only"> (opens WhatsApp in a new tab)</span>
              </a>
            </Button>
            <p className="-mt-2 text-center text-xs text-ink-subtle">{output.ctaNote}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
