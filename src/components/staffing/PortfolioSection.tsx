import Image from "next/image";
import { FlaskConical, Landmark, MonitorCheck, Stethoscope, type LucideIcon } from "lucide-react";
import { portfolio, type CredentialIcon } from "@@/data/staffing";

const CREDENTIAL_ICONS: Record<CredentialIcon, LucideIcon> = {
  emr: MonitorCheck,
  nurse: Stethoscope,
  lab: FlaskConical,
  governance: Landmark,
};

export default function PortfolioSection() {
  return (
    <section aria-labelledby="portfolio-heading" className="bg-surface-raised py-16 sm:py-20">
      <div className="container">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary-deep">{portfolio.eyebrow}</p>
          <h2 id="portfolio-heading" className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {portfolio.heading}
          </h2>
          <p className="mt-4 text-ink-muted">{portfolio.intro}</p>
        </div>

        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {portfolio.cards.map((card) => {
            const Icon = CREDENTIAL_ICONS[card.icon];
            return (
              <li key={card.title} className="flex flex-col overflow-hidden rounded-lg bg-surface shadow-card">
                <div className="relative h-56">
                  <Image
                    src={card.image.src}
                    alt={card.image.alt}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                  <span className="absolute left-2 top-2 rounded-sm bg-primary-deep px-1.5 py-0.5 text-[11px] font-semibold text-white">
                    {card.tier}
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-1 p-4">
                  <h3 className="text-lg font-semibold text-primary-deep">{card.title}</h3>
                  <p className="text-sm text-ink-muted">{card.description}</p>
                  <p className="mt-auto inline-flex items-center gap-1 pt-2 text-[11px] font-semibold text-gold-ink">
                    <Icon className="size-3.5" aria-hidden="true" />
                    {card.credential}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
