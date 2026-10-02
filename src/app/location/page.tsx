import { DisplayHeading } from "@/components/shared/DisplayHeading";
import { WorldFrame } from "@/components/shared/WorldFrame";

export default function LocationPage() {
  return (
    <WorldFrame world="neutral" eyebrow="JOIA / LOCATION">
      <DisplayHeading as="h1" world="switch" size="hero">
        Un edificio. Due trasformazioni.
      </DisplayHeading>
      <p>La pagina Location sarà il punto narrativo condiviso tra storia, spazio fisico e identità dei due mondi.</p>
    </WorldFrame>
  );
}
