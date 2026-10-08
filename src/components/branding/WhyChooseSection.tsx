import {
  Building,
  Building2,
  FlaskConical,
  Footprints,
  Handshake,
  HeartHandshake,
  Hospital,
  House,
  Rocket,
  ShieldCheck,
  ShieldPlus,
  Smile,
  Stethoscope,
  ThumbsUp,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import Card from "@@/components/ui/card";
import IconBadge from "@@/components/ui/icon-badge";
import Reveal from "@@/components/ui/reveal";
import Section from "@@/components/ui/section";
import SectionHeader from "@@/components/ui/section-header";
import { segments, whyChoose, type SegmentIcon, type WhyIcon } from "@@/data/branding";
import { stagger } from "@@/lib/motion";
import { cn } from "@@/lib/utils";

const WHY_ICONS: Record<WhyIcon, LucideIcon> = {
  specialists: ShieldPlus,
  footfall: Footprints,
  trust: ShieldCheck,
  growth: TrendingUp,
  partner: Handshake,
};

const SEGMENT_ICONS: Record<SegmentIcon, LucideIcon> = {
  multi: Hospital,
  single: Building2,
  clinic: Building,
  dental: Smile,
  diagnostic: FlaskConical,
  ivf: HeartHandshake,
  home: House,
  doctor: Stethoscope,
  startup: Rocket,
};

export default function WhyChooseSection() {
  return (
    <Section tone="raised" aria-label="Why MedGold and who we serve" containerClassName="grid items-start gap-12 lg:grid-cols-12">
      <div className="lg:col-span-6">
        <SectionHeader id="why-medgold-heading" eyebrow={whyChoose.eyebrow} title={whyChoose.heading} intro={whyChoose.intro} />
        <ul className="mt-8 grid gap-4">
          {whyChoose.items.map((item, index) => (
            <Reveal as="li" key={item.title} delay={stagger(index)}>
              <Card padding="sm" interactive className="group flex-row gap-4">
                <IconBadge icon={WHY_ICONS[item.icon]} tone={index % 2 === 0 ? "teal" : "gold"} />
                <div className="min-w-0">
                  <h3 className="text-lg font-bold text-primary-deep">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-muted">{item.text}</p>
                </div>
              </Card>
            </Reveal>
          ))}
        </ul>
      </div>

      <Reveal className="lg:sticky lg:top-28 lg:col-span-6">
        <Card variant="elevated" padding="lg" className="overflow-hidden">
          <span
            className="pointer-events-none absolute -right-20 -top-20 size-56 rounded-full bg-gold/10 blur-3xl"
            aria-hidden="true"
          />
          <SectionHeader
            id="segments-heading"
            eyebrow={segments.eyebrow}
            title={segments.heading}
            intro={segments.intro}
            className="relative"
          />
          <ul className="relative mt-8 grid gap-3 sm:grid-cols-2">
            {segments.items.map((item, index) => {
              const Icon = SEGMENT_ICONS[item.icon];
              return (
                <li
                  key={item.label}
                  className={cn(
                    "group flex min-h-11 items-center gap-3 rounded-xl border border-border-muted bg-surface px-3 py-2.5 text-sm font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-primary/5 hover:shadow-card motion-reduce:hover:translate-y-0",
                    index === segments.items.length - 1 && "sm:col-span-2",
                  )}
                >
                  <IconBadge icon={Icon} tone="soft" size="sm" />
                  {item.label}
                </li>
              );
            })}
          </ul>
          <p className="relative mt-8 flex items-start gap-3 rounded-xl border-l-4 border-gold bg-surface-raised p-4 text-sm text-ink-muted">
            <ThumbsUp className="mt-0.5 size-5 shrink-0 text-gold-ink" aria-hidden="true" />
            <span>
              <strong className="font-bold text-primary-deep">{segments.geo.title}</strong> {segments.geo.text}
            </span>
          </p>
        </Card>
      </Reveal>
    </Section>
  );
}
