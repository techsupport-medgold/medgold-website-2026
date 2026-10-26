import JsonLd from "@@/components/common/JsonLd";
import { organizationSchema, websiteSchema } from "@@/lib/schema";

/**
 * Site-wide Organization + WebSite JSON-LD. Rendered per page (not in the root
 * layout) so pages with their own expert @graph carry only one graph.
 */
export default function SiteSchema() {
  return (
    <>
      <JsonLd id="organization-schema" data={organizationSchema} />
      <JsonLd id="website-schema" data={websiteSchema} />
    </>
  );
}
