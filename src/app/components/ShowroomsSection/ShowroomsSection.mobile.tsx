"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ShowroomPageWp } from "../../_interfaces/wordpress-components";

interface Props {
  data: ShowroomPageWp;
}

const GAP_PX = 8;

export default function ShowroomsSectionMobile({ data }: Props) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const setWidthRef = useRef(0);
  const [selectedLocation, setSelectedLocation] = useState(0);

  const baseImages = data.gallery;
  const track = [...baseImages, ...baseImages, ...baseImages];

  useEffect(() => {
    const scroller = scrollerRef.current;
    const trackEl = trackRef.current;
    if (!scroller || !trackEl) return;

    const measure = () => {
      setWidthRef.current = trackEl.scrollWidth / 3;
      scroller.scrollLeft = setWidthRef.current;
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [data.gallery]);

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
    <section className="relative h-screen w-full overflow-hidden font-sans">
      <div
        ref={scrollerRef}
        onScroll={handleScroll}
        className="hide-scrollbar h-full w-full overflow-x-auto overscroll-x-contain"
      >
        <div
          ref={trackRef}
          className="flex h-full items-center"
          style={{ gap: GAP_PX, width: "max-content" }}
        >
          {track.map((image, index) => (
            <div
              key={`${image.url}-${index}`}
              className="relative h-full flex-shrink-0 max-w-[85vw]"
              style={{
                aspectRatio:
                  image.width && image.height
                    ? `${image.width} / ${image.height}`
                    : "4 / 5",
              }}
            >
              <Image
                src={image.url}
                alt={image.alt ?? ""}
                fill
                priority={index < 2}
                sizes="85vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-black/20" />

      <div className="pointer-events-none absolute inset-x-0 top-0 px-[15px] pt-[27px] text-white">
        <h2 className="mb-4 text-[30px] font-normal leading-[100%] tracking-normal">
          {data.title}
        </h2>

        <div className="mb-4 flex flex-wrap items-center gap-2">
          {data.locations.map((location, index) => {
            const isActive = index === selectedLocation;

            return (
              <button
                key={location.label}
                type="button"
                onClick={() => setSelectedLocation(index)}
                className={`pointer-events-auto inline-flex items-center justify-center rounded-full border-[0.1px] px-4 py-[5px] text-[14px] font-normal leading-[100%] text-white transition-colors duration-200 ${
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
          className="text-[16px] font-normal leading-[100%] text-[#F6F5F1]"
          dangerouslySetInnerHTML={{ __html: activeLocation.contact }}
        />
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 px-[15px] pb-8 text-white">
        <p
          className="text-[24px] font-normal leading-[100%] text-[#F6F5F1]"
          dangerouslySetInnerHTML={{ __html: activeLocation.description }}
        />
      </div>
    </section>
  );
}
