import { ImageResponse } from "next/og";
import { TILE_GLYPH, tileRailPath, BRAND_COLOURS } from "@/lib/brand";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/**
 * Favicon. Uses the ink tile so the mark holds its own against a browser's
 * chrome in either theme — a transparent glyph disappears against a dark tab
 * strip, and the gold stem needs a dark field to carry at 32px.
 */
export default function Icon() {
  const g = TILE_GLYPH;
  return new ImageResponse(
    (
      <svg width={32} height={32} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="40" rx="9" fill={BRAND_COLOURS.ink} />
        <path d={tileRailPath(g.topY)} fill={BRAND_COLOURS.paper} />
        <path d={tileRailPath(g.bottomY)} fill={BRAND_COLOURS.paper} />
        <rect
          x={g.stem.x}
          y={g.stem.y}
          width={g.stem.w}
          height={g.stem.h}
          rx={g.stem.r}
          fill={BRAND_COLOURS.gold}
        />
      </svg>
    ),
    size,
  );
}
