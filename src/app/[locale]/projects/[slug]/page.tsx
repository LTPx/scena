import { notFound } from "next/navigation";
import ProjectDetailPage from "@/app/components/Project-Detail-Page";
import { getProjectDetailBySlug } from "@/app/mocks/project-detail";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function Project({ params }: Props) {
  const { slug } = await params;
  const data = getProjectDetailBySlug(slug);

  if (!data) {
    notFound();
  }

  return <ProjectDetailPage data={data} />;
}
