import Image from "next/image";
import Card from "@@/components/ui/card";
import Reveal from "@@/components/ui/reveal";
import Section from "@@/components/ui/section";
import SectionHeader from "@@/components/ui/section-header";
import { trainers, type Trainer } from "@@/data/careers";
import { stagger } from "@@/lib/motion";

function initials(name: string) {
  return name
    .replace(/^(Mr|Mrs|Ms|Dr)\.?\s*/i, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
}

function TrainerPhoto({ person }: { person: Trainer }) {
  return (
    <div className="relative aspect-square overflow-hidden rounded-t-card bg-surface-raised">
      {person.photo ? (
        <Image
          src={person.photo.src}
          alt={person.photo.alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
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
  return (
    <Section tone="raised" aria-labelledby="trainers-heading">
      <SectionHeader id="trainers-heading" eyebrow={trainers.eyebrow} title={trainers.heading} intro={trainers.intro} />

      <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {trainers.people.map((person, index) => (
          <Reveal as="li" key={`${person.name}-${index}`} delay={stagger(index)}>
            <Card padding="none" className="h-full overflow-hidden">
              <TrainerPhoto person={person} />
              <div className="p-6">
                <h3 className="font-display text-xl font-bold text-primary-deep">{person.name}</h3>
                <p className="mt-1 text-sm font-semibold text-gold-ink">{person.role}</p>
                {person.bio ? <p className="mt-3 text-sm leading-relaxed text-ink-muted">{person.bio}</p> : null}
              </div>
            </Card>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
