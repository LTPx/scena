export type SubItem = { key: string; href: string };
export type NavItem = { key: string; href: string; subItems?: SubItem[] };

export const NAV_ITEMS: NavItem[] = [
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

export const LOCALES = [
  { code: "en", label: "En" },
  { code: "es", label: "Es" },
  { code: "de", label: "De" },
];
