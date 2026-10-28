"use client";

import { useEffect, useRef } from "react";

/**
 * LasMind accessibility menu, shown as a header button (placement "inline").
 * The span reserves the button's space so nothing shifts when it loads, and the
 * package is imported inside the effect so it stays out of the initial bundle.
 * The menu itself opens as a fixed side drawer on document.body.
 */
export default function AccessibilityWidget() {
  const slot = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let destroy: (() => void) | undefined;
    let cancelled = false;
    void import("@lasmind/website-accessibility").then(({ init }) => {
      // Guard: the slot may already hold a widget if StrictMode re-ran the effect.
      if (cancelled || !slot.current || slot.current.childElementCount > 0) return;
      destroy = init({ placement: "inline", size: "sm", side: "right", container: slot.current }).destroy;
    });
    return () => {
      cancelled = true;
      destroy?.();
    };
  }, []);

  return <span ref={slot} className="a11y-header-slot inline-flex size-11 shrink-0" />;
}
