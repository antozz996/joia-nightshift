import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "JOIA Building",
    short_name: "JOIA",
    description: "JOIA Building: Private Events e FORMĀ / Nightlife a Napoli, dal 2004.",
    start_url: "/",
    display: "standalone",
    background_color: "#070806",
    theme_color: "#070806",
    lang: "it",
  };
}
