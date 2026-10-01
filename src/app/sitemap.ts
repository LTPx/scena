import type { MetadataRoute } from "next";
import {
  getOutletPage,
  getPressPage,
  getProjectsPage,
  getServicesPage,
} from "./_services/api";
import { LOCALES, SITE_URL } from "./_services/seo";

export const revalidate = 3600;

const STATIC_PATHS = [
  "",
  "/about-us",
  "/projects",
  "/press",
  "/outlet",
  "/showrooms",
  "/contact",
];

async function safe<T>(promise: Promise<T>): Promise<T | null> {
  try {
    return await promise;
  } catch {
    return null;
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  for (const path of STATIC_PATHS) {
    const languages = Object.fromEntries(
      LOCALES.map((l) => [l, `${SITE_URL}/${l}${path}`]),
    );
    for (const locale of LOCALES) {
      entries.push({
        url: `${SITE_URL}/${locale}${path}`,
        alternates: { languages },
      });
    }
  }

  await Promise.all(
    LOCALES.map(async (locale) => {
      const [projects, press, outlet, services] = await Promise.all([
        safe(getProjectsPage(locale)),
        safe(getPressPage(locale)),
        safe(getOutletPage(locale)),
        safe(getServicesPage(locale)),
      ]);

      projects?.projects.forEach((p) =>
        entries.push({ url: `${SITE_URL}/${locale}/projects/${p.slug}` }),
      );
      press?.news.forEach((n) =>
        entries.push({ url: `${SITE_URL}/${locale}/press/${n.slug}` }),
      );
      outlet?.products.forEach((p) =>
        entries.push({ url: `${SITE_URL}/${locale}/outlet/${p.slug}` }),
      );
      services?.services.forEach((s) =>
        entries.push({ url: `${SITE_URL}/${locale}/services/${s.slug}` }),
      );
    }),
  );

  return entries;
}
