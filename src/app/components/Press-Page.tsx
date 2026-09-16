"use client";

import { useEffect, useRef, useState } from "react";
import { NewsPageWp } from "@/app/_interfaces/wordpress-components";
import { Link } from "@/navigation";
import Grid, { COLS } from "./layout/Grid";

interface Props {
  data: NewsPageWp;
}

export default function PressPage({ data }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setActiveIndex(index);
          }
        });
      },
      {
        root,
        rootMargin: "0px 0px -80% 0px",
        threshold: 0,
      },
    );

    itemRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [data.news.length]);

  return (
    <div className="relative isolate z-0 h-dvh overflow-hidden py-10 md:py-[clamp(24px,6vh,60px)]">
      <Grid fullHeight className="items-start">
        <div className={`${COLS.content} flex min-h-0 flex-col justify-start`}>
          <h1 className="font-[Gellix] text-[40px] font-normal not-italic leading-[100%] tracking-[0%] text-[#A89572]">
            {data.title}
          </h1>
        </div>

        <div
          ref={scrollRef}
          className={`${COLS.newsList} h-full min-h-0 overflow-y-auto pr-4`}
        >
          <div className="flex flex-col gap-[clamp(24px,5vh,56px)] pb-[45vh]">
            {data.news.map((item, index) => (
              <div
                key={item.id}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                data-index={index}
                className={`grid ${COLS.newsItemGrid} transition-opacity duration-300 ${
                  activeIndex === index ? "opacity-100" : "opacity-30"
                }`}
              >
                <span
                  className={`${COLS.newsNumber} font-[Gellix] text-[16px] font-normal not-italic leading-[135%] tracking-[0%] text-[#A89572]`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <Link href={`/press/${item.slug}`} className={COLS.newsTitle}>
                  <p className="font-[Gellix] text-[16px] font-normal not-italic leading-[135%] tracking-[0%] text-[#A89572]">
                    {item.title}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </Grid>
    </div>
  );
}
