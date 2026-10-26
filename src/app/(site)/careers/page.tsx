import type { Metadata } from "next";
import SiteSchema from "@@/components/common/SiteSchema";
import { GraduationCap, HeartHandshake, TrendingUp } from "lucide-react";
import ApplicationForm from "@@/components/careers/ApplicationForm";
import Breadcrumb from "@@/components/common/Breadcrumb";
import PageSchema from "@@/components/common/PageSchema";
import Card from "@@/components/ui/card";
import Reveal from "@@/components/ui/reveal";
import { Routes } from "@@/config/routes";
import { CAREERS_SEO, careersHero, nextSteps, whyJoin } from "@@/data/careers";

export const metadata: Metadata = {
  title: CAREERS_SEO.title,
  description: CAREERS_SEO.description,
  alternates: { canonical: Routes.CAREERS },
};

const WHY_ICONS = { growth: TrendingUp, training: GraduationCap, support: HeartHandshake };

export default function CareersPage() {
  return (
    <>
      <SiteSchema />
      <PageSchema path={Routes.CAREERS} name={CAREERS_SEO.title} description={CAREERS_SEO.description} />
      <Breadcrumb current="Careers" path={Routes.CAREERS} />
      <section aria-labelledby="careers-heading" className="brand-wash py-16 sm:py-20">
        <div className="container max-w-3xl">
          <span
            className="gold-rule animate-in fade-in-0 slide-in-from-bottom-2 fill-mode-both duration-700"
            aria-hidden="true"
          />
          <h1
            id="careers-heading"
            className="mt-4 text-4xl font-bold animate-in fade-in-0 slide-in-from-bottom-2 fill-mode-both delay-100 duration-700 sm:text-5xl"
          >
            {careersHero.heading}
          </h1>
          <p className="mt-6 text-lg text-ink-muted animate-in fade-in-0 slide-in-from-bottom-2 fill-mode-both delay-200 duration-700">
            {careersHero.intro}
          </p>
        </div>
      </section>

      <section aria-label="Job application" className="py-12 sm:py-16">
        <div className="container grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:items-start">
          <ApplicationForm />

          <aside className="grid gap-6 lg:sticky lg:top-32">
            <Reveal>
              <Card as="section" aria-labelledby="why-join-heading">
                <h2 id="why-join-heading" className="text-xl font-bold">
                  {whyJoin.heading}
                </h2>
                <ul className="mt-5 grid gap-5">
                  {whyJoin.points.map((point) => {
                    const Icon = WHY_ICONS[point.icon];
                    return (
                      <li key={point.title} className="group flex gap-4">
                        <span
                          className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 ease-spring group-hover:-rotate-3 group-hover:scale-110 motion-reduce:transform-none"
                          aria-hidden="true"
                        >
                          <Icon className="size-5" />
                        </span>
                        <span>
                          <span className="block font-semibold text-ink">{point.title}</span>
                          <span className="mt-0.5 block text-sm text-ink-muted">{point.text}</span>
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </Card>
            </Reveal>

            <Reveal delay={120}>
              <Card as="section" aria-labelledby="next-steps-heading">
                <h2 id="next-steps-heading" className="text-xl font-bold">
                  {nextSteps.heading}
                </h2>
                <ol className="mt-5 grid gap-4">
                  {nextSteps.steps.map((step, index) => (
                    <li key={step} className="flex gap-4">
                      <span
                        className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gold font-display text-sm font-bold text-ink"
                        aria-hidden="true"
                      >
                        {index + 1}
                      </span>
                      <span className="pt-1 text-sm text-ink-muted">{step}</span>
                    </li>
                  ))}
                </ol>
              </Card>
            </Reveal>
          </aside>
        </div>
      </section>
    </>
  );
}
