import Image from "next/image";
import Card from "@@/components/ui/card";
import Pill from "@@/components/ui/pill";
import Reveal from "@@/components/ui/reveal";
import Section from "@@/components/ui/section";
import SectionHeader from "@@/components/ui/section-header";
import { founder, trainers, type Trainer } from "@@/data/careers";
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

function TrainerPhoto({ person, sizes, className }: { person: Trainer; sizes: string; className?: string }) {
  return (
    <div className={cn("relative aspect-square overflow-hidden bg-surface-raised", className)}>
      {person.photo ? (
        <Image src={person.photo.src} alt={person.photo.alt} fill sizes={sizes} className="object-cover object-top" />
      ) : (
        <span
          className="brand-wash flex size-full items-center justify-center font-display text-6xl font-bold text-primary/40"
          aria-hidden="true"
        >
          {initials(person.name)}
        </span>
      )}
    </div>
  );
}

export default function TrainersSection() {
  const staff = [...trainers.staff].sort((a, b) => b.experienceYears - a.experienceYears);

  return (
    <Section tone="raised" aria-labelledby="trainers-heading">
      <SectionHeader id="trainers-heading" eyebrow={trainers.eyebrow} title={trainers.heading} intro={trainers.intro} />

      <Reveal className="mt-10">
        <Card padding="none" className="overflow-hidden lg:grid lg:grid-cols-5">
          <TrainerPhoto
            person={founder}
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="lg:col-span-2 lg:aspect-auto lg:h-full lg:min-h-[420px]"
          />
          <div className="p-6 sm:p-8 lg:col-span-3 lg:p-10">
            <Pill tone="gold" size="md">
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
              {founder.expertise.map((area) => (
                <li key={area}>
                  <Pill size="md">{area}</Pill>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </Reveal>

      <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {staff.map((person, index) => (
          <Reveal as="li" key={person.name} delay={stagger(index)}>
            <Card padding="none" className="h-full overflow-hidden">
              <TrainerPhoto
                person={person}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="rounded-t-card"
              />
              <div className="p-6">
                <h3 className="font-display text-xl font-bold text-primary-deep">{person.name}</h3>
                <p className="mt-1 text-sm font-semibold text-gold-ink">{person.role}</p>
                <p className="mt-2 text-sm text-ink-muted">{person.experienceYears}+ years experience</p>
                {person.bio ? <p className="mt-3 text-sm leading-relaxed text-ink-muted">{person.bio}</p> : null}
              </div>
            </Card>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
