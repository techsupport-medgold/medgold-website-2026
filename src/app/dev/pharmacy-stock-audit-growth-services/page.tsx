import type { Metadata } from "next";
import { CalendarCheck, Cog, Smile, Sprout, TrendingUp, type LucideIcon } from "lucide-react";
import ApproachSection from "@@/components/pharmacy-audit/ApproachSection";
import AuditBreadcrumb from "@@/components/pharmacy-audit/AuditBreadcrumb";
import AuditHero from "@@/components/pharmacy-audit/AuditHero";
import ComparisonSection from "@@/components/pharmacy-audit/ComparisonSection";
import EvidenceBar from "@@/components/pharmacy-audit/EvidenceBar";
import FrameworkSection from "@@/components/pharmacy-audit/FrameworkSection";
import ProblemsSection from "@@/components/pharmacy-audit/ProblemsSection";
import ServiceCta from "@@/components/services/ServiceCta";
import { booking, PHARMACY_AUDIT_SEO, type BookingBenefitIcon } from "@@/data/pharmacyAudit";

export const metadata: Metadata = {
  title: PHARMACY_AUDIT_SEO.title,
  description: PHARMACY_AUDIT_SEO.description,
};

const BENEFIT_ICONS: Record<BookingBenefitIcon, LucideIcon> = {
  profit: TrendingUp,
  systems: Cog,
  customers: Smile,
  growth: Sprout,
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
      <ServiceCta
        headingId="booking-heading"
        eyebrow={booking.eyebrow}
        heading={booking.heading}
        intro={booking.intro}
        points={booking.benefits.map((benefit) => ({
          icon: BENEFIT_ICONS[benefit.icon],
          title: benefit.title,
          text: benefit.text,
        }))}
        note={booking.confidentiality}
        cta={{ label: booking.cta, icon: CalendarCheck }}
        tone="surface"
      />
    </>
  );
}
