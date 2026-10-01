import type { Metadata } from "next";
import type { YoastSeoWp } from "../_interfaces/wordpress-components";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://e-scena.com"
).replace(/\/$/, "");

export const LOCALES = ["en", "es", "de"] as const;

const OG_LOCALES: Record<string, string> = {
  en: "en_US",
  es: "es_ES",
  de: "de_DE",
};

const IS_PROD = process.env.NEXT_PUBLIC_ENV === "production";

// Quita "[STAGING]" de los títulos mientras WP siga en staging.
// Cuando WP pase a producción puedes dejarlo, no hace daño.
const clean = (text?: string) =>
  text
    ?.replace(/\s*\[STAGING\]\s*/gi, " ")
    .replace(/\s{2,}/g, " ")
    .trim();

type Options = {
  locale: string;
  /** Ruta SIN locale. Ej: "" (home), "/projects", "/projects/mi-slug" */
  path: string;
  /** Imagen de respaldo si Yoast no trae og_image */
  fallbackImage?: string;
  /** false en páginas de detalle (el slug puede cambiar entre idiomas) */
  hreflang?: boolean;
};

export function buildMetadata(
  seo: YoastSeoWp | undefined,
  { locale, path, fallbackImage, hreflang = true }: Options,
): Metadata {
  const url = `${SITE_URL}/${locale}${path}`;

  const title = clean(seo?.seo_title) || "E-Scena";
  const description = seo?.seo_desc || undefined;
  const ogImage = seo?.og_image || fallbackImage;
  const twitterImage = seo?.twitter_image || ogImage;

  const robots = IS_PROD
    ? {
        index: seo?.seo_robots?.index !== "noindex",
        follow: seo?.seo_robots?.follow !== "nofollow",
      }
    : { index: false, follow: false };

  return {
    title,
    description,
    alternates: {
      canonical: url,
      ...(hreflang && {
        languages: Object.fromEntries(
          LOCALES.map((l) => [l, `${SITE_URL}/${l}${path}`]),
        ),
      }),
    },
    robots,
    openGraph: {
      title: clean(seo?.og_title) || title,
      description: seo?.og_desc || description,
      url,
      siteName: "E-Scena",
      locale: OG_LOCALES[locale] ?? locale,
      type: "website",
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: clean(seo?.twitter_title) || clean(seo?.og_title) || title,
      description: seo?.twitter_desc || seo?.og_desc || description,
      images: twitterImage ? [twitterImage] : undefined,
    },
  };
}