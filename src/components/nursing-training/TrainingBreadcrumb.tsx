import { Award, Briefcase, Hospital, Phone, type LucideIcon } from "lucide-react";
import ServiceBreadcrumb from "@@/components/services/ServiceBreadcrumb";
import { SITE } from "@@/config/site";
import { breadcrumb } from "@@/data/nursingTraining";

const BADGE_ICONS: Record<(typeof breadcrumb.badges)[number]["icon"], LucideIcon> = {
  iso: Award,
  hospital: Hospital,
  placement: Briefcase,
};

export default function TrainingBreadcrumb() {
  return (
    <ServiceBreadcrumb current={breadcrumb.current}>
      {breadcrumb.badges.map((badge) => {
        const Icon = BADGE_ICONS[badge.icon];
        return (
          <p
            key={badge.label}
            className="inline-flex items-center gap-1 rounded bg-surface px-2 py-0.5 text-xs font-semibold text-primary-deep shadow-sm"
          >
            <Icon className="size-3" aria-hidden="true" />
            {badge.label}
          </p>
        );
      })}
      <a
        href={`tel:${SITE.contact.phoneHref}`}
        className="inline-flex min-h-6 items-center gap-1 rounded bg-primary-deep px-2 py-0.5 text-xs font-semibold text-white hover:bg-primary"
      >
        <Phone className="size-3" aria-hidden="true" />
        {breadcrumb.hotlineLabel} {SITE.contact.phone}
      </a>
    </ServiceBreadcrumb>
  );
}
