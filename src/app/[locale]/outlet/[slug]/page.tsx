import OutletDetailPage from "@/app/components/Outlet-Detail-Page";
import { getOutletProductsFull } from "@/app/_services/api";

export default async function OutletDetail({
  params,
}: {
  params: Promise<{ locale: "en" | "es" | "de"; slug: string }>;
}) {
  const { locale, slug } = await params;
  const products = await getOutletProductsFull(locale);

  return <OutletDetailPage products={products} initialSlug={slug} />;
}