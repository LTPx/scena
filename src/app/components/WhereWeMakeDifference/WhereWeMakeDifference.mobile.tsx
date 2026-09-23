"use client";

import { useRef } from "react";
import Image from "next/image";
import { useInView } from "framer-motion";
import { WhereWeMakeDifferenceWp } from "../../_interfaces/wordpress-components";
import TypewriterText from "../TypewriterText";

interface Props {
  data: WhereWeMakeDifferenceWp;
}

export default function WhereWeMakeDifferenceMobile({ data }: Props) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(titleRef, { once: true, amount: 0.9 });

  return (
    <section data-header-theme="light" className="py-10">
      <h2
        ref={titleRef}
        className="whitespace-pre-line px-4 font-[Gellix] text-[32px] font-normal not-italic leading-[100%] text-[#A89572]"
      >
        <TypewriterText text={data.title} play={isInView} />
      </h2>

      <div
        className="
          mt-10 flex snap-x snap-mandatory gap-2 overflow-x-auto px-4
          scroll-pl-4 [-ms-overflow-style:none] [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden
        "
      >
        {data.cards.map((card, i) => (
          <article
            key={`${card.number}-${i}`}
            className="flex min-h-[450px] w-[78%] max-w-[420px] flex-shrink-0 snap-start flex-col justify-between rounded-[20px] bg-white p-5"
          >
            <h3 className="whitespace-pre-line font-[Quadrant_Text] text-[28px] font-normal not-italic leading-[115%] text-[#A89572]">
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

            <p className="font-[Gellix] text-[16px] font-normal not-italic leading-[135%] text-[#A89572]">
              {card.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
