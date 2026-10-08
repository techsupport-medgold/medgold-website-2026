import CountUp from "@@/components/ui/count-up";
import Reveal from "@@/components/ui/reveal";
import { stagger } from "@@/lib/motion";
import { trustMetrics } from "@@/data/home";

export default function TrustMetrics() {
  return (
    <section aria-label="Med Gold at a glance" className="relative z-10 bg-surface pb-4">
      <div className="container">
        <dl className="-mt-12 grid grid-cols-2 gap-x-6 gap-y-8 rounded-card border border-border-muted bg-surface p-6 shadow-card-hover sm:p-8 lg:grid-cols-4 lg:divide-x lg:divide-border-muted">
          {trustMetrics.map((metric, index) => (
            <Reveal key={metric.eyebrow} delay={stagger(index)} className="flex flex-col lg:px-6 lg:first:pl-0">
              <dt className="order-1 text-[11px] font-bold uppercase tracking-[0.14em] text-gold-ink">{metric.eyebrow}</dt>
              <dd className="order-2 mt-1 font-display text-3xl font-extrabold tracking-tight text-primary-deep sm:text-4xl">
                <CountUp value={metric.value} />
              </dd>
              <dd className="order-3 mt-1 text-sm text-ink-muted">{metric.label}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
