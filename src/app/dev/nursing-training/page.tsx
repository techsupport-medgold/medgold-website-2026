import type { Metadata } from "next";
import { ClipboardCheck, Clock, IdCard, ShieldCheck, type LucideIcon } from "lucide-react";
import CohortPlanner from "@@/components/nursing-training/CohortPlanner";
import CurriculumSection from "@@/components/nursing-training/CurriculumSection";
import TraineeProfiles from "@@/components/nursing-training/TraineeProfiles";
import TrainingBreadcrumb from "@@/components/nursing-training/TrainingBreadcrumb";
import TrainingComparison from "@@/components/nursing-training/TrainingComparison";
import TrainingHero from "@@/components/nursing-training/TrainingHero";
import TrainingPillars from "@@/components/nursing-training/TrainingPillars";
import ServiceCta from "@@/components/services/ServiceCta";
import { NURSING_TRAINING_SEO, requisition, type AssuranceIcon } from "@@/data/nursingTraining";

export const metadata: Metadata = {
  title: NURSING_TRAINING_SEO.title,
  description: NURSING_TRAINING_SEO.description,
};

const ASSURANCE_ICONS: Record<AssuranceIcon, LucideIcon> = {
  nda: ShieldCheck,
  schedule: Clock,
  card: IdCard,
};

export default function NursingTrainingPage() {
  return (
    <>
      <TrainingBreadcrumb />
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
