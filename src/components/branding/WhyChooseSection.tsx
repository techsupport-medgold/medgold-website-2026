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
import { segments, whyChoose, type SegmentIcon, type WhyIcon } from "@@/data/branding";
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

const eyebrowClass = "text-[11px] font-bold uppercase tracking-wider text-gold-ink";
const headingClass = "mt-2 text-2xl font-bold tracking-tight text-primary-deep sm:text-[28px] sm:leading-9";

export default function WhyChooseSection() {
  return (
    <section aria-label="Why MedGold and who we serve" className="brand-wash py-16 sm:py-20">
      <div className="container grid items-start gap-8 lg:grid-cols-2">
        <div className="rounded-lg border border-border-muted bg-surface p-6 shadow-sm sm:p-8">
          <p className={eyebrowClass}>{whyChoose.eyebrow}</p>
          <h2 id="why-medgold-heading" className={headingClass}>
            {whyChoose.heading}
          </h2>
          <p className="mt-2 text-sm text-ink-muted">{whyChoose.intro}</p>
          <ul className="mt-6 grid gap-4">
            {whyChoose.items.map((item) => {
              const Icon = WHY_ICONS[item.icon];
              return (
                <li key={item.title} className="flex gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded bg-surface-raised">
                    <Icon className="size-5 text-primary-deep" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-primary-deep">{item.title}</h3>
                    <p className="text-xs text-ink-muted">{item.text}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="rounded-lg border border-border-muted bg-surface-raised p-6 shadow-sm sm:p-8">
          <p className={eyebrowClass}>{segments.eyebrow}</p>
          <h2 id="segments-heading" className={headingClass}>
            {segments.heading}
          </h2>
          <p className="mt-2 text-sm text-ink-muted">{segments.intro}</p>
          <ul className="mt-6 grid gap-2 sm:grid-cols-2">
            {segments.items.map((item, index) => {
              const Icon = SEGMENT_ICONS[item.icon];
              return (
                <li
                  key={item.label}
                  className={cn(
                    "flex min-h-[38px] items-center gap-2 rounded border border-border-muted bg-surface px-2.5 py-2 text-xs font-semibold tracking-wide text-ink",
                    index === segments.items.length - 1 && "sm:col-span-2",
                  )}
                >
                  <Icon className="size-4 shrink-0 text-primary-deep" aria-hidden="true" />
                  {item.label}
                </li>
              );
            })}
          </ul>
          <p className="mt-6 flex items-center gap-3 rounded border border-border-muted bg-surface p-3 text-xs text-ink-muted">
            <ThumbsUp className="size-5 shrink-0 text-primary-deep" aria-hidden="true" />
            <span>
              <strong className="font-bold">{segments.geo.title}</strong> {segments.geo.text}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
