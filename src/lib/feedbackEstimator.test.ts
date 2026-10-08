import { describe, expect, it } from "vitest";
import { buildEstimatorMessage, DEFAULT_ESTIMATE_INPUT, estimateDeployment } from "@@/lib/feedbackEstimator";

describe("estimateDeployment", () => {
  it("matches the Figma default blueprint", () => {
    expect(estimateDeployment(DEFAULT_ESTIMATE_INPUT)).toEqual({
      tablets: "4 Units",
      coordinators: "2 On-Floor Specialists",
      sla: "< 10 Minutes",
      npsUplift: "+25 Points",
      accreditation: "NABH 5th Ed CQI Standard",
    });
  });

  it("scales tablets and coordinators with capacity and adds one for ER", () => {
    const result = estimateDeployment({ capacity: "tertiary", touchpoints: ["tablets", "kiosks", "qr", "er"] });
    expect(result.tablets).toBe("32 Units");
    expect(result.coordinators).toBe("9 On-Floor Specialists");
    expect(result.npsUplift).toBe("+30 Points");
  });

  it("reports no tablets when the bedside touchpoint is off", () => {
    const result = estimateDeployment({ capacity: "mid", touchpoints: [] });
    expect(result.tablets).toBe("Not selected");
    expect(result.npsUplift).toBe("+10 Points");
  });
});

describe("buildEstimatorMessage", () => {
  it("lists the selections and the estimate", () => {
    const message = buildEstimatorMessage({ capacity: "large", touchpoints: ["kiosks"] });
    expect(message).toContain("Bed footprint: 100 - 300 Beds");
    expect(message).toContain("Touchpoints: Discharge & Billing Counter Kiosks");
    expect(message).toContain("Bedside tablets: Not selected");
    expect(message).toContain("Patient care coordinators: 5 On-Floor Specialists");
  });

  it("says when no touchpoints are selected", () => {
    expect(buildEstimatorMessage({ capacity: "daycare", touchpoints: [] })).toContain("Touchpoints: None selected");
  });
});
