"use client";

import Image from "next/image";
import { GalleryHomeWp } from "../../_interfaces/wordpress-components";
import { resolveAspect, ResolvedAspect } from "./aspect";

interface GalleryProps {
  gallery: GalleryHomeWp[];
  title?: string;
}

const IMAGE_HEIGHT_PX = 475;
const GAP_PX = 15;
const SIDE_PADDING_PX = 15;

const ASPECT_WIDTH_CLASS: Record<ResolvedAspect, string> = {
  landscape: "w-[85vw]",
  portrait: "w-[62vw]",
  square: "w-[75vw]",
};

const ASPECT_SIZES: Record<ResolvedAspect, string> = {
  landscape: "85vw",
  portrait: "62vw",
  square: "75vw",
};

export default function GalleryMobile({ gallery }: GalleryProps) {
  if (!gallery?.length) return null;

  return (
    <section data-header-theme="dark" className="relative py-[25px]">
      <div
        className="flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{
          gap: GAP_PX,
          paddingInline: SIDE_PADDING_PX,
          scrollPaddingInline: SIDE_PADDING_PX,
        }}
      >
        {gallery.map((item, index) => {
          if (!item.image?.url) return null;

          const aspect = resolveAspect(item.image, item.aspect);

          return (
            <div
              key={`${item.image.url}-${index}`}
              style={{ height: IMAGE_HEIGHT_PX }}
              className={`relative flex-shrink-0 snap-start ${ASPECT_WIDTH_CLASS[aspect]}`}
            >
              <Image
                src={item.image.url}
                alt={item.image.alt ?? ""}
                fill
                priority={index === 0}
                sizes={ASPECT_SIZES[aspect]}
                className="object-cover"
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
