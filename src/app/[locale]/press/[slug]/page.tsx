import { notFound } from "next/navigation";
import PressDetailPage from "@/app/components/Press-Detail-Page";
import { getPressDetailBySlug } from "@/app/mocks/press-detail";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function Press({ params }: Props) {
  const { slug } = await params;
  const data = getPressDetailBySlug(slug);

  if (!data) {
    notFound();
  }

  return <PressDetailPage data={data} />;
}