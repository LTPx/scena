"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion";

import { AboutPageWp } from "../_interfaces/wordpress-components";
import Grid, {
  COLS,
  trackCardWidth,
  offsetForColumn,
  GRID_MARGIN_PX,
} from "./layout/Grid";

interface Props {
  data: AboutPageWp["differentiators"];
  nav: ReactNode;
}

const CARD_GAP_PX = 8;
const CARD_WIDTH = trackCardWidth(10, 3, CARD_GAP_PX);
const TRACK_OFFSET = offsetForColumn(3);
const END_SPACER_WIDTH = Math.max(GRID_MARGIN_PX - CARD_GAP_PX, 0);
const VH_PER_100VW_TRAVEL = 100;

const TITLE_TOP_PX = 27;
const TITLE_CARDS_GAP_PX = 50;

export default function AboutDifferentiatorsTrack({ data, nav }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(titleRef, { once: true, amount: 0.9 });
  const [travelDistance, setTravelDistance] = useState(0);
  const [wrapperHeight, setWrapperHeight] = useState(0);
  const [tracksTop, setTracksTop] = useState(TITLE_TOP_PX + TITLE_CARDS_GAP_PX);

  useEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;

      const trackWidth = trackRef.current.scrollWidth;
      const viewportWidth = window.innerWidth;
      const distance = Math.max(trackWidth - viewportWidth, 0);

      setTravelDistance(distance);

      const vh = window.innerHeight;
      const extraScroll =
        (distance / viewportWidth) * (VH_PER_100VW_TRAVEL / 100) * vh;

      setWrapperHeight(vh + extraScroll);

      if (titleRef.current) {
        const titleHeight = titleRef.current.offsetHeight;
        setTracksTop(TITLE_TOP_PX + titleHeight + TITLE_CARDS_GAP_PX);
      }
    };

    measure();

    window.addEventListener("resize", measure);

    return () => window.removeEventListener("resize", measure);
  }, [data.cards.length, data.title]);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 25,
    mass: 0.5,
  });

  const trackX = useTransform(smoothProgress, [0, 1], [0, -travelDistance]);

  return (
    <div
      ref={wrapperRef}
      style={{
        height: wrapperHeight ? `${wrapperHeight}px` : "150vh",
      }}
      className="relative"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div
          ref={titleRef}
          className="absolute left-0 right-0"
          style={{ top: `${TITLE_TOP_PX}px` }}
        >
          <Grid>
            {nav}

            <h2
              className={`${COLS.content} whitespace-pre-line font-[Gellix] text-[40px] font-normal not-italic leading-[100%] tracking-[0%] text-[#A89572]`}
            >
              {data.title}
            </h2>
          </Grid>
        </div>

        <motion.div
          ref={trackRef}
          style={{
            x: trackX,
            top: `${tracksTop}px`,
            paddingLeft: TRACK_OFFSET,
            gap: `${CARD_GAP_PX}px`,
          }}
          className="absolute left-0 flex"
        >
          {data.cards.map((card, i) => (
            <div
              key={`${card.title}-${i}`}
              style={{ width: CARD_WIDTH, height: "540px" }}
              className="flex flex-shrink-0 flex-col justify-between rounded-[20px] bg-white p-[20px]"
            >
              <h3 className="whitespace-pre-line font-[Quadrant_Text] text-[35px] font-normal not-italic leading-[115%] tracking-[0%] text-[#A89572]">
                {card.title}
              </h3>

              <div className="flex flex-1 items-center justify-center">
                <div className="h-36 w-36 rounded-full border border-[#A89572]/40" />
              </div>

              <p className="font-[Gellix] text-[16px] font-normal not-italic leading-[135%] tracking-[0%] text-[#A89572]">
                {card.description}
              </p>
            </div>
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
