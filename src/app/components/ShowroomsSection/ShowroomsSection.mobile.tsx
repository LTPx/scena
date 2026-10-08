"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ShowroomPageWp } from "../../_interfaces/wordpress-components";
import { getAspectRatio } from "../Gallery/aspect";
import { useVerticalToHorizontalScroll } from "../Projects-Page/useVerticalToHorizontalScroll";

interface Props {
  data: ShowroomPageWp;
}

const GAP_PX = 8;

export default function ShowroomsSectionMobile({ data }: Props) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const setWidthRef = useRef(0);
  const [selectedLocation, setSelectedLocation] = useState(0);

  const baseImages = useMemo(() => {
    const galleries = data.galleries ?? [];
    const current = galleries[selectedLocation];
    return current && current.length ? current : (galleries[0] ?? []);
  }, [data.galleries, selectedLocation]);

  const baseLength = baseImages.length;
  const track = useMemo(
    () => [...baseImages, ...baseImages, ...baseImages],
    [baseImages],
  );

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    const trackEl = trackRef.current;
    if (!scroller || !trackEl) return;

    let initialized = false;
    setWidthRef.current = 0;

    const measure = () => {
      const newWidth = (trackEl.scrollWidth + GAP_PX) / 3;
      if (!newWidth) return;

      const oldWidth = setWidthRef.current;
      setWidthRef.current = newWidth;

      if (!initialized || !oldWidth) {
        scroller.scrollLeft = newWidth;
        initialized = true;
      } else if (oldWidth !== newWidth) {
        scroller.scrollLeft = scroller.scrollLeft * (newWidth / oldWidth);
      }
    };

    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(trackEl);
    return () => ro.disconnect();
  }, [baseImages]);

  useVerticalToHorizontalScroll(scrollerRef, [selectedLocation], {
    loopWidth: () => setWidthRef.current,
  });

  const handleScroll = () => {
    const scroller = scrollerRef.current;
    const setWidth = setWidthRef.current;
    if (!scroller || !setWidth) return;

    if (scroller.scrollLeft < setWidth * 0.5) {
      scroller.scrollLeft += setWidth;
    } else if (scroller.scrollLeft > setWidth * 1.5) {
      scroller.scrollLeft -= setWidth;
    }
  };

  const activeLocation = data.locations[selectedLocation];

  return (
    <section
      className="relative h-dvh w-full overflow-hidden font-sans"
      style={{ height: "100dvh" }}
    >
      <div
        ref={scrollerRef}
        onScroll={handleScroll}
        className="hide-scrollbar h-full w-full overflow-x-auto overscroll-x-contain"
      >
        <div
          key={selectedLocation}
          ref={trackRef}
          className="flex h-full items-center"
          style={{ gap: GAP_PX, width: "max-content" }}
        >
          {track.map((item, index) => {
            const image = item.image;
            if (!image?.url) return null;

            const aspectRatio = getAspectRatio(image, item.aspect);
            const [w, h] = aspectRatio.split("/").map((n) => parseFloat(n));
            const widthVh = Math.round((w / h) * 100);

            const isInitiallyVisible =
              index >= baseLength && index < baseLength + 2;

            return (
              <div
                key={`${image.url}-${index}`}
                className="relative h-full flex-shrink-0"
                style={{ aspectRatio }}
              >
                <Image
                  src={image.url}
                  alt={image.alt ?? ""}
                  fill
                  priority={isInitiallyVisible}
                  loading={isInitiallyVisible ? "eager" : "lazy"}
                  sizes={`${widthVh}vh`}
                  className="object-cover"
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-black/20" />

      <div className="pointer-events-none absolute inset-x-0 top-0 px-[15px] pt-[100px] text-[#F6F5F1]">
        <h2 className="mb-4 heading-section-title">{data.title}</h2>

        <div className="mb-4 flex flex-wrap items-center gap-2">
          {data.locations.map((location, index) => {
            const isActive = index === selectedLocation;

            return (
              <button
                key={location.label}
                type="button"
                onClick={() => setSelectedLocation(index)}
                className={`pointer-events-auto inline-flex h-[35px] items-center justify-center rounded-full border-[0.1px] px-4 text-[14px] font-normal leading-[100%] text-[#F6F5F1] transition-colors duration-200 ${
                  isActive
                    ? "border-[#F6F5F1] bg-[#FFFFFF80]"
                    : "border-white/40 bg-transparent"
                }`}
              >
                {location.label}
              </button>
            );
          })}
        </div>

        <p
          className="font-[Gellix] text-[20px] font-normal not-italic leading-[100%] tracking-[0%] text-[#F6F5F1]"
          dangerouslySetInnerHTML={{ __html: activeLocation.contact }}
        />
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 px-[15px] pb-8 text-[#F6F5F1]">
        <p
          className="heading-section-title text-[#F6F5F1]"
          dangerouslySetInnerHTML={{ __html: activeLocation.description }}
        />
      </div>
    </section>
  );
}
