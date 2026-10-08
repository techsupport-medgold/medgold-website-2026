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
import Card from "@@/components/ui/card";
import IconBadge from "@@/components/ui/icon-badge";
import Reveal from "@@/components/ui/reveal";
import Section from "@@/components/ui/section";
import SectionHeader from "@@/components/ui/section-header";
import { problems, results, type ProblemIcon, type ResultIcon } from "@@/data/pharmacyAudit";
import { stagger } from "@@/lib/motion";

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
    <Section aria-labelledby="problems-heading">
      <SectionHeader
        id="problems-heading"
        eyebrow={problems.eyebrow}
        title={problems.heading}
        intro={problems.intro}
        align="center"
      />

      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {problems.cards.map((card, index) => (
          <Reveal as="li" key={card.title} delay={stagger(index % 4)}>
            <Card padding="sm" interactive className="group h-full overflow-hidden hover:border-destructive/30">
              <span
                className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-destructive/70 transition-transform duration-500 ease-out-expo group-hover:scale-x-100"
                aria-hidden="true"
              />
              <IconBadge icon={PROBLEM_ICONS[card.icon]} size="sm" className="bg-destructive/10 text-destructive" />
              <h3 className="mt-4 text-base font-bold text-primary-deep">{card.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-subtle">{card.description}</p>
            </Card>
          </Reveal>
        ))}
      </ul>

      <Reveal className="brand-dark mt-14 grid gap-8 rounded-[1.75rem] p-6 shadow-card-hover sm:p-10 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5">
          <h3 className="flex items-center gap-2.5 font-display text-2xl font-bold text-white">
            <ChartLine className="size-6 text-gold" aria-hidden="true" />
            {results.heading}
          </h3>
          <blockquote className="mt-4 border-l-2 border-gold pl-4 text-lg leading-relaxed text-white/85 italic">
            {results.quote}
          </blockquote>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2 lg:col-span-7 lg:grid-cols-3">
          {results.items.map((item, index) => (
            <Reveal
              as="li"
              key={item.label}
              delay={stagger(index, 60)}
              className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.06] p-3 text-sm font-semibold text-white transition-colors duration-300 hover:border-gold/40 hover:bg-white/10"
            >
              <IconBadge icon={RESULT_ICONS[item.icon]} tone="dark" size="sm" />
              {item.label}
            </Reveal>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
