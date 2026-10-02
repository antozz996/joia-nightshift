import type { Metadata } from "next";
import { DisplayHeading } from "@/components/shared/DisplayHeading";
import { WorldFrame } from "@/components/shared/WorldFrame";

const labels: Record<string, string> = {
  "feste-di-laurea": "Feste di laurea",
  "18-anni": "18 anni",
  compleanni: "Compleanni",
  "eventi-aziendali": "Eventi aziendali",
};

type PageProps = { params: Promise<{ tipo: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { tipo } = await params;
  const label = labels[tipo] ?? "Evento privato";
  return { title: `${label} a Napoli` };
}

export default async function PrivateEventTypePage({ params }: PageProps) {
  const { tipo } = await params;
  const label = labels[tipo] ?? "Evento privato";

  return (
    <WorldFrame world="private" eyebrow={`PRIVATE / ${label}`}>
      <DisplayHeading as="h1" world="private" size="hero">
        {label}
      </DisplayHeading>
      <p>Shell visiva definitiva pronta. Contenuti CMS, galleria, configuratore e brief arrivano in FASE 3.</p>
    </WorldFrame>
  );
}
