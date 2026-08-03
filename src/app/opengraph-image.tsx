import { ImageResponse } from "next/og";
import { LENS_PATH, IRIS, RETICLE_PATHS, BRAND_COLOURS } from "@/lib/brand";

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
          justifyContent: "center",
          backgroundColor: BRAND_COLOURS.paper,
          padding: "84px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width={64} height={64} viewBox="0 0 40 40" fill="none">
            <path
              d={LENS_PATH}
              stroke={BRAND_COLOURS.ink}
              strokeWidth="2.2"
              strokeLinejoin="round"
              fill="none"
            />
            <rect
              x={IRIS.x}
              y={IRIS.y}
              width={IRIS.w}
              height={IRIS.h}
              rx={IRIS.r}
              fill={BRAND_COLOURS.gold}
            />
            {RETICLE_PATHS.map((d) => (
              <path
                key={d}
                d={d}
                stroke={BRAND_COLOURS.gold}
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            ))}
          </svg>
          <div style={{ display: "flex", fontSize: 42, fontWeight: 600 }}>
            <span style={{ color: BRAND_COLOURS.ink }}>In</span>
            <span style={{ color: BRAND_COLOURS.goldInk }}>vision</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 48,
            fontSize: 62,
            lineHeight: 1.1,
            color: BRAND_COLOURS.ink,
            maxWidth: 940,
            letterSpacing: "-0.02em",
          }}
        >
          Senior-level security expertise. No layers in between.
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 36,
            fontSize: 22,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: BRAND_COLOURS.slate,
          }}
        >
          Cybersecurity · DevSecOps · Cloud Architecture
        </div>
      </div>
    ),
    size,
  );
}
