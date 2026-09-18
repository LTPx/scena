import Image from "next/image";
import {
  ProjectContentBlockWp,
  ProjectDetailWp,
} from "@/app/_interfaces/wordpress-components";
import { Cover } from "./Cover";
import Grid, {
  clampStartCol,
  COLS,
  PROJECT_IMAGE_HEIGHT,
  PROJECT_IMAGE_SPAN,
} from "./layout/Grid";

interface Props {
  data: ProjectDetailWp;
}

function ContentBlock({ block }: { block: ProjectContentBlockWp }) {
  switch (block.type) {
    case "image": {
      const span = PROJECT_IMAGE_SPAN[block.orientation];
      const height = PROJECT_IMAGE_HEIGHT[block.orientation];
      const startCol = clampStartCol(block.start_col, block.orientation);

      return (
        <div
          data-header-theme="dark"
          className="relative w-full overflow-hidden"
          style={{
            gridColumn: `${startCol} / span ${span}`,
            height: `${height}px`,
          }}
        >
          <Image
            src={block.image.url}
            alt={block.image.alt}
            fill
            className="object-cover"
          />
        </div>
      );
    }

    default:
      return null;
  }
}

export default function ProjectDetailPage({ data }: Props) {
  return (
    <article className="w-full">
      <div data-header-theme="dark">
        <Cover img={data.hero_image.url}>
          <Grid className="absolute inset-x-0 top-0 w-full items-center py-10">
            <h1
              className={`${COLS.projectsTitle} font-[Gellix] text-[20px] font-normal not-italic text-white`}
              style={{ lineHeight: "100%", letterSpacing: "0%" }}
            >
              {data.title}
            </h1>

            <div
              className={`${COLS.projectFilters} flex w-fit flex-wrap items-center gap-2`}
            >
              {data.categories.map((cat) => (
                <span
                  key={cat.id}
                  className="rounded-full bg-white/15 px-4 py-[5px] font-[Gellix] text-[14px] font-normal not-italic text-white backdrop-blur-sm"
                  style={{ lineHeight: "100%", letterSpacing: "0%" }}
                >
                  {cat.name}
                </span>
              ))}
            </div>
          </Grid>
        </Cover>
      </div>

      <Grid className="gap-y-8 py-16 md:gap-y-16 md:py-24">
        <div className={`${COLS.projectMeta} flex flex-col gap-1`}>
          {data.meta.map((item) => (
            <p
              key={item.label}
              className="font-[Gellix] text-[12px] font-normal not-italic text-[#A89572]"
              style={{ lineHeight: "135%", letterSpacing: "0%" }}
            >
              {item.label}: {item.value}
            </p>
          ))}
        </div>

        <div className={`${COLS.projectContent} flex flex-col gap-8`}>
          <p
            className="font-[Gellix] text-[24px] font-normal not-italic text-[#A89572] md:text-[28px]"
            style={{ lineHeight: "135%", letterSpacing: "0%" }}
          >
            {data.headline}
          </p>
          <p
            className="font-[Gellix] text-[13px] font-normal not-italic text-[#A89572]/80"
            style={{ lineHeight: "150%", letterSpacing: "0%" }}
          >
            {data.description}
          </p>
        </div>

        {data.content.map((block, index) => (
          <ContentBlock key={index} block={block} />
        ))}
      </Grid>
    </article>
  );
}
