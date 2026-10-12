import Link from "next/link";
import { ChevronRight } from "lucide-react";
import JsonLd from "@@/components/common/JsonLd";
import { Routes } from "@@/config/routes";
import { breadcrumbSchema } from "@@/lib/schema";

const crumbLinkClass = "link-underline inline-flex min-h-11 items-center hover:text-primary sm:min-h-0";

type BreadcrumbProps = {
  current: string;
  path: string;
};

export default function Breadcrumb({ current, path }: BreadcrumbProps) {
  const trail = [
    { name: "Home", path: Routes.HOME },
    { name: current, path },
  ];

  return (
    <div className="border-b border-primary/10 bg-surface-raised">
      <JsonLd id="breadcrumb-schema" data={breadcrumbSchema(trail)} />
      <div className="container py-2.5">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1 text-xs font-semibold text-ink-muted">
            <li>
              <Link href={Routes.HOME} className={crumbLinkClass}>
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
      </div>
    </div>
  );
}
