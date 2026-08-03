import type { Metadata } from "next";

/**
 * Canonical host. The apex 308-redirects to www in Vercel, so metadata must
 * point at www — otherwise OG and canonical URLs resolve through a redirect
 * hop, which some social scrapers handle poorly.
 */
export const SITE_URL = "https://www.invisionsolutions.co.uk";

export const SITE_NAME = "Invision Solutions";

/**
 * Builds page metadata with a self-referencing canonical and a complete
 * Open Graph block.
 *
 * Next.js replaces the parent `openGraph` object wholesale rather than
 * deep-merging it, so a page that sets only `openGraph.url` silently drops
 * `siteName`, `locale`, and `type`. Every page therefore has to restate the
 * full set — this helper keeps that in one place.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} — ${SITE_NAME}`,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: "en_GB",
      type: "website",
    },
  };
}
