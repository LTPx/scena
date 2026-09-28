"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { AboutPageWp } from "@/app/_interfaces/wordpress-components";
import Grid, { COLS } from "../layout/Grid";

interface Props {
  data: AboutPageWp["differentiators"];
}

const TITLE_TOP_PX = 27;
const TITLE_CARDS_GAP_PX = 50;
const CARD_STAGGER_S = 0.18;

export default function AboutDifferentiatorsTrackDesktop({ data }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.6 });

  const cardColSpan = 12 / data.cards.length;

  return (
    <Grid
      ref={sectionRef}
      style={{ paddingTop: `${TITLE_TOP_PX}px` }}
      className="min-h-screen grid-rows-[auto_auto] content-start overflow-hidden pb-[40px]"
    >
      <h2
        className={`${COLS.content} row-start-1 whitespace-pre-line font-[Gellix] text-[40px] font-normal not-italic leading-[100%] tracking-[0%] text-[#A89572]`}
      >
        {data.title}
      </h2>

      {data.cards.map((card, i) => (
        <motion.div
          key={`${card.title}-${i}`}
          initial={{ y: 120, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 120, opacity: 0 }}
          transition={{
            duration: 0.9,
            delay: isInView ? i * CARD_STAGGER_S : 0,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{
            gridColumn: `${i * cardColSpan + 1} / span ${cardColSpan}`,
            marginTop: `${TITLE_CARDS_GAP_PX}px`,
            height: "540px",
          }}
          className="row-start-2 flex flex-col justify-between rounded-[20px] bg-white p-[20px]"
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
        </motion.div>
      ))}
    </Grid>
  );
}
