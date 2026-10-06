"use client";

import { useRef } from "react";
import Image from "next/image";
import { useInView } from "framer-motion";
import { WhereWeMakeDifferenceWp } from "../../_interfaces/wordpress-components";
import TypewriterText from "../TypewriterText";
import { useStickyHorizontal } from "../Projects-Page/useStickyHorizontal";

interface Props {
  data: WhereWeMakeDifferenceWp;
}

export default function WhereWeMakeDifferenceMobile({ data }: Props) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(titleRef, { once: true, amount: 0.9 });

  const wrapperRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useStickyHorizontal(wrapperRef, stickyRef, trackRef, null, [data.cards], {
    speed: 0.9,
    center: true,
  });

  return (
    <section ref={wrapperRef} data-header-theme="light" className="relative">
      <div ref={stickyRef} className="sticky py-[55px]">
        <h2
          ref={titleRef}
          className="whitespace-pre-line px-[15px] font-[Gellix] text-[30px] font-normal not-italic leading-[100%] tracking-[0%] text-[#A89572]"
        >
          <TypewriterText text={data.title} play={isInView} />
        </h2>

        <div className="mt-10 overflow-hidden">
          <div
            ref={trackRef}
            className="flex gap-2 px-[15px] will-change-transform"
            style={{ width: "max-content" }}
          >
            {data.cards.map((card, i) => (
              <article
                key={`${card.number}-${i}`}
                className="flex min-h-[450px] w-[78vw] max-w-[420px] flex-shrink-0 flex-col justify-between rounded-[20px] bg-white p-5"
              >
                <h3 className="whitespace-pre-line font-[Quadrant_Text] text-[24px] font-normal not-italic leading-[115%] tracking-[0%] text-[#A89572]">
                  {card.title}
                </h3>

                <div className="flex flex-1 items-center justify-center py-6">
                  <Image
                    src={card.icon.url}
                    alt={card.icon.alt || card.title}
                    width={144}
                    height={144}
                    className="h-32 w-32 object-contain"
                  />
                </div>

                <p className="font-[Gellix] text-[16px] font-normal not-italic leading-[135%] tracking-[0%] text-[#A89572]">
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
