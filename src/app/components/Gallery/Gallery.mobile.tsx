"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import Image from "next/image";
import { GalleryHomeWp } from "../../_interfaces/wordpress-components";
import { GRID_MARGIN_PX } from "../layout/Grid";
import TypewriterText from "../TypewriterText";

interface GalleryProps {
  gallery: GalleryHomeWp[];
  title?: string;
}

const IMAGE_HEIGHT_PX = 475;
const GAP_PX = 10;

const ASPECT_WIDTH_CLASS: Record<GalleryHomeWp["aspect"], string> = {
  landscape: "w-[85vw]",
  portrait: "w-[62vw]",
  square: "w-[75vw]",
};

export default function GalleryMobile({ gallery, title }: GalleryProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(titleRef, { once: true, amount: 0.9 });

  if (!gallery?.length) return null;

  return (
    <section data-header-theme="light" className="relative py-[25px]">
      {/* {title && (
        <h2
          ref={titleRef}
          style={{ paddingInline: GRID_MARGIN_PX / 2 }}
          className="mb-8 font-[Gellix] text-[32px] font-normal not-italic leading-[100%] text-[#1a1a1a]"
        >
          <TypewriterText text={title} play={isInView} />
        </h2>
      )} */}

      <div
        className="flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{
          gap: GAP_PX,
          paddingInline: GRID_MARGIN_PX / 2,
          scrollPaddingInline: GRID_MARGIN_PX / 2,
        }}
      >
        {gallery.map((item, index) => (
          <div
            key={`${item.image.url}-${index}`}
            style={{ height: IMAGE_HEIGHT_PX }}
            className={`relative flex-shrink-0 snap-start ${
              ASPECT_WIDTH_CLASS[item.aspect]
            }`}
          >
            <Image
              src={item.image.url}
              alt={item.image.alt ?? ""}
              fill
              priority={index === 0}
              sizes="85vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
