"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ServicesMenu from "@@/components/common/ServicesMenu";
import { DEV_NAV } from "@@/config/routes";
import { cn } from "@@/lib/utils";

type NavLinksProps = {
  variant: "desktop" | "mobile";
  className?: string;
  linkClassName?: string;
  onNavigate?: () => void;
};

const LINK_CLASS =
  "inline-flex min-h-11 items-center rounded-md px-3 text-sm font-medium text-ink-muted transition-colors hover:text-primary";

export default function NavLinks({ variant, className, linkClassName, onNavigate }: NavLinksProps) {
  const pathname = usePathname();

  return (
    <ul className={className}>
      {DEV_NAV.map((item) => {
        if (item.children) {
          return (
            <ServicesMenu
              key={item.href}
              item={item}
              variant={variant}
              triggerClassName={cn(LINK_CLASS, linkClassName)}
              onNavigate={onNavigate}
            />
          );
        }
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              onClick={onNavigate}
              className={cn(
                LINK_CLASS,
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
