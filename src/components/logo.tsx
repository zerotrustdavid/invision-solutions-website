import {
  ART,
  ASPECT,
  MARK_ROLES,
  CLOUD_ARC,
  CLOUD_CLOSED,
  RETURN_ARC,
  RETURN_SOLID,
  SOLID_BELOW_PX,
  STROKE,
  STROKE_SOLID,
  TILE,
  VIEWBOX,
} from "@/lib/brand";

type Tone = "light" | "dark";

/**
 * The mark's two forms. `mono` is the primary: one continuous line, silhouette
 * in `fg` and the return in `accent` — see MARK_ROLES for which is which per
 * tone. `solid` is what tiles use, since a thin stroke can be masked away
 * entirely at icon sizes.
 */
function Artwork({ solid, fg, accent }: { solid: boolean; fg: string; accent: string }) {
  if (solid) {
    return (
      <>
        <path d={CLOUD_CLOSED} fill={fg} />
        <path
          d={RETURN_SOLID}
          stroke={accent}
          strokeWidth={STROKE_SOLID}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    );
  }
  return (
    <>
      <path
        d={CLOUD_ARC}
        stroke={fg}
        strokeWidth={STROKE}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={RETURN_ARC}
        stroke={accent}
        strokeWidth={STROKE}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  );
}

/**
 * `size` is the mark's height in pixels. Width follows from the artwork's
 * aspect — the mark is roughly 1.86:1, not square, so never constrain it to a
 * square box.
 */
function LogoMark({
  size = 32,
  tone = "light",
  tile = false,
  solid,
}: {
  size?: number;
  tone?: Tone;
  tile?: boolean;
  solid?: boolean;
}) {
  const useSolid = solid ?? size < SOLID_BELOW_PX;

  if (tile) {
    // Tiles are always solid: they are used at favicon and avatar sizes, and a
    // platform mask can crop a thin stroke away entirely.
    const field = tone === "dark" ? "var(--color-ink)" : "var(--color-gold)";
    const fg = tone === "dark" ? "var(--color-paper)" : "var(--color-ink)";
    // Gold-on-gold would disappear, so the accent flips to paper on gold.
    const accent = tone === "dark" ? "var(--color-gold)" : "var(--color-paper)";
    const box = 100;
    const w = box * TILE.fillRatio;
    const s = w / ART.width;
    const h = ART.height * s;
    return (
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${box} ${box}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect width={box} height={box} rx={box * TILE.radiusRatio} fill={field} />
        <g
          transform={`translate(${(box - w) / 2 - ART.x * s} ${
            (box - h) / 2 - ART.y * s
          }) scale(${s})`}
        >
          <Artwork solid fg={fg} accent={accent} />
        </g>
      </svg>
    );
  }

  const roles = MARK_ROLES[tone];
  return (
    <svg
      width={size * ASPECT}
      height={size}
      viewBox={VIEWBOX}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <Artwork solid={useSolid} fg={roles.line} accent={roles.return} />
    </svg>
  );
}

/**
 * Lockup. Stacked by default — mark over wordmark over a tracked subline,
 * which is how the mark is meant to be seen. `orientation="row"` puts the mark
 * beside the wordmark for shallow spaces like the nav bar.
 */
function LogoLockup({
  size = 32,
  subline = true,
  tone = "light",
  orientation = "stacked",
}: {
  size?: number;
  subline?: boolean;
  tone?: Tone;
  orientation?: "stacked" | "row";
}) {
  const letters = tone === "dark" ? "text-paper" : "text-ink";
  const wordmark = (
    <span
      className={`whitespace-nowrap font-display font-bold tracking-tight ${letters}`}
      style={{ fontSize: size }}
    >
      INVISION
    </span>
  );
  const sub = subline && (
    <span
      className="whitespace-nowrap font-mono uppercase text-slate"
      // Floored at 9px: at the sizes the footer and nav use, a straight 0.25
      // ratio lands around 5px, which is present but unreadable.
      style={{ letterSpacing: "0.32em", fontSize: Math.max(size * 0.25, 9) }}
    >
      Solutions
    </span>
  );

  if (orientation === "row") {
    return (
      <span className="inline-flex items-center gap-2.5">
        <LogoMark size={size * 1.15} tone={tone} />
        <span className="flex flex-col leading-none">
          {wordmark}
          {sub}
        </span>
      </span>
    );
  }

  return (
    <span className="inline-flex flex-col items-center leading-none">
      <LogoMark size={size * 1.5} tone={tone} />
      <span style={{ marginTop: size * 0.34 }}>{wordmark}</span>
      {sub && <span style={{ marginTop: size * 0.2 }}>{sub}</span>}
    </span>
  );
}

export { LogoMark, LogoLockup };
