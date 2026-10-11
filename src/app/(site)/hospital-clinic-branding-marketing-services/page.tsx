import type { Metadata } from "next";
import { Rocket } from "lucide-react";
import BrandingHero from "@@/components/branding/BrandingHero";
import EcosystemBanner from "@@/components/branding/EcosystemBanner";
import GrowthProcess from "@@/components/branding/GrowthProcess";
import GrowthServices from "@@/components/branding/GrowthServices";
import WhyChooseSection from "@@/components/branding/WhyChooseSection";
import Breadcrumb from "@@/components/common/Breadcrumb";
import { Routes } from "@@/config/routes";
import ServiceCta from "@@/components/services/ServiceCta";
import { BRANDING_PAGE_URL, BRANDING_SEO, breadcrumb, cta } from "@@/data/branding";

export const metadata: Metadata = {
  title: BRANDING_SEO.title,
  description: BRANDING_SEO.description,
  alternates: { canonical: BRANDING_PAGE_URL },
};

export default function BrandingServicePage() {
  return (
    <>
      <Breadcrumb path={Routes.BRANDING} current={breadcrumb.current} />
      <BrandingHero />
      <EcosystemBanner />
      <GrowthServices />
      <WhyChooseSection />
      <GrowthProcess />
      <ServiceCta
        id="branding-cta"
        headingId="branding-cta-heading"
        eyebrow={cta.eyebrow}
        heading={cta.heading}
        intro={cta.intro}
        shareFields={cta.shareFields}
        note={cta.note}
        cta={{ label: cta.button, icon: Rocket }}
        tone="surface"
      />
    </>
  );
}
