import Link from "next/link";
import { ChevronRight, type LucideIcon } from "lucide-react";
import Pill from "@@/components/ui/pill";
import { DevRoutes } from "@@/config/routes";

const crumbLinkClass = "link-underline inline-flex min-h-11 items-center hover:text-primary sm:min-h-0";

export type BreadcrumbBadge = { label: string; icon?: LucideIcon; tone?: "teal" | "gold" | "neutral" };

type ServiceBreadcrumbProps = {
  current: string;
  badges?: readonly BreadcrumbBadge[];
};

export default function ServiceBreadcrumb({ current, badges }: ServiceBreadcrumbProps) {
  return (
    <div className="border-b border-primary/10 bg-surface-raised">
      <div className="container flex flex-col gap-2 py-2.5 lg:flex-row lg:items-center lg:justify-between">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1 text-xs font-semibold text-ink-muted">
            <li>
              <Link href={DevRoutes.HOME} className={crumbLinkClass}>
                Home
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="size-3.5" />
            </li>
            <li aria-current="page" className="text-primary-deep">
              {current}
            </li>
          </ol>
        </nav>

        {badges?.length ? (
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
            {badges.map(({ label, icon: Icon, tone = "teal" }) => (
              <Pill key={label} tone={tone} className="bg-surface shadow-sm">
                {Icon ? <Icon className="size-3" aria-hidden="true" /> : <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />}
                {label}
              </Pill>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
