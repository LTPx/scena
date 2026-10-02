"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Link, usePathname } from "@/navigation";
import { useLocale, useTranslations } from "next-intl";
import Grid, { COLS } from "../layout/Grid";
import { INTRO_REVEAL_TRANSITION } from "../../context/introStore";
import { motion } from "framer-motion";
import { NAV_ITEMS, LOCALES, getServiceHref } from "./navItems";
import { useHeaderCore } from "./useHeaderCore";

const SUBMENU_CLOSE_DELAY_MS = 200;

export default function HeaderDesktop() {
  const {
    isOpen,
    animate,
    warmed,
    introPlaying,
    headerRef,
    logoRef,
    menuButtonRef,
    logoVariant,
    menuVariant,
    logoHidden,
    openMenu,
    closeMenu,
  } = useHeaderCore();

  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("Header");
  const tSub = useTranslations("HeaderSub");

  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [hoveredSubKey, setHoveredSubKey] = useState<string | null>(null);
  const closeSubmenuTimeoutRef = useRef<number | null>(null);

  const cancelSubmenuClose = useCallback(() => {
    if (closeSubmenuTimeoutRef.current !== null) {
      window.clearTimeout(closeSubmenuTimeoutRef.current);
      closeSubmenuTimeoutRef.current = null;
    }
  }, []);

  const scheduleSubmenuClose = useCallback(() => {
    cancelSubmenuClose();
    closeSubmenuTimeoutRef.current = window.setTimeout(() => {
      setActiveKey(null);
      closeSubmenuTimeoutRef.current = null;
    }, SUBMENU_CLOSE_DELAY_MS);
  }, [cancelSubmenuClose]);

  useEffect(() => {
    return () => {
      cancelSubmenuClose();
    };
  }, [cancelSubmenuClose]);

  useEffect(() => {
    if (!isOpen) {
      setActiveKey(null);
      cancelSubmenuClose();
    }
  }, [isOpen, cancelSubmenuClose]);

  // Al cambiar de submenú (o cerrarlo) se reinicia el hover de los subítems.
  useEffect(() => {
    setHoveredSubKey(null);
  }, [activeKey]);

  const activeItem = NAV_ITEMS.find((item) => item.key === activeKey);

  return (
    <header
      ref={headerRef}
      className="pointer-events-none fixed top-0 left-0 z-100 w-full bg-transparent font-sans"
    >
      <motion.div
        initial={false}
        animate={{ y: introPlaying ? "-100%" : "0%" }}
        transition={introPlaying ? { duration: 0 } : INTRO_REVEAL_TRANSITION}
      >
        <Grid as="div" className="items-center py-[44px]">
          <Link
            ref={logoRef}
            href="/"
            className={`${COLS.logo} flex items-center transition-opacity duration-300 ${
              logoHidden
                ? "pointer-events-none opacity-0"
                : "pointer-events-auto opacity-100"
            }`}
          >
            <img
              src={`/logos/logo-header-${logoVariant}.svg`}
              alt="scena"
              className="h-[20.5px] w-auto"
            />
          </Link>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={openMenu}
            aria-expanded={isOpen}
            aria-label="Abrir menu"
            className={`${COLS.close} pointer-events-auto flex items-center justify-end`}
          >
            <img
              src={`/logos/logo-menu-${menuVariant}.svg`}
              alt=""
              className="cursor-pointer h-[20px] w-auto"
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
        <motion.div
          initial={false}
          animate={{ y: animate ? "0%" : "-100%" }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="relative z-10 h-[400px] w-full bg-[#BCB6A8]"
        >
          <Grid className="items-start">
            <Link
              href="/"
              onClick={closeMenu}
              className={`${COLS.logo} mt-[44px] flex items-center`}
            >
              <img
                src="/logos/logo-header-white.svg"
                alt="scena"
                className="h-[20.5px] w-auto"
              />
            </Link>

            <nav
              className={`${COLS.navMain} mt-[25px] flex flex-col`}
              onMouseLeave={scheduleSubmenuClose}
            >
              {NAV_ITEMS.map((item) => {
                const hasSub = !!item.subItems?.length;
                const isDimmed = activeKey !== null && activeKey !== item.key;
                const classes = `w-fit headline-1 transition-opacity duration-200 ${
                  isDimmed ? "opacity-30" : "opacity-100 hover:opacity-70"
                } text-[#F6F5F1]`;

                if (hasSub) {
                  return (
                    <span
                      key={item.href}
                      onMouseEnter={() => {
                        cancelSubmenuClose();
                        setActiveKey(item.key);
                      }}
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
                    onMouseEnter={() => {
                      cancelSubmenuClose();
                      setActiveKey(null);
                    }}
                    className={classes}
                  >
                    {t(item.key)}
                  </Link>
                );
              })}
            </nav>

            <nav
              className={`${COLS.navSub} mt-[25px] flex flex-col transition-opacity duration-200 ${
                activeItem ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
              onMouseEnter={cancelSubmenuClose}
              onMouseLeave={() => {
                setHoveredSubKey(null);
                scheduleSubmenuClose();
              }}
            >
              {activeItem?.subItems?.map((sub) => {
                // Todos al 100% por defecto; al hacer hover, el ítem señalado
                // se queda al 100% y el resto baja de opacidad.
                const isDimmed =
                  hoveredSubKey !== null && hoveredSubKey !== sub.key;

                return (
                  <Link
                    key={sub.key}
                    href={
                      activeItem.key === "services"
                        ? getServiceHref(sub.key, locale)
                        : activeItem.href
                    }
                    onClick={closeMenu}
                    onMouseEnter={() => setHoveredSubKey(sub.key)}
                    className={`w-fit headline-1 text-[#F6F5F1] transition-opacity duration-200 ${
                      isDimmed ? "opacity-30" : "opacity-100"
                    }`}
                  >
                    {tSub(`${activeItem.key}.${sub.key}`)}
                  </Link>
                );
              })}
            </nav>

            <nav
              className={`${COLS.locale} mt-[40px] flex items-center gap-2 text-[16px] text-neutral-800`}
            >
              {LOCALES.map((l, i) => (
                <span key={l.code} className="flex items-center gap-2">
                  <Link
                    href={pathname}
                    locale={l.code}
                    onClick={closeMenu}
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
              className={`${COLS.close} cursor-pointer mt-[35px] flex items-center justify-end`}
            >
              <img
                src="/logos/close-menu.svg"
                alt=""
                className="h-[38px] w-auto"
              />
            </button>
          </Grid>
        </motion.div>
        <div
          className="absolute inset-0 transition-[backdrop-filter] duration-300 ease-out"
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
