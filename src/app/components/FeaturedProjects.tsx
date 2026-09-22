"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

import { ProjectHomeWp } from "../_interfaces/wordpress-components";
import { colSpanWidth, offsetForColumn, GRID_MARGIN_PX } from "./layout/Grid";
import GlassButton from "./GlassButton";
import TypewriterText from "./TypewriterText";
import { Link } from "@/navigation";

interface Props {
  projects: ProjectHomeWp[];
  title?: string;
  showTopBorder?: boolean;
}

const CARD_SPAN = 10;
const CARD_START_COL = 3;
const TAGS_START_COL = 6;

const CARD_GAP_PX = 9;

const END_SPACER_PX = Math.max(GRID_MARGIN_PX - CARD_GAP_PX, 0);

const VH_PER_100VW_TRAVEL = 90;
const REVEAL_BUFFER_VH = 100;

const TOP_BORDER_COLOR = "#A89572";

export default function FeaturedProjects({
  projects,
  title = "Proyectos destacados",
  showTopBorder = false,
}: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(stickyRef, { once: true, amount: 0.9 });

  const [travelDistance, setTravelDistance] = useState(0);
  const [trackFraction, setTrackFraction] = useState(1);
  const [wrapperHeight, setWrapperHeight] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;

      const trackWidth = trackRef.current.scrollWidth;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      const distance = Math.max(trackWidth - viewportWidth, 0);

      setTravelDistance(distance);

      const extraScrollForTravel =
        (distance / viewportWidth) *
        (VH_PER_100VW_TRAVEL / 100) *
        viewportHeight;

      const baseHeight = viewportHeight + extraScrollForTravel;
      const bufferHeight = (REVEAL_BUFFER_VH / 100) * viewportHeight;
      const totalHeight = baseHeight + bufferHeight;

      setWrapperHeight(totalHeight);
      setTrackFraction(baseHeight / totalHeight);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  const trackX = useTransform(
    scrollYProgress,
    [0, trackFraction],
    [0, -travelDistance],
  );

  const startOffset = offsetForColumn(CARD_START_COL);
  const cardWidth = colSpanWidth(CARD_SPAN);
  const tagsLeftOffset = `calc(${offsetForColumn(TAGS_START_COL)} - ${offsetForColumn(
    CARD_START_COL,
  )})`;

  return (
    <div
      ref={wrapperRef}
      data-header-theme="light"
      style={{
        height: wrapperHeight ? `${wrapperHeight}px` : "250vh",
      }}
      className="relative z-0"
    >
      <div
        ref={stickyRef}
        className="sticky top-0 flex h-screen flex-col overflow-hidden pt-[27px]"
      >
        {showTopBorder && (
          <motion.div
            aria-hidden
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isInView ? 1 : 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{
              marginLeft: startOffset,
              marginRight: `${GRID_MARGIN_PX}px`,
              borderTop: `1px solid ${TOP_BORDER_COLOR}`,
              transformOrigin: "left",
            }}
          />
        )}

        <h2
          className={`mb-8 font-[Gellix] text-[40px] font-normal leading-[100%] tracking-[0%] text-[#A89572] ${
            showTopBorder ? "mt-[15px]" : ""
          }`}
          style={{ paddingLeft: startOffset }}
        >
          <TypewriterText text={title} play={isInView} />
        </h2>
        <motion.div
          ref={trackRef}
          style={{
            x: trackX,
            paddingLeft: startOffset,
            gap: `${CARD_GAP_PX}px`,
          }}
          className="flex flex-1 pb-[40px]"
        >
          {projects.map((project, i) => (
            <div
              key={`${project.project}-${i}`}
              style={{ width: cardWidth }}
              className="relative h-full flex-shrink-0 overflow-hidden"
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
                  className="object-cover"
                />

                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" />
                <span className="absolute bottom-8 left-8 font-[Gellix] text-[40px] font-normal leading-[100%] tracking-[0%] text-[#F6F5F1]">
                  {project.title}
                </span>
              </Link>

              <div
                className="absolute bottom-8 z-10 flex gap-2"
                style={{ left: tagsLeftOffset }}
              >
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

          <div
            aria-hidden
            style={{ width: `${END_SPACER_PX}px` }}
            className="h-full flex-shrink-0"
          />
        </motion.div>
      </div>
    </div>
  );
}
