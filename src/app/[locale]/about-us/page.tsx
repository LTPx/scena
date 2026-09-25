import AboutPage from "@/app/components/About-Page";
import { getAboutPage } from "../../_services/api";

export default async function About({
  params,
}: {
  params: Promise<{ locale: "en" | "es" | "de" }>;
}) {
  const { locale } = await params;
  const data = await getAboutPage(locale);
  return <AboutPage data={data} />;
}