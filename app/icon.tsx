import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // Raw hex is required here: generated images render outside the CSS
        // token layers. Values match the overhaul palette (charcoal-950,
        // paper-50, yellow-400, ink-900) so brand assets match the site.
        background: "#141618",
        color: "#f5f6f7",
        fontSize: 40,
        fontWeight: 700,
      }}
    >
      <span
        style={{
          background: "#ffd21a",
          color: "#151719",
          padding: "0 8px",
        }}
      >
        B
      </span>
    </div>,
    size,
  );
}
