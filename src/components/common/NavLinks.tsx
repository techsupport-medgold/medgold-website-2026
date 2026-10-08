"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ServicesMenu from "@@/components/common/ServicesMenu";
import { DEV_NAV, DevRoutes } from "@@/config/routes";
import { cn } from "@@/lib/utils";

type NavLinksProps = {
  variant: "desktop" | "mobile";
  className?: string;
  linkClassName?: string;
  onNavigate?: () => void;
};

const LINK_CLASS =
  "inline-flex min-h-11 items-center rounded-md px-3 text-sm font-medium text-ink-muted transition-colors hover:text-primary";

const DESKTOP_INDICATOR =
  "relative after:pointer-events-none after:absolute after:inset-x-3 after:bottom-1.5 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-gold after:transition-transform after:duration-300 after:ease-out-expo hover:after:scale-x-100 aria-[current=page]:after:scale-x-100";

export default function NavLinks({ variant, className, linkClassName, onNavigate }: NavLinksProps) {
  const pathname = usePathname();
  // The desktop header already has a "Contact Us" button; phones hide that button, so they keep the link.
  const items = variant === "desktop" ? DEV_NAV.filter((item) => item.href !== DevRoutes.CONTACT) : DEV_NAV;

  return (
    <ul className={className}>
      {items.map((item) => {
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
                variant === "desktop" && DESKTOP_INDICATOR,
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
