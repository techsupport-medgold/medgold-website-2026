type JsonLdProps = {
  id: string;
  data: Record<string, unknown>;
};

/** Server-rendered JSON-LD so crawlers see structured data in the initial HTML. */
export default function JsonLd({ id, data }: JsonLdProps) {
  return (
    <script
      id={id}
      type="application/ld+json"
      // `<` is escaped so page copy can never close the script tag early.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
