import Link from "next/link";
import {
  ArrowRight,
  GraduationCap,
  IdCard,
  Megaphone,
  MessageSquareHeart,
  Pill as PillIcon,
  type LucideIcon,
} from "lucide-react";
import Card from "@@/components/ui/card";
import IconBadge from "@@/components/ui/icon-badge";
import Pill from "@@/components/ui/pill";
import ResponsiveImage from "@@/components/ui/responsive-image";
import Reveal from "@@/components/ui/reveal";
import { stagger } from "@@/lib/motion";
import Section from "@@/components/ui/section";
import SectionHeader from "@@/components/ui/section-header";
import { DevRoutes } from "@@/config/routes";
import { servicePillars, servicesIntro, type PillarIcon } from "@@/data/home";

const ICONS: Record<PillarIcon, LucideIcon> = {
  pharmacy: PillIcon,
  branding: Megaphone,
  staffing: IdCard,
  feedback: MessageSquareHeart,
  training: GraduationCap,
};

export default function ServicePillars() {
  return (
    <Section id="services" aria-labelledby="services-heading" className="scroll-mt-28">
      <SectionHeader id="services-heading" eyebrow="Core services" title={servicesIntro.heading} intro={servicesIntro.intro} />

      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {servicePillars.map((pillar, index) => {
          const Icon = ICONS[pillar.icon];
          const number = String(index + 1).padStart(2, "0");
          return (
            <Reveal as="li" key={pillar.code} delay={stagger(index % 3)}>
              <Card padding="none" interactive className="group h-full overflow-hidden">
                {pillar.image ? (
                  <div className="relative">
                    <ResponsiveImage
                      src={pillar.image.src}
                      alt={pillar.image.alt}
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      overlay="bottom"
                      zoom
                      className="aspect-[16/10]"
                    />
                    <span className="absolute left-4 top-4 rounded-pill bg-surface/95 px-2.5 py-0.5 font-mono text-[11px] font-bold text-gold-ink shadow-sm">
                      {number}
                    </span>
                    <IconBadge icon={Icon} tone="teal" className="absolute -bottom-6 left-6 shadow-card-hover ring-4 ring-surface" />
                  </div>
                ) : null}

                <div className={pillar.image ? "flex flex-1 flex-col p-6 pt-10" : "flex flex-1 flex-col p-6"}>
                  {pillar.image ? null : (
                    <div className="flex items-center justify-between">
                      <IconBadge icon={Icon} tone="soft" />
                      <span className="font-mono text-[11px] font-bold text-gold-ink">{number}</span>
                    </div>
                  )}
                  <h3 className={pillar.image ? "text-xl font-bold text-primary-deep" : "mt-5 text-xl font-bold text-primary-deep"}>
                    {pillar.title}
                  </h3>
                  {pillar.subtitle ? (
                    <p className="mt-2 text-sm font-semibold leading-snug text-gold-ink">{pillar.subtitle}</p>
                  ) : null}
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">{pillar.description}</p>
                  <ul className="mb-6 mt-4 flex flex-wrap gap-2" aria-label={`${pillar.title} highlights`}>
                    {pillar.tags.map((tag) => (
                      <li key={tag}>
                        <Pill tone="neutral">{tag}</Pill>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto flex items-center justify-between border-t border-border-muted pt-2">
                    <Link
                      href={pillar.href ?? DevRoutes.CONTACT}
                      className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-primary after:absolute after:inset-0 after:rounded-card hover:text-primary-deep"
                    >
                      {servicesIntro.linkLabel}
                      <span className="sr-only">: {pillar.title}</span>
                      <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                    </Link>
                    <span className="font-mono text-xs font-semibold text-ink-subtle">{pillar.code}</span>
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
