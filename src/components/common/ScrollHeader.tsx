"use client";

import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@@/lib/utils";

/** Sticky header that gains a solid background and shadow once the page scrolls. */
export default function ScrollHeader({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 8);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header
      data-scrolled={scrolled || undefined}
      className={cn(
        "sticky top-0 z-40 border-b transition-[background-color,box-shadow,border-color] duration-300",
        scrolled ? "border-border-muted bg-surface/95 shadow-card backdrop-blur-md" : "border-transparent bg-surface",
      )}
    >
      {children}
    </header>
  );
}
