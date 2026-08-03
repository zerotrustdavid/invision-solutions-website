/**
 * Invision Solutions brand geometry.
 *
 * The mark is a lens: two mirrored arcs forming an eye, with a vertical bar at
 * its centre. It reads as "in-vision" — seeing clearly — and as the letter I of
 * Invision, the bar doubling as an iris. The four corner ticks are a scan
 * reticle, carrying the Zero Trust "verify, don't assume" idea into the mark.
 *
 * These constants are mirrored in scripts/generate-brand-assets.mjs, which
 * produces the downloadable files in public/brand/. Change both together.
 */

export const BRAND_COLOURS = {
  gold: "#C9A227",
  goldInk: "#7E6212",
  ink: "#16181D",
  paper: "#FFFFFF",
  panel: "#F6F5F1",
  slate: "#5C6068",
} as const;

/** Lens outline — two mirrored arcs meeting at left and right points. */
export const LENS_PATH =
  "M4 20C4 20 10.5 9 20 9C29.5 9 36 20 36 20C36 20 29.5 31 20 31C10.5 31 4 20 4 20Z";

/** The iris / letter-I bar at the centre of the lens. */
export const IRIS = { x: 18.4, y: 13.6, w: 3.2, h: 12.8, r: 1.6 } as const;

/** Corner reticle ticks — the verification motif. */
export const RETICLE_PATHS = [
  "M2 7V2H7",
  "M33 2H38V7",
  "M38 33V38H33",
  "M7 38H2V33",
] as const;
