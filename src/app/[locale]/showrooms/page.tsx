import ShowroomsSection from "@/app/components/ShowroomsSection";
import { mockShowroomsPage } from "@/app/mocks/showroons";

async function Showrooms(nextParams: {
  params: { locale: "es" | "de" | "en" };
}) {
  const {
    params: { locale },
  } = nextParams;

  const data = mockShowroomsPage;

  return (
    <div>
      <ShowroomsSection data={data} />
    </div>
  );
}

export default Showrooms;
