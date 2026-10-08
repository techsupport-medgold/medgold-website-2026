import type { Metadata } from "next";
import ServicePlaceholderPage from "@@/components/services/ServicePlaceholderPage";
import { servicePlaceholders } from "@@/data/services";

const service = servicePlaceholders.patientFeedback;

export const metadata: Metadata = {
  title: service.title,
  description: service.description,
};

export default function PatientFeedbackServicePage() {
  return <ServicePlaceholderPage service={service} />;
}
