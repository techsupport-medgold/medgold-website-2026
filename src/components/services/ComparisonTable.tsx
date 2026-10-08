import { cn } from "@@/lib/utils";

type ComparisonTableProps = {
  caption: string;
  labelledBy: string;
  columns: readonly [string, string, string];
  rows: readonly (readonly [string, string, string])[];
  /** The MedGold column (1 or 2), shaded to stand out. */
  highlightColumn: 1 | 2;
};

export default function ComparisonTable({ caption, labelledBy, columns, rows, highlightColumn }: ComparisonTableProps) {
  return (
    <div
      className="overflow-x-auto rounded-lg bg-surface shadow-card"
      role="region"
      aria-labelledby={labelledBy}
      tabIndex={0}
    >
      <table className="w-full min-w-[720px] border-collapse text-left text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead className="bg-primary-deep text-white">
          <tr>
            {columns.map((column, index) => (
              <th
                key={column}
                scope="col"
                className={cn(
                  "p-4 text-xs font-bold tracking-wide",
                  index === 0 && "w-1/6",
                  index === highlightColumn ? "bg-primary" : index > 0 && "w-1/3 text-white/80",
                )}
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(([dimension, ...cells], rowIndex) => (
            <tr key={dimension} className={rowIndex % 2 === 1 ? "bg-surface-muted" : "bg-surface"}>
              <th scope="row" className="p-4 font-semibold text-primary-deep">
                {dimension}
              </th>
              {cells.map((cell, cellIndex) =>
                cellIndex + 1 === highlightColumn ? (
                  <td
                    key={cell}
                    className={cn(
                      "p-4 text-primary-deep",
                      rowIndex % 2 === 1 ? "bg-primary/10" : "bg-primary/5",
                    )}
                  >
                    {cell}
                  </td>
                ) : (
                  <td key={cell} className="p-4 text-ink-muted">
                    {cell}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
