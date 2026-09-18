"use client";

import { useEffect, useRef, useState } from "react";
import { AboutPageWp } from "../_interfaces/wordpress-components";
import Grid, { COLS } from "./layout/Grid";
import Gallery from "./Gallery";
import PartnersMarquee from "./PartnersMarquee";
import AboutDifferentiatorsTrack from "./AboutDifferentiatorsTrack";
import { useLenis } from "./SmoothScrollProvider";

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

export default function AboutPage({ data }: Props) {
  const [activeSection, setActiveSection] = useState<SectionKey>("team");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const lenis = useLenis();

  const teamRef = useRef<HTMLElement>(null);
  const differentiatorsRef = useRef<HTMLDivElement>(null);
  const partnersRef = useRef<HTMLElement>(null);

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
    <nav className={`${COLS.list} flex flex-col gap-2`}>
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
      <Grid as="section" className="py-[40px]">
        <h1
          className={`${COLS.aboutTitle} whitespace-pre-line font-[Gellix] text-[40px] font-normal not-italic leading-[100%] tracking-[0%] text-[#A89572]`}
        >
          {data.title}
        </h1>
        <p
          className={`${COLS.aboutDescription} mt-[140px] font-[Gellix] text-[16px] font-normal not-italic leading-[135%] tracking-[0%] text-[#A89572]`}
        >
          {data.description}
        </p>
      </Grid>

      <Gallery gallery={data.gallery} />

      <Grid as="section" ref={teamRef} data-section="team" className="py-24">
        {sectionNav}

        <div className={`${COLS.content} relative h-full`}>
          <p className="whitespace-pre-line font-[Gellix] text-[40px] font-normal not-italic leading-[100%] tracking-[0%] text-[#A89572]">
            {data.team.description}
          </p>

          <div className="absolute bottom-0 left-0 w-full">
            <p className="mb-4 font-[Gellix] text-[42px] font-normal not-italic leading-[100%] tracking-[0%] text-[#A89572]">
              {data.team.cta_title}
            </p>
            <button type="button" className="btn-gellix">
              {data.team.cta_label}
            </button>
          </div>
        </div>

        <ul className={`${COLS.teamList} flex flex-col gap-2`}>
          {data.team.positions.map((position) => (
            <li
              key={position.id}
              className="font-[Gellix] text-[40px] font-normal not-italic leading-[100%] tracking-[0%] text-[#A89572]"
            >
              {position.title}
            </li>
          ))}
        </ul>
      </Grid>

      <Gallery gallery={data.team_gallery} />

      <div ref={differentiatorsRef} data-section="differentiators">
        <AboutDifferentiatorsTrack
          data={data.differentiators}
          nav={sectionNav}
        />
      </div>

      <Grid
        as="section"
        ref={partnersRef}
        data-section="partners"
        className="py-24"
      >
        {sectionNav}
        <p
          className={`${COLS.aboutPartnersDescription} font-[Gellix] text-[40px] font-normal not-italic leading-[100%] tracking-[0%] text-[#A89572]`}
        >
          {data.partners.description}
        </p>
        <div style={{ gridColumn: "1 / -1" }} className="mt-12">
          <PartnersMarquee partners={data.partners.partners} />
        </div>
      </Grid>
    </div>
  );
}
