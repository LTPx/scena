import { ImageAcf } from "../../_interfaces/wordpress-page";
import { GalleryAspectWp } from "../../_interfaces/wordpress-components";

export type ResolvedAspect = Exclude<GalleryAspectWp, "auto">;

export const ASPECT_RATIO: Record<ResolvedAspect, string> = {
  landscape: "4 / 3",
  portrait: "3 / 4",
  square: "1 / 1",
};

// Se mantiene igual, la sigue usando Gallery para elegir su clase de ancho por categoría
export function resolveAspect(
  image: ImageAcf,
  chosen?: GalleryAspectWp,
): ResolvedAspect {
  if (chosen && chosen !== "auto") return chosen;

  const { width, height } = image;
  if (!width || !height) return "landscape";

  const ratio = width / height;
  if (ratio > 1.2) return "landscape";
  if (ratio < 0.85) return "portrait";
  return "square";
}

// 👇 Nueva: da el CSS aspect-ratio real, sin "quemar" anchos
export function getAspectRatio(
  image: ImageAcf,
  chosen?: GalleryAspectWp,
): string {
  // Si viene una categoría explícita desde WP (no "auto"), sí usamos el ratio representativo de esa categoría
  if (chosen && chosen !== "auto") return ASPECT_RATIO[chosen];

  // Si es "auto" (o no viene nada), usamos el ratio EXACTO de la imagen
  const { width, height } = image;
  if (width && height) return `${width} / ${height}`;

  // Fallback solo si no hay dimensiones en absoluto
  return ASPECT_RATIO.landscape;
}
