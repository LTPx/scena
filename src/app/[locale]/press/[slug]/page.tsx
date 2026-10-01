import type { Metadata } from "next";
import PressDetailPage from "@/app/components/Press-Detail-Page";
import { getPressDetail } from "../../../_services/api";
import { buildMetadata } from "../../../_services/seo";

type Locale = "en" | "es" | "de";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  try {
    const data = await getPressDetail(locale, slug);
    return buildMetadata(data.yoast_seo, {
      locale,
      path: `/press/${slug}`,
      fallbackImage: data.hero_image?.url,
      hreflang: false,
    });
  } catch {
    return {};
  }
}

export default async function PressDetail({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const data = await getPressDetail(locale, slug);
  return <PressDetailPage data={data} />;
}
