import { ImageResponse } from "next/og";

export const alt = "BlockTheSlop — filter AI-generated and repetitive YouTube videos locally";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#17181b",
        padding: 72,
      }}
    >
      <div
        style={{
          height: 12,
          width: "100%",
          backgroundImage: "repeating-linear-gradient(-45deg, #f2f2f2 0 14px, #ffc400 14px 28px)",
        }}
      />
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div
          style={{
            display: "flex",
            fontSize: 92,
            fontWeight: 700,
            color: "#f2f2f2",
            letterSpacing: "-0.01em",
          }}
        >
          BlockThe
          <span
            style={{
              background: "#ffc400",
              color: "#17181b",
              padding: "0 14px",
            }}
          >
            Slop
          </span>
        </div>
        <div
          style={{
            fontSize: 40,
            color: "#a6a8ad",
            maxWidth: 860,
            lineHeight: 1.3,
          }}
        >
          Filter AI-generated and repetitive YouTube videos locally — every automatic hide stays one
          click to undo.
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          color: "#a6a8ad",
          fontSize: 28,
        }}
      >
        <span>Local-first browser extension for youtube.com</span>
        <span>block-the-slop-website.vercel.app</span>
      </div>
    </div>,
    size,
  );
}
