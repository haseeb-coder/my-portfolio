import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const runtime = "edge";
export const alt = `${site.name} — ${site.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0a0a0f",
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(124,58,237,0.45), transparent 45%), radial-gradient(circle at 85% 80%, rgba(37,99,235,0.4), transparent 45%)",
        }}
      >
        <div style={{ display: "flex", color: "#22c55e", fontSize: 28 }}>
          ● {site.available}
        </div>
        <div
          style={{
            fontSize: 76,
            fontWeight: 800,
            color: "white",
            marginTop: 20,
          }}
        >
          {site.name}
        </div>
        <div
          style={{
            fontSize: 40,
            fontWeight: 700,
            marginTop: 12,
            background: "linear-gradient(90deg,#a78bfa,#60a5fa)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {site.title}
        </div>
        <div
          style={{
            fontSize: 26,
            color: "#9a9ab0",
            marginTop: 28,
            maxWidth: 900,
          }}
        >
          Node.js · NestJS · Next.js · TypeScript · AWS · OpenAI & Claude AI
        </div>
      </div>
    ),
    { ...size },
  );
}
