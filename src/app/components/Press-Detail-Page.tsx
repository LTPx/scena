import Image from "next/image";
import {
  NewsContentBlockWp,
  NewsDetailWp,
} from "@/app/_interfaces/wordpress-components";
import Grid, { COLS } from "./layout/Grid";

interface Props {
  data: NewsDetailWp;
}

function ContentBlock({ block }: { block: NewsContentBlockWp }) {
  switch (block.type) {
    case "paragraph":
      return (
        <div
          className="font-sans text-[16px] font-normal leading-[135%] tracking-normal text-[#A89572]"
          dangerouslySetInnerHTML={{ __html: block.text }}
        />
      );

    case "image":
      return (
        <div
          data-header-theme="dark"
          className="relative aspect-[4/3] w-full overflow-hidden"
        >
          <Image
            src={block.image.url}
            alt={block.image.alt}
            fill
            className="object-cover"
          />
        </div>
      );

    case "quote":
      return (
        <p className="whitespace-pre-line font-sans text-[40px] font-normal leading-[100%] tracking-normal text-[#A89572]">
          {block.text}
        </p>
      );
  }
}

export default function PressDetailPage({ data }: Props) {
  return (
    <article data-header-theme="light" className="w-full">
      <Grid className="items-baseline gap-y-8 pt-[27px] pb-[40px] md:gap-y-16">
        {" "}
        <span
          className={`${COLS.pressCategory} font-sans text-[40px] font-normal leading-none tracking-normal text-[#A89572]`}
        >
          {data.category}
        </span>
        <span
          className={`${COLS.pressNumber} font-sans text-[16px] font-normal leading-[135%] tracking-normal text-[#A89572]`}
        >
          {data.number}
        </span>
        <h1
          className={`${COLS.pressTitle} font-sans text-[40px] font-normal leading-[100%] tracking-normal text-[#A89572]`}
        >
          {data.title}
        </h1>
        <div
          data-header-theme="dark"
          className={`${COLS.pressMedia} relative aspect-[16/9] w-full overflow-hidden`}
        >
          <Image
            src={data.hero_image.url}
            alt={data.hero_image.alt}
            fill
            priority
            className="object-cover"
          />
        </div>
        {data.content.map((block, index) => (
          <div key={index} className={COLS.pressContent}>
            <ContentBlock block={block} />
          </div>
        ))}
        {data.video && (
          <div data-header-theme="dark" className={COLS.pressMedia}>
            <video className="w-full" controls poster={data.video.poster?.url}>
              <source src={data.video.url} type="video/mp4" />
            </video>
          </div>
        )}
      </Grid>
    </article>
  );
}
