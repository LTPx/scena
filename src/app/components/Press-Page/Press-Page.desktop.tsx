"use client";

import { useEffect, useRef, useState } from "react";
import { NewsPageWp } from "@/app/_interfaces/wordpress-components";
import { Link } from "@/navigation";
import Grid, { COLS } from "../layout/Grid";

interface Props {
  data: NewsPageWp;
}

const MOCK_COUNT = 24;

const ACTIVE_LINE_TOP = 60;

export default function PressPageDesktop({ data }: Props) {
  const [scrollIndex, setScrollIndex] = useState(0);

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const mockNews =
    data.news.length > 0
      ? Array.from({ length: MOCK_COUNT }, (_, i) => ({
          ...data.news[0],
          id: `${data.news[0].id}-mock-${i}`,
        }))
      : data.news;

  useEffect(() => {
    const items = itemRefs.current.filter(Boolean) as HTMLDivElement[];
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number((entry.target as HTMLElement).dataset.index);
            setScrollIndex(index);
          }
        });
      },
      {
        rootMargin: `-${ACTIVE_LINE_TOP}px 0px -${
          window.innerHeight - ACTIVE_LINE_TOP - 1
        }px 0px`,
        threshold: 0,
      },
    );

    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [mockNews.length]);

  const activeIndex = hoveredIndex ?? scrollIndex;

  return (
    <div data-header-theme="light" className="relative isolate z-0">
      <Grid className="items-start">
        <div
          className={`${COLS.content} sticky top-[25px] mt-[25px] flex flex-col justify-start`}
        >
          <h1
            className="headline-1 text-[#A89572]"
            dangerouslySetInnerHTML={{ __html: data.title }}
          />
        </div>
        <div
          onMouseLeave={() => setHoveredIndex(null)}
          className={`${COLS.newsList} mt-[40px] flex flex-col gap-[clamp(24px,5vh,56px)]`}
        >
          {mockNews.map((item, index) => (
            <div
              key={item.id}
              data-index={index}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              className={`grid ${COLS.newsItemGrid} transition-opacity duration-300 ${
                activeIndex === index ? "opacity-100" : "opacity-35"
              }`}
            >
              <span
                className={`${COLS.newsNumber} font-[Gellix] text-[16px] font-normal not-italic leading-[135%] tracking-[0%] text-[#A89572]`}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <Link
                href={`/press/${item.slug}`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`${COLS.newsTitle} justify-self-start`}
              >
                <p className="font-[Gellix] text-[16px] font-normal not-italic leading-[135%] tracking-[0%] text-[#A89572]">
                  {item.title}
                </p>
              </Link>
            </div>
          ))}
        </div>
      </Grid>
    </div>
  );
}
