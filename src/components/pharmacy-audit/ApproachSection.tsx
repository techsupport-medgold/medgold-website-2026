import { approach } from "@@/data/pharmacyAudit";
import { cn } from "@@/lib/utils";

export default function ApproachSection() {
  const lastIndex = approach.stages.length - 1;

  return (
    <section aria-labelledby="approach-heading" className="bg-surface-muted py-16 sm:py-20">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold-ink">
            <span className="h-0.5 w-6 bg-gold-ink" aria-hidden="true" />
            {approach.eyebrow}
          </p>
          <h2 id="approach-heading" className="mt-4 text-3xl font-bold tracking-tight text-primary-deep sm:text-4xl">
            {approach.heading}
          </h2>
          <p className="mt-4 text-ink-muted">{approach.intro}</p>
        </div>

        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {approach.stages.map((stage, index) => (
            <li key={stage.title} className="rounded-xl bg-surface p-5 text-center shadow-card">
              <span
                className={cn(
                  "mx-auto flex size-12 items-center justify-center rounded-full text-base font-bold",
                  index === lastIndex ? "bg-gold text-primary-deep" : "bg-primary-deep text-white",
                )}
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-lg font-bold text-primary-deep">
                <span className="sr-only">Stage {index + 1}: </span>
                {stage.title}
              </h3>
              <p className="mt-1.5 text-sm text-ink-muted">{stage.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
