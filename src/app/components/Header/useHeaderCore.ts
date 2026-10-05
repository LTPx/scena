"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname } from "@/navigation";
import { useIntroPlaying, setIntroPlaying } from "../../context/introStore";

type HeaderTheme = "dark" | "light";
const DEFAULT_THEME: HeaderTheme = "dark";

function themeAtPoint(x: number, y: number): HeaderTheme {
  if (typeof document === "undefined") return DEFAULT_THEME;
  const el = document.elementFromPoint(x, y);
  const themedEl = el?.closest<HTMLElement>("[data-header-theme]");
  return themedEl?.dataset.headerTheme === "light" ? "light" : DEFAULT_THEME;
}

function themeAtElement(el: HTMLElement | null): HeaderTheme {
  if (!el) return DEFAULT_THEME;
  const rect = el.getBoundingClientRect();
  return themeAtPoint(rect.left + rect.width / 2, rect.top + rect.height / 2);
}

function isOverFooter(el: HTMLElement | null): boolean {
  if (!el || typeof document === "undefined") return false;
  const rect = el.getBoundingClientRect();
  const hit = document.elementFromPoint(
    rect.left + rect.width / 2,
    rect.top + rect.height / 2,
  );
  return !!hit?.closest("footer");
}

export function useHeaderCore() {
  const [isOpen, setIsOpen] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [warmed, setWarmed] = useState(false);
  const [logoTheme, setLogoTheme] = useState<HeaderTheme>(DEFAULT_THEME);
  const [menuTheme, setMenuTheme] = useState<HeaderTheme>(DEFAULT_THEME);
  const [logoHidden, setLogoHidden] = useState(false);

  const rafIds = useRef<number[]>([]);
  const tickingRef = useRef(false);
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const pathname = usePathname();
  const introPlaying = useIntroPlaying();

  useEffect(() => {
    const isHome = pathname === "/";
    if (!isHome && introPlaying) {
      setIntroPlaying(false);
    }
  }, [pathname, introPlaying]);

  const updateTheme = useCallback(() => {
    const headerEl = headerRef.current;
    if (!headerEl) return;

    const prevHeader = headerEl.style.pointerEvents;
    const prevLogo = logoRef.current?.style.pointerEvents ?? "";
    const prevMenu = menuButtonRef.current?.style.pointerEvents ?? "";

    headerEl.style.pointerEvents = "none";
    if (logoRef.current) logoRef.current.style.pointerEvents = "none";
    if (menuButtonRef.current)
      menuButtonRef.current.style.pointerEvents = "none";

    const nextLogo = themeAtElement(logoRef.current);
    const nextMenu = themeAtElement(menuButtonRef.current);
    const nextHidden = isOverFooter(logoRef.current);

    headerEl.style.pointerEvents = prevHeader;
    if (logoRef.current) logoRef.current.style.pointerEvents = prevLogo;
    if (menuButtonRef.current)
      menuButtonRef.current.style.pointerEvents = prevMenu;

    setLogoTheme((p) => (p === nextLogo ? p : nextLogo));
    setMenuTheme((p) => (p === nextMenu ? p : nextMenu));
    setLogoHidden((p) => (p === nextHidden ? p : nextHidden));
  }, []);

  const openMenu = useCallback(() => {
    setIsOpen(true);
    const id1 = requestAnimationFrame(() => {
      const id2 = requestAnimationFrame(() => setAnimate(true));
      rafIds.current.push(id2);
    });
    rafIds.current.push(id1);
  }, []);

  const closeMenu = useCallback(() => {
    setAnimate(false);
    setIsOpen(false);
  }, []);

  // Medición en scroll / resize
  useEffect(() => {
    if (isOpen) return;
    updateTheme();

    function onScroll() {
      if (tickingRef.current) return;
      tickingRef.current = true;
      requestAnimationFrame(() => {
        updateTheme();
        tickingRef.current = false;
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isOpen, updateTheme]);

  // Medición al cambiar de ruta: re-mide mientras la nueva página monta
  useEffect(() => {
    if (isOpen) return;

    let raf = 0;
    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(updateTheme);
    };

    schedule();

    const observer = new MutationObserver(schedule);
    observer.observe(document.body, { childList: true, subtree: true });
    const stop = window.setTimeout(() => observer.disconnect(), 3000);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.clearTimeout(stop);
    };
  }, [pathname, isOpen, updateTheme]);

  useEffect(() => {
    const id = requestAnimationFrame(() => setWarmed(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") closeMenu();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closeMenu]);

  useEffect(() => {
    const ids = rafIds.current;
    return () => ids.forEach((id) => cancelAnimationFrame(id));
  }, []);

  return {
    isOpen,
    animate,
    warmed,
    introPlaying,
    headerRef,
    logoRef,
    menuButtonRef,
    logoVariant:
      logoTheme === "light" ? ("brown" as const) : ("white" as const),
    menuVariant:
      menuTheme === "light" ? ("brown" as const) : ("white" as const),
    logoHidden,
    openMenu,
    closeMenu,
  };
}
