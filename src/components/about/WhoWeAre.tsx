import { Users } from "lucide-react";
import Pill from "@@/components/ui/pill";
import Reveal from "@@/components/ui/reveal";
import ResponsiveImage from "@@/components/ui/responsive-image";
import Section from "@@/components/ui/section";
import SectionHeader from "@@/components/ui/section-header";
import { whoWeAre } from "@@/data/about";

export default function WhoWeAre() {
  return (
    <Section aria-labelledby="who-we-are-heading" containerClassName="grid items-center gap-12 lg:grid-cols-12">
      <Reveal className="relative isolate min-w-0 lg:col-span-5">
        <div
          className="absolute -inset-3 -z-10 -rotate-2 rounded-[1.75rem] bg-gradient-to-tr from-primary/20 via-gold/10 to-gold/30 sm:-inset-4"
          aria-hidden="true"
        />
        <div className="group overflow-hidden rounded-card shadow-card-hover ring-1 ring-black/5">
          <ResponsiveImage
            src={whoWeAre.image.src}
            alt={whoWeAre.image.alt}
            sizes="(min-width: 1024px) 40vw, 100vw"
            zoom
            className="aspect-[4/3]"
          />
        </div>
      </Reveal>

      <div className="min-w-0 lg:col-span-7">
        <SectionHeader id="who-we-are-heading" eyebrow={whoWeAre.eyebrow} title={whoWeAre.heading} className="max-w-none" />
        {whoWeAre.paragraphs.map((paragraph, index) => (
          <Reveal as="p" key={paragraph} delay={index * 80} className="mt-4 leading-relaxed text-ink-muted">
            {paragraph}
          </Reveal>
        ))}

        <Reveal delay={240} className="mt-8">
          <p className="flex items-center gap-2 text-sm font-bold text-primary-deep">
            <Users className="size-4 text-gold-ink" aria-hidden="true" />
            {whoWeAre.teamLabel}
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {whoWeAre.team.map((member) => (
              <li key={member}>
                <Pill size="md">{member}</Pill>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
