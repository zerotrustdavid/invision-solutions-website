/**
 * Generates the downloadable brand assets in public/brand/.
 *
 * Run with: npm run brand
 *
 * Wordmark type is converted to outlines rather than left as <text>, so the
 * SVGs render identically on machines that do not have Space Grotesk or IBM
 * Plex Mono installed. The fonts are read from the webfont files Next.js has
 * already downloaded into .next/static/media, so `next build` must have run at
 * least once before this script.
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import * as fontkit from "fontkit";
import * as wawoff2 from "wawoff2";
import sharp from "sharp";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "public", "brand");
const TMP = join(ROOT, ".next", "cache", "brand-fonts");

const GOLD = "#C9A227";
const INK = "#16181D";
const PAPER = "#FFFFFF";
const SLATE = "#5C6068";

// Geometry — keep in sync with src/lib/brand.ts
const CLOUD_BOX = { width: 104, height: 66, inkLeft: 12, inkTop: 8, inkWidth: 80, inkHeight: 50 };
const CLOUD_LOBES = [
  [12, 32, 30, 26, 10],
  [32, 8, 44, 50, 17],
  [64, 24, 28, 34, 12],
  [12, 38, 80, 20, 9],
];
const BEAM = { path: "M4 62 L100 4", width: 10, channelWidth: 19 };
const TILE = { radiusRatio: 0.22, fillRatio: 0.72 };
const CAP_RATIO = 0.7;

const cloudShapes = () =>
  CLOUD_LOBES.map(([x, y, w, h, r]) =>
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}"/>`).join("");

/**
 * Cloud plus beam. The channel either side of the beam is stroked in the field
 * colour, so `field` must be the colour this will actually sit on — get it
 * wrong and the beam reads as lying on top rather than passing through.
 *
 * `id` must be unique per document: duplicate clipPath ids silently resolve to
 * whichever the parser saw first.
 */
function cloudBeam({ field, body, accent, id }) {
  return `  <defs><clipPath id="${id}">${cloudShapes()}</clipPath></defs>
  <g fill="${body}">${cloudShapes()}</g>
  <g clip-path="url(#${id})">
    <path d="${BEAM.path}" stroke="${field}" stroke-width="${BEAM.channelWidth}" fill="none"/>
    <path d="${BEAM.path}" stroke="${accent}" stroke-width="${BEAM.width}" fill="none"/>
  </g>`;
}

/** Cloud body and beam colours for a given tone and field. */
function roles(tone, field) {
  // Gold on gold would vanish into its own channel.
  if (field === GOLD) return { body: INK, accent: PAPER };
  return tone === "dark" ? { body: PAPER, accent: GOLD } : { body: INK, accent: GOLD };
}

/** Find a Next-downloaded webfont by the CSS module that declares it. */
function findWoff2(cssNeedle) {
  const chunkDirs = [
    join(ROOT, ".next", "dev", "static", "chunks"),
    join(ROOT, ".next", "static", "chunks"),
  ];
  for (const dir of chunkDirs) {
    let files;
    try {
      files = readdirSync(dir);
    } catch {
      continue;
    }
    const css = files.find((f) => f.includes(cssNeedle) && f.endsWith(".css"));
    if (!css) continue;
    const text = readFileSync(join(dir, css), "utf8");
    // The block carrying `U+??` is the main latin subset.
    const blocks = text.split("@font-face").filter((b) => b.includes("U+??"));
    for (const b of blocks) {
      const m = b.match(/url\("\.\.\/media\/([^"]+)"\)/);
      if (m) return join(ROOT, ".next", "static", "media", m[1]);
    }
  }
  throw new Error(
    `Could not locate the webfont for "${cssNeedle}". Run \`npm run build\` first.`,
  );
}

async function loadFontAsync(cssNeedle, label) {
  mkdirSync(TMP, { recursive: true });
  const ttfPath = join(TMP, `${label}.ttf`);
  const woff2 = readFileSync(findWoff2(cssNeedle));
  const ttf = await wawoff2.decompress(woff2);
  writeFileSync(ttfPath, Buffer.from(ttf));
  return fontkit.openSync(ttfPath);
}

