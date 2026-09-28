"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, wrap } from "framer-motion";
import Image from "next/image";
import { ShowroomPageWp } from "../../_interfaces/wordpress-components";
import Grid, { COLS } from "../layout/Grid";
import { getAspectRatio } from "../Gallery/aspect";
import GlassButton from "../GlassButton";

interface Props {
  data: ShowroomPageWp;
  speed?: number;
}

const ITEM_WIDTH_CLASS = "min-w-[220px] max-w-[95vw] md:max-w-[80vw]";

export default function ShowroomsSectionDesktop({ data, speed = 0.6 }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [setWidth, setSetWidth] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState(0);
  const baseImages = data.gallery;
  const track = [...baseImages, ...baseImages];

  useEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;

      setSetWidth(trackRef.current.scrollWidth / 2);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [data.gallery]);

  const offset = useMotionValue(0);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      offset.set(offset.get() + e.deltaY * speed);
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [offset, speed]);

  const x = useTransform(offset, (v) =>
    setWidth ? wrap(-setWidth, 0, -v) : 0,
  );

  if (!data) return null;

  const activeLocation = data.locations[selectedLocation];

  return (
    <section className="relative h-screen w-full overflow-hidden font-gellix">
      <motion.div
        ref={trackRef}
        style={{ x }}
        className="flex h-full items-center gap-[8px] will-change-transform"
      >
        {track.map((item, index) => {
          const image = item.image;
          if (!image?.url) return null;

          const aspectRatio = getAspectRatio(image, item.aspect); // 👈 ya no uses resolveAspect + ASPECT_RATIO[]

          return (
            <div
              key={`${image.url}-${index}`}
              className={`relative h-full flex-shrink-0 ${ITEM_WIDTH_CLASS}`}
              style={{ aspectRatio }}
            >
              <Image
                src={image.url}
                alt={image.alt ?? ""}
                fill
                priority={index === 0}
                sizes="(max-width: 768px) 85vw, 45vw"
                className="object-cover"
              />
            </div>
          );
        })}
      </motion.div>
      <div className="pointer-events-none absolute inset-0 bg-black/20" />
      <Grid className="pointer-events-none absolute inset-x-0 top-0 py-[27px]">
        <div className={`${COLS.content} pointer-events-auto text-white`}>
          <h2 className="headline-1 mb-4">{data.title}</h2>

          <div className="flex items-center gap-2 mb-4">
            {data.locations.map((location, index) => {
              const isActive = index === selectedLocation;

              return (
                <GlassButton
                  key={location.label}
                  onClick={() => setSelectedLocation(index)}
                  active={isActive}
                  variant="light"
                >
                  {location.label}
                </GlassButton>
              );
            })}
          </div>

          <p
            className="font-sans font-normal text-[20px] leading-[100%] tracking-normal text-[#F6F5F1]"
            dangerouslySetInnerHTML={{ __html: activeLocation.contact }}
          />
        </div>
      </Grid>
      <Grid className="pointer-events-none absolute inset-x-0 bottom-0 py-10">
        <div className={`${COLS.wideText} pointer-events-auto text-white`}>
          <p
            className="headline-1 text-[#F6F5F1]"
            dangerouslySetInnerHTML={{ __html: activeLocation.description }}
          />
        </div>
      </Grid>
    </section>
  );
}
