import { Zap } from "lucide-react";
import ServiceBreadcrumb from "@@/components/services/ServiceBreadcrumb";
import { breadcrumb } from "@@/data/staffing";

export default function StaffingBreadcrumb() {
  return (
    <ServiceBreadcrumb current={breadcrumb.current}>
      <p className="inline-flex items-center gap-1.5 rounded bg-surface px-2 py-0.5 text-xs font-semibold text-primary-deep shadow-sm">
        <span className="size-2 rounded-full bg-primary" aria-hidden="true" />
        {breadcrumb.rosterBadge}
      </p>
      <p className="inline-flex items-center gap-1 rounded bg-gold px-2 py-0.5 text-xs font-semibold text-primary-deep shadow-sm">
        <Zap className="size-3" aria-hidden="true" />
        {breadcrumb.slaBadge}
      </p>
    </ServiceBreadcrumb>
  );
}
