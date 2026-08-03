import { LENS_PATH, IRIS, RETICLE_PATHS } from "@/lib/brand";

type Tone = "light" | "dark";

function MarkArtwork({ tone }: { tone: Tone }) {
  const stroke = tone === "dark" ? "var(--color-paper)" : "var(--color-ink)";
  return (
    <>
      <path
        d={LENS_PATH}
        stroke={stroke}
        strokeWidth="2.2"
        strokeLinejoin="round"
        fill="none"
      />
      <rect
        x={IRIS.x}
        y={IRIS.y}
        width={IRIS.w}
        height={IRIS.h}
        rx={IRIS.r}
        fill="var(--color-gold)"
      />
      {RETICLE_PATHS.map((d) => (
        <path
          key={d}
          d={d}
          stroke="var(--color-gold)"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      ))}
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
      {tile ? (
        <>
          <rect
            width="40"
            height="40"
            rx="9"
            fill={tone === "dark" ? "var(--color-ink)" : "var(--color-panel)"}
          />
          {/* Inset so the reticle ticks clear the tile's rounded corners. */}
          <g transform="translate(5 5) scale(0.75)">
            <MarkArtwork tone={tone} />
          </g>
        </>
      ) : (
        <MarkArtwork tone={tone} />
      )}
    </svg>
  );
}

/**
 * Full lockup. The wordmark splits as In | vision — the two-tone treatment is
 * the point of the name, not decoration.
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
