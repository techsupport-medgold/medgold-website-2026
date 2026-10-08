import { CircleCheck, ShieldCheck } from "lucide-react";
import Card from "@@/components/ui/card";
import Pill from "@@/components/ui/pill";
import Reveal from "@@/components/ui/reveal";
import Section from "@@/components/ui/section";
import SectionHeader from "@@/components/ui/section-header";
import { directory } from "@@/data/staffing";
import { stagger } from "@@/lib/motion";

export default function DirectorySection() {
  return (
    <Section tone="dark" aria-labelledby="directory-heading">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeader
          id="directory-heading"
          tone="dark"
          eyebrow={directory.eyebrow}
          title={directory.heading}
          intro={directory.intro}
        />
        <p className="inline-flex w-fit shrink-0 items-center gap-2 rounded-pill bg-gold px-4 py-2 text-xs font-bold text-ink shadow-glow-gold">
          <ShieldCheck className="size-4" aria-hidden="true" />
          {directory.badge}
        </p>
      </div>

      <ol className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {directory.disciplines.map((discipline, index) => (
          <Reveal as="li" key={discipline.title} delay={stagger(index % 3)}>
            <Card
              variant="dark"
              interactive
              className="group h-full hover:border-gold/40 hover:bg-white/[0.09]"
            >
              <div className="flex items-start gap-4">
                <span
                  className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-gold font-display text-lg font-extrabold text-ink transition-transform duration-300 ease-spring group-hover:-rotate-3 group-hover:scale-110"
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-gold">{discipline.eyebrow}</p>
                  <h3 className="mt-1 font-display text-lg font-bold leading-snug text-white">{discipline.title}</h3>
                </div>
              </div>
              <ul className="mt-5 grid gap-2.5 text-sm text-white/80">
                {discipline.roles.map((role) => (
                  <li key={role} className="flex items-start gap-2">
                    <CircleCheck className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                    {role}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-6">
                <ul className="flex flex-wrap gap-2 border-t border-white/10 pt-4" aria-label="Credentials">
                  {discipline.tags.map((tag, tagIndex) => (
                    <li key={tag}>
                      {tagIndex === 0 ? (
                        <Pill tone="dark">{tag}</Pill>
                      ) : (
                        <Pill tone="dark" className="bg-gold/15 text-gold ring-gold/30">
                          {tag}
                        </Pill>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
