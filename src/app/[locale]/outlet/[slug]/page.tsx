import { notFound } from "next/navigation";
import OutletDetailPage from "@/app/components/Outlet-Detail-Page";
import { outletMock } from "../../../mocks/outlet";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function OutletDetail({ params }: Props) {
  const { slug } = await params;
  const exists = outletMock.products.some((p) => p.slug === slug);

  if (!exists) {
    notFound();
  }

  return <OutletDetailPage products={outletMock.products} initialSlug={slug} />;
}
