import type { Metadata } from "next";
import ServicePlaceholderPage from "@@/components/services/ServicePlaceholderPage";
import { servicePlaceholders } from "@@/data/services";

const service = servicePlaceholders.staffing;

export const metadata: Metadata = {
  title: service.title,
  description: service.description,
};

export default function StaffingServicePage() {
  return <ServicePlaceholderPage service={service} />;
}
