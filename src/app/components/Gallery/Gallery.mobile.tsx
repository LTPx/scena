"use client";

import { useRef } from "react";
import Image from "next/image";
import { GalleryHomeWp } from "../../_interfaces/wordpress-components";
import { getAspectRatioNumber } from "./aspect";
import { useVerticalToHorizontalScroll } from "../Projects-Page/useVerticalToHorizontalScroll";

interface GalleryProps {
  gallery: GalleryHomeWp[];
  title?: string;
}

const IMAGE_HEIGHT_PX = 472;
const GAP_PX = 15;
const SIDE_PADDING_PX = 15;

export default function GalleryMobile({ gallery }: GalleryProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  useVerticalToHorizontalScroll(scrollerRef, [gallery]);

  if (!gallery?.length) return null;

  return (
    <section data-header-theme="dark" className="relative py-[25px]">
      <div
        ref={scrollerRef}
        className="flex overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{
          gap: GAP_PX,
          paddingInline: SIDE_PADDING_PX,
        }}
      >
        {gallery.map((item, index) => {
          if (!item.image?.url) return null;

          const ratio = getAspectRatioNumber(item.image, item.aspect);
          const width = Math.round(IMAGE_HEIGHT_PX * ratio);

          return (
            <div
              key={`${item.image.url}-${index}`}
              className="relative flex-shrink-0"
              style={{ height: IMAGE_HEIGHT_PX, width }}
            >
              <Image
                src={item.image.url}
                alt={item.image.alt ?? ""}
                fill
                priority={index === 0}
                sizes={`${width}px`}
                className="object-cover"
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
