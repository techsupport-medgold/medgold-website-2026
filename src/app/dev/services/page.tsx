import type { Metadata } from "next";
import ServicePillars from "@@/components/home/ServicePillars";
import Section from "@@/components/ui/section";
import SectionHeader from "@@/components/ui/section-header";
import { SERVICES_SEO, servicesHero } from "@@/data/services";

export const metadata: Metadata = {
  title: SERVICES_SEO.title,
  description: SERVICES_SEO.description,
};

export default function ServicesPage() {
  return (
    <>
      <Section tone="wash" aria-labelledby="services-page-heading">
        <SectionHeader
          as="h1"
          id="services-page-heading"
          size="lg"
          eyebrow={servicesHero.eyebrow}
          title={servicesHero.heading}
          intro={servicesHero.intro}
        />
      </Section>
      <ServicePillars />
    </>
  );
}
