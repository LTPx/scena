import { ImageAcf } from "../../_interfaces/wordpress-page";
import { GalleryAspectWp } from "../../_interfaces/wordpress-components";

export type ResolvedAspect = Exclude<GalleryAspectWp, "auto">;

export const ASPECT_RATIO: Record<ResolvedAspect, string> = {
  landscape: "4 / 3",
  portrait: "3 / 4",
  square: "1 / 1",
};

const ASPECT_RATIO_NUMBER: Record<ResolvedAspect, number> = {
  landscape: 4 / 3,
  portrait: 3 / 4,
  square: 1,
};

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

export function getAspectRatioNumber(
  image: ImageAcf,
  chosen?: GalleryAspectWp,
): number {
  const { width, height } = image;
  if (width && height) return width / height;

  if (chosen && chosen !== "auto") return ASPECT_RATIO_NUMBER[chosen];
  return ASPECT_RATIO_NUMBER.landscape;
}

export function getAspectRatio(
  image: ImageAcf,
  chosen?: GalleryAspectWp,
): string {
  const { width, height } = image;
  if (width && height) return `${width} / ${height}`;

  if (chosen && chosen !== "auto") return ASPECT_RATIO[chosen];
  return ASPECT_RATIO.landscape;
}
