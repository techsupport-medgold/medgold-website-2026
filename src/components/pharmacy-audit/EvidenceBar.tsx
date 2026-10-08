import CountUp from "@@/components/ui/count-up";
import Reveal from "@@/components/ui/reveal";
import { evidenceStats } from "@@/data/pharmacyAudit";
import { stagger } from "@@/lib/motion";
import { cn } from "@@/lib/utils";

export default function EvidenceBar() {
  return (
    <section aria-label="Results at a glance" className="brand-dark py-10 sm:py-12">
      <dl className="container grid grid-cols-2 gap-y-8 lg:grid-cols-4">
        {evidenceStats.map((stat, index) => (
          <Reveal
            key={stat.label}
            delay={stagger(index)}
            className={cn(
              "group flex flex-col items-center border-white/15 px-4 text-center",
              index % 2 === 1 && "border-l",
              index > 0 && "lg:border-l",
            )}
          >
            <dt className="order-2 mt-2 text-sm text-white/80">{stat.label}</dt>
            <dd className="order-1 font-display text-3xl font-extrabold tracking-tight text-gold transition-transform duration-300 ease-spring group-hover:scale-105 sm:text-4xl lg:text-5xl">
              <CountUp value={stat.value} />
            </dd>
            <span className="order-3 mt-3 h-0.5 w-8 rounded-full bg-gold/40 transition-all duration-300 group-hover:w-14 group-hover:bg-gold" aria-hidden="true" />
          </Reveal>
        ))}
      </dl>
    </section>
  );
}
