import { CircleCheck, NotebookPen, Send, Star, StarHalf } from "lucide-react";
import { benefits } from "@@/data/patientFeedback";
import { cn } from "@@/lib/utils";

export default function BenefitsSection() {
  const { survey } = benefits;

  return (
    <section aria-labelledby="benefits-heading" className="bg-surface py-16 sm:py-20">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-gold-ink">{benefits.eyebrow}</p>
          <h2
            id="benefits-heading"
            className="mt-2 text-3xl font-bold uppercase tracking-tight text-primary-deep sm:text-4xl"
          >
            {benefits.heading}
          </h2>
          <p className="mt-3 text-ink-muted">{benefits.intro}</p>
        </div>

        <div className="mt-12 grid items-center gap-8 lg:grid-cols-12">
          <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {benefits.items.map((item) => (
              <li
                key={item.title}
                className={cn(
                  "flex gap-2 rounded-lg border-l-4 bg-surface-raised p-6 shadow-sm",
                  "gold" in item && item.gold ? "border-l-gold-ink" : "border-l-primary-deep",
                )}
              >
                <CircleCheck
                  className={cn(
                    "mt-0.5 size-5 shrink-0",
                    "gold" in item && item.gold ? "text-gold-ink" : "text-primary-deep",
                  )}
                  aria-hidden="true"
                />
                <div>
                  <h3 className="text-lg font-bold leading-snug text-primary-deep">{item.title}</h3>
                  <p className="mt-1 text-xs text-ink-muted">{item.text}</p>
                </div>
              </li>
            ))}
          </ul>

          <figure className="rounded-2xl border-2 border-primary/15 bg-surface p-6 shadow-lg sm:p-8 lg:col-span-5">
            <figcaption className="sr-only">{survey.caption}</figcaption>
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-primary/15 pb-2">
              <p className="flex items-center gap-1.5 text-lg font-bold text-primary-deep">
                <NotebookPen className="size-5" aria-hidden="true" />
                {survey.title}
              </p>
              <span className="rounded-sm bg-gold px-1.5 py-0.5 text-[11px] font-semibold text-primary-deep">
                {survey.badge}
              </span>
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm font-semibold text-ink-muted">{survey.question}</p>
              <p className="mt-1 flex justify-center gap-1 text-gold-ink" aria-hidden="true">
                {[0, 1, 2, 3].map((star) => (
                  <Star key={star} className="size-6" />
                ))}
                <StarHalf className="size-6" />
              </p>
              <p className="mt-1 text-[11px] font-semibold text-ink-subtle">{survey.rating}</p>
            </div>
            <dl className="mt-4 grid gap-2">
              {survey.bars.map((bar) => (
                <div key={bar.label} className="grid grid-cols-[1fr_auto] gap-x-2 text-xs font-semibold">
                  <dt className="text-ink">{bar.label}</dt>
                  <dd className="text-primary-deep">{bar.value}</dd>
                  <dd className="col-span-2 mt-1 h-2 overflow-hidden rounded-full bg-primary/10" aria-hidden="true">
                    <span className="block h-full rounded-full bg-primary-deep" style={{ width: `${bar.percent}%` }} />
                  </dd>
                </div>
              ))}
            </dl>
            <div
              className="mt-5 flex items-center justify-center gap-1.5 rounded bg-primary-deep py-2 text-xs font-semibold uppercase tracking-wide text-white"
              aria-hidden="true"
            >
              <Send className="size-3.5" />
              {survey.button}
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}
