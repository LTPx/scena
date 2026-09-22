"use client";

import { useState } from "react";
import { NewsPageWp } from "@/app/_interfaces/wordpress-components";
import { Link } from "@/navigation";
import Grid, { COLS } from "./layout/Grid";

interface Props {
  data: NewsPageWp;
}

export default function PressPage({ data }: Props) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div data-header-theme="light" className="relative isolate z-0">
      <Grid className="items-start">
        <div
          className={`${COLS.content} sticky top-[27px] mt-[27px] flex flex-col justify-start`}
        >
          <h1 className="font-[Gellix] text-[40px] font-normal not-italic leading-[100%] tracking-[0%] text-[#A89572]">
            {data.title}
          </h1>
        </div>
        <div
          className={`${COLS.newsList} mt-[40px] flex flex-col gap-[clamp(24px,5vh,56px)]`}
        >
          {data.news.map((item, index) => (
            <div
              key={item.id}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`grid ${COLS.newsItemGrid} transition-opacity duration-300 ${
                hoveredIndex === index ? "opacity-100" : "opacity-30"
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
      </Grid>
    </div>
  );
}
