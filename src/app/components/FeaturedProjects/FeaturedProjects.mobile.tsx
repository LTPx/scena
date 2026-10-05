"use client";

import { useRef } from "react";
import Image from "next/image";
import { useInView } from "framer-motion";

import { ProjectHomeWp } from "../../_interfaces/wordpress-components";
import GlassButton from "../GlassButton";
import TypewriterText from "../TypewriterText";
import { getAspectRatioNumber } from "../Gallery/aspect";
import { Link } from "@/navigation";
import { useVerticalToHorizontalScroll } from "../Projects-Page/useVerticalToHorizontalScroll";

interface Props {
  projects: ProjectHomeWp[];
  title?: string;
  animateEntrance?: boolean;
}

const IMAGE_HEIGHT_PX = 520;
const GAP_PX = 9;

export default function FeaturedProjectsMobile({
  projects,
  title = "Proyectos destacados",
  animateEntrance = true,
}: Props) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(titleRef, { once: true, amount: 0.9 });

  useVerticalToHorizontalScroll(scrollerRef, [projects]);

  return (
    <section data-header-theme="light" className="pb-[30px] pt-[27px]">
      <h2
        ref={titleRef}
        className="px-4 font-[Gellix] text-[30px] font-normal leading-[100%] text-[#A89572]"
      >
        {animateEntrance ? (
          <TypewriterText text={title} play={isInView} />
        ) : (
          title
        )}
      </h2>

      <div
        ref={scrollerRef}
        className="mt-8 flex overflow-x-auto overscroll-x-contain pl-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ gap: GAP_PX }}
      >
        {projects.map((project, i) => {
          const image = project.feature_image;
          if (!image?.url) return null;

          const ratio = getAspectRatioNumber(image, (project as any).aspect);
          const width = Math.round(IMAGE_HEIGHT_PX * ratio);

          return (
            <div
              key={`${project.project}-${i}`}
              data-header-theme="dark"
              className="relative flex-shrink-0 overflow-hidden"
              style={{ height: IMAGE_HEIGHT_PX, width }}
            >
              <Link
                href={`/projects/${project.slug}`}
                className="absolute inset-0 block"
              >
                <Image
                  src={image.url}
                  alt={image.alt || project.title}
                  fill
                  priority={i === 0}
                  sizes={`${width}px`}
                  className="object-cover"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" />
                <span className="absolute bottom-5 left-5 font-[Gellix] text-[32px] font-normal leading-[100%] text-[#F6F5F1]">
                  {project.title}
                </span>
              </Link>

              <div className="absolute bottom-[68px] left-5 z-10 flex flex-wrap gap-2">
                {project.categories.map((category) => (
                  <GlassButton
                    key={category.id}
                    href={`/projects?category=${category.slug}`}
                  >
                    {category.name}
                  </GlassButton>
                ))}
              </div>
            </div>
          );
        })}

        <div aria-hidden className="w-4 flex-shrink-0" />
      </div>
    </section>
  );
}
