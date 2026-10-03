import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "JOIA — NIGHTSHIFT";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          background:
            "linear-gradient(115deg, #f3eee4 0%, #b9855e 46%, #070806 58%, #11130f 100%)",
          color: "#f7f5ee",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: "0.16em" }}>
          JOIA / NIGHTSHIFT / NAPOLI
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 106,
            fontWeight: 800,
            lineHeight: 0.86,
            letterSpacing: "-0.055em",
          }}
        >
          <span>DUE ATMOSFERE.</span>
          <span>UN SOLO JOIA.</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24 }}>
          <span>PRIVATE EVENTS</span>
          <span style={{ color: "#d7ff00" }}>FORMĀ / NIGHTLIFE</span>
        </div>
      </div>
    ),
    size,
  );
}
