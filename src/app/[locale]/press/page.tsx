import PressPage from "@/app/components/Press-Page";
import { getPressPage } from "../../_services/api";

export default async function Press({
  params,
}: {
  params: Promise<{ locale: "en" | "es" | "de" }>;
}) {
  const { locale } = await params;
  const data = await getPressPage(locale);
  return <PressPage data={data} />;
}