import type { Metadata } from "next";
import {
  getWordPressCustomPage,
  getProjectsPage,
  getServicesPage,
} from "../_services/api";
import { buildMetadata } from "../_services/seo";
import HomePage from "./home";

type Locale = "en" | "es" | "de";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  try {
    const data = await getWordPressCustomPage(locale, "home");
    return buildMetadata(data.yoast_seo, { locale, path: "" });
  } catch {
    return {};
  }
}

async function Home({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;

  const [data, projectsPage, servicesPage] = await Promise.all([
    getWordPressCustomPage(locale, "home"),
    getProjectsPage(locale),
    getServicesPage(locale),
  ]);

  const { home_information } = data.acf;

  return (
    <HomePage
      home_information={{
        ...home_information,
        our_services: servicesPage.services,
      }}
      projects={projectsPage.projects}
    />
  );
}

export default Home;
