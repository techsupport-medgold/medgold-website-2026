import CountUp from "@@/components/ui/count-up";
import Reveal from "@@/components/ui/reveal";
import { stagger } from "@@/lib/motion";
import { cn } from "@@/lib/utils";

type StatsBarProps = {
  label: string;
  stats: readonly { value: string; label: string; detail: string }[];
  alternate?: boolean;
};

export default function StatsBar({ label, stats, alternate = false }: StatsBarProps) {
  return (
    <section aria-label={label} className="brand-dark py-10 sm:py-12">
      <dl className="container grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4 lg:divide-x lg:divide-white/10">
        {stats.map((stat, index) => (
          <Reveal key={stat.label} delay={stagger(index)} className="flex min-w-0 flex-col lg:px-6 lg:first:pl-0">
            <dt className="order-2 mt-1 text-sm font-semibold text-white">{stat.label}</dt>
            <dd
              className={cn(
                "order-1 font-display text-3xl font-extrabold tracking-tight sm:text-5xl",
                alternate && index % 2 === 0 ? "text-white" : "text-gold",
              )}
            >
              <CountUp value={stat.value} />
            </dd>
            <dd className="order-3 mt-0.5 text-xs text-white/75">{stat.detail}</dd>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}
