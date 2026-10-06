"use client";

import { useEffect, type RefObject } from "react";

interface Options {
  speed?: number;
  center?: boolean;
}

export function useStickyHorizontal(
  wrapperRef: RefObject<HTMLElement | null>,
  stickyRef: RefObject<HTMLElement | null>,
  trackRef: RefObject<HTMLElement | null>,
  contentHeight: number | null,
  deps: ReadonlyArray<unknown> = [],
  { speed = 0.9, center = false }: Options = {},
) {
  useEffect(() => {
    const wrapper = wrapperRef.current;
    const sticky = stickyRef.current;
    const track = trackRef.current;
    if (!wrapper || !sticky || !track) return;

    let raf = 0;
    let travel = 0;
    let scrollDistance = 0;

    const update = () => {
      raf = 0;
      const stickyTop = parseFloat(getComputedStyle(sticky).top) || 0;
      const rect = wrapper.getBoundingClientRect();
      const p =
        scrollDistance > 0 ? (stickyTop - rect.top) / scrollDistance : 0;
      const progress = Math.min(1, Math.max(0, p));
      track.style.transform = `translate3d(${-progress * travel}px,0,0)`;
    };

    const measure = () => {
      const height = contentHeight ?? sticky.offsetHeight;

      if (center) {
        sticky.style.top = `${Math.max(
          0,
          (window.innerHeight - sticky.offsetHeight) / 2,
        )}px`;
      }

      travel = Math.max(0, track.scrollWidth - sticky.clientWidth);
      scrollDistance = travel / speed;
      wrapper.style.height = `${height + scrollDistance}px`;
      update();
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
