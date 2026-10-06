"use client";

import { useRef } from "react";
import Image from "next/image";
import { GalleryHomeWp } from "../../_interfaces/wordpress-components";
import { getAspectRatioNumber } from "./aspect";
import { useStickyHorizontal } from "../Projects-Page/useStickyHorizontal";

interface GalleryProps {
  gallery: GalleryHomeWp[];
  title?: string;
}

const IMAGE_HEIGHT_PX = 472;
const GAP_PX = 15;
const SIDE_PADDING_PX = 15;
const VERTICAL_PADDING_PX = 25;
const CONTENT_HEIGHT = IMAGE_HEIGHT_PX + VERTICAL_PADDING_PX * 2;

export default function GalleryMobile({ gallery }: GalleryProps) {
  const wrapperRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useStickyHorizontal(
    wrapperRef,
    stickyRef,
    trackRef,
    CONTENT_HEIGHT,
    [gallery],
    { speed: 0.9 },
  );

  if (!gallery?.length) return null;

  return (
    <section
      ref={wrapperRef}
      data-header-theme="dark"
      className="relative"
      style={{ height: CONTENT_HEIGHT }}
    >
      <div
        ref={stickyRef}
        className="sticky overflow-hidden"
        style={{
          height: CONTENT_HEIGHT,
          top: `max(0px, calc((100svh - ${CONTENT_HEIGHT}px) / 2))`,
        }}
      >
        <div
          ref={trackRef}
          className="flex will-change-transform"
          style={{
            gap: GAP_PX,
            paddingInline: SIDE_PADDING_PX,
            paddingBlock: VERTICAL_PADDING_PX,
            width: "max-content",
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
      </div>
    </section>
  );
}
