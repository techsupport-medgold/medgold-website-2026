import { describe, expect, it } from "vitest";
import { SITE_URL } from "@@/config/site";
import about from "./__fixtures__/expert-schema/about-us.json";
import contact from "./__fixtures__/expert-schema/contact-us.json";
import home from "./__fixtures__/expert-schema/home.json";
import staffing from "./__fixtures__/expert-schema/staffing.json";
import {
  aboutSchemaGraph,
  contactSchemaGraph,
  homeSchemaGraph,
  SCHEMA_EMAIL,
  SCHEMA_LANGUAGE,
  SCHEMA_PHONE,
  staffingSchemaGraph,
} from "./page-schemas";

/** Expert draft with only the agreed clean-ups applied. */
function cleaned(expert: unknown) {
  const text = JSON.stringify(expert)
    .replaceAll("https://medgoldhealthcare.com", SITE_URL)
    .replace(/"\+91 ?9150 ?937804"|"\+91 91509 37804"/g, JSON.stringify(SCHEMA_PHONE))
    .replace(/"(care@medgoldhealthcare\.com|sundharmedgold@gmail\.com)"/g, JSON.stringify(SCHEMA_EMAIL))
    .replace(/"inLanguage":("en"|\["en","ta"\]|"en-IN")/g, `"inLanguage":"${SCHEMA_LANGUAGE}"`)
    .replaceAll(", and ", " and ")
    .replaceAll(", or careers", " or careers");
  return JSON.parse(text);
}

const cases = [
  ["home", homeSchemaGraph(), home],
  ["about-us", aboutSchemaGraph(), about],
  ["contact-us", contactSchemaGraph(), contact],
  ["staffing", staffingSchemaGraph(), staffing],
] as const;

describe("expert page schemas", () => {
  it.each(cases)("%s matches the expert graph after clean-ups", (_n, ours, expert) => {
    expect(ours).toEqual(cleaned(expert));
  });

  it.each(cases)("%s follows the copy rule and shared ids", (_n, ours) => {
    const text = JSON.stringify(ours);
    expect(text).not.toMatch(/, and |, r|\u2014/);
    const nodes = ours["@graph"] as Array<Record<string, unknown>>;
    const ids = nodes.map((n) => n["@id"]);
    expect(ids).toContain(`${SITE_URL}/#organization`);
    expect(ids).toContain(`${SITE_URL}/#website`);
    for (const n of nodes) if ("inLanguage" in n) expect(n.inLanguage).toBe("en-IN");
    expect(text).not.toMatch(/\+91 /);
  });
});
