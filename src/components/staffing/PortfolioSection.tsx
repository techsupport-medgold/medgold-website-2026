import { FlaskConical, Landmark, MonitorCheck, Stethoscope, type LucideIcon } from "lucide-react";
import Card from "@@/components/ui/card";
import IconBadge from "@@/components/ui/icon-badge";
import Pill from "@@/components/ui/pill";
import ResponsiveImage from "@@/components/ui/responsive-image";
import Reveal from "@@/components/ui/reveal";
import Section from "@@/components/ui/section";
import SectionHeader from "@@/components/ui/section-header";
import { portfolio, type CredentialIcon } from "@@/data/staffing";
import { stagger } from "@@/lib/motion";

const CREDENTIAL_ICONS: Record<CredentialIcon, LucideIcon> = {
  emr: MonitorCheck,
  nurse: Stethoscope,
  lab: FlaskConical,
  governance: Landmark,
};

export default function PortfolioSection() {
  return (
    <Section tone="raised" aria-labelledby="portfolio-heading">
      <SectionHeader id="portfolio-heading" eyebrow={portfolio.eyebrow} title={portfolio.heading} intro={portfolio.intro} />

      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {portfolio.cards.map((card, index) => {
          const Icon = CREDENTIAL_ICONS[card.icon];
          return (
            <Reveal as="li" key={card.title} delay={stagger(index)}>
              <Card padding="none" interactive className="group h-full overflow-hidden">
                <div className="relative">
                  <ResponsiveImage
                    src={card.image.src}
                    alt={card.image.alt}
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    overlay="bottom"
                    zoom
                    className="aspect-[4/3]"
                  />
                  <span className="absolute bottom-3 left-3 rounded-pill bg-slate-950/70 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur">
                    {card.tier}
                  </span>
                  <IconBadge
                    icon={Icon}
                    tone="teal"
                    size="sm"
                    className="absolute -bottom-4 right-4 shadow-card-hover ring-4 ring-surface"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-2 p-5 pt-6">
                  <h3 className="font-display text-lg font-bold text-primary-deep">{card.title}</h3>
                  <p className="text-sm leading-relaxed text-ink-muted">{card.description}</p>
                  <div className="mt-auto pt-3">
                    <Pill tone="gold" className="text-[11px]">
                      <span className="size-1.5 shrink-0 rounded-full bg-current" aria-hidden="true" />
                      {card.credential}
                    </Pill>
                  </div>
                </div>
              </Card>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}
