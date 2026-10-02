import Link from "next/link";
import { DisplayHeading } from "@/components/shared/DisplayHeading";
import { WorldFrame } from "@/components/shared/WorldFrame";

const types = [
  ["feste-di-laurea", "Feste di laurea"],
  ["18-anni", "18 anni"],
  ["compleanni", "Compleanni"],
  ["eventi-aziendali", "Eventi aziendali"],
] as const;

export default function PrivateEventsPage() {
  return (
    <WorldFrame world="private" eyebrow="JOIA / PRIVATE EVENTS">
      <DisplayHeading as="h1" world="private" size="hero">
        La sala cambia intorno al tuo evento.
      </DisplayHeading>
      <p>
        Luce calda, ritmo lento, materia e regia: il mondo Private non comunica “club in affitto”, ma una location che
        si trasforma attorno al cliente.
      </p>
      <div className="route-links">
        {types.map(([slug, label]) => (
          <Link key={slug} href={`/private-events/${slug}/`}>
            {label}
          </Link>
        ))}
      </div>
    </WorldFrame>
  );
}
