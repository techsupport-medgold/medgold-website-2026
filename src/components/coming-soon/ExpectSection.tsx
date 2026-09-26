import { HeartPulse, Microscope, Stethoscope, type LucideIcon } from "lucide-react";
import {
  comingSoonExpectIntro,
  comingSoonExpectItems,
  type ExpectIcon,
} from "@@/data/comingSoon";

const ICONS: Record<ExpectIcon, LucideIcon> = {
  stethoscope: Stethoscope,
  microscope: Microscope,
  "heart-pulse": HeartPulse,
};

export default function ExpectSection() {
  return (
    <section
      aria-labelledby="expect-heading"
      className="border-t border-border-muted bg-surface-muted py-20 sm:py-24"
    >
      <div className="container">
        <div className="max-w-2xl">
          <span className="gold-rule" aria-hidden="true" />
          <h2
            id="expect-heading"
            className="mt-4 text-3xl font-bold sm:text-4xl"
          >
            What to expect
          </h2>
          <p className="mt-4 text-lg text-ink-muted">{comingSoonExpectIntro}</p>
        </div>

        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {comingSoonExpectItems.map((item) => {
            const Icon = ICONS[item.icon];
            return (
              <li
                key={item.title}
                className="rounded-lg border border-border-muted bg-surface p-7 shadow-card"
              >
                <span className="inline-flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 text-ink-subtle">{item.description}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
