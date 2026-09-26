import OutletPage from "@/app/components/Outlet-Page";
import { getOutletPage } from "@/app/_services/api";

export default async function Outlet({
  params,
}: {
  params: Promise<{ locale: "en" | "es" | "de" }>;
}) {
  const { locale } = await params;
  const data = await getOutletPage(locale);

  return <OutletPage data={data} />;
}