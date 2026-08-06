/**
 * Invision Solutions brand geometry.
 *
 * The mark is a cloud drawn as one continuous line. The stroke traces the
 * silhouette, runs back along the base, then turns inward and stops — the
 * outward pass is the platform, the return is the consultant coming back
 * through it. One line, two tones, no second object.
 *
 * The cloud is a single closed path rather than a union of overlapping shapes,
 * because a monoline mark has to be strokeable: stroking overlapping lobes
 * draws the seams where they meet. The left and right ends are exact
 * semicircles and both top arcs are chords well inside their radii, so the
 * curve stays tangent-continuous the whole way round.
 *
 * The system also carries a solid form. Rendering both at 1x and comparing
 * showed the monoline survives further down than expected — clean to 20px and
 * still readable at 16 — so the solid form is reserved for the tiles, where
 * the mark occupies only two thirds of an already-small square. See
 * SOLID_BELOW_PX.
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

/** The cloud silhouette, open — the outward pass of the line. */
export const CLOUD_ARC =
  "M30 70 A14 14 0 0 1 30 42 A20 20 0 0 1 68 34 A16 16 0 0 1 96 44 A13 13 0 0 1 96 70";

/** The same silhouette closed, for the solid small-size form. */
export const CLOUD_CLOSED = `${CLOUD_ARC} Z`;

/** The return: back along the base, then curling inward. */
export const RETURN_ARC = "M96 70 L46 70 A11 11 0 0 1 46 48 A9 9 0 0 1 62 53";

/**
 * The return as it sits on the solid form. It starts slightly inside the
 * silhouette's right edge so the round cap does not bulge past it.
 */
export const RETURN_SOLID = "M92 70 L46 70 A11 11 0 0 1 46 48 A9 9 0 0 1 62 53";

export const STROKE = 5.5;
/** Heavier on the solid form — it is read at small sizes, against a fill. */
export const STROKE_SOLID = 7;

/**
 * Bounds of the stroked artwork, measured by rendering at 10x and trimming
 * rather than derived by hand — the arc bulges are not obvious from the path.
 * Used as the viewBox so an SVG's box is exactly the visible mark.
 */
export const ART = { x: 13.2, y: 19.9, width: 98.6, height: 52.9 } as const;
export const VIEWBOX = `${ART.x} ${ART.y} ${ART.width} ${ART.height}`;
export const ASPECT = ART.width / ART.height;

/**
 * Under this rendered height, use the solid form. Set from rendering both at
 * 1x and looking, not from arithmetic on the stroke width: at 20px the line
 * still resolves cleanly, and the solid form actually loses the inner curl
 * into its own fill sooner than the monoline does.
 */
export const SOLID_BELOW_PX = 18;

/**
 * Colour roles for the mark. Gold carries the silhouette in both tones, so the
 * logo reads as the same object on light and dark; only the return changes.
 *
 * Measured contrast against the surface behind it:
 *   gold line on paper   2.42:1     gold line on ink     7.34:1
 *   gold line on panel   2.22:1     paper return on ink  17.76:1
 *   deep-gold return     5.76:1     gold vs deep gold     2.38:1
 *
 * The light pairing is soft by design — this was chosen over the ink line
 * (17.76:1) with those numbers on the table. Contrast minimums do not bind
 * logos, but it is why the tiles stay ink-on-gold and the favicon stays the
 * ink tile: at 16px the gold line has nothing left to give.
 */
export const MARK_ROLES = {
  light: { line: "var(--color-gold)", return: "var(--color-gold-ink)" },
  dark: { line: "var(--color-gold)", return: "var(--color-paper)" },
} as const;

/** Tile proportions — corner radius, and how much of the tile the mark fills. */
export const TILE = { radiusRatio: 0.22, fillRatio: 0.66 } as const;

/** Space Grotesk cap height, as a fraction of font size. */
export const CAP_RATIO = 0.7;
