import { ImageResponse } from "next/og";
import { BEAM, BRAND_COLOURS, CLOUD_BOX, CLOUD_LOBES } from "@/lib/brand";

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
        {/* Horizontal secondary lockup. The integrated wordmark needs the mark
            sat on the text baseline, which Satori does not lay out reliably —
            so the social card uses the detached mark instead. */}
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <svg
            width={(64 * CLOUD_BOX.inkWidth) / CLOUD_BOX.inkHeight}
            height={64}
            viewBox={`${CLOUD_BOX.inkLeft} ${CLOUD_BOX.inkTop} ${CLOUD_BOX.inkWidth} ${CLOUD_BOX.inkHeight}`}
            fill="none"
          >
            <defs>
              <clipPath id="ogcloud">
                {CLOUD_LOBES.map(([x, y, w, h, r]) => (
                  <rect key={`${x}-${y}`} x={x} y={y} width={w} height={h} rx={r} />
                ))}
              </clipPath>
            </defs>
            {CLOUD_LOBES.map(([x, y, w, h, r]) => (
              <rect
                key={`${x}-${y}`}
                x={x}
                y={y}
                width={w}
                height={h}
                rx={r}
                fill={BRAND_COLOURS.ink}
              />
            ))}
            <g clipPath="url(#ogcloud)">
              <path
                d={BEAM.path}
                stroke={BRAND_COLOURS.paper}
                strokeWidth={BEAM.channelWidth}
                fill="none"
              />
              <path
                d={BEAM.path}
                stroke={BRAND_COLOURS.gold}
                strokeWidth={BEAM.width}
                fill="none"
              />
            </g>
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
