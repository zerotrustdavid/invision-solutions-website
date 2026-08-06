/**
 * Invision Solutions brand geometry.
 *
 * The mark is a cloud with a beam driven through it. The cloud is the platform
 * — the client's estate, running somewhere they can't point at. The beam is the
 * consultant: one line, entering at one edge and leaving at the other, without
 * stopping at anything in between. Two ideas the business is actually made of,
 * cloud and a direct line of advice through it.
 *
 * The beam is separated from the cloud by a channel cut in the *background*
 * colour rather than being drawn on top, so it reads as passing through the
 * form instead of lying across it. That is why every draw function takes the
 * background it will sit on — get it wrong and the channel disappears, or the
 * beam merges into the field behind it.
 *
 * In the primary lockup the mark stands in for the O of INVISION. It is wider
 * than the glyph it replaces, deliberately: a substitution you have to hunt for
 * is not a logo. The mark also works detached, which is what the favicon,
 * app tile and social avatars use.
 *
 * The cloud is drawn, not stock. Each lobe's corner radius sits at roughly 40%
 * of its height rather than the 50% that would make it a capsule, so the
 * silhouette reads as squared tiles that happen to form a cloud. The lobe
 * rhythm is asymmetric — low left, tall centre, mid right — which is what keeps
 * it legible at 16px without collapsing into the generic three-circle puff.
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

/**
 * The cloud's drawing box, and the filled extent inside it. The lobes do not
 * reach the box edges, so anything that has to align the mark optically — the
 * wordmark, the tile, a tight viewBox — must use the ink extent, not the box.
 */
export const CLOUD_BOX = {
  width: 104,
  height: 66,
  inkLeft: 12,
  inkTop: 8,
  inkWidth: 80,
  inkHeight: 50,
} as const;

/** viewBox cropped to the artwork, so the SVG's box is the visible mark. */
export const CLOUD_VIEWBOX = `${CLOUD_BOX.inkLeft} ${CLOUD_BOX.inkTop} ${CLOUD_BOX.inkWidth} ${CLOUD_BOX.inkHeight}`;

/** Space Grotesk cap height, as a fraction of font size. */
export const CAP_RATIO = 0.7;

/** The four lobes, as [x, y, width, height, radius]. */
export const CLOUD_LOBES: ReadonlyArray<
  readonly [number, number, number, number, number]
> = [
  [12, 32, 30, 26, 10],
  [32, 8, 44, 50, 17],
  [64, 24, 28, 34, 12],
  [12, 38, 80, 20, 9],
] as const;

/** The beam's centreline, plus the weights of the beam and its channel. */
export const BEAM = {
  path: "M4 62 L100 4",
  width: 10,
  channelWidth: 19,
} as const;

/** Tile proportions — corner radius and how much of the tile the cloud fills. */
export const TILE = { radiusRatio: 0.22, fillRatio: 0.72 } as const;

/** The lobes as SVG markup. Shared by the components and the asset generator. */
export function cloudShapes(): string {
  return CLOUD_LOBES.map(
    ([x, y, w, h, r]) =>
      `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}"/>`,
  ).join("");
}
