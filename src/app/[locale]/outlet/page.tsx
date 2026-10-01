import type { Metadata } from "next";
import OutletPage from "@/app/components/Outlet-Page";
import { getOutletPage } from "@/app/_services/api";
import { buildMetadata } from "@/app/_services/seo";

type Locale = "en" | "es" | "de";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  try {
    const data = await getOutletPage(locale);
    return buildMetadata(data.yoast_seo ?? undefined, {
      locale,
      path: "/outlet",
    });
  } catch {
    return {};
  }
}

export default async function Outlet({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const data = await getOutletPage(locale);

  return <OutletPage data={data} />;
}
