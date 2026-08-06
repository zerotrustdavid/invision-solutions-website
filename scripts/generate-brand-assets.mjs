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
const CLOUD_ARC = "M30 70 A14 14 0 0 1 30 42 A20 20 0 0 1 68 34 A16 16 0 0 1 96 44 A13 13 0 0 1 96 70";
const CLOUD_CLOSED = `${CLOUD_ARC} Z`;
const RETURN_ARC = "M96 70 L46 70 A11 11 0 0 1 46 48 A9 9 0 0 1 62 53";
const RETURN_SOLID = "M92 70 L46 70 A11 11 0 0 1 46 48 A9 9 0 0 1 62 53";
const STROKE = 5.5;
const STROKE_SOLID = 7;
const ART = { x: 13.2, y: 19.9, width: 98.6, height: 52.9 };
const VIEWBOX = `${ART.x} ${ART.y} ${ART.width} ${ART.height}`;
const TILE = { radiusRatio: 0.22, fillRatio: 0.66 };
const CAP_RATIO = 0.7;

const ln = (d, c, w) =>
  `<path d="${d}" stroke="${c}" stroke-width="${w}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;

/** The primary form: one continuous line, silhouette then gold return. */
const markInner = (fg, accent = GOLD) =>
  `  ${ln(CLOUD_ARC, fg, STROKE)}\n  ${ln(RETURN_ARC, accent, STROKE)}`;

/** The small-size form. Used by the tiles, where the mark is under 18px. */
const solidInner = (fg, accent = GOLD) =>
  `  <path d="${CLOUD_CLOSED}" fill="${fg}"/>\n  ${ln(RETURN_SOLID, accent, STROKE_SOLID)}`;

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
function markSvg({ tone = "light", solid = false }) {
  const fg = tone === "dark" ? PAPER : INK;
  const inner = solid ? solidInner(fg) : markInner(fg);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${ART.width}" height="${ART.height}" viewBox="${VIEWBOX}" fill="none">
${inner}
</svg>`;
}

/** Square tile — always the solid form, since tiles are read at icon sizes. */
function tileSvg({ tone = "light" }) {
  const box = 100;
  const field = tone === "dark" ? INK : GOLD;
  const fg = tone === "dark" ? PAPER : INK;
  // Gold on gold would disappear, so the accent flips to paper on the gold tile.
  const accent = tone === "dark" ? GOLD : PAPER;
  const w = box * TILE.fillRatio;
  const s = w / ART.width;
  const h = ART.height * s;
  const dx = (box - w) / 2 - ART.x * s;
  const dy = (box - h) / 2 - ART.y * s;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${box}" height="${box}" viewBox="0 0 ${box} ${box}" fill="none">
  <rect width="${box}" height="${box}" rx="${box * TILE.radiusRatio}" fill="${field}"/>
  <g transform="translate(${dx.toFixed(3)} ${dy.toFixed(3)}) scale(${s.toFixed(5)})">
${solidInner(fg, accent)}
  </g>
</svg>`;
}

/** Favicon. Ink tile, solid form — legible at 16px, holds on a dark tab strip. */
function faviconSvg() {
  return tileSvg({ tone: "dark" });
}

/** Wordmark: the name alone, for places that already carry the mark. */
function wordmarkSvg({ display, tone }) {
  const col = tone === "dark" ? PAPER : INK;
  const SIZE = 100;
  const w = outline(display, "INVISION", SIZE);
  const cap = SIZE * CAP_RATIO;
  const pad = 16;
  const W = Math.round(w.width + pad * 2);
  const H = Math.round(cap + pad * 2);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" fill="none">
  <g transform="translate(${pad} ${pad + cap})"><path d="${w.d}" fill="${col}"/></g>
</svg>`;
}

/** Stacked lockup: mark over wordmark over a tracked subline, all centred. */
function lockupSvg({ display, mono, tone }) {
  const col = tone === "dark" ? PAPER : INK;
  const fg = tone === "dark" ? PAPER : INK;
  const SIZE = 100;
  const w = outline(display, "INVISION", SIZE);
  const sub = outline(mono, "SOLUTIONS", SIZE * 0.25, { letterSpacing: SIZE * 0.16 });
  const cap = SIZE * CAP_RATIO;

  const markH = SIZE * 1.05;
  const markS = markH / ART.height;
  const markW = ART.width * markS;

  const gapMark = SIZE * 0.34;
  const gapSub = SIZE * 0.22;
  const pad = 20;
  const W = Math.round(Math.max(markW, w.width, sub.width) + pad * 2);
  const H = Math.round(markH + gapMark + cap + gapSub + SIZE * 0.25 + pad * 2);

  const markY = pad;
  const wordBase = markY + markH + gapMark + cap;
  const subBase = wordBase + gapSub + SIZE * 0.25;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" fill="none">
  <g transform="translate(${((W - markW) / 2 - ART.x * markS).toFixed(3)} ${(markY - ART.y * markS).toFixed(3)}) scale(${markS.toFixed(5)})">
${markInner(fg)}
  </g>
  <g transform="translate(${((W - w.width) / 2).toFixed(3)} ${wordBase.toFixed(3)})"><path d="${w.d}" fill="${col}"/></g>
  <g transform="translate(${((W - sub.width) / 2).toFixed(3)} ${subBase.toFixed(3)})"><path d="${sub.d}" fill="${SLATE}"/></g>
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
  const iconLight = markSvg({ tone: "light" });
  const iconDark = markSvg({ tone: "dark" });
  const iconSquare = tileSvg({ tone: "light" });
  const iconSquareDark = tileSvg({ tone: "dark" });
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
  const wmLight = wordmarkSvg({ display, tone: "light" });
  const wmDark = wordmarkSvg({ display, tone: "dark" });
  write("invision-wordmark-light.svg", wmLight);
  write("invision-wordmark-dark.svg", wmDark);
  await png(wmLight, "invision-wordmark-light-2048.png", 2048);
  await png(wmDark, "invision-wordmark-dark-2048.png", 2048);
  written.push("invision-wordmark-light-2048.png", "invision-wordmark-dark-2048.png");

  // ---- Full lockup ------------------------------------------------------
  const lockLight = lockupSvg({ display, mono, tone: "light" });
  const lockDark = lockupSvg({ display, mono, tone: "dark" });
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
