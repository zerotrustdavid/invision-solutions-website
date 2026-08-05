import { RAIL, STEM, TILE_GLYPH, railPath, tileRailPath } from "@/lib/brand";

type Tone = "light" | "dark";

/**
 * Bare mark — rails in the foreground colour, stem always gold. The stem is
 * the constant: it is the thing that reads as Invision at a glance.
 */
function MarkArtwork({ tone }: { tone: Tone }) {
  const rails = tone === "dark" ? "var(--color-paper)" : "var(--color-ink)";
  return (
    <>
      <path d={railPath(RAIL.topY)} fill={rails} />
      <path d={railPath(RAIL.bottomY)} fill={rails} />
      <rect
        x={STEM.x}
        y={STEM.y}
        width={STEM.w}
        height={STEM.h}
        rx={STEM.r}
        fill="var(--color-gold)"
      />
    </>
  );
}

/** Tile variant — a solid field so the mark stays assertive on any backdrop. */
function TileArtwork({ tone }: { tone: Tone }) {
  const field = tone === "dark" ? "var(--color-ink)" : "var(--color-gold)";
  const rails = tone === "dark" ? "var(--color-paper)" : "var(--color-ink)";
  const stem = tone === "dark" ? "var(--color-gold)" : "var(--color-ink)";
  const g = TILE_GLYPH;
  return (
    <>
      <rect width="40" height="40" rx="9" fill={field} />
      <path d={tileRailPath(g.topY)} fill={rails} />
      <path d={tileRailPath(g.bottomY)} fill={rails} />
      <rect
        x={g.stem.x}
        y={g.stem.y}
        width={g.stem.w}
        height={g.stem.h}
        rx={g.stem.r}
        fill={stem}
      />
    </>
  );
}

function LogoMark({
  size = 32,
  tone = "light",
  tile = false,
}: {
  size?: number;
  tone?: Tone;
  tile?: boolean;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {tile ? <TileArtwork tone={tone} /> : <MarkArtwork tone={tone} />}
    </svg>
  );
}

/**
 * Full lockup. The wordmark splits as In | vision — the two-tone treatment is
 * the point of the name, not decoration, and it echoes the mark's gold stem.
 */
function LogoLockup({
  size = 32,
  subline = true,
  tone = "light",
}: {
  size?: number;
  subline?: boolean;
  tone?: Tone;
}) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <LogoMark size={size} tone={tone} />
      <span className="flex flex-col leading-none">
        <span
          className="font-display font-semibold tracking-tight"
          style={{ fontSize: size * 0.62 }}
        >
          <span className={tone === "dark" ? "text-paper" : "text-ink"}>In</span>
          <span className={tone === "dark" ? "text-gold" : "text-gold-ink"}>
            vision
          </span>
        </span>
        {subline && (
          <span
            className="font-mono uppercase text-slate"
            style={{ letterSpacing: "0.28em", fontSize: size * 0.2 }}
          >
            Solutions
          </span>
        )}
      </span>
    </span>
  );
}

export { LogoMark, LogoLockup };
