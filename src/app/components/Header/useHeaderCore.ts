"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname } from "@/navigation";
import { useIntroPlaying } from "../../context/introStore";

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

export function useHeaderCore() {
  const [isOpen, setIsOpen] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [warmed, setWarmed] = useState(false);
  const [logoTheme, setLogoTheme] = useState<HeaderTheme>(DEFAULT_THEME);
  const [menuTheme, setMenuTheme] = useState<HeaderTheme>(DEFAULT_THEME);

  const rafIds = useRef<number[]>([]);
  const tickingRef = useRef(false);
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const pathname = usePathname();
  const introPlaying = useIntroPlaying();

  const updateTheme = useCallback(() => {
    const headerEl = headerRef.current;
    if (!headerEl) return;

    const prev = headerEl.style.pointerEvents;
    headerEl.style.pointerEvents = "none";
    const nextLogo = themeAtElement(logoRef.current);
    const nextMenu = themeAtElement(menuButtonRef.current);
    headerEl.style.pointerEvents = prev;

    setLogoTheme((p) => (p === nextLogo ? p : nextLogo));
    setMenuTheme((p) => (p === nextMenu ? p : nextMenu));
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

  // Tema del logo / botón según la sección que tienen debajo
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

  useEffect(() => {
    const id = requestAnimationFrame(updateTheme);
    return () => cancelAnimationFrame(id);
  }, [pathname, updateTheme]);

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
    openMenu,
    closeMenu,
  };
}
