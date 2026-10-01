import type { Metadata } from "next";
import OutletDetailPage from "@/app/components/Outlet-Detail-Page";
import { getOutletDetail, getOutletProductsFull } from "@/app/_services/api";
import { buildMetadata } from "@/app/_services/seo";

type Locale = "en" | "es" | "de";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  try {
    const product = await getOutletDetail(locale, slug);
    return buildMetadata(product.yoast_seo, {
      locale,
      path: `/outlet/${slug}`,
      fallbackImage: product.image?.url,
      hreflang: false,
    });
  } catch {
    return {};
  }
}

export default async function OutletDetail({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const products = await getOutletProductsFull(locale);

  return <OutletDetailPage products={products} initialSlug={slug} />;
}
