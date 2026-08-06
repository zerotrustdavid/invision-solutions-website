import type { Metadata } from "next";
import Image from "next/image";
import { pageMetadata } from "@/lib/metadata";
import { Reveal } from "@/components/reveal";
import { Section, Eyebrow, SurfaceCard } from "@/components/ui";
import { BRAND_COLOURS } from "@/lib/brand";

export const metadata: Metadata = pageMetadata({
  title: "Brand assets",
  description:
    "Download the Invision Solutions logo, icon, and wordmark in SVG and PNG, plus the brand colour values and usage guidelines.",
  path: "/brand",
});

type Asset = {
  file: string;
  title: string;
  note: string;
  /** Constrain preview height for wide lockups. */
  wide?: boolean;
  /** Show on a neutral plate — a white tile is invisible on a white one. */
  plate?: boolean;
};

const FULL_LOGO: Asset[] = [
  { file: "invision-logo.svg", title: "SVG — vector", note: "Scales to any size without quality loss", wide: true },
  { file: "invision-logo-4096.png", title: "PNG — 4096px", note: "Print and large displays · transparent", wide: true },
  { file: "invision-logo-2048.png", title: "PNG — 2048px", note: "Screen and documents · transparent", wide: true },
];

const ICON: Asset[] = [
  { file: "invision-icon.svg", title: "SVG — mark only", note: "Transparent · for white and near-white surfaces" },
  { plate: true, file: "invision-icon-square.svg", title: "SVG — white tile", note: "For app icons, avatars, and platform masks" },
  { plate: true, file: "invision-favicon.svg", title: "SVG — favicon", note: "The white tile, at favicon size" },
  { file: "invision-icon-2048.png", title: "PNG — 2048px", note: "Mark only · transparent" },
  { file: "invision-icon-1024.png", title: "PNG — 1024px", note: "Mark only · transparent" },
  { file: "invision-icon-512.png", title: "PNG — 512px", note: "Mark only · transparent" },
  { file: "invision-icon-256.png", title: "PNG — 256px", note: "Mark only · transparent" },
  { plate: true, file: "invision-icon-square-1024.png", title: "PNG tile — 1024px", note: "White tile · app icon size" },
  { plate: true, file: "invision-icon-square-512.png", title: "PNG tile — 512px", note: "White tile · app icon size" },
  { plate: true, file: "invision-icon-square-256.png", title: "PNG tile — 256px", note: "White tile · small icon size" },
];

const WORDMARK: Asset[] = [
  { file: "invision-wordmark.svg", title: "SVG — vector", note: "Type converted to outlines", wide: true },
  { file: "invision-wordmark-2048.png", title: "PNG — 2048px", note: "Transparent", wide: true },
];

const COLOURS = [
  { name: "Gold", hex: BRAND_COLOURS.gold, role: "The mark, and fills where type sits on top" },
  { name: "Deep gold", hex: BRAND_COLOURS.goldInk, role: "Gold as text — meets AA on light backgrounds" },
  { name: "Ink", hex: BRAND_COLOURS.ink, role: "Primary text and buttons" },
  { name: "Slate", hex: BRAND_COLOURS.slate, role: "Secondary text and captions" },
  { name: "Panel", hex: BRAND_COLOURS.panel, role: "Cards and alternating sections" },
  { name: "Paper", hex: BRAND_COLOURS.paper, role: "Page background" },
];

function AssetCard({ asset }: { asset: Asset }) {
  return (
    <SurfaceCard className="!p-0 overflow-hidden">
      {/* Paper plate by default. Tile assets get a neutral one, or their white
          field would be invisible against it. */}
      <div
        className={`flex items-center justify-center px-6 py-10 ${asset.plate ? "bg-[#DEDCD5]" : "bg-paper"}`}
      >
        <Image
          src={`/brand/${asset.file}`}
          alt={asset.title}
          width={asset.wide ? 320 : 96}
          height={asset.wide ? 60 : 96}
          // w-auto, not w-20: the bare mark is ~1.86:1, so a square box squashes it.
          className={asset.wide ? "h-auto w-full max-w-[240px]" : "h-20 w-auto"}
          unoptimized
        />
      </div>
      <div className="border-t border-line p-5">
        <p className="text-sm font-medium text-ink">{asset.title}</p>
        <p className="mt-1 text-xs text-slate">{asset.note}</p>
        <a
          href={`/brand/${asset.file}`}
          download
          className="mt-3 inline-flex rounded-full border border-ink/15 px-3.5 py-1.5 text-xs font-medium text-ink transition-colors hover:border-ink/35 hover:bg-panel"
        >
          Download
        </a>
      </div>
    </SurfaceCard>
  );
}

