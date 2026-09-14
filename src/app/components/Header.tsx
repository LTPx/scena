"use client";

import { useState, useEffect } from "react";
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

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const locale = useLocale();
  const t = useTranslations("Header");
  const tSub = useTranslations("HeaderSub");

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!isOpen) setActiveKey(null);
  }, [isOpen]);

  const activeItem = NAV_ITEMS.find((item) => item.key === activeKey);

  return (
    <header className="sticky top-0 left-0 z-50 w-full bg-transparent">
      <div className="flex items-center justify-between p-[40px]">
        <Link href="/" className="flex items-center">
          <img
            src="/logos/logo-header-white.svg"
            alt="scena"
            className="h-[20px] w-auto"
          />
        </Link>

        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-expanded={isOpen}
          aria-label="Abrir menu"
          className="flex items-center justify-center"
        >
          <img
            src="/logos/logo-menu-white.svg"
            alt=""
            className="h-[20px] w-auto"
          />
        </button>
      </div>

      {/* Overlay del menu */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!isOpen}
      >
        {/* Panel fijo de 400px, fiel a Figma */}
        <div className="relative h-[400px] w-full bg-[#BCB6A8]">
          <div className="flex items-start justify-between p-[40px]">
            <div className="flex items-start gap-[170px]">
              <Link href="/" className="flex items-center">
                <img
                  src="/logos/logo-header-white.svg"
                  alt="scena"
                  className="h-[20px] w-auto"
                />
              </Link>
              {/* fila de nav + submenu, el onMouseLeave va aca para que no se cierre al pasar entre columnas */}
              <div className="flex" onMouseLeave={() => setActiveKey(null)}>
                <nav className="flex flex-col gap-1">
                  {NAV_ITEMS.map((item) => {
                    const hasSub = !!item.subItems?.length;
                    const isDimmed =
                      activeKey !== null && activeKey !== item.key;
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
                        onClick={() => setIsOpen(false)}
                        onMouseEnter={() => setActiveKey(null)}
                        className={classes}
                      >
                        {t(item.key)}
                      </Link>
                    );
                  })}
                </nav>

                <nav
                  className={`ml-16 flex flex-col gap-1 pt-2 transition-opacity duration-200 ${
                    activeItem ? "opacity-100" : "pointer-events-none opacity-0"
                  }`}
                >
                  {activeItem?.subItems?.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      onClick={() => setIsOpen(false)}
                      className="w-fit font-normal not-italic text-[40px] leading-[100%] tracking-[0%] text-[#F6F5F1] transition-colors hover:text-[#F6F5F166]"
                    >
                      {tSub(`${activeItem.key}.${sub.key}`)}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
            <div className="flex items-center gap-[95px]">
              <nav className="flex items-center gap-2 text-[16px] text-neutral-800">
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
                onClick={() => setIsOpen(false)}
                aria-label="Cerrar menu"
                className="flex items-center justify-center"
              >
                <img
                  src="/logos/close-menu.svg"
                  alt=""
                  className="h-[38px] w-auto"
                />
              </button>
            </div>
          </div>
        </div>

        {/* zona de abajo: deja ver lo que hay detras, pero borroso */}
        <div
          className="absolute inset-x-0 top-[400px] bottom-0"
          style={{
            backdropFilter: "blur(200px)",
            WebkitBackdropFilter: "blur(200px)",
          }}
        />
      </div>
    </header>
  );
}
