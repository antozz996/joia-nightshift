type JsonLdValue = Record<string, unknown> | Array<Record<string, unknown>>;

function serializeJsonLd(value: JsonLdValue) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export function StructuredData({
  data,
  id,
}: {
  data: JsonLdValue;
  id?: string;
}) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
