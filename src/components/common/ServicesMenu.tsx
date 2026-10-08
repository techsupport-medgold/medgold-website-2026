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

  const focusItem = (index: number | "first" | "last") => {
    const links = Array.from(containerRef.current?.querySelectorAll<HTMLAnchorElement>(`[id="${panelId}"] a`) ?? []);
    if (!links.length) return;
    const target = index === "first" ? 0 : index === "last" ? links.length - 1 : (index + links.length) % links.length;
    links[target]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape" && open) {
      event.stopPropagation();
      close();
      triggerRef.current?.focus();
      return;
    }
    if (variant !== "desktop") return;

    const onTrigger = event.target === triggerRef.current;
    const links = Array.from(containerRef.current?.querySelectorAll<HTMLAnchorElement>(`[id="${panelId}"] a`) ?? []);
    const current = links.indexOf(event.target as HTMLAnchorElement);

    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const toFirst = event.key === "ArrowDown";
      if (onTrigger) {
        if (!open) setOpenOn(pathname);
        requestAnimationFrame(() => focusItem(toFirst ? "first" : "last"));
      } else if (current >= 0) {
        focusItem(current + (toFirst ? 1 : -1));
      }
    } else if ((event.key === "Home" || event.key === "End") && current >= 0) {
      event.preventDefault();
      focusItem(event.key === "Home" ? "first" : "last");
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
            variant === "desktop" &&
              "rounded-xl border border-border-muted bg-surface p-2 shadow-card-hover animate-in fade-in-0 slide-in-from-top-2 duration-200",
          )}
        >
          {children.map((link) => {
            const current = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={current ? "page" : undefined}
                  onClick={handleNavigate}
                  className={cn(
                    "flex min-h-11 w-full items-center rounded-md px-3 text-sm font-medium text-ink-muted transition-colors hover:bg-surface-muted hover:text-primary",
                    "aria-[current=page]:font-semibold aria-[current=page]:text-primary",
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
