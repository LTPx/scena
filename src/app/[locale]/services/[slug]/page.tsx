import { getServiceDetail } from "@/app/_services/api";
import ServiceDetailPage from "@/app/components/Service-Detail-Page";

type Locale = "en" | "es" | "de";

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
