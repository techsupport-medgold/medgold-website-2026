import type { Metadata } from "next";
import { staffingSchemaGraph } from "@@/lib/page-schemas";
import JsonLd from "@@/components/common/JsonLd";
import Breadcrumb from "@@/components/common/Breadcrumb";
import { Routes } from "@@/config/routes";
import ServiceCta from "@@/components/services/ServiceCta";
import StatsBar from "@@/components/services/StatsBar";
import ComparisonSection from "@@/components/staffing/ComparisonSection";
import DirectorySection from "@@/components/staffing/DirectorySection";
import DualValueSection from "@@/components/staffing/DualValueSection";
import PortfolioSection from "@@/components/staffing/PortfolioSection";
import StaffingHero from "@@/components/staffing/StaffingHero";
import { breadcrumb, impactStats, requisition, STAFFING_SEO } from "@@/data/staffing";

export const metadata: Metadata = {
  title: STAFFING_SEO.title,
  description: STAFFING_SEO.description,
  alternates: { canonical: Routes.STAFFING },
};

export default function StaffingServicePage() {
  return (
    <>
      <JsonLd id="page-schema" data={staffingSchemaGraph()} />
      <Breadcrumb path={Routes.STAFFING} current={breadcrumb.current} schema={false} />
      <StaffingHero />
      <StatsBar label="Staffing impact" stats={impactStats} />
      <DualValueSection />
      <PortfolioSection />
      <DirectorySection />
      <ComparisonSection />
      <ServiceCta
        headingId="requisition-heading"
        eyebrow={requisition.eyebrow}
        heading={requisition.heading}
        intro={requisition.intro}
        shareHeading={requisition.shareHeading}
        shareFields={requisition.shareFields}
        note={requisition.nda}
        cta={{ label: requisition.cta }}
        tone="surface"
      />
    </>
  );
}
