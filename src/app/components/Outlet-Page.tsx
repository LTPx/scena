"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { OutletPageWp } from "../_interfaces/wordpress-components";
import Grid, {
  COLS,
  colSpanWidth,
  offsetForColumn,
  trackCardWidth,
  GRID_MARGIN_PX,
} from "./layout/Grid";
import { Link } from "@/navigation";

interface Props {
  data: OutletPageWp;
}

const CARD_GAP_PX = 24;
const TRACK_OFFSET = offsetForColumn(3);
const CARD_WIDTH = trackCardWidth(10, 3, CARD_GAP_PX);
const END_SPACER_WIDTH = Math.max(GRID_MARGIN_PX - CARD_GAP_PX, 0);

const VH_PER_100VW_TRAVEL = 90;
const REVEAL_BUFFER_VH = 40;

export default function OutletPage({ data }: Props) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    if (!activeCategory) return data.products;
    return data.products.filter((p) => p.category === activeCategory);
  }, [activeCategory, data.products]);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [travelDistance, setTravelDistance] = useState(0);
  const [trackFraction, setTrackFraction] = useState(1);
  const [wrapperHeight, setWrapperHeight] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;

      const trackWidth = trackRef.current.scrollWidth;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      const distance = Math.max(trackWidth - viewportWidth, 0);
      setTravelDistance(distance);

      const extraScrollForTravel =
        (distance / viewportWidth) *
        (VH_PER_100VW_TRAVEL / 100) *
        viewportHeight;

      const baseHeight = viewportHeight + extraScrollForTravel;
      const bufferHeight = (REVEAL_BUFFER_VH / 100) * viewportHeight;
      const totalHeight = baseHeight + bufferHeight;

      setWrapperHeight(totalHeight);
      setTrackFraction(baseHeight / totalHeight);
    };

    const raf = requestAnimationFrame(measure);
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", measure);
    };
  }, [filteredProducts]);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  const trackX = useTransform(
    scrollYProgress,
    [0, trackFraction],
    [0, -travelDistance],
  );

  useEffect(() => {
    document.documentElement.classList.add("hide-scrollbar");
    return () => {
      document.documentElement.classList.remove("hide-scrollbar");
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      style={{
        height: wrapperHeight ? `${wrapperHeight}px` : "250vh",
      }}
      className="relative z-0"
    >
      <div
        data-header-theme="light"
        className="sticky top-0 flex h-dvh flex-col overflow-hidden pt-[27px]"
      >
        <Grid className="flex-shrink-0">
          <span
            className={`${COLS.outletLabel} font-sans text-[40px] font-normal not-italic leading-[100%] tracking-normal text-[#A89572]`}
          >
            {data.label}
          </span>

          <div className={`${COLS.outletContent} flex flex-col gap-10`}>
            <h1
              style={{ width: colSpanWidth(6) }}
              className="whitespace-pre-line font-sans text-[40px] font-normal not-italic leading-[100%] tracking-normal text-[#A89572]"
            >
              {data.title}
            </h1>

            <p
              style={{ width: colSpanWidth(6) }}
              className="whitespace-pre-line font-sans text-[16px] font-normal not-italic leading-[135%] tracking-normal text-[#A89572]"
            >
              {data.description}
            </p>

            <div className="flex flex-wrap gap-3">
              {data.categories.map((category) => {
                const isActive = activeCategory === category.slug;
                return (
                  <button
                    key={category.slug}
                    type="button"
                    onClick={() =>
                      setActiveCategory(isActive ? null : category.slug)
                    }
                    className={`btn-gellix ${
                      isActive ? "btn-gellix-active" : "btn-gellix-default"
                    }`}
                  >
                    {category.label}
                  </button>
                );
              })}
            </div>
          </div>
        </Grid>

        <motion.div
          ref={trackRef}
          style={{
            x: trackX,
            paddingLeft: TRACK_OFFSET,
            gap: `${CARD_GAP_PX}px`,
          }}
          className="mt-10 flex flex-1 pb-[40px]"
        >
          {filteredProducts.map((product) => (
            <Link
              key={product.id}
              href={`/outlet/${product.slug}`}
              style={{ width: CARD_WIDTH }}
              className="flex h-full flex-shrink-0 flex-col"
            >
              <div className="relative w-full flex-1 overflow-hidden bg-white">
                <Image
                  src={product.image.url}
                  alt={product.image.alt || product.name}
                  fill
                  sizes="33vw"
                  className="object-contain p-8"
                />
              </div>

              <div className="mt-4 flex flex-shrink-0 flex-col gap-1">
                <p className="font-sans text-[16px] font-normal not-italic leading-[135%] tracking-[0%] text-[#A89572]">
                  {product.name}
                </p>
                <p className="font-sans text-[14px] font-normal not-italic leading-[135%] tracking-[0%] text-[#A89572]">
                  <span className="line-through opacity-50">
                    Precio original {product.original_price}
                  </span>{" "}
                  | precio Outlet {product.outlet_price}
                </p>
              </div>
            </Link>
          ))}

          <div
            aria-hidden
            style={{ width: `${END_SPACER_WIDTH}px` }}
            className="flex-shrink-0"
          />
        </motion.div>
      </div>
    </div>
  );
}
