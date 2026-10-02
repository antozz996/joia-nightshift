import Link from "next/link";
import { DisplayHeading } from "@/components/shared/DisplayHeading";
import { WorldFrame } from "@/components/shared/WorldFrame";

export default function EntryPage() {
  return (
    <WorldFrame world="switch" eyebrow="JOIA / NIGHTSHIFT">
      <DisplayHeading as="h1" world="switch" size="hero">
        Due atmosfere. Un solo JOIA.
      </DisplayHeading>
      <p>
        La base visiva segue già l’orario reale della venue. In FASE 2 questa pagina diventa “The Switch” interattivo,
        mantenendo testo HTML e percorsi accessibili.
      </p>
      <nav aria-label="Scegli esperienza" className="route-links">
        <Link href="/private-events/">Private Events</Link>
        <Link href="/nightlife/">Nightlife / FORMĀ</Link>
      </nav>
    </WorldFrame>
  );
}
