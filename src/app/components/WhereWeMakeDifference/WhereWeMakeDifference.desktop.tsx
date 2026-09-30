"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

import { WhereWeMakeDifferenceWp } from "../../_interfaces/wordpress-components";
import Grid, { COLS } from "../layout/Grid";
import TypewriterText from "../TypewriterText";

interface Props {
  data: WhereWeMakeDifferenceWp;
}

const CARD_COL_SPAN = 3;
const TITLE_TOP_PX = 27;
const TITLE_CARDS_GAP_PX = 50;

// Animación de cards
const CARD_START_Y = 90; // recorrido de subida (px)
const CARD_BASE_DELAY_S = 0.25; // pequeña espera para que arranque el título primero
const CARD_STAGGER_S = 0.3; // separación entre cards
const CARD_Y_DURATION_S = 1.6; // subida larga y suave
const CARD_FADE_DURATION_S = 1.2; // el fade termina antes que el movimiento
const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const; // arranca ágil y frena muy suave

export default function WhereWeMakeDifferenceDesktop({ data }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion();

  return (
    <Grid
      ref={sectionRef}
      data-header-theme="light"
      style={{ paddingTop: `${TITLE_TOP_PX}px` }}
      className="min-h-screen grid-rows-[auto_auto] content-start overflow-hidden pb-[40px]"
    >
      <h2 className={`${COLS.content} row-start-1 headline-1 text-[#A89572]`}>
        <TypewriterText text={data.title} play={isInView} />
      </h2>

      {data.cards.map((card, i) => {
        const delay = isInView ? CARD_BASE_DELAY_S + i * CARD_STAGGER_S : 0;

        return (
          <motion.div
            key={`${card.number}-${i}`}
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
            style={{
              gridColumn: `${i * CARD_COL_SPAN + 1} / span ${CARD_COL_SPAN}`,
              marginTop: `${TITLE_CARDS_GAP_PX}px`,
              height: "540px",
              willChange: "transform, opacity",
            }}
            className="row-start-2 flex flex-col justify-between rounded-[20px] bg-white p-[20px]"
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
        );
      })}
    </Grid>
  );
}
