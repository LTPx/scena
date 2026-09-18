import OutletPage from "@/app/components/Outlet-Page";
import { outletMock } from "../../mocks/outlet";

export default function Outlet() {
  return <OutletPage data={outletMock} />;
}