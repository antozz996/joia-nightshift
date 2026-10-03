import type { Metadata } from "next";
import { SwitchExperience } from "@/components/switch/SwitchExperience";
import { localizedAlternates } from "@/lib/seo/site-url";

export const metadata: Metadata = {
  title: "JOIA — Private Events & FORMĀ Nightlife a Napoli",
  description:
    "Entra in JOIA: Private Events di giorno e FORMĀ / Nightlife di notte. Un unico spazio a Napoli che cambia con la luce.",
  alternates: localizedAlternates("/", "/en/"),
};

export default function EntryPage() {
  return <SwitchExperience />;
}
