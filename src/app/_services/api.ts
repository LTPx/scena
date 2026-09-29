import {
  AboutPageWp,
  ContactPageWp,
  NewsDetailWp,
  NewsPageWp,
  OutletPageWp,
  OutletProductWp,
  ProjectDetailWp,
  ProjectsPageWp,
  ServiceDetailWp,
  ServiceWp,
  ShowroomPageWp,
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
  const url = `${WORDPRESS_API_URL}/custom/v1/projects?lang=${locale}`;

  console.log("🌐 GET PROJECTS PAGE:", url);

  const res = await fetch(url, {
    next: { revalidate: 60 },
  });

  const json = await res.json();

  if (!res.ok) throw new Error(json.message);

  return json;
}

export async function getProjectDetail(
  locale: Locale,
  slug: string,
): Promise<ProjectDetailWp> {
  const url = `${WORDPRESS_API_URL}/custom/v1/project?slug=${slug}&lang=${locale}`;

  console.log("🌐 GET PROJECT DETAIL:", url);

  const res = await fetch(url, {
    next: { revalidate: 60 },
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json.message);

  return json;
}

export async function getPressPage(locale: Locale): Promise<NewsPageWp> {
  const res = await fetch(
    `${WORDPRESS_API_URL}/custom/v1/press?lang=${locale}`,
    {
      next: { revalidate: 60 },
    },
  );
  const json = await res.json();
  if (!res.ok) throw new Error(json.message);
  return json;
}

export async function getPressDetail(
  locale: Locale,
  slug: string,
): Promise<NewsDetailWp> {
  const res = await fetch(
    `${WORDPRESS_API_URL}/custom/v1/press-item?slug=${slug}&lang=${locale}`,
    { next: { revalidate: 60 } },
  );
  const json = await res.json();
  if (!res.ok) throw new Error(json.message);
  return json;
}

export async function getAboutPage(locale: Locale): Promise<AboutPageWp> {
  const page = await getWordPressCustomPage(locale, "about-us");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const a = (page as any).acf?.about_information;
  if (!a) throw new Error("about_information no encontrado");

  return {
    title: a.title ?? "",
    description: a.description ?? "",
    gallery: a.gallery ?? [],
    team_gallery: a.team_gallery ?? [],
    team: {
      description: a.team?.description ?? "",
      positions: (a.team?.positions ?? []).map(
        (p: { title: string }, i: number) => ({ id: i + 1, title: p.title }),
      ),
      cta_title: a.team?.cta_title ?? "",
      cta_label: a.team?.cta_label ?? "",
    },
    differentiators: {
      title: a.differentiators?.title ?? "",
      cards: a.differentiators?.cards ?? [],
    },
    partners: {
      description: a.partners?.description ?? "",
      partners: (a.partners?.partners ?? []).map(
        (
          p: {
            name: string;
            logo: AboutPageWp["partners"]["partners"][0]["logo"];
          },
          i: number,
        ) => ({
          id: i + 1,
          name: p.name,
          logo: p.logo,
        }),
      ),
    },
  };
}

export async function getShowroomsPage(
  locale: Locale,
): Promise<ShowroomPageWp> {
  const page = await getWordPressCustomPage(locale, "showrooms");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const s = (page as any).acf?.showroom_information;
  if (!s) throw new Error("showroom_information no encontrado");

  return {
    title: s.title ?? "",
    locations: (s.locations ?? []).map(
      (l: { label: string; contact: string; description: string }) => ({
        label: l.label ?? "",
        contact: l.contact ?? "",
        description: l.description ?? "",
      }),
    ),
    gallery: s.gallery ?? [],
  };
}

export async function getContactPage(locale: Locale): Promise<ContactPageWp> {
  const page = await getWordPressCustomPage(locale, "contact");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const c = (page as any).acf?.contact_information;
  if (!c) throw new Error("contact_information no encontrado");

  return {
    background_image: c.background_image ?? null,
    offices: (c.offices ?? []).map(
      (o: {
        label: string;
        address: string;
        phone: string;
        email: string;
      }) => ({
        label: o.label ?? "",
        address: o.address ?? "",
        phone: o.phone ?? "",
        email: o.email ?? "",
      }),
    ),
  };
}

export async function getOutletPage(locale: Locale): Promise<OutletPageWp> {
  const url = `${WORDPRESS_API_URL}/custom/v1/outlet?lang=${locale}`;
  console.log("🌐 GET OUTLET PAGE:", url);

  const res = await fetch(url, { next: { revalidate: 60 } });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message);
  return json;
}

export async function getOutletDetail(
  locale: Locale,
  slug: string,
): Promise<OutletProductWp> {
  const url = `${WORDPRESS_API_URL}/custom/v1/outlet-product?slug=${slug}&lang=${locale}`;
  console.log("🌐 GET OUTLET DETAIL:", url);

  const res = await fetch(url, { next: { revalidate: 60 } });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message);
  return json;
}

export async function getOutletProductsFull(
  locale: Locale,
): Promise<OutletProductWp[]> {
  const url = `${WORDPRESS_API_URL}/custom/v1/outlet-products-full?lang=${locale}`;
  console.log("🌐 GET OUTLET PRODUCTS FULL:", url);

  const res = await fetch(url, { next: { revalidate: 60 } });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message);
  return json;
}

export async function getServicesPage(
  locale: Locale,
): Promise<{ services: ServiceWp[] }> {
  const url = `${WORDPRESS_API_URL}/custom/v1/services?lang=${locale}`;
  console.log("🌐 GET SERVICES PAGE:", url);

  const res = await fetch(url, { next: { revalidate: 60 } });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message);
  return json;
}

export async function getServiceDetail(
  locale: Locale,
  slug: string,
): Promise<ServiceDetailWp> {
  const url = `${WORDPRESS_API_URL}/custom/v1/service?slug=${slug}&lang=${locale}`;
  console.log("🌐 GET SERVICE DETAIL:", url);

  const res = await fetch(url, { next: { revalidate: 60 } });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message);
  return json;
}
