import JsonLd from "@@/components/common/JsonLd";
import { absoluteUrl } from "@@/config/site";
import { webPageSchema } from "@@/lib/schema";

type PageSchemaProps = {
  /** A `Routes` path, or an absolute URL that is already built. */
  path: string;
  name: string;
  description: string;
};

/** WebPage JSON-LD for an indexable public page. */
export default function PageSchema({ path, name, description }: PageSchemaProps) {
  const url = path.startsWith("http") ? path : absoluteUrl(path);
  return <JsonLd id="webpage-schema" data={webPageSchema({ url, name, description })} />;
}
