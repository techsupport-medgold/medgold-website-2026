import type { Metadata } from "next";
import ComparisonSection from "@@/components/staffing/ComparisonSection";
import DirectorySection from "@@/components/staffing/DirectorySection";
import DualValueSection from "@@/components/staffing/DualValueSection";
import ImpactBar from "@@/components/staffing/ImpactBar";
import PortfolioSection from "@@/components/staffing/PortfolioSection";
import RequisitionCta from "@@/components/staffing/RequisitionCta";
import StaffingBreadcrumb from "@@/components/staffing/StaffingBreadcrumb";
import StaffingHero from "@@/components/staffing/StaffingHero";
import { STAFFING_SEO } from "@@/data/staffing";

export const metadata: Metadata = {
  title: STAFFING_SEO.title,
  description: STAFFING_SEO.description,
};

export default function StaffingServicePage() {
  return (
    <>
      <StaffingBreadcrumb />
      <StaffingHero />
      <ImpactBar />
      <DualValueSection />
      <PortfolioSection />
      <DirectorySection />
      <ComparisonSection />
      <RequisitionCta />
    </>
  );
}
