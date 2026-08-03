import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          backgroundColor: "#0A0C10",
          padding: "80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width={56} height={56} viewBox="0 0 40 40" fill="none">
            <path d="M2 9 V2 H9" stroke="#C9A227" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M31 2 H38 V9" stroke="#C9A227" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M38 31 V38 H31" stroke="#C9A227" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9 38 H2 V31" stroke="#C9A227" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="18.5" y="14" width="3" height="12" rx="1.5" fill="#C9A227" />
          </svg>
          <span
            style={{
              fontSize: 40,
              color: "#E7E4DD",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            Invision Solutions
          </span>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 40,
            fontSize: 52,
            lineHeight: 1.2,
            color: "#E7E4DD",
            maxWidth: 900,
          }}
        >
          Senior-level security expertise. No layers in between.
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 32,
            fontSize: 22,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#3E6FE0",
          }}
        >
          STATUS: VERIFIED
        </div>
      </div>
    ),
    size,
  );
}
