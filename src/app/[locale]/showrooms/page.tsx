import { getShowroomsPage } from "@/app/_services/api";
import ShowroomsSection from "@/app/components/ShowroomsSection";

async function Showrooms({
  params,
}: {
  params: Promise<{ locale: "es" | "de" | "en" }>;
}) {
  const { locale } = await params;

  const data = await getShowroomsPage(locale);

  return (
    <div>
      <ShowroomsSection data={data} />
    </div>
  );
}

export default Showrooms;
