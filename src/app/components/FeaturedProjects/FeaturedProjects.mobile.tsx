"use client";

import { useRef } from "react";
import Image from "next/image";
import { useInView } from "framer-motion";

import { ProjectHomeWp } from "../../_interfaces/wordpress-components";
import GlassButton from "../GlassButton";
import TypewriterText from "../TypewriterText";
import { Link } from "@/navigation";

interface Props {
  projects: ProjectHomeWp[];
  title?: string;
  showTopBorder?: boolean;
  animateEntrance?: boolean;
}

export default function FeaturedProjectsMobile({
  projects,
  title = "Proyectos destacados",
  showTopBorder = false,
  animateEntrance = true,
}: Props) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(titleRef, { once: true, amount: 0.9 });

  return (
    <section data-header-theme="light" className="pb-[30px] pt-[27px]">
      {showTopBorder && (
        <div aria-hidden className="mx-4 border-t border-[#A89572]" />
      )}

      <h2
        ref={titleRef}
        className={`px-4 font-[Gellix] text-[32px] font-normal leading-[100%] text-[#A89572] ${
          showTopBorder ? "mt-[15px]" : ""
        }`}
      >
        {animateEntrance ? (
          <TypewriterText text={title} play={isInView} />
        ) : (
          title
        )}
      </h2>

      <div
        className="
          mt-8 flex snap-x snap-mandatory gap-[9px] overflow-x-auto pl-4
          scroll-pl-4 [-ms-overflow-style:none] [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden
        "
      >
        {projects.map((project, i) => (
          <div
            key={`${project.project}-${i}`}
            className="relative aspect-[4/5] w-full flex-shrink-0 snap-start overflow-hidden"
          >
            <Link
              href={`/projects/${project.slug}`}
              data-header-theme="dark"
              className="absolute inset-0 block"
            >
              <Image
                src={project.feature_image.url}
                alt={project.feature_image.alt || project.title}
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" />
              <span className="absolute bottom-5 left-5 font-[Gellix] text-[32px] font-normal leading-[100%] text-[#F6F5F1]">
                {project.title}
              </span>
            </Link>

            {/* Tags: fuera del <Link> para no anidar <a> dentro de <a> */}
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
        ))}

        {/* Espacio final para que la última tarjeta no quede pegada al borde */}
        <div aria-hidden className="w-4 flex-shrink-0" />
      </div>
    </section>
  );
}
