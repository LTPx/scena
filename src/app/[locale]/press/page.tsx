import type { Metadata } from "next";
import PressPage from "@/app/components/Press-Page";
import { getPressPage } from "../../_services/api";
import { buildMetadata } from "../../_services/seo";

type Locale = "en" | "es" | "de";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  try {
    const data = await getPressPage(locale);
    return buildMetadata(data.yoast_seo, { locale, path: "/press" });
  } catch {
    return {};
  }
}

export default async function Press({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const data = await getPressPage(locale);
  return <PressPage data={data} />;
}
