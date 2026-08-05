/**
 * Invision Solutions brand geometry.
 *
 * The mark is a direct line through the layers. Two ink rails sit where the
 * intermediaries in a conventional consultancy would be — the account manager,
 * the junior, the chain of approvals — and a single gold stem passes straight
 * through both without stopping at either. The rails are interrupted where it
 * passes, so the stem is visibly unbroken.
 *
 * The silhouette is a capital I, which carries two meanings at once: Invision,
 * and the first person singular the whole brand is written in. "I", not "we".
 *
 * Deliberately not an eye, shield, padlock, or scan reticle. Current design
 * guidance has the market oversaturated with those, and the previous mark used
 * two of them.
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

/** Horizontal extent of the rails, and the gap the stem passes through. */
export const RAIL = {
  left: 3,
  right: 37,
  gapLeft: 16.1,
  gapRight: 23.9,
  thickness: 4.4,
  topY: 6,
  bottomY: 29.6,
} as const;

/**
 * A rail, split either side of the stem. Drawn as one path with two subpaths
 * so the interruption is part of the geometry rather than something layered
 * on top — it stays correct when the mark is recoloured or scaled.
 */
export function railPath(y: number, thickness = RAIL.thickness): string {
  return (
    `M${RAIL.left} ${y} H${RAIL.gapLeft} V${y + thickness} H${RAIL.left} Z ` +
    `M${RAIL.gapRight} ${y} H${RAIL.right} V${y + thickness} H${RAIL.gapRight} Z`
  );
}

/** The gold stem. Overshoots both rails so it reads as passing through them. */
export const STEM = { x: 16.1, y: 2, w: 7.8, h: 36, r: 1.4 } as const;

/** Tile-inset variant — tighter, so the glyph clears a rounded tile's corners. */
export const TILE_GLYPH = {
  railLeft: 7,
  railRight: 33,
  gapLeft: 17.1,
  gapRight: 22.9,
  thickness: 3.8,
  topY: 11.5,
  bottomY: 24.7,
  stem: { x: 17.1, y: 8, w: 5.8, h: 24, r: 1.2 },
} as const;

export function tileRailPath(y: number): string {
  const t = TILE_GLYPH;
  return (
    `M${t.railLeft} ${y} H${t.gapLeft} V${y + t.thickness} H${t.railLeft} Z ` +
    `M${t.gapRight} ${y} H${t.railRight} V${y + t.thickness} H${t.gapRight} Z`
  );
}
