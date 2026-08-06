import { ImageResponse } from "next/og";
import { BEAM, BRAND_COLOURS, CLOUD_BOX, CLOUD_LOBES, TILE } from "@/lib/brand";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/**
 * Favicon. Ink tile rather than a bare mark: a transparent glyph disappears
 * against a dark tab strip, and the beam needs a dark field to carry at 32px.
 */
export default function Icon() {
  const box = 100;
  const w = box * TILE.fillRatio;
  const s = w / CLOUD_BOX.inkWidth;
  const h = CLOUD_BOX.inkHeight * s;
  const dx = (box - w) / 2 - CLOUD_BOX.inkLeft * s;
  const dy = (box - h) / 2 - CLOUD_BOX.inkTop * s;

  return new ImageResponse(
    (
      <svg width={32} height={32} viewBox={`0 0 ${box} ${box}`} fill="none">
        <defs>
          <clipPath id="cloud">
            {CLOUD_LOBES.map(([x, y, cw, ch, r]) => (
              <rect key={`${x}-${y}`} x={x} y={y} width={cw} height={ch} rx={r} />
            ))}
          </clipPath>
        </defs>
        <rect width={box} height={box} rx={box * TILE.radiusRatio} fill={BRAND_COLOURS.ink} />
        <g transform={`translate(${dx} ${dy}) scale(${s})`}>
          {CLOUD_LOBES.map(([x, y, cw, ch, r]) => (
            <rect
              key={`${x}-${y}`}
              x={x}
              y={y}
              width={cw}
              height={ch}
              rx={r}
              fill={BRAND_COLOURS.paper}
            />
          ))}
          <g clipPath="url(#cloud)">
            <path
              d={BEAM.path}
              stroke={BRAND_COLOURS.ink}
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
        </g>
      </svg>
    ),
    size,
  );
}
