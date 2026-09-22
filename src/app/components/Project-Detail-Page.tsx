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
import ScrollZoomImage from "./ScrollZoomImage";
import GlassButton from "./GlassButton";
import FeaturedProjects from "./FeaturedProjects";

interface Props {
  data: ProjectDetailWp;
}

function ContentBlock({
  block,
  imageIndex,
}: {
  block: ProjectContentBlockWp;
  imageIndex: number;
}) {
  switch (block.type) {
    case "image": {
      const span = PROJECT_IMAGE_SPAN[block.orientation];
      const height = PROJECT_IMAGE_HEIGHT[block.orientation];
      const startCol = clampStartCol(block.start_col, block.orientation);

      const spacing = imageIndex === 0 ? "mt-[150px]" : "mt-[200px]";

      return (
        <ScrollZoomImage
          src={block.image.url}
          alt={block.image.alt}
          startCol={startCol}
          span={span}
          height={height}
          className={spacing}
        />
      );
    }

    default:
      return null;
  }
}

export default function ProjectDetailPage({ data }: Props) {
  let imageCount = 0;

  return (
    <article data-header-theme="light" className="w-full">
      <div data-header-theme="dark">
        <Cover img={data.hero_image.url}>
          <Grid className="absolute inset-x-0 top-0 w-full items-center py-10">
            <h1
              className={`${COLS.projectsTitle} font-[Gellix] text-[40px] font-normal not-italic leading-[100%] tracking-[0%] text-[#F6F5F1]`}
            >
              {data.title}
            </h1>

            <div
              className={`${COLS.projectFilters} flex w-fit flex-wrap items-center gap-2`}
            >
              {data.categories.map((cat) => (
                <GlassButton
                  key={cat.id}
                  href={`/projects?category=${cat.slug}`}
                >
                  {cat.name}
                </GlassButton>
              ))}
            </div>
          </Grid>
        </Cover>
      </div>

      <Grid className="gap-y-0 py-16 md:py-24">
        <div className={`${COLS.projectMeta} flex flex-col gap-1`}>
          {data.meta.map((item) => (
            <p
              key={item.label}
              className="font-[Gellix] text-[16px] font-normal not-italic leading-[135%] tracking-[0%] text-[#A89572]"
            >
              {item.label}: {item.value}
            </p>
          ))}
        </div>

        <div className={`${COLS.projectContent} flex flex-col gap-[70px]`}>
          <p className="font-[Gellix] text-[40px] font-normal not-italic leading-[100%] tracking-[0%] text-[#A89572]">
            {data.headline}
          </p>
          <p className="font-[Gellix] text-[16px] font-normal not-italic leading-[135%] tracking-[0%] text-[#A89572]">
            {data.description}
          </p>
        </div>

        {data.content.map((block, index) => {
          const imageIndex = block.type === "image" ? imageCount++ : 0;
          return (
            <ContentBlock key={index} block={block} imageIndex={imageIndex} />
          );
        })}
      </Grid>
      <FeaturedProjects
        projects={data.other_projects}
        title="Otros Proyectos"
        showTopBorder
      />
    </article>
  );
}
