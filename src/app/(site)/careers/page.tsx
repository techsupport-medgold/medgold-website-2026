import type { Metadata } from "next";
import TrainersSection from "@@/components/careers/TrainersSection";
import Breadcrumb from "@@/components/common/Breadcrumb";
import { Routes } from "@@/config/routes";
import { CAREERS_SEO, careersHero } from "@@/data/careers";

export const metadata: Metadata = {
  title: CAREERS_SEO.title,
  description: CAREERS_SEO.description,
  alternates: { canonical: Routes.CAREERS },
};

export default function CareersPage() {
  return (
    <>
      <Breadcrumb current="Careers" path={Routes.CAREERS} />
      <section aria-labelledby="careers-heading" className="brand-wash py-20 sm:py-24">
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
      <TrainersSection />
    </>
  );
}
