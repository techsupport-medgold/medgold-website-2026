import { cn } from "@@/lib/utils";

type StatsBarProps = {
  label: string;
  stats: readonly { value: string; label: string; detail: string }[];
  alternate?: boolean;
};

export default function StatsBar({ label, stats, alternate = false }: StatsBarProps) {
  return (
    <section aria-label={label} className="bg-primary-deep py-8">
      <dl className="container grid grid-cols-2 gap-6 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div key={stat.label} className="flex min-w-0 flex-col">
            <dt className="order-2 text-sm font-semibold text-white">{stat.label}</dt>
            <dd
              className={cn(
                "order-1 text-3xl font-bold tracking-tight sm:text-5xl",
                alternate && index % 2 === 0 ? "text-white" : "text-gold",
              )}
            >
              {stat.value}
            </dd>
            <dd className="order-3 mt-0.5 text-xs text-white/75">{stat.detail}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
