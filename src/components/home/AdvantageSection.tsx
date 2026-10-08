import Link from "next/link";
import { ArrowRight, Check, ClipboardList, Recycle, Settings, ShieldCheck, TrendingUp, type LucideIcon } from "lucide-react";
import Card from "@@/components/ui/card";
import CountUp from "@@/components/ui/count-up";
import IconBadge from "@@/components/ui/icon-badge";
import Pill from "@@/components/ui/pill";
import Reveal from "@@/components/ui/reveal";
import { stagger } from "@@/lib/motion";
import Section from "@@/components/ui/section";
import SectionHeader from "@@/components/ui/section-header";
import { DevRoutes } from "@@/config/routes";
import { advantage, opsPanel, type AdvantageIcon } from "@@/data/home";
import { cn } from "@@/lib/utils";

const CARD_ICONS: Record<AdvantageIcon, LucideIcon> = {
  audits: ShieldCheck,
  operations: Settings,
  growth: TrendingUp,
};

const STAT_ICONS = { gold: TrendingUp, primary: Check, muted: Recycle } as const;

export default function AdvantageSection() {
  return (
    <Section tone="raised" aria-labelledby="advantage-heading" containerClassName="grid items-center gap-12 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <SectionHeader id="advantage-heading" eyebrow={advantage.eyebrow} title={advantage.heading} intro={advantage.intro} />

        <ul className="mt-8 grid gap-4">
          {advantage.cards.map((card, index) => (
            <Reveal as="li" key={card.title} delay={stagger(index)}>
              <Card padding="sm" interactive className="group flex-row gap-4">
                <IconBadge icon={CARD_ICONS[card.icon]} tone="gold" />
                <div>
                  <h3 className="text-lg font-bold text-primary-deep">{card.title}</h3>
                  <p className="mt-1 text-sm text-ink-muted">{card.description}</p>
                </div>
              </Card>
            </Reveal>
          ))}
        </ul>
      </div>

      <Reveal className="lg:col-span-7">
        <div className="brand-dark rounded-card p-6 shadow-card-hover sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-5">
            <h3 className="flex items-center gap-2.5 text-sm font-bold text-white">
              <span className="status-dot" aria-hidden="true" />
              {opsPanel.title}
            </h3>
            <Pill tone="dark">{opsPanel.tag}</Pill>
          </div>

          <dl className="mt-6 grid gap-4 sm:grid-cols-3">
            {opsPanel.stats.map((stat) => {
              const Icon = STAT_ICONS[stat.tone];
              return (
                <div key={stat.label} className="flex flex-col rounded-xl border border-white/10 bg-white/[0.06] p-4">
                  <dt className="order-1 text-[11px] font-bold uppercase tracking-wider text-white/75">{stat.label}</dt>
                  <dd className="order-2 mt-2 font-display text-3xl font-extrabold tracking-tight text-white">
                    <CountUp value={stat.value} />
                  </dd>
                  <dd className="order-3 mt-2 flex items-start gap-1 text-xs font-semibold text-gold">
                    <Icon className="mt-0.5 size-3 shrink-0" aria-hidden="true" />
                    {stat.note}
                  </dd>
                </div>
              );
            })}
          </dl>

          <ul className="mt-7 grid gap-5">
            {opsPanel.bars.map((bar) => (
              <li key={bar.label}>
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-sm font-semibold text-white/90">{bar.label}</span>
                  <span className={cn("shrink-0 font-mono text-sm font-bold", bar.tone === "gold" ? "text-gold" : "text-white")}>
                    {bar.display}
                  </span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10" aria-hidden="true">
                  <div
                    className={cn("reveal-bar h-full rounded-full", bar.tone === "gold" ? "bg-gold" : "bg-gradient-to-r from-primary to-teal-300")}
                    style={{ width: `${bar.value}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-col gap-3 rounded-xl bg-white/[0.06] p-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-center gap-2 text-sm text-white/80">
              <ClipboardList className="size-5 shrink-0 text-gold" aria-hidden="true" />
              {opsPanel.note}
            </p>
            <Link
              href={DevRoutes.CONTACT}
              className="group inline-flex min-h-11 shrink-0 items-center gap-1 text-sm font-bold text-gold hover:text-white"
            >
              {opsPanel.linkLabel}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
