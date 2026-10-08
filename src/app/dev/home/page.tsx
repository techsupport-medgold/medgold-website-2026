import type { Metadata } from "next";
import { ClipboardCheck, FileCheck2, Handshake, Timer, type LucideIcon } from "lucide-react";
import AdvantageSection from "@@/components/home/AdvantageSection";
import CaseStudySection from "@@/components/home/CaseStudySection";
import HomeDirectory from "@@/components/home/HomeDirectory";
import HomeHero from "@@/components/home/HomeHero";
import ServicePillars from "@@/components/home/ServicePillars";
import TrustMetrics from "@@/components/home/TrustMetrics";
import ServiceCta from "@@/components/services/ServiceCta";
import { auditCta, HOME_SEO, type AuditBenefitIcon } from "@@/data/home";

export const metadata: Metadata = {
  title: { absolute: HOME_SEO.title },
  description: HOME_SEO.description,
};

const AUDIT_ICONS: Record<AuditBenefitIcon, LucideIcon> = {
  response: Timer,
  scorecard: FileCheck2,
  briefing: Handshake,
};

export default function DevHomePage() {
  return (
    <>
      <HomeHero />
      <TrustMetrics />
      <ServicePillars />
      <AdvantageSection />
      <CaseStudySection />
      <ServiceCta
        headingId="audit-heading"
        eyebrow={auditCta.eyebrow}
        heading={auditCta.heading}
        intro={auditCta.intro}
        points={auditCta.benefits.map((benefit) => ({ icon: AUDIT_ICONS[benefit.icon], text: benefit.text }))}
        shareHeading={auditCta.shareHeading}
        shareFields={auditCta.shareFields}
        cta={{ label: auditCta.cta, icon: ClipboardCheck }}
      />
      <HomeDirectory />
    </>
  );
}
