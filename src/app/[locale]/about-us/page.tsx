import type { Metadata } from "next";
import AboutPage from "@/app/components/About-Page";
import { getAboutPage, getWordPressCustomPage } from "../../_services/api";
import { buildMetadata } from "../../_services/seo";

type Locale = "en" | "es" | "de";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  try {
    const page = await getWordPressCustomPage(locale, "about-us");
    return buildMetadata(page.yoast_seo, { locale, path: "/about-us" });
  } catch {
    return {};
  }
}

export default async function About({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const data = await getAboutPage(locale);
  return <AboutPage data={data} />;
}
