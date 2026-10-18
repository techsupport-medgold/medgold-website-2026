import type { Metadata } from "next";
import { Send } from "lucide-react";
import AboutHero from "@@/components/about/AboutHero";
import ApproachSection from "@@/components/about/ApproachSection";
import CoreValues from "@@/components/about/CoreValues";
import MissionVision from "@@/components/about/MissionVision";
import TeamSection from "@@/components/about/TeamSection";
import WhoWeAre from "@@/components/about/WhoWeAre";
import WhoWeServe from "@@/components/about/WhoWeServe";
import Breadcrumb from "@@/components/common/Breadcrumb";
import JsonLd from "@@/components/common/JsonLd";
import ServiceCta from "@@/components/services/ServiceCta";
import { Routes } from "@@/config/routes";
import { ABOUT_PAGE_URL, ABOUT_SEO, cta } from "@@/data/about";
import { webPageSchema } from "@@/lib/schema";

export const metadata: Metadata = {
  title: ABOUT_SEO.title,
  description: ABOUT_SEO.description,
  alternates: { canonical: Routes.ABOUT },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd
        id="webpage-schema"
        data={webPageSchema({ url: ABOUT_PAGE_URL, name: ABOUT_SEO.title, description: ABOUT_SEO.description })}
      />
      <Breadcrumb current="About Us" path={Routes.ABOUT} />
      <AboutHero />
      <WhoWeAre />
      <TeamSection />
      <MissionVision />
      <CoreValues />
      <ApproachSection />
      <WhoWeServe />
      <ServiceCta
        id="about-cta"
        headingId="about-cta-heading"
        eyebrow={cta.eyebrow}
        heading={cta.heading}
        subheading={cta.subheading}
        intro={cta.intro}
        cta={{ label: cta.button, icon: Send }}
        tone="raised"
      />
    </>
  );
}
