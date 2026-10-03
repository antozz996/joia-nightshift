import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "JOIA — NIGHTSHIFT",
    short_name: "JOIA",
    description: "Private Events e FORMĀ / Nightlife a Napoli.",
    start_url: "/",
    display: "standalone",
    background_color: "#070806",
    theme_color: "#070806",
    lang: "it",
  };
}
