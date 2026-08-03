import { ImageResponse } from "next/og";
import { LENS_PATH, IRIS, BRAND_COLOURS } from "@/lib/brand";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Simplified mark — the reticle is dropped, which is illegible at 32px. */
export default function Icon() {
  return new ImageResponse(
    (
      <svg width={32} height={32} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="40" rx="8" fill={BRAND_COLOURS.paper} />
        <g transform="translate(20 20) scale(1.16) translate(-20 -20)">
          <path
            d={LENS_PATH}
            stroke={BRAND_COLOURS.ink}
            strokeWidth="2.6"
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
        </g>
      </svg>
    ),
    size,
  );
}
