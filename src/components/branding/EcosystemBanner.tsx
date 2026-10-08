import { Award } from "lucide-react";
import { banner } from "@@/data/branding";

export default function EcosystemBanner() {
  return (
    <section
      aria-label="Our growth vision"
      className="border-y border-gold-ink/30 bg-gradient-to-r from-primary-deep via-primary-deep to-gold-ink shadow-md"
    >
      <div className="container flex flex-col gap-4 py-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/10">
            <Award className="size-5 text-gold" aria-hidden="true" />
          </span>
          <div>
            <p className="text-base font-extrabold tracking-wide text-gold sm:text-lg">{banner.heading}</p>
            <p className="text-xs text-white/90">{banner.text}</p>
          </div>
        </div>
        <ul className="flex flex-wrap gap-x-4 gap-y-1.5">
          {banner.tags.map((tag) => (
            <li key={tag} className="flex items-center gap-1 text-[11px] font-semibold tracking-wide text-white/95">
              <span className="size-1.5 rounded-full bg-gold" aria-hidden="true" />
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
