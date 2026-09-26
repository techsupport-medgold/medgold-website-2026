"use client";

import { useEffect, useState } from "react";

type LaunchCountdownProps = {
  /** ISO date with offset, or null while the launch date is not announced. */
  launchDate: string | null;
};

type Remaining = { days: number; hours: number; minutes: number; seconds: number };

const UNITS = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" },
] as const;

function getRemaining(target: number): Remaining | null {
  const diff = target - Date.now();
  if (diff <= 0) return null;
  const totalSeconds = Math.floor(diff / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

function formatLaunchDate(target: number) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  }).format(target);
}

export default function LaunchCountdown({ launchDate }: LaunchCountdownProps) {
  const parsed = launchDate ? Date.parse(launchDate) : NaN;
  const target = Number.isNaN(parsed) ? null : parsed;

  // `undefined` until mounted so server and first client render match (placeholders).
  const [remaining, setRemaining] = useState<Remaining | null | undefined>(undefined);

  useEffect(() => {
    if (target === null) return;
    const tick = () => setRemaining(getRemaining(target));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [target]);

  const launched = target !== null && remaining === null;

  let caption = "Launch date will be announced soon.";
  if (target !== null) {
    caption = launched
      ? "We are launching now. Stay tuned."
      : `Launching ${formatLaunchDate(target)}`;
  }

  return (
    <div className="w-full">
      <div
        role="timer"
        aria-live="off"
        aria-label="Time remaining until launch"
        className="grid grid-cols-4 gap-2 sm:gap-4"
      >
        {UNITS.map(({ key, label }) => {
          const value =
            remaining && target !== null ? String(remaining[key]).padStart(2, "0") : "--";
          return (
            <div
              key={key}
              className="flex flex-col items-center rounded-lg border border-border-muted border-t-gold bg-surface px-1 py-4 shadow-card [border-top-width:3px] sm:py-6"
            >
              <span className="text-3xl font-bold tabular-nums text-primary sm:text-5xl">
                {value === "--" ? (
                  <>
                    <span aria-hidden="true">--</span>
                    <span className="sr-only">not set</span>
                  </>
                ) : (
                  value
                )}
              </span>
              <span className="mt-1 text-xs font-medium uppercase tracking-wider text-ink-subtle sm:text-sm">
                {label}
              </span>
            </div>
          );
        })}
      </div>
      <p className="mt-4 text-center text-sm font-medium text-ink-muted">{caption}</p>
    </div>
  );
}
