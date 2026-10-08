import Image from "next/image";
import { ShieldCheck, Tablet, TabletSmartphone, TrendingUp, type LucideIcon } from "lucide-react";
import { touchpoints, type TouchpointIcon } from "@@/data/patientFeedback";
import { cn } from "@@/lib/utils";

const TOUCHPOINT_ICONS: Record<TouchpointIcon, LucideIcon> = {
  tablet: Tablet,
  kiosk: TabletSmartphone,
  telemetry: TrendingUp,
};

const BADGE_TONES = ["bg-primary-deep", "bg-gold-ink", "bg-primary"] as const;

export default function CaptureTouchpoints() {
  return (
    <section aria-labelledby="touchpoints-heading" className="bg-surface py-16 sm:py-20">
      <div className="container">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-gold-ink">{touchpoints.eyebrow}</p>
            <h2
              id="touchpoints-heading"
              className="mt-2 text-3xl font-bold tracking-tight text-primary-deep sm:text-4xl"
            >
              {touchpoints.heading}
            </h2>
            <p className="mt-3 text-ink-muted">{touchpoints.intro}</p>
          </div>
          <p className="flex items-center gap-1.5 text-xs font-semibold text-primary-deep">
            <ShieldCheck className="size-4 shrink-0" aria-hidden="true" />
            {touchpoints.standard}
          </p>
        </div>

        <ul className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {touchpoints.items.map((item, index) => {
            const Icon = TOUCHPOINT_ICONS[item.icon];
            return (
              <li key={item.title} className="flex flex-col overflow-hidden rounded-lg bg-surface shadow-card">
                <div className="relative aspect-[16/10] bg-surface-raised">
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                  <span
                    className={cn(
                      "absolute right-2 top-2 rounded px-2 py-0.5 text-[11px] font-semibold text-white",
                      BADGE_TONES[index % BADGE_TONES.length],
                    )}
                  >
                    {item.badge}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="flex items-start gap-2 text-lg font-bold leading-snug text-ink">
                    <Icon className="mt-1 size-4 shrink-0 text-primary-deep" aria-hidden="true" />
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-ink-muted">{item.text}</p>
                  <p className="mt-auto pt-6 text-xs font-semibold text-primary-deep">{item.footer}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
