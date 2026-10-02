"use client";

import { AboutPageWp } from "@/app/_interfaces/wordpress-components";
import { useEffect, useRef, useState } from "react";
import Grid, { COLS } from "../layout/Grid";
import { useLenis } from "../SmoothScrollProvider";
import Gallery from "../Gallery";
import AboutDifferentiatorsTrack from "../AboutDifferentiatorsTrack";
import PartnersMarquee from "../PartnersMarquee";
import { motion } from "framer-motion";
import { INTRO_REVEAL_TRANSITION } from "../../context/introStore";

interface Props {
  data: AboutPageWp;
}

type SectionKey = "team" | "differentiators" | "partners";

const SECTIONS: { key: SectionKey; label: string }[] = [
  { key: "team", label: "Nuestro equipo" },
  { key: "differentiators", label: "Factores diferenciales" },
  { key: "partners", label: "Partners/Marques" },
];

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const FADE_JUMP_THRESHOLD_PX = 900;
const FADE_DURATION_MS = 280;

export default function AboutPageDesktop({ data }: Props) {
  const [activeSection, setActiveSection] = useState<SectionKey>("team");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const lenis = useLenis();

  const teamRef = useRef<HTMLElement>(null);
  const differentiatorsRef = useRef<HTMLDivElement>(null);
  const partnersRef = useRef<HTMLElement>(null);

  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true });
  }, [lenis]);

  const sectionRefs: Record<SectionKey, React.RefObject<HTMLElement | null>> = {
    team: teamRef,
    differentiators: differentiatorsRef,
    partners: partnersRef,
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length === 0) return;

        const mostVisible = visible.reduce((a, b) =>
          a.intersectionRatio > b.intersectionRatio ? a : b,
        );

        const key = (mostVisible.target as HTMLElement).dataset.section as
          | SectionKey
          | undefined;

        if (key) setActiveSection(key);
      },
      {
        rootMargin: "-30% 0px -60% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (key: SectionKey) => {
    const target = sectionRefs[key].current;
    if (!target || !lenis) {
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    const currentScroll = lenis.scroll;
    const targetTop = target.getBoundingClientRect().top + currentScroll;
    const distance = Math.abs(targetTop - currentScroll);

    if (distance > FADE_JUMP_THRESHOLD_PX) {
      setIsTransitioning(true);

      window.setTimeout(() => {
        lenis.scrollTo(target, { offset: 0, immediate: true });

        requestAnimationFrame(() => {
          setIsTransitioning(false);
        });
      }, FADE_DURATION_MS);
    } else {
      const duration = Math.min(Math.max(distance / 1000, 0.8), 2.2);
      lenis.scrollTo(target, {
        offset: 0,
        duration,
        easing: easeInOutCubic,
      });
    }
  };

  const sectionNav = (
    <nav className="flex flex-col gap-2">
      {SECTIONS.map((section) => {
        const isActive = section.key === activeSection;
        return (
          <button
            key={section.key}
            type="button"
            onClick={() => scrollToSection(section.key)}
            className={`text-left font-[Gellix] text-[16px] font-normal not-italic leading-[135%] tracking-[0%] text-[#A89572] transition-opacity duration-300 ${
              isActive ? "opacity-100" : "opacity-40 hover:opacity-70"
            }`}
          >
            {section.label}
          </button>
        );
      })}
    </nav>
  );

  return (
    <div
      data-header-theme="light"
      className="relative transition-opacity ease-in-out"
      style={{
        opacity: isTransitioning ? 0 : 1,
        transitionDuration: `${FADE_DURATION_MS}ms`,
      }}
    >
      <Grid as="section" className="pb-[40px]">
        <div className={`${COLS.aboutTitle} overflow-hidden pt-[25px]`}>
          <motion.h1
            initial={{ y: "-150%" }}
            animate={{ y: "0%" }}
            transition={INTRO_REVEAL_TRANSITION}
            className="headline-1 text-[#A89572]"
          >
            {data.title}
          </motion.h1>
        </div>

        <p
          className={`${COLS.aboutDescription} mt-[140px] font-[Gellix] text-[16px] font-normal not-italic leading-[135%] tracking-[0%] text-[#A89572]`}
          dangerouslySetInnerHTML={{ __html: data.description }}
        />
      </Grid>

      <Gallery gallery={data.gallery} />

      <div className="relative">
        <Grid className="pointer-events-none absolute inset-0 z-0 grid-rows-[1fr] pt-24">
          <div
            className={`${COLS.list} pointer-events-auto sticky top-24 self-start`}
          >
            {sectionNav}
          </div>
        </Grid>

        <Grid as="section" ref={teamRef} data-section="team" className="py-24">
          <div
            className={`${COLS.content} row-start-1 sticky top-24 self-start`}
          >
            <p
              className="whitespace-pre-line headline-1 text-[#A89572] mt-[-6px]"
              dangerouslySetInnerHTML={{ __html: data.team.description }}
            />
          </div>

          <ul
            className={`${COLS.teamList} row-start-1 flex flex-col mt-[-6px]`}
          >
            {data.team.positions.map((position) => (
              <motion.li
                key={position.id}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="headline-1 text-[#A89572]"
              >
                {position.title}
              </motion.li>
            ))}
          </ul>

          <div className={`${COLS.teamList} row-start-2 mt-[100px]`}>
            <p className="mb-4 font-[Gellix] text-[40px] font-normal not-italic leading-[120%] tracking-[0%] text-[#A89572]">
              {data.team.cta_title}
            </p>
            <button type="button" className="btn-gellix mt-2">
              {data.team.cta_label}
            </button>
          </div>
        </Grid>

        <Gallery gallery={data.team_gallery} />

        <div
          className="pt-[100px]"
          ref={differentiatorsRef}
          data-section="differentiators"
        >
          <AboutDifferentiatorsTrack data={data.differentiators} />
        </div>

        <Grid
          as="section"
          ref={partnersRef}
          data-section="partners"
          className="pt-[40px] pb-[135px]"
        >
          <p
            className={`${COLS.aboutPartnersDescription} headline-1 text-[#A89572]`}
            dangerouslySetInnerHTML={{ __html: data.partners.description }}
          />
          <div
            style={{ gridColumn: "1 / -1" }}
            className="relative z-10 mt-[135px] bg-[#f6f5f1]"
          >
            <PartnersMarquee partners={data.partners.partners} />
          </div>
        </Grid>
      </div>
    </div>
  );
}
