import Image from "next/image";
import { Award } from "lucide-react";
import Card from "@@/components/ui/card";
import Pill from "@@/components/ui/pill";
import Reveal from "@@/components/ui/reveal";
import Section from "@@/components/ui/section";
import SectionHeader from "@@/components/ui/section-header";
import { founder, trainers, type Trainer } from "@@/data/about";
import { stagger } from "@@/lib/motion";
import { cn } from "@@/lib/utils";

function initials(name: string) {
  return name
    .replace(/^(Mr|Mrs|Ms|Dr)\.?\s*/i, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
}

const zoomClass = "transition-transform duration-700 ease-out-expo group-hover:scale-105 motion-reduce:transform-none";

function TrainerPhoto({ person, sizes, className }: { person: Trainer; sizes: string; className?: string }) {
  return (
    <div className={cn("relative aspect-square overflow-hidden bg-surface-raised", className)}>
      {person.photo ? (
        <Image
          src={person.photo.src}
          alt={person.photo.alt}
          fill
          sizes={sizes}
          className={cn("object-cover object-top", zoomClass)}
        />
      ) : (
        <span
          className={cn(
            "brand-wash flex size-full items-center justify-center font-display text-6xl font-bold text-primary/40",
            zoomClass,
          )}
          aria-hidden="true"
        >
          {initials(person.name)}
        </span>
      )}
    </div>
  );
}

export default function TeamSection() {
  const staff = [...trainers.staff].sort((a, b) => b.experienceYears - a.experienceYears);

  return (
    <Section tone="raised" aria-labelledby="founder-heading">
      <SectionHeader
        id="founder-heading"
        eyebrow={trainers.founderHeader.eyebrow}
        title={trainers.founderHeader.heading}
        intro={trainers.founderHeader.intro}
      />

      <Reveal className="mt-10">
        <Card
          padding="none"
          interactive
          className="group relative overflow-hidden lg:grid lg:grid-cols-[minmax(0,380px)_1fr]"
        >
          <span
            className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-gold/15 blur-3xl transition-transform duration-700 ease-out-expo group-hover:scale-150 motion-reduce:transform-none"
            aria-hidden="true"
          />
          <TrainerPhoto
            person={founder}
            sizes="(min-width: 1024px) 380px, 448px"
            className="mx-auto aspect-[4/5] w-full max-w-md lg:aspect-auto lg:h-full lg:min-h-[475px] lg:max-w-none"
          />
          <div className="relative p-6 sm:p-8 lg:self-center lg:p-10 lg:pr-12">
            <Pill tone="gold" size="md">
              <span className="status-dot" aria-hidden="true" />
              {founder.experienceYears}+ Years Experience
            </Pill>
            <h3 className="mt-4 font-display text-3xl font-bold text-primary-deep">{founder.name}</h3>
            <p className="mt-1 font-semibold text-gold-ink">{founder.role}</p>
            <div className="mt-5 space-y-3 leading-relaxed text-ink-muted">
              {founder.about.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <p className="mt-6 text-xs font-bold uppercase tracking-[0.14em] text-primary-deep">Areas of Expertise</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {founder.expertise.map((area, index) => (
                <Reveal as="li" key={area} delay={stagger(index)}>
                  <span className="inline-flex min-h-9 items-center rounded-pill bg-primary/10 px-3.5 py-1 text-sm font-semibold text-primary-deep transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary hover:text-white hover:shadow-card-hover motion-reduce:hover:translate-y-0">
                    {area}
                  </span>
                </Reveal>
              ))}
            </ul>
          </div>
        </Card>
      </Reveal>

      <SectionHeader
        id="staff-heading"
        className="mt-16"
        eyebrow={trainers.staffHeader.eyebrow}
        title={trainers.staffHeader.heading}
        intro={trainers.staffHeader.intro}
      />

      <ul aria-labelledby="staff-heading" className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {staff.map((person, index) => (
          <Reveal as="li" key={person.name} delay={stagger(index)}>
            <Card padding="none" interactive className="group h-full overflow-hidden">
              <TrainerPhoto
                person={person}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="aspect-[4/5] rounded-t-card"
              />
              <div className="p-6">
                <h3 className="relative inline-block font-display text-xl font-bold text-primary-deep after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:rounded-full after:bg-gold after:transition-all after:duration-500 group-hover:after:w-full motion-reduce:after:transition-none">
                  {person.name}
                </h3>
                <p className="mt-2 text-sm font-semibold text-gold-ink">{person.role}</p>
                <p className="mt-2 flex items-center gap-2 text-sm text-ink-muted">
                  <Award
                    className="size-4 text-gold-ink transition-transform duration-300 ease-spring group-hover:-rotate-3 group-hover:scale-110 motion-reduce:transform-none"
                    aria-hidden="true"
                  />
                  {person.experienceYears}+ years experience
                </p>
                {person.bio ? <p className="mt-3 text-sm leading-relaxed text-ink-muted">{person.bio}</p> : null}
              </div>
            </Card>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
