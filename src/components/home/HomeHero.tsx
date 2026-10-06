import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, CircleCheck, LayoutGrid, ShieldCheck } from "lucide-react";
import { Button } from "@@/components/ui/button";
import { DevRoutes } from "@@/config/routes";
import { homeHero } from "@@/data/home";
import { cn } from "@@/lib/utils";

const METRIC_ICONS = { primary: BadgeCheck, gold: ShieldCheck } as const;

export default function HomeHero() {
  return (
    <section aria-labelledby="home-heading" className="brand-wash">
      <div className="container pb-10 pt-10 sm:pt-14">
        <p className="inline-flex max-w-full items-start gap-2 rounded-2xl bg-surface px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-primary-deep shadow-card sm:items-center sm:rounded-full">
          <span className="mt-1 size-2.5 shrink-0 rounded-full bg-gold sm:mt-0" aria-hidden="true" />
          {homeHero.badge}
        </p>

        <div className="mt-8 grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="min-w-0 lg:col-span-7">
            <h1
              id="home-heading"
              className="text-4xl font-bold leading-tight tracking-tight text-primary-deep sm:text-5xl"
            >
              {homeHero.heading}
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-ink-muted">{homeHero.intro}</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-auto min-h-11 whitespace-normal py-2.5 hover:bg-primary-deep">
                <Link href={DevRoutes.CONTACT}>
                  <ShieldCheck aria-hidden="true" />
                  {homeHero.primaryCta}
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-auto min-h-11 whitespace-normal border-primary/40 bg-surface py-2.5 text-primary hover:bg-primary/5 hover:text-primary"
              >
                <a href="#services">
                  <LayoutGrid aria-hidden="true" />
                  {homeHero.secondaryCta}
                </a>
              </Button>
            </div>

            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2" aria-label="Certifications">
              {homeHero.compliance.map((item) => (
                <li key={item} className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted">
                  <CircleCheck className="size-4 text-gold-ink" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative overflow-hidden rounded-2xl bg-surface-raised shadow-xl lg:col-span-5">
            <div className="relative aspect-[4/5] sm:aspect-[16/11] lg:aspect-[27/25]">
              <Image
                src={homeHero.image.src}
                alt={homeHero.image.alt}
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
            <div
              className="absolute inset-0 bg-gradient-to-t from-primary-deep/85 via-primary-deep/20 to-transparent"
              aria-hidden="true"
            />
            <div className="absolute inset-x-4 top-4 flex items-center justify-between gap-3">
              <span className="rounded-sm bg-primary-deep/75 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur">
                {homeHero.imageTag}
              </span>
              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-sm bg-primary-deep/75 px-2 py-0.5 text-xs font-semibold text-gold backdrop-blur">
                <span className="size-2 rounded-full bg-gold" aria-hidden="true" />
                {homeHero.imageStatus}
              </span>
            </div>
            <ul className="absolute inset-x-4 bottom-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              {homeHero.metricCards.map((card, index) => {
                const Icon = METRIC_ICONS[card.tone];
                return (
                  <li
                    key={card.label}
                    className={cn(
                      "flex w-fit items-center gap-2.5 rounded-lg bg-white/90 p-2.5 pr-4 shadow-lg backdrop-blur",
                      index === 1 && "sm:ml-auto",
                    )}
                  >
                    <span
                      className={cn(
                        "flex size-9 items-center justify-center rounded-md",
                        card.tone === "gold" ? "bg-gold text-ink" : "bg-primary/10 text-primary",
                      )}
                    >
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <span>
                      <span
                        className={cn(
                          "block text-lg font-semibold leading-tight",
                          card.tone === "gold" ? "text-gold-ink" : "text-primary-deep",
                        )}
                      >
                        {card.value}
                      </span>
                      <span className="block text-xs font-semibold text-ink-muted">{card.label}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
