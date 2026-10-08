import { BookOpen, BriefcaseMedical, Check, Siren, type LucideIcon } from "lucide-react";
import { curriculum, type CurriculumIcon } from "@@/data/nursingTraining";

const CURRICULUM_ICONS: Record<CurriculumIcon, LucideIcon> = {
  procedures: BriefcaseMedical,
  emergency: Siren,
  curriculum: BookOpen,
};

export default function CurriculumSection() {
  return (
    <section aria-labelledby="curriculum-heading" className="bg-surface-raised py-16 sm:py-20">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-gold-ink">{curriculum.eyebrow}</p>
          <h2 id="curriculum-heading" className="mt-3 text-3xl font-bold tracking-tight text-primary-deep sm:text-4xl">
            {curriculum.heading}
          </h2>
          <p className="mt-4 text-ink-muted">{curriculum.intro}</p>
        </div>

        <ul className="mt-12 grid gap-6 lg:grid-cols-3">
          {curriculum.cards.map((card) => {
            const Icon = CURRICULUM_ICONS[card.icon];
            return (
              <li key={card.title} className="min-w-0 rounded-lg bg-surface p-6 shadow-card">
                <h3 className="flex items-start gap-2 text-lg font-bold text-primary-deep">
                  <Icon className="mt-0.5 size-5 shrink-0 text-gold-ink" aria-hidden="true" />
                  {card.title}
                </h3>
                <p className="mt-2 text-xs text-ink-muted">{card.intro}</p>
                <ul className="mt-3 grid gap-1.5 text-sm text-ink-muted">
                  {card.items.map((item) => (
                    <li key={item} className="flex items-start gap-1.5">
                      <Check className="mt-0.5 size-4 shrink-0 text-gold-ink" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
