import { ImageResponse } from "next/og";
import {
  ART,
  BRAND_COLOURS,
  CLOUD_CLOSED,
  RETURN_SOLID,
  STROKE_SOLID,
  TILE,
} from "@/lib/brand";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/**
 * Favicon. Ink tile and the solid form — at 32px the monoline's 5.5 stroke
 * lands under a device pixel, and a transparent mark vanishes against a dark
 * tab strip either way.
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
          fill={BRAND_COLOURS.ink}
        />
        <g
          transform={`translate(${(box - w) / 2 - ART.x * s} ${
            (box - h) / 2 - ART.y * s
          }) scale(${s})`}
        >
          <path d={CLOUD_CLOSED} fill={BRAND_COLOURS.paper} />
          <path
            d={RETURN_SOLID}
            stroke={BRAND_COLOURS.gold}
            strokeWidth={STROKE_SOLID}
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
