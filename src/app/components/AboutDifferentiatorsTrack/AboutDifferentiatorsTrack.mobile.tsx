"use client";

import { ReactNode } from "react";
import { AboutPageWp } from "../../_interfaces/wordpress-components";

interface Props {
  data: AboutPageWp["differentiators"];
  nav: ReactNode;
}

export default function AboutDifferentiatorsTrackMobile({ data, nav }: Props) {
  return (
    <section data-header-theme="light" className="py-10">
      <div className="px-[15px]">
        {nav}
        {data.title && (
          <h2 className="mt-6 whitespace-pre-line font-[Gellix] text-[30px] font-normal not-italic leading-[100%] text-[#A89572]">
            {data.title}
          </h2>
        )}
      </div>

      <div
        className="
          mt-8 flex snap-x snap-mandatory gap-2 overflow-x-auto px-[15px]
          scroll-pl-[15px] [-ms-overflow-style:none] [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden
        "
      >
        {data.cards.map((card, i) => (
          <article
            key={`${card.title}-${i}`}
            className="flex min-h-[425px] w-[78%] max-w-[420px] flex-shrink-0 snap-start flex-col justify-between rounded-[20px] bg-white p-5"
          >
            <h3 className="whitespace-pre-line font-[Quadrant_Text] text-[28px] font-normal not-italic leading-[115%] text-[#A89572]">
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
    </section>
  );
}
