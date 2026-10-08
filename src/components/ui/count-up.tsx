"use client";

import { useEffect, useRef } from "react";
import { cn } from "@@/lib/utils";

type CountUpProps = {
  value: string;
  className?: string;
  duration?: number;
};

const NUMBER = /(\d[\d,]*(?:\.\d+)?)/;

/**
 * Counts the first number in `value` up from zero when it enters the viewport
 * ("500+", "98%", "₹2.5 Cr"). Server HTML holds the final value for crawlers
 * and reduced-motion users; values like "24/7" render as-is.
 */
export default function CountUp({ value, className, duration = 1400 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    const match = value.match(NUMBER);
    if (!node || !match || value.includes("/") || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const raw = match[1];
    const target = Number(raw.replace(/,/g, ""));
    const decimals = raw.includes(".") ? raw.split(".")[1].length : 0;
    const useGrouping = raw.includes(",");
    const [before, after] = [value.slice(0, match.index), value.slice((match.index ?? 0) + raw.length)];
    const format = (n: number) =>
      `${before}${n.toLocaleString("en-IN", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
        useGrouping,
      })}${after}`;

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          node.textContent = format(target * eased);
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        node.textContent = format(0);
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      node.textContent = value;
    };
  }, [value, duration]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {value}
    </span>
  );
}
