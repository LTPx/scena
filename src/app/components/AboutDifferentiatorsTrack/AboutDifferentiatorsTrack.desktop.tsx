"use client";

import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { AboutPageWp } from "@/app/_interfaces/wordpress-components";
import Grid, { COLS } from "../layout/Grid";
import Image from "next/image";

interface Props {
  data: AboutPageWp["differentiators"];
}

const TITLE_TOP_PX = 27;
const TITLE_CARDS_GAP_PX = 50;

const CARD_START_Y = 90;
const CARD_BASE_DELAY_S = 0.25;
const CARD_STAGGER_S = 0.3;
const CARD_Y_DURATION_S = 1.6;
const CARD_FADE_DURATION_S = 1.2;
const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

const HOVER_SCALE_UP = 1.03;
const HOVER_SCALE_DOWN = 0.97;
const HOVER_TRANSITION = {
  type: "spring",
  stiffness: 260,
  damping: 28,
} as const;

export default function AboutDifferentiatorsTrackDesktop({ data }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion();

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const cardColSpan = 12 / data.cards.length;

  return (
    <Grid
      ref={sectionRef}
      style={{ paddingTop: `${TITLE_TOP_PX}px` }}
      className="min-h-screen grid-rows-[auto_auto] content-start overflow-hidden pb-[40px]"
    >
      <h2 className={`${COLS.titleCard} row-start-1 headline-1 text-[#A89572]`}>
        {data.title}
      </h2>

      {data.cards.map((card, i) => {
        const delay = isInView ? CARD_BASE_DELAY_S + i * CARD_STAGGER_S : 0;

        const hoverScale =
          reduceMotion || hoveredIndex === null
            ? 1
            : hoveredIndex === i
              ? HOVER_SCALE_UP
              : HOVER_SCALE_DOWN;

        return (
          <motion.div
            key={`${card.title}-${i}`}
            initial={
              reduceMotion
                ? { opacity: 0 }
                : { y: CARD_START_Y, opacity: 0, scale: 0.98 }
            }
            animate={
              isInView
                ? { y: 0, opacity: 1, scale: 1 }
                : reduceMotion
                  ? { opacity: 0 }
                  : { y: CARD_START_Y, opacity: 0, scale: 0.98 }
            }
            transition={{
              y: { duration: CARD_Y_DURATION_S, delay, ease: EASE_OUT_EXPO },
              scale: {
                duration: CARD_Y_DURATION_S,
                delay,
                ease: EASE_OUT_EXPO,
              },
              opacity: {
                duration: CARD_FADE_DURATION_S,
                delay,
                ease: "easeOut",
              },
            }}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{
              gridColumn: `${i * cardColSpan + 1} / span ${cardColSpan}`,
              marginTop: `${TITLE_CARDS_GAP_PX}px`,
              height: "540px",
              willChange: "transform, opacity",
            }}
            className="relative z-10 row-start-2"
          >
            {/* Capa interna: la card visible, con la escala del hover. */}
            <motion.div
              animate={{ scale: hoverScale }}
              transition={HOVER_TRANSITION}
              className="flex h-full w-full flex-col justify-between rounded-[20px] bg-white p-[20px]"
            >
              <h3 className="whitespace-pre-line font-[Quadrant_Text] text-[34px] font-normal not-italic leading-[115%] tracking-[0%] text-[#A89572]">
                {card.title}
              </h3>

              <div className="flex flex-1 items-center justify-center">
                <Image
                  src={card.icon.url || ""}
                  alt={card.icon.alt || card.title}
                  width={144}
                  height={144}
                  className="h-36 w-36 object-contain"
                />
              </div>

              <p className="font-[Gellix] text-[16px] font-normal not-italic leading-[135%] tracking-[0%] text-[#A89572]">
                {card.description}
              </p>
            </motion.div>
          </motion.div>
        );
      })}
    </Grid>
  );
}
