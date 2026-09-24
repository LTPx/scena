import { ImageAcf } from "../../_interfaces/wordpress-page";
import { GalleryAspectWp } from "../../_interfaces/wordpress-components";

export type ResolvedAspect = Exclude<GalleryAspectWp, "auto">;

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
