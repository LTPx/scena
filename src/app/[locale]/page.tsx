import { getWordPressCustomPage } from "../_services/api";
import HomePage from "./home";

type Locale = "en" | "es" | "de";

async function Home({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;

  const data = await getWordPressCustomPage(locale, "home");
  const { home_information } = data.acf;

  return <HomePage home_information={home_information} />;
}

export default Home;