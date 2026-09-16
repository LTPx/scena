"use client";

import { useState, useEffect, useRef } from "react";
import { Link } from "@/navigation";
import { useLocale, useTranslations } from "next-intl";

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
  { key: "projects", href: "/proyectos" },
  { key: "about", href: "/nosotros" },
  { key: "showrooms", href: "/showrooms" },
  { key: "news", href: "/noticias" },
  { key: "outlet", href: "/outlet" },
  { key: "contact", href: "/contacto" },
];

const LOCALES = [
  { code: "en", label: "En" },
  { code: "es", label: "Es" },
  { code: "de", label: "De" },
];

// Columnas reutilizadas del grid de 12
const LOGO_COLS = "col-start-1 col-span-2";
const MAIN_NAV_COLS = "col-start-3 col-span-2";
const SUB_NAV_COLS = "col-start-6 col-span-5"; // igual que CONTENT_COLS en PressDetailPage
const LOCALE_COLS = "col-start-11 col-span-1";
const CLOSE_COLS = "col-start-12 col-span-1";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const locale = useLocale();
  const t = useTranslations("Header");
  const tSub = useTranslations("HeaderSub");
  const rafIds = useRef<number[]>([]);

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
    <header className="fixed top-0 left-0 z-100 w-full bg-transparent">
      {/* Barra superior (cerrado) — mismo grid que el resto */}
      <div className="grid grid-cols-12 items-center gap-x-6 px-10 py-10">
        <Link href="/" className={`${LOGO_COLS} flex items-center`}>
          <img
            src="/logos/logo-header-white.svg"
            alt="scena"
            className="h-[20px] w-auto"
          />
        </Link>

        <button
          type="button"
          onClick={openMenu}
          aria-expanded={isOpen}
          aria-label="Abrir menu"
          className={`${CLOSE_COLS} flex items-center justify-end`}
        >
          <img
            src="/logos/logo-menu-white.svg"
            alt=""
            className="h-[20px] w-auto"
          />
        </button>
      </div>

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
          <div className="grid grid-cols-12 items-start gap-x-6 px-10 py-10">
            <Link href="/" className={`${LOGO_COLS} flex items-center`}>
              <img
                src="/logos/logo-header-white.svg"
                alt="scena"
                className="h-[20px] w-auto"
              />
            </Link>

            <nav
              className={`${MAIN_NAV_COLS} flex flex-col gap-1`}
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
              className={`${SUB_NAV_COLS} flex flex-col gap-1 pt-2 transition-opacity duration-200 ${
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
              className={`${LOCALE_COLS} flex items-center gap-2 text-[16px] text-neutral-800`}
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
              className={`${CLOSE_COLS} flex items-center justify-end`}
            >
              <img
                src="/logos/close-menu.svg"
                alt=""
                className="h-[38px] w-auto"
              />
            </button>
          </div>
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