"use client";

import { useEffect, useState } from "react";
import { Link } from "@/navigation"; // ajusta el import si tu navigation.ts exporta distinto
import { useLocale, useTranslations } from "next-intl";

// las rutas quedan fijas (no se traducen), solo el label visible cambia por idioma
const NAV_ITEMS = [
  { key: "services", href: "/servicios" },
  { key: "projects", href: "/proyectos" },
  { key: "about", href: "/nosotros" },
  { key: "showrooms", href: "/showrooms" },
  { key: "news", href: "/noticias" },
  { key: "outlet", href: "/outlet" },
  { key: "contact", href: "/contacto" },
] as const;

const LOCALES = [
  { code: "en", label: "En" },
  { code: "es", label: "Es" },
  { code: "de", label: "De" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const locale = useLocale();
  const t = useTranslations("Header");

  // bloquea el scroll del body mientras el menu esta abierto
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // cierra con Escape
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header className="absolute top-0 left-0 z-50 w-full bg-transparent">
      <div className="flex items-center justify-between px-6 py-6 md:px-10">
        <Link href="/" className="text-lg font-medium text-white">
          scena
        </Link>

        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-expanded={isOpen}
          aria-label="Abrir menu"
          className="flex flex-col gap-[5px] p-2"
        >
          <span className="block h-px w-6 bg-white" />
          <span className="block h-px w-6 bg-white" />
        </button>
      </div>

      {/* Overlay del menu */}
      <div
        className={`fixed inset-0 z-50 bg-[#BCB6A8] transition-opacity duration-300 ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!isOpen}
      >
        <div className="flex items-start justify-between px-6 py-6 md:px-10">
          <span className="text-lg font-medium text-neutral-900">scena</span>

          <div className="flex items-center gap-8">
            <nav className="flex items-center gap-2 text-[16px] text-neutral-800">
              {LOCALES.map((l, i) => (
                <span key={l.code} className="flex items-center gap-2">
                  <Link
                    href="/"
                    locale={l.code}
                    className={`transition-opacity hover:opacity-70 ${
                      locale === l.code ? "font-medium" : "opacity-70"
                    }`}
                  >
                    {l.label}
                  </Link>
                  {i < LOCALES.length - 1 && (
                    <span className="opacity-40">|</span>
                  )}
                </span>
              ))}
            </nav>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Cerrar menu"
              className="relative h-6 w-6"
            >
              <span className="absolute top-1/2 left-1/2 h-px w-6 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-neutral-900" />
              <span className="absolute top-1/2 left-1/2 h-px w-6 -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-neutral-900" />
            </button>
          </div>
        </div>

        <nav className="flex flex-col gap-1 px-6 pt-4 md:px-10">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="w-fit text-[40px] leading-tight text-neutral-900 transition-opacity hover:opacity-70"
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
