import { describe, expect, it } from "vitest";
import { buildCohortMessage, DEFAULT_COHORT, recommendCohort } from "@@/lib/ojtPlanner";

describe("recommendCohort", () => {
  it("matches the design for the default selection", () => {
    expect(recommendCohort(DEFAULT_COHORT)).toEqual({
      format: "Standard 14-Day Bedside Clinical Cohort",
      ratio: "1 : 8",
      ratioNote: "Ensures 100% Floor Supervision",
      batches: "2 Batches",
      batchNote: "Morning & Evening Shifts",
    });
  });

  it("scales format with capacity and rotation with batch size", () => {
    const result = recommendCohort({ capacity: "multi", batch: "lg", focusAreas: [] });
    expect(result.format).toBe("30-Day Multi-Unit Rolling Cohort");
    expect(result.ratio).toBe("1 : 10");
    expect(result.batches).toBe("6 Batches");
  });
});

describe("buildCohortMessage", () => {
  it("lists the selections and the recommendation", () => {
    const message = buildCohortMessage({ capacity: "large", batch: "sm", focusAreas: ["Catheter, Tube & Drain Safety"] });
    expect(message).toContain("Hospital capacity: 100 - 300 Beds");
    expect(message).toContain("Batch size: 21 - 40 Aides");
    expect(message).toContain("Focus areas: Catheter, Tube & Drain Safety");
    expect(message).toContain("Recommended format: 21-Day Multi-Ward Clinical Cohort");
    expect(message).toContain("Shift rotation: 3 Batches");
  });

  it("notes when no focus areas are selected", () => {
    expect(buildCohortMessage({ ...DEFAULT_COHORT, focusAreas: [] })).toContain("Focus areas: None selected");
  });
});
