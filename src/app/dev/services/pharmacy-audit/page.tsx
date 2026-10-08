import type { Metadata } from "next";
import ApproachSection from "@@/components/pharmacy-audit/ApproachSection";
import AuditBreadcrumb from "@@/components/pharmacy-audit/AuditBreadcrumb";
import AuditHero from "@@/components/pharmacy-audit/AuditHero";
import BookingCta from "@@/components/pharmacy-audit/BookingCta";
import ComparisonSection from "@@/components/pharmacy-audit/ComparisonSection";
import EvidenceBar from "@@/components/pharmacy-audit/EvidenceBar";
import FrameworkSection from "@@/components/pharmacy-audit/FrameworkSection";
import ProblemsSection from "@@/components/pharmacy-audit/ProblemsSection";
import { PHARMACY_AUDIT_SEO } from "@@/data/pharmacyAudit";

export const metadata: Metadata = {
  title: PHARMACY_AUDIT_SEO.title,
  description: PHARMACY_AUDIT_SEO.description,
};

export default function PharmacyAuditPage() {
  return (
    <>
      <AuditBreadcrumb />
      <AuditHero />
      <EvidenceBar />
      <ProblemsSection />
      <FrameworkSection />
      <ComparisonSection />
      <ApproachSection />
      <BookingCta />
    </>
  );
}
