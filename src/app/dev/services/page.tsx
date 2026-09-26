import type { Metadata } from "next";
import { SERVICES_SEO, servicesHero } from "@@/data/services";

export const metadata: Metadata = {
  title: SERVICES_SEO.title,
  description: SERVICES_SEO.description,
};

export default function ServicesPage() {
  return (
    <section aria-labelledby="services-heading" className="py-20 sm:py-24">
      <div className="container max-w-3xl">
        <span className="gold-rule" aria-hidden="true" />
        <h1 id="services-heading" className="mt-4 text-4xl font-bold sm:text-5xl">
          {servicesHero.heading}
        </h1>
        <p className="mt-6 text-lg text-ink-muted">{servicesHero.intro}</p>
      </div>
    </section>
  );
}
