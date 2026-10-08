import {
  Archive,
  CalendarX2,
  ChartLine,
  ChartNoAxesColumnDecreasing,
  ClipboardX,
  Gauge,
  HeartHandshake,
  PackageMinus,
  ShieldCheck,
  ShoppingCart,
  TrendingDown,
  TrendingUp,
  UserX,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { problems, results, type ProblemIcon, type ResultIcon } from "@@/data/pharmacyAudit";

const PROBLEM_ICONS: Record<ProblemIcon, LucideIcon> = {
  "dead-stock": Archive,
  expired: CalendarX2,
  "slow-moving": TrendingDown,
  staff: UserX,
  purchase: ShoppingCart,
  leakage: ChartNoAxesColumnDecreasing,
  sop: ClipboardX,
  kpi: Gauge,
};

const RESULT_ICONS: Record<ResultIcon, LucideIcon> = {
  profit: TrendingUp,
  inventory: PackageMinus,
  staff: Users,
  cash: Wallet,
  retention: HeartHandshake,
  control: ShieldCheck,
};

export default function ProblemsSection() {
  return (
    <section aria-labelledby="problems-heading" className="bg-surface py-16 sm:py-20">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold-ink">
            <span className="h-0.5 w-6 bg-gold-ink" aria-hidden="true" />
            {problems.eyebrow}
          </p>
          <h2 id="problems-heading" className="mt-4 text-3xl font-bold tracking-tight text-primary-deep sm:text-4xl">
            {problems.heading}
          </h2>
          <p className="mt-4 text-ink-muted">{problems.intro}</p>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {problems.cards.map((card) => {
            const Icon = PROBLEM_ICONS[card.icon];
            return (
              <li
                key={card.title}
                className="rounded-xl border border-border-muted bg-surface p-5 shadow-card transition-shadow hover:shadow-lg"
              >
                <span className="flex size-10 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-base font-bold text-primary-deep">{card.title}</h3>
                <p className="mt-1.5 text-sm text-ink-muted">{card.description}</p>
              </li>
            );
          })}
        </ul>

        <div className="mt-12 grid gap-8 rounded-2xl bg-surface-raised p-6 sm:p-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <h3 className="flex items-center gap-2 text-xl font-bold text-primary-deep">
              <ChartLine className="size-5 text-gold-ink" aria-hidden="true" />
              {results.heading}
            </h3>
            <blockquote className="mt-3 border-l-2 border-gold-ink pl-4 text-ink-muted italic">
              {results.quote}
            </blockquote>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2 lg:col-span-7 lg:grid-cols-3">
            {results.items.map((item) => {
              const Icon = RESULT_ICONS[item.icon];
              return (
                <li
                  key={item.label}
                  className="flex items-center gap-2.5 rounded-lg bg-surface p-3 text-sm font-semibold text-primary-deep shadow-sm"
                >
                  <Icon className="size-4 shrink-0 text-primary" aria-hidden="true" />
                  {item.label}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}