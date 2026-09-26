import { getWordPressCustomPage, getProjectsPage } from "../_services/api";
import HomePage from "./home";

type Locale = "en" | "es" | "de";

async function Home({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;

  const [data, projectsPage] = await Promise.all([
    getWordPressCustomPage(locale, "home"),
    getProjectsPage(locale),
  ]);

  const { home_information } = data.acf;

  return (
    <HomePage
      home_information={home_information}
      projects={projectsPage.projects}
    />
  );
}

export default Home;