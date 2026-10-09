import type { Metadata } from "next";
import Breadcrumb from "@@/components/common/Breadcrumb";
import { DevRoutes } from "@@/config/routes";
import { CAREERS_SEO, careersHero } from "@@/data/careers";

export const metadata: Metadata = {
  title: CAREERS_SEO.title,
  description: CAREERS_SEO.description,
};

export default function CareersPage() {
  return (
    <>
      <Breadcrumb current="Careers" path={DevRoutes.CAREERS} />
      <section aria-labelledby="careers-heading" className="py-20 sm:py-24">
        <div className="container max-w-3xl">
          <span className="gold-rule" aria-hidden="true" />
          <h1 id="careers-heading" className="mt-4 text-4xl font-bold sm:text-5xl">
            {careersHero.heading}
          </h1>
          <p className="mt-6 text-lg text-ink-muted">{careersHero.intro}</p>
        </div>
      </section>
    </>
  );
}
