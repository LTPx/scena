export type SubItem = { key: string };
export type NavItem = { key: string; href: string; subItems?: SubItem[] };

export const NAV_ITEMS: NavItem[] = [
  {
    key: "services",
    href: "/services",
    subItems: [
      { key: "engineering" },
      { key: "audioVideo" },
      { key: "lightingDesign" },
      { key: "homeAutomation" },
      { key: "mep" },
    ],
  },
  { key: "projects", href: "/projects" },
  { key: "about", href: "/about-us" },
  { key: "showrooms", href: "/showrooms" },
  { key: "news", href: "/press" },
  { key: "outlet", href: "/outlet" },
  { key: "contact", href: "/contact" },
];

export const LOCALES = [
  { code: "en", label: "En" },
  { code: "es", label: "Es" },
  { code: "de", label: "De" },
];

type Locale = "es" | "en" | "de";

// key del submenú -> slug del servicio en cada idioma (el que devuelve WP)
const SERVICE_SLUGS: Record<Locale, Record<string, string>> = {
  es: {
    engineering: "ingenieria",
    audioVideo: "audio-video",
    lightingDesign: "diseno-iluminacion",
    homeAutomation: "domotica",
    mep: "mep",
  },
  en: {
    engineering: "engineering",
    audioVideo: "audio-video",
    lightingDesign: "lighting-design",
    homeAutomation: "home-automation",
    mep: "mep",
  },
  de: {
    engineering: "ingenieurwesen",
    audioVideo: "audio-video",
    lightingDesign: "lichtdesign",
    homeAutomation: "hausautomation",
    mep: "mep",
  },
};

export function getServiceHref(key: string, locale: string) {
  const slug = SERVICE_SLUGS[locale as Locale]?.[key];
  return slug ? `/services/${slug}` : "/services";
}
