import ShowroomsSection from "@/app/components/ShowroomsSection";
import { mockShowroomsPage } from "@/app/mocks/showroons";

async function Showrooms({
  params,
}: {
  params: Promise<{ locale: "es" | "de" | "en" }>;
}) {
  const { locale } = await params;

  const data = mockShowroomsPage;

  return (
    <div>
      <ShowroomsSection data={data} />
    </div>
  );
}

export default Showrooms;