import type { ReactNode } from "react";
import { Plus } from "lucide-react";
import { cn } from "@@/lib/utils";

export type AccordionItem = { question: string; answer: ReactNode };

type AccordionProps = {
  items: readonly AccordionItem[];
  /** Native exclusive group: opening one closes the others. */
  name?: string;
  className?: string;
};

/** FAQ list on native details/summary: keyboard and screen-reader ready with no JS. */
export default function Accordion({ items, name, className }: AccordionProps) {
  return (
    <div className={cn("divide-y divide-border-muted rounded-card border border-border-muted bg-surface", className)}>
      {items.map((item) => (
        <details key={item.question} name={name} className="group">
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold text-primary-deep transition-colors hover:text-primary sm:px-6 [&::-webkit-details-marker]:hidden">
            {item.question}
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform duration-300 ease-out-expo group-open:rotate-45">
              <Plus className="size-4" aria-hidden="true" />
            </span>
          </summary>
          <div className="px-5 pb-5 text-ink-muted sm:px-6">{item.answer}</div>
        </details>
      ))}
    </div>
  );
}
