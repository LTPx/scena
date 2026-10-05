import { useEffect, useRef, useState } from "react";

const SCROLL_THRESHOLD_PX = 8;
const TOP_OFFSET_PX = 10;

export function useHideOnScroll(disabled = false, resetKey?: string) {
  const [hidden, setHidden] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const lastYRef = useRef(0);

  useEffect(() => {
    setHidden(false);
    lastYRef.current = window.scrollY;
  }, [resetKey]);

  useEffect(() => {
    if (disabled) {
      setHidden(false);
      return;
    }

    lastYRef.current = window.scrollY;
    let ticking = false;

    const update = () => {
      ticking = false;
      const maxY = document.documentElement.scrollHeight - window.innerHeight;
      const y = Math.min(Math.max(window.scrollY, 0), Math.max(maxY, 0));
      const diff = y - lastYRef.current;

      if (y <= TOP_OFFSET_PX) {
        setHidden(false);
        lastYRef.current = y;
        return;
      }

      if (Math.abs(diff) < SCROLL_THRESHOLD_PX) return;

      setHasScrolled(true);
      setHidden(diff > 0);
      lastYRef.current = y;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [disabled]);

  return { hidden, hasScrolled };
}
