"use client";

import { useEffect, type RefObject } from "react";

const LOCK_THRESHOLD_PX = 6;

interface Options {
  loopWidth?: () => number;
}

export function useVerticalToHorizontalScroll(
  ref: RefObject<HTMLElement | null>,
  deps: ReadonlyArray<unknown> = [],
  options: Options = {},
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    type Axis = "x" | "y" | "page" | null;

    let axis: Axis = null;
    let startX = 0;
    let startY = 0;
    let lastY = 0;
    let lastT = 0;
    let velocity = 0;
    let travelled = 0;
    let raf = 0;

    const { loopWidth } = options;
    const maxScroll = () => el.scrollWidth - el.clientWidth;

    const onTouchStart = (e: TouchEvent) => {
      cancelAnimationFrame(raf);
      const t = e.touches[0];
      axis = null;
      startX = t.clientX;
      startY = t.clientY;
      lastY = t.clientY;
      lastT = e.timeStamp;
      velocity = 0;
    };

    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];

      if (axis === null) {
        const dx = t.clientX - startX;
        const dy = t.clientY - startY;
        if (Math.max(Math.abs(dx), Math.abs(dy)) < LOCK_THRESHOLD_PX) return;

        if (Math.abs(dx) >= Math.abs(dy)) {
          axis = "x";
        } else if (loopWidth) {
          const budget = loopWidth() || Infinity;
          if (travelled >= budget) {
            travelled = 0;
            axis = "page";
          } else {
            axis = "y";
          }
        } else {
          const goingForward = dy < 0;
          const canMove = goingForward
            ? el.scrollLeft < maxScroll() - 1
            : el.scrollLeft > 1;
          axis = canMove ? "y" : "page";
        }
      }

      if (axis !== "y") return;

      if (e.cancelable) e.preventDefault();

      const delta = lastY - t.clientY;
      el.scrollLeft += delta;
      travelled += Math.abs(delta);

      const dt = e.timeStamp - lastT || 1;
      velocity = delta / dt;
      lastY = t.clientY;
      lastT = e.timeStamp;
    };

    const onTouchEnd = () => {
      if (axis !== "y") return;

      const step = () => {
        velocity *= 0.95;
        if (Math.abs(velocity) < 0.02) return;

        const move = velocity * 16;
        el.scrollLeft += move;
        travelled += Math.abs(move);

        if (
          !loopWidth &&
          (el.scrollLeft <= 0 || el.scrollLeft >= maxScroll())
        ) {
          return;
        }
        raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    el.addEventListener("touchcancel", onTouchEnd, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("touchcancel", onTouchEnd);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