function AssetGrid({ assets }: { assets: Asset[] }) {
  return (
    <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {assets.map((a, i) => (
        <Reveal key={a.file} delay={i * 0.04}>
          <AssetCard asset={a} />
        </Reveal>
      ))}
    </div>
  );
}

export default function BrandPage() {
  return (
    <>
      <Section className="pt-20 sm:pt-24">
        <Reveal>
          <Eyebrow>Brand</Eyebrow>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-5xl">
            Brand assets
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate">
            Every Invision Solutions logo file, ready to download. SVG scales to
            any size without losing quality — use it wherever it is accepted. The
            PNGs are transparent and go up to 4096px for print and large
            displays.
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate">
            The mark is a cloud drawn as one continuous line. The stroke traces
            the silhouette in gold, runs back along the base, then turns inward
            in deep gold and stops. The outward pass is the platform — the
            estate running somewhere you cannot point at. The return is the
            consultant coming back through it. One line, two tones, no second
            object.
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate">
            There is one version and no variants. Where the mark cannot sit on
            white — an app icon, an avatar, a dark surface — the white tile
            carries it, rather than the artwork being recoloured or swapped for
            a heavier one.
          </p>
        </Reveal>
      </Section>

      <Section className="!pt-0">
        <Reveal>
          <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
            Full logo
          </h2>
          <p className="mt-2 text-sm text-slate">
            Mark and wordmark together. The default choice wherever there is room
            for it.
          </p>
        </Reveal>
        <AssetGrid assets={FULL_LOGO} />
      </Section>

      <Section tone="panel" className="border-t border-line">
        <Reveal>
          <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
            Icon
          </h2>
          <p className="mt-2 text-sm text-slate">
            The mark on its own — app icons, favicons, social avatars, and
            anywhere the full logo would be too small to read.
          </p>
        </Reveal>
        <AssetGrid assets={ICON} />
      </Section>

      <Section>
        <Reveal>
          <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
            Wordmark
          </h2>
          <p className="mt-2 text-sm text-slate">
            The full name set as type, for places that already carry the mark —
            letterheads, invoice footers, email signatures.
          </p>
        </Reveal>
        <AssetGrid assets={WORDMARK} />
      </Section>

      <Section tone="panel" className="border-t border-line">
        <Reveal>
          <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
            Colours
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-slate">
            Gold changes between uses — the bright tone lacks contrast as text on
            a light background, so the deeper one is used there.
          </p>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {COLOURS.map((c, i) => (
            <Reveal key={c.hex} delay={i * 0.04}>
              <SurfaceCard raised className="flex items-center gap-4 !p-4">
                <span
                  className="h-11 w-11 shrink-0 rounded-lg border border-line"
                  style={{ backgroundColor: c.hex }}
                  aria-hidden="true"
                />
                <span>
                  <span className="block text-sm font-medium text-ink">
                    {c.name}{" "}
                    <span className="font-mono text-xs text-slate">{c.hex}</span>
                  </span>
                  <span className="mt-0.5 block text-xs leading-relaxed text-slate">
                    {c.role}
                  </span>
                </span>
              </SurfaceCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <Reveal>
          <SurfaceCard>
            <h2 className="font-display text-xl font-medium text-ink">
              Using the logo
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-slate">
              <li>
                There is one version of the mark. No dark colourway, no
                inverted variant, and no heavier stand-in at small sizes — the
                tile, favicon and app icon all carry this exact artwork.
              </li>
              <li>
                On anything other than white or near-white, use the white tile
                rather than recolouring the mark. The white field is part of
                the logo.
              </li>
              <li>
                Do not stretch, recolour, rotate, or add effects to the logo.
                Do not place it on a busy photograph.
              </li>
              <li>
                Leave clear space around it of at least the height of the mark.
                The gold line measures 2.42:1 against paper — it is a soft mark
                by design, and space is what lets it hold its own.
              </li>
            </ul>
          </SurfaceCard>
        </Reveal>
      </Section>
    </>
  );
}
