import { ImageResponse } from "next/og";
import {
  ASPECT,
  BRAND_COLOURS,
  CLOUD_ARC,
  RETURN_ARC,
  STROKE,
  VIEWBOX,
} from "@/lib/brand";

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
        {/* Row lockup. The card is 630px tall and mostly headline, so the
            stacked lockup would crowd it. */}
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <svg width={72 * ASPECT} height={72} viewBox={VIEWBOX} fill="none">
            <path
              d={CLOUD_ARC}
              stroke={BRAND_COLOURS.ink}
              strokeWidth={STROKE}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d={RETURN_ARC}
              stroke={BRAND_COLOURS.gold}
              strokeWidth={STROKE}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div
            style={{
              display: "flex",
              fontSize: 42,
              fontWeight: 700,
              letterSpacing: "-0.01em",
              color: BRAND_COLOURS.ink,
            }}
          >
            INVISION
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
