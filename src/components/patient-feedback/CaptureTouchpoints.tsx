import { CircleCheck, ShieldCheck, Tablet, TabletSmartphone, TrendingUp, type LucideIcon } from "lucide-react";
import Card from "@@/components/ui/card";
import IconBadge from "@@/components/ui/icon-badge";
import Pill from "@@/components/ui/pill";
import ResponsiveImage from "@@/components/ui/responsive-image";
import Reveal from "@@/components/ui/reveal";
import Section from "@@/components/ui/section";
import SectionHeader from "@@/components/ui/section-header";
import { touchpoints, type TouchpointIcon } from "@@/data/patientFeedback";
import { stagger } from "@@/lib/motion";

const TOUCHPOINT_ICONS: Record<TouchpointIcon, LucideIcon> = {
  tablet: Tablet,
  kiosk: TabletSmartphone,
  telemetry: TrendingUp,
};

export default function CaptureTouchpoints() {
  return (
    <Section aria-labelledby="touchpoints-heading">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeader
          id="touchpoints-heading"
          eyebrow={touchpoints.eyebrow}
          title={touchpoints.heading}
          intro={touchpoints.intro}
          className="max-w-2xl"
        />
        <Pill tone="teal" size="md" className="w-fit shrink-0 rounded-2xl py-1.5 sm:rounded-pill">
          <ShieldCheck className="size-4 shrink-0" aria-hidden="true" />
          {touchpoints.standard}
        </Pill>
      </div>

      <ul className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {touchpoints.items.map((item, index) => (
          <Reveal as="li" key={item.title} delay={stagger(index)}>
            <Card padding="none" interactive className="group h-full overflow-hidden">
              <div className="relative">
                <ResponsiveImage
                  src={item.image.src}
                  alt={item.image.alt}
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  overlay="bottom"
                  zoom
                  className="aspect-[16/10]"
                />
                <span className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-pill bg-slate-950/70 px-3 py-1 text-xs font-semibold text-gold backdrop-blur">
                  <span className="status-dot" aria-hidden="true" />
                  {item.badge}
                </span>
                <IconBadge
                  icon={TOUCHPOINT_ICONS[item.icon]}
                  tone="teal"
                  className="absolute -bottom-6 left-6 shadow-card-hover ring-4 ring-surface"
                />
              </div>
              <div className="flex flex-1 flex-col p-6 pt-10">
                <h3 className="text-xl font-bold leading-snug text-primary-deep">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">{item.text}</p>
                <div className="mt-auto pt-6">
                  <p className="flex items-center gap-2 border-t border-border-muted pt-4 text-xs font-bold text-primary-deep">
                    <CircleCheck className="size-4 shrink-0 text-gold-ink" aria-hidden="true" />
                    {item.footer}
                  </p>
                </div>
              </div>
            </Card>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
