import type { Metadata } from "next";
import SiteSchema from "@@/components/common/SiteSchema";
import { ClipboardCheck, Clock, IdCard, ShieldCheck, type LucideIcon } from "lucide-react";
import CohortPlanner from "@@/components/nursing-training/CohortPlanner";
import CurriculumSection from "@@/components/nursing-training/CurriculumSection";
import TraineeProfiles from "@@/components/nursing-training/TraineeProfiles";
import TrainingComparison from "@@/components/nursing-training/TrainingComparison";
import TrainingHero from "@@/components/nursing-training/TrainingHero";
import TrainingPillars from "@@/components/nursing-training/TrainingPillars";
import Breadcrumb from "@@/components/common/Breadcrumb";
import { Routes } from "@@/config/routes";
import ServiceCta from "@@/components/services/ServiceCta";
import ServiceOverview from "@@/components/services/ServiceOverview";
import JsonLd from "@@/components/common/JsonLd";
import { absoluteUrl } from "@@/config/site";
import { faqPageSchema, serviceSchema } from "@@/lib/schema";
import { breadcrumb, NURSING_TRAINING_SEO, requisition, type AssuranceIcon, overview, NURSING_TRAINING_SERVICE } from "@@/data/nursingTraining";

export const metadata: Metadata = {
  title: NURSING_TRAINING_SEO.title,
  description: NURSING_TRAINING_SEO.description,
  alternates: { canonical: Routes.NURSING_TRAINING },
};

const ASSURANCE_ICONS: Record<AssuranceIcon, LucideIcon> = {
  nda: ShieldCheck,
  schedule: Clock,
  card: IdCard,
};

const PAGE_URL = absoluteUrl(Routes.NURSING_TRAINING);

export default function NursingTrainingPage() {
  return (
    <>
      <SiteSchema />
      <JsonLd
        id="service-schema"
        data={serviceSchema({
          url: PAGE_URL,
          name: NURSING_TRAINING_SERVICE.name,
          serviceType: NURSING_TRAINING_SERVICE.serviceType,
          description: NURSING_TRAINING_SEO.description,
          areaServed: NURSING_TRAINING_SERVICE.areaServed,
        })}
      />
      <JsonLd id="faq-schema" data={faqPageSchema(PAGE_URL, overview.faqs)} />
      <Breadcrumb path={Routes.NURSING_TRAINING} current={breadcrumb.current} />
      <TrainingHero />
      <TraineeProfiles />
      <TrainingPillars />
      <CurriculumSection />
      <TrainingComparison />
      <CohortPlanner />
      <ServiceOverview id="training-overview" content={overview} />
      <ServiceCta
        id="training-requisition"
        headingId="requisition-heading"
        eyebrow={requisition.eyebrow}
        heading={requisition.heading}
        intro={requisition.intro}
        points={requisition.assurances.map((item) => ({ icon: ASSURANCE_ICONS[item.icon], text: item.text }))}
        shareFields={requisition.shareFields}
        note={requisition.confidential}
        cta={{ label: requisition.cta, icon: ClipboardCheck }}
        tone="surface"
      />
    </>
  );
}
