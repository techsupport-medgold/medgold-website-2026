import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { DevRoutes } from "@@/config/routes";

const crumbLinkClass = "inline-flex min-h-11 items-center hover:text-primary hover:underline sm:min-h-0";

type ServiceBreadcrumbProps = {
  current: string;
  children?: ReactNode;
};

export default function ServiceBreadcrumb({ current, children }: ServiceBreadcrumbProps) {
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
            <li>
              <Link href={DevRoutes.SERVICES} className={crumbLinkClass}>
                Services
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

        {children ? <div className="flex flex-wrap items-center gap-x-4 gap-y-1">{children}</div> : null}
      </div>
    </div>
  );
}
