import type { Metadata } from "next";
import { getShowroomsPage, getWordPressCustomPage } from "@/app/_services/api";
import { buildMetadata } from "@/app/_services/seo";
import ShowroomsSection from "@/app/components/ShowroomsSection";

type Locale = "es" | "de" | "en";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  try {
    const page = await getWordPressCustomPage(locale, "showrooms");
    return buildMetadata(page.yoast_seo, { locale, path: "/showrooms" });
  } catch {
    return {};
  }
}

async function Showrooms({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;

  const data = await getShowroomsPage(locale);

  return (
    <div>
      <ShowroomsSection data={data} />
    </div>
  );
}

export default Showrooms;