/**
 * Lay out a string and return outlined path data plus its advance width,
 * both expressed at the requested font size.
 */
function outline(font, text, fontSize, { letterSpacing = 0 } = {}) {
  const scale = fontSize / font.unitsPerEm;
  const run = font.layout(text);
  let x = 0;
  const parts = [];
  run.glyphs.forEach((glyph, i) => {
    const d = glyph.path
      .scale(scale, -scale) // flip: font Y is up, SVG Y is down
      .translate(x, 0)
      .toSVG();
    if (d) parts.push(d);
    x += run.positions[i].xAdvance * scale + letterSpacing;
  });
  return { d: parts.join(" "), width: x - letterSpacing };
}

/** Bare mark, cropped to the artwork so the SVG's box is the visible mark. */
function markSvg({ tone = "light", id = "m" }) {
  const field = tone === "dark" ? INK : PAPER;
  const { body, accent } = roles(tone, field);
  const b = CLOUD_BOX;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${b.inkWidth}" height="${b.inkHeight}" viewBox="${b.inkLeft} ${b.inkTop} ${b.inkWidth} ${b.inkHeight}" fill="none">
${cloudBeam({ field, body, accent, id })}
</svg>`;
}

/** Square tile — a solid field so the mark stays assertive on any backdrop. */
function tileSvg({ tone = "light", id = "t" }) {
  const box = 100;
  const field = tone === "dark" ? INK : GOLD;
  const { body, accent } = roles(tone, field);
  const w = box * TILE.fillRatio;
  const s = w / CLOUD_BOX.inkWidth;
  const h = CLOUD_BOX.inkHeight * s;
  const dx = (box - w) / 2 - CLOUD_BOX.inkLeft * s;
  const dy = (box - h) / 2 - CLOUD_BOX.inkTop * s;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${box}" height="${box}" viewBox="0 0 ${box} ${box}" fill="none">
  <rect width="${box}" height="${box}" rx="${box * TILE.radiusRatio}" fill="${field}"/>
  <g transform="translate(${dx.toFixed(3)} ${dy.toFixed(3)}) scale(${s.toFixed(5)})">
${cloudBeam({ field, body, accent, id })}
  </g>
</svg>`;
}

/**
 * Favicon. Always the ink tile — a transparent mark vanishes against a dark tab
 * strip, and the beam needs a dark field to carry at 16px.
 */
function faviconSvg() {
  return tileSvg({ tone: "dark", id: "fav" });
}

/**
 * The wordmark, with the mark standing in for the O of INVISION. Returns the
 * inner markup plus its metrics, so the lockup can centre the subline under it
 * without laying the type out twice.
 */
function wordmarkParts({ display, tone, size, id }) {
  const textCol = tone === "dark" ? PAPER : INK;
  const field = tone === "dark" ? INK : PAPER;
  const { body, accent } = roles(tone, field);
  const pre = outline(display, "INVISI", size);
  const post = outline(display, "N", size);
  const cap = size * CAP_RATIO;
  const s = cap / CLOUD_BOX.inkHeight;
  const cw = CLOUD_BOX.inkWidth * s;
  const pad = size * 0.045;
  const width = pre.width + pad * 2 + cw + post.width;
  // The cloud is placed by its ink extent, not its box: after scaling, its ink
  // top lands at cap height and its ink foot lands exactly on the baseline.
  const cx = pre.width + pad - CLOUD_BOX.inkLeft * s;
  const cy = -cap - CLOUD_BOX.inkTop * s;
  const inner = `    <path d="${pre.d}" fill="${textCol}"/>
    <g transform="translate(${cx.toFixed(3)} ${cy.toFixed(3)}) scale(${s.toFixed(5)})">
${cloudBeam({ field, body, accent, id })}
    </g>
    <g transform="translate(${(pre.width + pad * 2 + cw).toFixed(3)} 0)"><path d="${post.d}" fill="${textCol}"/></g>`;
  return { inner, width, cap };
}

