"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type FocusEvent,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import type { NavItem } from "@@/config/routes";
import { cn } from "@@/lib/utils";

type ServicesMenuProps = {
  item: NavItem;
  variant: "desktop" | "mobile";
  triggerClassName?: string;
  onNavigate?: () => void;
};

const CLOSE_DELAY_MS = 150;

function isCurrent(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function ServicesMenu({ item, variant, triggerClassName, onNavigate }: ServicesMenuProps) {
  const pathname = usePathname();
  const panelId = useId();
  const children = item.children ?? [];
  const sectionActive = isCurrent(pathname, item.href) || children.some((child) => isCurrent(pathname, child.href));

  // The menu is open only on the page where it was opened, so navigating closes it.
  const [openOn, setOpenOn] = useState<string | null>(variant === "mobile" && sectionActive ? pathname : null);
  const open = openOn === pathname;
  const openedByHover = useRef(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLLIElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };

  const close = () => {
    cancelClose();
    openedByHover.current = false;
    setOpenOn(null);
  };

  useEffect(() => {
    if (!open || variant !== "desktop") return;
    const onPointerDown = (event: PointerEvent) => {
      if (containerRef.current?.contains(event.target as Node)) return;
      openedByHover.current = false;
      setOpenOn(null);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open, variant]);

  useEffect(
    () => () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    },
    [],
  );

  const handleNavigate = () => {
    close();
    onNavigate?.();
  };

  const toggle = () => {
    if (open && openedByHover.current) {
      openedByHover.current = false;
      return;
    }
    if (open) close();
    else setOpenOn(pathname);
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape" && open) {
      event.stopPropagation();
      close();
      triggerRef.current?.focus();
    }
  };

  const onBlur = (event: FocusEvent) => {
    if (variant === "desktop" && !containerRef.current?.contains(event.relatedTarget as Node)) close();
  };

  const hoverProps =
    variant === "desktop"
      ? {
          onPointerEnter: (event: ReactPointerEvent) => {
            if (event.pointerType !== "mouse") return;
            cancelClose();
            if (!open) {
              openedByHover.current = true;
              setOpenOn(pathname);
            }
          },
          onPointerLeave: (event: ReactPointerEvent) => {
            if (event.pointerType !== "mouse") return;
            cancelClose();
            closeTimer.current = setTimeout(close, CLOSE_DELAY_MS);
          },
        }
      : {};

  const links = [{ href: item.href, label: `All ${item.label.toLowerCase()}` }, ...children];

  return (
    <li ref={containerRef} className={variant === "desktop" ? "relative" : undefined} onKeyDown={onKeyDown} onBlur={onBlur} {...hoverProps}>
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={toggle}
        className={cn(triggerClassName, "gap-1", variant === "mobile" && "justify-between", sectionActive && "font-semibold text-primary")}
      >
        {item.label}
        <ChevronDown
          className={cn("size-4 transition-transform motion-reduce:transition-none", open && "rotate-180")}
          aria-hidden="true"
        />
      </button>

      <div
        id={panelId}
        hidden={!open}
        className={cn(
          variant === "desktop"
            ? "absolute left-1/2 top-full z-50 w-72 -translate-x-1/2 pt-2"
            : "border-l-2 border-border-muted ml-3 pl-2",
        )}
      >
        <ul
          className={cn(
            "grid gap-0.5",
            variant === "desktop" && "rounded-xl border border-border-muted bg-surface p-2 shadow-card",
          )}
        >
          {links.map((link, index) => {
            const current = pathname === link.href;
            return (
              <li key={link.href} className={cn(index === 0 && "border-b border-border-muted pb-1 mb-1")}>
                <Link
                  href={link.href}
                  aria-current={current ? "page" : undefined}
                  onClick={handleNavigate}
                  className={cn(
                    "flex min-h-11 w-full items-center rounded-md px-3 text-sm font-medium text-ink-muted transition-colors hover:bg-surface-muted hover:text-primary",
                    "aria-[current=page]:font-semibold aria-[current=page]:text-primary",
                    index === 0 && "text-primary-deep",
                    variant === "mobile" && "text-base",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </li>
  );
}
