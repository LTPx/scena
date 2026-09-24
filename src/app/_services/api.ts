import {
  ProjectDetailWp,
  ProjectsPageWp,
} from "../_interfaces/wordpress-components";
import { WordPressFrontendPage } from "../_interfaces/wordpress-page";

export const WORDPRESS_API_URL = "https://staging.e-scena.com/wp-json";
type Locale = "en" | "es" | "de";

export async function getWordPressPage(
  page: string,
): Promise<WordPressFrontendPage> {
  const url = `${WORDPRESS_API_URL}/wp/v2/pages?slug=${page}`;
  console.log("url: ", url);
  const response = await fetch(url, {
    next: {
      revalidate: 60,
    },
  });
  const dataJson = await response.json();
  if (!response.ok) throw new Error(dataJson.message);
  return dataJson;
}

export async function getWordPressCustomPage(
  locale: "en" | "es" | "de",
  slug: string,
): Promise<WordPressFrontendPage> {
  const parentPages = {
    es: "spanish-pages",
    de: "german-pages",
    en: "english-pages",
  } as const;

  const parentPage = parentPages[locale];
  if (!parentPage) {
    throw new Error(`Locale inválido: "${locale}"`);
  }

  const url = `${WORDPRESS_API_URL}/custom/v1/page_by_slug?slug=${slug}&parent_slug=${parentPage}&lang=${locale}`;
  console.log("url custom page:", url);

  const response = await fetch(url, { next: { revalidate: 60 } });
  console.log("status custom page:", response.status);

  const page = await response.json();
  if (!response.ok) throw new Error(page.message);
  return page;
}

export async function getProjectsPage(locale: Locale): Promise<ProjectsPageWp> {
  const res = await fetch(
    `${WORDPRESS_API_URL}/custom/v1/projects?lang=${locale}`,
    { next: { revalidate: 60 } },
  );
  const json = await res.json();
  if (!res.ok) throw new Error(json.message);
  return json;
}

export async function getProjectDetail(
  locale: Locale,
  slug: string,
): Promise<ProjectDetailWp> {
  const res = await fetch(
    `${WORDPRESS_API_URL}/custom/v1/project?slug=${slug}&lang=${locale}`,
    { next: { revalidate: 60 } },
  );
  const json = await res.json();
  if (!res.ok) throw new Error(json.message);
  return json;
}
