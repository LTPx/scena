"use client";

import { useRef } from "react";
import { AboutPageWp } from "../../_interfaces/wordpress-components";
import { useStickyHorizontal } from "../Projects-Page/useStickyHorizontal";

interface Props {
  data: AboutPageWp["differentiators"];
}

export default function AboutDifferentiatorsTrackMobile({ data }: Props) {
  const wrapperRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useStickyHorizontal(wrapperRef, stickyRef, trackRef, null, [data.cards], {
    speed: 0.9,
    center: true,
  });

  return (
    <section ref={wrapperRef} data-header-theme="light" className="relative">
      <div ref={stickyRef} className="sticky py-10">
        <div className="px-[15px]">
          {data.title && (
            <h2 className="mt-6 whitespace-pre-line font-[Gellix] text-[30px] font-normal not-italic leading-[100%] text-[#A89572]">
              {data.title}
            </h2>
          )}
        </div>

        <div className="mt-8 overflow-hidden">
          <div
            ref={trackRef}
            className="flex gap-2 px-[15px] will-change-transform"
            style={{ width: "max-content" }}
          >
            {data.cards.map((card, i) => (
              <article
                key={`${card.title}-${i}`}
                className="flex min-h-[425px] w-[78vw] max-w-[420px] flex-shrink-0 flex-col justify-between rounded-[20px] bg-white p-5"
              >
                <h3 className="whitespace-pre-line font-[Quadrant_Text] text-[24px] font-normal not-italic leading-[115%] tracking-[0%] text-[#A89572]">
                  {card.title}
                </h3>

                <div className="flex flex-1 items-center justify-center py-6">
                  <div className="h-32 w-32 rounded-full border border-[#A89572]/40" />
                </div>

                <p className="font-[Gellix] text-[16px] font-normal not-italic leading-[135%] text-[#A89572]">
                  {card.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
