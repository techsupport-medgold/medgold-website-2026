import { evidenceStats } from "@@/data/pharmacyAudit";
import { cn } from "@@/lib/utils";

export default function EvidenceBar() {
  return (
    <section aria-label="Results at a glance" className="bg-primary-deep py-8">
      <dl className="container grid grid-cols-2 gap-y-6 lg:grid-cols-4">
        {evidenceStats.map((stat, index) => (
          <div
            key={stat.label}
            className={cn(
              "flex flex-col items-center border-white/15 px-4 text-center",
              index % 2 === 1 && "border-l",
              index > 0 && "lg:border-l",
            )}
          >
            <dt className="order-2 mt-1 text-sm text-white/80">{stat.label}</dt>
            <dd className="order-1 text-3xl font-bold tracking-tight text-gold sm:text-4xl">{stat.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
