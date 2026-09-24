"use client";

import Image from "next/image";
import { ProjectContentBlockWp } from "@/app/_interfaces/wordpress-components";
import FeaturedProjects from "../FeaturedProjects";
import { ProjectDetailProps, useProjectDetail } from "./useProjectDetail";

const HERO_GRADIENT =
  "linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0) 20%, rgba(255, 255, 255, 0) 67.85%, rgba(0, 0, 0, 0.4) 100%)";

function ContentBlock({ block }: { block: ProjectContentBlockWp }) {
  switch (block.type) {
    case "image":
      return (
        <div className="relative h-[540px] w-full overflow-hidden">
          <Image
            src={block.image.url}
            alt={block.image.alt}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      );

    default:
      return null;
  }
}

export default function ProjectDetailPageMobile({ data }: ProjectDetailProps) {
  useProjectDetail(data);

  return (
    <article data-header-theme="light" className="w-full">
      {/* Hero */}
      <div data-header-theme="dark" className="relative h-dvh w-full">
        <Image
          src={data.hero_image.url}
          alt={data.hero_image.alt || data.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: HERO_GRADIENT }}
        />
        <h1 className="absolute bottom-[32px] left-[16px] right-[16px] font-[Gellix] text-[30px] font-normal not-italic leading-[100%] tracking-[0%] text-[#F6F5F1]">
          {data.title}
        </h1>
      </div>

      {/* Info */}
      <div className="px-[16px] pb-[60px] pt-[40px]">
        <div className="flex flex-col gap-1">
          {(Array.isArray(data.information) ? data.information : []).map(
            (item) => (
              <p
                key={item.label}
                className="font-[Gellix] text-[16px] font-normal not-italic leading-[135%] tracking-[0%] text-[#A89572]"
              >
                {item.label}: {item.value}
              </p>
            ),
          )}
        </div>

        <div className="mt-[40px] flex flex-col gap-[40px]">
          <p className="font-[Gellix] text-[30px] font-normal not-italic leading-[100%] tracking-[0%] text-[#A89572]">
            {data.headline}
          </p>
          <p className="font-[Gellix] text-[16px] font-normal not-italic leading-[135%] tracking-[0%] text-[#A89572]">
            {data.description}
          </p>
        </div>

        <div className="mt-[60px] flex flex-col gap-[80px]">
          {data.content.map((block, index) => (
            <ContentBlock key={index} block={block} />
          ))}
        </div>
      </div>

      <FeaturedProjects
        projects={data.other_projects}
        title="Otros Proyectos"
        animateEntrance={false}
        showTopBorder
      />
    </article>
  );
}
