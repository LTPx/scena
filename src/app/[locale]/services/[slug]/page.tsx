import type { Metadata } from "next";
import { getServiceDetail } from "@/app/_services/api";
import { buildMetadata } from "@/app/_services/seo";
import ServiceDetailPage from "@/app/components/Service-Detail-Page";

type Locale = "en" | "es" | "de";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  try {
    const data = await getServiceDetail(locale, slug);
    return buildMetadata(data.yoast_seo, {
      locale,
      path: `/services/${slug}`,
      fallbackImage: data.image?.url,
      hreflang: false,
    });
  } catch {
    return {};
  }
}

async function Page({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const data = await getServiceDetail(locale, slug);

  return <ServiceDetailPage data={data} />;
}

export default Page;
