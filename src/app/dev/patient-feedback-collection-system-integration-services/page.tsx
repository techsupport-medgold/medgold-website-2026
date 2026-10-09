import type { Metadata } from "next";
import { CalendarCheck, ShieldCheck } from "lucide-react";
import BenefitsSection from "@@/components/patient-feedback/BenefitsSection";
import CaptureTouchpoints from "@@/components/patient-feedback/CaptureTouchpoints";
import FeedbackEstimator from "@@/components/patient-feedback/FeedbackEstimator";
import FeedbackHero from "@@/components/patient-feedback/FeedbackHero";
import WorkflowSection from "@@/components/patient-feedback/WorkflowSection";
import Breadcrumb from "@@/components/common/Breadcrumb";
import { DevRoutes } from "@@/config/routes";
import ServiceCta from "@@/components/services/ServiceCta";
import StatsBar from "@@/components/services/StatsBar";
import { breadcrumb, cta, PATIENT_FEEDBACK_SEO, stats } from "@@/data/patientFeedback";

export const metadata: Metadata = {
  title: PATIENT_FEEDBACK_SEO.title,
  description: PATIENT_FEEDBACK_SEO.description,
};

export default function PatientFeedbackServicePage() {
  return (
    <>
      <Breadcrumb
        path={DevRoutes.PATIENT_FEEDBACK}
        current={breadcrumb.current}
        badges={[
          { label: breadcrumb.badge },
          { label: breadcrumb.compliance, icon: ShieldCheck, tone: "gold" },
        ]}
      />
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
