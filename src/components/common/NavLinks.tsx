"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DEV_NAV } from "@@/config/routes";
import { cn } from "@@/lib/utils";

type NavLinksProps = {
  className?: string;
  linkClassName?: string;
  onNavigate?: () => void;
};

export default function NavLinks({ className, linkClassName, onNavigate }: NavLinksProps) {
  const pathname = usePathname();

  return (
    <ul className={className}>
      {DEV_NAV.map((item) => {
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              onClick={onNavigate}
              className={cn(
                "inline-flex min-h-11 items-center rounded-md px-3 text-sm font-medium text-ink-muted transition-colors hover:text-primary",
                "aria-[current=page]:text-primary aria-[current=page]:font-semibold",
                linkClassName,
              )}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
