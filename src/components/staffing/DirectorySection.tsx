import { CircleCheck, ShieldCheck } from "lucide-react";
import { directory } from "@@/data/staffing";

export default function DirectorySection() {
  return (
    <section aria-labelledby="directory-heading" className="bg-surface py-16 sm:py-20">
      <div className="container">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary-deep">{directory.eyebrow}</p>
            <h2 id="directory-heading" className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              {directory.heading}
            </h2>
            <p className="mt-4 text-ink-muted">{directory.intro}</p>
          </div>
          <p className="inline-flex w-fit shrink-0 items-center gap-1.5 rounded bg-gold px-3 py-1.5 text-xs font-semibold text-primary-deep">
            <ShieldCheck className="size-4" aria-hidden="true" />
            {directory.badge}
          </p>
        </div>

        <ol className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {directory.disciplines.map((discipline, index) => (
            <li
              key={discipline.title}
              className="flex min-w-0 flex-col rounded-xl border border-border-muted bg-surface p-6 shadow-card"
            >
              <div className="flex items-start gap-3">
                <span
                  className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary-deep text-sm font-bold text-white"
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gold-ink">{discipline.eyebrow}</p>
                  <h3 className="mt-0.5 text-lg font-semibold text-primary-deep">{discipline.title}</h3>
                </div>
              </div>
              <ul className="mt-4 grid gap-2 text-sm text-ink-muted">
                {discipline.roles.map((role) => (
                  <li key={role} className="flex items-start gap-2">
                    <CircleCheck className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                    {role}
                  </li>
                ))}
              </ul>
              <ul className="mt-auto flex flex-wrap gap-2 pt-5" aria-label="Credentials">
                {discipline.tags.map((tag, tagIndex) => (
                  <li
                    key={tag}
                    className={
                      tagIndex === 0
                        ? "rounded bg-surface-raised px-2 py-1 text-xs font-semibold text-primary-deep"
                        : "rounded bg-gold/20 px-2 py-1 text-xs font-semibold text-gold-ink"
                    }
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
