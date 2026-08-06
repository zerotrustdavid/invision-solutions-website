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
 * The solid form is kept for anyone who needs a filled silhouette, but nothing
 * in the system switches to it automatically any more. The line is the logo at
 * every size.
 */
export const SOLID_AVAILABLE = true;

/**
 * The mark's colours. One set, everywhere — gold line, deep-gold return, on a
 * white field. There is deliberately no light/dark colourway and no small-size
 * substitution: the tile, the favicon and the app icon all carry this exact
 * mark on a white field rather than an inverted or solid stand-in.
 *
 * Measured contrast, for reference rather than as a decision still open:
 *   gold line on paper   2.42:1     gold line on ink      7.34:1
 *   gold line on panel   2.22:1     deep-gold on ink      3.08:1
 *   deep-gold return     5.76:1     gold vs deep gold     2.38:1
 *
 * The light pairing is soft, and at favicon sizes the return in particular
 * gives way before the silhouette does. That is a known and accepted property
 * of this mark, not a defect to route around by swapping in a different one.
 */
export const MARK_COLOURS = {
  line: "var(--color-gold)",
  return: "var(--color-gold-ink)",
  /** Tiles and icons put the mark on white, never on gold or ink. */
  field: "var(--color-paper)",
} as const;

/** Tile proportions — corner radius, and how much of the tile the mark fills. */
export const TILE = { radiusRatio: 0.22, fillRatio: 0.66 } as const;

/** Space Grotesk cap height, as a fraction of font size. */
export const CAP_RATIO = 0.7;

/**
 * Wordmark typography.
 *
 * "SOLUTIONS" is set in the display face rather than the mono, and tracked so
 * it spans exactly the width of "INVISION" above it. That width relationship
 * is what makes a stacked lockup read as designed instead of typed — every
 * reference lockup this brand was drawn against does it.
 *
 * The size ratio is the lever, not the tracking. At 25% the descriptor needs
 * 1.28em of tracking to reach the same width, which pulls the letters apart
 * into confetti. At 45% it needs 0.4615em, which is a normal tracked small-cap
 * setting. Both values were measured, not estimated.
 *
 * Because the name and the descriptor scale together, the em figure is
 * constant at every size:
 *   INVISION  @700 = 4.0320em wide
 *   SOLUTIONS @500 = 5.2683em wide at its own size
 *   ls = (4.0320 - 0.45 x 5.2683) / 8 gaps / 0.45 = 0.4615em
 *
 * The name itself is set with no negative tracking. Uppercase needs neutral or
 * slightly open spacing; `tracking-tight` on caps is what made the old lockup
 * look pinched.
 */
export const WORDMARK = {
  /** Descriptor size, as a fraction of the wordmark's font size. */
  sublineRatio: 0.45,
  /** Descriptor tracking, in em of its own size. Spans the name exactly. */
  sublineTracking: 0.4615,
} as const;
