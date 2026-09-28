"use client";

import { NewsPageWp } from "@/app/_interfaces/wordpress-components";
import { Link } from "@/navigation";

interface Props {
  data: NewsPageWp;
}

export default function PressPageMobile({ data }: Props) {
  return (
    <div data-header-theme="light" className="px-[15px] pb-20 pt-[220px]">
      <h1
        className="font-[Gellix] text-[30px] font-normal not-italic leading-[100%] tracking-[0%] text-[#A89572]"
        dangerouslySetInnerHTML={{ __html: data.title }}
      />
      <ul className="mt-[100px] flex flex-col gap-8">
        {data.news.map((item, index) => (
          <li key={item.id}>
            <Link
              href={`/press/${item.slug}`}
              className={`grid grid-cols-[53px_1fr] font-[Gellix] text-[16px] font-normal not-italic leading-[135%] tracking-[0%] text-[#A89572] transition-opacity duration-300 active:opacity-100 ${
                index === 0 ? "opacity-100" : "opacity-30"
              }`}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <span>{item.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
