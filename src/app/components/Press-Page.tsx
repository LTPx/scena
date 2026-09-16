"use client";

import { useEffect, useRef, useState } from "react";
import { NewsPageWp } from "@/app/_interfaces/wordpress-components";

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
        // solo el 20% superior del contenedor cuenta como "franja activa"
        rootMargin: "0px 0px -80% 0px",
        threshold: 0,
      }
    );

    itemRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [data.news.length]);

  return (
    <div className="relative isolate z-0 h-dvh overflow-hidden px-6 py-10 md:px-10 md:py-[clamp(24px,6vh,60px)]">
      <div className="grid h-full gap-12 md:grid-cols-[1fr_1.4fr] md:gap-[clamp(40px,6vw,90px)]">
        {/* Columna izquierda: estática */}
        <div className="flex min-h-0 flex-col justify-start pt-[clamp(16px,5vh,40px)]">
          <h1 className="max-w-md font-sans text-[clamp(24px,3vw,40px)] leading-tight text-[color:var(--color-press-title,#8a6a4e)]">
            {data.title}
          </h1>
        </div>

        {/* Columna derecha: scroll propio */}
        <div
          ref={scrollRef}
          className="h-full min-h-0 overflow-y-auto pr-4"
        >
          <div className="flex flex-col gap-[clamp(24px,5vh,56px)] pb-[45vh]">
            {data.news.map((item, index) => (
              <div
                key={item.id}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                data-index={index}
                className={`grid grid-cols-[40px_1fr] gap-4 transition-opacity duration-300 ${
                  activeIndex === index ? "opacity-100" : "opacity-30"
                }`}
              >
                <span className="text-sm">{String(index + 1).padStart(2, "0")}</span>
                <p className="text-[15px] leading-snug">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}