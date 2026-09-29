import {
  getWordPressCustomPage,
  getProjectsPage,
  getServicesPage,
} from "../_services/api";
import HomePage from "./home";

type Locale = "en" | "es" | "de";

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
