import type { Metadata } from "next";
import { homeSchemaGraph } from "@@/lib/page-schemas";
import { ClipboardCheck, FileCheck2, Handshake, Timer, type LucideIcon } from "lucide-react";
import AdvantageSection from "@@/components/home/AdvantageSection";
import HomeHero from "@@/components/home/HomeHero";
import ServicePillars from "@@/components/home/ServicePillars";
import TrustMetrics from "@@/components/home/TrustMetrics";
import ServiceCta from "@@/components/services/ServiceCta";
import JsonLd from "@@/components/common/JsonLd";
import { Routes } from "@@/config/routes";
import { SITE } from "@@/config/site";
import { auditCta, HOME_PAGE_URL, HOME_SEO, type AuditBenefitIcon } from "@@/data/home";

export const metadata: Metadata = {
  title: { absolute: HOME_SEO.title },
  description: HOME_SEO.description,
  alternates: { canonical: HOME_PAGE_URL },
  openGraph: {
    title: HOME_SEO.title,
    description: HOME_SEO.description,
    url: Routes.HOME,
    siteName: SITE.name,
    locale: SITE.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_SEO.title,
    description: HOME_SEO.description,
  },
};

const AUDIT_ICONS: Record<AuditBenefitIcon, LucideIcon> = {
  response: Timer,
  scorecard: FileCheck2,
  briefing: Handshake,
};

export default function HomePage() {
  return (
    <>
      <JsonLd id="page-schema" data={homeSchemaGraph()} />
      <HomeHero />
      <TrustMetrics />
      <ServicePillars />
      <AdvantageSection />
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
    </>
  );
}
