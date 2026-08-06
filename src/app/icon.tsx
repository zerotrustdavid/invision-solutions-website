import { ImageResponse } from "next/og";
import { ART, BRAND_COLOURS, CLOUD_ARC, RETURN_ARC, STROKE, TILE } from "@/lib/brand";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/**
 * Favicon. The same mark as everywhere else — gold line, deep-gold return, on
 * a white tile. The white field is what keeps it visible against a dark tab
 * strip; the artwork itself is not substituted for a heavier one at this size.
 */
export default function Icon() {
  const box = 100;
  const w = box * TILE.fillRatio;
  const s = w / ART.width;
  const h = ART.height * s;

  return new ImageResponse(
    (
      <svg width={32} height={32} viewBox={`0 0 ${box} ${box}`} fill="none">
        <rect
          width={box}
          height={box}
          rx={box * TILE.radiusRatio}
          fill={BRAND_COLOURS.paper}
        />
        <g
          transform={`translate(${(box - w) / 2 - ART.x * s} ${
            (box - h) / 2 - ART.y * s
          }) scale(${s})`}
        >
          <path
            d={CLOUD_ARC}
            stroke={BRAND_COLOURS.gold}
            strokeWidth={STROKE}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d={RETURN_ARC}
            stroke={BRAND_COLOURS.goldInk}
            strokeWidth={STROKE}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    ),
    size,
  );
}
