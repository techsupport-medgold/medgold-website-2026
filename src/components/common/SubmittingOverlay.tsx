"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { SITE } from "@@/config/site";

type SubmittingOverlayProps = {
  open: boolean;
  title: string;
  message?: string;
};

const subscribe = () => () => {};

export default function SubmittingOverlay({
  open,
  title,
  message = "Please wait a moment and don't close or refresh this page.",
}: SubmittingOverlayProps) {
  const isClient = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const overlayRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }
    const overlay = overlayRef.current;
    const siblings = Array.from(document.body.children).filter(
      (element): element is HTMLElement => element instanceof HTMLElement && element !== overlay && !element.inert,
    );
    const previousOverflow = document.body.style.overflow;

    siblings.forEach((element) => (element.inert = true));
    document.body.style.overflow = "hidden";
    cardRef.current?.focus();

    const warnBeforeLeaving = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", warnBeforeLeaving);

    return () => {
      siblings.forEach((element) => (element.inert = false));
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("beforeunload", warnBeforeLeaving);
    };
  }, [open]);

  if (!isClient || !open) {
    return null;
  }

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-primary-deep/70 p-6 backdrop-blur-sm animate-in fade-in-0 duration-300 motion-reduce:animate-none"
    >
      <div
        ref={cardRef}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="submitting-title"
        aria-describedby="submitting-message"
        tabIndex={-1}
        className="w-full max-w-sm rounded-2xl border-t-4 border-gold bg-surface px-6 py-8 text-center shadow-card animate-in zoom-in-95 fade-in-0 duration-500 ease-spring focus-visible:outline-none motion-reduce:animate-none sm:px-8"
      >
        <div className="relative mx-auto size-36" aria-hidden="true">
          <span className="absolute inset-3 rounded-full bg-gold/25 motion-safe:animate-ping motion-safe:[animation-duration:2s]" />
          <svg viewBox="0 0 100 100" className="absolute inset-0 size-full">
            <circle cx="50" cy="50" r="45" fill="none" strokeWidth="5" className="stroke-primary/15" />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray="70 213"
              className="origin-center stroke-gold motion-safe:animate-spin motion-safe:[animation-duration:1.2s]"
            />
          </svg>
          <span className="absolute inset-[18px] flex items-center justify-center rounded-full bg-surface shadow-card ring-4 ring-primary/10">
            <Image src={SITE.logo} alt="" width={80} height={32} className="h-auto w-20" />
          </span>
        </div>

        <h2 id="submitting-title" className="mt-6 text-xl font-bold text-primary-deep">
          {title}
        </h2>
        <p id="submitting-message" className="mt-2 text-sm text-ink-muted">
          {message}
        </p>

        <div className="mt-5 flex justify-center gap-2 motion-reduce:hidden" aria-hidden="true">
          {[0, 150, 300].map((delay) => (
            <span
              key={delay}
              className="size-2.5 animate-bounce rounded-full bg-gold"
              style={{ animationDelay: `${delay}ms` }}
            />
          ))}
        </div>
        <p className="mt-5 hidden text-sm font-semibold text-gold-ink motion-reduce:block">Sending...</p>
      </div>
    </div>,
    document.body,
  );
}
