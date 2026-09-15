"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

import {
  WhereWeMakeDifferenceWp,
} from "../_interfaces/wordpress-components";

interface Props {
  data: WhereWeMakeDifferenceWp;
}

const CARD_WIDTH_CLASS = "w-[85vw] sm:w-[420px]";
const VH_PER_100VW_TRAVEL = 100;

export default function WhereWeMakeDifference({ data }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [travelDistance, setTravelDistance] = useState(0);
  const [wrapperHeight, setWrapperHeight] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;

      const trackWidth = trackRef.current.scrollWidth;
      const viewportWidth = window.innerWidth;
      const distance = Math.max(trackWidth - viewportWidth, 0);

      setTravelDistance(distance);

      const vh = window.innerHeight;
      const extraScroll =
        (distance / viewportWidth) *
        (VH_PER_100VW_TRAVEL / 100) *
        vh;

      setWrapperHeight(vh + extraScroll);
    };

    measure();

    window.addEventListener("resize", measure);

    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 25,
    mass: 0.5,
  });

  const trackX = useTransform(
    smoothProgress,
    [0, 1],
    [0, -travelDistance],
  );

  return (
    <div
      ref={wrapperRef}
      style={{
        height: wrapperHeight ? `${wrapperHeight}px` : "150vh",
      }}
      className="relative"
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <h2 className="mb-12 whitespace-pre-line px-8 font-[Gellix] text-[40px] font-normal not-italic leading-[100%] tracking-[0%] text-[#A89572] md:px-16">
          {data.title}
        </h2>

        <motion.div
          ref={trackRef}
          style={{ x: trackX }}
          className="flex gap-6 px-8 pr-[10vw] md:px-16"
        >
          {data.cards.map((card, i) => {
            return (
              <div
                key={`${card.number}-${i}`}
                className={`flex flex-shrink-0 flex-col justify-between rounded-[20px] bg-white p-[20px] ${CARD_WIDTH_CLASS}`}
                style={{ height: "540px" }}
              >
                <h3 className="whitespace-pre-line font-[Quadrant_Text] text-[35px] font-normal not-italic leading-[115%] tracking-[0%] text-[#A89572]">
                  {card.title}
                </h3>

                <div className="flex flex-1 items-center justify-center">
                  <Image
                    src={card.icon.url}
                    alt={card.icon.alt || card.title}
                    width={144}
                    height={144}
                    className="h-36 w-36 object-contain"
                  />
                </div>

                <p className="font-[Gellix] text-[16px] font-normal not-italic leading-[135%] tracking-[0%] text-[#A89572]">
                  {card.description}
                </p>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
