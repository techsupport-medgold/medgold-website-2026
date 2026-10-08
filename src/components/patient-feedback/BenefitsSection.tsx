import { CircleCheck, NotebookPen, Send, Star, StarHalf } from "lucide-react";
import Card from "@@/components/ui/card";
import IconBadge from "@@/components/ui/icon-badge";
import Reveal from "@@/components/ui/reveal";
import Section from "@@/components/ui/section";
import SectionHeader from "@@/components/ui/section-header";
import { benefits } from "@@/data/patientFeedback";
import { stagger } from "@@/lib/motion";
import { cn } from "@@/lib/utils";

export default function BenefitsSection() {
  const { survey } = benefits;

  return (
    <Section tone="raised" aria-labelledby="benefits-heading">
      <SectionHeader
        id="benefits-heading"
        eyebrow={benefits.eyebrow}
        title={benefits.heading}
        intro={benefits.intro}
        align="center"
      />

      <div className="mt-14 grid items-center gap-10 lg:grid-cols-12">
        <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
          {benefits.items.map((item, index) => {
            const gold = "gold" in item && item.gold;
            return (
              <Reveal as="li" key={item.title} delay={stagger(index)}>
                <Card
                  padding="sm"
                  interactive
                  className={cn("group h-full gap-4 overflow-hidden", gold && "ring-1 ring-inset ring-gold/40")}
                >
                  <span
                    className={cn("absolute inset-y-0 left-0 w-1", gold ? "bg-gold" : "bg-primary")}
                    aria-hidden="true"
                  />
                  <IconBadge icon={CircleCheck} tone={gold ? "gold" : "soft"} />
                  <div>
                    <h3 className="text-lg font-bold leading-snug text-primary-deep">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.text}</p>
                  </div>
                </Card>
              </Reveal>
            );
          })}
        </ul>

        <Reveal className="relative isolate lg:col-span-5">
          <div
            className="absolute -inset-3 -z-10 -rotate-2 rounded-[1.75rem] bg-gradient-to-br from-primary/20 via-gold/10 to-gold/30 sm:-inset-4"
            aria-hidden="true"
          />
          <figure className="relative rounded-card bg-surface p-6 shadow-card-hover ring-1 ring-black/5 sm:p-8">
            <figcaption className="sr-only">{survey.caption}</figcaption>
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border-muted pb-4">
              <p className="flex items-center gap-2 font-display text-lg font-bold text-primary-deep">
                <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary" aria-hidden="true">
                  <NotebookPen className="size-4" />
                </span>
                {survey.title}
              </p>
              <span className="rounded-pill bg-gold px-2.5 py-0.5 text-[11px] font-bold text-ink">{survey.badge}</span>
            </div>
            <div className="mt-6 text-center">
              <p className="text-sm font-semibold text-ink-muted">{survey.question}</p>
              <p className="mt-3 flex justify-center gap-1.5 text-gold-ink" aria-hidden="true">
                {[0, 1, 2, 3].map((star) => (
                  <Star key={star} className="size-7 fill-gold/40" />
                ))}
                <StarHalf className="size-7 fill-gold/40" />
              </p>
              <p className="mt-2 text-xs font-semibold text-ink-muted">{survey.rating}</p>
            </div>
            <dl className="mt-6 grid gap-4">
              {survey.bars.map((bar) => (
                <div key={bar.label} className="grid grid-cols-[1fr_auto] gap-x-2 text-xs font-semibold">
                  <dt className="text-ink">{bar.label}</dt>
                  <dd className="text-primary-deep">{bar.value}</dd>
                  <dd className="col-span-2 mt-1.5 h-2 overflow-hidden rounded-full bg-surface-muted" aria-hidden="true">
                    <span
                      className="reveal-bar block h-full rounded-full bg-gradient-to-r from-primary to-teal-300"
                      style={{ width: `${bar.percent}%` }}
                    />
                  </dd>
                </div>
              ))}
            </dl>
            <div
              className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-primary-deep py-3 text-xs font-bold uppercase tracking-wide text-white"
              aria-hidden="true"
            >
              <Send className="size-3.5" />
              {survey.button}
            </div>
          </figure>
        </Reveal>
      </div>
    </Section>
  );
}
