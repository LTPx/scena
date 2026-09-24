import PressDetailPage from "@/app/components/Press-Detail-Page";
import { getPressDetail } from "../../../_services/api";

export default async function PressDetail({
  params,
}: {
  params: Promise<{ locale: "en" | "es" | "de"; slug: string }>;
}) {
  const { locale, slug } = await params;
  const data = await getPressDetail(locale, slug);
  return <PressDetailPage data={data} />;
}