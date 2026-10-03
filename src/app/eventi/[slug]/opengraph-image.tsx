import { ImageResponse } from "next/og";
import { findNightFormat } from "@/content/nightlife";
import { getNightEventBySlug } from "@/lib/cms/nightlife";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function EventOpenGraphImage({ params }: Props) {
  const { slug } = await params;
  const event = await getNightEventBySlug(slug);
  const archive = findNightFormat(slug);

  const title = event?.title ?? archive?.name ?? "JOIA / FORMĀ";
  const meta = event?.startsAt
    ? new Intl.DateTimeFormat("it-IT", {
        timeZone: "Europe/Rome",
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date(event.startsAt))
    : "ARCHIVE / FORMĀ";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "58px",
          background:
            "radial-gradient(circle at 78% 18%, rgba(215,255,0,.18), transparent 28%), #070806",
          color: "#e9ece1",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 24,
            letterSpacing: "0.14em",
          }}
        >
          <span>JOIA / FORMĀ</span>
          <span style={{ color: "#d7ff00" }}>{meta}</span>
        </div>
        <div
          style={{
            maxWidth: "1000px",
            fontSize: 118,
            fontWeight: 900,
            lineHeight: 0.78,
            letterSpacing: "-0.06em",
            textTransform: "uppercase",
          }}
        >
          {title}
        </div>
        <div style={{ fontSize: 22, color: "#9ba08f" }}>
          MUSIC · ARTISTS · COMMUNITY · NAPOLI
        </div>
      </div>
    ),
    size,
  );
}
