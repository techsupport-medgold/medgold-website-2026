import type { Metadata } from "next";
import AdvantageSection from "@@/components/home/AdvantageSection";
import AuditCta from "@@/components/home/AuditCta";
import CaseStudySection from "@@/components/home/CaseStudySection";
import HomeDirectory from "@@/components/home/HomeDirectory";
import HomeHero from "@@/components/home/HomeHero";
import ServicePillars from "@@/components/home/ServicePillars";
import TrustMetrics from "@@/components/home/TrustMetrics";
import { HOME_SEO } from "@@/data/home";

export const metadata: Metadata = {
  title: HOME_SEO.title,
  description: HOME_SEO.description,
};

export default function DevHomePage() {
  return (
    <>
      <HomeHero />
      <TrustMetrics />
      <ServicePillars />
      <AdvantageSection />
      <CaseStudySection />
      <AuditCta />
      <HomeDirectory />
    </>
  );
}
