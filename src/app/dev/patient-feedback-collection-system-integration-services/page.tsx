import type { Metadata } from "next";
import { CalendarCheck } from "lucide-react";
import BenefitsSection from "@@/components/patient-feedback/BenefitsSection";
import CaptureTouchpoints from "@@/components/patient-feedback/CaptureTouchpoints";
import FeedbackBreadcrumb from "@@/components/patient-feedback/FeedbackBreadcrumb";
import FeedbackEstimator from "@@/components/patient-feedback/FeedbackEstimator";
import FeedbackHero from "@@/components/patient-feedback/FeedbackHero";
import WorkflowSection from "@@/components/patient-feedback/WorkflowSection";
import ServiceCta from "@@/components/services/ServiceCta";
import StatsBar from "@@/components/services/StatsBar";
import { cta, PATIENT_FEEDBACK_SEO, stats } from "@@/data/patientFeedback";

export const metadata: Metadata = {
  title: PATIENT_FEEDBACK_SEO.title,
  description: PATIENT_FEEDBACK_SEO.description,
};

export default function PatientFeedbackServicePage() {
  return (
    <>
      <FeedbackBreadcrumb />
      <FeedbackHero />
      <StatsBar label="Patient feedback results" stats={stats} alternate />
      <CaptureTouchpoints />
      <WorkflowSection />
      <BenefitsSection />
      <FeedbackEstimator />
      <ServiceCta
        id="feedback-cta"
        headingId="feedback-cta-heading"
        eyebrow={cta.eyebrow}
        heading={cta.heading}
        subheading={cta.subheading}
        intro={cta.intro}
        shareFields={cta.shareFields}
        note={cta.note}
        cta={{ label: cta.button, icon: CalendarCheck }}
      />
    </>
  );
}
