import type { Metadata } from "next";
import { ClipboardCheck, Clock, IdCard, ShieldCheck, type LucideIcon } from "lucide-react";
import CohortPlanner from "@@/components/nursing-training/CohortPlanner";
import CurriculumSection from "@@/components/nursing-training/CurriculumSection";
import TraineeProfiles from "@@/components/nursing-training/TraineeProfiles";
import TrainingComparison from "@@/components/nursing-training/TrainingComparison";
import TrainingHero from "@@/components/nursing-training/TrainingHero";
import TrainingPillars from "@@/components/nursing-training/TrainingPillars";
import Breadcrumb from "@@/components/common/Breadcrumb";
import PageSchema from "@@/components/common/PageSchema";
import { Routes } from "@@/config/routes";
import ServiceCta from "@@/components/services/ServiceCta";
import { breadcrumb, NURSING_TRAINING_SEO, requisition, type AssuranceIcon } from "@@/data/nursingTraining";

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

export default function NursingTrainingPage() {
  return (
    <>
      <PageSchema path={Routes.NURSING_TRAINING} name={NURSING_TRAINING_SEO.title} description={NURSING_TRAINING_SEO.description} />
      <Breadcrumb path={Routes.NURSING_TRAINING} current={breadcrumb.current} />
      <TrainingHero />
      <TraineeProfiles />
      <TrainingPillars />
      <CurriculumSection />
      <TrainingComparison />
      <CohortPlanner />
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
