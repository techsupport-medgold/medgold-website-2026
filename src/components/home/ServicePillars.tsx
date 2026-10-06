import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ClipboardCheck,
  GraduationCap,
  IdCard,
  MessageSquareHeart,
  Pill,
  SprayCan,
  type LucideIcon,
} from "lucide-react";
import { DevRoutes } from "@@/config/routes";
import { servicePillars, servicesIntro, type PillarIcon } from "@@/data/home";

const ICONS: Record<PillarIcon, LucideIcon> = {
  pharmacy: Pill,
  audit: ClipboardCheck,
  sanitization: SprayCan,
  staffing: IdCard,
  feedback: MessageSquareHeart,
  training: GraduationCap,
};

export default function ServicePillars() {
  return (
    <section id="services" aria-labelledby="services-heading" className="scroll-mt-28 bg-surface py-16 sm:py-20">
      <div className="container">
        <div className="max-w-2xl">
          <span className="gold-rule" aria-hidden="true" />
          <h2 id="services-heading" className="mt-4 text-3xl font-bold tracking-tight text-primary-deep sm:text-4xl">
            {servicesIntro.heading}
          </h2>
          <p className="mt-4 text-lg text-ink-muted">{servicesIntro.intro}</p>
        </div>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {servicePillars.map((pillar, index) => {
            const Icon = ICONS[pillar.icon];
            const number = `Pillar ${String(index + 1).padStart(2, "0")}`;
            return (
              <li
                key={pillar.code}
                className="flex flex-col overflow-hidden rounded-xl border border-primary/10 bg-surface-raised transition-shadow hover:shadow-card"
              >
                {pillar.image ? (
                  <div className="relative aspect-[16/9]">
                    <Image
                      src={pillar.image.src}
                      alt={pillar.image.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                    <span className="absolute left-3 top-3 rounded bg-surface px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-gold-ink shadow-sm">
                      {number}
                    </span>
                  </div>
                ) : null}

                <div className="flex flex-1 flex-col p-6">
                  {pillar.image ? null : (
                    <>
                      <span className="flex size-11 items-center justify-center rounded-lg bg-surface text-primary shadow-sm">
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <p className="mt-5 text-[11px] font-semibold uppercase tracking-wider text-gold-ink">{number}</p>
                    </>
                  )}
                  <h3 className="mt-2 flex items-center gap-2 text-xl font-semibold text-primary-deep">
                    {pillar.image ? <Icon className="size-5 shrink-0 text-primary" aria-hidden="true" /> : null}
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">{pillar.description}</p>
                  <ul className="mb-6 mt-4 flex flex-wrap gap-2" aria-label={`${pillar.title} highlights`}>
                    {pillar.tags.map((tag) => (
                      <li key={tag} className="rounded bg-surface px-2 py-1 text-xs font-medium text-ink shadow-sm">
                        {tag}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto flex items-center justify-between border-t border-primary/10 pt-2">
                    <Link
                      href={DevRoutes.SERVICES}
                      className="group inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                    >
                      {servicesIntro.linkLabel}
                      <span className="sr-only">: {pillar.title}</span>
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                    </Link>
                    <span className="font-mono text-xs font-semibold text-ink-subtle">{pillar.code}</span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
