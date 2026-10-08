import { impactStats } from "@@/data/staffing";

export default function ImpactBar() {
  return (
    <section aria-label="Staffing impact" className="bg-primary-deep py-8">
      <dl className="container grid grid-cols-2 gap-6 lg:grid-cols-4">
        {impactStats.map((stat) => (
          <div key={stat.label} className="flex min-w-0 flex-col">
            <dt className="order-2 text-sm font-semibold text-white">{stat.label}</dt>
            <dd className="order-1 text-3xl font-bold tracking-tight text-gold sm:text-5xl">{stat.value}</dd>
            <dd className="order-3 mt-0.5 text-xs text-white/75">{stat.detail}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
