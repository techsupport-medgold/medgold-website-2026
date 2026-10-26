import type { Metadata } from "next";
import SiteSchema from "@@/components/common/SiteSchema";
import { CalendarCheck, Cog, Smile, Sprout, TrendingUp, type LucideIcon } from "lucide-react";
import ApproachSection from "@@/components/pharmacy-audit/ApproachSection";
import AuditHero from "@@/components/pharmacy-audit/AuditHero";
import ComparisonSection from "@@/components/pharmacy-audit/ComparisonSection";
import EvidenceBar from "@@/components/pharmacy-audit/EvidenceBar";
import FrameworkSection from "@@/components/pharmacy-audit/FrameworkSection";
import ProblemsSection from "@@/components/pharmacy-audit/ProblemsSection";
import Breadcrumb from "@@/components/common/Breadcrumb";
import { Routes } from "@@/config/routes";
import ServiceCta from "@@/components/services/ServiceCta";
import ServiceOverview from "@@/components/services/ServiceOverview";
import JsonLd from "@@/components/common/JsonLd";
import { absoluteUrl } from "@@/config/site";
import { faqPageSchema, serviceSchema } from "@@/lib/schema";
import { booking, breadcrumb, PHARMACY_AUDIT_SEO, type BookingBenefitIcon, overview, PHARMACY_AUDIT_SERVICE } from "@@/data/pharmacyAudit";

export const metadata: Metadata = {
  title: PHARMACY_AUDIT_SEO.title,
  description: PHARMACY_AUDIT_SEO.description,
  alternates: { canonical: Routes.PHARMACY_AUDIT },
};

const BENEFIT_ICONS: Record<BookingBenefitIcon, LucideIcon> = {
  profit: TrendingUp,
  systems: Cog,
  customers: Smile,
  growth: Sprout,
};

const PAGE_URL = absoluteUrl(Routes.PHARMACY_AUDIT);

export default function PharmacyAuditPage() {
  return (
    <>
      <SiteSchema />
      <JsonLd
        id="service-schema"
        data={serviceSchema({ url: PAGE_URL, name: PHARMACY_AUDIT_SERVICE.name, serviceType: PHARMACY_AUDIT_SERVICE.serviceType, description: PHARMACY_AUDIT_SEO.description })}
      />
      <JsonLd id="faq-schema" data={faqPageSchema(PAGE_URL, overview.faqs)} />
      <Breadcrumb path={Routes.PHARMACY_AUDIT} current={breadcrumb.current} />
      <AuditHero />
      <EvidenceBar />
      <ProblemsSection />
      <FrameworkSection />
      <ComparisonSection />
      <ApproachSection />
      <ServiceOverview id="audit-overview" content={overview} />
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
