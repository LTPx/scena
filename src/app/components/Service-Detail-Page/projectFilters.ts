type Locale = "es" | "en" | "de";

const SERVICE_TO_PROJECT_FILTER: Record<Locale, Record<string, string>> = {
  es: {
    "audio-video": "audio-video",
    "diseno-iluminacion": "diseno-iluminacion",
    domotica: "domotica",
    ingenieria: "ingenieria",
    mep: "mep-es",
  },
  en: {
    "audio-video": "audio-video-en",
    engineering: "engineering",
    "home-automation": "home-automation",
    "lighting-design": "lighting-design",
    mep: "mep-en",
  },
  de: {
    "audio-video": "audio-video-de",
    hausautomation: "hausautomation",
    ingenieurwesen: "ingenieurwesen",
    lichtdesign: "lichtdesign",
    mep: "mep-de",
  },
};

export function getProjectsHref(
  serviceSlug: string | undefined,
  locale: string,
) {
  const filter =
    serviceSlug && SERVICE_TO_PROJECT_FILTER[locale as Locale]?.[serviceSlug];

  return filter ? `/projects?filter=${filter}` : "/projects";
}
