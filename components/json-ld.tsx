type JsonLdData = Record<string, unknown> | Record<string, unknown>[];

export function JsonLdScript({ data }: { data: JsonLdData }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
