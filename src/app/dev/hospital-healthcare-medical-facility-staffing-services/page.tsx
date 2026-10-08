import type { Metadata } from "next";
import ServiceCta from "@@/components/services/ServiceCta";
import StatsBar from "@@/components/services/StatsBar";
import ComparisonSection from "@@/components/staffing/ComparisonSection";
import DirectorySection from "@@/components/staffing/DirectorySection";
import DualValueSection from "@@/components/staffing/DualValueSection";
import PortfolioSection from "@@/components/staffing/PortfolioSection";
import StaffingBreadcrumb from "@@/components/staffing/StaffingBreadcrumb";
import StaffingHero from "@@/components/staffing/StaffingHero";
import { impactStats, requisition, STAFFING_SEO } from "@@/data/staffing";

export const metadata: Metadata = {
  title: STAFFING_SEO.title,
  description: STAFFING_SEO.description,
};

export default function StaffingServicePage() {
  return (
    <>
      <StaffingBreadcrumb />
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
