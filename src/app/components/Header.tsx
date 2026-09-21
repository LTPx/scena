"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Link, usePathname } from "@/navigation";
import { useLocale, useTranslations } from "next-intl";
import Grid, { COLS } from "./layout/Grid";
import {
  INTRO_REVEAL_TRANSITION,
  useIntroPlaying,
} from "../context/introStore";
import { motion } from "framer-motion";

type SubItem = { key: string; href: string };
type NavItem = { key: string; href: string; subItems?: SubItem[] };

const NAV_ITEMS: NavItem[] = [
  {
    key: "services",
    href: "/servicios",
    subItems: [
      { key: "engineering", href: "/servicios/engineering" },
      { key: "audioVideo", href: "/servicios/audio-video" },
      { key: "lightingDesign", href: "/servicios/lighting-design" },
      { key: "homeAutomation", href: "/servicios/home-automation" },
      { key: "mep", href: "/servicios/mep" },
    ],
  },
  { key: "projects", href: "/projects" },
  { key: "about", href: "/about-us" },
  { key: "showrooms", href: "/showrooms" },
  { key: "news", href: "/press" },
  { key: "outlet", href: "/outlet" },
  { key: "contact", href: "/contact" },
];

const LOCALES = [
  { code: "en", label: "En" },
  { code: "es", label: "Es" },
  { code: "de", label: "De" },
];

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

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const locale = useLocale();
  const t = useTranslations("Header");
  const tSub = useTranslations("HeaderSub");
  const rafIds = useRef<number[]>([]);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const [logoTheme, setLogoTheme] = useState<HeaderTheme>(DEFAULT_THEME);
  const [menuTheme, setMenuTheme] = useState<HeaderTheme>(DEFAULT_THEME);
  const tickingRef = useRef(false);
  const logoVariant = logoTheme === "light" ? "brown" : "white";
  const menuVariant = menuTheme === "light" ? "brown" : "white";
  const introPlaying = useIntroPlaying();
  const updateTheme = useCallback(() => {
    const headerEl = headerRef.current;
    if (!headerEl) return;

    const prevPointerEvents = headerEl.style.pointerEvents;
    headerEl.style.pointerEvents = "none";

    const nextLogoTheme = themeAtElement(logoRef.current);
    const nextMenuTheme = themeAtElement(menuButtonRef.current);

    headerEl.style.pointerEvents = prevPointerEvents;

    setLogoTheme((prev) => (prev === nextLogoTheme ? prev : nextLogoTheme));
    setMenuTheme((prev) => (prev === nextMenuTheme ? prev : nextMenuTheme));
  }, []);

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

  const [warmed, setWarmed] = useState(false);
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
  }, []);

  useEffect(() => {
    if (!isOpen) setActiveKey(null);
  }, [isOpen]);

  useEffect(() => {
    return () => {
      rafIds.current.forEach((id) => cancelAnimationFrame(id));
    };
  }, []);

  function openMenu() {
    setIsOpen(true);

    const id1 = requestAnimationFrame(() => {
      const id2 = requestAnimationFrame(() => setAnimate(true));
      rafIds.current.push(id2);
    });
    rafIds.current.push(id1);
  }

  function closeMenu() {
    setAnimate(false);
    setIsOpen(false);
  }

  const activeItem = NAV_ITEMS.find((item) => item.key === activeKey);

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 z-100 w-full bg-transparent"
    >
      <motion.div
        initial={false}
        animate={{ y: introPlaying ? "-100%" : "0%" }}
        transition={introPlaying ? { duration: 0 } : INTRO_REVEAL_TRANSITION}
      >
        <Grid as="div" className="items-center py-10">
          <Link
            ref={logoRef}
            href="/"
            className={`${COLS.logo} flex items-center`}
          >
            <img
              src={`/logos/logo-header-${logoVariant}.svg`}
              alt="scena"
              className="h-[20px] w-auto"
            />
          </Link>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={openMenu}
            aria-expanded={isOpen}
            aria-label="Abrir menu"
            className={`${COLS.close} flex items-center justify-end`}
          >
            <img
              src={`/logos/logo-menu-${menuVariant}.svg`}
              alt=""
              className="h-[20px] w-auto"
            />
          </button>
        </Grid>
      </motion.div>

      <div
        className={`fixed inset-0 z-50 ${
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!isOpen}
      >
        <div
          className="relative h-[400px] w-full bg-[#BCB6A8] transition-opacity duration-300 ease-out"
          style={{ opacity: animate ? 1 : 0 }}
        >
          <Grid className="items-start py-10">
            <Link href="/" className={`${COLS.logo} flex items-center`}>
              <img
                src="/logos/logo-header-white.svg"
                alt="scena"
                className="h-[20px] w-auto"
              />
            </Link>

            <nav
              className={`${COLS.navMain} flex flex-col gap-1`}
              onMouseLeave={() => setActiveKey(null)}
            >
              {NAV_ITEMS.map((item) => {
                const hasSub = !!item.subItems?.length;
                const isDimmed = activeKey !== null && activeKey !== item.key;
                const classes = `w-fit text-[40px] leading-[40px] transition-opacity duration-200 ${
                  isDimmed ? "opacity-30" : "opacity-100 hover:opacity-70"
                } text-[#F6F5F1]`;

                if (hasSub) {
                  return (
                    <span
                      key={item.href}
                      onMouseEnter={() => setActiveKey(item.key)}
                      className={`${classes} cursor-default`}
                    >
                      {t(item.key)}
                    </span>
                  );
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMenu}
                    onMouseEnter={() => setActiveKey(null)}
                    className={classes}
                  >
                    {t(item.key)}
                  </Link>
                );
              })}
            </nav>

            <nav
              className={`${COLS.navSub} flex flex-col gap-1 pt-2 transition-opacity duration-200 ${
                activeItem ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
              onMouseLeave={() => setActiveKey(null)}
            >
              {activeItem?.subItems?.map((sub) => (
                <Link
                  key={sub.href}
                  href={sub.href}
                  onClick={closeMenu}
                  className="w-fit font-normal not-italic text-[40px] leading-[100%] tracking-[0%] text-[#F6F5F1] transition-colors hover:text-[#F6F5F166]"
                >
                  {tSub(`${activeItem.key}.${sub.key}`)}
                </Link>
              ))}
            </nav>

            <nav
              className={`${COLS.locale} flex items-center gap-2 text-[16px] text-neutral-800`}
            >
              {LOCALES.map((l, i) => (
                <span key={l.code} className="flex items-center gap-2">
                  <Link
                    href="/"
                    locale={l.code}
                    className={`font-normal not-italic text-[16px] leading-[135%] tracking-[0%] text-[#F6F5F1] transition-colors hover:text-[#F6F5F166] ${
                      locale === l.code ? "" : "opacity-70"
                    }`}
                  >
                    {l.label}
                  </Link>

                  {i < LOCALES.length - 1 && (
                    <span className="text-[#F6F5F1]">|</span>
                  )}
                </span>
              ))}
            </nav>

            <button
              type="button"
              onClick={closeMenu}
              aria-label="Cerrar menu"
              className={`${COLS.close} flex items-center justify-end`}
            >
              <img
                src="/logos/close-menu.svg"
                alt=""
                className="h-[38px] w-auto"
              />
            </button>
          </Grid>
        </div>
        <div
          className="absolute inset-x-0 top-[400px] bottom-0 transition-[backdrop-filter] duration-300 ease-out"
          style={{
            backdropFilter: animate
              ? "blur(100px)"
              : warmed
                ? "blur(0.01px)"
                : "blur(0px)",
            WebkitBackdropFilter: animate
              ? "blur(100px)"
              : warmed
                ? "blur(0.01px)"
                : "blur(0px)",
            willChange: "backdrop-filter",
            opacity: isOpen || animate ? 1 : 0,
            transitionProperty:
              "backdrop-filter, -webkit-backdrop-filter, opacity",
          }}
        />
      </div>
    </header>
  );
}
