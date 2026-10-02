import type { Metadata } from "next";
import { DisplayHeading } from "@/components/shared/DisplayHeading";
import { WorldFrame } from "@/components/shared/WorldFrame";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  return { title: `Evento — ${slug}` };
}

export default async function EventPage({ params }: PageProps) {
  const { slug } = await params;
  return (
    <WorldFrame world="night" eyebrow="FORMĀ / EVENTO">
      <DisplayHeading as="h1" world="night" size="section">
        {slug.replaceAll("-", " ")}
      </DisplayHeading>
      <p>Shell visuale predisposta per data, line-up, ticket, tavolo e structured data. Implementazione in FASE 4.</p>
    </WorldFrame>
  );
}
