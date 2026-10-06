import { trustMetrics } from "@@/data/home";

export default function TrustMetrics() {
  return (
    <section aria-label="Med Gold at a glance" className="bg-surface pb-4">
      <div className="container">
        <dl className="-mt-2 grid grid-cols-2 gap-x-6 gap-y-8 rounded-2xl border border-border-muted bg-surface p-6 shadow-card sm:p-8 lg:grid-cols-4">
          {trustMetrics.map((metric) => (
            <div key={metric.eyebrow} className="flex flex-col">
              <dt className="order-1 text-[11px] font-semibold uppercase tracking-wider text-gold-ink">
                {metric.eyebrow}
              </dt>
              <dd className="order-2 mt-1 text-3xl font-semibold tracking-tight text-primary-deep sm:text-4xl">
                {metric.value}
              </dd>
              <dd className="order-3 mt-1 text-sm text-ink-muted">{metric.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
