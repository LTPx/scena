"use client";

import { Link, usePathname } from "@/navigation";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { INTRO_REVEAL_TRANSITION } from "../../context/introStore";
import { NAV_ITEMS, LOCALES, getServiceHref } from "./navItems";
import { useHeaderCore } from "./useHeaderCore";

const PANEL_HEIGHT = 705;

export default function HeaderMobile() {
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
    openMenu,
    closeMenu,
  } = useHeaderCore();

  const locale = useLocale();
  const t = useTranslations("Header");
  const tSub = useTranslations("HeaderSub");
  const tFooter = useTranslations("Footer");

  const blur = animate ? "blur(100px)" : warmed ? "blur(0.01px)" : "blur(0px)";
  const pathname = usePathname();
  const hideClosedLogo =
    pathname === "/contact" || pathname.startsWith("/contact/");

  return (
    <header
      ref={headerRef}
      className="fixed left-0 top-0 z-100 w-full bg-transparent font-sans"
    >
      <motion.div
        initial={false}
        animate={{ y: introPlaying ? "-100%" : "0%" }}
        transition={introPlaying ? { duration: 0 } : INTRO_REVEAL_TRANSITION}
        className="flex items-center justify-between px-[15px] py-6"
      >
        <Link
          ref={logoRef}
          href="/"
          className={`flex items-center ${hideClosedLogo ? "invisible" : ""}`}
        >
          <img
            src={`/logos/logo-header-${logoVariant}.svg`}
            alt="scena"
            className="h-[18px] w-auto"
          />
        </Link>

        <button
          ref={menuButtonRef}
          type="button"
          onClick={openMenu}
          aria-expanded={isOpen}
          aria-label="Abrir menu"
          className="flex items-center"
        >
          <img
            src={`/logos/logo-menu-${menuVariant}.svg`}
            alt=""
            className="h-[18px] w-auto"
          />
        </button>
      </motion.div>

      <div
        className={`fixed inset-0 z-50 ${
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!isOpen}
      >
        <div
          className="relative w-full overflow-y-auto bg-[#BCB6A8] px-[15px] pb-8 transition-opacity duration-300 ease-out"
          style={{
            height: PANEL_HEIGHT,
            maxHeight: "100dvh",
            opacity: animate ? 1 : 0,
          }}
        >
          <div className="flex items-start justify-between">
            <Link
              href="/"
              onClick={closeMenu}
              className="mt-[24px] flex items-center"
            >
              <img
                src="/logos/logo-header-white.svg"
                alt="scena"
                className="h-[18px] w-auto"
              />
            </Link>

            <div className="flex items-start gap-5">
              <nav className="mt-[20px] flex items-center gap-2 font-[Gellix] text-[16px] font-normal not-italic leading-[135%] tracking-[0%]">
                {LOCALES.map((l, i) => (
                  <span key={l.code} className="flex items-center gap-2">
                    <Link
                      href={pathname}
                      locale={l.code}
                      onClick={closeMenu}
                      className={`text-[#F6F5F1] ${
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
                className="mt-[15px] flex items-center"
              >
                <img
                  src="/logos/close-menu.svg"
                  alt=""
                  className="h-[38px] w-auto"
                />
              </button>
            </div>
          </div>

          <nav className="mt-[50px] flex flex-col">
            {NAV_ITEMS.map((item) => {
              if (item.subItems?.length) {
                return (
                  <div key={item.href}>
                    <span className="block font-[Gellix] text-[40px] font-normal not-italic leading-[100%] tracking-[0%] text-[#F6F5F1]">
                      {t(item.key)}
                    </span>

                    <div className="flex flex-col pt-2 pb-1 pl-14">
                      {item.subItems.map((sub) => (
                        <Link
                          key={sub.key}
                          href={
                            item.key === "services"
                              ? getServiceHref(sub.key, locale)
                              : item.href
                          }
                          onClick={closeMenu}
                          className="w-fit font-sans text-[30px] font-normal not-italic leading-[120%] tracking-[0%] text-[#F6F5F1]"
                        >
                          {tSub(`${item.key}.${sub.key}`)}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className="w-fit font-sans text-[40px] font-normal not-italic leading-[120%] tracking-[0%] text-[#F6F5F1]"
                >
                  {t(item.key)}
                </Link>
              );
            })}
          </nav>

          <div className="mt-10 text-[#F6F5F1]">
            <p className="font-[Gellix] text-[14px] font-normal not-italic leading-[100%] tracking-[0%]">
              {tFooter("followUs")}
            </p>
            <p className="font-[Gellix] text-[20px] font-normal not-italic leading-[100%] tracking-[0%] underline">
              <a href="#">Instagram</a> | <a href="#">Linkedin</a>
            </p>
          </div>
        </div>

        <div
          className="absolute inset-x-0 bottom-0 transition-[backdrop-filter] duration-300 ease-out"
          style={{
            top: PANEL_HEIGHT,
            backdropFilter: blur,
            WebkitBackdropFilter: blur,
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
