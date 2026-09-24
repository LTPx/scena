import ProjectDetailPage from "@/app/components/Project-Detail-Page";
import { getProjectDetail } from "@/app/_services/api";
import { notFound } from "next/navigation";

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ locale: "en" | "es" | "de"; slug: string }>;
}) {
  const { locale, slug } = await params;
  try {
    const data = await getProjectDetail(locale, slug);
    return <ProjectDetailPage data={data} />;
  } catch {
    notFound();
  }
}
