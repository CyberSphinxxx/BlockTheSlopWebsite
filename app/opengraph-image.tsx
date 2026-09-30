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
        // Raw hex is required here: generated images render outside the CSS
        // token layers. Values match the overhaul palette and the hazard
        // stripe motif was retired with the redesign.
        background: "#141618",
        padding: 72,
      }}
    >
      <div style={{ height: 8, width: "100%", background: "#ffd21a" }} />
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div
          style={{
            display: "flex",
            fontSize: 92,
            fontWeight: 700,
            color: "#f5f6f7",
            letterSpacing: "-0.01em",
          }}
        >
          BlockThe
          <span
            style={{
              background: "#ffd21a",
              color: "#151719",
              padding: "0 14px",
            }}
          >
            Slop
          </span>
        </div>
        <div
          style={{
            fontSize: 40,
            color: "#abb2bc",
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
          color: "#abb2bc",
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
