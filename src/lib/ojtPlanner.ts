import { planner } from "@@/data/nursingTraining";

export type CapacityId = (typeof planner.capacityOptions)[number]["id"];
export type BatchId = (typeof planner.batchOptions)[number]["id"];

export type CohortInput = {
  capacity: CapacityId;
  batch: BatchId;
  focusAreas: readonly string[];
};

export type CohortRecommendation = {
  format: string;
  ratio: string;
  ratioNote: string;
  batches: string;
  batchNote: string;
};

const FORMATS: Record<CapacityId, string> = {
  daycare: "Standard 14-Day Bedside Clinical Cohort",
  mid: "Standard 14-Day Bedside Clinical Cohort",
  large: "21-Day Multi-Ward Clinical Cohort",
  multi: "30-Day Multi-Unit Rolling Cohort",
};

const STAFFING: Record<BatchId, Omit<CohortRecommendation, "format">> = {
  xs: { ratio: "1 : 8", ratioNote: "Ensures 100% Floor Supervision", batches: "2 Batches", batchNote: "Morning & Evening Shifts" },
  sm: { ratio: "1 : 8", ratioNote: "Ensures 100% Floor Supervision", batches: "3 Batches", batchNote: "Morning, Evening & Night Shifts" },
  md: { ratio: "1 : 10", ratioNote: "Lead trainer plus floor mentors", batches: "4 Batches", batchNote: "Staggered across all shifts" },
  lg: { ratio: "1 : 10", ratioNote: "Lead trainer plus floor mentors", batches: "6 Batches", batchNote: "Rolling cohorts across all shifts" },
};

export const DEFAULT_COHORT: CohortInput = {
  capacity: "daycare",
  batch: "xs",
  focusAreas: planner.focusAreas,
};

export function recommendCohort({ capacity, batch }: CohortInput): CohortRecommendation {
  return { format: FORMATS[capacity], ...STAFFING[batch] };
}

const labelOf = <T extends { id: string; label: string }>(options: readonly T[], id: string) =>
  options.find((option) => option.id === id)?.label ?? id;

export function buildCohortMessage(input: CohortInput): string {
  const result = recommendCohort(input);
  return [
    "OJT cohort request from the Med Gold website",
    "",
    `Hospital capacity: ${labelOf(planner.capacityOptions, input.capacity)}`,
    `Batch size: ${labelOf(planner.batchOptions, input.batch)}`,
    `Focus areas: ${input.focusAreas.length ? input.focusAreas.join(", ") : "None selected"}`,
    "",
    `Recommended format: ${result.format}`,
    `Trainer-to-aide ratio: ${result.ratio}`,
    `Shift rotation: ${result.batches} (${result.batchNote})`,
    "",
    "Please confirm the cohort specification and share available dates.",
  ].join("\n");
}
