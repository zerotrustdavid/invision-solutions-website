"use client";

import { useId } from "react";
import {
  BEAM,
  CAP_RATIO,
  CLOUD_BOX,
  CLOUD_LOBES,
  CLOUD_VIEWBOX,
  TILE,
} from "@/lib/brand";

type Tone = "light" | "dark";

/** Where the mark sits. The channel around the beam is cut in this colour. */
type Field = "paper" | "panel" | "ink" | "gold";

const FIELD_VAR: Record<Field, string> = {
  paper: "var(--color-paper)",
  panel: "var(--color-panel-alt)",
  ink: "var(--color-ink)",
  gold: "var(--color-gold)",
};

function Lobes({ fill }: { fill: string }) {
  return (
    <>
      {CLOUD_LOBES.map(([x, y, w, h, r]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width={w} height={h} rx={r} fill={fill} />
      ))}
    </>
  );
}

/**
 * Cloud plus beam. The beam is clipped to the silhouette so the cloud stays a
 * single closed form, and the channel either side of it is stroked in the
 * field colour — which is why `field` is required rather than assumed. Drawn
 * on the wrong field, the channel vanishes and the beam looks pasted on.
 */
function CloudBeam({
  field,
  body,
  accent,
}: {
  field: Field;
  body: string;
  accent: string;
}) {
  // Each instance needs its own clip id — a duplicated id silently resolves to
  // whichever one the document happened to parse first.
  const clipId = useId();
  return (
    <>
      <defs>
        <clipPath id={clipId}>
          {CLOUD_LOBES.map(([x, y, w, h, r]) => (
            <rect key={`${x}-${y}`} x={x} y={y} width={w} height={h} rx={r} />
          ))}
        </clipPath>
      </defs>
      <Lobes fill={body} />
      <g clipPath={`url(#${clipId})`}>
        <path
          d={BEAM.path}
          stroke={FIELD_VAR[field]}
          strokeWidth={BEAM.channelWidth}
          fill="none"
        />
        <path d={BEAM.path} stroke={accent} strokeWidth={BEAM.width} fill="none" />
      </g>
    </>
  );
}

/** Colour roles for the cloud body and the beam, given tone and field. */
function roles(tone: Tone, field: Field) {
  if (field === "gold") {
    // Gold beam on a gold field would disappear into its own channel.
    return { body: "var(--color-ink)", accent: "var(--color-paper)" };
  }
  return tone === "dark"
    ? { body: "var(--color-paper)", accent: "var(--color-gold)" }
    : { body: "var(--color-ink)", accent: "var(--color-gold)" };
}

function LogoMark({
  size = 32,
  tone = "light",
  tile = false,
  field,
}: {
  size?: number;
  tone?: Tone;
  tile?: boolean;
  field?: Field;
}) {
  const resolved: Field = field ?? (tone === "dark" ? "ink" : "paper");

  if (tile) {
    const tileField: Field = tone === "dark" ? "ink" : "gold";
    const { body, accent } = roles(tone, tileField);
    const box = 100;
    const w = box * TILE.fillRatio;
    const s = w / CLOUD_BOX.inkWidth;
    const h = CLOUD_BOX.inkHeight * s;
    return (
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${box} ${box}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect width={box} height={box} rx={box * TILE.radiusRatio} fill={FIELD_VAR[tileField]} />
        <g
          transform={`translate(${(box - w) / 2 - CLOUD_BOX.inkLeft * s} ${
            (box - h) / 2 - CLOUD_BOX.inkTop * s
          }) scale(${s})`}
        >
          <CloudBeam field={tileField} body={body} accent={accent} />
        </g>
      </svg>
    );
  }

  const { body, accent } = roles(tone, resolved);
  return (
    <svg
      width={(size * CLOUD_BOX.inkWidth) / CLOUD_BOX.inkHeight}
      height={size}
      viewBox={CLOUD_VIEWBOX}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <CloudBeam field={resolved} body={body} accent={accent} />
    </svg>
  );
}

/**
 * Primary lockup. The mark stands in for the O of INVISION, so the wordmark is
 * "INVISI", the mark, then "N" — set at cap height and sitting on the baseline.
 * The mark is wider than the glyph it replaces on purpose.
 */
function LogoLockup({
  size = 32,
  subline = true,
  tone = "light",
  field,
}: {
  size?: number;
  subline?: boolean;
  tone?: Tone;
  field?: Field;
}) {
  const resolved: Field = field ?? (tone === "dark" ? "ink" : "paper");
  const { body, accent } = roles(tone, resolved);
  const cap = size * CAP_RATIO;
  const letters = tone === "dark" ? "text-paper" : "text-ink";

  return (
    <span className="inline-flex flex-col items-center leading-none">
      {/* whitespace-nowrap: the inline mark is a break opportunity, so in a
          constrained flex context the word otherwise splits across lines. */}
      <span
        className={`whitespace-nowrap font-display font-bold tracking-tight ${letters}`}
        style={{ fontSize: size }}
      >
        <span aria-hidden="true">INVISI</span>
        <svg
          width={(cap * CLOUD_BOX.inkWidth) / CLOUD_BOX.inkHeight}
          height={cap}
          viewBox={CLOUD_VIEWBOX}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          // display:inline-block overrides Tailwind Preflight's `svg{display:block}`,
          // which otherwise puts the mark on its own line and splits the word
          // across three. Baseline alignment then sits the mark's foot on the
          // text baseline, and the viewBox is cropped to the artwork so its top
          // lands at cap height.
          style={{
            display: "inline-block",
            verticalAlign: "baseline",
            margin: `0 ${size * 0.045}px`,
          }}
        >
          <CloudBeam field={resolved} body={body} accent={accent} />
        </svg>
        <span aria-hidden="true">N</span>
        <span className="sr-only">Invision</span>
      </span>
      {subline && (
        <span
          className="font-mono uppercase text-slate"
          style={{ letterSpacing: "0.3em", fontSize: size * 0.24, marginTop: size * 0.16 }}
        >
          Solutions
        </span>
      )}
    </span>
  );
}

export { LogoMark, LogoLockup };
