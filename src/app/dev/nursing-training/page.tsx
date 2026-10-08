import type { Metadata } from "next";
import { Award, Briefcase, ClipboardCheck, Clock, Hospital, IdCard, ShieldCheck, type LucideIcon } from "lucide-react";
import CohortPlanner from "@@/components/nursing-training/CohortPlanner";
import CurriculumSection from "@@/components/nursing-training/CurriculumSection";
import TraineeProfiles from "@@/components/nursing-training/TraineeProfiles";
import TrainingComparison from "@@/components/nursing-training/TrainingComparison";
import TrainingHero from "@@/components/nursing-training/TrainingHero";
import TrainingPillars from "@@/components/nursing-training/TrainingPillars";
import ServiceBreadcrumb from "@@/components/services/ServiceBreadcrumb";
import ServiceCta from "@@/components/services/ServiceCta";
import { breadcrumb, NURSING_TRAINING_SEO, requisition, type AssuranceIcon } from "@@/data/nursingTraining";

export const metadata: Metadata = {
  title: NURSING_TRAINING_SEO.title,
  description: NURSING_TRAINING_SEO.description,
};

const ASSURANCE_ICONS: Record<AssuranceIcon, LucideIcon> = {
  nda: ShieldCheck,
  schedule: Clock,
  card: IdCard,
};

const BADGE_ICONS: Record<(typeof breadcrumb.badges)[number]["icon"], LucideIcon> = {
  iso: Award,
  hospital: Hospital,
  placement: Briefcase,
};

export default function NursingTrainingPage() {
  return (
    <>
      <ServiceBreadcrumb
        current={breadcrumb.current}
        badges={breadcrumb.badges.map((badge) => ({ label: badge.label, icon: BADGE_ICONS[badge.icon] }))}
        contacts={["phone"]}
      />
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
