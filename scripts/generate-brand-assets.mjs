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
const GOLD_INK = "#7E6212";
const INK = "#16181D";
const PAPER = "#FFFFFF";
const SLATE = "#5C6068";

// Geometry — keep in sync with src/lib/brand.ts
const RAIL = {
  left: 3, right: 37, gapLeft: 16.1, gapRight: 23.9,
  thickness: 4.4, topY: 6, bottomY: 29.6,
};
const STEM = { x: 16.1, y: 2, w: 7.8, h: 36, r: 1.4 };
const TILE_GLYPH = {
  railLeft: 7, railRight: 33, gapLeft: 17.1, gapRight: 22.9,
  thickness: 3.8, topY: 11.5, bottomY: 24.7,
  stem: { x: 17.1, y: 8, w: 5.8, h: 24, r: 1.2 },
};

const railPath = (y, t = RAIL.thickness) =>
  `M${RAIL.left} ${y} H${RAIL.gapLeft} V${y + t} H${RAIL.left} Z ` +
  `M${RAIL.gapRight} ${y} H${RAIL.right} V${y + t} H${RAIL.gapRight} Z`;

const tileRailPath = (y) => {
  const t = TILE_GLYPH;
  return `M${t.railLeft} ${y} H${t.gapLeft} V${y + t.thickness} H${t.railLeft} Z ` +
    `M${t.gapRight} ${y} H${t.railRight} V${y + t.thickness} H${t.gapRight} Z`;
};

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

function markInner({ tone }) {
  const rails = tone === "dark" ? PAPER : INK;
  return `  <path d="${railPath(RAIL.topY)}" fill="${rails}"/>
  <path d="${railPath(RAIL.bottomY)}" fill="${rails}"/>
  <rect x="${STEM.x}" y="${STEM.y}" width="${STEM.w}" height="${STEM.h}" rx="${STEM.r}" fill="${GOLD}"/>`;
}

function tileInner({ tone }) {
  const g = TILE_GLYPH;
  const field = tone === "dark" ? INK : GOLD;
  const rails = tone === "dark" ? PAPER : INK;
  const stem = tone === "dark" ? GOLD : INK;
  return `  <rect width="40" height="40" rx="9" fill="${field}"/>
  <path d="${tileRailPath(g.topY)}" fill="${rails}"/>
  <path d="${tileRailPath(g.bottomY)}" fill="${rails}"/>
  <rect x="${g.stem.x}" y="${g.stem.y}" width="${g.stem.w}" height="${g.stem.h}" rx="${g.stem.r}" fill="${stem}"/>`;
}

function iconSvg({ tone = "light", tile = false }) {
  const inner = tile ? tileInner({ tone }) : markInner({ tone });
  return `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
${inner}
</svg>`;
}

/**
 * Favicon. Always the ink tile — a transparent glyph vanishes against a dark
 * tab strip, and the gold stem needs a dark field to carry at 16px.
 */
function faviconSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
${tileInner({ tone: "dark" })}
</svg>`;
}

function wordmarkSvg({ display, tone }) {
  const textCol = tone === "dark" ? PAPER : INK;
  const accent = tone === "dark" ? GOLD : GOLD_INK;
  const SIZE = 100;
  const inPart = outline(display, "In", SIZE);
  const visionPart = outline(display, "vision", SIZE);
  const total = inPart.width + visionPart.width;
  const H = 132;
  const baseline = 100;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${Math.round(total)}" height="${H}" viewBox="0 0 ${Math.round(total)} ${H}" fill="none">
  <g transform="translate(0 ${baseline})">
    <path d="${inPart.d}" fill="${textCol}"/>
    <g transform="translate(${inPart.width} 0)"><path d="${visionPart.d}" fill="${accent}"/></g>
  </g>
</svg>`;
}

function lockupSvg({ display, mono, tone }) {
  const textCol = tone === "dark" ? PAPER : INK;
  const accent = tone === "dark" ? GOLD : GOLD_INK;
  const SIZE = 30;
  const inPart = outline(display, "In", SIZE);
  const visionPart = outline(display, "vision", SIZE);
  const sub = outline(mono, "SOLUTIONS", 7.5, { letterSpacing: 3.1 });
  const textX = 50;
  const width = Math.round(textX + Math.max(inPart.width + visionPart.width, sub.width) + 4);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="46" viewBox="0 0 ${width} 46" fill="none">
  <g transform="translate(0 3)">
${markInner({ tone })}
  </g>
  <g transform="translate(${textX} 26)">
    <path d="${inPart.d}" fill="${textCol}"/>
    <g transform="translate(${inPart.width} 0)"><path d="${visionPart.d}" fill="${accent}"/></g>
  </g>
  <g transform="translate(${textX} 38)"><path d="${sub.d}" fill="${SLATE}"/></g>
</svg>`;
}

async function png(svg, file, width, height) {
  const opts = height ? { width, height } : { width };
  await sharp(Buffer.from(svg)).resize(opts).png({ compressionLevel: 9 }).toFile(join(OUT, file));
}

const main = async () => {
  mkdirSync(OUT, { recursive: true });
  const display = (await loadFontAsync("space_grotesk", "space-grotesk")).getVariation({ wght: 600 });
  const mono = await loadFontAsync("ibm_plex_mono", "ibm-plex-mono");

  const written = [];
  const write = (name, content) => {
    writeFileSync(join(OUT, name), content);
    written.push(name);
  };

  // ---- Icon -------------------------------------------------------------
  const iconLight = iconSvg({ tone: "light" });
  const iconDark = iconSvg({ tone: "dark" });
  const iconSquare = iconSvg({ tone: "light", tile: true });
  const iconSquareDark = iconSvg({ tone: "dark", tile: true });
  write("invision-icon.svg", iconLight);
  write("invision-icon-dark.svg", iconDark);
  write("invision-icon-square.svg", iconSquare);
  write("invision-icon-square-dark.svg", iconSquareDark);
  write("invision-favicon.svg", faviconSvg());
  for (const s of [2048, 1024, 512, 256]) {
    await png(iconLight, `invision-icon-${s}.png`, s, s);
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
