import type { Metadata } from "next";
import { SwitchExperience } from "@/components/switch/SwitchExperience";
import { localizedAlternates } from "@/lib/seo/site-url";

export const metadata: Metadata = {
  title: "JOIA Building — Private Events & FORMĀ a Napoli",
  description:
    "JOIA Building, dal 2004: Private Events e FORMĀ / Nightlife nello stesso spazio a Napoli. Design, scenografia, food, lighting e sound.",
  alternates: localizedAlternates("/", "/en/"),
};

export default function EntryPage() {
  return <SwitchExperience />;
}
