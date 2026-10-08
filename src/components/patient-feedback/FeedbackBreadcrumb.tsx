import { ShieldCheck } from "lucide-react";
import ServiceBreadcrumb from "@@/components/services/ServiceBreadcrumb";
import { breadcrumb } from "@@/data/patientFeedback";

const badgeClass = "inline-flex items-center gap-1 rounded bg-surface px-2 py-0.5 text-xs font-semibold shadow-sm";

export default function FeedbackBreadcrumb() {
  return (
    <ServiceBreadcrumb current={breadcrumb.current}>
      <p className={`${badgeClass} text-primary-deep`}>{breadcrumb.badge}</p>
      <p className={`${badgeClass} text-gold-ink`}>
        <ShieldCheck className="size-3" aria-hidden="true" />
        {breadcrumb.compliance}
      </p>
    </ServiceBreadcrumb>
  );
}
