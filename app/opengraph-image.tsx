import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Gaya KACI — cybersecurity student and web security researcher";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#000",
          color: "#fff",
          fontFamily: "monospace",
        }}
      >
        <div style={{ fontSize: 28, color: "#888" }}>$ whoami</div>
        <div style={{ fontSize: 88, fontWeight: 700, marginTop: 24 }}>
          Gaya KACI
        </div>
        <div style={{ fontSize: 32, color: "#888", marginTop: 24 }}>
          cybersecurity student · web security researcher
        </div>
      </div>
    ),
    size,
  );
}
