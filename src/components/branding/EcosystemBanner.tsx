import { Award } from "lucide-react";
import IconBadge from "@@/components/ui/icon-badge";
import Reveal from "@@/components/ui/reveal";
import { banner } from "@@/data/branding";
import { stagger } from "@@/lib/motion";

export default function EcosystemBanner() {
  return (
    <section aria-label="Our growth vision" className="brand-dark border-y border-gold/20 text-white">
      <div className="container flex flex-col gap-6 py-10 lg:flex-row lg:items-center lg:justify-between">
        <Reveal className="group flex items-center gap-4">
          <IconBadge icon={Award} tone="dark" className="ring-1 ring-gold/30" />
          <div>
            <p className="font-display text-lg font-extrabold tracking-wide text-gold sm:text-xl">{banner.heading}</p>
            <p className="mt-1 text-sm text-white/80">{banner.text}</p>
          </div>
        </Reveal>
        <ul className="flex flex-wrap gap-2">
          {banner.tags.map((tag, index) => (
            <Reveal as="li" key={tag} delay={stagger(index)}>
              <span className="inline-flex items-center gap-2 rounded-pill bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white ring-1 ring-inset ring-white/20 transition-colors duration-300 hover:bg-white/15 hover:ring-gold/50">
                <span className="size-1.5 rounded-full bg-gold" aria-hidden="true" />
                {tag}
              </span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
