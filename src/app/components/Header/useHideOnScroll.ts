import { useEffect, useState } from "react";

const SCROLL_THRESHOLD_PX = 8;
const TOP_OFFSET_PX = 10;

export function useHideOnScroll(disabled = false) {
  const [hidden, setHidden] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    if (disabled) {
      setHidden(false);
      return;
    }

    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      ticking = false;
      const maxY = document.documentElement.scrollHeight - window.innerHeight;

      const y = Math.min(Math.max(window.scrollY, 0), Math.max(maxY, 0));
      const diff = y - lastY;

      if (y <= TOP_OFFSET_PX) {
        setHidden(false);
        lastY = y;
        return;
      }

      if (Math.abs(diff) < SCROLL_THRESHOLD_PX) return;

      setHasScrolled(true);
      setHidden(diff > 0);
      lastY = y;
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
