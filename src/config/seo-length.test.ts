import { describe, expect, it } from "vitest";
import { ABOUT_SEO } from "@@/data/about";
import { BRANDING_SEO } from "@@/data/branding";
import { CAREERS_SEO } from "@@/data/careers";
import { CONTACT_SEO } from "@@/data/contact";
import { HOME_SEO } from "@@/data/home";
import { PRIVACY_SEO, TERMS_SEO } from "@@/data/legal";
import { NURSING_TRAINING_SEO } from "@@/data/nursingTraining";
import { PATIENT_FEEDBACK_SEO } from "@@/data/patientFeedback";
import { PHARMACY_AUDIT_SEO } from "@@/data/pharmacyAudit";
import { STAFFING_SEO } from "@@/data/staffing";

const BRAND_SUFFIX = " | Med Gold";

/** Titles that use the root template. The rendered string is what search results show. */
const TEMPLATED_TITLES = [ABOUT_SEO.title, CONTACT_SEO.title, CAREERS_SEO.title, PRIVACY_SEO.title, TERMS_SEO.title];

const DESCRIPTIONS = [
  HOME_SEO,
  ABOUT_SEO,
  CONTACT_SEO,
  CAREERS_SEO,
  PRIVACY_SEO,
  TERMS_SEO,
  STAFFING_SEO,
  PHARMACY_AUDIT_SEO,
  BRANDING_SEO,
  PATIENT_FEEDBACK_SEO,
  NURSING_TRAINING_SEO,
];

describe("search snippet length", () => {
  it("keeps the homepage title in the 50-60 character window", () => {
    expect(HOME_SEO.title.length).toBeGreaterThanOrEqual(50);
    expect(HOME_SEO.title.length).toBeLessThanOrEqual(60);
  });

  it.each(TEMPLATED_TITLES)("renders %s between 50 and 60 characters with the brand suffix", (title) => {
    const rendered = `${title}${BRAND_SUFFIX}`;
    expect(rendered.length).toBeGreaterThanOrEqual(50);
    expect(rendered.length).toBeLessThanOrEqual(60);
  });

  it.each(DESCRIPTIONS)("keeps $title description between 140 and 160 characters", ({ description }) => {
    expect(description.length).toBeGreaterThanOrEqual(140);
    expect(description.length).toBeLessThanOrEqual(160);
  });
});
