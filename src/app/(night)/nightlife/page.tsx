import { DisplayHeading } from "@/components/shared/DisplayHeading";
import { KineticMarquee } from "@/components/shared/KineticMarquee";
import { WorldFrame } from "@/components/shared/WorldFrame";

export default function NightlifePage() {
  return (
    <WorldFrame world="night" eyebrow="FORMĀ / LISTENING HOUSE">
      <DisplayHeading as="h1" world="night" size="hero">
        La notte accende.
      </DisplayHeading>
      <p>
        Nero profondo, tipografia condensata, un solo segnale acido. La parte nightlife userà velocità, tagli e ritmo,
        senza estetica neon generica.
      </p>
      <KineticMarquee items={["FORMĀ", "JOIA", "NAPOLI", "20+ ANNI", "LISTENING HOUSE"]} />
    </WorldFrame>
  );
}
