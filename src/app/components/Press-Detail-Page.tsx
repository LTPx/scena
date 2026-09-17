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
        <p className="text-[15px] leading-relaxed text-neutral-600">
          {block.text}
        </p>
      );

    case "image":
      if (!block.image) return null;
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
        <p className="whitespace-pre-line text-[clamp(20px,2.2vw,28px)] leading-snug text-[color:var(--color-press-title,#8a6a4e)]">
          {block.text}
        </p>
      );

    case "video":
      if (!block.video) return null;
      return (
        <div
          data-header-theme="dark"
        >
          <video className="w-full" controls poster={block.video.poster?.url}>
            <source src={block.video.url} type="video/mp4" />
          </video>
        </div>
      );

    default:
      return null;
  }
}

export default function PressDetailPage({ data }: Props) {
  return (
    <article data-header-theme="light" className="w-full">
      <Grid className="gap-y-8 md:gap-y-16">
        <span
          className={`${COLS.pressCategory} font-sans text-base text-neutral-500`}
        >
          {data.category}
        </span>

        <span
          className={`${COLS.pressNumber} self-start text-xs text-neutral-400`}
        >
          {data.number}
        </span>

        <h1
          className={`${COLS.pressTitle} font-sans text-[clamp(20px,2.4vw,32px)] leading-snug text-[color:var(--color-press-title,#8a6a4e)]`}
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
          <div
            key={index}
            className={
              block.type === "video" ? COLS.pressMedia : COLS.pressContent
            }
          >
            <ContentBlock block={block} />
          </div>
        ))}
      </Grid>
    </article>
  );
}
