import { estimator } from "@@/data/patientFeedback";

export type FeedbackCapacityId = (typeof estimator.capacityOptions)[number]["id"];
export type TouchpointId = (typeof estimator.touchpointOptions)[number]["id"];

export type EstimatorInput = {
  capacity: FeedbackCapacityId;
  touchpoints: readonly TouchpointId[];
};

export type DeploymentEstimate = {
  tablets: string;
  coordinators: string;
  sla: string;
  npsUplift: string;
  accreditation: string;
};

const TABLETS: Record<FeedbackCapacityId, number> = { daycare: 4, mid: 8, large: 16, tertiary: 32 };
const COORDINATORS: Record<FeedbackCapacityId, number> = { daycare: 2, mid: 3, large: 5, tertiary: 8 };

export const DEFAULT_ESTIMATE_INPUT: EstimatorInput = {
  capacity: "daycare",
  touchpoints: ["tablets", "kiosks", "qr"],
};

export function estimateDeployment({ capacity, touchpoints }: EstimatorInput): DeploymentEstimate {
  const coordinators = COORDINATORS[capacity] + (touchpoints.includes("er") ? 1 : 0);
  return {
    tablets: touchpoints.includes("tablets") ? `${TABLETS[capacity]} Units` : "Not selected",
    coordinators: `${coordinators} On-Floor Specialists`,
    sla: "< 10 Minutes",
    npsUplift: `+${10 + 5 * touchpoints.length} Points`,
    accreditation: "NABH 5th Ed CQI Standard",
  };
}

const labelOf = <T extends { id: string; label: string }>(options: readonly T[], id: string) =>
  options.find((option) => option.id === id)?.label ?? id;

export function buildEstimatorMessage(input: EstimatorInput): string {
  const result = estimateDeployment(input);
  const touchpoints = input.touchpoints.map((id) => labelOf(estimator.touchpointOptions, id));
  return [
    "Patient feedback system pilot request from the Med Gold website",
    "",
    `Bed footprint: ${labelOf(estimator.capacityOptions, input.capacity)}`,
    `Touchpoints: ${touchpoints.length ? touchpoints.join(", ") : "None selected"}`,
    "",
    `Bedside tablets: ${result.tablets}`,
    `Patient care coordinators: ${result.coordinators}`,
    `Escalation SLA: ${result.sla}`,
    `Target NPS uplift (90 days): ${result.npsUplift}`,
    "",
    "Please confirm the architecture and schedule a pilot.",
  ].join("\n");
}