function wordmarkSvg({ display, tone, id }) {
  const SIZE = 100;
  const { inner, width, cap } = wordmarkParts({ display, tone, size: SIZE, id });
  const pad = 16;
  const H = Math.round(cap + pad * 2);
  const W = Math.round(width + pad * 2);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" fill="none">
  <g transform="translate(${pad} ${pad + cap})">
${inner}
  </g>
</svg>`;
}

/** Stacked lockup: wordmark over a tracked subline, both centred. */
function lockupSvg({ display, mono, tone, id }) {
  const SIZE = 100;
  const { inner, width, cap } = wordmarkParts({ display, tone, size: SIZE, id });
  const sub = outline(mono, "SOLUTIONS", SIZE * 0.24, { letterSpacing: SIZE * 0.14 });
  const gap = SIZE * 0.3;
  const pad = 16;
  const W = Math.round(Math.max(width, sub.width) + pad * 2);
  const H = Math.round(cap + gap + SIZE * 0.24 + pad * 2);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" fill="none">
  <g transform="translate(${((W - width) / 2).toFixed(3)} ${pad + cap})">
${inner}
  </g>
  <g transform="translate(${((W - sub.width) / 2).toFixed(3)} ${(pad + cap + gap + SIZE * 0.24).toFixed(3)})"><path d="${sub.d}" fill="${SLATE}"/></g>
</svg>`;
}

async function png(svg, file, width, height) {
  const opts = height ? { width, height } : { width };
  await sharp(Buffer.from(svg)).resize(opts).png({ compressionLevel: 9 }).toFile(join(OUT, file));
}

const main = async () => {
  mkdirSync(OUT, { recursive: true });
  const display = (await loadFontAsync("space_grotesk", "space-grotesk")).getVariation({ wght: 700 });
  const mono = await loadFontAsync("ibm_plex_mono", "ibm-plex-mono");

  const written = [];
  const write = (name, content) => {
    writeFileSync(join(OUT, name), content);
    written.push(name);
  };

  // ---- Icon -------------------------------------------------------------
  const iconLight = markSvg({ tone: "light", id: "il" });
  const iconDark = markSvg({ tone: "dark", id: "id" });
  const iconSquare = tileSvg({ tone: "light", id: "isq" });
  const iconSquareDark = tileSvg({ tone: "dark", id: "isqd" });
  write("invision-icon.svg", iconLight);
  write("invision-icon-dark.svg", iconDark);
  write("invision-icon-square.svg", iconSquare);
  write("invision-icon-square-dark.svg", iconSquareDark);
  write("invision-favicon.svg", faviconSvg());
  for (const s of [2048, 1024, 512, 256]) {
    // Width only — the bare mark is 80x50, and forcing it square would crop or
    // stretch it. Only the tile below is genuinely square.
    await png(iconLight, `invision-icon-${s}.png`, s);
    written.push(`invision-icon-${s}.png`);
  }
  await png(iconSquare, "invision-icon-square-512.png", 512, 512);
  written.push("invision-icon-square-512.png");

  // ---- Wordmark ---------------------------------------------------------
  const wmLight = wordmarkSvg({ display, tone: "light", id: "wl" });
  const wmDark = wordmarkSvg({ display, tone: "dark", id: "wd" });
  write("invision-wordmark-light.svg", wmLight);
  write("invision-wordmark-dark.svg", wmDark);
  await png(wmLight, "invision-wordmark-light-2048.png", 2048);
  await png(wmDark, "invision-wordmark-dark-2048.png", 2048);
  written.push("invision-wordmark-light-2048.png", "invision-wordmark-dark-2048.png");

  // ---- Full lockup ------------------------------------------------------
  const lockLight = lockupSvg({ display, mono, tone: "light", id: "ll" });
  const lockDark = lockupSvg({ display, mono, tone: "dark", id: "ld" });
  write("invision-logo-light.svg", lockLight);
  write("invision-logo-dark.svg", lockDark);
  for (const s of [4096, 2048]) {
    await png(lockLight, `invision-logo-light-${s}.png`, s);
    await png(lockDark, `invision-logo-dark-${s}.png`, s);
    written.push(`invision-logo-light-${s}.png`, `invision-logo-dark-${s}.png`);
  }

  console.log(`Wrote ${written.length} files to public/brand/`);
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
