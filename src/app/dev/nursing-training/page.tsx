import type { Metadata } from "next";
import CohortPlanner from "@@/components/nursing-training/CohortPlanner";
import CurriculumSection from "@@/components/nursing-training/CurriculumSection";
import TraineeProfiles from "@@/components/nursing-training/TraineeProfiles";
import TrainingBreadcrumb from "@@/components/nursing-training/TrainingBreadcrumb";
import TrainingComparison from "@@/components/nursing-training/TrainingComparison";
import TrainingHero from "@@/components/nursing-training/TrainingHero";
import TrainingPillars from "@@/components/nursing-training/TrainingPillars";
import TrainingRequisition from "@@/components/nursing-training/TrainingRequisition";
import { NURSING_TRAINING_SEO } from "@@/data/nursingTraining";

export const metadata: Metadata = {
  title: NURSING_TRAINING_SEO.title,
  description: NURSING_TRAINING_SEO.description,
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
      <TrainingRequisition />
    </>
  );
}
