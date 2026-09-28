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
        background: "#17181b",
        color: "#f2f2f2",
        fontSize: 40,
        fontWeight: 700,
      }}
    >
      <span
        style={{
          background: "#ffc400",
          color: "#17181b",
          padding: "0 8px",
        }}
      >
        B
      </span>
    </div>,
    size,
  );
}
