import Link from "next/link";
import { ArrowRight, Building2, CircleCheck, GraduationCap, Phone, type LucideIcon } from "lucide-react";
import { DevRoutes } from "@@/config/routes";
import { SITE } from "@@/config/site";
import { dualValue, type DualValueCard, type DualValueIcon } from "@@/data/staffing";
import { cn } from "@@/lib/utils";

const CARD_ICONS: Record<DualValueIcon, LucideIcon> = {
  hospital: Building2,
  training: GraduationCap,
};

function CardLink({ card }: { card: DualValueCard }) {
  const className = cn(
    "mt-auto inline-flex min-h-11 items-center gap-1.5 font-semibold hover:underline",
    card.accent === "gold" ? "text-gold-ink" : "text-primary-deep",
  );
  if (card.link.kind === "phone") {
    return (
      <a href={`tel:${SITE.contact.phoneHref}`} className={className}>
        {card.link.label} ({SITE.contact.phone})
        <Phone className="size-4" aria-hidden="true" />
      </a>
    );
  }
  return (
    <Link href={DevRoutes.CONTACT} className={className}>
      {card.link.label}
      <ArrowRight className="size-4" aria-hidden="true" />
    </Link>
  );
}

export default function DualValueSection() {
  return (
    <section aria-labelledby="dual-value-heading" className="bg-surface py-16 sm:py-20">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary-deep">{dualValue.eyebrow}</p>
          <h2 id="dual-value-heading" className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {dualValue.heading}
          </h2>
          <p className="mt-4 text-ink-muted">{dualValue.intro}</p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {dualValue.cards.map((card) => {
            const Icon = CARD_ICONS[card.icon];
            const gold = card.accent === "gold";
            return (
              <article
                key={card.title}
                className={cn(
                  "flex min-w-0 flex-col gap-4 rounded-2xl border-b-4 bg-surface p-6 shadow-card sm:p-8",
                  gold ? "border-gold-ink" : "border-primary-deep",
                )}
              >
                <div className="flex items-start gap-3">
                  <Icon
                    className={cn("mt-1 size-6 shrink-0", gold ? "text-gold-ink" : "text-primary-deep")}
                    aria-hidden="true"
                  />
                  <div>
                    <p
                      className={cn(
                        "text-xs font-semibold uppercase tracking-wider",
                        gold ? "text-primary-deep" : "text-gold-ink",
                      )}
                    >
                      {card.eyebrow}
                    </p>
                    <h3
                      className={cn(
                        "mt-1 text-xl font-semibold tracking-tight sm:text-2xl",
                        gold ? "text-ink" : "text-primary-deep",
                      )}
                    >
                      {card.title}
                    </h3>
                  </div>
                </div>
                <p className="text-sm text-ink-muted">{card.intro}</p>
                <ul className="grid gap-2.5 text-sm text-ink">
                  {card.points.map((point) => (
                    <li key={point.lead} className="flex items-start gap-2">
                      <CircleCheck
                        className={cn("mt-0.5 size-4 shrink-0", gold ? "text-gold-ink" : "text-primary")}
                        aria-hidden="true"
                      />
                      <span>
                        <strong className="font-bold">{point.lead}</strong> {point.text}
                      </span>
                    </li>
                  ))}
                </ul>
                <CardLink card={card} />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
