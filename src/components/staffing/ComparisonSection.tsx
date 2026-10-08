import { comparison } from "@@/data/staffing";
import { cn } from "@@/lib/utils";

export default function ComparisonSection() {
  return (
    <section aria-labelledby="staffing-comparison-heading" className="bg-surface-raised py-16 sm:py-20">
      <div className="container">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary-deep">{comparison.eyebrow}</p>
          <h2
            id="staffing-comparison-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl"
          >
            {comparison.heading}
          </h2>
          <p className="mt-4 text-ink-muted">{comparison.intro}</p>
        </div>

        <div
          className="mt-10 overflow-x-auto rounded-lg bg-surface shadow-card"
          role="region"
          aria-labelledby="staffing-comparison-heading"
          tabIndex={0}
        >
          <table className="w-full min-w-[720px] border-collapse text-left text-sm">
            <caption className="sr-only">{comparison.heading}</caption>
            <thead className="bg-primary-deep text-white">
              <tr>
                <th scope="col" className="w-1/6 p-4 text-xs font-bold tracking-wide">
                  {comparison.columns[0]}
                </th>
                <th scope="col" className="w-1/3 p-4 text-xs font-bold tracking-wide text-white/80">
                  {comparison.columns[1]}
                </th>
                <th scope="col" className="bg-primary p-4 text-xs font-bold tracking-wide">
                  {comparison.columns[2]}
                </th>
              </tr>
            </thead>
            <tbody>
              {comparison.rows.map((row, index) => (
                <tr key={row.dimension} className={index % 2 === 1 ? "bg-surface-muted" : "bg-surface"}>
                  <th scope="row" className="p-4 font-semibold text-primary-deep">
                    {row.dimension}
                  </th>
                  <td className="p-4 text-ink-muted">{row.conventional}</td>
                  <td className={cn("p-4 text-primary-deep", index % 2 === 1 ? "bg-primary/10" : "bg-primary/5")}>
                    {row.medgold}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
